import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {validateMapData} from '../runtime/map-data.mjs';import {resolveMap} from '../runtime/resolve-map.mjs';import {buildGeometry} from '../runtime/geometry.mjs';
const sample=()=>JSON.parse(fs.readFileSync(new URL('fixtures/scene.json',import.meta.url)));
test('new contract accepts template without storage, seed or radius',()=>{const d=sample();assert.equal(validateMapData(d).ok,true);assert.equal(resolveMap(d).mode,'template');d.view.maxHops=1;assert.equal(validateMapData(d).ok,false)});
test('unknown data never renders another template silently',()=>{const d=sample();d.places[0].atlasRef='missing';assert.throws(()=>resolveMap(d),/recipe/)});
test('arbitrary disconnected places have no radius restriction',()=>{const d=sample();d.places.push({...d.places[0],id:'far',atlasRef:null});assert.equal(validateMapData(d).ok,true)});
test('fog IDs require explicit polygon geometry',()=>{const d=sample();d.visibility.fogRegionIds=['fog'];assert.equal(validateMapData(d).ok,false);d.visibility.fogRegions=[{id:'fog',points:[{x:0,y:0},{x:30,y:0},{x:0,y:30}]}];assert.equal(validateMapData(d).ok,true)});
test('generated scene uses the approved indoor formula and never invents movement routes',()=>{
 const d=sample();d.view.preferredMode='generated';d.view.indoor={layout:'ell'};
 d.places[0].generation={function:'study',shape:'L',furnishings:[]};
 d.places.push({...d.places[0],id:'next'});
 d.connections.push({id:'link',from:d.places[0].id,to:'next',kind:'corridor',state:'open'});
 const g=buildGeometry(resolveMap(d),d.view.indoor);
 assert.equal(g.model.recipe,'ell');assert.equal(g.model.rooms.length,2);
 assert.equal(g.routes.length,0);
 assert.ok(g.floorPolygons.length>0&&g.actorZones.length>0);
});
test('optimized user atlas preserves 747 references / 726 places and valid nested placeIds',()=>{
 const a=JSON.parse(fs.readFileSync('maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json'));
 assert.equal(a.schemaVersion,'atlas-optimized-1.0');
 assert.deepEqual(a.statistics,{sourceEntries:747,places:726,mergedOccurrences:21});
 assert.equal(a.places.length,726);
 const ids=new Set(a.places.map(p=>p.id));assert.equal(ids.size,726);
 assert.equal(a.places.reduce((n,p)=>n+(p.sourceIds||[]).length,0),21);
 let refs=0;const check=rows=>{for(const id of rows){assert.ok(ids.has(id),'unknown placeId: '+id);refs++}};
 for(const template of a.templates)check(template.placeIds);
 for(const area of a.world.areas)check(area.placeIds);
 for(const map of a.world.au_maps)for(const floor of map.floors)check(floor.placeIds);
 for(const floor of a.hogwarts_castle.floors)for(const cluster of floor.clusters)check(cluster.placeIds);
 for(const tower of a.hogwarts_castle.towers)for(const level of tower.levels)check(level.placeIds);
 assert.equal(refs,747);
 const registry=JSON.parse(fs.readFileSync('runtime/templates.json'));
 assert.equal(Object.keys(registry.templates).length,13);
});
test('new indoor generator rejects layout across multiple floors rather than prebuilding floors',()=>{
 const places=Array.from({length:5},(_,i)=>({id:'r'+i,name:'Room '+i,floor:i===4?'F2':'F1',kind:'room',generation:{shape:'rectangle'}}));
 assert.throws(()=>buildGeometry({mode:'generated',places,connections:[]}),/one floor/);
});
test('PC separate from 10 NPC/group tags and duplicates rejected',()=>{const d=sample();for(let i=0;i<10;i++)d.actors.push({...d.actors[0],id:'npc'+i,isPC:false,entityType:'group'});assert.equal(validateMapData(d).ok,true);d.actors.push({...d.actors[0],id:'extra',isPC:false});assert.equal(validateMapData(d).ok,false);d.actors.pop();d.actors[1].id=d.actors[0].id;assert.equal(validateMapData(d).ok,false)});
test('display quotas are 2 side, 1 hint, 2 combined pool/life with no quest policy',()=>{
 const d=sample();const h=d.hints[0];
 d.hints=['side','side','hint','pool','life'].map((type,i)=>({...h,id:'h'+i,type}));
 assert.equal(validateMapData(d).ok,true);
 for(const type of ['side','hint','pool','life']){const copy=structuredClone(d);copy.hints.push({...h,id:'extra',type});assert.equal(validateMapData(copy).ok,false)}
 d.questPolicy={};assert.equal(validateMapData(d).ok,false);
});
test('exactly one PC, actual place and RP date required',()=>{
 for(const mutate of [d=>d.actors[0].isPC=false,d=>d.actors[0].placeId='missing',d=>d.meta.date='1992-02-30']){const d=sample();mutate(d);assert.equal(validateMapData(d).ok,false)}
});
test('HTML embedding serializes text without executable closing tags',async()=>{const {serializeMapData}=await import('../runtime/map-data.mjs');const d=sample();d.meta.quote='</script><script>alert(1)</script>';const text=serializeMapData(d);assert.ok(!text.includes('<'));assert.deepEqual(JSON.parse(text),d)});

