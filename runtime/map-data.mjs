import schema from './map-data.schema.json' with {type:'json'};
import sceneAtlas from './atlas-index.json' with {type:'json'};

// Resolve unique human-readable Atlas names before applying the strict public schema.
const atlasKnownIds=new Set(sceneAtlas.knownPlaceIds);
const atlasLockedIds=new Set([...sceneAtlas.lockedPlaceIds,...sceneAtlas.cccNonRoomPlaceIds]);
const exactPlaceNames=new Map();
const nameKey=value=>typeof value==='string'?value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim():'';
function addName(name,id){
 const key=nameKey(name);if(!key)return;
 if(!exactPlaceNames.has(key))exactPlaceNames.set(key,[]);
 if(!exactPlaceNames.get(key).includes(id))exactPlaceNames.get(key).push(id);
}
for(const [id,canonicalName] of Object.entries(sceneAtlas.canonicalNameById))
 for(const name of sceneAtlas.placeNamesById?.[id]||[canonicalName])addName(name,id);
// Only verified public translations; never use substring guesses to unlock a place.
for(const [name,id] of Object.entries({
 'Potions Classroom':'HOG-HMNGC-N-01',
 'Snape\'s Office':'HOG-HMNGC-N-02',
 'Ingredient Store':'HOG-HMNGC-N-03',
 'Potions Prep Room':'HOG-HMNGC-N-04',
 'Slytherin Common Room':'P-80ce1ea13c2632'
}))if(atlasKnownIds.has(id))addName(name,id);
function resolveName(value,scopeId){
 if(typeof value!=='string')return null;
 const direct=sceneAtlas.aliases[value]||value;
 if(atlasKnownIds.has(direct))return direct;
 // Generic room labels have no unique owner across RP houses/castles.
 // Never promote a locally described bedroom, kitchen or corridor to a canonical AU room.
 if(/^(phong (ngu|khach|tam|hoc|chinh)|thu vien|bep|kho|hanh lang|san trong|vuon)$/.test(nameKey(value)))return null;
 const matches=exactPlaceNames.get(nameKey(value))||[];
 if(matches.length===1)return matches[0];
 if(scopeId){const local=matches.filter(id=>sceneAtlas.scopeById[id]===scopeId);if(local.length===1)return local[0];}
 return null;
}
function machineId(value){
 if(typeof value!=='string')return value;
 if(/^[A-Za-z0-9][A-Za-z0-9._:/_-]{0,127}$/.test(value))return value;
 const slug=nameKey(value).replace(/ /g,'-').slice(0,110);
 return 'rp-'+(slug||'spot');
}
function resolvePublicPlaceNames(data){
 if(!Array.isArray(data.places))return data;
 const scopeId=data.view?.scopeId;
 const aliases=new Map();
 for(const p of data.places){
  if(!p||typeof p!=='object'||typeof p.id!=='string')continue;
  const known=resolveName(p.id,scopeId)||resolveName(p.name,scopeId);
  aliases.set(p.id,known||machineId(p.id));
 }
 const id=value=>aliases.get(value)||resolveName(value,scopeId)||machineId(value);
 const mapRows=(rows,fn)=>Array.isArray(rows)?rows.map(row=>row&&typeof row==='object'?fn(row):row):rows;
 return {...data,
  places:mapRows(data.places,p=>({...p,id:id(p.id)})),
  actors:mapRows(data.actors,a=>({...a,placeId:id(a.placeId)})),
  hints:mapRows(data.hints,h=>({...h,placeId:id(h.placeId)})),
  connections:mapRows(data.connections,c=>({...c,from:id(c.from),to:id(c.to)})),
  ...(data.visibility&&typeof data.visibility==='object'?{visibility:{...data.visibility,
   ...(Array.isArray(data.visibility.revealedPlaceIds)?{revealedPlaceIds:data.visibility.revealedPlaceIds.map(id)}:{})}}:{}),
  ...(data.view&&typeof data.view==='object'&&!Array.isArray(data.view)?{view:{...data.view,
   ...(typeof data.view.nearPlace==='string'?{nearPlace:resolveName(data.view.nearPlace,scopeId)||data.view.nearPlace}:{}),
   ...(data.view.selectedId!==undefined&&data.view.selectedId!==null?{selectedId:id(data.view.selectedId)}:{}),
   ...(Array.isArray(data.view.routePlaceIds)?{routePlaceIds:data.view.routePlaceIds.map(id)}:{})}}:{})};
}

