// Transient MAP_DATA scene geometry using the approved indoor Stage 2 formulas.
// No storage, pathfinding, mult-wing assembly or hidden-floor generation.
import {buildIndoorLayout,rectangle,ppath} from './architecture/recipes.mjs';
import {buildIndoorWalls,insidePolygon} from './architecture/walls.mjs';

const shapeFor=(p)=>{
 const shape=p.generation?.shape||'rectangle';
 if(shape==='straight'&&p.kind==='corridor')return 'rectangle';
 if(!['rectangle','L','U','T','cross','round'].includes(shape))
  throw Error('Unsupported indoor room shape for '+p.id+': '+shape);
 return shape;
};
const point=(x,y)=>({x,y});
const distanceToSegment=(p,a,b)=>{
 const dx=b[0]-a[0],dy=b[1]-a[1],len=dx*dx+dy*dy;
 const t=Math.max(0,Math.min(1,len?((p.x-a[0])*dx+(p.y-a[1])*dy)/len:0));
 return Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy);
};
const boundaryDistance=(p,poly)=>Math.min(...poly.map((a,i)=>distanceToSegment(p,a,poly[(i+1)%poly.length])));
const hit=(p,poly)=>insidePolygon(p.x,p.y,poly);
const asRegion=(id,poly)=>({id,points:poly.map(([x,y])=>point(x,y))});
function safePoint(p,polygon,exclusions,clearance){
 return hit(p,polygon)&&boundaryDistance(p,polygon)>clearance&&
  !exclusions.some(r=>hit(p,r.poly)||boundaryDistance(p,r.poly)<clearance);
}
// Conservative rectangular cells, fully inside actual floor polygon, away from edges and reserved space.
// No routing: these are illustrative positioning surfaces only.
function positions(id,polygon,exclusions,margin=13){
 const xs=polygon.map(p=>p[0]),ys=polygon.map(p=>p[1]);
 const lowX=Math.min(...xs),highX=Math.max(...xs),lowY=Math.min(...ys),highY=Math.max(...ys);
 const step=26,half=9,runs=[],anchors=[];
 for(let y=lowY+step/2;y<highY;y+=step){
  let run=null;
  for(let x=lowX+step/2;x<highX;x+=step){
   const corners=[point(x-half,y-half),point(x+half,y-half),point(x+half,y+half),point(x-half,y+half)];
   const valid=corners.every(p=>safePoint(p,polygon,exclusions,margin));
   if(valid){
    if(!run)run=[x-half,y-half,x+half,y+half];
    else run[2]=x+half;
    if(anchors.length<4&&(!anchors.length||Math.hypot(x-anchors.at(-1).x,y-anchors.at(-1).y)>65))anchors.push(point(x,y));
   }else if(run){runs.push(run);run=null}
  }
  if(run)runs.push(run);
 }
 if(!runs.length)throw Error('No safe actor surface for '+id+'; check room size/doors');
 const regions=runs.map(([x1,y1,x2,y2],i)=>asRegion(id+':zone:'+i,rectangle(x1,y1,x2-x1,y2-y1)));
 return {regions,anchors};
}
function exclusionsFor(model){
 const zones=[];
 for(const v of model.voids)zones.push({id:'void:'+v.name,kind:'void',poly:v.poly});
 for(const [i,t] of model.thresholds.entries())zones.push({id:'threshold:'+i,kind:'door',poly:t.poly});
 if(model.stair){const s=model.stair;zones.push({id:'stair',kind:'stairs',poly:rectangle(s.x-10,s.y-10,s.w+20,s.h+20)})}
 for(const r of model.rooms){
  const d=r.doorPoint,wide=40;
  zones.push({id:'door:'+r.id,kind:'door',poly:rectangle(d.x-wide,d.y-wide,wide*2,wide*2)});
 }
 return zones;
}
export function buildGeometry(plan,indoor={}){
 if(plan.mode!=='generated')throw Error('Indoor build requires generated scene');
 const places=plan.places;
 if(!places.length)throw Error('Indoor scene requires at least one visible room');
 if(new Set(places.map(p=>p.floor||'')).size>1)throw Error('Only the current indoor floor/scene may be built; provide one floor per /map');
 const corridorPlaces=places.filter(p=>p.kind==='corridor');
 const roomPlaces=places.filter(p=>p.kind!=='corridor');
 if(!roomPlaces.length&&indoor.layout==='tower')throw Error('Tower recipe requires an actual room');
 const records=roomPlaces.map(p=>({
  id:p.id,name:p.name,shape:shapeFor(p),
  ...(p.generation?.width?{width:p.generation.width}:{}),
  ...(p.generation?.depth?{depth:p.generation.depth}:{})
 }));
 const request={...indoor,rooms:records,allowEmptyRooms:!records.length};
 // The current MAP_DATA place list defines the scene. Ignore any external roomCount.
 delete request.roomCount;
 const model=buildIndoorLayout(request);
 // One-room scenes occupy the whole scene without fabricating hallways or stairs.
 if(roomPlaces.length===1&&!corridorPlaces.length){
   model.floors=[];model.voids=[];model.thresholds=[];model.stair=null;
   model.entrance=null;model.facades=[];model.windows=[];
   const r=model.rooms[0],poly=r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y);
   const xs=poly.map(p=>p[0]),ys=poly.map(p=>p[1]);
   model.bounds=[Math.min(...xs)-55,Math.min(...ys)-85,Math.max(...xs)-Math.min(...xs)+110,Math.max(...ys)-Math.min(...ys)+150];
 }
 const walls=buildIndoorWalls(model);
 const exclusions=exclusionsFor(model);
 const rooms=Object.fromEntries(model.rooms.map(r=>[r.id,{...r,h:r.bottom-r.y,shape:r.shape,poly:r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)}]));
 const floorPolygons=[
  ...model.rooms.map(r=>asRegion('room:'+r.id,rooms[r.id].poly)),
  ...model.floors.map((poly,i)=>asRegion('corridor:'+i,poly)),
  ...model.thresholds.map((v,i)=>asRegion('threshold-floor:'+i,v.poly))
 ];
 const exclusionZones=exclusions.map(z=>({...asRegion(z.id,z.poly),kind:z.kind}));
 const actorZones=[],suggestedAnchors={},safeAreas={};
 for(const r of model.rooms){
  const v=positions(r.id,rooms[r.id].poly,exclusions,12);
  actorZones.push(...v.regions);suggestedAnchors[r.id]=v.anchors;
  safeAreas[r.id]=v.regions;
 }
 const corridorZones=[],corridorAnchors=[],corridorAreas=[];
 for(let i=0;i<model.floors.length;i++){
  const p=model.floors[i];
  // Exclude overlapping rooms and void areas from corridor actor zones.
  const blockers=[...exclusions,...model.rooms.map(r=>({poly:rooms[r.id].poly}))];
  try{const v=positions('corridor:'+i,p,blockers,12);corridorZones.push(...v.regions);corridorAnchors.push(...v.anchors);corridorAreas.push({floor:p,index:i,...v})}catch(e){
   // A short connector can have no safe standing area; never manufacture one.
   if(!e.message.startsWith('No safe actor surface'))throw e;
  }
 }
 actorZones.push(...corridorZones);
 if(corridorPlaces.length&&!corridorAreas.length)throw Error('No safe corridor surface for current scene');
 corridorPlaces.forEach((p,i)=>{
  const area=corridorAreas[i%corridorAreas.length];
  suggestedAnchors[p.id]=area.anchors;safeAreas[p.id]=area.regions;
  floorPolygons.push(asRegion('corridor-place:'+p.id,area.floor));
 });
 for(const p of places)if(!suggestedAnchors[p.id]?.length)throw Error('Missing safe indoor anchor for '+p.id);
 return {rooms,model,walls,bounds:model.bounds,floorPolygons,actorZones,exclusionZones,suggestedAnchors,corridorAnchors,corridorPlaceIds:corridorPlaces.map(p=>p.id),safeAreas,routes:[]};
}
export function indoorActorPoint(geometry,placeId,position){
 const zones=geometry.safeAreas[placeId];
 if(!zones)throw Error('Actor references room outside generated scene: '+placeId);
 if(position){
  if(!zones.some(r=>insidePolygon(position.x,position.y,r.points.map(p=>[p.x,p.y]))))
   throw Error('Indoor actor position outside verified safe floor: '+placeId);
  return position;
 }
 const anchor=geometry.suggestedAnchors[placeId]?.[0];
 if(!anchor)throw Error('No safe NPC anchor in room: '+placeId);
 return anchor;
}
