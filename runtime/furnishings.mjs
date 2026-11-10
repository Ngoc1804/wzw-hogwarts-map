// One room recipe -> placed instances. No stored layout or navigation engine.
import assetCatalog from '../elements/catalog.json' with {type:'json'};
import {insidePolygon} from './architecture/walls.mjs';
const assets=new Map(assetCatalog.elements.map(a=>[a.id,a]));
const ROLES={desk:'table.desk',table:'table.dining',chair:'seat.dining',bed:'bed.single',shelf:'storage.bookcase',cabinet:'storage.cabinet',rug:'object.rug',lamp:'accessory.lamp',book:'accessory.book-open',plant:'plant.pot-top',portrait:'decor.portrait',blackboard:'extra.blackboard',cauldron:'wizard.cauldron'};
const item=(id,assetId,width,depth,placement='auto',extra={})=>({id,role:id,assetId,count:1,width,depth,placement,...extra});
export function roomRecipe(place){
 const f=place.generation?.function||place.kind||'other';
 const decor=[item('lamp','extra.sconce',18,14,'wall-north'),item('plant','plant.pot-top',24,24,'wall-east')];
 if(/bed|dorm|sleep|residential|ngủ|ký túc/i.test(f))return [item('bed','bed.single',50,84,'wall-west'),item('wardrobe','storage.cabinet',48,28,'wall-north'),item('desk','table.desk',55,36,'wall-east'),item('rug','object.rug',65,45,'center'),...decor];
 if(/potions|alchemy|độc dược/i.test(f))return [item('bench','table.prep',76,38,'wall-north'),item('cauldron','wizard.cauldron',36,36),item('cabinet','wizard.potions-cabinet',48,28,'wall-west'),item('bottle','accessory.bottle',10,15,'auto',{on:'bench'}),...decor];
 if(/library|archive|thư viện/i.test(f))return [item('shelf','storage.bookcase',70,26,'wall-north',{count:2}),item('table','table.study',65,45),item('chair','seat.dining',24,24),item('book','accessory.book-open',18,14,'auto',{on:'table'}),...decor];
 if(/class|lesson|lớp/i.test(f))return [item('board','extra.blackboard',70,22,'wall-north'),item('desk','table.study',40,26,'rows',{count:4}),item('chair','seat.dining',20,20,'auto',{count:4,near:'desk',nearOffset:{x:0,y:30}}),...decor];
 if(/kitchen|bếp/i.test(f))return [item('range','fixture.range',60,35,'wall-north'),item('sink','fixture.sink',36,30,'wall-west'),item('prep','table.prep',65,42),item('pot','accessory.pot',18,18,'auto',{on:'prep'}),...decor];
 if(/bath|toilet|tắm/i.test(f))return [item('bath','fixture.bathtub',55,85,'wall-west'),item('sink','fixture.sink',32,28,'wall-north'),item('towel','extra.towel',25,18,'wall-east'),...decor];
 if(/hospital|ward|infirm|healing|bệnh/i.test(f))return [item('bed','bed.single',40,65,'rows',{count:2}),item('cabinet','storage.cabinet',45,28,'wall-north'),item('lamp','extra.sconce',18,14,'wall-east')];
 if(/shop|commerce|tiệm|cửa hàng/i.test(f))return [item('counter','object.counter',80,30,'wall-north'),item('display','storage.display',55,28,'wall-west'),item('crate','object.crate',28,28,'wall-east'),...decor];
 if(/pub|tavern|dining|ăn|quán/i.test(f))return [item('table','table.round',50,50,'rows',{count:2}),item('seat','seat.stool',22,22,'rows',{count:4}),item('bar','object.counter',70,28,'wall-north'),...decor];
 if(/storage|kho/i.test(f))return [item('shelf','storage.open',65,28,'wall-north'),item('crate','object.crate',32,32,'rows',{count:3}),item('barrel','object.barrel',30,30,'wall-west'),item('lamp','extra.sconce',18,14,'wall-east')];
 if(/common|lounge|phòng chung/i.test(f))return [item('sofa','seat.sofa',80,38,'wall-north'),item('table','table.coffee',55,35),item('rug','object.rug',60,42,'center'),...decor];
 if(place.kind==='corridor'||/circulation|service/i.test(f))return [item('portrait','decor.portrait',35,18,'wall-north'),item('lamp','extra.sconce',18,14,'wall-east')];
 return [item('desk','table.desk',60,38,'wall-north'),item('chair','seat.dining',24,24),item('shelf','storage.bookcase',55,25,'wall-west'),item('book','accessory.book-open',18,14,'auto',{on:'desk'}),...decor];
}
export function furnishingRequests(place){
 const g=place.generation||{},given=g.furnishings||[];
 let specs=g.furnishingsMode==='replace'||given.length&&g.furnishingsMode!=='add'?given:roomRecipe(place);
 if(g.furnishingsMode==='add'){const combined=new Map(specs.map(s=>[s.id,s]));given.forEach((s,i)=>combined.set(s.id||'extra-'+i,s));specs=[...combined.values()];}
 specs=specs.filter(s=>s.count!==0);
 const seen=new Set();
 return specs.map((s,i)=>{
  const id=s.id||'item-'+i;if(seen.has(id))throw Error('Duplicate furnishing ID in '+place.id+': '+id);seen.add(id);
  const assetId=s.assetId||ROLES[s.role]||(assets.has(s.role)?s.role:null),meta=assets.get(assetId);
  if(!meta&&!s.custom)throw Error('Missing asset for '+s.role+'; provide assetId or custom drawing');
  if(s.assetId&&!meta)throw Error('Unknown asset '+s.assetId);
  if(meta&&s.custom)throw Error('Choose assetId or custom drawing, not both');
  const blocking=s.blocking??!(/rug|sconce|portrait|curtain|chandelier|banner|crest|floor-|towel/.test(assetId||'')||s.on);
  const width=s.width??(/bed/.test(assetId||'')?50:/table|counter|storage/.test(assetId||'')?60:30);
  const depth=s.depth??(meta?.occupancy?Math.max(12,Math.min(100,width*meta.occupancy.height/meta.occupancy.width)):width);
  return {...s,id,assetId,width,depth,rotation:s.rotation??0,placement:s.placement||'auto',blocking,meta};
 });
}
export function rectanglePoly(x,y,w,h,rotation=0){
 const a=rotation*Math.PI/180,c=Math.cos(a),s=Math.sin(a);
 return [[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]].map(([u,v])=>[x+u*c-v*s,y+u*s+v*c]);
}
export function polygonsOverlap(a,b,gap=0){
 for(const p of [a,b])for(let i=0;i<p.length;i++){
  const v=p[i],w=p[(i+1)%p.length],nx=-(w[1]-v[1]),ny=w[0]-v[0],l=Math.hypot(nx,ny);
  const aa=a.map(q=>q[0]*nx+q[1]*ny),bb=b.map(q=>q[0]*nx+q[1]*ny);
  if(Math.max(...aa)+gap*l<=Math.min(...bb)||Math.max(...bb)+gap*l<=Math.min(...aa))return false;
 }
 return true;
}
export function polygonFits(poly,room){
 // Sampling edges also catches a rectangle bridging the notch of a concave room.
 return poly.every((a,i)=>{const b=poly[(i+1)%poly.length],n=Math.ceil(Math.hypot(a[0]-b[0],a[1]-b[1])/5);return Array.from({length:n+1},(_,j)=>[a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n]).every(([x,y])=>insidePolygon(x,y,room));});
}
function surfacePoly(instance){
 const s=instance.custom?.surface||instance.meta?.surface,b=instance.custom?{x:0,y:0,width:instance.custom.width,height:instance.custom.height}:instance.meta?.occupancy;
 if(!s||!b||!s.width||!s.height)throw Error('Asset has no usable support surface: '+instance.id);
 const x=instance.x-instance.width/2+(s.x-b.x+s.width/2)*instance.width/b.width;
 const y=instance.y-instance.depth/2+(s.y-b.y+s.height/2)*instance.depth/b.height;
 const angle=instance.rotation*Math.PI/180,dx=x-instance.x,dy=y-instance.y;
 return rectanglePoly(instance.x+dx*Math.cos(angle)-dy*Math.sin(angle),instance.y+dx*Math.sin(angle)+dy*Math.cos(angle),s.width*instance.width/b.width,s.height*instance.depth/b.height,instance.rotation);
}
export function placeFurnishings(place,room,exclusions=[]){
 const rank=s=>s.on?4:s.near?3:s.position?0:s.placement.startsWith('wall-')?1:2;
 const requests=furnishingRequests(place).sort((a,b)=>rank(a)-rank(b)),placed=[],pending=[];
 const center={x:room.x+room.w/2,y:room.y+room.h/2};
 // Keep a narrow aisle from the doorway to the room center. This is a placement reserve, not pathfinding.
 const d=room.doorPoint,aisle=d?rectanglePoly((d.x+center.x)/2,(d.y+center.y)/2,26,Math.hypot(d.x-center.x,d.y-center.y)+26,Math.atan2(center.y-d.y,center.x-d.x)*180/Math.PI-90):null;
 const blockers=exclusions.filter(z=>z.kind!=='void').map(z=>z.points.map(p=>[p.x,p.y]));
 for(const spec of requests){
  if(spec.on){pending.push(spec);continue;}
  for(let k=0;k<spec.count;k++){
   const candidates=[];
   let nearPoint;
   if(spec.near){const parents=placed.filter(p=>p.id===spec.near&&!p.on);if(!parents.length)throw Error('Missing nearby item '+spec.near);const parent=parents[k%parents.length],offset=spec.nearOffset||{x:0,y:parent.depth/2+spec.depth/2+10};nearPoint={x:parent.x+offset.x,y:parent.y+offset.y};}
   if(spec.position)candidates.push({x:room.x+spec.position.x,y:room.y+spec.position.y});
   else {const xs=[center.x],ys=[center.y];for(let x=room.x+12;x<=room.x+room.w-12;x+=12)xs.push(x);for(let y=room.y+12;y<=room.y+room.h-12;y+=12)ys.push(y);for(const y of ys)for(const x of xs)candidates.push({x,y});}
   const rowCols=Math.max(1,Math.ceil(Math.sqrt(spec.count*room.w/room.h))),rowRows=Math.ceil(spec.count/rowCols);
   const rowTarget={x:room.x+(k%rowCols+1)*room.w/(rowCols+1),y:room.y+(Math.floor(k/rowCols)+1)*room.h/(rowRows+1)};
   const score=p=>{if(nearPoint)return Math.hypot(p.x-nearPoint.x,p.y-nearPoint.y);switch(spec.placement){case 'wall-north':return p.y-room.y+Math.abs(p.x-center.x)*.05;case 'wall-south':return room.y+room.h-p.y+Math.abs(p.x-center.x)*.05;case 'wall-west':return p.x-room.x+Math.abs(p.y-center.y)*.05;case 'wall-east':return room.x+room.w-p.x+Math.abs(p.y-center.y)*.05;case 'rows':return room.shape==='cross'?(p.y-room.y)*2+(p.x-room.x):Math.hypot(p.x-rowTarget.x,p.y-rowTarget.y);default:return Math.hypot(p.x-center.x,p.y-center.y)}};
   candidates.sort((a,b)=>score(a)-score(b));
   let selected;
   for(const p of candidates){
    const poly=rectanglePoly(p.x,p.y,spec.width,spec.depth,spec.rotation),padded=rectanglePoly(p.x,p.y,spec.width+12,spec.depth+12,spec.rotation);
    if(!polygonFits(padded,room.poly)||blockers.some(b=>polygonsOverlap(poly,b,4)))continue;
    if(spec.blocking&&aisle&&polygonsOverlap(poly,aisle,2))continue;
    if(placed.some(b=>!b.on&&b.blocking===spec.blocking&&polygonsOverlap(poly,b.poly,6)))continue;
    selected={...spec,...p,poly,instanceId:spec.id+':'+k};break;
   }
   if(!selected)throw Error('Không đủ chỗ trong '+place.name+' cho '+spec.role+' #'+(k+1)+'; tăng phòng hoặc sửa yêu cầu');
   placed.push(selected);
  }
 }
 for(const spec of pending){
  const parents=placed.filter(p=>p.id===spec.on&&!p.on);if(!parents.length)throw Error('Missing support '+spec.on+' for '+spec.id);
  for(let k=0;k<spec.count;k++){
   let result;
   for(const parent of parents){const support=surfacePoly(parent),xs=support.map(p=>p[0]),ys=support.map(p=>p[1]);
    for(let y=Math.min(...ys)+spec.depth/2;y<=Math.max(...ys)-spec.depth/2&&!result;y+=5)for(let x=Math.min(...xs)+spec.width/2;x<=Math.max(...xs)-spec.width/2;x+=5){
     const poly=rectanglePoly(x,y,spec.width,spec.depth,spec.rotation);
     if(polygonFits(poly,support)&&!placed.some(p=>p.on&&polygonsOverlap(poly,p.poly,2))){result={...spec,x,y,poly,instanceId:spec.id+':'+k};break;}
    }
    if(result)break;
   }
   if(!result)throw Error('Không đủ bề mặt '+spec.on+' để đặt '+spec.role);
   placed.push(result);
  }
 }
 return placed;
}
