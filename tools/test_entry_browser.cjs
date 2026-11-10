// Production entry, compact contract, error lifecycle and debug boundary.
const {chromium}=require('playwright'),fs=require('fs'),assert=require('node:assert/strict');
const root=require('path').resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
  const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];
  return route.fulfill({body:fs.readFileSync(root+'/'+rel),contentType:rel.endsWith('.json')?'application/json':'image/svg+xml'});
 });
 const bundle=fs.readFileSync(process.argv[2]||'/tmp/wzw-test/bundle.js','utf8');
 const source=JSON.parse(fs.readFileSync(root+'/tools/contract-fixture.json'));
 const d=structuredClone(source);for(const k of ['campaignId','worldId','snapshotId','atlasVersion','view','connections','questPolicy'])delete d[k];
 d.hints=[];delete d.focus.selectedId;delete d.meta.quote;delete d.visibility.fogRegionIds;
 d.places[0].generation={function:'study',shape:'rectangle',furnishings:[]};delete d.places[0].atlasRef;
 const html=(input,debug=false,windowEntry=false)=>'<!doctype html><html><head><meta charset="utf-8"></head><body>'+
 (windowEntry?'<script>window.MAP_DATA='+JSON.stringify(input).replace(/</g,'\\u003c')+'</script>':'<script type="application/json" id="MAP_DATA">'+(typeof input==='string'?input:JSON.stringify(input).replace(/</g,'\\u003c'))+'</script>')+
 '<script'+(debug?' data-debug="true"':'')+'>'+bundle.replace(/<\/script/gi,'<\\/script')+'</script></body></html>';
 for(const windowEntry of [false,true]){
  await page.setContent(html(d,false,windowEntry));await page.waitForSelector('.qa-tags .ribbon');
  assert.equal(await page.locator('textarea,select').count(),0);
  assert.equal(await page.getByRole('button',{name:'MAP_DATA',exact:true}).count(),0);
  assert.equal(await page.evaluate(()=>typeof window.WIZAMAP_TEST),'undefined');
  assert.equal(await page.locator('#actor-action').textContent(),d.actors[0].activity);
  const before=await page.locator('#mapmount>svg').getAttribute('viewBox');
  await page.getByRole('button',{name:'+',exact:true}).click();await page.getByRole('button',{name:'Vừa khung',exact:true}).click();
  assert.equal(await page.locator('#mapmount>svg').getAttribute('viewBox'),before);
 }
 await page.setContent(html('{bad json'));await page.waitForFunction(()=>document.querySelector('.qa-error')?.textContent.includes('MAP_DATA JSON'));
 assert.equal(await page.locator('#mapmount>svg').count(),0);
 await page.setContent(html(d,true));await page.waitForFunction(()=>window.WIZAMAP_TEST);
 const bad=structuredClone(d);bad.actors[0].placeId='missing';
 assert.ok(await page.evaluate(async d=>{try{await WIZAMAP_TEST.render(d);return false}catch{return true}},bad));
 assert.equal(await page.locator('#mapmount>svg').count(),0);assert.equal(await page.locator('#actors').textContent(),'');
 await page.evaluate(d=>WIZAMAP_TEST.render(d),d);assert.equal(await page.locator('.qa-error').textContent(),'');
 const hidden=structuredClone(source);hidden.places.push({...hidden.places[0],id:'public-but-not-displayed'});
 hidden.connections=[{id:'connection',from:hidden.places[0].id,to:'public-but-not-displayed',kind:'doorway',state:'open'}];
 await page.evaluate(d=>WIZAMAP_TEST.render(d),hidden);
 const exported=await page.evaluate(()=>WIZAMAP_TEST.data);
 assert.equal(exported.places.length,1);assert.equal(exported.connections.length,0);
 assert.deepEqual(errors,[]);console.log('PASS compact JSON/window entry, production controls, malformed JSON, fail-closed render/recovery, scene-only export');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
