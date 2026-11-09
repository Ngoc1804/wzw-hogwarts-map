// Run with a server hosting build_template_preview.py output.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',headless:true});
 const page=await browser.newPage({viewport:{width:1360,height:900}});
 // Inject the repository atlas to keep the regression independent of CDN/TLS.
 const fs=require('node:fs');const zlib=require('node:zlib');
 const html=fs.readFileSync(require('node:path').join(__dirname,'../index.html'),'utf8');
 const atlas=JSON.parse(zlib.gunzipSync(Buffer.from(html.match(/<script id="map-data"[^>]*>(.*?)<\/script>/s)[1],'base64')));
 await page.route('**/template-preview.html',async route=>{const response=await route.fetch();const body=(await response.text()).replace('<body>','<body><script id="qa-atlas" type="application/json">'+JSON.stringify(atlas).replace(/</g,'\\u003c')+'</script>');await route.fulfill({response,body})});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv[2]||'http://127.0.0.1:8765/template-preview.html');await page.waitForFunction(()=>window.WIZAMAP_TEST);
 const registry=require('../runtime/templates.json');
 for(const id of ['h1','h2','village-static','diagon-knockturn']){
  await page.selectOption('select',id);
  const refs=id==='h1'?['greenhouses','castle','hagrid']:Object.keys(registry.templates[id].targets).slice(0,3);
  for(const ref of refs){const targets=registry.templates[id].targets[ref];const result=await page.evaluate(({ref,targets})=>{
   const data=window.WIZAMAP_TEST.data;data.places[0].atlasRef=ref;data.actors=Array.from({length:4},(_,i)=>({...data.actors[0],id:i?'npc-'+i:data.focus.pcActorId,isPC:i===0}));window.WIZAMAP_TEST.render(data);
   const shape=[...document.querySelectorAll('#mapmount [data-id]')].find(n=>targets.includes(n.dataset.id)).getBoundingClientRect();
   return [...document.querySelectorAll('[data-actor-feet]')].map(n=>{const p=document.querySelector('#mapmount>svg').createSVGPoint();return p.matrixTransform(n.getScreenCTM()).y-shape.bottom});
  },{ref,targets});assert(result.every(clearance=>clearance>=49),id+' '+ref+' feet overlap artwork');}
 }
 await page.selectOption('select','h1');await page.evaluate(()=>{const d=window.WIZAMAP_TEST.data;d.places[0].atlasRef='greenhouses';d.actors=Array.from({length:3},(_,i)=>({...d.actors[0],id:i?'npc-'+i:d.focus.pcActorId,isPC:i===0,name:i?'NPC '+i:'PC'}));window.WIZAMAP_TEST.render(d)});
 if(process.env.QA_SCREENSHOT)await page.screenshot({path:process.env.QA_SCREENSHOT});
 const size=()=>page.locator('[data-actor-feet]').first().evaluate(n=>{const m=n.getScreenCTM();return Math.hypot(m.a,m.b)});
 const before=await size();await page.getByRole('button',{name:'+',exact:true}).click();assert(Math.abs(await size()-before)<1e-6);
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);assert(Math.abs(await size()-before)<1e-6);assert.deepEqual(errors,[]);
 await browser.close();console.log('Outdoor placement, crowd rows and footprint zoom/mobile scale passed');
})().catch(e=>{console.error(e);process.exit(1)});
