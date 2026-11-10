const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:1360,height:900},acceptDownloads:true}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
  const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];if(!rel||rel.includes('..'))return route.abort();
  return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.json')?'application/json':rel.endsWith('.js')?'application/javascript':rel.endsWith('.svg')?'image/svg+xml':'text/html'});
 });
 await page.setContent(fs.readFileSync(process.argv[2]||'/tmp/wzw-test/preview.html','utf8'));await page.waitForFunction(()=>window.WIZAMAP_TEST);
 // Explicit fake MAP_DATA: five rooms, no furnishings arrays, no focus/quest/visibility boilerplate.
 const data=JSON.parse(fs.readFileSync(root+'/tools/fixtures/demo2-map-data.json'));
 await page.evaluate(d=>WIZAMAP_TEST.render(d),data);
 assert.equal(await page.locator('[data-room]').count(),5);assert.equal(await page.locator('.qa-tags .ribbon').count(),5);
 assert.equal(await page.locator('#hintcount').textContent(),'5/5');assert.ok(await page.locator('[data-furnishing]').count()>30);
 const g=await page.evaluate(()=>WIZAMAP_TEST.generatedGeometry);
 assert.equal(g.furnishingInstances.some(i=>i.assetId==='fixture.fireplace-top'),true);
 assert.equal(g.furnishingInstances.some(i=>i.assetId==='object.crate'),true);
 assert.ok(await page.locator('[data-actor-feet]').count()===5);
 await page.screenshot({path:'/tmp/wzw-demo2-five-rooms.png'});
 await page.setViewportSize({width:390,height:700});await page.screenshot({path:'/tmp/wzw-demo2-mobile.png'});
 const loaded=await page.evaluate(()=>WIZAMAP_TEST.data);
 for(const key of ['focus','questPolicy','campaignId'])assert.equal(Object.hasOwn(loaded,key),false);
 assert.equal(Object.hasOwn(loaded.visibility,'visiblePlaceIds'),false);
 const downloadEvent=page.waitForEvent('download');await page.getByRole('button',{name:'Tải HTML',exact:true}).click();
 const download=await downloadEvent;await download.saveAs('/tmp/wzw-demo2-offline.html');
 // Fresh page: no surviving debug hook can make the offline check pass accidentally.
 const offline=await browser.newPage();await offline.context().setOffline(true);
 await offline.setContent(fs.readFileSync('/tmp/wzw-demo2-offline.html','utf8'));
 await offline.waitForSelector('[data-furnishing]');assert.equal(await offline.locator('[data-room]').count(),5);
 assert.equal(await offline.evaluate(()=>typeof window.WIZAMAP_TEST),'undefined');await offline.close();await page.context().setOffline(false);
 const bad=structuredClone(data);bad.places[0].generation.furnishings='wrong';
 const failure=await page.evaluate(async d=>{try{await WIZAMAP_TEST.render(d);return ''}catch(e){return e.message}},bad);
 assert.ok(failure.includes('furnishings'));assert.equal(await page.locator('[data-room]').count(),0);
 await page.evaluate(d=>WIZAMAP_TEST.render(d),data);assert.equal(await page.locator('.qa-error').textContent(),'');
 // Floor-only auto-placement; the technical anchor is never treated as ground.
 const ext=JSON.parse(fs.readFileSync(root+'/tools/fixtures/scene.json'));
 ext.hints=[];ext.view={preferredMode:'template',templateId:'h2'};ext.places[0].atlasRef='main-gate';ext.actors[0].environment='outside';
 await page.evaluate(d=>WIZAMAP_TEST.render(d),ext);
 const feetPoint=await page.locator('[data-actor-feet]').evaluate(n=>{const s=n.ownerSVGElement,m=s.getScreenCTM().inverse().multiply(n.getScreenCTM());return {x:m.e,y:m.f}});
 assert.ok(await page.evaluate(p=>WIZAMAP_TEST.canStand(p),feetPoint));
 assert.deepEqual(errors,[]);console.log('PASS Demo 2: five rooms with omitted furnishings, semantic recipes, 2:1:2 hints, mobile, fresh-page offline, invalid input/recovery, verified floor auto-placement');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
