import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateMapData,serializeMapData} from '../runtime/map-data.mjs';
import {resolveMap,layoutSeed} from '../runtime/resolve-map.mjs';
import {prepareMap} from '../runtime/prepare-map.mjs';
import {pickStandingPoint} from '../runtime/standing.mjs';
const read=f=>JSON.parse(fs.readFileSync(new URL('../runtime/examples/'+f,import.meta.url)));
const sample=()=>read('local-template.json'),generated=()=>read('local-generated.json');
const invalid=(mutate,match)=>{const d=sample();mutate(d);const result=validateMapData(d);assert.equal(result.ok,false);if(match)assert.match(result.errors.join(';'),match)};
test('both contract examples validate',()=>{assert.equal(validateMapData(sample()).ok,true);assert.equal(validateMapData(generated()).ok,true)});
test('NPC cap counts groups and communities as individual tags, PC separate',()=>{
 const d=sample(),a=d.actors[0];for(let i=0;i<10;i++)d.actors.push({...a,id:'npc-'+i,isPC:false,entityType:i%2?'group':'community'});
 assert.equal(validateMapData(d).ok,true);d.actors.push({...a,id:'npc-extra',isPC:false});assert.equal(validateMapData(d).ok,false);
});
test('six hints only, current monthly pack and type quotas enforced',()=>{
 invalid(d=>d.hints[0].packId='old-pack',/another monthly/);
 invalid(d=>d.questPolicy.month='1992-08',/match RP/);
 invalid(d=>d.questPolicy.limits.life=0,/quota/);
 invalid(d=>{d.hints=Array.from({length:7},(_,i)=>({...d.hints[0],id:'hint-'+i,sourceQuestId:'q-'+i}))},/array size/);
});
test('unknown, duplicate and hidden references are rejected',()=>{
 invalid(d=>d.actors[0].placeId='missing',/unknown place/);
 invalid(d=>d.visibility.visiblePlaceIds=[],/visible/);
 invalid(d=>d.hints[0].id='pc',/Duplicate/);
 invalid(d=>d.internalHiddenState={secret:true},/unknown field/);
});
test('special positions need context and patrol needs current duty',()=>{
 invalid(d=>{d.actors[0].positionMode='animagus';d.actors[0].positionReason=null},/reason/);
 invalid(d=>d.actors[0].tagType='patrol',/onPatrol/);
});
test('locality and connected route required',()=>{
 const d=generated();d.connections=[];assert.equal(validateMapData(d).ok,false);
 invalid(d=>d.view.centerPlaceId='remote-room',/center/);
});
test('dates and exactly one PC required',()=>{
 invalid(d=>d.meta.date='1992-02-30',/Invalid RP/);
 invalid(d=>d.actors[0].isPC=false,/matching PC/);
});
test('script embedding escapes active HTML without corrupting text',()=>{
 const d=sample();d.meta.quote='</script><script>alert(1)</script>';
 const s=serializeMapData(d);assert.ok(!s.includes('<'));assert.deepEqual(JSON.parse(s),d);
});
test('template resolver selects precise known atlas bindings, requires local crop',()=>{
 const plan=resolveMap(sample());assert.equal(plan.mode,'template');assert.equal(plan.templateId,'h1');assert.equal(plan.requiresLocalCrop,true);assert.ok(plan.targets[0].interactiveIds.includes('region:extra:0'));
});
test('template mismatch does not silently use the wrong map',()=>{
 const d=sample();d.view.preferredMode='template';d.view.templateId='express';assert.throws(()=>resolveMap(d),/cannot cover/);
});
test('unknown scopes use recipes, not name guessing',()=>{
 assert.equal(resolveMap(generated()).mode,'generated');const d=generated();d.places[0].generation=null;assert.throws(()=>resolveMap(d),/recipe/);
});
test('seed independent of snapshot, time, quote and actor list',async()=>{
 const a=generated(),b=generated();b.snapshotId='turn-002';b.meta.time='11:00';b.meta.quote='Khám phá tiếp thôi.';assert.equal(await layoutSeed(a),await layoutSeed(b));b.worldId='other-au';assert.notEqual(await layoutSeed(a),await layoutSeed(b));
});
test('repeated calls reuse stored layout and missing saved state never regenerates',async()=>{
 const store=new Map();let builds=0;
 const host={loadLayout:async k=>store.get(k),saveLayout:async(k,s)=>store.set(k,s),createLayout:async p=>{builds++;return {key:p.key,seed:p.seed,algorithm:p.algorithm,rooms:Object.fromEntries(p.places.map((p,i)=>[p.id,{x:i*100,y:0}]))}},extendLayout:async()=>{throw new Error('Unexpected extension')}};
 const d=generated(),a=await prepareMap(d,host);d.snapshotId='later';const b=await prepareMap(d,host);assert.deepEqual(a.layoutState,b.layoutState);assert.equal(builds,1);
 d.layout.stateRef='lost-state';await assert.rejects(prepareMap(d,{...host,loadLayout:async()=>null}),/refusing/);
});
test('extension cannot move a previously saved room',async()=>{
 const d=generated();const state={key:JSON.stringify([d.worldId,d.view.scopeId,d.layout.scopeKey,d.layout.version]),seed:'seed',algorithm:'hybrid-v1',rooms:{'local-study':{x:10,y:20}}};
 const host={loadLayout:async()=>state,saveLayout:async()=>{throw new Error('Should not save')},extendLayout:async s=>({...s,rooms:{'local-study':{x:99,y:20},'local-corridor':{x:100,y:20}}})};
 await assert.rejects(prepareMap(d,host),/moved or changed/);assert.equal(state.rooms['local-study'].x,10);
});
test('template bindings match current technical index and never invent targets',()=>{
 const registry=JSON.parse(fs.readFileSync(new URL('../runtime/templates.json',import.meta.url)));
 const index=JSON.parse(fs.readFileSync(new URL('../maps/interaction-index.json',import.meta.url)));
 for(const [id,t] of Object.entries(registry.templates))for(const [atlasRef,targets] of Object.entries(t.targets))for(const target of targets)assert.equal(index.maps[id][target],atlasRef);
});

