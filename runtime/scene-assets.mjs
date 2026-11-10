// Load only assets actually placed; downloads embed this cache for offline reopening.
const sceneAssetCache=new Map();
export async function loadSceneAssets(instances){
 const ids=[...new Set(instances.map(i=>i.assetId).filter(Boolean))];
 await Promise.all(ids.map(async id=>{
  if(sceneAssetCache.has(id))return;
  if(!ASSET_FILES[id])throw Error('Unknown asset '+id);
  const response=await fetch(ASSET_ROOT+ASSET_FILES[id]);
  if(!response.ok)throw Error('Cannot load asset '+id+': HTTP '+response.status);
  sceneAssetCache.set(id,await response.text());
 }));
}
function instanceSvg(instance){
 const NS='http://www.w3.org/2000/svg',n=document.createElementNS(NS,'svg');
 const {width,depth,meta,custom}=instance,b=meta?.occupancy;
 n.setAttribute('width',width);n.setAttribute('height',depth);n.setAttribute('x',-width/2);n.setAttribute('y',-depth/2);
 if(custom){
  n.setAttribute('viewBox',`0 0 ${custom.width} ${custom.height}`);
  for(const shape of custom.shapes){
   const e=document.createElementNS(NS,shape.type);
   for(const [k,v]of Object.entries(shape))if(k!=='type')e.setAttribute(k==='strokeWidth'?'stroke-width':k,v);
   n.append(e);
  }
 }else{
  const doc=new DOMParser().parseFromString(sceneAssetCache.get(instance.assetId),'image/svg+xml');
  if(doc.querySelector('parsererror'))throw Error('Invalid asset SVG '+instance.assetId);
  n.setAttribute('viewBox',b?`${b.x} ${b.y} ${b.width} ${b.height}`:meta.viewBox.join(' '));
  for(const child of doc.documentElement.children)n.append(document.importNode(child,true));
  // Namespace defs per instance, including url(#...) and href references.
  const prefix='f-'+instance.placeId.replace(/[^a-z0-9]/gi,'_')+'-'+instance.instanceId.replace(/[^a-z0-9]/gi,'_')+'-';
  const ids=new Map([...n.querySelectorAll('[id]')].map(e=>[e.id,prefix+e.id]));
  for(const e of n.querySelectorAll('*'))for(const a of [...e.attributes]){
   let v=a.value;if(a.name==='id')v=ids.get(v);
   else {v=v.replace(/url\(#([^)]*)\)/g,(m,id)=>ids.has(id)?`url(#${ids.get(id)})`:m);if(['href','xlink:href'].includes(a.name)&&v.startsWith('#')&&ids.has(v.slice(1)))v='#'+ids.get(v.slice(1));}
   e.setAttribute(a.name,v);
  }
 }
 n.style.setProperty('--base',instance.color||'#C4A57A');n.style.setProperty('--detail','#AB8966');
 n.setAttribute('preserveAspectRatio','none');n.setAttribute('overflow','visible');
 if(instance.color){for(const e of n.querySelectorAll('[data-color-fill]'))e.setAttribute('fill',instance.color);if(custom)for(const e of n.children)e.setAttribute('fill',instance.color);}
 return n;
}
export function drawFurnishings(root,instances){
 const NS='http://www.w3.org/2000/svg',layer=document.createElementNS(NS,'g');layer.dataset.furnishings='true';root.append(layer);
 const order=i=>i.on?2:i.blocking?1:0;
 for(const i of [...instances].sort((a,b)=>order(a)-order(b)||a.y-b.y)){
  const g=document.createElementNS(NS,'g');g.dataset.furnishing=i.instanceId;g.dataset.elementId=i.assetId||'custom';g.dataset.placeId=i.placeId;
  g.setAttribute('transform',`translate(${i.x} ${i.y}) rotate(${i.rotation})`);g.style.pointerEvents='none';
  const title=document.createElementNS(NS,'title');title.textContent=i.role;g.append(title,instanceSvg(i));layer.append(g);
 }
 return layer;
}
