// Runtime for one-way Preview rendering; no persistence.
Object.assign(FURNITURE,JSON.parse(document.querySelector('#qa-furniture')?.textContent||'{}'));
const embeddedAtlas=document.querySelector('#qa-atlas')?JSON.parse(document.querySelector('#qa-atlas').textContent):null;
const embeddedData=document.querySelector('#MAP_DATA')?JSON.parse(document.querySelector('#MAP_DATA').textContent):null;
let bundleSource=document.currentScript.textContent;
const bundleURL=document.currentScript.src;
const NSVG='http://www.w3.org/2000/svg';
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
let plan,geometry,visibleActors=[];
let atlas,activeData,svg,stops=[],box,base,drag,moved=false,motion=true;
const q=s=>document.querySelector(s);
const style=el('style');style.textContent=CSS+'\n.qa-tags{position:absolute;inset:0;pointer-events:none}.qa-tags button{position:absolute;pointer-events:auto;transform:translate(-50%,-100%)}.qa-controls{display:flex;gap:6px;flex-wrap:wrap}.qa-controls select{max-width:220px}.qa-error{color:#ffb6a5;white-space:pre-wrap}.qa-overlay{position:fixed;inset:10%;z-index:20;background:var(--paper);padding:20px;display:flex;flex-direction:column;gap:8px}.qa-overlay textarea{flex:1;min-height:150px}.qa-overlay[hidden]{display:none}.qa-tags .hint-marker{border:1px solid #8c2939;border-radius:50%;background:#eee4d1;color:#8c2939}';document.head.append(style);
document.body.innerHTML=SHELL; // Trusted checked-in shell only; RP text uses textContent.
const bar=el('div');bar.className='reviewbar qa-controls';q('.layout').before(bar);
const select=el('select');select.setAttribute('aria-label','Template');bar.append(select);
function button(label,fn){const b=el('button',label);b.className='review-button';b.onclick=fn;bar.append(b);return b}
const status=el('span','Đang tải atlas…');status.setAttribute('role','status');bar.append(status);
const error=el('div');error.className='qa-error';error.setAttribute('role','alert');bar.append(error);
const panel=el('div');panel.className='qa-overlay';panel.hidden=true;
const editor=el('textarea');editor.setAttribute('aria-label','MAP_DATA JSON');panel.append(el('strong','MAP_DATA — chỉ dữ liệu công khai cho test'),editor);
const apply=el('button','Áp dụng');apply.onclick=async()=>{try{await render(JSON.parse(editor.value));panel.hidden=true}catch(e){error.textContent=e.message}};
const close=el('button','Đóng');close.onclick=()=>panel.hidden=true;panel.append(apply,close);document.body.append(panel);
button('MAP_DATA',()=>{editor.value=JSON.stringify(activeData||{},null,2);panel.hidden=false});
button('+',()=>zoom(.8));button('−',()=>zoom(1.25));button('Vừa khung',()=>{box=[...base];update()});
button('Chuyển động',()=>{motion=!motion;document.body.classList.toggle('motion-off',!motion);q('#mapmount').style.setProperty('--qa-motion',motion?'running':'paused')});
button('Tải HTML',()=>{const copy=document.documentElement.cloneNode(true);copy.querySelector('body').replaceChildren();copy.querySelectorAll('style').forEach(n=>n.remove());const payload=el('script');payload.type='application/json';payload.id='qa-atlas';payload.textContent=JSON.stringify(atlas).replace(/</g,'\\u003c');copy.querySelector('body').append(payload);const assets=el('script');assets.type='application/json';assets.id='qa-furniture';assets.textContent=JSON.stringify(FURNITURE).replace(/</g,'\\u003c');copy.querySelector('body').append(assets);const data=el('script');data.type='application/json';data.id='MAP_DATA';data.textContent=serializeMapData(activeData);copy.querySelector('body').append(data);const script=el('script');script.textContent=bundleSource;copy.querySelector('body').append(script);const url=URL.createObjectURL(new Blob(['<!doctype html>'+copy.outerHTML],{type:'text/html'}));const a=el('a');a.href=url;a.download='wizamap-template-test.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)});
q('#drawer-toggle').onclick=()=>{const layout=q('.layout');layout.classList.toggle('drawer-open');q('#drawer-toggle').setAttribute('aria-expanded',String(layout.classList.contains('drawer-open')))};
function inspect(row,placeId){let action=q('#actor-action');if(!action){action=el('div');action.id='actor-action';action.className='review-status';bar.append(action)}action.textContent=row.stance==='walk'?'Đang đi':row.activity||'';q('#place-title').textContent=row.name||row.title;q('#drawer-name').textContent=row.name||row.title;q('#place-area').textContent=activeData.meta.areaName;q('#activity').textContent=row.inspector?.overhear||'';q('#observation').textContent=row.inspector?.observation||'';q('#actors').replaceChildren(...visibleActors.filter(a=>a.placeId===placeId).map(a=>{const n=actorTag(a,true);n.onclick=()=>inspect(a,a.placeId);return n}))}
const EXTERIOR_TEMPLATES=new Set(['h1','h2','village-static','diagon-knockturn']);
function anchor(place){
 if(geometry){const r=geometry.rooms[place.id];return {x:r.x+r.w/2,y:r.y+r.h*.72}}
 const targets=registry.templates[select.value].targets[place.atlasRef];
 const nodes=[...svg.querySelectorAll('[data-id]')].filter(n=>targets.includes(n.dataset.id));
 if(!nodes.length)throw Error('Không tìm thấy shape cho '+place.id);
 // SVG shape bounds are artwork, not a walkable floor. Outdoor markers use
 // the lower edge; screen-space padding keeps feet below roofs at every zoom.
 const node=nodes[0],b=node.getBBox(),matrix=svg.getScreenCTM().inverse().multiply(node.getScreenCTM());
 const corners=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>{const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(matrix)});
 const left=Math.min(...corners.map(p=>p.x)),right=Math.max(...corners.map(p=>p.x)),top=Math.min(...corners.map(p=>p.y)),bottom=Math.max(...corners.map(p=>p.y));
 return {x:(left+right)/2,y:EXTERIOR_TEMPLATES.has(select.value)?top+(bottom-top)*.3:(top+bottom)/2,left,right,top,bottom};
}
let labels=[];
function update(){
 if(!svg)return;svg.setAttribute('viewBox',box.join(' '));const r=q('#mapmount').getBoundingClientRect(),ctm=svg.getScreenCTM();
 for(const {node,point,dx=0,dy=0,feet} of labels){
  const inFog=pointInFog(point,activeData.visibility);node.hidden=inFog;if(feet)feet.style.display=inFog?'none':'';
  const p=svg.createSVGPoint();p.x=point.x;p.y=point.y;const s=p.matrixTransform(ctm);s.x+=dx;s.y+=dy;
  node.style.left=(s.x-r.left)+'px';node.style.top=(s.y-r.top)+'px';
  if(feet){const m=ctm.inverse().translate(s.x,s.y+12).rotate(90).scale(.35);feet.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`)}
 }
}
function zoom(f){if(!box)return;box=[box[0]+box[2]*(1-f)/2,box[1]+box[3]*(1-f)/2,box[2]*f,box[3]*f];update()}
async function render(data){assertMapData(data);plan=resolveMap(data);const id=plan.templateId;
 const spatial=data.view.spatial||null,exterior=EXTERIOR_TEMPLATES.has(id);
 if(exterior){for(const a of data.actors){if(a.environment==='outside'&&(!a.position||!surfaceAllowed(a.position,spatial)))throw Error('Actor '+a.id+': outside position requires explicit verified walkable polygon and must avoid blocked regions');}}

 if(plan.mode==='generated'){const roles=[...new Set(plan.places.flatMap(p=>p.generation.furnishings.map(f=>f.role)))];await Promise.all(roles.map(async role=>{if(FURNITURE[role])return;if(!ASSET_FILES[role])throw Error('Không có asset role: '+role);const r=await fetch(ASSET_ROOT+ASSET_FILES[role]);if(!r.ok)throw Error('Asset HTTP '+r.status);FURNITURE[role]=await r.text()}));}

 stops.forEach(stop=>stop());stops=[];labels=[];visibleActors=[];error.textContent='';activeData=structuredClone(data);select.value=id;
 geometry=null;
 if(plan.mode==='generated'){
 geometry=buildGeometry(plan);svg=document.createElementNS(NSVG,'svg');svg.setAttribute('viewBox',geometry.bounds.join(' '));
 const add=(tag,attrs)=>{const n=document.createElementNS(NSVG,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);svg.append(n);return n};
 for(const c of geometry.routes){const d=c.points.map(([x,y],i)=>`${i?'L':'M'}${x} ${y}`).join(' ');add('path',{d,fill:'none',stroke:'#75684f','stroke-width':36,'stroke-linejoin':'round'});add('path',{d,fill:'none',stroke:'#e8dec8','stroke-width':30,'stroke-linejoin':'round'});if(c.state!=='open')add('path',{d,fill:'none',stroke:'#8c2939','stroke-width':3,'stroke-dasharray':'8 8'});}
 for(const p of plan.places){const r=geometry.rooms[p.id];const n=add('path',{d:roomPath(r),fill:'#f4ecd9',stroke:'#75684f','stroke-width':3,'data-place':p.id,tabindex:0,role:'button','aria-label':p.name});if(geometry.routes.some(c=>c.from===p.id||c.to===p.id))add('path',{d:`M${r.x+r.w/2-16} ${r.y+r.h}h32`,stroke:'#e8dec8','stroke-width':5});n.onclick=()=>inspect(p,p.id);n.onkeydown=e=>{if(e.key==='Enter')inspect(p,p.id)};
 const slots=furnitureSlots(r);let fi=0;for(const f of p.generation.furnishings){const asset=FURNITURE[f.role];if(!asset)throw Error('Không có asset nội thất cho role: '+f.role);if(fi+f.count>slots.length)throw Error('Phòng vượt sức chứa sàn hợp lệ; hãy tách phòng hoặc giảm số lượng');for(let j=0;j<f.count;j++,fi++){const nested=new DOMParser().parseFromString(asset,'image/svg+xml').documentElement;const item=document.importNode(nested,true);item.setAttribute('x',slots[fi][0]);item.setAttribute('y',slots[fi][1]);item.setAttribute('width',48);item.setAttribute('height',48);item.style.pointerEvents='none';svg.append(item)}}
 }
 base=geometry.bounds;
 }else{
 const doc=new DOMParser().parseFromString(atlas.maps[id].svg,'image/svg+xml');svg=document.importNode(doc.documentElement,true);
 const defs=document.createElementNS(NSVG,'defs');
 const needed=new Set(),pending=[svg.outerHTML];
 while(pending.length){const text=pending.pop();for(const m of text.matchAll(/(?:href=["']#|url\(#)([^"') ]+)/g)){const key=m[1];if(!needed.has(key)&&atlas.vectors[key]){needed.add(key);pending.push(atlas.vectors[key])}}}
 defs.innerHTML=[...needed].map(k=>atlas.vectors[k]).join('');svg.prepend(defs);base=atlas.maps[id].bounds||svg.getAttribute('viewBox').split(/[ ,]+/).map(Number);
 }
 const feetDefs=document.createElementNS(NSVG,'defs');feetDefs.innerHTML=shoeDefs;svg.prepend(feetDefs);
 q('#mapmount').replaceChildren(svg);const overlay=el('div');overlay.className='qa-tags';q('#mapmount').append(overlay);box=[...base];
 const points=new Map(data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id)).map(p=>[p.id,anchor(p)]));
 // Do not expose fogged actors/hints through ribbons, navigation or inspector.
 visibleActors=data.actors.filter(a=>!pointInFog(a.position||points.get(a.placeId),data.visibility));
 if(!visibleActors.some(a=>a.isPC))throw Error('PC position is inside fog; scene visibility is inconsistent');
 const visibleHints=data.hints.filter(h=>!pointInFog(points.get(h.placeId),data.visibility));
 const occluders=exterior?(spatial?.occlusionRegions||[]).map(region=>{
  const allowed=EXTERIOR_OCCLUDERS[id]||[];
  if(!allowed.includes(region.targetId))throw Error('Occlusion target not approved for template: '+region.targetId);
  const targets=registry.templates[id].targets[region.targetId]||[];
  if(targets.length!==1&&!region.interactiveId)throw Error('Ambiguous occlusion building: '+region.targetId+'; specify interactiveId');
  const interactiveId=region.interactiveId||targets[0];
  if(!targets.includes(interactiveId))throw Error('Occlusion interactiveId not in approved building: '+interactiveId);
  const target=[...svg.querySelectorAll('[data-id]')].find(n=>n.dataset.id===interactiveId);
  if(!target)throw Error('Occlusion target absent from SVG: '+region.targetId);
  return {id:region.id,target,contains:p=>pointInPolygon(p,region.points)};
 }):[];
 for(const p of data.places){if(geometry||!points.has(p.id))continue;const ids=registry.templates[id].targets[p.atlasRef];for(const n of svg.querySelectorAll('[data-id]'))if(ids.includes(n.dataset.id)){n.setAttribute('tabindex','0');n.setAttribute('role','button');n.setAttribute('aria-label',p.name);const choose=()=>{if(!pointInFog(points.get(p.id),data.visibility))inspect(p,p.id)};n.onclick=()=>{if(!moved)choose()};n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}}}}
 const offsets=new Map();for(const a of visibleActors){
 const point=points.get(a.placeId),n=actorTag(a),i=offsets.get(a.placeId)||0;offsets.set(a.placeId,i+1);
 // Additional actors occupy rows below the same ground anchor, never climb
 // upwards into the artwork. Offsets and footprints remain readable on zoom.
 const count=visibleActors.filter(other=>other.placeId===a.placeId).length,columns=Math.min(count,3);
 const dx=((i%3)-(columns-1)/2)*110,dy=(EXTERIOR_TEMPLATES.has(id)?38:0)+Math.floor(i/3)*55;
 const occluded=a.environment==='outside'&&a.position?selectOccluder(a.position,occluders):null;
 const cover=occluded?.target||null;
 const fade=on=>{if(!cover)return;if(on)cover.style.opacity='.7';else if(![...overlay.querySelectorAll('.selected')].some(tag=>tag!==n&&tag.dataset.coverId===occluded.id))cover.style.removeProperty('opacity')};
 if(occluded)n.dataset.coverId=occluded.id;n.onmouseenter=()=>fade(true);n.onmouseleave=()=>{if(!n.classList.contains('selected'))fade(false)};n.onclick=()=>{for(const b of overlay.querySelectorAll('.selected')){b.classList.remove('selected');b.dispatchEvent(new Event('mouseleave'))}n.classList.add('selected');fade(true);inspect(a,a.placeId)};overlay.append(n);
 const feet=document.createElementNS(NSVG,'g');feet.dataset.actorFeet=a.id;feet.setAttribute('fill','#8c2939');feet.style.pointerEvents='none';svg.append(feet);
 if(a.environment==='inside'&&EXTERIOR_TEMPLATES.has(id)){feet.remove();labels.push({node:n,point,dx,dy:0})}else{if(EXTERIOR_TEMPLATES.has(id)&&!a.position)throw Error('Ngoài trời cần position đã xác minh trên đất/sàn: '+a.id);labels.push({node:n,point:a.position||point,dx,dy,feet});stops.push(mountFeet(feet,a.stance));}
 }
 q('#quests').replaceChildren(...visibleHints.map(h=>{const p=data.places.find(p=>p.id===h.placeId),n=el('button',h.title+' · '+p.name);n.className='quest';n.onclick=()=>inspect(h,h.placeId);const marker=el('button','?');marker.className='hint-marker';marker.setAttribute('aria-label',h.title);marker.onclick=n.onclick;overlay.append(marker);labels.push({node:marker,point:points.get(h.placeId),dx:65,dy:EXTERIOR_TEMPLATES.has(id)?38:0});return n}));q('#hintcount').textContent=visibleHints.length+'/6';q('.quote').textContent=data.meta.quote;q('#zone').textContent=data.meta.areaName;q('.clock').textContent=data.meta.time;q('.date').textContent=data.meta.date;inspect(data.places.find(p=>p.id===data.focus.actualPlaceId),data.focus.actualPlaceId);
 if(data.view.crop!==false&&points.size&&!geometry){const viewport=q('#mapmount').getBoundingClientRect();const area=[...points.values(),...visibleActors.filter(a=>a.position).map(a=>a.position),...data.view.routePlaceIds.filter(id=>points.has(id)).map(id=>points.get(id))];box=fitSceneBounds(base,area,{width:viewport.width,height:viewport.height});}
 for(const region of data.visibility.fogRegions||[]){if(!data.visibility.fogRegionIds.includes(region.id))continue;const fog=document.createElementNS(NSVG,'polygon');fog.setAttribute('points',region.points.map(p=>`${p.x},${p.y}`).join(' '));fog.setAttribute('fill','#303238');fog.setAttribute('opacity','.94');fog.setAttribute('pointer-events','all');fog.setAttribute('aria-hidden','true');svg.append(fog);}
 svg.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1)};svg.onpointerdown=e=>{if(e.button!==0)return;moved=false;drag={x:e.clientX,y:e.clientY,box:[...box]}};svg.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4)moved=true;if(!moved)return;svg.setPointerCapture(e.pointerId);const r=svg.getBoundingClientRect(),scale=Math.min(r.width/drag.box[2],r.height/drag.box[3]);box=[drag.box[0]-dx/scale,drag.box[1]-dy/scale,drag.box[2],drag.box[3]];update()};svg.onpointerup=svg.onpointercancel=()=>drag=null;svg.onlostpointercapture=()=>drag=null;
 let pinch;svg.addEventListener('touchstart',e=>{if(e.touches.length===2){drag=null;pinch={distance:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),box:[...box]}}},{passive:true});svg.addEventListener('touchmove',e=>{if(pinch&&e.touches.length===2){e.preventDefault();const distance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);const f=pinch.distance/Math.max(1,distance),b=pinch.box;box=[b[0]+b[2]*(1-f)/2,b[1]+b[3]*(1-f)/2,b[2]*f,b[3]*f];update()}},{passive:false});svg.addEventListener('touchend',()=>pinch=null);
 if(id==='h1')stops.push(mountH1Motion(svg,()=>motion&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches));update();status.textContent=geometry?'Mặt bằng dựng trong Preview':'Template: '+id;window.WIZAMAP_TEST={render,get data(){return structuredClone(activeData)},get template(){return select.value}};
}
// Capture embedded input before replacing the document body above.
async function start(){try{if(!bundleSource&&bundleURL){const source=await fetch(bundleURL);if(!source.ok)throw Error('Bundle HTTP '+source.status);bundleSource=await source.text()}atlas=embeddedAtlas;if(!atlas){const response=await fetch(ATLAS_URL);if(!response.ok)throw Error('Atlas HTTP '+response.status);const html=await response.text();const doc=new DOMParser().parseFromString(html,'text/html');const encoded=doc.querySelector('#map-data')?.textContent.trim();if(!encoded)throw Error('Atlas thiếu payload');const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));atlas=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text())}select.replaceChildren(...Object.keys(atlas.maps).map(id=>{const o=el('option',atlas.maps[id].title);o.value=id;return o}));select.hidden=true;if(!embeddedData)throw Error('Thiếu MAP_DATA. Hãy cung cấp dữ liệu RP; không có dữ liệu mẫu tự động.');await render(embeddedData);new ResizeObserver(update).observe(q('#mapmount'))}catch(e){error.textContent='Không mở được template: '+e.message;status.textContent='Lỗi'}}
start();