// Apply only declared presentation defaults. Never infer RP facts or visibility.
export function normalizeMapData(value, rule=schema) {
  if(rule.$ref)rule=schema.$defs[rule.$ref.split('/').at(-1)];
  if(value===undefined&&Object.hasOwn(rule,'default'))value=structuredClone(rule.default);
  if(Array.isArray(value))return value.map(v=>normalizeMapData(v,rule.items||{}));
  if(value&&typeof value==='object'){
    const out={...value};
    for(const [key,child] of Object.entries(rule.properties||{})){
      const normalized=normalizeMapData(value[key],child);
      if(normalized!==undefined)out[key]=normalized;
    }
    return rule===schema?resolvePublicPlaceNames(out):out;
  }
  return value;
}

function check(value, rule, path, errors) {
  if(rule.$ref)rule=schema.$defs[rule.$ref.split('/').at(-1)];
  if('const' in rule && value!==rule.const)errors.push(`${path}: invalid constant`);
  if(rule.type){const types=[rule.type].flat(),actual=value===null?'null':Array.isArray(value)?'array':typeof value;
    if(!types.some(t=>t===actual||(t==='integer'&&Number.isInteger(value)))){errors.push(`${path}: wrong type`);return;}}
  if(value===null)return;
  if(rule.enum&&!rule.enum.includes(value))errors.push(`${path}: invalid enum`);
  if(typeof value==='string'){
    if(rule.minLength&&value.length<rule.minLength)errors.push(`${path}: empty string`);
    if(rule.maxLength&&value.length>rule.maxLength)errors.push(`${path}: string too long`);
    if(rule.pattern&&!new RegExp(rule.pattern).test(value))errors.push(`${path}: invalid format`);
  }
  if(typeof value==='number'&&(!Number.isFinite(value)||value<(rule.minimum??-Infinity)||value>(rule.maximum??Infinity)))errors.push(`${path}: number outside bounds`);
  if(Array.isArray(value)){
    if(value.length<(rule.minItems??0)||value.length>(rule.maxItems??Infinity))errors.push(`${path}: wrong array size`);
    if(rule.uniqueItems&&new Set(value.map(v=>JSON.stringify(v))).size!==value.length)errors.push(`${path}: duplicate item`);
    value.forEach((v,i)=>check(v,rule.items,`${path}[${i}]`,errors));
  }else if(typeof value==='object'){
    for(const k of rule.required||[])if(!Object.hasOwn(value,k))errors.push(`${path}.${k}: required`);
    for(const k of Object.keys(value)){
      if(rule.properties?.[k])check(value[k],rule.properties[k],`${path}.${k}`,errors);
      else if(rule.additionalProperties===false)errors.push(`${path}.${k}: unknown field`);
    }
  }
}
export function validateMapData(data) {
  data=normalizeMapData(data);
  const errors=[];check(data,schema,'MAP_DATA',errors);if(errors.length)return {ok:false,errors};
  for(const p of data.places)if(sceneAtlas.retiredPlaceIds?.includes(p.id))errors.push('Retired Atlas reference: '+p.id);
  const ids=new Set();for(const row of [...data.places,...data.connections,...data.actors,...data.hints]){
    if(row.id!==undefined){if(ids.has(row.id))errors.push('Duplicate public entity ID');ids.add(row.id);}
  }
  for(const place of data.places)for(const item of place.generation?.furnishings||[]){
    if(item.custom){
      if(item.assetId)errors.push('Choose assetId or custom drawing');
      for(const shape of item.custom.shapes){
        const fields=shape.type==='rect'?['width','height']:shape.type==='ellipse'?['rx','ry']:['d'];
        for(const field of fields)if(!shape[field])errors.push('Custom '+shape.type+' needs '+field);
      }
      const s=item.custom.surface;
      if(s&&(!s.width||!s.height||s.x+s.width>item.custom.width||s.y+s.height>item.custom.height))errors.push('Custom support surface outside asset');
    }
  }
  const places=new Set(data.places.map(p=>p.id));
  const requirePlace=(id,label)=>{if(!places.has(id))errors.push(`${label}: unknown place`)};
  const pcs=data.actors.filter(a=>a.isPC);
  if(data.customScene){
    const pcId=pcs[0]?.placeId;
    if(pcId&&atlasKnownIds.has(sceneAtlas.aliases[pcId]||pcId))errors.push('customScene is only for user-created locations outside the canonical atlas');
    if(data.view.templateId)errors.push('customScene cannot request a fixed template');
    for(const p of data.places){
      const id=sceneAtlas.aliases[p.id]||p.id;
      if(atlasKnownIds.has(id))errors.push('customScene cannot replace an atlas place: '+p.id);
      const matches=exactPlaceNames.get(nameKey(p.name))||[];
      if(matches.length===1&&atlasKnownIds.has(matches[0]))errors.push('customScene name matches a canonical atlas place: '+p.name);
    }
  }
  for(const p of data.places)if(atlasLockedIds.has(sceneAtlas.aliases[p.id]||p.id))errors.push('Atlas location is locked: '+p.id);
  if(pcs.length!==1)errors.push('Exactly one PC required');
  if(data.actors.filter(a=>!a.isPC).length>50)errors.push('At most 50 public actor records; only 10 NPC labels are rendered');
  const selected=data.view.selectedId;
  if(selected!==null&&!ids.has(selected))errors.push('Unknown selected entity');
  for(const a of data.actors){
    requirePlace(a.placeId,'actor');
    if(a.positionMode!=='normal'&&!a.positionReason)errors.push('Special actor position needs a reason');
    if(a.tagType==='patrol'&&!a.onPatrol)errors.push('Patrol tag requires onPatrol');
    if(a.onPatrol&&!['prefect','patrol','caretaker'].includes(a.role))errors.push('Patrol duty requires an eligible role');
  }
  data.view.routePlaceIds.forEach(id=>requirePlace(id,'route'));
  const date=new Date(data.meta.date+'T00:00:00Z');
  if(!Number.isFinite(date.valueOf())||date.toISOString().slice(0,10)!==data.meta.date)errors.push('Invalid RP date');
  const counts={side:0,hint:0,pool:0,life:0,event:0};
  for(const h of data.hints){requirePlace(h.placeId,'hint');counts[h.type]++;}
  if(counts.side>2||counts.hint>1||counts.pool+counts.life>2||data.hints.length>5)errors.push('Map event/hint display limit: 5 total, with 2 side, 1 hint, 2 pool/life');
  const graph=new Map(data.places.map(p=>[p.id,[]]));
  for(const c of data.connections){requirePlace(c.from,'connection');requirePlace(c.to,'connection');if(c.from===c.to)errors.push('Self connection');graph.get(c.from)?.push(c.to);graph.get(c.to)?.push(c.from);}
  for(let i=1;i<data.view.routePlaceIds.length;i++)if(!graph.get(data.view.routePlaceIds[i-1])?.includes(data.view.routePlaceIds[i]))errors.push('Route has an unlinked step');
  if(data.view.routePlaceIds.length&&data.view.routePlaceIds[0]!==pcs[0]?.placeId)errors.push('Route must begin at PC');
  // Geometry is explicitly sourced from the current scene: no inferred ground from roof/shape bounds.
  const spatial=data.view.spatial;
  if(spatial){
    for(const [label,regions] of [['walkable',spatial.walkableRegions],['blocked',spatial.blockedRegions],['occlusion',spatial.occlusionRegions]]){
      if(new Set(regions.map(r=>r.id)).size!==regions.length)errors.push('Duplicate '+label+' region ID');
      for(const region of regions)if(!region.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)))errors.push('Invalid '+label+' polygon');
    }
  }
  for(const id of data.visibility.revealedPlaceIds||[])if(atlasLockedIds.has(sceneAtlas.aliases[id]||id))errors.push('Cannot reveal locked atlas location: '+id);
  const regions=new Set((data.visibility.fogRegions||[]).map(r=>r.id));
  for(const id of data.visibility.fogRegionIds)if(!regions.has(id))errors.push('Fog region needs explicit geometry: '+id);
  return {ok:errors.length===0,errors};
}
export function assertMapData(data){const result=validateMapData(data);if(!result.ok)throw new Error(result.errors.join('; '));return normalizeMapData(data)}
// Safe JSON for a non-executable application/json script element. Viewer uses textContent.
export function serializeMapData(data){assertMapData(data);return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'))}

// Derived render-only state, never requested from Gemini or exported as input.
export function mapSceneData(input){
 const data=assertMapData(input),pc=data.actors.find(a=>a.isPC);
 return {...data,focus:{pcActorId:pc.id,actualPlaceId:pc.placeId,selectedId:data.view.selectedId},
  visibility:{...data.visibility,visiblePlaceIds:data.places.map(p=>p.id)}};
}
export function mapPublicData(scene){
 const {focus,...data}=scene;
 const {visiblePlaceIds,...visibility}=data.visibility;
 return {...data,visibility};
}
