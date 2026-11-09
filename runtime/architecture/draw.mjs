// Stage 2 lightweight 2.5D SVG: actual room/corridor floors, walls, doors and windows.
// No furnishings, huge filters, extra floor assembly or scene persistence.
export function drawIndoor(svg,geometry,onRoomClick){
 const doc=new DOMParser().parseFromString(INDOOR_MATERIALS,'image/svg+xml');
 const defs=doc.querySelector('defs');
 if(!defs)throw Error('Indoor SVG materials have no defs');
 svg.append(document.importNode(defs,true));
 const {el,txt,path,hwall,vwall,arch,lowdoor,angledWall,lancet}=createElements({});
 const root=el('g',{'data-indoor-scene':'true'},svg),floor=el('g',{'data-indoor-floor':'true'},root);
 const {model,walls}=geometry;
 for(const v of model.voids){
  path(floor,ppath(v.poly),{fill:'#c5c6a4',stroke:'#a3a37b','stroke-width':1,'data-void':'true','pointer-events':'none'});
 }
 path(floor,model.floors.map(ppath).join(''),{fill:'url(#hall-floor)','fill-rule':'nonzero','data-corridor-floor':'true'});
 const stair=model.stair;
 for(let i=0;i<8;i++){
  const vertical=stair.orientation==='N';
  el('rect',{x:stair.x+(vertical?0:i*stair.w/8),y:stair.y+(vertical?i*stair.h/8:0),
   width:vertical?stair.w:stair.w/8,height:vertical?stair.h/8:stair.h,fill:i%2?'#c7b28c':'#dac39b',stroke:'#a7916d','stroke-width':.6},floor);
 }
 for(const t of model.thresholds)path(floor,ppath(t.poly),{fill:'url(#hall-floor)'});
 for(const r of model.rooms){
  const g=el('g',{'data-room':r.id,tabindex:0,role:'button','aria-label':r.name},floor);
  path(g,ppath(geometry.rooms[r.id].poly),{fill:'url(#floor)',stroke:'#b9a483','stroke-width':.6,'data-room-floor':'true'});
  if(r.kind==='stairs')for(let j=0;j<10;j++)path(g,`M${r.x+10} ${r.y+15+j*(r.bottom-r.y-30)/10}h${r.w-20}`,{stroke:'#a38e6d','stroke-width':1});
  txt(g,r.x+r.w/2,r.y+(r.circular?85:30),r.name,{'text-anchor':'middle','font-size':14,fill:'#7c684c','pointer-events':'none'});
  g.onclick=()=>onRoomClick(r.id);
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRoomClick(r.id)}};
 }
 const wallLayer=el('g',{'data-indoor-walls':'true','pointer-events':'none'},root);
 const diag=walls.filter(w=>w.axis==='D');let faces='',caps='';
 for(const w of diag){
  const a=w.a,b=w.b,z=w.z,dx=z*.35,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*8,ny=(b[0]-a[0])/len*8;
  faces+=ppath([a,b,[b[0]-dx,b[1]-z],[a[0]-dx,a[1]-z]]);
  caps+=ppath([[a[0]-dx+nx,a[1]-z+ny],[b[0]-dx+nx,b[1]-z+ny],[b[0]-dx-nx,b[1]-z-ny],[a[0]-dx-nx,a[1]-z-ny]]);
 }
 if(faces){path(wallLayer,faces,{fill:'url(#stone-face)'});path(wallLayer,faces,{fill:'url(#masonry)'});path(wallLayer,caps,{fill:'url(#cap-block)',stroke:'#786f5a','stroke-width':.5})}
 for(const w of walls){if(w.axis==='H')hwall(wallLayer,w.lo,w.hi,w.fixed,w.z);else if(w.axis==='V')vwall(wallLayer,w.fixed,w.lo,w.hi,w.z)}
 for(const r of model.rooms){
  const d=r.doorPoint,z=r.circular?45:64;
  if(r.doorSide==='S')arch(wallLayer,d.x,d.y,z);
  else if(r.doorSide==='N')lowdoor(wallLayer,d.x,d.y,36);
  else arch(el('g',{transform:`matrix(0 1 .35 1 ${d.x} ${d.y})`},wallLayer),0,0,z);
 }
 for(const w of model.windows){
  if(w.axis==='H')lancet(wallLayer,w.x,w.y,64);
  else lancet(el('g',{transform:w.axis==='V'?`matrix(0 1 .35 1 ${w.x} ${w.y})`:`matrix(${w.tx} ${w.ty} .35 1 ${w.x} ${w.y})`},wallLayer),0,0,64);
 }
 return root;
}
