#!/usr/bin/env python3
"""Rebuild the approved Ministry 8–10 template offline; preserve every other map."""
import html, math
from atlas import ROOT, load, save, refresh
E=lambda s:html.escape(str(s),quote=True)
INK='#504531'; GOLD='#ac8750'; PAPER='#f1e6c9'
def txt(x,y,s,size=18,fill=INK,anchor='start',extra=''):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" {extra}>{E(s)}</text>'

def rect(x,y,w,h,fill,stroke='none',rx=0,extra=''):
 return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" {extra}/>'

def path(d,fill='none',stroke=INK,sw=1,extra=''):
 return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def line(x,y,x2,y2,stroke=GOLD,sw=1,extra=''):
 return f'<path d="M{x} {y}L{x2} {y2}" fill="none" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def ellipse(x,y,rx,ry,fill,stroke=GOLD,sw=1,extra=''):
 return f'<ellipse cx="{x}" cy="{y}" rx="{rx}" ry="{ry}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>'

def group(body,transform='',extra=''):
 return f'<g transform="{transform}" {extra}>{body}</g>'

def spot(id,name,body):
 return group(f'<title>{E(name)}</title>'+body,extra=f'data-id="{id}" tabindex="0" role="button" aria-label="{E(name)}" class="story-spot"')

