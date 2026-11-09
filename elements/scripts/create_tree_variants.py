"""Original illustrated tree variants matching the Quidditch muted layered style."""
from pathlib import Path
import math,xml.etree.ElementTree as E,json
R=Path(__file__).resolve().parents[1];N='http://www.w3.org/2000/svg';E.register_namespace('',N)
def organic(cx,cy,rx,ry,phase):
 pts=[]
 for i in range(64):
  a=i*math.tau/64;v=1+.10*math.sin(a*7+phase)+.045*math.cos(a*13+phase)
  pts.append((cx+rx*math.cos(a)*v,cy+ry*math.sin(a)*v))
 return 'M'+'L'.join(f'{x:.2f} {y:.2f}' for x,y in pts)+'Z'
for ident,lean in [('tree.spreading',-20),('tree.slender',12)]:
 s=E.Element('{'+N+'}svg',{'viewBox':'0 0 230 280','id':ident.replace('.','-')})
 def node(tag,**attrs):return E.SubElement(s,'{'+N+'}'+tag,{k.replace('_','-'):str(v) for k,v in attrs.items()})
 node('ellipse',cx=117,cy=264,rx=61,ry=10,fill='#87976c',opacity='.17')
 node('path',d=f'M99 259L105 145L{87+lean} 100L{109+lean} 141L128 128L148 86L137 146L129 256L145 267L118 257L92 271Z',fill='#a38c60',stroke='#8d7955',stroke_width=1.1)
 for x,y,rx,ry,col,phase in [(139+lean,112,63,40,'#71865d',.8),(83+lean,82,58,38,'#91a477',1.3),(137+lean,53,53,38,'#a0af7e',2.3)]:
  node('path',d=organic(x,y,rx,ry,phase),fill=col,stroke='#819165',stroke_width='.8')
 node('path',d=f'M118 165Q119 119 {86+lean} 100M119 142Q129 109 149 99',fill='none',stroke='#a28d60',stroke_width=3,stroke_linecap='round')
 node('path',d='M112 186l-2 24m14-33-2 19m-11 29-2 16',fill='none',stroke='#84754e',stroke_width='.8')
 (R/'assets'/f'{ident}.svg').write_text(E.tostring(s,encoding='unicode')+'\n')
p=R/'catalog.json';c=json.loads(p.read_text())
for e in c['elements']:
 if e['id'] in ['tree.spreading','tree.slender']:
  e['viewBox']=[0,0,230,280];e['name']='Cây · Tán lệch' if e['id']=='tree.spreading' else 'Cây · Tán nhiều tầng';e['source']={'type':'original design','styleReference':'approved Quidditch muted layered trees'}
p.write_text(json.dumps(c,ensure_ascii=False,indent=2)+'\n')
