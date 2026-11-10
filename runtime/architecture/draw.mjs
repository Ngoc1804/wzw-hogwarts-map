import {materialPattern} from './materials.mjs';
// Stage 2 lightweight 2.5D SVG: actual room/corridor floors, walls, doors and windows.
import {drawFurnishings} from '../scene-assets.mjs';
export function drawIndoor(svg,geometry,onRoomClick){
 const doc=new DOMParser().parseFromString(INDOOR_MATERIALS,'image/svg+xml');
 const defs=doc.querySelector('defs');
 if(!defs)throw Error('Indoor SVG materials have no defs');
 const materials=document.importNode(defs,true);
 materials.insertAdjacentHTML('beforeend','<pattern id="indoor-wood" width="32" height="75" patternUnits="userSpaceOnUse"><rect width="32" height="75" fill="#BE9B70"/><path d="M0 0V75M16 0V37H32M0 37H16V75" fill="none" stroke="#9B7956" stroke-width=".8"/></pattern><pattern id="indoor-tile" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="24" height="24" fill="#D8D1BC"/><path d="M0 0H24V24H0Z" fill="none" stroke="#B7AD94" stroke-width="1"/></pattern>');
 const roomMaterials=new Map();
 for(const [i,r] of Object.values(geometry.rooms).entries()){
  const floorId='mat-floor-'+i,wallId='mat-wall-'+i;
  materials.insertAdjacentHTML('beforeend',materialPattern(floorId,r.floorMaterial,r.floorColor,r.materialStroke,r.materialScale)+materialPattern(wallId,r.wallMaterial,r.wallColor,r.materialStroke,r.materialScale));
  roomMaterials.set(r.id,{floor:floorId,wall:wallId});
 }
 svg.append(materials);
 const {el,txt,path,hwall,vwall,arch,lowdoor,angledWall,lancet}=createElements({});
 const root=el('g',{'data-indoor-scene':'true'},svg),floor=el('g',{'data-indoor-floor':'true'},root);
 const {model,walls}=geometry;
 for(const v of model.voids){
  path(floor,ppath(v.poly),{fill:'#c5c6a4',stroke:'#a3a37b','stroke-width':1,'data-void':'true','pointer-events':'none'});
 }
 if(geometry.exterior){
  const palettes={
   grass:['#cad0aa','#adbb87'],forest:['#aab896','#738e70'],stone:['#c9baa2','#a99a83'],
   sand:['#e2d4b3','#c5b38f'],snow:['#e6e6df','#c0c8c5']
  };
  const [fill,accent]=palettes[geometry.exterior.terrain]||palettes.grass;
  for(const polygon of model.floors){
   path(floor,ppath(polygon),{fill,stroke:'#998b71','stroke-width':3,'data-exterior-ground':'true','data-surface':'floor'});
   // Sparse surface hatch; vegetation is schematic and never a canon landmark.
   const pts=polygon,xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
   const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);
   const isNature=['grass','forest','snow'].includes(geometry.exterior.terrain);
   if(isNature)for(let k=0;k<24;k++){
    const x=x0+32+((k*79)%(Math.max(1,x1-x0-64))),y=y0+30+((k*113)%(Math.max(1,y1-y0-60)));
    if(model.rooms.some(r=>x>r.x-35&&x<r.x+r.w+35&&y>r.y-35&&y<r.bottom+35))continue;
    el('ellipse',{cx:x,cy:y,rx:8+(k%3)*3,ry:5+(k%2)*3,fill:accent,opacity:'.4','data-landscape':'true','pointer-events':'none'},floor);
   }
  }
 }
 for(const [i,poly] of model.floors.entries()){
  const corridorId=geometry.corridorPlaceIds?.[i%Math.max(1,geometry.corridorPlaceIds.length)];
  const segment=path(floor,ppath(poly),{fill:geometry.exterior?'transparent':'url(#hall-floor)','fill-rule':'nonzero','data-corridor-floor':'true','data-surface':'floor'});
  if(corridorId){
   segment.setAttribute('data-corridor',corridorId);
   segment.setAttribute('tabindex','0');segment.setAttribute('role','button');
   segment.onclick=()=>onRoomClick(corridorId);
   segment.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRoomClick(corridorId)}};
  }
 }
 if(geometry.exterior){
  const [x,y,w,h]=geometry.bounds;
  path(floor,`M${x+55} ${y+h/2}H${x+w/2}`,{stroke:'#ddc8a0','stroke-width':24,fill:'none','data-exterior-path':'true','pointer-events':'none'});
  if(model.water)path(floor,ppath(model.water),{fill:'#9eafb0',stroke:'#738d8c','stroke-width':2,'data-surface':'blocked','data-exterior-water':'true'});
 }
 const stair=model.stair;
 if(stair)for(let i=0;i<8;i++){
  const vertical=stair.orientation==='N';
  el('rect',{x:stair.x+(vertical?0:i*stair.w/8),y:stair.y+(vertical?i*stair.h/8:0),
   width:vertical?stair.w:stair.w/8,height:vertical?stair.h/8:stair.h,fill:i%2?'#c7b28c':'#dac39b',stroke:'#a7916d','stroke-width':.6},floor);
 }
 for(const t of model.thresholds)path(floor,ppath(t.poly),{fill:'url(#hall-floor)'});
 for(const r of model.rooms){
  const g=el('g',{'data-room':r.id,tabindex:0,role:'button','aria-label':r.name},floor);
  path(g,ppath(geometry.rooms[r.id].poly),{fill:'url(#'+roomMaterials.get(r.id).floor+')',stroke:'#b9a483','stroke-width':.6,'data-room-floor':'true','data-surface':'floor'});
  if(r.kind==='stairs')for(let j=0;j<10;j++)path(g,`M${r.x+10} ${r.y+15+j*(r.bottom-r.y-30)/10}h${r.w-20}`,{stroke:'#a38e6d','stroke-width':1});
  txt(g,r.x+r.w/2,r.y+(r.circular?85:30),r.name,{'text-anchor':'middle','font-size':14,fill:'#7c684c','pointer-events':'none'});
  g.onclick=()=>onRoomClick(r.id);
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRoomClick(r.id)}};
 }
 const wallLayer=el('g',{'data-indoor-walls':'true','pointer-events':'none'},root);
 const materialFor=w=>{
  const x=w.axis==='H'?(w.lo+w.hi)/2:w.axis==='V'?w.fixed:(w.a[0]+w.b[0])/2;
  const y=w.axis==='V'?(w.lo+w.hi)/2:w.axis==='H'?w.fixed:(w.a[1]+w.b[1])/2;
  const nearest=Object.values(geometry.rooms).sort((a,b)=>Math.hypot(x-(a.x+a.w/2),y-(a.y+a.h/2))-Math.hypot(x-(b.x+b.w/2),y-(b.y+b.h/2)))[0];
  return nearest?roomMaterials.get(nearest.id).wall:null;
 };
 for(const w of walls){
  const g=el('g',{},wallLayer),id=materialFor(w);
  if(w.axis==='H')hwall(g,w.lo,w.hi,w.fixed,w.z);
  else if(w.axis==='V')vwall(g,w.fixed,w.lo,w.hi,w.z);
  else angledWall(g,w.a,w.b,w.z);
  if(id)for(const n of g.querySelectorAll('[fill]')){
   const fill=n.getAttribute('fill');
   if(fill==='url(#stone-face)'||fill==='url(#cap-block)')n.setAttribute('fill','url(#'+id+')');
   if(fill==='url(#masonry)')n.setAttribute('fill','none');
  }
 }
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
 drawFurnishings(root,geometry.furnishingInstances);
 return root;
}
