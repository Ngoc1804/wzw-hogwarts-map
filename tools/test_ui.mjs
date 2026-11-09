import test from 'node:test';
import assert from 'node:assert/strict';
import {tagType,feetState} from '../ui/components.mjs';
test('prefect patrol overrides identity only on duty',()=>{
 assert.equal(tagType({role:'prefect',onPatrol:true,tagType:'gryffindor'}),'patrol');
 assert.equal(tagType({role:'prefect',onPatrol:false,tagType:'gryffindor'}),'gryffindor');
 assert.equal(tagType({tagType:'patrol'}),'unknown');
 assert.equal(tagType({entityType:'group'}),'crowd');
});
test('walk has six single steps and a two-second hidden interval',()=>{
 for(let step=0;step<6;step++)assert.deepEqual(feetState(step*550,'walk'),Array.from({length:6},(_,i)=>i===step?1:0));
 for(const t of [3300,4000,5299])assert.deepEqual(feetState(t,'walk'),[0,0,0,0,0,0]);
});
test('idle and reduced alternate opacity with stable two-foot geometry',()=>{
 const a=feetState(1600,'idle'),b=feetState(4800,'idle');
 assert.ok(a[0]>a[1]&&b[0]<b[1]);
 assert.deepEqual(feetState(1600,'walk',true),a);
});
