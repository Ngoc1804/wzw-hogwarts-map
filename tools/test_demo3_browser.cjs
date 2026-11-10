const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1360,height:900},acceptDownloads:true}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
   const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];
   if(!rel||rel.includes('..'))return route.abort();
   return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.json')?'application/json':rel.endsWith('.svg')?'image/svg+xml':'application/javascript'});
  });
  await page.setContent(fs.readFileSync(process.argv[2]||'/tmp/wzw-test/preview.html','utf8'));
  await page.waitForFunction(()=>window.WIZAMAP_TEST);
  const scene={
   schemaVersion:'3.1.0',
   meta:{date:'1992-09-11',time:'16:20',areaName:'Hầm ngục Bắc',quote:'Có những chiếc vạc có vẻ thích hóng chuyện.'},
   places:[{id:'HOG-HMNGC-N-01',name:'Phòng học Độc dược',kind:'room',
    inspector:{overhear:'Draco đang đọc sách.',observation:'Vách đá lạnh, mùi thảo dược lan khắp căn phòng.'}}],
   actors:[{id:'pc',name:'PC',placeId:'HOG-HMNGC-N-01',isPC:true,stance:'idle'},
    ...Array.from({length:15},(_,i)=>({id:'npc-'+i,name:'NPC '+i,placeId:'HOG-HMNGC-N-01',priority:i,activity:'Đang học.'}))],
   hints:[{id:'ev',placeId:'HOG-HMNGC-N-01',type:'event',title:'Một chiếc vạc bị nghiêng',description:'Có tiếng leng keng.'}],
   visibility:{}
  };
  await page.evaluate(d=>WIZAMAP_TEST.render(d),scene);
  assert.equal(await page.locator('[data-room]').count(),5);
  assert.equal(await page.locator('.qa-tags .ribbon').count(),11,'PC and 10 NPC labels, not 15');
  assert.equal(await page.locator('#activity').textContent(),'Draco đang đọc sách.');
  assert.equal(await page.locator('#observation').textContent(),'Vách đá lạnh, mùi thảo dược lan khắp căn phòng.');
  assert.equal(await page.locator('#hintcount').textContent(),'1/5');
  await page.locator('.quest').first().click();
  assert.equal(await page.locator('#activity').textContent(),'Có tiếng leng keng.');
  assert.equal(await page.locator('#observation').textContent(),'Vách đá lạnh, mùi thảo dược lan khắp căn phòng.');
  const printed=await page.locator('[data-room]').all();
  assert.equal(printed.length,5);
  for(const room of printed.slice(1))assert.equal(await room.getAttribute('aria-label'),'Chưa khám phá');
  const serial=await page.evaluate(()=>WIZAMAP_TEST.data);
  assert.equal(serial.actors.length,16);
  assert.equal(serial.places.length,5);
  assert.equal(serial.places.filter(x=>x.name==='Chưa khám phá').length,4);
  await page.setViewportSize({width:1360,height:520});
  const rect=await page.evaluate(()=>({map:document.querySelector('.viewport').getBoundingClientRect().toJSON(),side:document.querySelector('aside').getBoundingClientRect().toJSON(),drawer:getComputedStyle(document.querySelector('.drawer-toggle')).display}));
  assert.ok(rect.side.x>rect.map.x+rect.map.width-4,'desktop short iframe must keep right sidebar');
  assert.equal(rect.drawer,'none');
  await page.setViewportSize({width:390,height:700});
  const drawer=await page.locator('#drawer-toggle').evaluate(n=>getComputedStyle(n).display);
  assert.notEqual(drawer,'none');
  const custom={
   schemaVersion:'3.1.0',meta:{date:'1992-09-11',time:'17:00',areaName:'Quán trọ Rừng Sương'},
   customScene:{id:'au-inn',name:'Quán trọ Rừng Sương',source:'user-created',kind:'building',description:'Sảnh quán và đường mòn ở ngoài',terrain:'forest'},
   places:[{id:'inn',name:'Sảnh quán',kind:'room',generation:{function:'pub'},inspector:{observation:'Một lò sưởi ấm và bàn gỗ.'}}],
   actors:[{id:'pc',name:'PC',placeId:'inn',isPC:true}],hints:[],visibility:{}
  };
  await page.evaluate(d=>WIZAMAP_TEST.render(d),custom);
  assert.ok(await page.locator('[data-exterior-ground]').count()>0);
  assert.equal(await page.locator('[data-room]').count(),1);
  assert.ok(await page.locator('[data-furnishing]').count()>0);
  assert.deepEqual(errors,[]);
  console.log('PASS demo-3: 5-room scope, 15 public NPC / 10 labels, one-line action, observation, events, hidden room labels, short desktop sidebar, custom AU outdoor');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
