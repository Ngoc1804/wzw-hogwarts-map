"""One offline connected test map, using current library furniture and 7 corridor forms."""
from pathlib import Path
import json,copy,re,html
import xml.etree.ElementTree as E
R=Path(__file__).resolve().parents[1];N='http://www.w3.org/2000/svg';E.register_namespace('',N)
catalog=json.loads((R/'elements/catalog.json').read_text());by={e['id']:e for e in catalog['elements']}
rooms=[
 ('entry','Sảnh nghỉ',30,570,110,160,'E','lounge'),
 ('study-west','Phòng học phụ',620,40,230,190,'W','classroom'),
 ('office-west','Văn phòng trực',30,240,105,170,'E','office'),
 ('prep','Phòng chuẩn bị',430,270,160,130,'E','store'),
 ('class-east','Lớp Bùa chú mẫu',1190,280,230,150,'W','classroom'),
 ('tower-a','Phòng đọc tháp',980,20,240,90,'S','library'),
 ('tower-b','Phòng quan sát',1480,20,240,90,'S','office'),
 ('store-main','Kho dụng cụ',350,430,170,160,'S','store'),
 ('class-main','Lớp học nhóm',340,730,190,150,'N','classroom'),
 ('rest','Gian nghỉ phía Đông',1660,570,210,170,'W','lounge'),
 ('dorm','Phòng ngủ mẫu',1310,730,210,130,'N','dorm'),
 ('loop-center','Phòng đọc giữa vòng',240,1000,220,160,'E','library'),
 ('loop-south','Kho lưu trữ',210,1360,280,110,'N','store'),
 ('lab','Phòng thực hành',790,1220,220,150,'N','classroom'),
 ('office-south','Phòng làm việc',570,1030,180,130,'N','office'),
 ('library-east','Thư viện nhánh',1650,1210,220,180,'W','library')]
branches=['M140 650H180','M135 325H180','M580 150H600V135H620','M590 335H650V350','M1150 350H1190V355','M1100 110V150','M1600 110V150','M435 590V650','M435 650V730','M1600 650H1660V655','M1415 650V730','M460 1080H550','M350 1300V1360','M900 1150V1220','M660 900V1030','M1600 1300H1650','M180 650V900H150','M550 900H650']
# A corridor network, not disconnected comparison cards. Rooms attach at wall openings.
config=[{'id':'straight','name':'Thẳng','box':{'x':180,'y':628,'width':1420,'height':44}}, {'id':'L','name':'Chữ L','box':{'x':180,'y':150,'width':400,'height':500}}, {'id':'T','name':'Chữ T','box':{'x':650,'y':350,'width':500,'height':300}}, {'id':'cross','name':'Giao chữ thập','box':{'x':650,'y':650,'width':500,'height':500}}, {'id':'U','name':'Chữ U','box':{'x':1100,'y':150,'width':500,'height':500}}, {'id':'curved','name':'Uốn cong','box':{'x':1150,'y':900,'width':450,'height':400}}, {'id':'loop','name':'Vòng khép kín','box':{'x':150,'y':900,'width':400,'height':400}}]
serial=0

def asset(ident,x,y,w,h):
 global serial
 serial+=1;entry=by[ident];root=E.fromstring((R/'elements'/entry['file']).read_text());ids={n.get('id'):f'demo-{serial}-'+n.get('id') for n in root.iter() if n.get('id')}
 for n in root.iter():
  for k,v in list(n.attrib.items()):
   if k=='id':n.set(k,ids[v])
   else:
    for old,new in ids.items():v=v.replace('url(#'+old+')','url(#'+new+')').replace('#'+old if k.endswith('href') else '\0', '#'+new if k.endswith('href') else '\0')
    n.set(k,v)
 root.set('x',str(x));root.set('y',str(y));root.set('width',str(w));root.set('height',str(h));root.set('data-asset',ident)
 occ=entry.get('occupancy')
 if occ and occ.get('width') and occ.get('height'):root.set('viewBox',' '.join(str(occ[k]) for k in ['x','y','width','height']))
 root.set('style','--wood:#a78a60;--surface:#d8c6a3;--wall:#d9c9a7;--ink:#7c6c50;--glass:#bdc9ae;--roof:#8a9275;--foliage:#91a477')
 return E.tostring(root,encoding='unicode')

