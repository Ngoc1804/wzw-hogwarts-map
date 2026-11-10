// Runtime for one-way Preview rendering; no persistence.
for(const [id,source]of Object.entries(JSON.parse(document.querySelector('#qa-assets')?.textContent||'{}')))sceneAssetCache.set(id,source);
let templateSpatial=JSON.parse(document.querySelector('#qa-spatial')?.textContent||'{"templates":{}}');
const embeddedAtlas=document.querySelector('#qa-atlas')?JSON.parse(document.querySelector('#qa-atlas').textContent):null;
let embeddedData,inputError;
try{embeddedData=document.querySelector('#MAP_DATA')?JSON.parse(document.querySelector('#MAP_DATA').textContent):window.MAP_DATA;}catch(e){inputError=e;}
const debug=document.currentScript?.dataset.debug==='true';
let bundleSource=document.currentScript.textContent;
const bundleURL=document.currentScript.src;
const NSVG='http://www.w3.org/2000/svg';
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
let plan,geometry,visibleActors=[];
let atlas=embeddedAtlas,activeData,svg,stops=[],box,base,homeBox,drag,moved=false,motion=true;
const q=s=>document.querySelector(s);
const style=el('style');style.textContent=CSS+'\n.qa-tags{position:absolute;inset:0;pointer-events:none}.qa-tags button{position:absolute;pointer-events:auto;transform:translate(-50%,-100%)}.qa-controls{display:flex;gap:6px;flex-wrap:wrap}.qa-controls select{max-width:220px}.qa-error{color:#ffb6a5;white-space:pre-wrap}.qa-overlay{position:fixed;inset:10%;z-index:20;background:var(--paper);padding:20px;display:flex;flex-direction:column;gap:8px}.qa-overlay textarea{flex:1;min-height:150px}.qa-overlay[hidden]{display:none}.qa-tags .hint-marker{border:1px solid #8c2939;border-radius:50%;background:#eee4d1;color:#8c2939}';document.head.append(style);
document.body.innerHTML=SHELL; // Trusted checked-in shell only; RP text uses textContent.
const bar=el('div');bar.className='reviewbar qa-controls';q('.layout').before(bar);
// Keep the selected template as internal state; RP has no atlas menu.
const select={value:''};
function button(label,fn){const b=el('button',label);b.className='review-button';b.onclick=fn;bar.append(b);return b}
const status=el('span','Đang tải bản đồ…');status.setAttribute('role','status');bar.append(status);
const error=el('div');error.className='qa-error';error.setAttribute('role','alert');bar.append(error);
if(debug){
const panel=el('div');panel.className='qa-overlay';panel.hidden=true;
const editor=el('textarea');editor.setAttribute('aria-label','MAP_DATA JSON');panel.append(el('strong','MAP_DATA — chỉ dữ liệu công khai cho test'),editor);
const apply=el('button','Áp dụng');apply.onclick=async()=>{try{await render(JSON.parse(editor.value));panel.hidden=true}catch(e){error.textContent=e.message}};
const close=el('button','Đóng');close.onclick=()=>panel.hidden=true;panel.append(apply,close);document.body.append(panel);
button('MAP_DATA',()=>{editor.value=JSON.stringify(activeData||{},null,2);panel.hidden=false});
}
button('+',()=>zoom(.8));button('−',()=>zoom(1.25));button('Vừa khung',()=>{if(homeBox){box=[...homeBox];update()}});
button('Chuyển động',()=>{motion=!motion;document.body.classList.toggle('motion-off',!motion);q('#mapmount').style.setProperty('--qa-motion',motion?'running':'paused')});
button('Tải HTML',async()=>{if(!activeData)return;try{if(!bundleSource&&bundleURL){const r=await fetch(bundleURL);if(!r.ok)throw Error('Bundle HTTP '+r.status);bundleSource=await r.text();}const copy=document.documentElement.cloneNode(true);copy.querySelector('body').replaceChildren();copy.querySelectorAll('style').forEach(n=>n.remove());const payload=el('script');payload.type='application/json';payload.id='qa-atlas';payload.textContent=JSON.stringify(atlas||null).replace(/</g,'\\u003c');if(atlas)copy.querySelector('body').append(payload);const spatialPayload=el('script');spatialPayload.type='application/json';spatialPayload.id='qa-spatial';spatialPayload.textContent=JSON.stringify(templateSpatial).replace(/</g,'\\u003c');copy.querySelector('body').append(spatialPayload);const assets=el('script');assets.type='application/json';assets.id='qa-assets';assets.textContent=JSON.stringify(Object.fromEntries(sceneAssetCache)).replace(/</g,'\\u003c');copy.querySelector('body').append(assets);const data=el('script');data.type='application/json';data.id='MAP_DATA';data.textContent=serializeMapData(mapPublicData(activeData));copy.querySelector('body').append(data);const script=el('script');script.textContent=bundleSource;copy.querySelector('body').append(script);const url=URL.createObjectURL(new Blob(['<!doctype html>'+copy.outerHTML],{type:'text/html'}));const a=el('a');a.href=url;a.download='wizamap.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)}catch(e){error.textContent='Không tải được HTML: '+e.message}});
q('#drawer-toggle').onclick=()=>{const layout=q('.layout');layout.classList.toggle('drawer-open');q('#drawer-toggle').setAttribute('aria-expanded',String(layout.classList.contains('drawer-open')))};
function inspect(row,placeId){
 const place=activeData.places.find(p=>p.id===placeId);
 const at=visibleActors.filter(a=>a.placeId===placeId);
 const title=place?.name||row.name||row.title||'Vị trí';
 let action=q('#actor-action');if(!action){action=el('div');action.id='actor-action';action.className='review-status';bar.append(action)}
 action.textContent=row.stance==='walk'?'Đang đi':row.activity||'';
 q('#place-title').textContent=title;q('#drawer-name').textContent=title;
 q('#place-area').textContent=activeData.meta.areaName;
 // NGHE HÓNG: one actual action/event at the selected location.
 // Selecting a map event shows its public event description without changing
 // that event into a quest or overwriting the place's environmental observation.
 const isEvent=['event','side','hint','pool','life'].includes(row.type);
 const isActor=typeof row.isPC==='boolean'||row.entityType!==undefined||row.activity!==undefined;
 q('#activity').textContent=isEvent
  ? (row.description||row.inspector?.overhear||place?.inspector?.overhear||'')
  : isActor
   ? (row.activity||place?.inspector?.overhear||at.find(a=>a.activity)?.activity||'')
   : (place?.inspector?.overhear||at.find(a=>a.activity)?.activity||'');
 // QUAN SÁT: static visual/sensory description, never an inferred quest.
 q('#observation').textContent=place?.inspector?.observation||row.inspector?.observation||activeData.customScene?.surroundings||activeData.customScene?.description||'';
 q('#actors').replaceChildren(...at.map(a=>{const n=actorTag(a,true);n.onclick=()=>inspect(a,a.placeId);return n}));
}
const EXTERIOR_TEMPLATES=new Set(['h1','h2','village-static','diagon-knockturn']);
function anchor(place,buildingId){
 if(geometry){const p=geometry.suggestedAnchors[place.id]?.[0];if(!p)throw Error('No indoor actor anchor for '+place.id);return p}
 const targets=registry.templates[select.value].targets[place.atlasRef];
 if(buildingId&&!targets.includes(buildingId))throw Error('Building ID does not belong to '+place.id);
 const nodes=[...svg.querySelectorAll('[data-id]')].filter(n=>buildingId?n.dataset.id===buildingId:targets.includes(n.dataset.id));
 if(!nodes.length)throw Error('Không tìm thấy shape cho '+place.id);
 // SVG shape bounds are artwork, not a walkable floor. Outdoor markers use
 // the lower edge; screen-space padding keeps feet below roofs at every zoom.
 const node=nodes[0],b=node.getBBox(),matrix=svg.getScreenCTM().inverse().multiply(node.getScreenCTM());
 const corners=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>{const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(matrix)});
 const left=Math.min(...corners.map(p=>p.x)),right=Math.max(...corners.map(p=>p.x)),top=Math.min(...corners.map(p=>p.y)),bottom=Math.max(...corners.map(p=>p.y));
 const roofNodes=[...node.querySelectorAll('[data-shade-surface="roof"],[data-layer="roof"]')];
 let roof={x:(left+right)/2,y:top};
 if(roofNodes.length){
  const pts=roofNodes.flatMap(n=>{const b=n.getBBox(),m=svg.getScreenCTM().inverse().multiply(n.getScreenCTM());return [[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m))});
  roof={x:(Math.min(...pts.map(p=>p.x))+Math.max(...pts.map(p=>p.x)))/2,y:Math.min(...pts.map(p=>p.y))};
 }
 return {x:(left+right)/2,y:EXTERIOR_TEMPLATES.has(select.value)?top+(bottom-top)*.3:(top+bottom)/2,left,right,top,bottom,roof};
}
let labels=[];
function update(){
 if(!svg)return;svg.setAttribute('viewBox',box.join(' '));const r=q('#mapmount').getBoundingClientRect(),ctm=svg.getScreenCTM(),occupied=[];
 for(const {node,point,labelPoint=point,dx=0,dy=0,feet} of labels){
  const inFog=pointInFog(point,activeData.visibility);node.hidden=inFog;if(feet)feet.style.display=inFog?'none':'';
  const p=svg.createSVGPoint();p.x=labelPoint.x;p.y=labelPoint.y;const s=p.matrixTransform(ctm);s.x+=dx;s.y+=dy;
  const size=node.getBoundingClientRect(),half=Math.min(size.width/2,r.width/2),height=size.height;
  let x=Math.max(half,Math.min(r.width-half,s.x-r.left)),y=Math.max(height+4,Math.min(r.height-4,s.y-r.top));
  if(node.classList.contains('ribbon')&&!inFog){
   const candidates=[];for(let step=0;step<labels.length+1;step++)for(const sign of step?[-1,1]:[1])for(const cx of [x,half+4,r.width-half-4]){
    const cy=y+sign*step*(height+4);if(cy<height+4||cy>r.height-4)continue;
    const rect={left:cx-half,right:cx+half,top:cy-height,bottom:cy};
    if(!occupied.some(b=>rect.left<b.right+3&&rect.right>b.left-3&&rect.top<b.bottom+3&&rect.bottom>b.top-3))candidates.push({cx,cy,rect,score:Math.abs(cx-x)+Math.abs(cy-y)});
   }
   candidates.sort((a,b)=>a.score-b.score);if(candidates.length){x=candidates[0].cx;y=candidates[0].cy;occupied.push(candidates[0].rect)}
  }
  node.style.left=x+'px';node.style.top=y+'px';
  if(feet){const ground=svg.createSVGPoint();ground.x=point.x;ground.y=point.y;const screen=ground.matrixTransform(ctm);const m=ctm.inverse().translate(screen.x,screen.y).rotate(90).scale(.44);feet.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`)}
 }
}
function zoom(f){if(!box)return;box=[box[0]+box[2]*(1-f)/2,box[1]+box[3]*(1-f)/2,box[2]*f,box[3]*f];update()}
async function renderScene(data){plan=resolveMap(data);data=mapSceneData(data);
 if(plan.mode==='template')await loadAtlas();
 if(EXTERIOR_TEMPLATES.has(plan.templateId)&&!data.view.spatial&&!templateSpatial.templates[plan.templateId]){
  const response=await fetch(SPATIAL_URL);if(!response.ok)throw Error('Spatial HTTP '+response.status);templateSpatial=await response.json();
 }
 const nextGeometry=plan.mode==='generated'?buildGeometry(plan,plan.indoor||data.view.indoor||{}):null;
 if(nextGeometry)await loadSceneAssets(nextGeometry.furnishingInstances);
 // Apply the atlas aliases after validating RP input, never add invisible places.
 data={...data,places:plan.places,
  actors:data.actors.map(a=>({...a,placeId:canonicalPlaceId(a.placeId)})),
  hints:data.hints.map(h=>({...h,placeId:canonicalPlaceId(h.placeId)})),
  focus:{...data.focus,actualPlaceId:canonicalPlaceId(data.focus.actualPlaceId)},
  visibility:{...data.visibility,visiblePlaceIds:plan.places.map(p=>p.id)},
  view:{...data.view,routePlaceIds:data.view.routePlaceIds.map(canonicalPlaceId)}
 };
 // Export exactly the public rendered scene, including canonical references.
 const sceneIds=new Set(data.places.map(p=>p.id));
  // The map shows the PC's selected locality, not unrelated actor/event records.
  data.actors=data.actors.filter(a=>sceneIds.has(a.placeId));
  data.hints=data.hints.filter(h=>sceneIds.has(h.placeId));
  if(!data.actors.some(a=>a.isPC))throw Error('PC not in resolved map locality');
 data.connections=data.connections.filter(c=>sceneIds.has(canonicalPlaceId(c.from))&&sceneIds.has(canonicalPlaceId(c.to))).map(c=>({...c,from:canonicalPlaceId(c.from),to:canonicalPlaceId(c.to)}));
 data.view.routePlaceIds=data.view.routePlaceIds.filter(id=>sceneIds.has(id));
 if(data.focus.selectedId)data.focus.selectedId=canonicalPlaceId(data.focus.selectedId);
 data.view.selectedId=data.focus.selectedId;
 const id=plan.templateId;
 const exterior=EXTERIOR_TEMPLATES.has(id);
 const spatial=data.view.spatial||(exterior?templateSpatial.templates[id]:null);
 if(exterior&&spatial){const {walkableRegions,blockedRegions,occlusionRegions}=spatial;data={...data,view:{...data.view,spatial:{walkableRegions,blockedRegions,occlusionRegions}}};}



 stops.forEach(stop=>stop());stops=[];labels=[];visibleActors=[];error.textContent='';activeData=structuredClone(data);select.value=id;
 geometry=null;
 if(plan.mode==='generated'){
 geometry=nextGeometry;
 svg=document.createElementNS(NSVG,'svg');svg.setAttribute('viewBox',geometry.bounds.join(' '));
 drawIndoor(svg,geometry,placeId=>{
  const p=data.places.find(row=>row.id===placeId);
  if(p&&!pointInFog(geometry.suggestedAnchors[placeId]?.[0],data.visibility))inspect(p,p.id);
 });
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
 const floors=collectFloorSurfaces(svg);
 for(const a of data.actors)if(!geometry&&a.position&&!(exterior&&a.environment==='inside')&&(!floors.contains(a.position)&&!surfaceAllowed(a.position,spatial)||pointInRegions(a.position,spatial?.blockedRegions)))throw Error('Actor '+a.id+': position is outside floor or inside blocked area');
 const points=new Map(data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id)).map(p=>[p.id,anchor(p)]));
 const actorPositions=new Map(),actorCounts=new Map(),actorRoofs=new Map(),labelOnlyActors=new Set();
 for(const a of data.actors){
  const i=actorCounts.get(a.placeId)||0;actorCounts.set(a.placeId,i+1);
  const suggested=geometry?.suggestedAnchors[a.placeId];
  if(exterior&&a.environment==='inside')actorRoofs.set(a.id,anchor(data.places.find(p=>p.id===a.placeId),a.buildingId));
  if(geometry&&!a.position&&!suggested?.length)throw Error('No safe actor position in '+a.placeId);
  let point;
  if(geometry)point=indoorActorPoint(geometry,a.placeId,a.position||suggested[i%suggested.length]);
  else if(exterior&&a.environment==='inside')point=actorGroundPoint(a,actorRoofs.get(a.id));
  else {
   if(exterior&&!['inside','outside'].includes(a.environment))throw Error('Actor '+a.id+': environment must be inside or outside for exterior template');
   point=a.position||nearestFloorPoint({origin:points.get(a.placeId),occupied:[...actorPositions.values()],contains:p=>(floors.contains(p)||surfaceAllowed(p,spatial))&&!pointInRegions(p,spatial?.blockedRegions)});
   if(!point&&a.environment==='inside'){point=points.get(a.placeId);labelOnlyActors.add(a.id);}
   if(!point)throw Error('Actor '+a.id+': no verified floor near '+a.placeId+'; provide scene spatial/position');
  }
  actorPositions.set(a.id,point);
 }
 // Do not expose fogged actors/hints through ribbons, navigation or inspector.
 visibleActors=data.actors.filter(a=>!pointInFog(actorPositions.get(a.id),data.visibility));
 if(!visibleActors.some(a=>a.isPC))throw Error('PC position is inside fog; scene visibility is inconsistent');
 const visibleHints=data.hints.filter(h=>!pointInFog(points.get(h.placeId),data.visibility));
  // Group/individual identity is supplied by AI; GitHub never invents a group.
  const actualGroups=new Set(visibleActors.filter(a=>a.entityType==='group'&&a.groupId).map(a=>a.groupId));
  const marked=new Set(),labelActors=[...visibleActors.filter(a=>a.isPC)];
  const ranked=visibleActors.filter(a=>!a.isPC).sort((a,b)=>(b.priority||0)-(a.priority||0)||a.id.localeCompare(b.id));
  for(const a of ranked){
    if(labelActors.length>=11)break;
    if(a.groupId&&a.entityType!=='group'&&actualGroups.has(a.groupId))continue;
    const key=(a.groupId&&a.entityType==='group'?'group:'+a.groupId:'name:'+a.name.trim().toLocaleLowerCase('vi')+':'+a.placeId);
    if(marked.has(key))continue;
    marked.add(key);labelActors.push(a);
  }
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
 // Bind each building once. Bbox is used only for label/occlusion display, never walkability.
 for(const p of data.places){
  if(!exterior)continue;
  const targets=registry.templates[id].targets[p.atlasRef]||[];
  for(const target of svg.querySelectorAll('[data-id]'))if(targets.includes(target.dataset.id)&&!occluders.some(c=>c.target===target)){
   const b=target.getBBox(),m=svg.getScreenCTM().inverse().multiply(target.getScreenCTM());
   const inverse=m.inverse();occluders.push({id:target.dataset.id,target,contains:pt=>{const q=new DOMPoint(pt.x,pt.y).matrixTransform(inverse);return q.x>=b.x&&q.x<=b.x+b.width&&q.y>=b.y&&q.y<=b.y+b.height}});
  }
 }
 const coverController=occlusionController(occluders);stops.push(()=>coverController.dispose());
 for(const c of occluders){
  const key='building:'+c.id;
  let selected=false;const enter=()=>coverController.setTargets(key,[c.target]),leave=()=>coverController.clear(key);
  const tap=()=>{selected=!selected;selected?coverController.setTargets('tap:'+key,[c.target]):coverController.clear('tap:'+key)};
  c.target.addEventListener('click',tap);c.target.addEventListener('mouseenter',enter);c.target.addEventListener('mouseleave',leave);c.target.addEventListener('focus',enter);c.target.addEventListener('blur',leave);
  stops.push(()=>{c.target.removeEventListener('click',tap);c.target.removeEventListener('mouseenter',enter);c.target.removeEventListener('mouseleave',leave);c.target.removeEventListener('focus',enter);c.target.removeEventListener('blur',leave)});
 }
 const offsets=new Map();for(const a of labelActors){
 const point=actorPositions.get(a.id),n=actorTag(a),i=offsets.get(a.placeId)||0;offsets.set(a.placeId,i+1);
 // Additional actors occupy rows below the same ground anchor, never climb
 // upwards into the artwork. Offsets and footprints remain readable on zoom.
 const count=labelActors.filter(other=>other.placeId===a.placeId).length,columns=Math.min(count,3);
 const rowColumns=Math.min(columns,Math.max(1,Math.floor(q('#mapmount').clientWidth/130)));
 const dx=((i%rowColumns)-(rowColumns-1)/2)*110,dy=-(Math.floor(i/rowColumns)*34)-10;
 const insideBuilding=exterior&&a.environment==='inside';
 const labelPoint=insideBuilding?actorRoofs.get(a.id).roof:point;
 const coverPoint=a.environment==='outside'?point:null;
 const hoverKey='hover:'+a.id,selectedKey='selected:'+a.id;
 n.onmouseenter=()=>{if(coverPoint)coverController.set(hoverKey,coverPoint)};
 n.onmouseleave=()=>coverController.clear(hoverKey);
 n.onfocus=n.onmouseenter;n.onblur=n.onmouseleave;
 n.onclick=()=>{if(n.classList.contains('selected')){n.classList.remove('selected');coverController.clear(selectedKey);return;}for(const b of overlay.querySelectorAll('.selected')){b.classList.remove('selected');coverController.clear('selected:'+b.dataset.actorId)}n.classList.add('selected');if(coverPoint)coverController.set(selectedKey,coverPoint);inspect(a,a.placeId)};
 n.dataset.actorId=a.id;
 overlay.append(n);
 const feet=document.createElementNS(NSVG,'g');feet.dataset.actorFeet=a.id;feet.setAttribute('fill','#8C2939');feet.setAttribute('stroke','#FFF0D4');feet.setAttribute('stroke-width','.9');feet.setAttribute('paint-order','stroke fill');feet.style.pointerEvents='none';svg.append(feet);
 if(labelOnlyActors.has(a.id)||(a.environment==='inside'&&EXTERIOR_TEMPLATES.has(id))){feet.remove();labels.push({node:n,point,labelPoint,dx,dy})}else{labels.push({node:n,point,dx,dy,feet});stops.push(mountFeet(feet,a.stance));}
 }
 q('#quests').replaceChildren(...visibleHints.map(h=>{const p=data.places.find(p=>p.id===h.placeId),n=el('button',h.title+' · '+p.name);n.className='quest';n.onclick=()=>inspect(h,h.placeId);const marker=el('button','?');marker.className='hint-marker';marker.setAttribute('aria-label',h.title);marker.onclick=n.onclick;overlay.append(marker);labels.push({node:marker,point:points.get(h.placeId),dx:65,dy:EXTERIOR_TEMPLATES.has(id)?38:0});return n}));q('#hintcount').textContent=visibleHints.length+'/5';q('.quote').textContent=data.meta.quote||'';q('#zone').textContent=data.meta.areaName;q('.clock').textContent=data.meta.time;q('.date').textContent=data.meta.date;inspect(visibleActors.find(a=>a.isPC),data.focus.actualPlaceId);
 const selected=[...data.places.filter(p=>!pointInFog(points.get(p.id),data.visibility)),...visibleActors,...visibleHints].find(row=>row.id===data.focus.selectedId);
 if(selected)inspect(selected,selected.placeId||selected.id);
 if(data.view.crop!==false&&points.size){const viewport=q('#mapmount').getBoundingClientRect();const extent=geometry?(()=>{const [x,y,w,h]=geometry.bounds;return [{left:x,top:y,right:x+w,bottom:y+h}]})():[...points.values(),...visibleActors.map(a=>a.position||points.get(a.placeId)),...data.view.routePlaceIds.filter(id=>points.has(id)).map(id=>points.get(id))];box=fitSceneBounds(base,extent,{width:viewport.width,height:viewport.height},geometry?0:55);}
 homeBox=[...box];
 for(const region of data.visibility.fogRegions||[]){if(!data.visibility.fogRegionIds.includes(region.id))continue;const fog=document.createElementNS(NSVG,'polygon');fog.setAttribute('points',region.points.map(p=>`${p.x},${p.y}`).join(' '));fog.setAttribute('fill','#303238');fog.setAttribute('opacity','.94');fog.setAttribute('pointer-events','all');fog.setAttribute('aria-hidden','true');svg.append(fog);}
 svg.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1)};svg.onpointerdown=e=>{if(e.button!==0)return;moved=false;drag={x:e.clientX,y:e.clientY,box:[...box]}};svg.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4)moved=true;if(!moved)return;svg.setPointerCapture(e.pointerId);const r=svg.getBoundingClientRect(),scale=Math.min(r.width/drag.box[2],r.height/drag.box[3]);box=[drag.box[0]-dx/scale,drag.box[1]-dy/scale,drag.box[2],drag.box[3]];update()};svg.onpointerup=svg.onpointercancel=()=>drag=null;svg.onlostpointercapture=()=>drag=null;
 let pinch;svg.addEventListener('touchstart',e=>{if(e.touches.length===2){drag=null;pinch={distance:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),box:[...box]}}},{passive:true});svg.addEventListener('touchmove',e=>{if(pinch&&e.touches.length===2){e.preventDefault();const distance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);const f=pinch.distance/Math.max(1,distance),b=pinch.box;box=[b[0]+b[2]*(1-f)/2,b[1]+b[3]*(1-f)/2,b[2]*f,b[3]*f];update()}},{passive:false});svg.addEventListener('touchend',()=>pinch=null);
 if(id==='h1')stops.push(mountH1Motion(svg,()=>motion&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches));update();status.textContent=debug?(geometry?'Mặt bằng dựng trong Preview':'Template: '+id):'Bản đồ cảnh hiện tại';if(debug)window.WIZAMAP_TEST={render,canStand(p){return (collectFloorSurfaces(svg).contains(p)||surfaceAllowed(p,activeData.view.spatial))&&!pointInRegions(p,activeData.view.spatial?.blockedRegions)&&!geometry?.exclusionZones.some(r=>pointInPolygon(p,r.points))},get data(){return structuredClone(mapPublicData(activeData))},get template(){return select.value},get generatedGeometry(){return geometry?structuredClone({floorPolygons:geometry.floorPolygons,actorZones:geometry.actorZones,furnishingInstances:geometry.furnishingInstances,exclusionZones:geometry.exclusionZones,suggestedAnchors:geometry.suggestedAnchors}):null}};
}
async function render(data){
 try{return await renderScene(data)}catch(e){
  stops.forEach(stop=>stop());stops=[];labels=[];visibleActors=[];svg=null;activeData=null;
  q('#mapmount').replaceChildren();q('#actors').replaceChildren();q('#quests').replaceChildren();
  for(const selector of ['#place-title','#place-area','#drawer-name','#activity','#observation','#hintcount','#zone','.quote','.clock','.date','#actor-action']){const n=q(selector);if(n)n.textContent='';}
  error.textContent='Không mở được bản đồ: '+e.message;status.textContent='Lỗi';throw e;
 }
}
// Capture embedded input before replacing the document body above.
async function loadAtlas(){
 if(atlas)return;
 const response=await fetch(ATLAS_URL);if(!response.ok)throw Error('Atlas HTTP '+response.status);
 const doc=new DOMParser().parseFromString(await response.text(),'text/html');
 const encoded=doc.querySelector('#map-data')?.textContent.trim();if(!encoded)throw Error('Atlas thiếu payload');
 const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
 atlas=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text());
}
async function start(){try{
 if(inputError)throw Error('MAP_DATA JSON: '+inputError.message);
 if(!embeddedData)throw Error('Thiếu MAP_DATA. Hãy cung cấp dữ liệu RP.');
 await render(embeddedData);new ResizeObserver(update).observe(q('#mapmount'));
}catch(e){error.textContent='Không mở được Preview: '+e.message;status.textContent='Lỗi'}}
start();
