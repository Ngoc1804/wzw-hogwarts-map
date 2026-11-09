import test from 'node:test';import assert from 'node:assert/strict';
import {FORMULAS,buildIndoorLayout,selectIndoorFormula,WALL_HEIGHT} from '../runtime/architecture/recipes.mjs';
import {buildIndoorWalls,floorContains} from '../runtime/architecture/walls.mjs';
const overlap=(a,b)=>a.x<b.x+b.w-1e-6&&a.x+a.w>b.x+1e-6&&a.y<b.bottom-1e-6&&a.bottom>b.y+1e-6;
test('selection: known > explicit/constraints; random is opt-in and restricted',()=>{
 assert.equal(selectIndoorFormula({knownStructure:'ell'}).source,'known');assert.throws(()=>selectIndoorFormula({knownStructure:'ell',layout:'tee'}));
 assert.equal(selectIndoorFormula({constraints:{courtyard:'closed'}}).id,'cloister');assert.equal(selectIndoorFormula({constraints:{windows:true}}).id,'windows');
 assert.throws(()=>selectIndoorFormula({layout:'horizontal',constraints:{tower:true}}));assert.throws(()=>selectIndoorFormula({constraints:{courtyard:'open',tower:true}}));
 assert.throws(()=>selectIndoorFormula({strategy:'random'}));assert.equal(selectIndoorFormula({strategy:'random',allowRandom:true,candidates:['ell','tee']},()=>.9).id,'tee');
 assert.equal(selectIndoorFormula({}).id,selectIndoorFormula({}).id);assert.equal(WALL_HEIGHT,36);
});
test('all ten formulas vary count and dimensions with clear rectangular rooms and actual door gaps',()=>{
 for(const layout of Object.keys(FORMULAS))for(const roomCount of [4,8,13,24,32])for(const [roomWidth,roomDepth,corridorWidth]of [[180,180,100],[300,260,160],[500,480,240]]){
  const m=buildIndoorLayout({layout,roomCount,roomWidth,roomDepth,corridorWidth}),walls=buildIndoorWalls(m);assert.equal(m.rooms.length,roomCount);assert.equal(new Set(m.rooms.map(r=>r.id)).size,roomCount);
  for(const r of m.rooms){for(const b of m.rooms)if(r.id<b.id)assert.ok(!overlap(r,b),layout+': overlapping rooms');
   const d=r.doorPoint,side=r.doorSide,[dx,dy]={N:[0,-1],S:[0,1],E:[1,0],W:[-1,0]}[side];assert.ok(floorContains(m,d.x+dx*10,d.y+dy*10),layout+': door misses corridor');
   for(const w of walls){const h='NS'.includes(side);if(w.axis===(h?'H':'V')&&Math.abs(w.fixed-(h?d.y:d.x))<1e-4)assert.ok(w.hi<=(h?d.x:d.y)-24||w.lo>=(h?d.x:d.y)+24,layout+': door blocked');}
  }
 }
});
test('room identities, individual sizes and nonrectangular shapes are handled independently',()=>{
 const m=buildIndoorLayout({layout:'ell',rooms:Array.from({length:7},(_,i)=>({id:'id-'+i,name:'Tên '+i,width:200+i*20,depth:200+i*25,shape:['rectangle','L','U','T','cross','round','rectangle'][i]}))});
 for(let i=0;i<7;i++){assert.equal(m.rooms[i].id,'id-'+i);assert.equal(m.rooms[i].name,'Tên '+i);assert.equal(m.rooms[i].doorSide==='E'||m.rooms[i].doorSide==='W'?m.rooms[i].w:m.rooms[i].bottom-m.rooms[i].y,200+i*25);}
 assert.equal(m.thresholds.length,1);assert.throws(()=>buildIndoorLayout({roomCount:2}));assert.throws(()=>buildIndoorLayout({roomCount:8,roomWidth:-1}));assert.throws(()=>buildIndoorLayout({roomCount:8,roomShape:'unknown'}));
});
test('walkable corridor remains connected through turns and all doors have an interior landing',()=>{
 for(const layout of Object.keys(FORMULAS)){
  const m=buildIndoorLayout({layout,roomCount:8}),ps=m.floors.flat(),xs=ps.map(p=>p[0]),ys=ps.map(p=>p[1]),x0=Math.floor(Math.min(...xs)/20)*20+7,y0=Math.floor(Math.min(...ys)/20)*20+7;
  const free=new Map(),step=20;for(let y=y0;y<=Math.max(...ys);y+=step)for(let x=x0;x<=Math.max(...xs);x+=step)if([[0,0],[10,0],[-10,0],[0,10],[0,-10]].every(([dx,dy])=>floorContains(m,x+dx,y+dy)))free.set(x+','+y,[x,y]);
  const start=free.keys().next().value;assert.ok(start);const seen=new Set([start]),queue=[free.get(start)];for(let head=0;head<queue.length;head++){const[x,y]=queue[head];for(const[dx,dy]of[[step,0],[-step,0],[0,step],[0,-step]]){const key=(x+dx)+','+(y+dy);if(free.has(key)&&!seen.has(key)){seen.add(key);queue.push(free.get(key));}}}assert.equal(seen.size,free.size,layout+': disconnected corridor');
  for(const r of m.rooms){const d=r.doorPoint,[dx,dy]={N:[0,-1],S:[0,1],E:[1,0],W:[-1,0]}[r.doorSide],x=d.x-dx*35,y=d.y-dy*35;assert.ok(x>r.x&&x<r.x+r.w&&y>r.y&&y<r.bottom,layout+': interior landing');}
 }
});