def furniture(kind,x,y,w,h):
 if kind=='classroom':
  return ''.join(asset('table.study',x+18+c*(w-45)/2,y+18+r*(h-44)/2,50,27)+asset('seat.dining',x+32+c*(w-45)/2,y+46+r*(h-44)/2,18,19) for r in range(2) for c in range(2))
 if kind=='office':return asset('table.desk',x+16,y+18,w*.55,h*.28)+asset('seat.armchair',x+w*.4,y+h*.53,28,28)+asset('storage.bookcase-top',x+12,y+h-22,w-24,15)
 if kind=='store':return ''.join(asset('object.crate' if i%2 else 'object.chest',x+15+(i%3)*(w-40)/3,y+18+(i//3)*45,30,30) for i in range(6))
 if kind=='library':return asset('storage.bookcase-top',x+12,y+10,w-24,20)+asset('storage.bookcase-top',x+12,y+h-26,w-24,16)+asset('table.round',x+w*.36,y+h*.4,50,34)+asset('seat.stool',x+w*.65,y+h*.44,17,17)
 if kind=='dorm':return ''.join(asset('bed.single',x+15+i*(w-30)/3,y+15,42,65) for i in range(3))
 return asset('object.rug',x+w*.12,y+h*.2,w*.74,h*.65)+asset('seat.sofa',x+w*.2,y+h*.22,w*.6,25)+asset('table.coffee',x+w*.36,y+h*.55,w*.3,24)
svg=['<svg id="scene" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1500"><defs><pattern id="floor" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#e6d8b9"/><path d="M0 0H24V24" fill="none" stroke="#cdbd98" stroke-width=".5"/></pattern></defs><rect width="1920" height="1500" fill="#eee4d1"/><g id="corridor-walls"/><g id="corridor-floors"/><g id="corridor-highlights"/>']
for ident,name,x,y,w,h,side,kind in rooms:
 door={'N':(x+w/2,y),'S':(x+w/2,y+h),'W':(x,y+h/2),'E':(x+w,y+h/2)}[side];dx,dy=door
 # A real break in the wall stroke, not a transparent rectangle over a closed room.
 if side=='N':wall=f'M{dx-14} {y}H{x}V{y+h}H{x+w}V{y}H{dx+14}'
 elif side=='S':wall=f'M{dx-14} {y+h}H{x}V{y}H{x+w}V{y+h}H{dx+14}'
 elif side=='W':wall=f'M{x} {dy-14}V{y}H{x+w}V{y+h}H{x}V{dy+14}'
 else:wall=f'M{x+w} {dy-14}V{y}H{x}V{y+h}H{x+w}V{dy+14}'
 svg.append(f'<g data-room="{ident}" tabindex="0" role="button" aria-label="{name}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="url(#floor)"/><path d="{wall}" fill="none" stroke="#9a8762" stroke-width="6" stroke-linejoin="round"/>{furniture(kind,x,y,w,h)}<path d="M{dx-12} {dy}h24" stroke="#b4a078" stroke-width="1"/><title>{name}</title></g>')
svg.append('</svg>')
module=(R/'runtime/corridors.mjs').read_text().replace('export ','')
data=json.dumps({'corridors':config,'branches':branches,'rooms':[{'id':r[0],'name':r[1],'kind':r[7]} for r in rooms]},ensure_ascii=False).replace('<','\\u003c')
page='''<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>WIZAMAP · Thử hành lang và ghép phòng</title><style>*{box-sizing:border-box}body{margin:0;color:#49362b;background:#eee4d1;font:15px Georgia}header{background:#3b2925;color:#eee0c2;padding:15px 22px}h1{font-size:23px;margin:0 0 6px}header p{font-size:13px;margin:0}nav{padding:10px;display:flex;gap:8px;flex-wrap:wrap;border-bottom:1px solid #baa585}button,select{font:inherit;padding:7px;background:#faf2df;color:#49362b;border:1px solid #baa585;border-radius:3px}main{display:grid;grid-template-columns:minmax(0,1fr) 260px;height:calc(100vh - 145px)}#viewport{overflow:hidden;touch-action:none}#scene{width:100%;height:100%;display:block}aside{padding:18px;background:#e5d9bf;border-left:1px solid #baa585;overflow:auto}aside button{display:block;width:100%;text-align:left;margin:5px 0;font-size:12px}[data-room]{cursor:pointer}[data-room]:hover>path:first-of-type,[data-room].selected>path:first-of-type{stroke:#854d40}small{line-height:1.5}#highlight{color:#865b3f}@media(max-width:700px){main{grid-template-columns:1fr;height:auto}#viewport{height:70vh}aside{border-left:0}}</style><header><h1>WIZAMAP · Hành lang và phòng — bản thử</h1><p>7 kiểu hành lang trong một mạng nối liền · 16 phòng ghép asset hiện hành · bố cục minh họa AU, không phải sơ đồ canon.</p></header><nav><select id="type"><option value="">Toàn bộ hành lang</option></select><button id="minus">−</button><button id="plus">+</button><button id="fit">Vừa khung</button><button id="download">Tải HTML offline</button><span id="highlight"></span></nav><main><div id="viewport">'''+''.join(svg)+'''</div><aside><h2 id="title">Chọn một phòng</h2><p id="info">Kéo để di chuyển, cuộn hoặc +/− để zoom. Chọn kiểu hành lang để tô đường tương ứng.</p><small>Đây là test hình học riêng. Chưa nối NPC, quest hoặc UI vận hành vào MAP_DATA. Không lưu layout giữa lượt.</small><div id="room-list"></div></aside></main><script id="data" type="application/json">'''+data+'''</script><script>'''+module+'''
const DATA=JSON.parse(document.querySelector('#data').textContent),NS='http://www.w3.org/2000/svg',q=s=>document.querySelector(s),scene=q('#scene');
function path(parent,d,color,width,id){const n=document.createElementNS(NS,'path');for(const [k,v]of Object.entries({d,fill:'none',stroke:color,'stroke-width':width,'stroke-linejoin':'round','stroke-linecap':'round'}))n.setAttribute(k,v);if(id)n.dataset.corridor=id;parent.append(n);return n}
const forms=DATA.corridors.map(c=>({...c,...corridorGeometry(c.id,c.box)})),segments=[...forms.flatMap(c=>c.paths.map(d=>({d,id:c.id}))),...DATA.branches.map(d=>({d,id:'connector'}))];
for(const s of segments)path(q('#corridor-walls'),s.d,'#9a8762',54,s.id);for(const s of segments)path(q('#corridor-floors'),s.d,'#d7c7a4',42,s.id);
for(const c of forms){let o=document.createElement('option');o.value=c.id;o.textContent=c.name;q('#type').append(o)}
q('#type').onchange=e=>{q('#corridor-highlights').replaceChildren();const c=forms.find(c=>c.id===e.target.value);if(c)for(const d of c.paths)path(q('#corridor-highlights'),d,'#a66944',9);q('#highlight').textContent=c?c.name:''};
function select(id){const r=DATA.rooms.find(r=>r.id===id);document.querySelectorAll('[data-room]').forEach(n=>n.classList.toggle('selected',n.dataset.room===id));q('#title').textContent=r.name;q('#info').textContent='Chức năng: '+r.kind+' · Cửa mở thông với hành lang; nội thất dùng asset thư viện.'}
for(const r of DATA.rooms){let b=document.createElement('button');b.textContent=r.name;b.onclick=()=>select(r.id);q('#room-list').append(b);const n=scene.querySelector('[data-room="'+r.id+'"]');n.onclick=()=>{if(!moved)select(r.id)};n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(r.id)}}}
let box=[0,0,1920,1500];function apply(){scene.setAttribute('viewBox',box.join(' '))}function zoom(f){const w=box[2]*f,h=box[3]*f;if(w<300||w>6000)return;box=[box[0]+(box[2]-w)/2,box[1]+(box[3]-h)/2,w,h];apply()}q('#plus').onclick=()=>zoom(.8);q('#minus').onclick=()=>zoom(1.25);q('#fit').onclick=()=>{box=[0,0,1920,1500];apply()};scene.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1)};
let drag,moved=false;scene.onpointerdown=e=>{moved=false;drag={x:e.clientX,y:e.clientY,box:[...box]}};scene.onpointermove=e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<4&&!moved)return;moved=true;if(!scene.hasPointerCapture(e.pointerId))scene.setPointerCapture(e.pointerId);const r=scene.getBoundingClientRect(),scale=Math.min(r.width/drag.box[2],r.height/drag.box[3]);box=[drag.box[0]-(e.clientX-drag.x)/scale,drag.box[1]-(e.clientY-drag.y)/scale,...drag.box.slice(2)];apply()};scene.onpointerup=scene.onpointercancel=()=>drag=null;
q('#download').onclick=()=>{const copy=document.documentElement.cloneNode(true);copy.querySelector('#corridor-walls').replaceChildren();copy.querySelector('#corridor-floors').replaceChildren();copy.querySelector('#corridor-highlights').replaceChildren();copy.querySelector('#room-list').replaceChildren();copy.querySelector('#type').replaceChildren(copy.querySelector('#type option').cloneNode(true));copy.querySelector('#scene').setAttribute('viewBox','0 0 1920 1500');const url=URL.createObjectURL(new Blob(['<!doctype html>'+copy.outerHTML],{type:'text/html'})),a=document.createElement('a');a.href=url;a.download='WIZAMAP_Corridor_Demo.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)};
</script></html>'''
(R/'tools/corridor-demo.html').write_text(page);print('Built offline corridor demo:',len(rooms),'rooms;',len(config),'types')
