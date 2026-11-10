import test from 'node:test';import assert from 'node:assert/strict';
import {pointInPolygon,pointInFog,surfaceAllowed,fitSceneBounds,selectOccluder,EXTERIOR_OCCLUDERS} from '../runtime/spatial.mjs';
const region=(id,x=0,y=0,w=100,h=100)=>({id,points:[{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}]});
test('polygon contains boundary, not the exterior',()=>{const p=region('r').points;assert.equal(pointInPolygon({x:0,y:40},p),true);assert.equal(pointInPolygon({x:101,y:50},p),false)});
test('ground requires explicit walkable geometry and rejects obstacles',()=>{const s={walkableRegions:[region('path')],blockedRegions:[region('roof',40,40,20,20)]};assert.equal(surfaceAllowed({x:8,y:9},s),true);assert.equal(surfaceAllowed({x:50,y:50},s),false);assert.equal(surfaceAllowed({x:8,y:9},null),false)});
test('fog blocks only chosen polygons',()=>{const visibility={fogRegionIds:['hidden'],fogRegions:[region('hidden'),region('inactive',200,200)]};assert.equal(pointInFog({x:5,y:5},visibility),true);assert.equal(pointInFog({x:220,y:220},visibility),false)});
test('crop includes separated places without fixed PC radius and respects viewport aspect',()=>{const b=fitSceneBounds([0,0,1000,1000],[{x:10,y:20},{x:900,y:800}],{width:800,height:400});assert.ok(b[0]<=10&&b[1]<=20);assert.ok(b[0]+b[2]>=900&&b[1]+b[3]>=800);assert.equal(b[2]/b[3],2)});
test('occlusion is conditional and chooses last verified artwork, never an arbitrary bbox',()=>{const p={x:2,y:3},items=[{id:'a',contains:()=>true},{id:'b',contains:()=>false},{id:'c',contains:()=>true}];assert.equal(selectOccluder(p,items).id,'c');assert.equal(selectOccluder(p,[]),null)});
test('occluder catalog has no duplicate semantic bindings',()=>{for(const names of Object.values(EXTERIOR_OCCLUDERS))assert.equal(new Set(names).size,names.length)});

import {validateMapData} from '../runtime/map-data.mjs';
import fs from 'node:fs';
test('MAP_DATA optional spatial geometry and explicit blocked polygon validate',()=>{
 const d=JSON.parse(fs.readFileSync(new URL('contract-fixture.json',import.meta.url)));
 d.view.spatial={walkableRegions:[region('ground')],blockedRegions:[region('roof',40,40,20,20)],occlusionRegions:[{...region('behind-house'),targetId:'hagrid'}]};
 assert.equal(validateMapData(d).ok,true);
 d.view.spatial.walkableRegions.push(region('ground'));assert.equal(validateMapData(d).ok,false);
});

test('occlusion may pin one exact artwork ID without guessing from grouped bindings',()=>{
 const d=JSON.parse(fs.readFileSync(new URL('contract-fixture.json',import.meta.url)));
 d.view.spatial={walkableRegions:[region('ground')],blockedRegions:[],occlusionRegions:[{...region('roof'),targetId:'hogsmeade-homes',interactiveId:'v-home-6'}]};
 assert.equal(validateMapData(d).ok,true);
 d.view.spatial.occlusionRegions[0].interactiveId='';
 assert.equal(validateMapData(d).ok,false);
});

import {actorGroundPoint,occlusionController} from '../runtime/spatial.mjs';
test('explicit actor position wins over building label anchor',()=>{
 const position={x:10,y:20};assert.equal(actorGroundPoint({position},{x:800,y:900}),position);
});
test('overlapping covers retain selection and restore original opacity',()=>{
 const target=initial=>({style:{value:initial,getPropertyValue(){return this.value},getPropertyPriority(){return 'important'},setProperty(k,v,p){this.value=v;this.priority=p},removeProperty(){this.value=''}}});
 const a=target('.5'),b=target('');const covers=occlusionController([{target:a,contains:p=>p.x>0},{target:b,contains:p=>p.y>0}]);
 covers.set('selected',{x:1,y:1});assert.equal(a.style.value,'0.5');assert.equal(b.style.value,'0.5');
 covers.set('hover',{x:1,y:0});covers.clear('selected');assert.equal(a.style.value,'0.5');assert.equal(b.style.value,'');
 covers.clear('hover');assert.equal(a.style.value,'.5');assert.equal(a.style.priority,'important');
 covers.dispose();
});

import crypto from 'node:crypto';
const surfaces=JSON.parse(fs.readFileSync(new URL('../runtime/template-spatial.json',import.meta.url)));
test('default ground registry matches current artwork and contains usable finite polygons',()=>{
 const source=fs.readFileSync(new URL('../index.html',import.meta.url));assert.equal(surfaces.sourceSha256,crypto.createHash('sha256').update(source).digest('hex'));
 assert.deepEqual(Object.keys(surfaces.templates).sort(),['diagon-knockturn','h1','h2','village-static']);
 for(const [id,s] of Object.entries(surfaces.templates)){
  assert.ok(s.sourceGroundShapes>0&&s.walkableRegions.length>0,id);
  const ids=new Set();for(const r of s.walkableRegions){assert.ok(!ids.has(r.id));ids.add(r.id);assert.equal(r.points.length,4);assert.ok(r.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)));const [a,c]=[r.points[0],r.points[2]];assert.ok(surfaceAllowed({x:(a.x+c.x)/2,y:(a.y+c.y)/2},s));}
 }
});
