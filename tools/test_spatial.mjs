import test from 'node:test';import assert from 'node:assert/strict';
import {pointInPolygon,pointInFog,surfaceAllowed,fitSceneBounds,selectOccluder,EXTERIOR_OCCLUDERS} from '../runtime/spatial.mjs';
const region=(id,x=0,y=0,w=100,h=100)=>({id,points:[{x,y},{x:x+w,y},{x:x+w,y:y+h},{x,y:y+h}]});
test('polygon contains boundary, not the exterior',()=>{const p=region('r').points;assert.equal(pointInPolygon({x:0,y:40},p),true);assert.equal(pointInPolygon({x:101,y:50},p),false)});
test('ground requires explicit walkable geometry and rejects obstacles',()=>{const s={walkableRegions:[region('path')],blockedRegions:[region('roof',40,40,20,20)]};assert.equal(surfaceAllowed({x:8,y:9},s),true);assert.equal(surfaceAllowed({x:50,y:50},s),false);assert.equal(surfaceAllowed({x:8,y:9},null),false)});
test('fog blocks only chosen polygons',()=>{const visibility={fogRegionIds:['hidden'],fogRegions:[region('hidden'),region('inactive',200,200)]};assert.equal(pointInFog({x:5,y:5},visibility),true);assert.equal(pointInFog({x:220,y:220},visibility),false)});
test('crop includes separated places without fixed PC radius and respects viewport aspect',()=>{const b=fitSceneBounds([0,0,1000,1000],[{x:10,y:20},{x:900,y:800}],{width:800,height:400});assert.ok(b[0]<=10&&b[1]<=20);assert.ok(b[0]+b[2]>=900&&b[1]+b[3]>=800);assert.equal(b[2]/b[3],2)});
test('occlusion is conditional and chooses last verified artwork, never an arbitrary bbox',()=>{const p={x:2,y:3},items=[{id:'a',contains:()=>true},{id:'b',contains:()=>false},{id:'c',contains:()=>true}];assert.equal(selectOccluder(p,items).id,'c');assert.equal(selectOccluder(p,[]),null)});
test('occluder catalog has no duplicate semantic bindings',()=>{for(const names of Object.values(EXTERIOR_OCCLUDERS))assert.equal(new Set(names).size,names.length)});
