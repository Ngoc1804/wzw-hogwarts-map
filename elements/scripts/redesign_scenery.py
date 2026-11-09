"""Distinct neutral scenery geometry. Color is an instance concern, never a model ID."""
from pathlib import Path
import xml.etree.ElementTree as E
import math,json
R=Path(__file__).resolve().parents[1];N='http://www.w3.org/2000/svg';E.register_namespace('',N)
INK='var(--ink,#766d5d)';WALL='var(--wall,#d7d0bf)';SIDE='var(--wall-side,#b8b09d)';ROOF='var(--roof,#b7b4aa)';ROOFSIDE='var(--roof-side,#97968e)';WOOD='var(--wood,#bcb29d)';GLASS='var(--glass,#e3e1d6)';LEAF='var(--foliage,#c7c7b7)';LEAFD='var(--foliage-dark,#abae9c)';LEAFL='var(--foliage-light,#dedecf)'
class SVG:
 def __init__(self):self.root=E.Element('{'+N+'}svg',{'viewBox':'-30 -280 350 320'});self.g=self.root
 def node(self,tag,**a):return E.SubElement(self.g,'{'+N+'}'+tag,{k.replace('_','-'):str(v) for k,v in a.items()})
 def path(self,d,fill='none',stroke=INK,sw=.9,**a):return self.node('path',d=d,fill=fill,stroke=stroke,stroke_width=sw,stroke_linejoin='round',stroke_linecap='round',**a)
 def rect(self,x,y,w,h,fill=WALL,**a):return self.node('rect',x=x,y=y,width=w,height=h,fill=fill,stroke=INK,stroke_width=.8,**a)
 def group(self,**a):old=self.g;self.g=self.node('g',**a);return old
 def finish(self):return E.tostring(self.root,encoding='unicode')+'\n'

def volume(s,x,y,w,h,roof='gable',material='wood',floors=2,windows=True):
 old=s.group(transform=f'translate({x} {y})');dx,dy=23,-16;eave=-h+2;ridge=-h-48
 # All roof edges derive from the same eave and extrusion as the walls.
 s.path(f'M{w} 0l{dx} {dy}V{-h+dy}L{w} {-h}Z',SIDE,data_part='wall-side')
 s.rect(0,-h,w,h,WALL,data_part='wall-front')
 if material=='wood':
  for yy in range(-h+12,0,12):s.path(f'M1 {yy}H{w-1}',stroke='var(--grain,#b5ac97)',sw=.55)
  for xx in [4,w-4]:s.rect(xx-2,-h,4,h,WOOD)
  s.path(f'M5 {-h+8}L{w-5} -10M5 -10L{w-5} {-h+8}',stroke=WOOD,sw=3)
 elif material=='brick':
  for yy in range(-h+9,0,10):
   s.path(f'M1 {yy}H{w-1}',stroke='var(--mortar,#bdb6a6)',sw=.45)
   for xx in range(8 if yy%20 else 18,int(w),20):s.path(f'M{xx} {yy}v-9',stroke='var(--mortar,#bdb6a6)',sw=.45)
 if roof=='hip':ridge+=12;front=f'M-8 {eave}L25 {ridge}H{w-25}L{w+8} {eave}Z';rx=w-25
 elif roof=='mansard':ridge-=10;front=f'M-8 {eave}L15 {ridge+15}L28 {ridge}H{w-28}L{w-15} {ridge+15}L{w+8} {eave}Z';rx=w-28
 elif roof=='gambrel':front=f'M-8 {eave}L14 {ridge+14}L{w/2} {ridge-12}L{w-14} {ridge+14}L{w+8} {eave}Z';ridge-=12;rx=w/2
 elif roof=='shed':ridge+=15;front=f'M-8 {eave}L-8 {ridge}L{w+8} {ridge+24}V{eave}Z';rx=0
 elif roof=='double':front=f'M-8 {eave}L{w*.25} {ridge}L{w*.5} {eave-9}L{w*.75} {ridge}L{w+8} {eave}Z';rx=w*.75
 else:rx=w/2;front=f'M-8 {eave}L{rx} {ridge}L{w+8} {eave}Z'
 if material!='basic':
  cx=w*.77;cy=ridge-14;s.rect(cx,cy,10,max(26,eave-cy-6),WALL,data_part='chimney');s.rect(cx-2,cy-3,14,5,WOOD)
 # Back roof is filled first, front roof overlays the ridge seam.
 s.path(f'M{rx} {ridge}l{dx} {dy}L{w+8+dx} {eave+dy}L{w+8} {eave}Z',ROOFSIDE,data_part='roof-side')
 s.path(front,ROOF,data_part='roof-front')
 if material!='basic':
  clipid='roof-clip-'+str(len(list(s.root.iter())))
  defs=s.node('defs');clip=E.SubElement(defs,'{'+N+'}clipPath',{'id':clipid});E.SubElement(clip,'{'+N+'}path',{'d':front})
  oldroof=s.group(clip_path='url(#'+clipid+')')
  for yy in range(int(ridge)-2,int(eave),9):
   s.path(f'M-10 {yy}H{w+12}',stroke='var(--roof-line,#99958a)',sw=.45)
   for xx in range(-8+(4 if yy%2 else 0),int(w)+10,14):s.path(f'M{xx} {yy}l3-8',stroke='var(--roof-line,#99958a)',sw=.4)
  s.g=oldroof
 s.path(f'M-8 {eave}H{w+8}',stroke=INK,sw=2,data_part='eave')
 # Chimney pierces the roof and extends below its surface; no detached glyph.
 if windows:
  for level in range(floors):
   yy=-h+19+level*(h-22)/floors
   for xx in ([16,w-43] if w<165 else [16,w/2-13,w-43]):
    if level==floors-1 and abs(xx-w/2)<30:continue
    s.rect(xx,yy,25,32,GLASS);s.path(f'M{xx+12.5} {yy}v32M{xx} {yy+16}h25',stroke=WOOD,sw=1.2);s.rect(xx-2,yy+32,29,3,WOOD)
  s.path(f'M{w/2-13} 0V-43Q{w/2} -56 {w/2+13} -43V0Z',WOOD);s.path(f'M{w/2-7} -36v27m7-29v29',stroke=INK,sw=.6)
  s.rect(-3,0,w+7,5,WOOD)
 s.g=old

