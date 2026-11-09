"""Rebuild roof faces from wall geometry; never patch a gap with a detached strip."""
import re,sys,copy,json
import xml.etree.ElementTree as E
import atlas
from playwright.sync_api import sync_playwright
R=atlas.ROOT;N=atlas.NS
html,p=atlas.load(R/'index.html');root=E.fromstring(p['maps']['diagon-knockturn']['svg']);count=0
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page()
 for group in list(root.iter()):
  wall=next((n for n in group if n.tag.endswith('rect') and n.get('x')=='0' and float(n.get('height','0'))>100 and float(n.get('y','0'))< -100 and n.get('data-join') is None and not n.get('fill','').startswith('url')),None)
  if wall is None:continue
  roofs=[n for n in group if n.tag.endswith('path') and n.get('d','').startswith('M-') and n.get('fill') not in ['none',None] and not n.get('fill','').startswith('url')]
  if not roofs:continue
  roof=roofs[0];page.set_content('<svg xmlns="'+N+'">'+E.tostring(roof,encoding='unicode')+'</svg>');bb=page.locator('svg>path').evaluate('(n)=>{let b=n.getBBox();return [b.x,b.y,b.width,b.height]}')
  w=float(wall.get('width'));top=float(wall.get('y'));eave=top+2;shift=eave-(bb[1]+bb[3]);ridge=bb[1]+shift;dx=30;dy=-24;left=bb[0];right=bb[0]+bb[2]
  rx=page.locator('svg>path').evaluate('(n)=>{const b=n.getBBox(),len=n.getTotalLength();let x=b.x;for(let i=0;i<=1000;i++){const p=n.getPointAtLength(len*i/1000);if(p.y<b.y+.8)x=Math.max(x,p.x)}return x}')
  original_d=roof.get('d')
  fill=roof.get('fill');index=list(group).index(roof)
  for ch in list(group):
   # Remove roof surface/clip overlays and prior seam patches, leave windows and facade intact.
   if ch is roof or ch.get('data-join')=='roof-wall' or ch.tag.endswith('g') and 'roof' in ch.get('clip-path',''):
    group.remove(ch)
   elif ch.tag.endswith('path') and (ch.get('fill','').startswith('url') and ch.get('d','').startswith('M-') or re.match(r'^M[\d.]+ -[\d.]+l30-24L',ch.get('d',''))):group.remove(ch)
  back=E.Element('{'+N+'}path',{'d':f'M{rx} {ridge}L{rx+dx} {ridge+dy}L{right+dx} {eave+dy}L{right} {eave}Z','fill':'#4e554b','stroke':'#635847','stroke-width':'1','data-part':'roof-side-connected'})
  front=E.Element('{'+N+'}path',{'d':original_d,'transform':f'translate(0 {shift})','fill':fill,'stroke':'#635847','stroke-width':'1.2','data-part':'roof-front-connected'})
  group.insert(min(index,len(group)),back);group.insert(min(index+1,len(group)),front)
  # Keep slate texture clipped to the rebuilt roof, using the new polygon itself.
  clip_id='roof-connected-'+str(count);defs=E.SubElement(root.find('{'+N+'}defs'),'{'+N+'}clipPath',{'id':clip_id}) if root.find('{'+N+'}defs') is not None else None
  if defs is not None:
   E.SubElement(defs,'{'+N+'}path',{'d':front.get('d'),'transform':front.get('transform')});overlay=E.Element('{'+N+'}g',{'clip-path':f'url(#{clip_id})'});E.SubElement(overlay,'{'+N+'}rect',{'x':str(left),'y':str(ridge),'width':str(right-left),'height':str(eave-ridge),'fill':'url(#da-slate)'});group.insert(min(index+2,len(group)),overlay)
  count+=1
 b.close()
p['maps']['diagon-knockturn']['svg']=E.tostring(root,encoding='unicode');used=set().union(*(atlas.refs(m['svg']) for m in p['maps'].values()));p['vectors']={k:v for k,v in p['vectors'].items() if k in used};atlas.save(R/'index.html',html,p)
print('Rebuilt',count,'roofs with closed shared front/side edge and eave overlapping wall')