test('template positions are floor-based and exclude roof/scenery, no binding zone required',()=>{
 const p=resolveMap(sample());assert.equal(p.standing.length,1);
 const s=p.standing[0];assert.equal(s.mode,'template');assert.equal(s.surface,'floor');
 assert.deepEqual(s.avoid,['roof','scenery']);assert.ok(s.anchorIds.includes('region:extra:0'));
 const floor={x:0,y:0,width:140,height:140};
 const block={x:35,y:35,width:70,height:70}; // house/roof silhouette
 const point=pickStandingPoint({floors:[floor],blockers:[block],origin:{x:70,y:70}});
 assert.ok(point);assert.ok(point.x>=0&&point.y>=0&&point.x<=140&&point.y<=140);
 assert.ok(!(point.x>=35&&point.x<=105&&point.y>=35&&point.y<=105));
});
test('generated actors stand on generated floor without template/binding anchors',()=>{
 const p=resolveMap(generated());assert.equal(p.standing[0].mode,'generated');
 assert.deepEqual(p.standing[0].anchorIds,[]);assert.deepEqual(p.standing[0].avoid,[]);
 const floor=[[0,0],[80,0],[80,30],[30,30],[30,80],[0,80]];
 const point=pickStandingPoint({floors:[floor],origin:{x:65,y:65}});
 assert.ok(point);assert.ok(point.x<=30||point.y<=30);
});
test('standing never fabricates a position when floor is missing or fully blocked',()=>{
 assert.equal(pickStandingPoint({floors:[]}),null);
 assert.equal(pickStandingPoint({floors:[{x:0,y:0,width:20,height:20}],blockers:[{x:0,y:0,width:20,height:20}],origin:{x:10,y:10}}),null);
});
