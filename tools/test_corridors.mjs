import test from 'node:test';import assert from 'node:assert/strict';
import {CORRIDOR_TYPES,corridorGeometry} from '../runtime/corridors.mjs';
test('all seven types expose finite geometry and ports',()=>{
 const expected={straight:2,L:2,T:3,cross:4,U:2,curved:2,loop:4};
 for(const type of CORRIDOR_TYPES){const g=corridorGeometry(type,{x:100,y:200,width:400,height:300});assert.equal(g.ports.length,expected[type]);assert.ok(g.paths.every(d=>!d.includes('NaN')));assert.ok(g.ports.flat().every(Number.isFinite))}
});
test('translation preserves shape and translates every port',()=>{
 for(const type of CORRIDOR_TYPES){const a=corridorGeometry(type,{x:0,y:0,width:400,height:300}),b=corridorGeometry(type,{x:80,y:55,width:400,height:300});assert.deepEqual(b.ports,a.ports.map(([x,y])=>[x+80,y+55]))}
});
test('invalid dimensions are rejected, loops closed and curves explicit',()=>{
 assert.throws(()=>corridorGeometry('L',{x:0,y:0,width:-1,height:30}));assert.throws(()=>corridorGeometry('unknown',{x:0,y:0,width:20,height:30}));assert.ok(corridorGeometry('loop',{x:0,y:0,width:400,height:300}).paths[0].endsWith('Z'));assert.ok(corridorGeometry('curved',{x:0,y:0,width:400,height:300}).paths[0].includes('C'));
});
