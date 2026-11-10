import test from 'node:test';
import assert from 'node:assert/strict';
import atlas from '../runtime/atlas-index.json' with {type:'json'};
import {resolveMap} from '../runtime/resolve-map.mjs';
import {buildGeometry} from '../runtime/geometry.mjs';
test('Demo 3: all 44 castle and 27 tower localities generate a full structural scope',()=>{
 const failures=[],groups=atlas.groups.filter(g=>['castle','tower'].includes(g.kind));
 assert.equal(groups.length,71);
 for(const group of groups){
  const id=group.placeIds.find(p=>!atlas.lockedPlaceIds.includes(p)&&!atlas.cccNonRoomPlaceIds.includes(p));
  if(!id)continue;
  const data={
   schemaVersion:'3.1.0',meta:{date:'1992-09-11',time:'16:20',areaName:group.name},
   view:{preferredMode:'generated',scopeId:group.key},
   places:[{id,name:atlas.canonicalNameById[id],kind:atlas.corridorPlaceIds.includes(id)?'corridor':'room'}],
   actors:[{id:'pc',name:'PC',isPC:true,placeId:id}],hints:[],visibility:{}
  };
  try{
   const p=resolveMap(data),g=buildGeometry(p,p.indoor);
   assert.equal(p.scopeId,group.key);assert.equal(p.places.length,group.placeIds.length);
   assert.ok(g.suggestedAnchors[id]?.length);assert.ok(g.floorPolygons.length);
  }catch(e){failures.push(group.key+' '+e.message);}
 }
 assert.deepEqual(failures,[],'locality errors: '+failures.join(' | '));
});
