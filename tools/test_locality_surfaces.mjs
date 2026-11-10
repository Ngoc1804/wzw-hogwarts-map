import test from 'node:test';import assert from 'node:assert/strict';
import regions from '../runtime/template-localities.json' with {type:'json'};import atlas from '../maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json' with {type:'json'};import registry from '../runtime/templates.json' with {type:'json'};import {resolveMap} from '../runtime/resolve-map.mjs';
test('64 supplementary surfaces retain canonical owners and explicit illustrative provenance',()=>{
 assert.equal(regions.regions.length,64);assert.equal(new Set(regions.regions.map(r=>r.placeId)).size,64);
 for(const r of regions.regions){
  const p=atlas.places.find(p=>p.id===r.placeId);assert.equal(p.scopeId,'template:'+r.templateId);assert.equal(r.precision,'illustrative-local-region');assert.ok(r.evidence);
  assert.ok(registry.templates[r.templateId].targets[r.parentRef]?.length);
  assert.deepEqual(registry.templates[r.templateId].targets[p.templateBinding.atlasRef],['locality-'+r.placeId]);
  const plan=resolveMap({meta:{date:'1992-09-11',time:'16:20',areaName:'Test'},places:[{id:r.placeId,name:r.name,kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:r.placeId}]});assert.equal(plan.templateId,r.templateId);
 }
});
