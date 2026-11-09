from svgkit import *
from pathlib import Path
import json
OUT=Path(__file__).resolve().parents[1]/'assets';OUT.mkdir(exist_ok=True)
def house(kind):
 r=root(256,256,kind);g=group(r,data_layer='structure');defs=node('defs',r)
 # Neutral editable defaults. The map supplies its own palette through CSS properties.
 wall='var(--wall,#f1eadb)';wood='var(--wood,#ddd4bf)';roof='var(--roof,#e2dfd3)';glass='var(--glass,#eeeadd)';ink='#75684f'
 x,y,w,h=51,102,154,121
 if kind in ['townhouse','inn','corner-shop']:y=73;h=150
 if kind in ['shed','annex']:x,y,w,h=61,135,134,88
 if kind=='hall':x,y,w,h=36,105,184,118
 if kind=='station':x,y,w,h=24,112,208,102
 if kind=='glasshouse':
  path(g,'M30 216V111L128 62L226 111V216Z',glass,ink,1.3)
  path(g,'M30 111H226M128 62V216M30 146H226M30 181H226',stroke=wood,sw=2)
  for xx in [60,94,162,196]:path(g,f'M{xx} 216V{111-abs(128-xx)*.32}',stroke=wood,sw=2)
  rect(g,111,166,34,50,glass,ink,1);return r
 path(g,f'M{x+w} {y+h}l14-10V{y-10}l-14 10Z',wood,ink,1)
 rect(g,x,y,w,h,wall,ink,1.4)
 for xx in [x,x+w-7]:rect(g,xx,y,7,h,wood,ink,.7)
 for yy in range(y+32,y+h,31):line(g,x+7,yy,x+w-7,yy,wood,1)
 # Hogsmeade vocabulary: projected slate roof, timber edges and leaded windows.
 rg=group(r,data_layer='roof')
 if kind in ['inn','station','shed']:d=f'M{x-12} {y+3}l25-51h{w-26}l25 51Z'
 else:d=f'M{x-14} {y+3}L{128 if kind!='corner-shop' else 112} {y-60}L{x+w+14} {y+3}Z'
 path(rg,d,roof,ink,1.3)
 clip=node('clipPath',defs,id='roof-clip');path(clip,d,'white','none');t=group(rg,clip_path='url(#roof-clip)')
 for yy in range(y-50,y,8):path(t,f'M{x-20} {yy}h{w+40}',stroke='var(--roof-line,#beb8a6)',sw=.7)
 line(rg,x-14,y+6,x+w+14,y+6,wood,5)
 rect(rg,x+w-25,y-63,12,40,wood,ink,.8);rect(rg,x+w-28,y-67,18,6,wall,ink,.8)
 node('g',r,data_emitter='chimney',transform=f'translate({x+w-19} {y-67})')
 openings=group(r,data_layer='openings')
 def win(xx,yy,ww=27,hh=37,shutters=False):
  rect(openings,xx-3,yy-3,ww+6,hh+6,wood,ink,.8)
  rect(openings,xx,yy,ww,hh,glass,ink,.65,data_window='true')
  path(openings,f'M{xx+ww/2} {yy}v{hh}M{xx} {yy+hh/2}h{ww}M{xx+3} {yy+hh-4}l{ww-6} {-hh+8}',stroke=wood,sw=1.3)
  if shutters:
   for a in [xx-12,xx+ww+4]:
    rect(openings,a,yy,8,hh,wood,ink,.6)
    for b in range(yy+4,yy+hh,6):line(openings,a+1,b,a+7,b,ink,.45)
 bottom=y+h;dy=bottom-60
 path(openings,f'M111 {bottom}V{dy+8}Q128 {dy-10} 145 {dy+8}V{bottom}Z',wood,ink,1.2)
 path(openings,f'M117 {dy+11}h22v22h-22ZM117 {bottom-20}h22v14h-22Z',glass,ink,.6)
 ellipse(openings,138,bottom-28,1.7,1.7,ink)
 win(x+17,bottom-57,27,38,kind in ['cottage','garden','porch','farmhouse']);win(x+w-44,bottom-57,27,38,kind in ['cottage','timber'])
 if h>=118:
  for xx in [x+22,x+w-49]:win(xx,y+18,27,33)
 if kind in ['shop','inn','corner-shop']:
  for xx in [x+13,x+w-53]:win(xx,bottom-62,40,47)
  board=group(r,data_layer='decor',data_optional='sign');rect(board,x+10,bottom-87,w-20,18,wood,ink,.8)
 if kind=='station':
  ellipse(openings,128,y+27,14,14,wall,ink,1);path(openings,f'M128 {y+17}v10l8 4',stroke=ink,sw=1.2)
 if kind in ['garden','porch','farmhouse']:
  d=group(r,data_layer='decor',data_optional='porch');path(d,f'M103 {bottom-60}l25-14 25 14Z',roof,ink,.8);line(d,106,bottom-59,106,bottom,wood,3);line(d,150,bottom-59,150,bottom,wood,3)
 rect(r,x-6,bottom,w+12,7,wall,ink,.8)
 return r
