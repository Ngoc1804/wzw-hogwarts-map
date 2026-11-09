import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildGeometry,indoorActorPoint} from '../runtime/geometry.mjs';
import {insidePolygon} from '../runtime/architecture/walls.mjs';
import {resolveMap} from '../runtime/resolve-map.mjs';
import {validateMapData} from '../runtime/map-data.mjs';
const source=()=>JSON.parse(fs.readFileSync(new URL('contract-fixture.json',import.meta.url)));
const place=(i,shape='rectangle')=>({id:'room-'+i,name:'Phòng '+i,kind:'room',floor:'F1',generation:{function:'study',shape,furnishings:[]}});
const plan=(n,shapes=[])=>({mode:'generated',places:Array.from({length:n},(_,i)=>place(i,shapes[i]||'rectangle')),connections:[]});
const inRegion=(pt,region)=>insidePolygon(pt.x,pt.y,region.points.map(p=>[p.x,p.y]));
test('all ten approved formula families build only the requested current rooms',()=>{
 for(const layout of ['horizontal','vertical','ell','tee','cross','court','cloister','windows','curved','tower']){
  for(const n of [2,4,8]){
   const g=buildGeometry(plan(n),{layout});
   assert.equal(Object.keys(g.rooms).length,n,layout+' scene room count');
   assert.equal(g.model.recipe,layout);
   assert.equal(g.routes.length,0,'no inferred movement routes');
   assert.ok(g.walls.length>0);
   assert.ok(g.actorZones.length>0);
   for(const p of Object.values(g.rooms))assert.ok(g.suggestedAnchors[p.id]?.length);
  }
 }
});
test('concave L, U, T and round rooms expose real floor and safe inset surfaces',()=>{
 const shapes=['L','U','T','round','rectangle','cross'];
 const g=buildGeometry(plan(6,shapes),{layout:'ell',roomWidth:300,roomDepth:260,corridorWidth:160});
 for(const p of Object.values(g.rooms)){
  const floor=g.floorPolygons.find(z=>z.id==='room:'+p.id);
  assert.ok(floor);
  const point=indoorActorPoint(g,p.id);
  assert.ok(inRegion(point,floor));
  assert.ok(g.safeAreas[p.id].some(z=>inRegion(point,z)));
  assert.ok(g.exclusionZones.every(z=>!inRegion(point,z)));
 }
 assert.ok(g.floorPolygons.some(z=>z.id.startsWith('corridor:')));
 assert.ok(g.exclusionZones.some(z=>z.kind==='door'));
 assert.ok(g.exclusionZones.some(z=>z.kind==='stairs'));
});
test('courtyard remains exclusion and cannot contain actor zones',()=>{
 for(const layout of ['court','cloister']){
  const g=buildGeometry(plan(8),{layout});
  const voids=g.exclusionZones.filter(z=>z.kind==='void');
  assert.ok(voids.length);
  for(const zone of g.actorZones)for(const p of zone.points)assert.ok(voids.every(v=>!inRegion(p,v)),layout+' actor intersects courtyard');
 }
});
test('position is per MAP_DATA render, with exact validated actor standing zone',()=>{
 const g=buildGeometry(plan(4),{layout:'horizontal'});
 const p=indoorActorPoint(g,'room-0');
 assert.deepEqual(indoorActorPoint(g,'room-0',p),p);
 assert.throws(()=>indoorActorPoint(g,'room-0',{x:99999,y:99999}),/outside verified safe floor/);
 assert.throws(()=>indoorActorPoint(g,'missing'),/outside generated scene/);
 assert.throws(()=>buildGeometry({mode:'generated',places:[place(0),{...place(1),floor:'F2'}],connections:[]}),/one floor/);
});
test('MAP_DATA optional indoor selection and per-room dimensions are validated',()=>{
 const d=source();d.view.preferredMode='generated';
 d.view.indoor={layout:'ell',roomWidth:320,roomDepth:240,corridorWidth:130};
 d.places[0].generation={function:'study',shape:'U',width:310,depth:235,furnishings:[]};
 assert.equal(validateMapData(d).ok,true);
 assert.equal(resolveMap(d).mode,'generated');
 const g=buildGeometry(resolveMap(d),d.view.indoor);
 assert.equal(g.model.rooms.length,1);
 assert.equal(g.model.rooms[0].id,d.places[0].id);
 d.view.indoor.roomWidth=999;
 assert.equal(validateMapData(d).ok,false);
});
test('unknown indoor shapes fail instead of guessing another shape',()=>{
 assert.throws(()=>buildGeometry(plan(3,['polygon'])),/Unsupported indoor room shape/);
});

test('corridor place maps to actual passage floor, not a fake room',()=>{
 const g=buildGeometry({mode:'generated',places:[...plan(3).places,{...place(4,'straight'),kind:'corridor'}],connections:[]},{layout:'tee'});
 assert.equal(Object.keys(g.rooms).length,3);
 assert.ok(g.floorPolygons.some(x=>x.id==='corridor-place:room-4'));
 assert.ok(g.safeAreas['room-4']?.length);
 assert.ok(indoorActorPoint(g,'room-4'));
});
test('corridor-only scene draws floors without inventing rooms',()=>{
 const g=buildGeometry({mode:'generated',places:[{...place(1,'straight'),kind:'corridor'}],connections:[]},{layout:'horizontal'});
 assert.equal(Object.keys(g.rooms).length,0);
 assert.equal(g.model.rooms.length,0);
 assert.ok(g.actorZones.length>0&&g.floorPolygons.length>0);
 assert.ok(indoorActorPoint(g,'room-1'));
});

test('single-room generated floor does not fabricate a corridor or stair',()=>{
 const g=buildGeometry(plan(1),{layout:'ell'});
 assert.equal(Object.keys(g.rooms).length,1);
 assert.equal(g.model.floors.length,0);
 assert.equal(g.model.stair,null);
 assert.equal(g.floorPolygons.filter(x=>x.id.startsWith('corridor:')).length,0);
 assert.ok(indoorActorPoint(g,'room-0'));
});
