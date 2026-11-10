const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:1360,height:900},acceptDownloads:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',r=>{const rel=r.request().url().split(/@[a-f0-9]{40}\//)[1];return r.fulfill({headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.svg')?'image/svg+xml':rel.endsWith('.json')?'application/json':'text/html'});});
 await page.setContent(fs.readFileSync(process.argv[2],'utf8'));await page.waitForFunction(()=>window.WIZAMAP_TEST);
 const make=(id,name)=>({schemaVersion:'3.2.0',meta:{date:'1992-09-11',time:'16:20',areaName:'Test'},places:[{id,name,kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:id}]});
 const room=make('local-material','Phòng thử');room.places[0].generation={function:'study',wallMaterial:'brick',floorMaterial:'wood',floorColor:'#DDBB99',wallColor:'#BB9977',materialScale:1.5};
 await page.evaluate(d=>WIZAMAP_TEST.render(d),room);assert.equal(await page.locator('pattern[id^="mat-floor-"] rect').first().getAttribute('fill'),'#DDBB99');assert.equal(await page.locator('pattern[id^="mat-wall-"] rect').first().getAttribute('fill'),'#BB9977');assert.ok(await page.locator('[data-indoor-walls] [fill="url(#mat-wall-0)"]').count());
 await page.screenshot({path:'/tmp/wzw-new-materials.png'});
 const layers=await page.evaluate(()=>{const f=document.querySelector('[data-furnishings]'),feet=document.querySelector('[data-actor-feet]');return Boolean(f.compareDocumentPosition(feet)&Node.DOCUMENT_POSITION_FOLLOWING)});assert.ok(layers,'footsteps paint above furniture');
 const forest=make('P-4f6ef384d93fb3','Rừng Dean');await page.evaluate(d=>WIZAMAP_TEST.render(d),forest);assert.equal(await page.locator('[data-room]').count(),0);assert.ok(await page.locator('[data-element-id^="tree."]').count());assert.ok(await page.locator('[data-exterior-path]').count());
 await page.screenshot({path:'/tmp/wzw-new-outdoor.png'});
 // Same public actor is shown on the building wall, with no invented ground footprint.
 const ext=make('local-hagrid','Nhà thử');ext.places[0].atlasRef='hagrid';ext.view={templateId:'h1'};ext.actors[0].environment='inside';await page.evaluate(d=>WIZAMAP_TEST.render(d),ext);assert.equal(await page.locator('[data-label-surface="wall"]').count(),1);assert.equal(await page.locator('[data-actor-feet]').count(),0);
 // Pick actual walkable artwork ground lying behind any approved building.
 const probe=await page.evaluate(()=>{const s=document.querySelector('#mapmount>svg');for(const node of s.querySelectorAll('[data-id]')){const b=node.getBBox(),m=s.getScreenCTM().inverse().multiply(node.getScreenCTM());for(let iy=1;iy<9;iy++)for(let ix=1;ix<9;ix++){const p=new DOMPoint(b.x+b.width*ix/10,b.y+b.height*iy/10).matrixTransform(m);if(WIZAMAP_TEST.canStand(p))return {x:p.x,y:p.y};}}return null;});
 // Supply one precise occlusion region over verified ground to make the interaction deterministic.
 assert.ok(probe);ext.actors[0].environment='outside';ext.actors[0].position=probe;
 const spatial=JSON.parse(fs.readFileSync(root+'/runtime/template-spatial.json')).templates.h1;
 ext.view.spatial={walkableRegions:spatial.walkableRegions,blockedRegions:spatial.blockedRegions,occlusionRegions:[{id:'test-cover',targetId:'hagrid',points:[{x:probe.x-2,y:probe.y-2},{x:probe.x+2,y:probe.y-2},{x:probe.x+2,y:probe.y+2},{x:probe.x-2,y:probe.y+2}]}]};
 await page.evaluate(d=>WIZAMAP_TEST.render(d),ext);const marker=page.locator('[data-occlusion-target="test-cover"]');assert.equal(await marker.count(),1);const house=page.locator('[data-id="region:extra:5"]');
 await marker.dispatchEvent('mouseenter');assert.equal(await house.evaluate(n=>n.style.opacity),'0.3');assert.ok(await page.locator('.qa-tags .ribbon').isVisible());await marker.click();await marker.dispatchEvent('mouseleave');assert.equal(await house.evaluate(n=>n.style.opacity),'0.3');await page.screenshot({path:'/tmp/wzw-new-occlusion.png'});await marker.click();await marker.dispatchEvent('mouseleave');assert.notEqual(await house.evaluate(n=>n.style.opacity),'0.3');
 await page.evaluate(d=>WIZAMAP_TEST.render(d),room);assert.equal(await page.locator('.occlusion-marker').count(),0);
 const probes={'hall':'great-hall','express':'standard-coach','gryffindor-common':'gryffindor-common-room','ravenclaw-common':'ravenclaw-common-room','hufflepuff-common':'hufflepuff-common-room','slytherin-common':'slytherin-common-room','pitch-static':'quidditch-pitch','ministry-8-10':'ministry-time'};
 for(const [templateId,atlasRef] of Object.entries(probes)){
  const d=make('template-probe','Địa điểm kiểm thử');d.places[0].atlasRef=atlasRef;d.view={templateId,preferredMode:'template'};d.actors[0].environment='inside';
  await page.evaluate(d=>WIZAMAP_TEST.render(d),d);assert.equal(await page.locator('.qa-error').textContent(),'');assert.equal(await page.locator('[data-actor-feet]').count(),1,templateId+' must place actor on a real floor');
 }
 assert.deepEqual(errors,[]);
 console.log('PASS new design: configurable wall/floor patterns, correct layers, canonical outdoor assets, wall labels, roof indicator hover/tap 30% opacity and rerender cleanup');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