def svg_start(w,h,prefix,title,subtitle):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><defs>
 <linearGradient id="{prefix}-paper" x2="1" y2="1"><stop stop-color="#f7efd9"/><stop offset=".55" stop-color="#eee0bc"/><stop offset="1" stop-color="#e5d3a9"/></linearGradient>
 <pattern id="{prefix}-grain" width="11" height="11" patternUnits="userSpaceOnUse"><path d="M1 3h1M7 9h1" stroke="#9b8051" stroke-opacity=".07"/></pattern>
 </defs><style>text{{font-family:Georgia,'Times New Roman',serif}}.story-spot{{cursor:pointer}}.story-spot:focus{{outline:none}}.story-spot:hover .point-halo,.story-spot:focus .point-halo{{stroke:#403325;stroke-width:3}}.fine{{letter-spacing:3px;font-family:Georgia,serif}}.map-label{{paint-order:stroke;stroke:#f1e6c9;stroke-width:5px;stroke-linejoin:round}}</style>
 <g id="camera">{rect(0,0,w,h,f'url(#{prefix}-paper)')}{rect(0,0,w,h,f'url(#{prefix}-grain)')}{rect(22,22,w-44,h-44,'none',GOLD)}{rect(30,30,w-60,h-60,'none','#c9b38a')}
 {txt(65,79,title,37)}{txt(67,110,subtitle,15,'#887252',extra='letter-spacing="1"')}{line(65,132,w-65,132)}'''

def panel_title(x,y,num,title,subtitle):
 return txt(x,y,num,19,GOLD,extra='class="fine"')+txt(x+58,y,title,30)+txt(x+58,y+28,subtitle,14,'#8a775b')

def seat(x,y,angle=0,scale=1):
 return group(rect(-12,-10,24,23,'#756047','#433b31',4)+rect(-10,-13,20,9,'#b59c73','#63523d',2)+rect(-7,-2,14,11,'#9e8663','#5c4c38',2),f'translate({x} {y}) rotate({angle}) scale({scale})')

def desk(x,y,w=90):
 return rect(x,y+4,w,39,'#6b4f35','#57422c',2)+rect(x,y,w,31,'#a98a57','#5b462e',2)+rect(x+10,y+8,20,14,'#d9cfae','#6f6349')+rect(x+w-30,y+7,15,19,'#45695f')

def wall_room(x,y,w,h,fill='#d3c9ac'):
 return rect(x+7,y+10,w,h,'#9a8e72')+rect(x,y,w,h,fill,'#776c56')+rect(x+7,y+7,w-14,h-14,'none','#b5a486')

def doorway(x,y,size=46):
 return line(x,y,x,y+size,PAPER,7)+path(f'M{x} {y}h{size}M{x+size} {y}Q{x+size} {y+size} {x} {y+size}',stroke='#8b7858',sw=1)

def floo(x,y,flip=False):
 art=path('M-42 37V-10Q-42-68 0-72Q42-68 42-10V37Z','#d1b47a','#65513b',2)+path('M-30 31V-10Q-30-52 0-55Q30-52 30-10V31Z','#36534b','#7e703f',3)
 art+=rect(-46,34,92,10,'#c5a364','#675133')+path('M-15 28Q-28 5-8-9Q-15 8 1-17Q23 1 16 28Z','#8da876','#b4bf84',1)+path('M-5 29Q-13 12 3 1Q17 17 8 29Z','#d5d2a0','none')
 art+=line(-39,-25,-39,28,'#e3cb91',3)+line(39,-25,39,28,'#e3cb91',3)
 return group(art,f'translate({x} {y})'+(' rotate(180)' if flip else ''))

def lift(x,y):
 s=rect(x,y,92,120,'#8b724d','#544735',2)+rect(x+6,y+6,80,103,'#c9ad70','#ead194',1)+rect(x+12,y+12,68,90,'#443f37','#927441')
 for i in range(8):s+=line(x+15+i*8,y+13,x+15+i*8,y+102,'#bc9d62',2)
 for i in range(5):s+=line(x+13,y+20+i*17,x+79,y+20+i*17,'#a98a54',1)
 s+=path(f'M{x+12} {y+102}L{x+46} {y+57}L{x+80} {y+102}',stroke='#d5b97c',sw=1.5)+rect(x+30,y-14,32,12,'#6e5b3b','#aa915e')
 return s

def fountain(x,y):
 s=ellipse(0,80,227,78,'#514c3f','none')+ellipse(0,63,224,77,'#a88a50','#695533',2)+ellipse(0,49,219,75,'#dcc28b','#715932',2)
 s+=ellipse(0,43,201,65,'#527e78','#d6c28e',3)+ellipse(0,37,193,58,'#79a49a','#aac4b0',2)
 for r in [57,82,110,147,176]:s+=ellipse(0,39,r,r*.26,'none','#c2d6bb',1,extra='opacity=".6"')
 # Scalloped basin and carved rim.
 for i in range(24):
  a=i*math.tau/24;xx=215*math.cos(a);yy=49+71*math.sin(a)
  s+=line(xx,yy,xx,yy+9,'#806336',2)
 s+=ellipse(0,25,82,31,'#8c743e','#58492f',2)+ellipse(0,13,80,28,'#ceb26d','#7b6034',2)+ellipse(0,2,66,23,'#dfc488','#846735',2)
 # Five original sculpted silhouettes: wizard, witch, centaur, goblin, house-elf.
 gold='#ceb16a';shadow='#8b713a';light='#f1d891'
 def person(cx,cy,witch=False):
  # Sculptural robes, turned head, raised wand and engraved folds; not generic cones.
  z=path('M-18 16Q-13 8-3 11L13 13Q27 28 28 46L22 69Q30 85 36 99Q3 113-33 98L-21 59Q-26 30-18 16Z','url(#mm-gold)',shadow,1.7)
  z+=path('M-9 25Q-14 62-22 95M1 24Q-2 58 4 101M12 29Q18 69 25 96',stroke=light,sw=2)
  z+=path('M-20 24Q-33 21-43 1L-50-18Q-54-23-57-20Q-62-17-59-10L-52 17Q-40 46-19 44Z','url(#mm-gold)',shadow,1.3)
  z+=ellipse(-55,-20,5,6,gold,shadow,1)
  z+=path('M-55-23L-64-67',stroke=shadow,sw=2.6)+path('M-63-64l4-3m-5 1l-3-3',stroke=light,sw=1)
  z+=path('M20 23Q32 32 43 19L53 4L59 10L48 35Q31 49 20 40Z','url(#mm-gold)',shadow,1.3)+ellipse(56,4,5,6,gold,shadow,1)
  z+=path('M-5 11V1H8V15',gold,shadow,1)
  z+=path('M-13-17Q-11-30 2-30Q18-28 17-13L23-6L17-4Q16 9 5 10Q-9 8-13-6Z','url(#mm-gold)',shadow,1.1)
  z+=path('M-11-22Q-10-38 5-36Q20-34 19-22L12-24Q4-28-4-20Z',shadow,shadow)
  z+=path('M7-16h5M15-3l-6 1',stroke=shadow,sw=1.2)
  if witch:
   z+=path('M-12-25Q-29-14-20 10Q-27 25-15 39M16-25Q31-6 22 12Q34 29 23 43',stroke=shadow,sw=6)
   z+=path('M-16-30Q-8-53 1-65L17-31Z','url(#mm-gold)',shadow,1.3)+ellipse(1,-29,25,3,gold,shadow)
  else:
   z+=path('M-9 2Q-6 28 10 38L18 4Q5 15-9 2Z',gold,shadow,1.2)+path('M-4 11L9 29M4 11L12 23',stroke=light,sw=1.4)
   z+=path('M-18-30Q-8-38-5-67L7-76L21-31Z','url(#mm-gold)',shadow,1.4)+ellipse(1,-30,27,4,gold,shadow)
  return group(z,f'translate({cx} {cy})')
 s+=person(-32,-146)+person(30,-114,True)
 # Goblin, left of the central pair.
 s+=path('M-121-47L-132-75L-108-64L-94-72L-96-46Z',gold,shadow,1.5)+ellipse(-111,-49,12,15,gold,shadow,1.3)
 s+=path('M-124-31L-95-32L-88 9L-131 9Z',gold,shadow,2)+path('M-121 8L-126 28M-99 8L-95 28',stroke=shadow,sw=7)
 s+=path('M-119-55l6-3m8 2l5-1M-117-39q7 4 12-1',stroke=shadow,sw=1.2)+rect(-137,-20,22,19,'#d7bb73',shadow,2)+line(-131,-16,-120,-16,light,1)
 # Centaur, horse torso and four distinct legs at right.
 s+=ellipse(103,-10,40,17,gold,shadow,2)+path('M72-13L65-46L79-55L91-27L101-18',gold,shadow,2)+ellipse(70,-61,10,13,gold,shadow,1.5)
 s+=path('M72-47L49-37L36-52M79-42L92-55L104-50',stroke=gold,sw=7)
 for xx,delta in [(76,-4),(92,4),(119,-3),(135,5)]:s+=path(f'M{xx} 1L{xx+delta} 30L{xx+delta+6} 34',stroke=shadow,sw=5)
 s+=path('M142-12Q168-2 157 16',stroke=gold,sw=7)
 # House-elf with broad ears and a draped tunic.
 s+=path('M149-33L134-52L154-46L170-49L187-56L175-33Z',gold,shadow,1.3)+ellipse(162,-34,11,13,gold,shadow)
 s+=path('M152-21L173-21L182 15L143 15Z',gold,shadow,1.5)+line(151,15,151,33,shadow,4)+line(173,15,174,33,shadow,4)
 # Jets spring from basin nozzles; restrained static highlights.
 for a,b,c in [(-170,-145,-65),(-145,-100,-30),(170,135,-55),(145,110,-15)]:
  s+=path(f'M{a} 41Q{b} -83 {c} 28',stroke='#d2eee1',sw=2.4)
  s+=ellipse(a,41,8,3,'#bbd6be','#e0e7bf',1)
 s+=path('M-180 78Q0 154 180 78',stroke='#e5cc8b',sw=2)+txt(0,145,'FOUNTAIN OF MAGICAL BRETHREN',13,'#c4af74','middle','letter-spacing="2"')
 return group(s,f'translate({x} {y})')

def build_ministry():
 w,h=1900,2900;places=[]
 def add(id,name,desc,target=None,focus=None):
  p={'id':id,'name':name,'desc':desc,'kind':'civic','tag':'BỘ','provenance':'book / inferred layout','precision':'designed','sourceRef':'Order of the Phoenix, chapters 7–8, 34–35; supplied Courtroom Ten reference','temporalScope':'all-story'}
  if target:p['targetMap']=target
  if focus:p['focus']=focus
  places.append(p);return id
 s=svg_start(w,h,'mm','MINISTRY OF MAGIC','TẦNG 8—10  ·  ATRIUM / BẢO MẬT / XÉT XỬ  ·  KÉO XUỐNG ĐỂ XEM TẦNG TIẾP THEO')
 s+='''<defs><linearGradient id="mm-gold" x2="1" y2=".6"><stop stop-color="#f0d796"/><stop offset=".5" stop-color="#b8954e"/><stop offset="1" stop-color="#7e6239"/></linearGradient><pattern id="mm-wood" width="80" height="32" patternUnits="userSpaceOnUse"><rect width="80" height="32" fill="#64503c"/><path d="M0 0H80V32M23 0V32" fill="none" stroke="#7b6549" stroke-width=".7"/></pattern><pattern id="mm-stone" width="44" height="36" patternUnits="userSpaceOnUse"><rect width="44" height="36" fill="#c9bfa2"/><path d="M0 0H44V36M22 0V36" stroke="#b9ad8f" stroke-width=".5" fill="none"/></pattern></defs>'''
 s+=panel_title(75,183,'08','ATRIUM','Floo đến / đi · Đài phun Magical Brethren · An ninh · Thang máy')
 # Atrium architectural shell and dark inlaid floor.
 s+=wall_room(90,230,1430,560,'#b89e67')+rect(106,247,1398,525,'url(#mm-wood)','#493c2c',2)
 s+=rect(154,276,1300,460,'none','#b69d66',extra='stroke-width="2"')
 for x in range(180,1440,80):s+=path(f'M{x} 302l15 10l-15 10l-15-10Z','#a38c58','#6a5739',.5)
 for i in range(6):
  x=250+i*210
  id=add(f'mm-floo-in-{i}','Floo · Lối đến '+str(i+1),'Lò Floo phía lối đến của Atrium. Số lò là lựa chọn bố cục.')
  s+=spot(id,'Floo đến',floo(x,340))
  id=add(f'mm-floo-out-{i}','Floo · Lối đi '+str(i+1),'Lò Floo phía rời Bộ; vùng đi bộ phía trước được giữ thoáng.')
  s+=spot(id,'Floo đi',floo(x,690))
 s+=txt(125,434,'ĐẾN',13,'#d2b980','middle',extra='transform="rotate(-90 125 434)"')+txt(125,635,'ĐI',13,'#d2b980','middle',extra='transform="rotate(-90 125 635)"')
 id=add('mm-fountain','Fountain of Magical Brethren','Đài phun biểu tượng: phù thủy nam, phù thủy nữ, nhân mã, goblin và gia tinh; bể đá, tượng vàng và các vòi nước. Hình dựng riêng cho template.')
 s+=spot(id,'Fountain of Magical Brethren',fountain(785,500))
 # Visitor arrival and security desk at west, lifts east.
 id=add('mm-visitor','Visitor Entrance · London','Buồng điện thoại từ London hạ xuống Atrium. Chọn liên kết để mở map thành phố.')
 s+=spot(id,'Visitor Entrance',rect(105,440,133,122,'#b39a66','#4f4634',4)+rect(117,452,109,93,'#4b5b51','#cfb573',3)+txt(171,483,'LONDON',14,'#e3d1a0','middle')+txt(171,509,'62442',20,'#e3d1a0','middle')+txt(171,532,'VISITORS',10,'#e3d1a0','middle'))
 id=add('mm-security','Security Desk','Quầy kiểm tra đũa phép và tiếp nhận khách; vị trí bố trí phục vụ lượt xem.')
 s+=spot(id,'An ninh',desk(1270,453,150)+seat(1345,523)+txt(1345,430,'AN NINH',15,'#cfbb89','middle'))
 s+=wall_room(1540,230,270,560,'#cabc94')+txt(1675,271,'LIFT LOBBY',20,anchor='middle')
 for i in range(2):
  for j in range(2):s+=lift(1570+i*115,320+j*179)
 s+=rect(1495,490,76,63,'#b6a16e','#7e6842')+line(1520,490,1520,553,'#d7c28c',8)+line(1540,490,1540,553,'#d7c28c',8)
 id=add('mm-lift-8','Thang máy · Tầng 8 → 9','Thang máy nối Atrium với tầng 9 và Bộ 1–7. Tầng 10 đi tiếp bằng cầu thang.',focus=[65,1000,1770,790])
 s+=spot(id,'Xuống tầng 9',rect(1568,690,215,54,'#7b6d48','#5c4e33',3)+txt(1675,723,'↓ TẦNG 9',18,'#f2e2b9','middle'))
 id=add('mm-up','Thang máy · Bộ tầng 1–7','Mở mặt cắt tầng 1–7 hiện có.','ministry2')
 s+=spot(id,'Bộ tầng 1–7',rect(1568,765,215,35,'#e9d9ae','#927846',3)+txt(1675,788,'↑ BỘ TẦNG 1–7',13,anchor='middle'))
 s+=line(1675,817,1675,1005,'#9a8155',4,extra='stroke-dasharray="8 7"')+txt(1700,924,'THANG MÁY',12,'#8b7552')
 s+=panel_title(75,945,'09','DEPARTMENT OF MYSTERIES','Sảnh 12 cửa · Nghiên cứu thời gian, ký ức, cái chết và những điều bí ẩn')
 # Floor 9 overall shell with research rooms grouped around the circular room.
 s+=wall_room(90,1000,1430,740,'#9c9e8f')+rect(105,1015,1398,710,'#67777a','#4e5b5b')
 rooms=[('mm-time','TIME ROOM',115,1035,330,245,'#a7ab97'),('mm-prophecy','HALL OF PROPHECY',1130,1035,345,285,'#6f8485'),('mm-death','DEATH CHAMBER',1120,1370,355,330,'#808c8b'),('mm-brain','BRAIN ROOM',115,1370,330,330,'#9cae9f'),('mm-space','SPACE CHAMBER',485,1035,590,125,'#506069'),('mm-love','LOVE · LOCKED ROOM',510,1600,540,100,'#8b8d94')]
 for id,name,x,y,rw,rh,fill in rooms:
  add(id,name,'Phòng thuộc Bảo mật; hình học và quan hệ vị trí trong template là bố trí suy diễn. Cảnh tĩnh dùng cho toàn cốt truyện.')
  art=wall_room(x,y,rw,rh,fill)+txt(x+rw/2,y+30,name,15,'#ebe3bd','middle','letter-spacing="1"')
  if id=='mm-time':
   for a in range(3):
    for b in range(2):
     xx=x+65+a*95;yy=y+80+b*90;art+=ellipse(xx,yy,24,24,'#cbb881','#62573c',2)+line(xx,yy,xx,yy-17,'#5b5340',2)+line(xx,yy,xx+12,yy+4,'#5b5340',2)
   art+=rect(x+100,y+185,130,33,'#d5c99a','#aa925d')
  if id=='mm-prophecy':
   for row in range(4):
    xx=x+28+row*78;art+=rect(xx,y+58,55,195,'#3c5358','#a0ad9c',2)
    for a in range(3):
     for b in range(7):art+=ellipse(xx+10+a*17,y+73+b*26,5,5,'#b5d0bd','#698681',.8)
  if id=='mm-death':
   for rr in range(4):art+=ellipse(x+rw/2,y+rh/2+22,145-rr*23,105-rr*18,'none','#a3a88f',6)
   art+=rect(x+rw/2-41,y+100,82,118,'#4b5152','#b9b29a',5)+path(f'M{x+rw/2-33} {y+208}V{y+140}Q{x+rw/2} {y+89} {x+rw/2+33} {y+140}V{y+208}',fill='#343e43',stroke='#c3bd9c',sw=5)
   art+=path(f'M{x+rw/2-24} {y+210}Q{x+rw/2+5} {y+170} {x+rw/2-10} {y+125}Q{x+rw/2+24} {y+148} {x+rw/2+22} {y+210}Z','#8d9f9d','none',extra='opacity=".65"')
  if id=='mm-brain':
   art+=rect(x+40,y+70,rw-80,rh-110,'#467d78','#d4cda1',5,extra='stroke-width="5"')
   for a,b in [(80,110),(185,140),(115,215),(220,245)]:art+=ellipse(x+a,y+b,20,13,'#cebea6','#877a6d',1.5)+path(f'M{x+a-9} {y+b}q7-16 12 0q10 12 15-1',stroke='#8e8073',sw=1.5)
  if id=='mm-space':
   for a in range(7):art+=ellipse(x+45+a*80,y+77,9+a%3*4,9+a%3*4,['#c2bd9a','#8ca4a5','#b5997b'][a%3],'#e6d7ae')
  if id=='mm-love':art+=rect(x+rw/2-25,y+43,50,39,'#5c5960','#d8c7a2',2)+ellipse(x+rw/2,y+59,5,7,'#b7a283','#d8c7a2')
  s+=spot(id,name,art)
 # Revolving circular hall, 12 visible doors, no motion in static review.
 # Six short, walkable threshold connectors; twelve rotunda doors remain visible.
 for d in ['M610 1270L520 1235H445','M970 1270L1060 1235H1130','M575 1470L510 1510H445','M1005 1470L1060 1510H1120','M790 1172V1150','M790 1588V1620','M1010 1380L1060 1345H1538']:
  s+=path(d,stroke='#b5b7a2',sw=34,extra='stroke-linejoin="round"')+path(d,stroke='#89988d',sw=26,extra='stroke-linejoin="round"')
 for xx,yy in [(445,1216),(1130,1216),(445,1492),(1120,1492)]:s+=doorway(xx,yy,37)
 id=add('mm-rotunda','Rotating Room · 12 Doors','Mười hai cửa đen quanh sảnh tròn; template giữ tĩnh. Cách đặt các phòng là suy diễn, không khẳng định sơ đồ canon cố định.')
 art=ellipse(790,1380,225,208,'#40575e','#bdc4aa',7)+ellipse(790,1380,192,177,'#456169','#a9b8a4',1)+ellipse(790,1380,118,109,'none','#78918e',1)
 for i in range(12):
  a=math.tau*i/12;xx=790+210*math.sin(a);yy=1380-195*math.cos(a)
  art+=group(rect(-22,-8,44,18,'#202f36','#a8b7a4',2),f'translate({xx:.1f} {yy:.1f}) rotate({i*30})')
 art+=txt(790,1371,'THE ROTATING',18,'#c4cfb8','middle','letter-spacing="2"')+txt(790,1401,'ROOM',26,'#d6d9bb','middle','letter-spacing="5"')+txt(790,1432,'12 DOORS',12,'#a9bfb2','middle','letter-spacing="2"')
 s+=spot(id,'Sảnh 12 cửa',art)
 # Front-of-department corridor: lift landing and stair connect OUTSIDE research rooms.
 s+=wall_room(1540,1000,270,740,'#b7b29a')+txt(1675,1045,'LEVEL NINE',19,anchor='middle')+lift(1630,1080)
 s+=rect(1435,1327,150,38,'#a6af9a','#5c655e')+rect(1490,1325,20,42,'#293b41','#bdc1a5',2)+txt(1668,1265,'LANDING',13,anchor='middle')
 id=add('mm-lift-9','Thang máy · Tầng 9 → Atrium','Quay lên Atrium bằng thang máy.',focus=[65,155,1770,690])
 s+=spot(id,'Lên Atrium',rect(1570,1295,210,48,'#d6c69e','#867450',3)+txt(1675,1324,'↑ ATRIUM',17,anchor='middle'))
 id=add('mm-stairs-9','Cầu thang · Tầng 9 → 10','Cầu thang ở hành lang bên ngoài Bảo mật; nối xuống phòng xử tầng 10. Không có thang máy dừng tầng 10.',focus=[65,1950,1770,830])
 art=rect(1580,1430,190,230,'#b9a985','#706248')
 for i in range(12):art+=line(1580,1430+i*19,1770,1430+i*19,'#7c6e53',1.5)
 art+=path('M1675 1455V1630m-12-16l12 16l12-16',stroke='#675739',sw=3)+txt(1675,1700,'↓ TẦNG 10 · STAIRS',13,anchor='middle')
 s+=spot(id,'Cầu thang xuống tầng 10',art)
 s+=line(1675,1755,1675,1955,'#9a8155',3,extra='stroke-dasharray="7 6"')+txt(1700,1860,'CẦU THANG',12,'#8b7552')
 s+=panel_title(75,1900,'10','WIZENGAMOT COURTROOMS','Phòng xử án số 10 · Phòng chờ · Khu hỗ trợ · Tuyến áp giải')
 # Courtroom composition based on the supplied reference.
 s+=wall_room(90,1960,1245,790,'url(#mm-stone)')
 s+=rect(240,2015,950,58,'#a78b58','#77613f')+txt(715,2052,'WIZENGAMOT',25,'#564b35','middle','letter-spacing="4"')
 for row in range(4):
  yy=2100+row*101
  d=f'M220 {yy}Q715 {yy+190} 1210 {yy}'
  s+=path(d,stroke='#9b855d',sw=26)+path(d,stroke='#c9b58c',sw=2)
  for i in range(11):
   t=i/10;xx=220+990*t;cy=yy+2*(1-t)*t*190
   s+=seat(round(xx,1),round(cy,1),(t-.5)*34,.9)
 id=add('mm-court','Courtroom Ten · Wizengamot','Phòng xử lớn với bốn hàng ghế cao dần bao quanh ghế bị cáo. Mặt bằng theo hướng ảnh tham khảo; số ghế và hình học là thiết kế.')
 s+=spot(id,'Phòng xử án số 10',rect(106,1980,1210,740,'transparent'))
 s+=rect(285,2650,860,46,'#9c8357','#6d5b3e')
 id=add('mm-accused','Accused’s Chair','Ghế bị cáo ở trung tâm, có xích hai bên; phía hội đồng cao hơn mặt sàn.')
 art=ellipse(715,2592,42,34,'#a29573','#625a45',2)+seat(715,2585,180,1.8)
 for xx in [670,760]:
  for yy in range(2560,2610,10):art+=ellipse(xx,yy,5,8,'none','#c7bb9b',1.8)
 s+=spot(id,'Ghế bị cáo',art)
 # Corridor and three support rooms, as in reference.
 s+=wall_room(1360,1960,150,790,'url(#mm-stone)')
 for idx,(id,name,yy) in enumerate([('mm-waiting','PHÒNG CHỜ',1960),('mm-office','KHU HỖ TRỢ',2230),('mm-escort','TUYẾN ÁP GIẢI',2500)]):
  add(id,name,'Phòng phụ bố trí theo ảnh tham khảo; chức năng hỗ trợ và hình học là thiết kế suy diễn.')
  art=wall_room(1530,yy,280,245,'url(#mm-stone)')+rect(1545,yy+12,250,30,'#eee1bf','#a28d66')+txt(1670,yy+33,name,15,anchor='middle')+doorway(1530,yy+130)
  if idx==0:art+=rect(1575,yy+74,190,125,'#9d8d69','#786344')+seat(1600,yy+103,90)+seat(1740,yy+103,-90)+ellipse(1670,yy+145,33,25,'#c3ac7b','#776348')
  elif idx==1:
   art+=desk(1600,yy+115,140)+seat(1670,yy+180)
   for a in range(13):art+=rect(1560+a*17,yy+65,12,25,['#7b815f','#98734d','#778587'][a%3])
  else:
   for a in range(3):art+=rect(1560+a*80,yy+90,60,95,'#726e5a','#a08e6c',2)+rect(1570+a*80,yy+100,40,74,'#8e9376','#b8ac8a')
  s+=spot(id,name,art)
 # The landing is at the top of corridor, not in the roof or courtroom benches.
 id=add('mm-stairs-10','Cầu thang · Tầng 10 → 9','Lối duy nhất nối lên tầng 9; tiếp tục dùng thang máy từ tầng 9 để trở về Atrium.',focus=[65,1000,1770,790])
 art=rect(1373,1980,122,170,'#b6a37d','#78694b')
 for j in range(10):art+=line(1373,1980+j*17,1495,1980+j*17,'#7b6b4c',1)
 art+=path('M1434 2128V1995m-10 14l10-14l10 14',stroke='#64563c',sw=3)
 s+=spot(id,'Cầu thang lên tầng 9',art)+doorway(1335,2610,65)
 for x in [145,1280]:
  for yy in [2120,2330,2550]:s+=rect(x-5,yy,10,27,'#71613f')+path(f'M{x-10} {yy}Q{x-18} {yy-18} {x} {yy-34}Q{x+19} {yy-12} {x+10} {yy}Z','#d7b76b','#806b3b',1)
 s+=txt(80,2810,'08 ↕ 09  THANG MÁY     /     09 ↕ 10  CẦU THANG',17,extra='letter-spacing="2"')+txt(80,2842,'Mặt bằng suy diễn để sử dụng toàn cốt truyện · Chọn phòng/đầu nối để xem thông tin · Hình tĩnh, không tự di chuyển nhân vật.',13,'#887252')+'</g></svg>'
 return {'title':'Bộ Pháp thuật · Tầng 8–10','svg':s,'bounds':[0,0,w,h],'places':places,'storyTemplate':True,'vertical':True,'floorViews':[{'name':'08 · Atrium','box':[65,155,1770,690]},{'name':'09 · Bảo mật','box':[65,945,1770,810]},{'name':'10 · Xét xử','box':[65,1900,1770,860]}],'intro':'Ba tầng xếp dọc · Cuộn xuống để xem tầng tiếp theo; Ctrl + cuộn để zoom.'}

if __name__ == '__main__':
    text, data = load(ROOT/'index.html')
    ministry = build_ministry()
    for place in ministry['places']:
        if place.get('targetMap') not in data['maps']:
            place.pop('targetMap', None)
    data['maps']['ministry-8-10'] = ministry
    save(ROOT/'index.html', text, data)
    refresh(ROOT/'index.html', text, data)
    print('Updated Ministry 8–10; all other maps preserved.')
