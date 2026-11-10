import schema from './map-data.schema.json' with {type:'json'};

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
  const errors=[];check(data,schema,'MAP_DATA',errors);if(errors.length)return {ok:false,errors};
  const ids=new Set();for(const row of [...data.places,...data.connections,...data.actors,...data.hints]){
    if(ids.has(row.id))errors.push('Duplicate public entity ID');ids.add(row.id);
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
  const places=new Set(data.places.map(p=>p.id)),visible=new Set(data.visibility.visiblePlaceIds);
  const requirePlace=(id,label)=>{if(!places.has(id))errors.push(`${label}: unknown place`)};
  requirePlace(data.focus.actualPlaceId,'PC');requirePlace(data.view.centerPlaceId,'view center');
  data.view.routePlaceIds.forEach(id=>requirePlace(id,'route'));data.visibility.visiblePlaceIds.forEach(id=>requirePlace(id,'visibility'));
  if(data.focus.selectedId!==null&&!ids.has(data.focus.selectedId))errors.push('Unknown selected entity');
  if(!visible.has(data.focus.actualPlaceId))errors.push('PC place must be visible');
  const pcs=data.actors.filter(a=>a.isPC);
  if(pcs.length!==1||pcs[0]?.id!==data.focus.pcActorId||pcs[0]?.placeId!==data.focus.actualPlaceId)errors.push('Exactly one matching PC required');
  if(data.actors.filter(a=>!a.isPC).length>10)errors.push('At most 10 NPC/group/community tags');
  for(const a of data.actors){
    requirePlace(a.placeId,'actor');if(!visible.has(a.placeId))errors.push('Actor in nonvisible place');
    if(a.positionMode!=='normal'&&!a.positionReason)errors.push('Special actor position needs a reason');
    if(a.tagType==='patrol'&&!a.onPatrol)errors.push('Patrol tag requires onPatrol');
    if(a.onPatrol&&!['prefect','patrol','caretaker'].includes(a.role))errors.push('Patrol duty requires an eligible role');
  }
  const date=new Date(data.meta.date+'T00:00:00Z');
  if(!Number.isFinite(date.valueOf())||date.toISOString().slice(0,10)!==data.meta.date)errors.push('Invalid RP date');
  if(data.questPolicy.month!==data.meta.date.slice(0,7))errors.push('Quest month must match RP month');
  if(Object.values(data.questPolicy.limits).reduce((a,b)=>a+b,0)>6)errors.push('Quest limits total exceeds 6');
  const counts={main:0,side:0,pool:0,life:0},questIds=new Set();
  for(const h of data.hints){
    requirePlace(h.placeId,'hint');if(!visible.has(h.placeId))errors.push('Hint in nonvisible place');
    if(h.packId!==data.questPolicy.packId)errors.push('Hint from another monthly pack');
    const key=h.packId+'/'+h.sourceQuestId;if(questIds.has(key))errors.push('Duplicate quest source');questIds.add(key);
    if(++counts[h.type]>data.questPolicy.limits[h.type])errors.push('Hint type quota exceeded');
  }
  const graph=new Map(data.places.map(p=>[p.id,[]]));
  for(const c of data.connections){requirePlace(c.from,'connection');requirePlace(c.to,'connection');if(c.from===c.to)errors.push('Self connection');graph.get(c.from)?.push(c.to);graph.get(c.to)?.push(c.from);}
  for(let i=1;i<data.view.routePlaceIds.length;i++)if(!graph.get(data.view.routePlaceIds[i-1])?.includes(data.view.routePlaceIds[i]))errors.push('Route has an unlinked step');
  if(data.view.routePlaceIds.length&&data.view.routePlaceIds[0]!==data.focus.actualPlaceId)errors.push('Route must begin at PC');
  // Geometry is explicitly sourced from the current scene: no inferred ground from roof/shape bounds.
  const spatial=data.view.spatial;
  if(spatial){
    for(const [label,regions] of [['walkable',spatial.walkableRegions],['blocked',spatial.blockedRegions],['occlusion',spatial.occlusionRegions]]){
      if(new Set(regions.map(r=>r.id)).size!==regions.length)errors.push('Duplicate '+label+' region ID');
      for(const region of regions)if(!region.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)))errors.push('Invalid '+label+' polygon');
    }
  }
  const regions=new Set((data.visibility.fogRegions||[]).map(r=>r.id));
  for(const id of data.visibility.fogRegionIds)if(!regions.has(id))errors.push('Fog region needs explicit geometry: '+id);
  return {ok:errors.length===0,errors};
}
export function assertMapData(data){const result=validateMapData(data);if(!result.ok)throw new Error(result.errors.join('; '));return data}
// Safe JSON for a non-executable application/json script element. Viewer uses textContent.
export function serializeMapData(data){assertMapData(data);return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'))}
