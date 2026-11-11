import sceneAtlas from './atlas-index.json' with {type:'json'};

// One boundary adapter. Public V4 is semantic; legacy fields below are render-only.
const mapV4Normalized=new WeakSet();
const mapV4Object=v=>v&&typeof v==='object'&&!Array.isArray(v)?v:{};
const mapV4Text=v=>typeof v==='string'?v.trim():'';
const mapV4Rows=v=>Array.isArray(v)?v.filter(r=>r&&typeof r==='object'&&!Array.isArray(r)):[];
export const placeNameKey=v=>mapV4Text(v).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const mapV4Known=new Set(sceneAtlas.knownPlaceIds);
const mapV4Names=new Map();
for(const [id,name] of Object.entries(sceneAtlas.canonicalNameById)){
 for(const value of sceneAtlas.placeNamesById?.[id]||[name]){
  const key=placeNameKey(value),ids=mapV4Names.get(key)||[];
  if(!ids.includes(id))ids.push(id);mapV4Names.set(key,ids);
 }
}
export function resolveAtlasGroup(value){
 const key=placeNameKey(value);
 if(!key)return null;
 const exact=sceneAtlas.groups.find(g=>g.key===value);if(exact)return exact;
 const matches=sceneAtlas.groups.filter(g=>[g.name,...(g.aliases||[])].some(n=>placeNameKey(n)===key));
 return matches.length===1?matches[0]:null;
}
export function resolveAtlasName(value,scopeId=''){
 const direct=sceneAtlas.aliases[mapV4Text(value)]||mapV4Text(value);
 if(mapV4Known.has(direct))return direct;
 const key=placeNameKey(value);
 const ids=mapV4Names.get(key)||[];
 const local=scopeId?ids.filter(id=>sceneAtlas.scopeById?.[id]===scopeId):[];
 return local.length===1?local[0]:ids.length===1?ids[0]:null;
}
export function normalizeLayoutType(value){
 const key=mapV4Text(value).toLowerCase();
 const aliases={l:'ell',t:'tee',u:'court','ring':'cloister','courtyard':'cloister','radial':'tower'};
 const layout=aliases[key]||key;
 return ['auto','horizontal','vertical','windows','ell','tee','cross','court','cloister','tower','curved'].includes(layout)?layout:'';
}
const mapV4Kind=p=>{
 const kind=mapV4Text(p.kind||p.type).toLowerCase();
 if(['room','corridor','hall','tower','house','shop','pub','greenhouse','grounds','street','region','train','special'].includes(kind))return kind;
 if(['circulation','passage','hallway'].includes(kind))return 'corridor';
 if(['outdoor','forest','garden','lake','coast','terrain'].includes(kind))return 'grounds';
 return 'room';
};
function mapV4Inspector(row){
 const old=mapV4Object(row.inspector);
 return {overhear:mapV4Text(old.overhear),observation:mapV4Text(row.observation)||mapV4Text(old.observation)||mapV4Text(row.description)};
}
function mapV4Regions(value){
 return mapV4Rows(value).map(r=>({...r,points:mapV4Rows(r.points).filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y))})).filter(r=>r.points.length>=3);
}
export function normalizeMapData(input){
 if(input&&typeof input==='object'&&mapV4Normalized.has(input))return input;
 const raw=mapV4Object(input),meta=mapV4Object(raw.meta),view=mapV4Object(raw.view),warnings=[];
 for(const key of ['places','actors','events']){
  if(raw[key]!==undefined&&!Array.isArray(raw[key]))warnings.push(key+': expected an array; using available scene data.');
  else if(Array.isArray(raw[key])&&mapV4Rows(raw[key]).length!==raw[key].length)warnings.push(key+': ignored malformed records.');
 }
 if(raw.mapMode!==undefined&&raw.mapMode!==''&&!['template','indoor','outdoor'].includes(raw.mapMode))warnings.push('Unknown mapMode; using automatic presentation.');
 if(raw.layoutType!==undefined&&raw.layoutType!==''&&!normalizeLayoutType(raw.layoutType))warnings.push('Unknown layoutType; using an illustrative layout.');
 if(raw!==input)warnings.push('MAP_DATA is not an object; using an illustrative scene.');
 const anchor=mapV4Text(raw.atlasAnchor)||mapV4Text(view.scopeId)||mapV4Text(view.templateId);
 const custom=anchor.toLowerCase()==='custom'||Boolean(raw.customScene);
 const scope=resolveAtlasGroup(anchor)?.key||sceneAtlas.scopeById?.[resolveAtlasName(anchor)]||'';
 const places=[],byId=new Map(),localNames=new Map(),references=new Map();
 let serial=0;
 function addPlace(source,derived=false){
  const row=mapV4Object(source),rawId=mapV4Text(row.id);
  const name=mapV4Text(row.name)||rawId||'Vị trí chưa xác định';
  const canonical=custom?null:(resolveAtlasName(rawId,scope)||resolveAtlasName(name,scope));
  const id=canonical||rawId||'rp-place-'+(++serial);
  // Explicit distinct local IDs remain distinct even if their labels match.
  const nameMatch=!rawId&&!canonical?(localNames.get(placeNameKey(name))||[]):[];
  const existing=byId.get(id)||(nameMatch.length===1?byId.get(nameMatch[0]):null);
  if(existing){
   // An inferred reference must not overwrite a real RP place description.
   if(!derived)Object.assign(existing,row,{id:existing.id,name,type:mapV4Text(row.type)||mapV4Text(row.generation?.function)||existing.type,kind:mapV4Kind(row),description:mapV4Text(row.description),inspector:mapV4Inspector(row)});
   if(rawId)references.set(rawId,existing.id);
   return existing;
  }
  const generation=mapV4Object(row.generation);
  const sourceKind=canonical?sceneAtlas.placeKindById?.[canonical]:null;
  const place={...row,id,name,type:mapV4Text(row.type)||mapV4Text(generation.function)||mapV4Text(row.kind)||'room',kind:row.kind||row.type?mapV4Kind(row):sourceKind||'room',description:mapV4Text(row.description),props:Array.isArray(row.props)?row.props:[],inspector:mapV4Inspector(row)};
  if(Object.keys(generation).length)place.generation={...generation};
  places.push(place);byId.set(id,place);references.set(id,id);if(rawId)references.set(rawId,id);
  const key=placeNameKey(name),ids=localNames.get(key)||[];if(!ids.includes(id))ids.push(id);localNames.set(key,ids);
  return place;
 }
 for(const row of mapV4Rows(raw.places))addPlace(row);
 const ref=(idValue,nameValue,create=true)=>{
  const id=mapV4Text(idValue),name=mapV4Text(nameValue);
  if(references.has(id))return references.get(id);
  const matches=localNames.get(placeNameKey(name||id))||[];
  if(matches.length===1)return matches[0];
  if(matches.length>1){warnings.push('Ambiguous place name: '+(name||id));return create?addPlace({id:'rp-unresolved-'+(++serial),name:name||id},true).id:null;}
  const canonical=custom?null:(resolveAtlasName(id,scope)||resolveAtlasName(name,scope));
  if(canonical&&byId.has(canonical))return canonical;
  if(!create||!(name||id))return null;
  return addPlace({...(id?{id}:{}),name:name||sceneAtlas.canonicalNameById[canonical]||id},true).id;
 };
 const pcRows=mapV4Rows(raw.actors),pcRow=pcRows.find(a=>a.isPC===true);
 const actorPcId=pcRow?.unresolvedLocation?null:ref(pcRow?.placeId,pcRow?.placeName);
 let pcId=mapV4Text(raw.pcPlace)&&byId.get(actorPcId)?.name!==mapV4Text(raw.pcPlace)?ref('',raw.pcPlace):actorPcId;
 if(!pcId&&!pcRow)warnings.push('PC location is unspecified; no PC position is inferred.');
 if(!places.length){
  const anchorId=custom?null:resolveAtlasName(anchor,scope);
  addPlace({...(anchorId?{id:anchorId}:{}),name:sceneAtlas.canonicalNameById[anchorId]||mapV4Text(meta.areaName)||'Vị trí chưa xác định'},true);
  warnings.push('No places supplied; an illustrative fallback is required.');
 }
 if(!pcId&&pcRow)warnings.push('PC location is unspecified; no known room is assigned.');
 const actors=pcRows.map((row,i)=>{
  const isPC=row===pcRow;
  const placeId=isPC?(pcId||null):ref(row.placeId,row.placeName);
  if(!placeId&&!isPC)warnings.push('Actor location is unspecified: '+mapV4Text(row.name));
  const location=placeId||addPlace({id:'rp-unlocated',name:'Vị trí chưa xác định'},true).id;
  const house=mapV4Text(row.houseOrRole)||mapV4Text(row.tagType)||mapV4Text(row.role);
  return {...row,id:mapV4Text(row.id)||'rp-actor-'+i,name:mapV4Text(row.name)||(isPC?'PC':'Chưa rõ'),isPC,placeId:location,placeName:byId.get(location).name,...(!placeId||row.unresolvedLocation?{unresolvedLocation:true}:{}),houseOrRole:house,tagType:mapV4Text(row.tagType)||house.toLowerCase()||'unknown',entityType:mapV4Text(row.entityType)||'person',stance:row.stance==='walk'?'walk':'idle',activity:mapV4Text(row.activity),observation:mapV4Text(row.observation)||mapV4Text(row.inspector?.observation),inspector:mapV4Inspector(row),positionMode:mapV4Text(row.positionMode)||'normal',onPatrol:row.onPatrol===true};
 });
 if(pcId&&!pcRow)actors.unshift({id:'rp-pc-marker',name:'PC',isPC:true,presentationOnly:true,placeId:pcId,placeName:byId.get(pcId).name,houseOrRole:'',tagType:'unknown',entityType:'person',stance:'idle',activity:'',observation:'',inspector:{overhear:'',observation:''},positionMode:'normal'});
 if(pcRows.filter(a=>a.isPC===true).length>1)warnings.push('Multiple PC flags; the first is used as the presentation focus.');
 const eventSource=Array.isArray(raw.events)?raw.events:raw.hints;
 const events=mapV4Rows(eventSource).map((row,i)=>{
  const placeId=ref(row.placeId,row.placeName)||addPlace({id:'rp-unlocated',name:'Vị trí chưa xác định'},true).id;
  return {...row,id:mapV4Text(row.id)||'rp-event-'+i,placeId,placeName:byId.get(placeId).name,title:mapV4Text(row.title),detail:mapV4Text(row.detail)||mapV4Text(row.description)||mapV4Text(row.inspector?.observation),type:mapV4Text(row.type)||'event',inspector:mapV4Inspector({...row,observation:row.detail||row.inspector?.observation||row.description})};
 });
 const connections=mapV4Rows(raw.connections).map(c=>({...c,from:ref(c.from,'',false)||c.from,to:ref(c.to,'',false)||c.to}));
 const visibility=mapV4Object(raw.visibility),spatial=mapV4Object(view.spatial);
 const mode=['template','indoor','outdoor'].includes(raw.mapMode)?raw.mapMode:raw.customScene?.kind==='outdoor'||raw.customScene?.kind==='village'?'outdoor':view.preferredMode==='template'?'template':'';
 const normalized={schemaVersion:'4.0.0',meta:{date:mapV4Text(meta.date),time:mapV4Text(meta.time),areaName:mapV4Text(meta.areaName)||'Bản đồ cảnh hiện tại',quote:mapV4Text(meta.quote)},mapMode:mode,atlasAnchor:anchor||(custom?'custom':''),layoutType:normalizeLayoutType(raw.layoutType)||normalizeLayoutType(view.indoor?.layout),pcPlace:byId.get(pcId)?.name||'',places,actors,events,
  // Legacy viewer compatibility is derived here, never a second public contract.
  hints:events,connections,view:{...view,preferredMode:view.preferredMode||'auto',templateId:mapV4Text(view.templateId)||null,selectedId:view.selectedId||null,crop:view.crop!==false,routePlaceIds:(Array.isArray(view.routePlaceIds)?view.routePlaceIds:[]).map(id=>ref(id,'',false)).filter(Boolean),indoor:{...mapV4Object(view.indoor)},...(Object.keys(spatial).length?{spatial:{walkableRegions:mapV4Regions(spatial.walkableRegions),blockedRegions:mapV4Regions(spatial.blockedRegions),occlusionRegions:mapV4Regions(spatial.occlusionRegions)}}:{})},visibility:{...visibility,fogRegionIds:Array.isArray(visibility.fogRegionIds)?visibility.fogRegionIds:[],fogRegions:mapV4Regions(visibility.fogRegions),revealedPlaceIds:Array.isArray(visibility.revealedPlaceIds)?visibility.revealedPlaceIds:[]},...(raw.customScene?{customScene:mapV4Object(raw.customScene)}:{}),diagnostics:warnings};
 mapV4Normalized.add(normalized);return normalized;
}
// Compatibility names remain callable, but no longer veto RP or throw on schema errors.
export function validateMapData(input){const data=normalizeMapData(input);return {ok:data.diagnostics.length===0,renderable:true,errors:[],warnings:data.diagnostics};}
export function assertMapData(input){return normalizeMapData(input);}
export function mapSceneData(input){
 const data=normalizeMapData(input),pc=data.actors.find(a=>a.isPC);
 return {...data,focus:{pcActorId:pc?.id||null,actualPlaceId:pc&&!pc.unresolvedLocation?pc.placeId:null,selectedId:data.view.selectedId},visibility:{...data.visibility,visiblePlaceIds:data.places.map(p=>p.id)}};
}
export function mapPublicData(scene){
 const data=normalizeMapData(scene);
 // Preserve optional legacy information on export; none is required for V4.
 // Strip derived render state, not RP content or disambiguating references.
 const places=data.places.map(({presentationSource,anchorPrecision,...place})=>place);
 const actors=data.actors.filter(a=>!a.presentationOnly).map(({presentationOnly,...actor})=>actor);
 return {schemaVersion:'4.0.0',meta:data.meta,...(data.mapMode?{mapMode:data.mapMode}:{}),...(data.atlasAnchor?{atlasAnchor:data.atlasAnchor}:{}),...(data.layoutType?{layoutType:data.layoutType}:{}),pcPlace:data.pcPlace,places,actors,events:data.events,connections:data.connections,view:data.view,visibility:data.visibility,...(data.customScene?{customScene:data.customScene}:{})};
}
export function serializeMapData(input){return JSON.stringify(mapPublicData(input)).replace(/[<>&\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'));}
