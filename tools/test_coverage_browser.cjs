// Review bindings against actual SVGs; ground coordinates come from real floor metadata.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),review=JSON.parse(fs.readFileSync(root+'/docs/coverage-review.json'));
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const p=await browser.newPage({viewport:{width:1360,height:900}}),errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
  const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.svg')?'image/svg+xml':rel.endsWith('.json')?'application/json':'text/html'});
 });
 await p.setContent(fs.readFileSync(process.argv[2]||'/tmp/wzw-test/preview.html','utf8'));await p.waitForFunction(()=>window.WIZAMAP_TEST);
 const sample=JSON.parse(fs.readFileSync(root+'/tools/contract-fixture.json'));
 for(const row of review.entries.filter(e=>e.disposition.startsWith('resolved-'))){
  const d=structuredClone(sample),id=row.id;d.places=[{...d.places[0],id,name:row.name,atlasRef:null,generation:null}];d.actors=[{...d.actors[0],placeId:id}];d.hints=[];
  d.focus.actualPlaceId=id;d.view.centerPlaceId=id;d.view.routePlaceIds=[];delete d.view.scopeId;d.visibility.visiblePlaceIds=[id];
  if(row.disposition==='resolved-binding'){
   d.view.preferredMode='template';d.view.templateId=row.templateId;
   if(row.templateId==='h2'){
    // First mount without feet to measure the target, then explicitly choose existing ground.
    d.actors[0].environment='inside';await p.evaluate(d=>WIZAMAP_TEST.render(d),d);
    const point=await p.evaluate(row=>{
     const svg=document.querySelector('#mapmount>svg'),n=svg.querySelector(row.evidence[0].selector),b=n.getBBox(),m=svg.getScreenCTM().inverse().multiply(n.getScreenCTM());
     return {x:new DOMPoint(b.x+b.width/2,b.y+b.height/2).matrixTransform(m).x,y:new DOMPoint(b.x+b.width/2,b.y+b.height/2).matrixTransform(m).y};
    },row);
    const spatial=JSON.parse(fs.readFileSync(root+'/runtime/template-spatial.json')).templates.h2;
    const candidates=spatial.walkableRegions.map(r=>({x:r.points.reduce((s,p)=>s+p.x,0)/r.points.length,y:r.points.reduce((s,p)=>s+p.y,0)/r.points.length}));
    candidates.sort((a,b)=>Math.hypot(a.x-point.x,a.y-point.y)-Math.hypot(b.x-point.x,b.y-point.y));
    d.actors[0].environment='outside';d.actors[0].position=candidates[0];
    assert.ok(Math.hypot(candidates[0].x-point.x,candidates[0].y-point.y)<150,'target lacks nearby safe ground');
   }else{d.actors[0].environment='inside';if(row.atlasRef==='da-homes')d.actors[0].buildingId=row.evidence[0].interactiveId;}
  }else{d.view.preferredMode='generated';d.view.templateId=null;d.places[0].kind='room';}
  await p.evaluate(d=>WIZAMAP_TEST.render(d),d);
  assert.equal(await p.locator('.qa-error').textContent(),'');assert.equal(await p.locator('.qa-tags .ribbon').count(),1);
  if(row.disposition==='resolved-binding')for(const e of row.evidence)assert.equal(await p.locator('#mapmount>svg '+e.selector).count(),1);
  else assert.equal(await p.locator('[data-element-id="bed.single"]').count(),2);
  if(d.actors[0].position)assert.ok(await p.evaluate(pt=>WIZAMAP_TEST.canStand(pt),d.actors[0].position));
  await p.locator('.qa-tags .ribbon').click();assert.equal(await p.locator('#place-title').textContent(),d.actors[0].name);
  console.log('PASS',row.disposition,id,row.name);
 }
 assert.deepEqual(errors,[]);
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
