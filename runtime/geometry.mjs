// Ephemeral layout, created only for this Preview. No storage or network writes.
export function buildGeometry(plan){
 const rooms=Object.fromEntries(plan.places.map((p,i)=>[p.id,{id:p.id,x:80+i*340,y:80,w:240,h:['straight','curved'].includes(p.generation.shape)?80:200,shape:p.generation.shape,recipe:p.generation}]));
 const routes=plan.connections.map((c,i)=>{const a=rooms[c.from],b=rooms[c.to],y=340+i*46;return {...c,points:[[a.x+120,a.y+a.h],[a.x+120,y],[b.x+120,y],[b.x+120,b.y+b.h]]}});
 return {rooms,routes,bounds:[0,0,Math.max(400,plan.places.length*340),Math.max(420,400+routes.length*46)]};
}
export function roomPath(r){
 const {x,y,w,h,shape}=r;
 if(shape==='curved')return `M${x+30} ${y}H${x+w-30}Q${x+w} ${y} ${x+w} ${y+30}V${y+h-30}Q${x+w} ${y+h} ${x+w-30} ${y+h}H${x+30}Q${x} ${y+h} ${x} ${y+h-30}V${y+30}Q${x} ${y} ${x+30} ${y}Z`;
 if(shape==='round')return `M${x} ${y+h/2}a${w/2} ${h/2} 0 1 0 ${w} 0a${w/2} ${h/2} 0 1 0 -${w} 0`;
 const shapes={L:[[0,0],[.6,0],[.6,.4],[1,.4],[1,1],[0,1]],T:[[0,0],[1,0],[1,.45],[.65,.45],[.65,1],[.35,1],[.35,.45],[0,.45]],U:[[0,0],[.3,0],[.3,.6],[.7,.6],[.7,0],[1,0],[1,1],[0,1]],polygon:[[.2,0],[.8,0],[1,.3],[1,.7],[.8,1],[.2,1],[0,.7],[0,.3]]};
 return (shapes[shape]||[[0,0],[1,0],[1,1],[0,1]]).map(([a,b],i)=>`${i?'L':'M'}${x+a*w} ${y+b*h}`).join(' ')+'Z';
}
export function furnitureSlots(r){
 const shape=r.shape,polys={L:[[0,0],[.6,0],[.6,.4],[1,.4],[1,1],[0,1]],T:[[0,0],[1,0],[1,.45],[.65,.45],[.65,1],[.35,1],[.35,.45],[0,.45]],U:[[0,0],[.3,0],[.3,.6],[.7,.6],[.7,0],[1,0],[1,1],[0,1]],polygon:[[.2,0],[.8,0],[1,.3],[1,.7],[.8,1],[.2,1],[0,.7],[0,.3]]};
 const inside=(x,y)=>{if(shape==='round')return ((x-.5)/.5)**2+((y-.5)/.5)**2<.9;const ps=polys[shape];if(!ps)return true;let ok=false;for(let i=0,j=ps.length-1;i<ps.length;j=i++){const [a,b]=ps[i],[c,d]=ps[j];if((b>y)!==(d>y)&&x<(c-a)*(y-b)/(d-b)+a)ok=!ok}return ok};
 const slots=[];for(let y=12;y<r.h-65;y+=54)for(let x=12;x<r.w-48;x+=54)if([[x,y],[x+48,y],[x,y+48],[x+48,y+48]].every(([a,b])=>inside(a/r.w,b/r.h)))slots.push([r.x+x,r.y+y]);return slots;
}
