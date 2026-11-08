from lxml import etree as E
import math,random,copy,re
N='http://www.w3.org/2000/svg'
def node(tag,parent=None,**a):
 e=E.Element('{'+N+'}'+tag,{k.replace('_','-'):str(v) for k,v in a.items() if v is not None})
 if parent is not None:parent.append(e)
 return e
def path(p,d,fill='none',stroke='#68513c',sw=1,**a):return node('path',p,d=d,fill=fill,stroke=stroke,stroke_width=sw,stroke_linejoin='round',stroke_linecap='round',**a)
def rect(p,x,y,w,h,fill,stroke='#796346',sw=1,rx=0,**a):return node('rect',p,x=x,y=y,width=w,height=h,fill=fill,stroke=stroke,stroke_width=sw,rx=rx,**a)
def ellipse(p,x,y,rx,ry,fill,stroke='none',sw=.7,**a):return node('ellipse',p,cx=x,cy=y,rx=rx,ry=ry,fill=fill,stroke=stroke,stroke_width=sw,**a)
def line(p,x,y,X,Y,c='#8b7657',sw=1,**a):return node('line',p,x1=x,y1=y,x2=X,y2=Y,stroke=c,stroke_width=sw,stroke_linecap='round',**a)
def text(p,x,y,s,size=12,c='#584530',anchor='middle',**a):
 e=node('text',p,x=x,y=y,fill=c,font_family='Georgia,serif',font_size=size,text_anchor=anchor,**a);e.text=s;return e
def group(p,**a):return node('g',p,**a)
def root(w,h,title):
 r=E.Element('{'+N+'}svg',nsmap={None:N},viewBox=f'0 0 {w} {h}',id='map');r.set('aria-label',title);return r

def prefix(r,p):
 ids={e.get('id'):p+e.get('id') for e in r.iter() if e.get('id')}
 for e in r.iter():
  for k,v in list(e.attrib.items()):
   if k=='id':e.set(k,ids[v]);continue
   v=re.sub(r'url\(#([^)]*)\)',lambda m:'url(#'+ids.get(m[1],m[1])+')',v)
   if k.endswith('href') and v.startswith('#'):v='#'+ids.get(v[1:],v[1:])
   e.set(k,v)
  if e.tag.endswith('style') and e.text:
   for old,new in ids.items():e.text=re.sub(r'#'+re.escape(old)+r'(?![\w-])','#'+new,e.text)
 return r

def tint(h,f):
 rgb=[int(h[i:i+2],16) for i in [1,3,5]];return '#'+''.join(f'{max(0,min(255,round(v*f))):02x}' for v in rgb)
def lantern(p,x,y,scale=1):
 g=group(p,transform=f'translate({x} {y}) scale({scale})');path(g,'M0 0h13q7 0 7 8',stroke='#5e5a44',sw=2);line(g,18,8,18,13,'#5e5a44',1.5);path(g,'M10 17l8-7 8 7Z','#63634e');rect(g,12,17,12,18,'#d4be80','#63634e',1);line(g,18,17,18,35,'#8e8059',.8);path(g,'M12 35h12l-6 5Z','#63634e')
def crate(p,x,y,w=26,h=22):
 rect(p,x,y,w,h,'#a78d65','#7c674a',.8);line(p,x+3,y+3,x+w-3,y+h-3,'#c4ac7c',1);line(p,x+w-3,y+3,x+3,y+h-3,'#7c674a',1)
def barrel(p,x,y,s=1):
 g=group(p,transform=f'translate({x} {y}) scale({s})');path(g,'M-11-28Q-16-14-11 0Q0 4 11 0Q16-14 11-28Z','#99835a','#736246',.8);ellipse(g,0,-28,11,4,'#b6a078','#736246');
 for yy in [-22,-7]:path(g,f'M-12 {yy}q12 4 24 0',stroke='#66654e',sw=2)
 for xx in [-6,0,6]:line(g,xx,-24,xx,0,'#7f6b4c',.6)
