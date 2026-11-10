import assetCatalog from '../elements/catalog.json' with {type:'json'};
// Schematic landscape from approved assets. Instances never add canonical places.
const outdoorAssets=new Map(assetCatalog.elements.map(e=>[e.id,e]));
export function exteriorContextFor(places){
 const outdoors=places.filter(p=>['grounds','street','region'].includes(p.kind));
 if(!outdoors.length)return null;
 const name=outdoors.map(p=>p.name).join(' ').toLocaleLowerCase('vi');
 const terrain=/biển|bờ biển|tinworth/.test(name)?'sand':/rừng|hang sirius/.test(name)?'forest':/phố|đường|quảng trường|ga |nghĩa địa/.test(name)?'stone':'grass';
 return {water:/hồ|biển|ven bờ/.test(name),kind:places.some(p=>!outdoors.includes(p)&&p.kind!=='corridor')?'building':/làng|little whinging/.test(name)?'village':'outdoor',terrain};
}
export function landscapeInstances(model,terrain,placeId,kind){
 if(!model.floors.length)return [];
 const pts=model.floors.flat(),xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 const left=Math.min(...xs),right=Math.max(...xs),top=Math.min(...ys),bottom=Math.max(...ys);
 const ids=terrain==='forest'?['tree.pine','tree.oak','tree.birch']:['tree.rowan','tree.fruit'];
 const count=terrain==='forest'?22:terrain==='grass'?8:2,instances=[];
 for(let i=0;i<count*4&&instances.length<count;i++){
  const assetId=kind==='village'&&i<2?['house.wood.gable','house.brick.low'][i]:ids[i%ids.length],size=90+(i%4)*12,x=left+60+((i*.61803398875)%1)*(right-left-120),y=top+60+((i*.41421356237+.25)%1)*(bottom-top-120);
  if(x<(left+right)/2+40&&Math.abs(y-(top+bottom)/2)<45)continue;
  if(instances.some(p=>Math.abs(p.x-x)<(p.width+size)/2&&Math.abs(p.y-y)<(p.depth+size)/2))continue;
  if(model.rooms.some(r=>x>r.x-70&&x<r.x+r.w+70&&y>r.y-70&&y<r.bottom+70))continue;
  instances.push({id:'landscape-'+i,instanceId:'landscape-'+i,role:'vegetation',assetId,placeId,meta:outdoorAssets.get(assetId),x,y,width:size,depth:size*1.1,rotation:0,blocking:true,poly:[[x-size/2,y-size*.55],[x+size/2,y-size*.55],[x+size/2,y+size*.55],[x-size/2,y+size*.55]]});
 }
 return instances;
}
