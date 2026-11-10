const {chromium}=require('playwright'),fs=require('fs'),assert=require('assert/strict');
const experimentRoot=process.argv[2]||'/tmp/wizamap-experiments';
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1360,height:900}});await p.context().setOffline(true);const errors=[],requests=[];p.on('pageerror',e=>errors.push(e.message));p.on('request',r=>requests.push(r.url()));
for(const scene of ['library','bedroom','classroom','potions','custom','roof']){
 await p.goto('about:blank');await p.setContent(fs.readFileSync(experimentRoot+'/'+scene+'/preview.html','utf8'));await p.waitForFunction(()=>window.WIZAMAP_TEST);assert.equal(await p.locator('.qa-error').textContent(),'');
 if(scene!=='roof')assert.ok(await p.locator('[data-furnishing]').count()>0);
 await p.screenshot({path:'/tmp/wizamap-'+scene+'.png'});await p.setViewportSize({width:390,height:520});await p.getByRole('button',{name:'+',exact:true}).click();await p.screenshot({path:'/tmp/wizamap-'+scene+'-mobile.png'});await p.setViewportSize({width:1360,height:900});console.log('PASS offline experiment',scene);
}assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
