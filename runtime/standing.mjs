// Only physical standing rules. No binding zones, collision graph or new renderer.
const finite=n=>typeof n==='number'&&Number.isFinite(n);
function bounds(shape){
  if(Array.isArray(shape)){
    const pts=shape.map(p=>Array.isArray(p)?p:[p?.x,p?.y]);
    if(pts.length<3||pts.some(p=>!finite(p[0])||!finite(p[1])))return null;
    const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
    return {x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};
  }
  if(shape&&[shape.x,shape.y,shape.width,shape.height].every(finite)&&shape.width>0&&shape.height>0)return shape;
  return null;
}
function contains(shape,x,y){
  const b=bounds(shape);if(!b||x<b.x||x>b.x+b.width||y<b.y||y>b.y+b.height)return false;
  if(!Array.isArray(shape))return true;
  const pts=shape.map(p=>Array.isArray(p)?p:[p.x,p.y]);
  let inside=false;
  for(let i=0,j=pts.length-1;i<pts.length;j=i++){
    const [ax,ay]=pts[i],[bx,by]=pts[j];
    if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)inside=!inside;
  }
  return inside;
}
/**
 * Use only real, visible floor geometry supplied by the viewer. Templates may
 * use the whole floor around an anchor, without a binding/collision zone.
 * Blockers are roof/scenery silhouettes for templates only. Generated layouts
 * pass their actual floor geometry and no extra blockers.
 * Returns null rather than placing an actor on a roof or outside the floor.
 */
export function pickStandingPoint({floors,blockers=[],origin=null,occupied=[],index=0}){
  if(!Array.isArray(floors)||!floors.length)return null;
  const areas=floors.map(bounds).filter(Boolean);
  if(!areas.length)return null;
  const center=origin&&finite(origin.x)&&finite(origin.y)?origin:{
    x:areas[0].x+areas[0].width/2,y:areas[0].y+areas[0].height/2
  };
  const valid=(x,y)=>floors.some(f=>contains(f,x,y))&&!blockers.some(b=>contains(b,x,y))&&
    !occupied.some(p=>finite(p.x)&&finite(p.y)&&Math.hypot(p.x-x,p.y-y)<12);
  const found=(x,y)=>valid(x,y)?{x:Math.round(x*100)/100,y:Math.round(y*100)/100}:null;
  const step=Math.max(8,Math.min(44,Math.min(...areas.map(a=>Math.max(8,Math.min(a.width,a.height))))/12));
  // Search from the place's template anchor towards the nearest clear floor.
  if(index===0){const direct=found(center.x,center.y);if(direct)return direct;}
  for(let ring=1;ring<=32;ring++){
    const radius=ring*step,segments=Math.max(12,Math.min(64,ring*12));
    for(let j=0;j<segments;j++){
      const angle=2*Math.PI*((j+index*5)%segments)/segments;
      const point=found(center.x+Math.cos(angle)*radius,center.y+Math.sin(angle)*radius);
      if(point)return point;
    }
  }
  // Fallback across floor only, not just within a data-id/binding box.
  for(const a of areas){
    const grid=Math.max(6,Math.max(a.width,a.height)/50);
    for(let y=a.y+grid/2;y<a.y+a.height;y+=grid)
      for(let x=a.x+grid/2;x<a.x+a.width;x+=grid){
        const point=found(x,y);if(point)return point;
      }
  }
  return null;
}
/**
 * Explicit standing request for each actor. The template target is a hint to
 * find nearby floor, not a required standing/binding region.
 */
export function buildStandingSpecs(actors,mode,targets=[]){
  const byPlace=new Map(targets.map(t=>[t.placeId,t.interactiveIds]));
  return actors.map((actor,index)=>{
    const anchorIds=mode==='template'?byPlace.get(actor.placeId):[];
    if(mode==='template'&&!anchorIds?.length)throw new Error('Template standing target missing: '+actor.placeId);
    return {
      actorId:actor.id,placeId:actor.placeId,mode,
      surface:'floor',anchorIds:[...anchorIds],
      avoid:mode==='template'?['roof','scenery']:[],
      order:index
    };
  });
}
