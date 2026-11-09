"""One-time authorized scenery consolidation from approved template artwork."""
import sys,json,copy,re,hashlib
from pathlib import Path
import xml.etree.ElementTree as E
import atlas
from playwright.sync_api import sync_playwright
R=atlas.ROOT;NS=atlas.NS

def expand(node,defs):
 for parent in list(node.iter()):
  for i,ch in enumerate(list(parent)):
   if ch.tag=='{'+NS+'}use':
    ref=ch.get('href',ch.get('{http://www.w3.org/1999/xlink}href','')).lstrip('#')
    if ref not in defs:raise ValueError(ref)
    replacement=copy.deepcopy(defs[ref]);replacement.attrib.pop('id',None)
    attrs={k:v for k,v in ch.attrib.items() if k not in ['href','{http://www.w3.org/1999/xlink}href','x','y']}
    if ch.get('x') or ch.get('y'):attrs['transform']=attrs.get('transform','')+' translate('+ch.get('x','0')+' '+ch.get('y','0')+')'
    g=E.Element('{'+NS+'}g',attrs);g.append(replacement);parent.remove(ch);parent.insert(i,g);expand(g,defs)
 return node

def standalone(art,defs,page):
 art=copy.deepcopy(art);art.attrib.pop('transform',None)
 root=E.Element('{'+NS+'}svg');d=E.SubElement(root,'{'+NS+'}defs');root.append(art)
 own={n.get('id') for n in art.iter() if n.get('id')};needed=atlas.refs(E.tostring(art,encoding='unicode'));done=set(own)
 while needed-done:
  ref=sorted(needed-done)[0];n=copy.deepcopy(defs[ref]);d.append(n);done.add(ref);done.update(x.get('id') for x in n.iter() if x.get('id'));needed.update(atlas.refs(E.tostring(n,encoding='unicode')))
 page.set_content(E.tostring(root,encoding='unicode'));box=page.locator('svg').evaluate('(e)=>{let b=e.getBBox();return [b.x-3,b.y-3,b.width+6,b.height+6]}');root.set('viewBox',' '.join(str(round(x,3)) for x in box));return root