def house(kind,material):
 s=SVG();s.node('ellipse',cx=135,cy=12,rx=132,ry=12,fill='var(--shadow,#aea992)',opacity='.18')
 if kind=='l':
  volume(s,110,-23,110,158,'gable',material,2,material!='basic');volume(s,0,0,150,95,'hip',material,1,material!='basic')
 elif kind=='u':
  volume(s,50,-38,155,90,'hip',material,1,False);volume(s,0,0,64,155,'gable',material,2,False);volume(s,200,0,64,155,'gable',material,2,False)
 elif kind=='tower':
  volume(s,0,0,155,97,'hip',material,1);volume(s,160,-5,65,208,'gable',material,3)
 elif kind=='arcade':
  volume(s,0,0,244,92,'hip',material,1,False)
  for x in [12,68,124,180]:s.path(f'M{x} 0V-38Q{x+23} -81 {x+46} -38V0Z','var(--glass,#e3e1d6)')
 elif kind=='round':
  s.path('M23-137Q123-94 223-137V-54Q123-14 23-54Z',WALL,data_part='wall-front');s.path('M11-135L123-235L235-135Q123-91 11-135Z',ROOF,data_part='roof-front')
 elif kind=='hex':
  s.path('M42-143L126-168L218-141V-25L132 0L42-24Z',WALL);s.path('M132-140L218-141V-25L132 0Z',SIDE);s.path('M30-143L126-237L232-142L132-111Z',ROOF);s.path('M126-237L232-142L132-111Z',ROOFSIDE)
 else:
  configs={'gable':(166,132,'gable',2),'hip':(204,116,'hip',2),'wide':(246,123,'hip',2),'barn':(206,157,'gambrel',2),'double':(237,149,'double',2),'low':(224,88,'shed',1),'tall':(117,210,'gable',3),'mansard':(174,182,'mansard',3),'rectangle':(190,128,'gable',1)}
  w,h,r,f=configs[kind];volume(s,0,0,w,h,r,material,f,material!='basic')
 return s

