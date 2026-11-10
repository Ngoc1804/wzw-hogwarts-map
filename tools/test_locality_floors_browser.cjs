const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const page=await browser.newPage({viewport:{width:1360,height:900},acceptDownloads:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',r=>{const rel=r.request().url().split(/@[a-f0-9]{40}\//)[1];return r.fulfill({headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.svg')?'image/svg+xml':rel.endsWith('.json')?'application/json':'text/html'});});
 await page.setContent(fs.readFileSync(process.argv[2],'utf8'));await page.waitForFunction(()=>window.WIZAMAP_TEST);
 const make=(id,name)=>({schemaVersion:'3.2.0',meta:{date:'1992-09-11',time:'16:20',areaName:'Test'},places:[{id,name,kind:'room'}],actors:[{id:'pc',name:'PC',isPC:true,placeId:id}]});
 const pictured=new Set();
 const regions=JSON.parse(fs.readFileSync(root+'/runtime/template-localities.json')).regions;
 for(const r of regions){
  const d=make(r.placeId,r.name);d.actors[0].environment=['h1','h2','diagon-knockturn','village-static'].includes(r.templateId)?'outside':'inside';
  await page.evaluate(d=>WIZAMAP_TEST.render(d),d);
  assert.equal(await page.locator('.qa-error').textContent(),'');assert.equal(await page.locator('[data-locality-precision]').count(),1);
  assert.equal(await page.locator('[data-actor-feet]').count(),1,r.placeId+' feet missing');
  const point=await page.locator('[data-actor-feet]').evaluate(n=>{const s=n.ownerSVGElement,m=s.getScreenCTM().inverse().multiply(n.getScreenCTM());return {x:m.e,y:m.f}});
  assert.ok(await page.evaluate(p=>WIZAMAP_TEST.canStand(p),point),r.placeId+' invalid floor');
  if(!pictured.has(r.templateId)){await page.screenshot({path:'/tmp/locality-'+r.templateId+'.png'});pictured.add(r.templateId);}
  assert.ok(await page.evaluate(({id,p})=>{const n=document.querySelector('[data-id="locality-'+id+'"] [data-surface="floor"]'),s=n.ownerSVGElement,q=new DOMPoint(p.x,p.y).matrixTransform(s.getScreenCTM()).matrixTransform(n.getScreenCTM().inverse());return n.isPointInFill(q)},{id:r.placeId,p:point}),r.placeId+' feet outside own local surface');
  console.log('PASS',r.placeId,r.templateId);
 }
 const inset=regions.find(r=>r.kind==='inset'&&r.templateId==='hall');
 const d=make(inset.placeId,inset.name);d.view={crop:false};d.actors[0].environment='inside';await page.evaluate(d=>WIZAMAP_TEST.render(d),d);
 const inside=await page.locator('[data-actor-feet]').evaluate(n=>{const s=n.ownerSVGElement,b=s.viewBox.baseVal,m=s.getScreenCTM().inverse().multiply(n.getScreenCTM());return m.e>=b.x&&m.e<=b.x+b.width&&m.f>=b.y&&m.f<=b.y+b.height});assert.ok(inside,'crop=false must include the inset');
 const event=page.waitForEvent('download');await page.getByRole('button',{name:'Tải HTML',exact:true}).click();const download=await event;const file='/tmp/wzw-locality-offline.html';await download.saveAs(file);
 const offline=await browser.newPage();await offline.context().setOffline(true);await offline.setContent(fs.readFileSync(file,'utf8'));await offline.waitForSelector('[data-actor-feet]');assert.equal(await offline.locator('.qa-error').textContent(),'');await offline.close();await page.context().setOffline(false);
 assert.deepEqual(errors,[]);
 console.log('PASS all 64 supplementary locality floors');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