html,payload=atlas.load(R/'index.html');c=json.loads((R/'elements/catalog.json').read_text());old=copy.deepcopy(c)
if len(c['elements'])!=366:raise ValueError('One-time migration requires original 366-asset baseline; do not run on consolidated catalog')
defs={k:E.fromstring(v) for k,v in payload['vectors'].items()};trees={};roof_fixes=[]
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox']);page=browser.new_page()
 # Repair the approved Diagon artwork instance-by-instance, never shared definitions.
 root=E.fromstring(payload['maps']['diagon-knockturn']['svg']);local={n.get('id'):n for n in root.iter() if n.get('id')};local.update(defs)
 for place in list(root.iter()):
  art=next((n for n in place if n.get('class')=='engraved'),None)
  if art is None:continue
  expand(art,local)
  for group in list(art.iter()):
   walls=[n for n in group if n.tag.endswith('rect') and n.get('x')=='0' and float(n.get('height','0'))>100 and float(n.get('y','0'))< -100 and not n.get('fill','').startswith('url')]
   if not walls:continue
   wall=walls[0];w=float(wall.get('width'));y=float(wall.get('y'));roof=next((n for n in group if n.tag.endswith('path') and n.get('d','').startswith('M-') and n.get('fill') not in ['none',None] and not n.get('fill','').startswith('url')),None)
   if roof is None:continue
   page.set_content('<svg xmlns="http://www.w3.org/2000/svg">'+E.tostring(roof,encoding='unicode')+'</svg>')
   # A backing seam closes subpixel masonry/eave gaps without moving the roof.
   seam=E.Element('{'+NS+'}rect',{'x':'0','y':str(y-5),'width':str(w),'height':'10','fill':wall.get('fill'),'data-join':'roof-wall'})
   group.insert(0,seam)
   for chimney in [n for n in group.iter() if n.tag.endswith('rect') and 5<=float(n.get('width','0'))<=26 and 20<=float(n.get('height','0'))<=100 and float(n.get('y','0'))<y-10]:
    x=float(chimney.get('x','0'));bottom=float(chimney.get('y'))+float(chimney.get('height'));width=float(chimney.get('width'))
    hit=page.locator('svg>path').evaluate('(n,x)=>{let b=n.getBBox();for(let y=b.y;y<=b.y+b.height;y+=.5)if(n.isPointInFill(new DOMPoint(x,y)))return y;return null}',x+width/2)
    if hit is not None and hit+3>bottom:
     extension=copy.deepcopy(chimney);extension.set('y',str(bottom-1));extension.set('height',str(round(hit+4-bottom,3)));extension.set('data-join','chimney-roof');extension.attrib.pop('id',None);group.insert(0,extension)
   roof_fixes.append(place.get('data-id'))
 payload['maps']['diagon-knockturn']['svg']=E.tostring(root,encoding='unicode')
 used=set().union(*(atlas.refs(m['svg']) for m in payload['maps'].values()));payload['vectors']={k:v for k,v in payload['vectors'].items() if k in used}
 atlas.save(R/'index.html',html,payload)
 # Fresh catalog bases use actual colored template art, not stripped historical frames.
 new=[];replacement={};presets={};newFiles={}
 def register(ident,name,category,svg,source):
  svg.set('id',ident.replace('.','-'));file='assets/'+ident+'.svg';text=E.tostring(svg,encoding='unicode');atlas.check_svg(text);(R/'elements'/file).write_text(text+'\n')
  newFiles[file]=text+'\n'
  new.append({'id':ident,'name':name,'category':category,'view':'elevation','file':file,'viewBox':[float(x) for x in svg.get('viewBox').split()],'tags':['2.5d','canonical-base'],'source':source,'ports':[]})
 village=E.fromstring(payload['maps']['village-static']['svg']);vdefs={n.get('id'):n for n in village.iter() if n.get('id')};vdefs.update(defs)
 selected=[('v-home-0','house.wood.gable','Nhà gỗ · Mái dốc'),('v-home-4','house.wood.hip','Nhà gỗ · Mái chóp'),('v-broomsticks','house.wood.wide','Nhà gỗ · Khối rộng')]
 for pid,ident,name in selected:
  place=next(n for n in village.iter() if n.get('data-id')==pid);art=next(n for n in place if n.get('class')=='engraved');svg=standalone(art,vdefs,page)
  # Shop names/decor are scene data, not the identity of a base house.
  for parent in svg.iter():
   for n in list(parent):
    if n.tag.endswith(('text','title')):parent.remove(n)
  register(ident,name,'Nhà · Nhà gỗ',svg,{'template':'village-static','instance':pid})
 for pid,ident,name in [('da-terrace-7','house.brick.low','Nhà tường · Khối thấp'),('da-ollivanders','house.brick.tall','Nhà tường · Nhà phố cao'),('da-quidditch','house.brick.wide','Nhà tường · Khối rộng')]:
  place=next(n for n in root.iter() if n.get('data-id')==pid);art=next(n for n in place if n.get('class')=='engraved');svg=standalone(art,local,page)
  for parent in svg.iter():
   for n in list(parent):
    if n.tag.endswith(('text','title')):parent.remove(n)
  register(ident,name,'Nhà · Nhà gạch / tường',svg,{'template':'diagon-knockturn','instance':pid,'roofJoinFixed':True})
 # Basic means reusable structure, not dozens of complete near-identical houses.
 for ident,name,w,h in [('house.basic.rectangle','Khung nhà · Chữ nhật',180,150),('house.basic.tall','Khung nhà · Cao tầng',130,220)]:
  svg=E.Element('{'+NS+'}svg',{'viewBox':'-16 -90 240 330'});g=E.SubElement(svg,'{'+NS+'}g',{'stroke':'var(--ink,#75684f)','stroke-width':'1.3','stroke-linejoin':'round'})
  E.SubElement(g,'{'+NS+'}path',{'d':f'M0 0H{w}V{h}H0Z','fill':'var(--wall,#c8b48e)'})
  E.SubElement(g,'{'+NS+'}path',{'d':f'M{w} 0l24-18v{h}l-24 18Z','fill':'var(--side,#9c896c)'})
  E.SubElement(g,'{'+NS+'}path',{'d':f'M-8 3L{w/2} -65L{w+8} 3Z','fill':'var(--roof,#65705e)'})
  register(ident,name,'Nhà · Khung basic',svg,{'type':'new structural base; connected roof/wall'})
 # Retain seven actual Quidditch species plus new silhouette variants built from their strokes.
 pitch=E.fromstring(payload['maps']['pitch-static']['svg']);pd={n.get('id'):n for n in pitch.iter() if n.get('id')};pd.update(defs)
 for n in pitch.iter():
  family=n.get('data-tree-family')
  if family and family not in trees:trees[family]=n
 names={'oak':'Sồi tán rộng','beech':'Dẻ gai','birch':'Bạch dương','alder':'Tống quán sủ','rowan':'Thanh lương trà','pine':'Thông','spruce':'Vân sam'}
 for family,n in trees.items():register('tree.'+family,'Cây · '+names.get(family,family),'Cây · Nét Quidditch',standalone(n,pd,page),{'template':'pitch-static','family':family})
 for family,ident,name,scale in [('oak','tree.spreading','Cây · Tán thấp xòe rộng','scale(1.18 .78)'),('birch','tree.slender','Cây · Thân cao tán hẹp','scale(.78 1.15)')]:
  svg=standalone(trees[family],pd,page);art=next(n for n in svg if n.tag.endswith('g'));art.set('transform',scale);svg=standalone(art,{n.get('id'):n for n in svg.iter() if n.get('id')},page);register(ident,name,'Cây · Nét Quidditch',svg,{'type':'new silhouette variant','baseFamily':family})
 browser.close()
 # Consolidate all generic housing/shop renditions into the small base vocabulary.
 special={'map.r2-castle':('architecture.castle','Kiến trúc · Lâu đài'),'map.h1.owlery':('architecture.owl-tower','Kiến trúc · Tháp cú'),'map.h1.boathouse':('architecture.boathouse','Kiến trúc · Nhà thuyền'),'map.h1.greenhouses':('architecture.greenhouses','Kiến trúc · Nhà kính'),'house.hagrid-hex':('house.basic.hex','Khung nhà · Lục giác')}
 removed=[];kept=[]
 for e in c['elements']:
  ident=e['id'];file=R/'elements'/e['file']
  if ident in special:
   nid,name=special[ident];svg=E.fromstring(file.read_text());svg.set('id',nid.replace('.','-'));dest='assets/'+nid+'.svg';(R/'elements'/dest).write_text(E.tostring(svg,encoding='unicode')+'\n');file.unlink();e.update(id=nid,name=name,file=dest,category='Nhà · Khung basic' if nid.startswith('house.') else 'Kiến trúc · Đặc biệt');kept.append(e);replacement[ident]=nid;continue
  ishouse=ident.startswith(('house.','building.','frontage.')) or ident.startswith('map.h1.') and ident not in ['map.h1.flying-lawn']
  istree=ident.startswith('tree.') or ident in ['map.r3-ancient-tree','map.willow-redesign']
  if ishouse or istree:
   if istree:
    if ident in ['map.r3-ancient-tree','map.willow-redesign']:
     nid='tree.ancient' if 'ancient' in ident else 'tree.willow';e.update(id=nid,name='Cây · Cổ thụ đặc biệt' if 'ancient' in ident else 'Cây · Liễu Roi đặc biệt',category='Cây · Đặc biệt');kept.append(e);replacement[ident]=nid;continue
    nid='tree.pine' if any(k in ident for k in ['pine','spruce','cypress']) else 'tree.oak'
   else:nid='house.wood.gable' if ident.startswith('building.village') or ident in ['house.timber','house.cottage'] or ident.startswith('map.h1.') else 'house.brick.tall' if ident.startswith(('frontage.','building.diagon')) else 'house.basic.rectangle'
   replacement[ident]=nid;presets[ident]={'base':nid,'legacyName':e['name'],'status':'base mapping; approved scene art stays embedded in template','source':e.get('source')};file.unlink();removed.append(ident)
  else:kept.append(e)
 for file,text in newFiles.items():(R/'elements'/file).write_text(text)
 c['elements']=kept+new
 for ident,target in list(c['aliases'].items()):
  while target in replacement:target=replacement[target]
  c['aliases'][ident]=target
 c['aliases'].update(replacement)
 active={e['id'] for e in c['elements']};c['aliases']={k:v for k,v in c['aliases'].items() if k not in active}
 (R/'elements/catalog.json').write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n');(R/'elements/presets.json').write_text(json.dumps(presets,ensure_ascii=False,indent=2)+'\n')
 (R/'elements/docs/scenery-consolidation.json').write_text(json.dumps({'baseline':old['elements'].__len__(),'final':len(c['elements']),'removedFromLibrary':removed,'bases':[e['id'] for e in new],'fixedDiagonBuildings':sorted(set(roof_fixes)),'mapArtworkPreservedExceptDiagonRepair':True},ensure_ascii=False,indent=2)+'\n')
 print(len(c['elements']),'assets;',len(removed),'old renditions removed;',len(set(roof_fixes)),'Diagon repairs')
