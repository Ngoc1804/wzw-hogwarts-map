import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import crypto from 'node:crypto';
import atlas from '../maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json' with {type:'json'};
import index from '../runtime/atlas-index.json' with {type:'json'};
import registry from '../runtime/templates.json' with {type:'json'};
import {resolveMap} from '../runtime/resolve-map.mjs';
import {canonicalPlaceId,assertAllowedScene,generatedSceneOptions} from '../runtime/atlas-scene.mjs';
const payload=id=>({meta:{date:'1992-09-11',time:'16:20',areaName:'Test'},places:[{id,name:index.canonicalNameById[canonicalPlaceId(id)]||id,kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:id}]});
test('approved source replaces old counts and every real record has exactly one owner',()=>{
 assert.equal(atlas.schemaVersion,'atlas-approved-2.0');assert.equal(index.atlasVersion,atlas.schemaVersion);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(atlas.source)).digest('hex'),atlas.sourceSha256);
 assert.equal(atlas.places.length,694);assert.equal(new Set(atlas.places.map(p=>p.id)).size,694);
 assert.deepEqual(index.knownPlaceIds,atlas.places.map(p=>p.id));
 const occurrences=new Map();for(const g of atlas.groups)for(const id of g.placeIds){occurrences.set(id,(occurrences.get(id)||0)+1);assert.equal(index.scopeById[id],g.key);}
 for(const p of atlas.places){assert.equal(occurrences.get(p.id),1,p.id);assert.ok(['TEMPLATE','ATLAS','AU'].includes(p.owner));}
 for(const r of atlas.references)assert.ok(r.targetPlaceId?index.knownPlaceIds.includes(r.targetPlaceId):atlas.groups.some(g=>g.key===r.targetScopeId));
});
test('aliases merge identical sites while distinct AU entrance halls retain their own owner',()=>{
 assert.equal(canonicalPlaceId('TWR-11-02-01'),'P-f322d7e98b6a02');
 assert.equal(canonicalPlaceId('P-5e20349a56bd1b'),'HOG-TNG1-S-06');
 const halls=atlas.places.filter(p=>p.name==='Tiền sảnh');assert.equal(halls.length,4);
 assert.equal(new Set(halls.map(p=>p.id)).size,4);assert.equal(halls.filter(p=>p.owner==='AU').length,3);
 assert.equal(index.scopeById['P-65ac0b29ed7007'].startsWith('world/'),true);
});
test('all listed CCC rooms are enabled; exactly five other AU maps stay locked',()=>{
 assert.deepEqual(index.cccNonRoomPlaceIds,[]);
 const au=index.groups.filter(g=>g.kind==='au');assert.equal(new Set(au.filter(g=>!g.buildEnabled).map(g=>g.key.split('/')[1])).size,5);
 assert.equal(new Set(au.filter(g=>g.buildEnabled).map(g=>g.key.split('/')[1])).size,3);
 const ccc=au.find(g=>g.key==='au/6/0');assert.equal(ccc.placeIds.length,5);
 for(const id of ccc.placeIds){assert.doesNotThrow(()=>assertAllowedScene([id]));assert.equal(resolveMap(payload(id)).places.length,5);}
 for(const id of index.lockedPlaceIds)assert.throws(()=>assertAllowedScene([id]),/locked/);
});
test('template bindings use only the approved owner; source location cannot be redirected to another map',()=>{
 for(const [id,bindings] of Object.entries(index.bindings))for(const [t,ref] of Object.entries(bindings)){
  assert.ok(index.templateOwnerById[id].includes(t));assert.ok(registry.templates[t].targets[ref]?.length);
 }
 const hall=resolveMap(payload('P-5e20349a56bd1b'));assert.equal(hall.templateId,'hall');
 assert.equal(resolveMap(payload('P-1b93d2a168cc1a')).places[0].atlasRef,'da-goods');
 const lake=payload('P-30cf89999f5e15');lake.view={templateId:'h2'};assert.throws(()=>resolveMap(lake),/verified PC binding/);
 assert.equal(resolveMap(payload('P-30cf89999f5e15')).templateId,'h1');
});
test('source corridor families are locked while room dimensions remain flexible',()=>{
 const d={view:{scopeId:'hogwarts/f1/0',indoor:{roomWidth:420}},focus:{actualPlaceId:'HOG-HMNGC-N-01'}};
 const plan={places:[{id:'HOG-HMNGC-N-01',kind:'room'}]};
 const opt=generatedSceneOptions(d,plan);assert.equal(opt.layout,'cross');assert.equal(opt.roomWidth,420);
 assert.throws(()=>generatedSceneOptions({...d,view:{...d.view,indoor:{layout:'horizontal'}}},plan),/approved corridor/);
});
test('retired records and unconfirmed Ministry floor fail explicitly',()=>{
 assert.throws(()=>resolveMap(payload('P-a69db007365fe0')),/Retired Atlas/);
 assert.throws(()=>resolveMap(payload('P-9b80548a6b0f27')),/awaits confirmed/);
});

test('every approved empty-classroom code and assigned corridor family survives compilation',()=>{
 const source=fs.readFileSync(atlas.source,'utf8');
 for(const name of source.match(/Phòng học trống [A-ZĐ]+-\d+/g)||[])assert.ok(atlas.places.some(p=>p.name===name),name);
 const lines=source.split('\n');
 for(const g of atlas.groups.filter(g=>g.preset?.lockedFamily&&['castle','tower'].includes(g.kind))){
  const family=lines[g.sourceLine-1].match(/Layout: (\w+)/)?.[1];assert.equal(g.preset.layout,family,g.key);
 }
 const apothecaries=atlas.places.filter(p=>p.name.toLowerCase().includes('apothecary'));assert.equal(apothecaries.length,2);assert.equal(new Set(apothecaries.map(p=>p.scopeId)).size,2);
});
