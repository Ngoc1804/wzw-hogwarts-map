// Source-built Demo 3 regressions; no live RP and no production release claim.
const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1360,height:900}}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
   const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];
   if(!rel||rel.includes('..'))return route.abort();
   return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.svg')?'image/svg+xml':rel.endsWith('.json')?'application/json':'text/html'});
  });
  await page.setContent(fs.readFileSync(process.argv[2],'utf8'));await page.waitForFunction(()=>window.WIZAMAP_TEST);
  const meta={date:'1992-09-11',time:'16:30',areaName:'Test only'};
  const d={meta,places:[{id:'HOG-HMNGC-N-01',name:'Phòng học Độc dược',kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:'HOG-HMNGC-N-01'}]};
  await page.evaluate(d=>WIZAMAP_TEST.render(d),d);
  assert.equal(await page.locator('[data-room]').count(),5);
  const before=await page.evaluate(()=>WIZAMAP_TEST.generatedGeometry.floorPolygons);
  const publicRooms=[1,2,3,4,5].map(i=>'HOG-HMNGC-N-0'+i);
  d.places=publicRooms.map((id,i)=>({id,name:'Phòng công khai '+i,kind:'room'}));
  d.actors.push(...Array.from({length:15},(_,i)=>({id:'npc-'+i,name:'NPC '+i,placeId:publicRooms[i%5],priority:i})));
  await page.evaluate(d=>WIZAMAP_TEST.render(d),d);
  assert.equal(await page.locator('.qa-tags .ribbon').count(),11);
  assert.equal((await page.evaluate(()=>WIZAMAP_TEST.data)).actors.length,16);
  assert.deepEqual(await page.evaluate(()=>WIZAMAP_TEST.generatedGeometry.floorPolygons),before);
  const custom={meta,customScene:{id:'user-parcel',name:'Quán nhỏ',source:'user-created',kind:'building',description:'Một quán nhỏ có sân cỏ',terrain:'grass'},places:[{id:'inn-room',name:'Phòng quán',kind:'room',generation:{function:'pub'}}],actors:[{id:'pc',name:'PC',isPC:true,placeId:'inn-room'}]};
  await page.evaluate(d=>WIZAMAP_TEST.render(d),custom);
  assert.equal(await page.locator('[data-room]').count(),1);assert.ok(await page.locator('[data-exterior-ground]').count()>0);
  await page.setViewportSize({width:390,height:700});
  assert.equal(await page.locator('.qa-error').textContent(),'');assert.deepEqual(errors,[]);
  console.log('PASS Demo 3 source: five-room locality, stable layout, 15 NPC / 10 labels + PC, custom singleton parcel, mobile, no JS errors');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
