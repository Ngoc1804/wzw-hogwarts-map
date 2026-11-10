import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import sceneIndex from '../runtime/atlas-index.json' with {type:'json'};
import registry from '../runtime/templates.json' with {type:'json'};
import {canonicalPlaceId,isKnownAtlasPlace,verifiedAtlasBinding,assertAllowedScene,assertGeneratedScene,selectScenePreset,generatedSceneOptions} from '../runtime/atlas-scene.mjs';
import {resolveMap} from '../runtime/resolve-map.mjs';
const atlas=JSON.parse(fs.readFileSync(new URL('../maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json',import.meta.url)));
const sample=()=>JSON.parse(fs.readFileSync(new URL('contract-fixture.json',import.meta.url)));
const withPlace=(id,kind='room')=>{
 const d=sample();d.places[0]={...d.places[0],id,name:id,atlasRef:null,kind,generation:null};
 d.focus.actualPlaceId=id;d.view.centerPlaceId=id;d.view.routePlaceIds=[id];
 d.visibility.visiblePlaceIds=[id];d.actors[0].placeId=id;d.hints[0].placeId=id;
 return d;
};
test('canonical atlas covers all 747 source IDs with no dangling reference',()=>{
 assert.deepEqual(sceneIndex.statistics,{sourceEntries:747,places:726,mergedOccurrences:21});
 assert.equal(atlas.places.length,726);
 assert.equal(sceneIndex.knownPlaceIds.length,726);
 assert.equal(Object.keys(sceneIndex.aliases).length,21);
 const ids=new Set(atlas.places.map(p=>p.id));
 for(const place of atlas.places)for(const old of place.sourceIds||[])assert.equal(canonicalPlaceId(old),place.id);
 for(const g of sceneIndex.groups)for(const id of g.placeIds)assert.ok(ids.has(id),g.key+': '+id);
 for(const id of [...sceneIndex.lockedPlaceIds,...sceneIndex.cccNonRoomPlaceIds,...sceneIndex.noGeneratePlaceIds])assert.ok(ids.has(id));
});
test('template bindings are explicit and all target IDs exist in approved artworks',()=>{
 for(const [id,templates] of Object.entries(sceneIndex.bindings)){
  assert.ok(isKnownAtlasPlace(id));
  for(const [templateId,targetId] of Object.entries(templates)){
   assert.ok(registry.templates[templateId]?.targets[targetId],id+'/'+templateId+'/'+targetId);
   assert.equal(verifiedAtlasBinding(id,templateId),targetId);
  }
 }
 assert.equal(verifiedAtlasBinding('P-7dbd9dfca98ac3','hall'),null);
 assert.equal(canonicalPlaceId('P-5e20349a56bd1b'),'HOG-TNG1-S-06');
});
test('legacy alias resolves into the real Great Hall region without fuzzy guessing',()=>{
 const d=withPlace('P-5e20349a56bd1b');d.view.preferredMode='template';d.view.templateId='hall';
 const plan=resolveMap(d);
 assert.equal(plan.mode,'template');assert.equal(plan.places[0].id,'HOG-TNG1-S-06');
 assert.equal(plan.places[0].atlasRef,'filch-office');
 assert.equal(plan.targets[0].interactiveIds.length>0,true);
});
test('all five unbuilt AU maps are locked; CCC builds main room only',()=>{
 for(const id of sceneIndex.lockedPlaceIds)assert.throws(()=>assertAllowedScene([id]),/AU map locked/);
 for(const id of sceneIndex.cccNonRoomPlaceIds)assert.throws(()=>assertAllowedScene([id]),/CCC 07.18/);
 assert.doesNotThrow(()=>assertAllowedScene(['HOG-TNG8-W-01']));
 assert.doesNotThrow(()=>assertAllowedScene(['P-a63fc4014d765b']));
 assert.doesNotThrow(()=>assertAllowedScene(['P-7dbd9dfca98ac3']));
 for(const id of [sceneIndex.lockedPlaceIds[0],sceneIndex.cccNonRoomPlaceIds[0]]){
  assert.throws(()=>resolveMap(withPlace(id)),/locked|only the main room/);
 }
});
test('Ministry and existing H1/H2 exteriors do not generate duplicate maps',()=>{
 for(const id of sceneIndex.noGeneratePlaceIds)assert.throws(()=>assertGeneratedScene([id]),/Existing fixed map|AU map locked/);
 assert.throws(()=>resolveMap({...withPlace('P-30cf89999f5e15'),view:{...withPlace('P-30cf89999f5e15').view,preferredMode:'generated'}}),/Existing fixed map/);
});
test('castle, tower and only three approved AU have flexible presets',()=>{
 const castle=sceneIndex.groups.filter(g=>g.kind==='castle'),tower=sceneIndex.groups.filter(g=>g.kind==='tower'),au=sceneIndex.groups.filter(g=>g.kind==='au');
 assert.equal(castle.length,44);assert.equal(tower.length,27);
 assert.equal(au.filter(g=>g.buildEnabled===false).length>0,true);
 assert.equal(new Set(au.filter(g=>g.buildEnabled).map(g=>g.key.split('/')[1])).size,3);
 assert.ok([...castle,...tower,...au.filter(g=>g.buildEnabled)].every(g=>g.preset?.flexible===true));
 const g=castle.find(x=>x.key==='hogwarts/f4/1');
 const d={view:{scopeId:g.key,indoor:{}},focus:{actualPlaceId:g.placeIds[0]}};
 assert.equal(selectScenePreset(d,[{id:g.placeIds[0]}]).key,g.key);
 assert.equal(generatedSceneOptions(d,{places:[{id:g.placeIds[0],kind:'room'}]}).layout,'horizontal');
 assert.equal(generatedSceneOptions({...d,view:{...d.view,indoor:{layout:'ell'}}},{places:[{id:g.placeIds[0],kind:'room'}]}).layout,'ell');
});

import {auditCoverage} from './audit_coverage.mjs';
test('every canonical atlas entry has an explicit rendering outcome and all indoor fallbacks build safe surfaces',()=>{
 const report=auditCoverage();assert.equal(report.total,726);assert.equal(report.counts['generation-error']||0,0);
 assert.equal(new Set(report.entries.map(p=>p.id)).size,726);
 for(const p of report.entries)assert.ok(p.name&&p.status,p.id);
 assert.ok(report.counts['generated-indoor']>400);
});
test('outdoor atlas records must never silently become indoor rectangles',()=>{
 const p=sceneIndex.knownPlaceIds.find(id=>sceneIndex.placeFunctionById[id]==='outdoor'&&!sceneIndex.bindings[id]&&!sceneIndex.noGeneratePlaceIds.includes(id)&&!sceneIndex.lockedPlaceIds.includes(id));
 assert.throws(()=>resolveMap(withPlace(p)),/Outdoor place|CCC/);
});
