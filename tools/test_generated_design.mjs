import test from 'node:test';import assert from 'node:assert/strict';
import {resolveMap} from '../runtime/resolve-map.mjs';import {buildGeometry} from '../runtime/geometry.mjs';import {pointInPolygon} from '../runtime/spatial.mjs';
import {materialPattern} from '../runtime/architecture/materials.mjs';import {validateMapData} from '../runtime/map-data.mjs';
import {auditCoverage} from './audit_coverage.mjs';
const data=id=>({meta:{date:'1992-09-11',time:'16:20',areaName:'Test'},places:[{id,name:'Địa điểm công khai',kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:id}]});
test('all approved generated places build; pending template geometry remains explicit',()=>{
 const report=auditCoverage();assert.equal(report.total,694);assert.equal(report.counts['generation-error']||0,0);
 assert.ok(report.counts['generated-exterior']>20);assert.equal(report.counts['excluded-cutaway'],29);
 assert.equal(Object.values(report.counts).reduce((a,b)=>a+b,0),report.total);
});
test('wood, brick and stone are lightweight configurable patterns with safe color/scale validation',()=>{
 for(const material of ['wood','brick','stone']){const svg=materialPattern('mat-test',material,'#AABBCC','#102030',1.5);assert.ok(svg.includes('#AABBCC')&&svg.includes('#102030')&&svg.includes('scale(1.5)'));}
 assert.throws(()=>materialPattern('mat-test','wood','red\" onload=\"alert(1)'));assert.throws(()=>materialPattern('mat-test','wood',undefined,undefined,20));
 const d=data('room-test');d.places[0].generation={function:'study',floorMaterial:'brick',wallMaterial:'wood',floorColor:'#AABBCC',wallColor:'#BB9977',materialScale:1.5,materialStroke:'#665544'};
 assert.equal(validateMapData(d).ok,true);const g=buildGeometry(resolveMap(d));assert.equal(g.rooms['room-test'].wallMaterial,'wood');
});
test('one indoor engine handles forty supplied rooms without dropping their IDs',()=>{
 const d=data('r0');d.places=Array.from({length:40},(_,i)=>({id:'r'+i,name:'Phòng '+i,kind:'room',generation:{function:'study'}}));
 const g=buildGeometry(resolveMap(d));assert.equal(g.model.rooms.length,40);for(const p of d.places)assert.ok(g.suggestedAnchors[p.id]?.length);
});
test('canonical forest uses outdoor assets and actual safe ground rather than a room rectangle',()=>{
 const d=data('P-4f6ef384d93fb3');d.places[0].name='Rừng Dean';const plan=resolveMap(d),g=buildGeometry(plan);
 assert.ok(g.exterior);assert.equal(g.model.rooms.length,0);assert.ok(g.furnishingInstances.some(i=>i.assetId.startsWith('tree.')));
 for(const point of g.suggestedAnchors[d.places[0].id])assert.ok(g.exclusionZones.every(r=>!pointInPolygon(point,r.points)));
});

test('chairs and sofas do not require actor exclusion polygons; tables remain obstacles',()=>{
 const d=data('room-seats');d.places[0].generation={function:'office'};const g=buildGeometry(resolveMap(d));
 const seat=g.furnishingInstances.find(i=>i.assetId?.startsWith('seat.')),desk=g.furnishingInstances.find(i=>i.assetId==='table.desk');
 assert.ok(seat&&desk);assert.ok(!g.exclusionZones.some(z=>z.id.endsWith(seat.instanceId)));assert.ok(g.exclusionZones.some(z=>z.id.endsWith(desk.instanceId)));
});
