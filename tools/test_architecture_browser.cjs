const {chromium}=require('playwright'),assert=require('assert/strict'),fs=require('fs');
const path=require('path'),os=require('os');const target=process.argv[2];if(!target)throw Error('Usage: node tools/test_architecture_browser.cjs URL');const scratch=fs.mkdtempSync(path.join(os.tmpdir(),'wizamap-architecture-'));
const types=['horizontal','vertical','ell','tee','cross','court','cloister','windows','curved','tower'];
(async()=>{const b=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1600,height:1100},acceptDownloads:true});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(target);await p.waitForSelector('[data-room]');

for(const type of types){await p.selectOption('#layout',type);const count=await p.locator('[data-room]').count();assert.ok(count>=4);assert.equal(await p.locator('[data-door]').count(),count);

await p.locator('[data-room]').first().focus();await p.keyboard.press('Enter');assert.ok(await p.locator('.selection').count());await p.locator('#height').fill('50');await p.locator('#height').dispatchEvent('input');assert.equal(await p.locator('[data-room]').count(),count);await p.locator('#height').fill('36');await p.locator('#height').dispatchEvent('input');

console.log(type,count,'rooms',await p.locator('[data-window]').count(),'windows');}

await p.click('#plus');assert.equal(await p.locator('#zoom').textContent(),'125%');
const wait=p.waitForEvent('download');await p.click('#download');await(await wait).saveAs(path.join(scratch,'downloaded.html'));const off=await b.newPage();let requests=0;await off.route('**/*',r=>{requests++;r.abort()});const downloaded=fs.readFileSync(path.join(scratch,'downloaded.html'),'utf8');assert.ok(downloaded.includes("DecompressionStream('gzip')"),'download stays packed');assert.ok(!downloaded.includes('id="a-table.study"'),'no expanded duplicate symbols');await off.setContent(downloaded);await off.waitForSelector('[data-room]');for(const type of types){await off.selectOption('#layout',type);assert.ok(await off.locator('[data-room]').count()>=4)}assert.equal(requests,0);
await p.setViewportSize({width:390,height:844});for(const type of ['windows','curved','tower']){await p.selectOption('#layout',type);assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));}
assert.deepEqual(errors,[]);console.log('All ten layouts, height, keyboard, zoom, offline downloaded HTML and mobile width passed');await b.close();fs.rmSync(scratch,{recursive:true,force:true})})();