def crown(s,cx,cy,rx,ry,phase,fill=LEAF):
 pts=[]
 for i in range(80):
  a=i*math.tau/80;v=1+.085*math.sin(a*9+phase)+.04*math.cos(a*17-phase);pts.append((cx+math.cos(a)*rx*v,cy+math.sin(a)*ry*v))
 s.path('M'+'L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)+'Z',fill,sw=.6)

def tree(kind):
 s=SVG();s.root.set('viewBox','-20 -260 310 290');s.node('ellipse',cx=133,cy=8,rx=65,ry=10,fill='var(--shadow,#aaa997)',opacity='.2')
 if kind=='bare':
  s.path('M119 0L125-101L106-148L81-169L75-206M125-101L148-153L177-179L195-213M125-101L120-187L133-230',stroke=WOOD,sw=10)
  for d in ['M108-150L74-133L46-148M82-169L94-199M148-153L172-134L207-147M177-179L162-211M120-187L98-214']:s.path(d,stroke=WOOD,sw=4)
  return s
 if kind in ['pine','spruce']:
  s.rect(126,-211,13,211,WOOD)
  if kind=='pine':
   # Umbrella pine: tall clear trunk and flattened crown, not a spruce recolor.
   for x,y,rx,ry in [(75,-187,55,24),(143,-208,74,27),(207,-183,51,23),(139,-166,84,24)]:crown(s,x,y,rx,ry,.3,LEAFD if y==-166 else LEAF)
   s.path('M132-95Q115-162 71-182M133-126Q169-174 202-180',stroke=WOOD,sw=4)
  else:
   for i in range(7):
    y=-227+i*29;w=15+i*11;s.path(f'M133 {y-27}L{133-w} {y+20}L120 {y+9}L{133+w} {y+20}Z',LEAF if i%2 else LEAFD)
  return s
 if kind=='birch':
  for x,lean in [(104,-16),(137,9),(157,20)]:
   s.path(f'M{x-5} 0L{x+lean-4} -175L{x+lean+4} -175L{x+6} 0Z','var(--bark-light,#ded9ca)')
   for y in range(-140,-10,24):s.path(f'M{x-3} {y}h6',sw=1)
  for j,(x,y) in enumerate([(71,-175),(114,-210),(153,-193),(193,-168)]):crown(s,x,y,39,34,j*.8)
  return s
 if kind=='weeping':
  s.path('M118 0L122-142Q132-185 145-140L142 0Z',WOOD)
  crown(s,131,-173,92,43,.5,LEAFD)
  for i in range(13):
   x=44+i*14;y=-163+abs(x-130)*.15;s.path(f'M{x} {y}Q{x-12} -112 {x-4} {-64+(i%3)*18}',stroke=LEAF,sw=8)
  return s
 if kind=='slender':
  s.path('M128 0L131-224L139 0Z',WOOD);crown(s,133,-140,34,105,.3);crown(s,140,-107,23,62,2,LEAFD);return s
 if kind=='spreading':
  s.path('M111 0Q137-81 174-148L187-139Q157-65 132 0Z',WOOD)
  for j,(x,y,rx,ry) in enumerate([(90,-169,55,25),(151,-184,69,28),(216,-165,48,24)]):crown(s,x,y,rx,ry,j+.7,LEAFD if j==0 else LEAF)
  s.path('M140-70L109-156M166-113L224-158',stroke=WOOD,sw=5);return s
 if kind=='alder':
  for x in [90,128,164]:s.path(f'M128 0Q{x} -54 {x} -118',stroke=WOOD,sw=8)
  for j,(x,y) in enumerate([(79,-111),(126,-146),(181,-117)]):crown(s,x,y,49,53,j,LEAF if j%2 else LEAFD)
  return s
 if kind=='oak':
  s.path('M97 0L106-92L72-139L86-147L123-116L164-163L176-148L143-89L151 0L129-13Z',WOOD)
  for j,(x,y,rx,ry) in enumerate([(62,-156,50,35),(98,-191,56,36),(162,-191,61,38),(213,-151,48,37),(135,-137,71,36)]):crown(s,x,y,rx,ry,j,LEAFD if j in [0,4] else LEAF)
 elif kind=='beech':
  s.path('M119 0L124-153L140-157L145 0Z',WOOD);crown(s,130,-163,70,79,.8);crown(s,149,-119,52,43,2,LEAFD);s.path('M132-75L101-143M133-107L162-177',stroke=WOOD,sw=3)
 elif kind=='rowan':
  s.path('M125 0L129-117L99-161M132-106L170-169',stroke=WOOD,sw=9)
  for j,(x,y) in enumerate([(88,-167),(129,-194),(180,-166)]):
   crown(s,x,y,44,36,j)
   for k in range(5):s.node('circle',cx=x-12+k*5,cy=y+19+(k%2)*5,r=2.3,fill='var(--fruit,#aaa38c)')
 elif kind=='fruit':
  s.path('M116 0L122-87L86-121L93-133L132-109L171-137L178-123L143-86L149 0Z',WOOD)
  crown(s,131,-147,94,63,2);crown(s,133,-110,75,35,.4,LEAFD)
  for x,y in [(70,-147),(116,-170),(161,-160),(191,-136),(101,-124)]:s.node('circle',cx=x,cy=y,r=5,fill='var(--fruit,#aaa38c)',stroke=INK,stroke_width=.6)
 return s

def main():
 p=R/'catalog.json';c=json.loads(p.read_text());old={e['id']:e for e in c['elements']};entries=[]
 configs={'wood':['gable','hip','wide','barn','l','double'],'brick':['low','tall','wide','mansard','l','arcade'],'basic':['rectangle','tall','hex','l','u','round']}
 names={'gable':'Mái dốc','hip':'Mái chóp','wide':'Khối rộng','barn':'Mái gãy / nhà kho','l':'Khối chữ L','double':'Hai đầu hồi','low':'Một tầng mái lệch','tall':'Nhà phố cao','mansard':'Mái mansard','arcade':'Dãy vòm','rectangle':'Chữ nhật','hex':'Lục giác','u':'Chữ U','round':'Khối tròn'}
 tree_names={'oak':'Tán sồi nhiều nhánh','beech':'Tán bầu dục cao','birch':'Bạch dương ba thân','pine':'Thông tán dù','spruce':'Lá kim hình tháp','alder':'Nhiều thân tán thấp','rowan':'Tán chùm quả','spreading':'Nghiêng theo gió','slender':'Tán cột hẹp','weeping':'Tán rủ','bare':'Cành trụi','fruit':'Cây ăn quả thấp'}
 def save(ident,name,category,s,slots):
  s.root.set('id',ident.replace('.','-'));file='assets/'+ident+'.svg';(R/file).write_text(s.finish());entries.append({'id':ident,'name':name,'category':category,'view':'elevation','file':file,'viewBox':list(map(float,s.root.get('viewBox').split())),'colorSlots':slots,'source':{'type':'original design','owner':'Wizawi – Toà soạn Mộng Mị','style':'approved muted architectural linework; neutral geometry master'},'ports':[],'tags':['neutral-master','parametric-color','distinct-silhouette']})
 for material,kinds in configs.items():
  group={'wood':'Nhà gỗ','brick':'Nhà tường','basic':'Khung basic'}[material]
  for kind in kinds:save(f'house.{material}.{kind}',group+' · '+names[kind],'Nhà · '+group,house(kind,material),['wall','wall-side','roof','roof-side','wood','glass','ink'])
 for kind,name in tree_names.items():save('tree.'+kind,'Cây · '+name,'Cây · Hình khối riêng',tree(kind),['foliage','foliage-dark','foliage-light','wood','fruit','ink'])
 newids={e['id'] for e in entries};special={'tree.ancient','tree.willow'}
 c['elements']=[e for e in c['elements'] if not e['id'].startswith(('house.','tree.')) or e['id'] in special]+entries
 c['aliases']={k:v for k,v in c['aliases'].items() if k not in newids}
 (R/'palettes.json').write_text(json.dumps({'neutral':{},'warm':{'wall':'#c9b28b','wall-side':'#a38b68','roof':'#65705b','roof-side':'#475347','wood':'#92754e','glass':'#b6c9b7','foliage':'#91a477','foliage-dark':'#71865d','foliage-light':'#b2bf93','fruit':'#af785e'},'cool':{'wall':'#c1beb1','wall-side':'#96988d','roof':'#657c85','roof-side':'#435965','wood':'#85816c','glass':'#c0d1c8','foliage':'#87a198','foliage-dark':'#5e8179','foliage-light':'#aac4ae','fruit':'#bd9a67'}},indent=2)+'\n')
 p.write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n');print('Scenery geometry masters:',len(entries),'plus 2 special trees; total',len(c['elements']))
if __name__=='__main__':main()
