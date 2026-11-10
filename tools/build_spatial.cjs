// Build conservative road standing patches from the checked-in SVG, never artwork bounds.
// Run with Playwright and Chromium. Output is static geometry, not saved RP state.
const fs=require('fs'),{chromium}=require('playwright'),cp=require('child_process');
(async()=>{
 const atlas=JSON.parse(cp.execFileSync('python',['-c',"import sys,json;from pathlib import Path;sys.path.insert(0,'tools');import atlas;print(json.dumps(atlas.load(Path('index.html'))[1]))"],{maxBuffer:30e6}));
 const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const page=await b.newPage();const result={version:1,sourceSha256:require('crypto').createHash('sha256').update(fs.readFileSync('index.html')).digest('hex'),policy:'Conservative visible ground only; occluded ground still requires explicit scene polygons.',templates:{}};
 for(const id of ['h1','h2','village-static','diagon-knockturn']){
 await page.setContent('<body>'+atlas.maps[id].svg+'</body>');
 const out=await page.evaluate(async({id,vectors})=>{
 const svg=document.querySelector('svg'),ns=svg.namespaceURI;
 const defs=document.createElementNS(ns,'defs');defs.innerHTML=Object.values(vectors).join('');svg.prepend(defs);
 const rootMatrix=svg.getScreenCTM().inverse(),vb=svg.viewBox.baseVal;
 const bounds={x:vb.x,y:vb.y,w:Math.ceil(vb.width),h:Math.ceil(vb.height)};
 const roadSelector={h1:'path[stroke="#decca6"],path[stroke="#dacaab"]',h2:'#h2-scene > rect:first-child','village-static':'path[stroke="url(#streetstone)"],path[stroke="#decda6"]','diagon-knockturn':'[data-layer="streets"] path[stroke="#d1bf98"],[data-layer="streets"] path[stroke="#978c79"]'}[id];
 const ground=[...svg.querySelectorAll(roadSelector)].filter(n=>!n.closest('defs'));
 const skip=new Set(id==='h2'?['h2-place-1','h2-place-2']:[]);
 // Only top-level interaction groups: nested village buildings are already contained.
 const blockers=[...svg.querySelectorAll('[data-id]')].filter(n=>!n.parentElement.closest('[data-id]')&&!n.closest('defs')&&!skip.has(n.dataset.id));
 if(id==='h2')blockers.push(...svg.querySelectorAll('#h2-scene > polygon'));
 async function pixels(nodes){
  const copy=document.createElementNS(ns,'svg');copy.setAttribute('xmlns',ns);copy.setAttribute('viewBox',`${bounds.x} ${bounds.y} ${bounds.w} ${bounds.h}`);copy.setAttribute('width',bounds.w);copy.setAttribute('height',bounds.h);
  for(const d of svg.querySelectorAll('defs'))copy.append(d.cloneNode(true));
  for(const n of nodes){const g=document.createElementNS(ns,'g'),m=rootMatrix.multiply(n.getScreenCTM());g.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`);const c=n.cloneNode(true);c.removeAttribute('transform');
   c.querySelectorAll?.('.spot-hit,.label,.plaque,text,title,rect[fill="transparent"],ellipse[fill="transparent"]').forEach(x=>x.remove());
   if(c.matches('.spot-hit'))continue;g.append(c);copy.append(g);}
  const im=new Image();im.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(copy))));await im.decode();const can=document.createElement('canvas');can.width=bounds.w;can.height=bounds.h;const ctx=can.getContext('2d');ctx.drawImage(im,0,0);return ctx.getImageData(0,0,bounds.w,bounds.h).data;
 }
 const gp=await pixels(ground),bp=await pixels(blockers),step=id==='diagon-knockturn'?12:4,regions=[];
 for(let y=0;y+step<bounds.h;y+=step){let start=null;
  for(let x=0;x+step<bounds.w;x+=step){let safe=true;
   for(let dy=-1;dy<=step+1&&safe;dy++)for(let dx=-1;dx<=step+1;dx++){
    const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=bounds.w||yy>=bounds.h){safe=false;break}const at=(yy*bounds.w+xx)*4+3;if(gp[at]<250||bp[at]>0){safe=false;break}
   }
   if(safe){if(start===null)start=x}else if(start!==null){regions.push([start,y,x,y+step]);start=null}
  }
  if(start!==null)regions.push([start,y,Math.floor((bounds.w-1)/step)*step,y+step]);
 }
 return {sourceGroundShapes:ground.length,walkableRegions:regions.map(([x,y,r,b],i)=>({id:'ground-'+i,points:[{x:x+bounds.x,y:y+bounds.y},{x:r+bounds.x,y:y+bounds.y},{x:r+bounds.x,y:b+bounds.y},{x:x+bounds.x,y:b+bounds.y}]})),blockedRegions:[],occlusionRegions:[]};
 },{id,vectors:atlas.vectors});
 if(!out.walkableRegions.length)throw Error('No standing surface for '+id);result.templates[id]=out;console.log(id,out.sourceGroundShapes,out.walkableRegions.length);
 }
 fs.writeFileSync('runtime/template-spatial.json',JSON.stringify(result)+'\n');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});
