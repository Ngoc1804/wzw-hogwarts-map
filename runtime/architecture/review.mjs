import {createElements} from '../../elements/architecture/elements.mjs';
import {FORMULAS,WALL_HEIGHT,rectangle,ppath,buildIndoorLayout} from './recipes.mjs';
import {buildIndoorWalls} from './walls.mjs';
export function mountArchitectureViewer(){
 const q=s=>document.querySelector(s),svg=q('#scene'),root=q('#drawing');
 const {el,txt,path,hwall,vwall,arch,lowdoor,lancet}=createElements({});
 let model,box,base,selected=null,drag,moved=false,scheduled=false;const cache=new Map();
 const read=()=>({layout:q('#layout').value,roomCount:Number(q('#count').value),roomWidth:Number(q('#width').value),roomDepth:Number(q('#depth').value),corridorWidth:Number(q('#corridor').value),roomShape:q('#shape').value});
 function draw(){
  const request=read(),key=JSON.stringify(request);let entry=cache.get(key);const start=performance.now();
  try{
   if(!entry){model=buildIndoorLayout(request);entry={model,walls:buildIndoorWalls(model)};if(cache.size>=16)cache.delete(cache.keys().next().value);cache.set(key,entry);}else model=entry.model;
   root.replaceChildren();selected=null;q('#error').textContent='';
   const floors=el('g',{},root);
   for(const v of model.voids){path(floors,ppath(v.poly),{fill:'#c5c6a4',stroke:'#a3a37b','stroke-width':1});const p=v.poly;txt(floors,(p[0][0]+p[2][0])/2,(p[0][1]+p[2][1])/2,v.name,{'text-anchor':'middle','font-size':17,fill:'#7c846c'});}
   // One compound floor path; curve geometry is tessellated once, not during pan/zoom.
   path(floors,model.floors.map(ppath).join(''),{fill:'url(#hall-floor)','fill-rule':'nonzero'});
   const st=model.stair;for(let i=0;i<8;i++){const vertical=st.orientation==='N';el('rect',{x:st.x+(vertical?0:i*st.w/8),y:st.y+(vertical?i*st.h/8:0),width:vertical?st.w:st.w/8,height:vertical?st.h/8:st.h,fill:i%2?'#c7b28c':'#dac39b',stroke:'#a7916d','stroke-width':.6},floors);}
   for(const t of model.thresholds)path(floors,ppath(t.poly),{fill:'url(#hall-floor)'});
   for(const[i,r]of model.rooms.entries()){
    const g=el('g',{class:'room','data-room':r.id,tabindex:0,role:'button','aria-label':r.name},floors),poly=r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y);
    path(g,ppath(poly),{fill:'url(#floor)',stroke:'#b9a483','stroke-width':.6,class:'floor'});
    if(r.kind==='stairs')for(let j=0;j<10;j++)path(g,`M${r.x+10} ${r.y+15+j*(r.bottom-r.y-30)/10}h${r.w-20}`,{stroke:'#a38e6d','stroke-width':1});
    txt(g,r.x+r.w/2,r.y+(r.circular?85:30),r.name,{'text-anchor':'middle','font-size':14,fill:'#7c684c','pointer-events':'none'});
    g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(r.id)}};
   }
   const walls=el('g',{'pointer-events':'none'},root),diag=entry.walls.filter(w=>w.axis==='D');
   // Batch curved faces/caps: three SVG paths, no Gaussian/drop-shadow surface.
   let faces='',caps='';for(const w of diag){const a=w.a,b=w.b,z=w.z,dx=z*.35,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*8,ny=(b[0]-a[0])/len*8;
    faces+=ppath([a,b,[b[0]-dx,b[1]-z],[a[0]-dx,a[1]-z]]);caps+=ppath([[a[0]-dx+nx,a[1]-z+ny],[b[0]-dx+nx,b[1]-z+ny],[b[0]-dx-nx,b[1]-z-ny],[a[0]-dx-nx,a[1]-z-ny]]);
   }
   if(faces){path(walls,faces,{fill:'url(#stone-face)','data-curved-batch':'faces'});path(walls,faces,{fill:'url(#masonry)'});path(walls,caps,{fill:'url(#cap-block)',stroke:'#786f5a','stroke-width':.5,'data-curved-batch':'caps'});}
   for(const w of entry.walls){if(w.axis==='H')hwall(walls,w.lo,w.hi,w.fixed,w.z);else if(w.axis==='V')vwall(walls,w.fixed,w.lo,w.hi,w.z);}
   for(const r of model.rooms){const d=r.doorPoint,z=r.circular?WALL_HEIGHT*1.25:WALL_HEIGHT*1.8;
    if(r.doorSide==='S')arch(walls,d.x,d.y,z);else if(r.doorSide==='N')lowdoor(walls,d.x,d.y,WALL_HEIGHT);else{const g=el('g',{transform:`matrix(0 1 .35 1 ${d.x} ${d.y})`},walls);arch(g,0,0,z);}
   }
   for(const win of model.windows){if(win.axis==='H')lancet(walls,win.x,win.y,WALL_HEIGHT*1.8);else{const g=el('g',{transform:win.axis==='V'?`matrix(0 1 .35 1 ${win.x} ${win.y})`:`matrix(${win.tx} ${win.ty} .35 1 ${win.x} ${win.y})`},walls);lancet(g,0,0,WALL_HEIGHT*1.8);}}
   q('h1').textContent=FORMULAS[model.recipe][0]+' · Công thức tùy biến';q('#name').textContent='Công thức '+FORMULAS[model.recipe][0];q('#detail').textContent=model.selection.reason+' '+model.rooms.length+' phòng · không nội thất.';
   q('#metrics').textContent=`${Math.round((performance.now()-start)*10)/10} ms dựng · ${root.querySelectorAll('*').length} phần tử SVG`;fit();
  }catch(e){q('#error').textContent=e.message;}
 }
 function select(id){const r=model.rooms.find(r=>r.id===id);if(!r)return;selected=id;root.querySelectorAll('.selection').forEach(n=>n.remove());path(root,ppath(r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)),{fill:'none',stroke:'#54776a','stroke-width':2.5,'stroke-dasharray':'6 5',class:'selection','pointer-events':'none'});q('#name').textContent=r.name;q('#detail').textContent=`${r.w.toFixed(0)} × ${(r.bottom-r.y).toFixed(0)} · hình ${r.shape} · cửa ${r.doorSide}.`;}
 function apply(){svg.setAttribute('viewBox',box.join(' '));q('#zoom').value=Math.round(base[2]/box[2]*100)+'%'}
 function fit(){if(!model)return;const[x,y,w,h]=model.bounds,r=svg.getBoundingClientRect(),ratio=r.width/r.height;let ww=w,hh=h;if(ww/hh<ratio)ww=hh*ratio;else hh=ww/ratio;base=[x+w/2-ww/2,y+h/2-hh/2,ww,hh];box=[...base];apply();}
 function point(x,y){return new DOMPoint(x,y).matrixTransform(svg.getScreenCTM().inverse())}
 function zoom(f,p){if(!box)return;const z=base[2]/box[2]/f;if(z<.6||z>5)return;p=p||{x:box[0]+box[2]/2,y:box[1]+box[3]/2};box=[p.x-(p.x-box[0])*f,p.y-(p.y-box[1])*f,box[2]*f,box[3]*f];apply();}
 for(const id of ['layout','count','width','depth','corridor','shape'])q('#'+id).onchange=draw;
 q('#plus').onclick=()=>zoom(.8);q('#minus').onclick=()=>zoom(1.25);q('#fit').onclick=fit;window.addEventListener('resize',fit);
 svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1,point(e.clientX,e.clientY))},{passive:false});
 svg.onpointerdown=e=>{if(e.button!==0)return;moved=false;drag={x:e.clientX,y:e.clientY,p:point(e.clientX,e.clientY),room:e.target.closest('[data-room]')?.dataset.room};svg.setPointerCapture(e.pointerId)};
 svg.onpointermove=e=>{if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)moved=true;if(moved&&!scheduled){scheduled=true;const x=e.clientX,y=e.clientY;requestAnimationFrame(()=>{scheduled=false;if(!drag)return;const p=point(x,y);box[0]+=drag.p.x-p.x;box[1]+=drag.p.y-p.y;apply();});}};
 svg.onpointerup=e=>{if(drag&&!moved&&drag.room)select(drag.room);drag=null;if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId)};svg.onpointercancel=()=>drag=null;
 q('#download').onclick=()=>{const u=URL.createObjectURL(new Blob([window.__ARCHITECTURE_HTML__],{type:'text/html;charset=utf-8'})),a=document.createElement('a');a.href=u;a.download='WIZAMAP_Indoor_Stage2.html';a.click();setTimeout(()=>URL.revokeObjectURL(u),1500)};
 draw();return {build:buildIndoorLayout,show:draw,get model(){return structuredClone(model)}};
}
