import {WALL_HEIGHT,rectangle} from "./recipes.mjs";
export function insidePolygon(x,y,p){let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
export function floorContains(model,x,y){return (model.floors||[model.floor]).some(p=>insidePolygon(x,y,p))}
export function buildIndoorWalls(model){
 const rooms=model.rooms,depth=WALL_HEIGHT,layout=model.recipe;
 const raw=[],diagonal=[],gaps=[],eps=1e-5,round=n=>Math.round(n/eps)*eps;
 const addPoly=(p,z)=>{for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1];if(Math.hypot(dx,dy)<eps)continue;
  if(Math.abs(dx)>eps&&Math.abs(dy)>eps){diagonal.push({axis:'D',a,b,z});continue;}
  const h=Math.abs(dy)<eps;raw.push({axis:h?'H':'V',fixed:round(h?a[1]:a[0]),lo:round(Math.min(h?a[0]:a[1],h?b[0]:b[1])),hi:round(Math.max(h?a[0]:a[1],h?b[0]:b[1])),z});
 }};
 const polygons=model.floors||[model.floor];for(const p of polygons)addPoly(p,layout==='curved'?depth*1.8:depth);
 for(const r of rooms){const p=r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y);addPoly(p,r.circular?depth*1.25:depth);
  const d=r.doorPoint,h='NS'.includes(r.doorSide),axis=h?'H':'V',fixed=round(h?d.y:d.x),c=h?d.x:d.y;gaps.push({axis,fixed,lo:c-25,hi:c+25});
  for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];if(h&&Math.abs(a[1]-d.y)<eps&&Math.abs(b[1]-d.y)<eps)raw.push({axis,fixed,lo:Math.min(a[0],b[0]),hi:Math.max(a[0],b[0]),z:depth*1.8});if(!h&&Math.abs(a[0]-d.x)<eps&&Math.abs(b[0]-d.x)<eps)raw.push({axis,fixed,lo:Math.min(a[1],b[1]),hi:Math.max(a[1],b[1]),z:depth*1.8});}
 }
 for(const f of model.facades||[])raw.push({...f,z:depth*1.8});
 if(model.entrance)gaps.push(model.entrance);

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
 const merged=[];for(const w of walls.filter(w=>w.axis!=='D').sort((a,b)=>a.axis.localeCompare(b.axis)||a.fixed-b.fixed||a.z-b.z||a.lo-b.lo)){const last=merged.at(-1);if(last&&last.axis===w.axis&&last.fixed===w.fixed&&last.z===w.z&&Math.abs(last.hi-w.lo)<eps)last.hi=w.hi;else merged.push({...w});}merged.push(...walls.filter(w=>w.axis==='D'));
 return merged.sort((a,b)=>(a.axis==='H'?a.fixed:a.axis==='V'?a.hi:Math.max(a.a[1],a.b[1]))-(b.axis==='H'?b.fixed:b.axis==='V'?b.hi:Math.max(b.a[1],b.b[1])));
}
