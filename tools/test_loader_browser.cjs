// Exact production loader, external script mode, and a fresh offline export page.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 try{
 const p=await b.newPage({acceptDownloads:true}),errors=[];p.on('pageerror',e=>errors.push(e.message));let bundles=0;
 await p.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
  const rel=route.request().url().split(/@[a-f0-9]{40}\//)[1];if(rel==='runtime/bundle.js')bundles++;
  return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.js')?'application/javascript':rel.endsWith('.json')?'application/json':rel.endsWith('.svg')?'image/svg+xml':'text/html'});
 });
 const data={meta:{date:'1992-09-11',time:'10:25',areaName:'Kiểm loader',quote:'</script><script>window.injected=true</script>'},places:[{id:'room',name:'Phòng giả lập',kind:'room',generation:{function:'group'}}],actors:[{id:'pc',name:'PC giả lập',placeId:'room',isPC:true}]};
 const input=JSON.stringify(data).replace(/</g,'\\u003c');
 const html=fs.readFileSync(root+'/ui/preview.html','utf8').replace('__LIVE_MAP_DATA_JSON__',input);
 await p.setContent(html);await p.waitForSelector('[data-furnishing]');
 assert.equal(p.frames().length,1);assert.equal(bundles,1);assert.equal(await p.evaluate(()=>typeof WIZAMAP_TEST),'undefined');
 assert.equal(await p.evaluate(()=>window.injected),undefined);assert.equal(await p.locator('.quote').textContent(),data.meta.quote);
 const event=p.waitForEvent('download');await p.getByRole('button',{name:'Tải HTML',exact:true}).click();
 const d=await event;await d.saveAs('/tmp/wzw-demo2-loader-offline.html');assert.equal(bundles,2);
 const offline=await b.newPage();await offline.context().setOffline(true);
 await offline.setContent(fs.readFileSync('/tmp/wzw-demo2-loader-offline.html','utf8'));await offline.waitForSelector('[data-furnishing]');
 assert.equal(await offline.locator('.qa-error').textContent(),'');assert.equal(await offline.evaluate(()=>typeof WIZAMAP_TEST),'undefined');
 assert.deepEqual(errors,[]);console.log('PASS exact production loader: one script fetch to render, no nested iframe/debug hooks, safe embedded text, lazy code fetch on download, fresh offline reopen');
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exit(1)});
