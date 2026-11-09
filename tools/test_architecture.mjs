import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {variantModel,EXTRA_INFO} from '../runtime/architecture/recipes.mjs';
import {describeWall} from '../elements/architecture/geometry.mjs';
const catalog=JSON.parse(fs.readFileSync(new URL('../elements/architecture/catalog.json',import.meta.url)));
test('catalog points to reusable factories and only approved recipes',async()=>{
 const {createElements}=await import('../elements/architecture/elements.mjs');const kit=createElements({});
 for(const e of catalog.elements)assert.equal(typeof kit[e.export],'function',e.id);
 assert.equal(catalog.recipes.length,10);assert.equal(new Set(catalog.recipes).size,10);assert.equal(catalog.selectionPolicy.implemented,false);
});
test('recipe assemblies are repeatable without shared mutable state',()=>{
 for(const type of ['vertical','ell',...Object.keys(EXTRA_INFO)]){const a=variantModel(type),b=variantModel(type);assert.deepEqual(a,b);a.rooms[0].x=-10000;assert.notEqual(b.rooms[0].x,a.rooms[0].x);assert.ok(b.rooms.every(r=>r.w>0&&r.bottom>r.y));}
});
test('wall ports and footprint track length and thickness in all directions',()=>{
 for(const end of [[100,0],[0,100],[60,80]]){const g=describeWall([0,0],end,16);assert.equal(g.length,100);assert.deepEqual(g.ports.end,end);const a=g.footprint[0],b=g.footprint[3];assert.ok(Math.abs(Math.hypot(a[0]-b[0],a[1]-b[1])-16)<1e-8);}
 assert.throws(()=>describeWall([0,0],[0,0]));assert.throws(()=>describeWall([0,0],[1,1],-1));
});
