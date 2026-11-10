// End-to-end /MAP checks. Uses local assets; never calls an RP service.
const {chromium}=require('playwright'),fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),sample=JSON.parse(fs.readFileSync(root+'/tools/fixtures/scene.json'));
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
 const p=await browser.newPage({viewport:{width:1360,height:900},acceptDownloads:true}),errors=[],requests=[];
 p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@**/*',route=>{
  const url=route.request().url(),rel=url.split(/@[a-f0-9]{40}\//)[1];requests.push(rel);
  if(!rel||rel.includes('..'))return route.abort();
  return route.fulfill({body:fs.readFileSync(path.join(root,rel)),contentType:rel.endsWith('.svg')?'image/svg+xml':rel.endsWith('.json')?'application/json':'text/html'});
 });
 await p.setContent(fs.readFileSync(process.argv[2]||'/tmp/wzw-test/preview.html','utf8'));
 await p.waitForFunction(()=>window.WIZAMAP_TEST);
 const d=structuredClone(sample);d.view.preferredMode='generated';d.places[0].generation={function:'library',shape:'U',floorMaterial:'wood',furnishings:[]};
 d.actors[0].stance='walk';await p.evaluate(d=>window.WIZAMAP_TEST.render(d),d);
 assert.ok(await p.locator('[data-furnishing]').count()>=7);
 await p.locator('.qa-tags .ribbon').click();assert.equal(await p.locator('#actor-action').textContent(),'Đang đi');
 const used=[...new Set(requests.filter(x=>x.startsWith('elements/assets/')))];assert.equal(used.length,6);console.log('PASS library + decor + on-table items; loads six used SVGs');
 const custom=structuredClone(d);custom.places[0].generation={function:'workshop',shape:'round',furnishings:[{role:'Đài phép tùy tạo',count:1,width:64,depth:64,custom:{width:100,height:100,shapes:[{type:'ellipse',cx:50,cy:50,rx:45,ry:45,fill:'#668D80'},{type:'path',d:'M30 60L50 20L70 60Z',fill:'#CFAD63'}]}}]};
 await p.evaluate(d=>window.WIZAMAP_TEST.render(d),custom);assert.equal(await p.locator('[data-element-id="custom"]').count(),1);
 // All kinds of floor work by semantic role, without authoring new walkable polygons.
 const semantic=await p.evaluate(()=>{
  const svg=document.querySelector('#mapmount>svg'),g=document.createElementNS(svg.namespaceURI,'g');g.setAttribute('transform','translate(800 200) scale(2)');
  for(const [i,material]of ['wood','stone','tile','new-material'].entries()){
   const n=document.createElementNS(svg.namespaceURI,'path');n.setAttribute('data-surface','floor');n.setAttribute('data-material',material);n.setAttribute('d',`M${i*110} 0h100v100h-100Z`);g.append(n);
  }svg.append(g);return [0,1,2,3].map(i=>window.WIZAMAP_TEST.canStand({x:850+i*220,y:250}));
 });assert.deepEqual(semantic,[true,true,true,true]);console.log('PASS four floor materials auto-walkable with transformed geometry');
 const reg=JSON.parse(fs.readFileSync(root+'/runtime/templates.json'));
 const template=structuredClone(sample);template.view.templateId='hall';template.view.preferredMode='template';template.places[0].atlasRef=Object.keys(reg.templates.hall.targets)[0];template.actors[0].environment='inside';
 await p.evaluate(d=>window.WIZAMAP_TEST.render(d),template);
 template.actors[0].position={x:200,y:200};await p.evaluate(d=>window.WIZAMAP_TEST.render(d),template);console.log('PASS legacy wood floor accepts actor without spatial polygons');
 await p.evaluate(d=>window.WIZAMAP_TEST.render(d),custom);
 const downloadPromise=p.waitForEvent('download');await p.getByRole('button',{name:'Tải HTML',exact:true}).click();const download=await downloadPromise;await download.saveAs('/tmp/wizamap-experiment.html');
 await p.context().setOffline(true);await p.setContent(fs.readFileSync('/tmp/wizamap-experiment.html','utf8'));await p.waitForFunction(()=>window.WIZAMAP_TEST);
 assert.equal(await p.locator('[data-element-id="custom"]').count(),1);assert.equal(await p.locator('.qa-error').textContent(),'');
 await p.context().setOffline(false);
 await p.setViewportSize({width:390,height:520});await p.screenshot({path:'/tmp/wizamap-custom-mobile.png'});
 await p.setViewportSize({width:1360,height:900});await p.evaluate(d=>window.WIZAMAP_TEST.render(d),d);await p.screenshot({path:'/tmp/wizamap-furnished-room.png'});
 const surfaces=JSON.parse(fs.readFileSync(root+'/runtime/template-spatial.json'));const ext=structuredClone(sample);ext.view.preferredMode='template';ext.view.templateId='h1';ext.places[0].atlasRef='hagrid';ext.actors[0].environment='inside';
 await p.evaluate(d=>window.WIZAMAP_TEST.render(d),ext);
 assert.equal(await p.locator('[data-actor-feet]').count(),0);
 const roof=await p.evaluate(()=>{const n=document.querySelector('[data-id="region:extra:5"] [data-layer="roof"]'),s=document.querySelector('#mapmount>svg'),b=n.getBBox(),m=s.getScreenCTM().inverse().multiply(n.getScreenCTM());const top=new DOMPoint(b.x+b.width/2,b.y).matrixTransform(m).matrixTransform(s.getScreenCTM());const tag=document.querySelector('.qa-tags .ribbon').getBoundingClientRect();return {top:top.y,bottom:tag.bottom};});await p.screenshot({path:'/tmp/wizamap-roof.png'});assert.ok(roof.bottom<=roof.top+1);
 const house=p.locator('[data-id="region:extra:5"]');await house.dispatchEvent('mouseenter');assert.equal(await house.evaluate(n=>n.style.opacity),'0.5');await house.dispatchEvent('mouseleave');assert.notEqual(await house.evaluate(n=>n.style.opacity),'0.5');
 const patch=surfaces.templates.h1.walkableRegions[20].points;ext.actors[0].environment='outside';ext.actors[0].position={x:(patch[0].x+patch[2].x)/2,y:(patch[0].y+patch[2].y)/2};await p.evaluate(d=>window.WIZAMAP_TEST.render(d),ext);
 const tag=p.locator('.qa-tags .ribbon');await tag.dispatchEvent('mouseenter');await tag.click();await tag.dispatchEvent('mouseleave');await tag.click();
 const crowded=structuredClone(ext);crowded.actors[0].environment='inside';delete crowded.actors[0].position;
 for(let i=0;i<10;i++)crowded.actors.push({...crowded.actors[0],id:'guest-'+i,isPC:false,name:'Khách có tên dài '+(i+1)});
 await p.evaluate(d=>window.WIZAMAP_TEST.render(d),crowded);await p.setViewportSize({width:390,height:520});await p.waitForTimeout(80);
 const rects=await p.locator('.qa-tags .ribbon').evaluateAll(nodes=>nodes.map(n=>{const r=n.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}}));
 for(let i=0;i<rects.length;i++)for(let j=0;j<i;j++){const a=rects[i],b=rects[j];assert.ok(!(a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top),'mobile names overlap');}
 console.log('PASS 11 readable roof labels on mobile');
 assert.deepEqual(errors,[]);console.log('PASS custom drawing + offline download + roof name + 50% building hover + mobile');await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