def hagrid():
 r=root(256,220,'Nhà Hagrid · lục giác');g=group(r,data_layer='structure');ink='#75684f';wall='var(--wall,#e9e0cd)';roof='var(--roof,#dddacb)';wood='var(--wood,#d4c8ae)'
 bottom=[(60,153),(95,130),(162,130),(197,153),(162,176),(95,176)];top=[(x,y-78) for x,y in bottom]
 for i in [0,1,2,5,4,3]:
  a=bottom[i];b=bottom[(i+1)%6];c=top[(i+1)%6];d=top[i]
  path(g,'M'+'L'.join(f'{x} {y}' for x,y in [a,b,c,d])+'Z',wall,ink,1.1)
  for j in [20,40,60]:line(g,a[0],a[1]-j,b[0],b[1]-j,'var(--mortar,#b5a78d)',.65)
 rg=group(r,data_layer='roof',data_roof_facets='6')
 for i in range(6):
  a=top[i];b=top[(i+1)%6];path(rg,f'M128 20L{a[0]} {a[1]-4}L{b[0]} {b[1]-4}Z',roof,ink,1)
 path(rg,'M128 20L60 71M128 20L197 71M128 20L95 94M128 20L162 94',stroke='var(--roof-line,#b3af9c)',sw=1)
 rect(rg,162,18,14,46,wall,ink,1);rect(rg,158,14,22,7,wood,ink,.8)
 o=group(r,data_layer='openings');path(o,'M116 176V137Q128 119 141 137V176Z',wood,ink,1.3)
 for x in [76,169]:rect(o,x,111,16,26,'var(--glass,#ede6cf)',ink,1,data_window='true');line(o,x+8,111,x+8,137,wood,1)
 node('g',r,data_emitter='chimney',transform='translate(169 14)');node('g',r,data_port='entry',transform='translate(128 176)')
 return r
types=['annex','corner-shop','cottage','farmhouse','glasshouse','hall','inn','shed','shop','station','timber','townhouse']
for k in types:Path(OUT/f'house.{k}.svg').write_text(E.tostring(house(k),encoding='unicode'))
Path(OUT/'house.hagrid-hex.svg').write_text(E.tostring(hagrid(),encoding='unicode'))
for path in OUT.glob('house.*.svg'):
 r=E.fromstring(path.read_bytes())
 r.set('id',path.stem.replace('.','-'))
 for e in r.iter():
  if e.get('stroke') not in (None,'none'):e.set('stroke','var(--ink,#75684f)')
  f=e.get('fill','')
  if f.startswith('var('):e.set('fill',re.sub(r'var\((--[\w-]+),[^)]*\)',r'var(\1,none)',f))
  elif f.startswith('#'):e.set('fill','var(--surface,none)')
 path.write_text(E.tostring(r,encoding='unicode'))
print('13 editable house frameworks rebuilt; porch/garden alias farmhouse')
