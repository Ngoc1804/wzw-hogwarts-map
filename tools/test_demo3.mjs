import test from 'node:test';
import assert from 'node:assert/strict';
import {assertMapData,validateMapData} from '../runtime/map-data.mjs';
import {resolveMap} from '../runtime/resolve-map.mjs';
import {buildGeometry} from '../runtime/geometry.mjs';

const base=()=>({
 schemaVersion:'3.1.0',
 meta:{date:'1992-09-11',time:'16:20',areaName:'Hầm ngục',quote:'Hành lang hôm nay có vẻ thích giữ bí mật.'},
 places:[{id:'HOG-HMNGC-N-01',name:'Phòng học Độc dược',kind:'room',generation:{function:'potions'},inspector:{overhear:'Có tiếng khuấy vạc.',observation:'Không khí âm ẩm, mùi thảo dược phủ kín những bàn đá.'}}],
 actors:[{id:'pc',name:'PC',isPC:true,placeId:'HOG-HMNGC-N-01',stance:'idle'}],
 hints:[],visibility:{}
});
test('Demo 3: one known PC location expands to the correct five-room, single-direction Atlas scope',()=>{
 const d=base(),r=resolveMap(d);
 assert.equal(r.mode,'generated');assert.equal(r.sceneType,'atlas');assert.equal(r.scopeId,'hogwarts/f1/0');
 assert.deepEqual(r.places.map(x=>x.id),['HOG-HMNGC-N-01','HOG-HMNGC-N-02','HOG-HMNGC-N-03','HOG-HMNGC-N-04','HOG-HMNGC-N-05']);
 assert.equal(r.places[1].name,'Chưa khám phá');
 const g=buildGeometry(r,r.indoor);
 assert.equal(g.model.rooms.length,5);assert.ok(g.furnishingInstances.length>10);
 assert.ok(g.suggestedAnchors['HOG-HMNGC-N-01'].length);
});
test('Demo 3: an explicit public room description survives while other Atlas rooms remain unlabelled',()=>{
 const d=base();d.places.push({id:'HOG-HMNGC-N-02',name:'Văn phòng Snape',kind:'room',inspector:{observation:'Bàn gỗ tối màu.'}});
 d.actors.push({id:'snape',name:'Snape',placeId:'HOG-HMNGC-N-02',activity:'Đang chấm bài.',priority:90});
 const plan=resolveMap(d);
 assert.equal(plan.places[1].name,'Văn phòng Snape');assert.equal(plan.places[2].name,'Chưa khám phá');
 assert.equal(validateMapData(d).ok,true);
});
test('Demo 3: user-created AU scene has an outdoor parcel and existing floor layout',()=>{
 const d={schemaVersion:'3.1.0',meta:{date:'1992-09-11',time:'16:30',areaName:'Quán trọ tự tạo'},
  customScene:{id:'au-user-inn',name:'Quán trọ Rừng Sương',source:'user-created',kind:'building',description:'Quán trọ nhỏ giữa rừng, có sân trước',terrain:'forest',surroundings:'Con đường mòn cạnh những tán cây.'},
  places:[{id:'inn-main',name:'Sảnh quán',kind:'room',generation:{function:'pub'},inspector:{observation:'Lò sưởi cháy ấm.'}}],
  actors:[{id:'pc',name:'PC',isPC:true,placeId:'inn-main'}],hints:[],visibility:{}};
 assert.equal(validateMapData(d).ok,true);
 const plan=resolveMap(d);assert.equal(plan.sceneType,'custom');assert.equal(plan.mode,'generated');
 const g=buildGeometry(plan,plan.indoor);assert.ok(g.exterior);assert.ok(g.model.floors.length);
 assert.equal(g.model.rooms.length,1);assert.ok(g.bounds[2]>g.model.rooms[0].w+100);
});
test('Demo 3: unknown AU outside Atlas must supply a short description, locked Atlas never becomes custom',()=>{
 const d=base();d.places=[{id:'new-forest',name:'Rừng do người chơi tạo',kind:'grounds'}];d.actors[0].placeId='new-forest';
 assert.throws(()=>resolveMap(d),/customScene/);
 d.customScene={id:'au-wood',name:'Rừng mới',kind:'outdoor',source:'user-created',description:'Lối mòn nhỏ dưới tán cây'};
 assert.equal(validateMapData(d).ok,true);
 const plan=resolveMap(d),g=buildGeometry(plan,plan.indoor);
 assert.equal(plan.sceneType,'custom');assert.ok(g.exterior);assert.ok(g.safeAreas['new-forest'].length);
 const other=base();other.customScene=d.customScene;
 assert.equal(validateMapData(other).ok,false);
});
test('Demo 3: 15 public NPC records and events are valid, label restriction is in renderer',()=>{
 const d=base();d.actors.push(...Array.from({length:15},(_,i)=>({id:'npc-'+i,name:'NPC '+i,placeId:'HOG-HMNGC-N-01',priority:i})));
 d.hints=[{id:'ev1',placeId:'HOG-HMNGC-N-01',type:'event',title:'Tiếng động cạnh tủ',description:'Tiếng đồ vật rơi.'}];
 assert.equal(validateMapData(d).ok,true);
 assert.equal(assertMapData(d).hints[0].type,'event');
});

test('standalone local room resolves without an indoor override and geometry honors the resolved plan',()=>{
 const d={meta:{date:'1992-09-11',time:'16:30',areaName:'Phòng nhỏ'},places:[{id:'local-test',name:'Phòng nhỏ',kind:'room',generation:{function:'bedroom'}}],actors:[{id:'pc',name:'PC',isPC:true,placeId:'local-test'}]};
 const before=structuredClone(d),plan=resolveMap(d),g=buildGeometry(plan);
 assert.equal(g.model.rooms.length,1);assert.deepEqual(d,before);
 const explicit=resolveMap({...d,view:{indoor:{layout:'ell'}}});
 assert.equal(buildGeometry(explicit).model.recipe,'ell');
});
test('tower corridor keeps every supplied room instead of turning one into a narrow staircase',()=>{
 const d=base();d.places=Array.from({length:5},(_,i)=>({id:'tower-room-'+i,name:'Phòng '+i,kind:'room',generation:{function:i===4?'storage':'study'}}));d.actors[0].placeId=d.places[0].id;d.view={indoor:{layout:'tower',roomWidth:260,roomDepth:240,corridorWidth:135}};
 const plan=resolveMap(d),g=buildGeometry(plan);
 assert.equal(g.model.recipe,'tower');assert.deepEqual(g.model.rooms.map(r=>r.id),d.places.map(p=>p.id));
 assert.ok(g.model.rooms.every(r=>r.kind!=='stairs'));
 for(const p of d.places){assert.ok(g.suggestedAnchors[p.id]?.length);assert.ok(g.furnishingInstances.some(i=>i.placeId===p.id));}
});
