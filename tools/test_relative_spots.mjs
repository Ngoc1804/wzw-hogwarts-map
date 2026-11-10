import test from 'node:test';
import assert from 'node:assert/strict';
import {assertMapData,validateMapData} from '../runtime/map-data.mjs';
import {resolveMap} from '../runtime/resolve-map.mjs';
import {buildGeometry,indoorActorPoint} from '../runtime/geometry.mjs';
import atlas from '../runtime/atlas-index.json' with {type:'json'};

const base=()=>({
 schemaVersion:'3.2.0',
 meta:{date:'1992-09-14',time:'16:20',areaName:'Hành lang hầm Độc dược'},
 view:{preferredMode:'auto',spotType:'corridor',nearPlace:'Phòng học Độc dược'},
 places:[{id:'hành lang trước phòng học',name:'Hành lang trước Phòng học Độc dược',kind:'corridor',inspector:{overhear:'Draco nói chuyện.',observation:'Đuốc cháy trong hành lang.'}}],
 actors:[{id:'pc',name:'Jude',isPC:true,placeId:'hành lang trước phòng học'}, {id:'draco_malfoy',name:'Draco',placeId:'hành lang trước phòng học'}],
 hints:[{id:'hint_potions',placeId:'hành lang trước phòng học',type:'life',title:'Tin mới'}],
 visibility:{revealedPlaceIds:['Kho nguyên liệu Độc dược']}
});
test('RP corridor: flexible Vietnamese ID, underscore NPC and hints normalize before validation',()=>{
 const d=base(),n=assertMapData(d);
 assert.equal(validateMapData(d).ok,true);
 assert.match(n.actors[0].placeId,/^rp-/);
 assert.equal(n.actors[0].placeId,n.places[0].id);
 assert.equal(n.hints[0].placeId,n.places[0].id);
 assert.equal(n.visibility.revealedPlaceIds[0],'HOG-HMNGC-N-03');
 assert.equal(n.view.nearPlace,'HOG-HMNGC-N-01');
 const plan=resolveMap(d),g=buildGeometry(plan,plan.indoor);
 assert.equal(plan.scopeId,'hogwarts/f1/0');
 assert.equal(plan.places.length,6);
 assert.equal(plan.places.filter(p=>p.kind!=='corridor').length,5);
 assert.equal(plan.spot.placeId,n.places[0].id);
 assert.ok(g.suggestedAnchors[plan.spot.placeId].length);
 assert.ok(indoorActorPoint(g,plan.spot.placeId));
});
test('RP corridor: scope may be supplied instead of a nearby Atlas room',()=>{
 const d=base();d.view={scopeId:'hogwarts/f1/0',spotType:'adhoc'};
 assert.equal(resolveMap(d).scopeId,'hogwarts/f1/0');
});
test('RP corridor: ambiguous scope never jumps across floors or unlocks AU',()=>{
 const d=base();delete d.view.nearPlace;
 assert.throws(()=>resolveMap(d),/Cannot verify corridor scope/);
 d.view.scopeId='au/0/0';
 assert.throws(()=>resolveMap(d),/AU map locked/);
});
test('Names can resolve from verified canonical Vietnamese and English public labels',()=>{
 const d=base();d.view={preferredMode:'auto'};
 d.places=[{id:'Potions Classroom',name:'Phòng học Độc dược & Hành lang hầm',kind:'room'}];
 d.actors=[{id:'pc',name:'Jude',isPC:true,placeId:'Potions Classroom'}];
 d.hints=[];d.visibility={};
 const normalized=assertMapData(d);assert.equal(normalized.places[0].id,'HOG-HMNGC-N-01');
 assert.equal(resolveMap(d).scopeId,'hogwarts/f1/0');
});
test('Canon lock and existing scopes still enforce policy',()=>{
 const locked=atlas.lockedPlaceIds[0];assert.ok(locked);
 const d=base();d.view={spotType:'inside_room'};
 d.places=[{id:locked,name:atlas.canonicalNameById[locked],kind:'room'}];
 d.actors=[{id:'pc',name:'Jude',isPC:true,placeId:locked}];d.hints=[];d.visibility={};
 assert.equal(validateMapData(d).ok,false);
});
