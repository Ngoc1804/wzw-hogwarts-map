// Ephemeral layout, created only for this Preview. No storage or network writes.
export function buildGeometry(plan){
 const rooms={},floors=[...new Set(plan.places.map(p=>p.floor||''))];
 let floorY=80;
 for(const floor of floors){const list=plan.places.filter(p=>(p.floor||'')===floor);const order={north:0,west:1,core:2,east:3,south:4,tower:5};list.sort((a,b)=>(order[a.zone]??2)-(order[b.zone]??2));list.forEach((p,i)=>{rooms[p.id]={id:p.id,x:80+(i%3)*340,y:floorY+Math.floor(i/3)*300,w:240,h:['straight','curved'].includes(p.generation.shape)?80:200,shape:p.generation.shape,recipe:p.generation}});floorY+=Math.ceil(list.length/3)*300+100;}
 const bounds=[0,0,Math.max(440,Math.min(3,plan.places.length)*340+140),floorY+140];
 const occupied=new Set();const cell=20,key=(x,y)=>x+','+y;
 const blocked=(x,y)=>Object.values(rooms).some(r=>x>r.x-18&&x<r.x+r.w+18&&y>r.y-18&&y<r.y+r.h+18);
 function route(a,b){const start=[a.x+a.w/2,a.y+a.h+40],goal=[b.x+b.w/2,b.y+b.h+40];const queue=[{p:start,g:0,f:0}],best=new Map([[key(...start),0]]),prev=new Map();let found=false;
 while(queue.length){queue.sort((a,b)=>a.f-b.f);const current=queue.shift(),[x,y]=current.p,k=key(x,y);if(current.g!==best.get(k))continue;if(x===goal[0]&&y===goal[1]){found=true;break}for(const [dx,dy]of [[20,0],[-20,0],[0,20],[0,-20]]){const nx=x+dx,ny=y+dy,nk=key(nx,ny);if(nx<20||ny<20||nx>bounds[2]-20||ny>bounds[3]-20||blocked(nx,ny))continue;const g=current.g+1+(occupied.has(nk)?3:0);if(g<(best.get(nk)??Infinity)){best.set(nk,g);prev.set(nk,[x,y]);queue.push({p:[nx,ny],g,f:g+(Math.abs(nx-goal[0])+Math.abs(ny-goal[1]))/cell})}}}
 if(!found)throw Error('Không tìm được hành lang nối phòng; hãy giảm phòng hoặc tách tầng');let at=goal,ps=[goal];while(key(...at)!==key(...start)){at=prev.get(key(...at));ps.push(at)}ps.reverse();ps.forEach(p=>occupied.add(key(...p)));return [[start[0],a.y+a.h],...ps,[goal[0],b.y+b.h]];
 }
 const routes=plan.connections.map(c=>({...c,points:route(rooms[c.from],rooms[c.to])}));return {rooms,routes,bounds};
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
