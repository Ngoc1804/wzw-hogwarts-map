// Explicit public-template QA viewer. No generated geometry, crop, fog or persistence.
const embeddedAtlas=document.querySelector('#qa-atlas')?JSON.parse(document.querySelector('#qa-atlas').textContent):null;
const embeddedData=document.querySelector('#MAP_DATA')?JSON.parse(document.querySelector('#MAP_DATA').textContent):null;
let bundleSource=document.currentScript.textContent;
const bundleURL=document.currentScript.src;
const NSVG='http://www.w3.org/2000/svg';
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
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
const apply=el('button','Áp dụng');apply.onclick=()=>{try{render(JSON.parse(editor.value));panel.hidden=true}catch(e){error.textContent=e.message}};
const close=el('button','Đóng');close.onclick=()=>panel.hidden=true;panel.append(apply,close);document.body.append(panel);
button('MAP_DATA',()=>{editor.value=JSON.stringify(activeData||fixture,null,2);panel.hidden=false});
button('+',()=>zoom(.8));button('−',()=>zoom(1.25));button('Vừa khung',()=>{box=[...base];update()});
button('Chuyển động',()=>{motion=!motion;q('#mapmount').style.setProperty('--qa-motion',motion?'running':'paused')});
button('Tải HTML',()=>{const copy=document.documentElement.cloneNode(true);copy.querySelector('body').replaceChildren();copy.querySelectorAll('style').forEach(n=>n.remove());const payload=el('script');payload.type='application/json';payload.id='qa-atlas';payload.textContent=JSON.stringify(atlas).replace(/</g,'\\u003c');copy.querySelector('body').append(payload);const data=el('script');data.type='application/json';data.id='MAP_DATA';data.textContent=serializeMapData(activeData);copy.querySelector('body').append(data);const script=el('script');script.textContent=bundleSource;copy.querySelector('body').append(script);const url=URL.createObjectURL(new Blob(['<!doctype html>'+copy.outerHTML],{type:'text/html'}));const a=el('a');a.href=url;a.download='wizamap-template-test.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)});
q('#drawer-toggle').onclick=()=>{const layout=q('.layout');layout.classList.toggle('drawer-open');q('#drawer-toggle').setAttribute('aria-expanded',String(layout.classList.contains('drawer-open')))};
function inspect(row,placeId){q('#place-title').textContent=row.name||row.title;q('#drawer-name').textContent=row.name||row.title;q('#place-area').textContent=activeData.meta.areaName;q('#activity').textContent=row.inspector?.overhear||'';q('#observation').textContent=row.inspector?.observation||'';q('#actors').replaceChildren(...activeData.actors.filter(a=>a.placeId===placeId).map(a=>{const n=actorTag(a,true);n.onclick=()=>inspect(a,a.placeId);return n}))}
function testData(id){const data=structuredClone(fixture),[ref]=Object.keys(registry.templates[id].targets);data.view.templateId=id;data.view.preferredMode='template';data.places[0].atlasRef=ref;data.places[0].name=ref;data.places[0].inspector={overhear:'Dữ liệu mẫu kiểm thử giao diện.',observation:'Chọn hoặc phóng to để kiểm tra template.'};data.actors[0].inspector=data.places[0].inspector;data.hints[0].title='Hint mẫu kiểm thử';data.hints[0].inspector=data.places[0].inspector;data.meta.areaName=atlas.maps[id].title;data.actors[0].stance='walk';return data}
const EXTERIOR_TEMPLATES=new Set(['h1','h2','village-static','diagon-knockturn']);
function anchor(place){
 const targets=registry.templates[select.value].targets[place.atlasRef];
 const nodes=[...svg.querySelectorAll('[data-id]')].filter(n=>targets.includes(n.dataset.id));
 if(!nodes.length)throw Error('Không tìm thấy shape cho '+place.id);
 // SVG shape bounds are artwork, not a walkable floor. Outdoor markers use
 // the lower edge; screen-space padding keeps feet below roofs at every zoom.
 const node=nodes[0],b=node.getBBox(),matrix=svg.getScreenCTM().inverse().multiply(node.getScreenCTM());
 const corners=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>{const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(matrix)});
 const left=Math.min(...corners.map(p=>p.x)),right=Math.max(...corners.map(p=>p.x)),top=Math.min(...corners.map(p=>p.y)),bottom=Math.max(...corners.map(p=>p.y));
 return {x:(left+right)/2,y:EXTERIOR_TEMPLATES.has(select.value)?bottom:(top+bottom)/2};
}
let labels=[];
function update(){
 if(!svg)return;svg.setAttribute('viewBox',box.join(' '));const r=q('#mapmount').getBoundingClientRect(),ctm=svg.getScreenCTM();
 for(const {node,point,dx=0,dy=0,feet} of labels){
  const p=svg.createSVGPoint();p.x=point.x;p.y=point.y;const s=p.matrixTransform(ctm);s.x+=dx;s.y+=dy;
  node.style.left=(s.x-r.left)+'px';node.style.top=(s.y-r.top)+'px';
  if(feet){const m=ctm.inverse().translate(s.x,s.y+12).rotate(90).scale(.35);feet.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`)}
 }
}
function zoom(f){if(!box)return;box=[box[0]+box[2]*(1-f)/2,box[1]+box[3]*(1-f)/2,box[2]*f,box[3]*f];update()}
function render(data){assertMapData(data);if(data.view.preferredMode==='generated')throw Error('Bản test chỉ hỗ trợ template, chưa test hành lang.');const id=data.view.templateId||Object.keys(registry.templates).find(id=>data.places.every(p=>registry.templates[id].targets[p.atlasRef]));if(!atlas.maps[id])throw Error('Không có template phù hợp');for(const p of data.places)if(!registry.templates[id]?.targets[p.atlasRef])throw Error('Template thiếu mapping cho '+p.id);if(data.visibility.fogRegionIds.length)throw Error('Bản test không hỗ trợ fog; chỉ dùng dữ liệu công khai.');
 stops.forEach(stop=>stop());stops=[];labels=[];error.textContent='';activeData=structuredClone(data);select.value=id;
 const doc=new DOMParser().parseFromString(atlas.maps[id].svg,'image/svg+xml');svg=document.importNode(doc.documentElement,true);const defs=document.createElementNS(NSVG,'defs');defs.innerHTML=Object.values(atlas.vectors).join('')+shoeDefs;svg.prepend(defs);q('#mapmount').replaceChildren(svg);const overlay=el('div');overlay.className='qa-tags';q('#mapmount').append(overlay);base=atlas.maps[id].bounds||svg.getAttribute('viewBox').split(/[ ,]+/).map(Number);box=[...base];
 const points=new Map(data.places.map(p=>[p.id,anchor(p)]));
 for(const p of data.places){const ids=registry.templates[id].targets[p.atlasRef];for(const n of svg.querySelectorAll('[data-id]'))if(ids.includes(n.dataset.id)){n.setAttribute('tabindex','0');n.setAttribute('role','button');n.setAttribute('aria-label',p.name);const choose=()=>inspect(p,p.id);n.onclick=()=>{if(!moved)choose()};n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}}}}
 const offsets=new Map();for(const a of data.actors){
 const point=points.get(a.placeId),n=actorTag(a),i=offsets.get(a.placeId)||0;offsets.set(a.placeId,i+1);
 // Additional actors occupy rows below the same ground anchor, never climb
 // upwards into the artwork. Offsets and footprints remain readable on zoom.
 const count=data.actors.filter(other=>other.placeId===a.placeId).length,columns=Math.min(count,3);
 const dx=((i%3)-(columns-1)/2)*110,dy=(EXTERIOR_TEMPLATES.has(id)?38:0)+Math.floor(i/3)*55;
 n.onclick=()=>inspect(a,a.placeId);overlay.append(n);
 const feet=document.createElementNS(NSVG,'g');feet.dataset.actorFeet=a.id;feet.setAttribute('fill','#49362b');feet.style.pointerEvents='none';svg.append(feet);
 labels.push({node:n,point,dx,dy,feet});stops.push(mountFeet(feet,a.stance));
 }
 q('#quests').replaceChildren(...data.hints.map(h=>{const p=data.places.find(p=>p.id===h.placeId),n=el('button',h.title+' · '+p.name);n.className='quest';n.onclick=()=>inspect(h,h.placeId);const marker=el('button','?');marker.className='hint-marker';marker.setAttribute('aria-label',h.title);marker.onclick=n.onclick;overlay.append(marker);labels.push({node:marker,point:points.get(h.placeId),dx:65,dy:EXTERIOR_TEMPLATES.has(id)?38:0});return n}));q('#hintcount').textContent=data.hints.length+'/6';q('.quote').textContent=data.meta.quote;q('#zone').textContent=data.meta.areaName;q('.clock').textContent=data.meta.time;q('.date').textContent=data.meta.date;inspect(data.places.find(p=>p.id===data.focus.actualPlaceId),data.focus.actualPlaceId);
 svg.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1)};svg.onpointerdown=e=>{if(e.button!==0)return;moved=false;drag={x:e.clientX,y:e.clientY,box:[...box]}};svg.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4)moved=true;if(!moved)return;svg.setPointerCapture(e.pointerId);const r=svg.getBoundingClientRect(),scale=Math.min(r.width/drag.box[2],r.height/drag.box[3]);box=[drag.box[0]-dx/scale,drag.box[1]-dy/scale,drag.box[2],drag.box[3]];update()};svg.onpointerup=svg.onpointercancel=()=>drag=null;svg.onlostpointercapture=()=>drag=null;
 if(id==='h1')stops.push(mountH1Motion(svg,()=>motion&&!matchMedia('(prefers-reduced-motion: reduce)').matches));update();status.textContent='Template: '+id+' · toàn cảnh công khai';window.WIZAMAP_TEST={render,get data(){return structuredClone(activeData)},get template(){return select.value}};
}
// Capture embedded input before replacing the document body above.
async function start(){try{if(!bundleSource&&bundleURL){const source=await fetch(bundleURL);if(!source.ok)throw Error('Bundle HTTP '+source.status);bundleSource=await source.text()}atlas=embeddedAtlas;if(!atlas){const response=await fetch(ATLAS_URL);if(!response.ok)throw Error('Atlas HTTP '+response.status);const html=await response.text();const doc=new DOMParser().parseFromString(html,'text/html');const encoded=doc.querySelector('#map-data')?.textContent.trim();if(!encoded)throw Error('Atlas thiếu payload');const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));atlas=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text())}select.replaceChildren(...Object.keys(atlas.maps).map(id=>{const o=el('option',atlas.maps[id].title);o.value=id;return o}));select.onchange=()=>{try{render(testData(select.value))}catch(e){error.textContent=e.message}};render(embeddedData||testData(Object.keys(atlas.maps)[0]));new ResizeObserver(update).observe(q('#mapmount'))}catch(e){error.textContent='Không mở được template: '+e.message;status.textContent='Lỗi'}}
start();