test('minimal input applies defaults without changing facts or mutating caller',async()=>{
 const {assertMapData}=await import('../runtime/map-data.mjs');
 const d={meta:{date:'1992-09-11',time:'10:25',areaName:'Phòng học'},places:[{id:'room',name:'Phòng học',kind:'room',generation:{function:'classroom'}}],actors:[{id:'pc',name:'BẠN',placeId:'room',isPC:true}]};
 const before=structuredClone(d),n=assertMapData(d);assert.deepEqual(d,before);
 assert.equal(n.schemaVersion,'3.0.0');assert.deepEqual(n.places[0].generation.furnishings,[]);
 assert.equal(n.actors[0].tagType,'unknown');assert.equal(resolveMap(d).mode,'generated');
 assert.equal(Object.hasOwn(n,'focus'),false);assert.equal(Object.hasOwn(n.visibility,'visiblePlaceIds'),false);
 assert.equal(Object.hasOwn(n,'questPolicy'),false);
});
test('five omitted furnishings arrays reproduce the real failure and now render geometry',()=>{
 const d=sample();d.hints=[];d.view.preferredMode='generated';
 const place=d.places[0];d.places=Array.from({length:5},(_,i)=>({...place,id:i?'room-'+i:place.id,generation:{function:['classroom','office','store','practice','group'][i]}}));
 const g=buildGeometry(resolveMap(d));assert.equal(g.model.rooms.length,5);assert.ok(g.furnishingInstances.length>20);
 for(const p of d.places)assert.ok(g.suggestedAnchors[p.id].length);
});
test('incorrect values and removed fields fail with paths rather than silent coercion',()=>{
 for(const mutate of [d=>d.view=null,d=>d.actors[0].stance='walking',d=>d.actors[0].entityType='NPC',d=>d.places[0].kind='courtyard',d=>d.places[0].generation={function:'study',furnishings:null},d=>d.focus={},d=>d.visibility.visiblePlaceIds=[],d=>d.questPolicy={},d=>delete d.meta.date,d=>d.places[0].secret='hidden',d=>d.view.maxHops=1]){
 const d=sample();mutate(d);const v=validateMapData(d);assert.equal(v.ok,false);assert.ok(v.errors.length);
 }
 for(const d of [null,[],false,{},'bad'])assert.equal(validateMapData(d).ok,false);
});
test('partial inspector text is optional and connection state cannot be invented',async()=>{
 const {assertMapData}=await import('../runtime/map-data.mjs');const d=sample();
 d.actors[0].inspector={observation:'Đang đọc'};
 assert.equal(assertMapData(d).actors[0].inspector.overhear,'');
 d.connections=[{from:d.places[0].id,to:d.places[0].id}];assert.equal(validateMapData(d).ok,false);
});
