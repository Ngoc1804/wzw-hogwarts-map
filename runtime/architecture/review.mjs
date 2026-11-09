import {createElements} from "../../elements/architecture/elements.mjs";
import {createFurnishings} from "../../elements/architecture/furnishing.mjs";
import {horizontalRooms,variantModel,EXTRA_INFO,isExtra,rectangle,ppath} from "./recipes.mjs";
export function mountArchitectureViewer(META){
const q=s=>document.querySelector(s),svg=q("#scene");
const kit=createElements(META),{el,txt,path,asset,table,hwall,vwall,arch,lowdoor,sconce,portrait,angledWall,lancet}=kit;
const furniture=createFurnishings(kit);
let rooms=horizontalRooms,layout='horizontal';
let depth=36,selected=null,box=[0,0,1720,920],base=[...box],drag,moved=false;
function draw(){if(layout!=='horizontal'){drawVariant();return;}rooms=horizontalRooms;const root=q('#drawing');root.replaceChildren();const floor=el('g',{},root);
 // Floors are independent of wall projection; door gaps are real breaks in wall geometry.
 el('rect',{x:90,y:350,width:1540,height:170,fill:'url(#hall-floor)'},floor);
 el('rect',{x:42,y:365,width:48,height:140,fill:'url(#hall-floor)'},floor);
 for(let i=0;i<9;i++){const yy=370+i*14;el('rect',{x:44,y:yy,width:44,height:13,fill:i%2?'#cab48d':'#d9c39c',stroke:'#aa936d','stroke-width':.7},floor);}
 for(const [i,r]of rooms.entries()){
  const g=el('g',{class:'room',tabindex:0,role:'button','aria-label':r.name,'data-room':i},floor);
  el('rect',{x:r.x,y:r.y,width:r.w,height:r.bottom-r.y,fill:'url(#floor)',class:'floor'},g);el('rect',{x:r.x+7,y:r.y+7,width:r.w-14,height:r.bottom-r.y-14,fill:'url(#room-light)',stroke:'#b8a17a','stroke-width':.8},g);const clip=el('clipPath',{id:'room-clip-'+i},root);el('rect',{x:r.x+6,y:r.y+6,width:r.w-12,height:r.bottom-r.y-12},clip);const fg=el('g',{'clip-path':'url(#room-clip-'+i+')'},g);furniture(fg,r);
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}};
 }
 const walls=el('g',{filter:'url(#wall-shadow)','pointer-events':'none'},root);const high=depth*1.8;
 // Upper room rear and shared side walls.
 for(const r of rooms.slice(0,4)){hwall(walls,r.x,r.x+r.w,r.y,depth);vwall(walls,r.x,r.y,350,depth);}
 vwall(walls,1630,85,350,depth);
 // Corridor north elevation, split at every door instead of painting over a closed wall.
 let from=90;for(const r of rooms.slice(0,4)){hwall(walls,from,r.door-24,350,high);from=r.door+24;}hwall(walls,from,1630,350,high);
 for(const r of rooms.slice(0,4))arch(walls,r.door,350,high);
 if(depth>=10){for(const x of [190,470,840,1215,1600])sconce(walls,x,346);for(const [x,w]of [[245,82],[555,95],[920,82],[1300,87]])portrait(walls,x,350-high+12,w,Math.max(15,high-23));}
 // Lower row shares one low corridor boundary, interrupted at door thresholds.
 from=90;for(const r of rooms.slice(4)){hwall(walls,from,r.door-23,520,depth);from=r.door+23;}hwall(walls,from,1630,520,depth);
 for(const r of rooms.slice(4))lowdoor(walls,r.door,520,depth);
 // Lower side and outer walls painted last for a consistent cutaway.
 for(const r of rooms.slice(4)){vwall(walls,r.x,520,r.bottom,depth);hwall(walls,r.x,r.x+r.w,r.bottom,depth);}
 vwall(walls,1630,520,800,depth);vwall(walls,90,350,365,depth);vwall(walls,90,505,520,depth);vwall(walls,1630,350,520,depth);
 // East end narrow window (wall-plane symbol, with visible reveals).
 const window=el('g',{'pointer-events':'none'},root),wx=1629,wy=430-depth;
 path(window,`M${wx-5} ${wy+24}V${wy-20}Q${wx} ${wy-34} ${wx+5} ${wy-20}V${wy+24}Z`,{fill:'#7e9d9b',stroke:'#e3cba3','stroke-width':3});path(window,`M${wx} ${wy-28}V${wy+24}`,{stroke:'#d6d7bd','stroke-width':1});
 const labels=el('g',{'pointer-events':'none'},root);for(const[i,r]of rooms.entries()){const labelY=r.side==='top'?r.y-40:r.bottom+33;txt(labels,r.x+r.w/2,labelY,String(i+1).padStart(2,'0')+' · '+r.name,{class:'label'});}
 txt(labels,860,440,'H À N H   L A N G   T Ầ N G   3',{'text-anchor':'middle','font-size':15,fill:'#8b724c',opacity:.9});
 if(selected!==null)mark(selected);
}
function mark(i){const r=rooms[i];if(r.poly)path(q('#drawing'),ppath(r.poly),{fill:'none',stroke:'#54776a','stroke-width':2.5,'stroke-dasharray':'6 5','pointer-events':'none',class:'selection'});else el('rect',{x:r.x+10,y:r.y+10,width:r.w-20,height:r.bottom-r.y-20,fill:'none',stroke:'#54776a','stroke-width':2.5,'stroke-dasharray':'6 5','pointer-events':'none',class:'selection'},q('#drawing'));}
function select(i){selected=i;q('#drawing').querySelectorAll('.selection').forEach(n=>n.remove());mark(i);q('#name').textContent=rooms[i].name;q('#detail').textContent=rooms[i].detail;}
function apply(){svg.setAttribute('viewBox',box.join(' '));q('#zoom').value=Math.round(base[2]/box[2]*100)+'%'}
function fit(){const b=layout==='horizontal'?[12,-40,1695,940]:variantModel(layout).bounds,r=svg.getBoundingClientRect(),ratio=r.width/r.height;let w=b[2],h=b[3];if(w/h<ratio)w=h*ratio;else h=w/ratio;base=[b[0]+b[2]/2-w/2,b[1]+b[3]/2-h/2,w,h];box=[...base];apply()}
function point(x,y){return new DOMPoint(x,y).matrixTransform(svg.getScreenCTM().inverse())}
function zoom(f,p){const z=base[2]/box[2]/f;if(z<.6||z>5)return;p=p||{x:box[0]+box[2]/2,y:box[1]+box[3]/2};box=[p.x-(p.x-box[0])*f,p.y-(p.y-box[1])*f,box[2]*f,box[3]*f];apply()}
q('#layout').onchange=e=>switchLayout(e.target.value);
q('#height').oninput=e=>{depth=Number(e.target.value);draw()};q('#minus').onclick=()=>zoom(1.25);q('#plus').onclick=()=>zoom(.8);q('#fit').onclick=fit;window.addEventListener('resize',fit);svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1,point(e.clientX,e.clientY))},{passive:false});
svg.onpointerdown=e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,p:point(e.clientX,e.clientY),room:e.target.closest('[data-room]')?.dataset.room};moved=false;svg.setPointerCapture(e.pointerId)};svg.onpointermove=e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)moved=true;if(moved){const p=point(e.clientX,e.clientY);box[0]+=drag.p.x-p.x;box[1]+=drag.p.y-p.y;apply()}};svg.onpointerup=e=>{if(drag&&!moved&&drag.room!==undefined)select(Number(drag.room));drag=null;if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId)};svg.onpointercancel=()=>drag=null;
q('#download').onclick=()=>{const url=URL.createObjectURL(new Blob([window.__ARCHITECTURE_HTML__],{type:'text/html;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='WIZAMAP_Architecture_Stage1.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500)};

function insidePolygon(x,y,p){let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
function floorContains(model,x,y){return (model.floors||[model.floor]).some(p=>insidePolygon(x,y,p))}
function variantWalls(model){
 const raw=[],diagonal=[],gaps=[],eps=1e-5,round=n=>Math.round(n/eps)*eps;
 const addPoly=(p,z)=>{for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1];if(Math.hypot(dx,dy)<eps)continue;
  if(Math.abs(dx)>eps&&Math.abs(dy)>eps){diagonal.push({axis:'D',a,b,z});continue;}
  const h=Math.abs(dy)<eps;raw.push({axis:h?'H':'V',fixed:round(h?a[1]:a[0]),lo:round(Math.min(h?a[0]:a[1],h?b[0]:b[1])),hi:round(Math.max(h?a[0]:a[1],h?b[0]:b[1])),z});
 }};
 const polygons=model.floors||[model.floor];for(const p of polygons)addPoly(p,layout==='curved'?depth*1.8:depth);
 for(const r of rooms){const p=r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y);addPoly(p,r.circular?depth*1.25:depth);
  const d=r.doorPoint,h='NS'.includes(r.doorSide),axis=h?'H':'V',fixed=round(h?d.y:d.x),c=h?d.x:d.y;gaps.push({axis,fixed,lo:c-25,hi:c+25});
  if(!r.poly)raw.push({axis,fixed,lo:h?r.x:r.y,hi:h?r.x+r.w:r.bottom,z:depth*1.8});
 }
 for(const f of model.facades||[])raw.push({...f,z:depth*1.8});
 if(model.entrance)gaps.push(model.entrance);
 else if(layout==='vertical')gaps.push({axis:'H',fixed:1180,lo:440,hi:600});
 else gaps.push({axis:'V',fixed:80,lo:415,hi:545});
 const groups=new Map();for(const s of raw){const k=s.axis+':'+s.fixed;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(s);}
 const walls=[];
 for(const segs of groups.values()){
  const a=segs[0],gs=gaps.filter(g=>g.axis===a.axis&&Math.abs(g.fixed-a.fixed)<eps),allcuts=polygons.flat().map(p=>a.axis==='H'?p[0]:p[1]);
  const cuts=[...new Set([...segs.flatMap(s=>[s.lo,s.hi]),...gs.flatMap(g=>[g.lo,g.hi]),...allcuts].map(round))].sort((a,b)=>a-b);
  for(let i=1;i<cuts.length;i++){const lo=cuts[i-1],hi=cuts[i],m=(lo+hi)/2,cover=segs.filter(s=>m>s.lo-eps&&m<s.hi+eps);if(!cover.length||gs.some(g=>m>g.lo&&m<g.hi))continue;
   const h=a.axis==='H',x=h?m:a.fixed,y=h?a.fixed:m;
   if(floorContains(model,x+(h?0:.2),y+(h?.2:0))&&floorContains(model,x-(h?0:.2),y-(h?.2:0)))continue;
   walls.push({axis:a.axis,fixed:a.fixed,lo,hi,z:Math.max(...cover.map(s=>s.z))});
  }
 }
 for(const d of diagonal){const x=(d.a[0]+d.b[0])/2,y=(d.a[1]+d.b[1])/2,len=Math.hypot(d.b[0]-d.a[0],d.b[1]-d.a[1]),nx=-(d.b[1]-d.a[1])/len,ny=(d.b[0]-d.a[0])/len;
  if(floorContains(model,x+nx*.2,y+ny*.2)&&floorContains(model,x-nx*.2,y-ny*.2))continue;
  if(rooms.some(r=>r.poly&&Math.hypot(x-r.doorPoint.x,y-r.doorPoint.y)<28))continue;
  walls.push(d);
 }
 return walls.sort((a,b)=>(a.axis==='H'?a.fixed:a.axis==='V'?a.hi:Math.max(a.a[1],a.b[1]))-(b.axis==='H'?b.fixed:b.axis==='V'?b.hi:Math.max(b.a[1],b.b[1])));
}
function drawVariant(){
 const model=variantModel(layout);rooms=model.rooms;const root=q('#drawing');root.replaceChildren();const floors=el('g',{},root);
 for(const v of model.voids||[]){path(floors,ppath(v.poly),{fill:'#b9ba91',stroke:'#a3a37b','stroke-width':2});
  const xs=v.poly.map(p=>p[0]),ys=v.poly.map(p=>p[1]),cx=(Math.min(...xs)+Math.max(...xs))/2,cy=(Math.min(...ys)+Math.max(...ys))/2;
  txt(floors,cx,cy,v.name,{'text-anchor':'middle','font-size':18,fill:'#778268','letter-spacing':2});
  if(v.plant)for(const p of [[Math.min(...xs)+35,Math.min(...ys)+35],[Math.max(...xs)-70,Math.min(...ys)+35],[Math.min(...xs)+35,Math.max(...ys)-80],[Math.max(...xs)-70,Math.max(...ys)-80]])asset(floors,'decor.planter-floor',p[0],p[1],38,'#84915f','#a8b87c');
 }
 for(const poly of model.floors||[model.floor])path(floors,ppath(poly),{fill:'url(#hall-floor)'});
 const st=model.stair;
 if(st)for(let i=0;i<8;i++){const vertical=st.orientation?st.orientation==='N':layout==='vertical',step=vertical?{x:st.x,y:(layout==='vertical'?1180:st.y)+i*st.h/8,width:st.w,height:st.h/8}:{x:st.x+i*st.w/8,y:st.y,width:st.w/8,height:st.h};el('rect',{...step,fill:i%2?'#cab48d':'#dcc69e',stroke:'#aa936d','stroke-width':.6},floors);}
 for(const[i,r]of rooms.entries()){
  const g=el('g',{class:'room',tabindex:0,role:'button','aria-label':r.name,'data-room':i},floors),d=ppath(r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y));
  path(g,d,{fill:'url(#floor)',class:'floor'});path(g,d,{fill:'url(#room-light)',stroke:'#b8a17a','stroke-width':.8});
  const clip=el('clipPath',{id:'room-clip-'+i},root);path(clip,d);
  const clipped=el('g',{'clip-path':'url(#room-clip-'+i+')'},g),scale=Math.min((r.w-30)/385,(r.bottom-r.y-55)/275)*(r.circular?.85:1);
  const fg=el('g',{transform:`translate(${r.x+(r.w-385*scale)/2} ${r.y+(r.circular?(r.bottom-r.y-275*scale)/2:32)}) scale(${scale})`},clipped);
  if(r.kind==='stairs'){
   for(let j=0;j<12;j++)el('rect',{x:r.x+12,y:r.y+10+j*(r.bottom-r.y-20)/12,width:r.w-24,height:(r.bottom-r.y-20)/12,fill:j%2?'#b3a280':'#d0ba93',stroke:'#958061','stroke-width':.6},g);
   path(g,`M${r.x+r.w/2} ${r.bottom-30}V${r.y+30}`,{stroke:'#6f6e55','stroke-width':2});txt(g,r.x+r.w/2,r.y+40,'↑',{'text-anchor':'middle','font-size':25,fill:'#6f6e55'});
  }else furniture(fg,{...r,x:0,y:0});
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(i)}};
 }
 const wallLayer=el('g',{filter:'url(#wall-shadow)','pointer-events':'none'},root),wallList=variantWalls(model);
 for(const w of wallList){if(w.axis==='H')hwall(wallLayer,w.lo,w.hi,w.fixed,w.z);else if(w.axis==='V')vwall(wallLayer,w.fixed,w.lo,w.hi,w.z);else angledWall(wallLayer,w.a,w.b,w.z);}
 const portals=el('g',{'pointer-events':'none'},root);
 for(const r of rooms){const d=r.doorPoint;
  if(r.doorSide==='S')arch(portals,d.x,d.y,depth*1.8);
  else if(r.doorSide==='N')lowdoor(portals,d.x,d.y,depth);
  else {const g=el('g',{transform:`matrix(0 1 .35 1 ${d.x} ${d.y})`},portals);arch(g,0,0,depth*1.8);}
 }
 for(const win of model.windows||[]){if(win.axis==='H')lancet(portals,win.x,win.y,depth*(win.factor||1.8));
  else {const g=el('g',{transform:win.axis==='V'?`matrix(0 1 .35 1 ${win.x} ${win.y})`:`matrix(${win.tx} ${win.ty} .35 1 ${win.x} ${win.y})`},portals);lancet(g,0,0,depth*(win.factor||1.8));}
 }
 const labels=el('g',{'pointer-events':'none'},root);
 for(const[i,r]of rooms.entries()){
  const x=r.x+r.w/2,y=r.circular?r.y+82:r.y+20;
  const text=String(i+1).padStart(2,'0')+' · '+(r.kind==='stairs'?'Thang':r.name),width=Math.min(r.w-18,text.length*6.6+18);
  el('rect',{x:x-width/2,y:y-13,width,height:20,rx:2,fill:'#eee0bd',opacity:.78},labels);
  txt(labels,x,y,text,{class:'label','font-size':r.kind==='stairs'?11:12});
 }
 if(layout==='vertical')txt(labels,520,640,'HÀNH LANG DỌC',{class:'label',transform:'rotate(-90 520 640)','font-size':16});
 else if(layout==='ell'){txt(labels,570,490,'CÁNH TÂY',{class:'label'});txt(labels,1120,915,'CÁNH NAM',{class:'label',transform:'rotate(-90 1120 915)'});}
 if(selected!==null&&rooms[selected])mark(selected);
}
function switchLayout(value){layout=value;selected=null;rooms=layout==='horizontal'?horizontalRooms:variantModel(layout).rooms;
 const title=isExtra(layout)?EXTRA_INFO[layout][0]:layout==='horizontal'?'Cánh học thuật · Hành lang ngang':layout==='vertical'?'Cánh học thuật · Hành lang dọc':'Cánh học thuật · Hai cánh chữ L';
 q('h1').textContent=title;q('#name').textContent=title;q('#detail').textContent=isExtra(layout)?EXTRA_INFO[layout][1]:rooms.length+' phòng · Cửa nối trực tiếp vào hành lang. Điều chỉnh độ nổi để xem mặt đứng tường.';
 q('.description').textContent=isExtra(layout)?'Bản thử SVG · '+rooms.length+' phòng · '+(layout==='tower'?'Tiền sảnh & thang tháp':layout==='curved'?'Cánh cong nối tiếp tuyến':layout==='windows'?'Một phía phòng, một phía vườn':'Bố trí theo công năng từng cánh'):'Bản thử SVG · Phòng hai bên hành lang · Tường đá có bề dày';
 draw();fit();
}


q('#layout').value='tee';switchLayout('tee');
return {show:switchLayout};
}
