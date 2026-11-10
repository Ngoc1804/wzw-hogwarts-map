import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {roomRecipe} from '../runtime/furnishings.mjs';
import {buildGeometry,indoorActorPoint} from '../runtime/geometry.mjs';
import {polygonsOverlap,polygonFits} from '../runtime/furnishings.mjs';
import {validateMapData} from '../runtime/map-data.mjs';
const source=()=>JSON.parse(fs.readFileSync(new URL('fixtures/scene.json',import.meta.url)));
const plan=(fn,shape='rectangle',furnishings=[],extra={})=>({mode:'generated',places:[{id:'room',name:fn,kind:'room',generation:{function:fn,shape,furnishings,...extra}}],connections:[]});
test('complete default room recipes fit every supported shape, with decor and free floor',()=>{
 for(const fn of ['residential','potions','library','classroom','kitchen','bathroom','hospital','commerce','pub','storage','common','study','office','store','practice','group'])for(const shape of ['rectangle','L','U','T','cross','round']){
  const g=buildGeometry(plan(fn,shape));assert.ok(g.furnishingInstances.length>=3,fn+' '+shape);
  for(const i of g.furnishingInstances){assert.ok(polygonFits(i.poly,g.rooms.room.poly));if(i.blocking&&!i.on)assert.throws(()=>indoorActorPoint(g,'room',{x:i.x,y:i.y}),/outside verified/);}
  assert.ok(indoorActorPoint(g,'room'));
 }
});
test('custom vector furniture, exact requested quantities, size, color and rotation survive placement',()=>{
 const custom={width:100,height:100,shapes:[{type:'ellipse',x:0,y:0,rx:40,ry:40,fill:'#AB2345'}]};
 const g=buildGeometry(plan('study','round',[{id:'magic',role:'Hộp nhạc',count:2,width:25,depth:30,color:'#FF5533',rotation:45,custom}]));
 assert.equal(g.furnishingInstances.length,2);for(const i of g.furnishingInstances){assert.equal(i.width,25);assert.equal(i.rotation,45);assert.equal(i.color,'#FF5533');assert.deepEqual(i.custom,custom)}
});
test('furniture respects door reserves and rotated geometry without overlaps',()=>{
 const g=buildGeometry(plan('study','L',[{role:'chair',count:8,width:22,depth:22,rotation:30,placement:'rows'}]));
 const all=g.furnishingInstances;for(let i=0;i<all.length;i++)for(let j=0;j<i;j++)assert.equal(polygonsOverlap(all[i].poly,all[j].poly),false);
 for(const i of all)for(const e of g.exclusionZones.filter(z=>z.kind==='door'))assert.equal(polygonsOverlap(i.poly,e.points.map(p=>[p.x,p.y])),false);
});
test('small decor is placed on real support surfaces, bad/missing support fails explicitly',()=>{
 const g=buildGeometry(plan('study','rectangle',[{id:'desk',role:'desk',count:1,width:90,depth:60},{role:'book',count:3,width:10,depth:10,on:'desk'}]));
 assert.equal(g.furnishingInstances.filter(i=>i.on==='desk').length,3);
 assert.throws(()=>buildGeometry(plan('study','rectangle',[{role:'book',count:1,on:'none'}])),/Missing support/);
 assert.throws(()=>buildGeometry(plan('study','rectangle',[{role:'unknown-prop',count:1}])),/Missing asset/);
 assert.throws(()=>buildGeometry(plan('study','rectangle',[{role:'bed',count:50,width:200,depth:200}])),/Không đủ chỗ/);
});
test('MAP_DATA validates custom shapes and rejects active markup and missing primitive coordinates',()=>{
 const d=source();d.places[0].generation={function:'study',shape:'rectangle',furnishings:[{role:'magic',count:1,custom:{width:100,height:100,shapes:[{type:'path',d:'M0 0L100 0L50 100Z',fill:'#FF0000'}]}}]};
 assert.equal(validateMapData(d).ok,true);d.places[0].generation.furnishings[0].custom.shapes[0].d='<script>';
 assert.equal(validateMapData(d).ok,false);
 d.places[0].generation.furnishings[0].custom.shapes=[{type:'rect',fill:'#FF0000'}];assert.equal(validateMapData(d).ok,false);
});
test('explicit empty replacement is possible and floors accept exact points between former grid cells',()=>{
 const g=buildGeometry(plan('study','rectangle',[],{furnishingsMode:'replace',floorMaterial:'wood'}));
 assert.equal(g.furnishingInstances.length,0);
 const room=g.rooms.room,p={x:room.x+91.2,y:room.y+90.6};assert.deepEqual(indoorActorPoint(g,'room',p),p);
});

test('add mode overrides default IDs and count zero removes requested decor',()=>{
 const g=buildGeometry(plan('study','rectangle',[{id:'lamp',role:'lamp',count:0},{id:'desk',role:'desk',count:1,width:70,depth:40,color:'#55AA88'}],{furnishingsMode:'add'}));
 assert.equal(g.furnishingInstances.some(i=>i.id==='lamp'),false);const desks=g.furnishingInstances.filter(i=>i.id==='desk');assert.equal(desks.length,1);assert.equal(desks[0].color,'#55AA88');
});

test('healing function uses treatment beds instead of generic office defaults',()=>{
 const requests=roomRecipe({generation:{function:'healing'}});
 assert.ok(requests.some(item=>item.assetId==='bed.single'&&item.count===2));
 assert.ok(!requests.some(item=>item.assetId==='table.desk'));
});
