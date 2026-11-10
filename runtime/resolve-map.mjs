import {exteriorContextFor} from './outdoor.mjs';
import registry from './templates.json' with {type:'json'};
import {mapSceneData} from './map-data.mjs';
import {
 canonicalPlaceId,isKnownAtlasPlace,verifiedAtlasBinding,
 generatedSceneOptions,canonicalPlaceFunction,isCanonicalCorridor,
 assertAllowedScene,assertGeneratedScene,resolveAtlasLocality,
 atlasPlaceName,atlasPlaceKind,listVerifiedTemplateBindings,atlasVersion,isLockedAtlasPlace,sceneTemplateOwners,resolveRelativeSceneScope
} from './atlas-scene.mjs';

const TEMPLATE_SPECIFICITY={
 'gryffindor-common':120,'ravenclaw-common':120,'hufflepuff-common':120,'slytherin-common':120,
 hall:115,'ministry-8-10':115,ministry2:110,express:110,'pitch-static':110,
 'diagon-knockturn':108,'village-static':108,h2:45,h1:10
};
const technical=(p,id,templates)=>{
 const owners=sceneTemplateOwners[canonicalPlaceId(p.id)];
 if(isKnownAtlasPlace(p.id)&&(!owners||!owners.includes(id)))return null;
 const candidate=verifiedAtlasBinding(p.id,id)||verifiedAtlasBinding(p.atlasRef||'',id)||p.atlasRef;
 return candidate&&templates[id]?.targets[candidate]?.length?candidate:null;
};
const placeWithGeneration=(p)=>{
 const id=canonicalPlaceId(p.id);
 const kind=isKnownAtlasPlace(id)?atlasPlaceKind(id):p.kind;
 return {...p,id,kind,generation:p.generation||{
  function:canonicalPlaceFunction(id)|| (kind==='corridor'?'circulation':'study'),
  shape:kind==='corridor'?'straight':'rectangle'
 }};
};

export function resolveMap(input,templates=registry.templates){
 const data=mapSceneData(input);
 const pc=data.actors.find(a=>a.isPC);
 const pcId=canonicalPlaceId(pc.placeId);
 const listed=data.places.map(p=>({...p,id:canonicalPlaceId(p.id)}));
 if(new Set(listed.map(p=>p.id)).size!==listed.length)throw Error('Duplicate canonical place in current scene');
 assertAllowedScene(listed.map(p=>p.id));
 const known=isKnownAtlasPlace(pcId);
 const pcPlace=listed.find(p=>p.id===pcId);
 if(!pcPlace)throw Error('The PC place must appear in MAP_DATA.places');
 const relative=['corridor','threshold','adhoc'].includes(data.view.spotType)&&!known&&pcPlace.kind==='corridor'&&!data.customScene;
 const relativeGroup=relative?resolveRelativeSceneScope(data.view.scopeId,data.view.nearPlace):null;
 if(relative&&!relativeGroup)throw Error('Cannot verify corridor scope: provide a known nearby room or approved scopeId');
 if(data.customScene&&known)throw Error('Custom scene cannot override canonical Atlas location');

 // Explicit AU/user-made scenes must not shadow an Atlas item or locked map.
 if(data.customScene){
  if(data.view.preferredMode==='template')throw Error('Custom scene cannot require a fixed template');
  if(listed.some(p=>isKnownAtlasPlace(p.id)||isLockedAtlasPlace(p.id)))
   throw Error('User-created scene must use its own place IDs, not Atlas place IDs');
  const places=listed.map(p=>{
   const kind=p.kind;
   if(!p.generation&& !['grounds','street','region'].includes(kind))
    return {...p,generation:{function:kind==='corridor'?'circulation':kind==='house'?'residential':kind==='shop'?'shop':'study'}};
   return p;
  });
  return {mode:'generated',sceneType:'custom',customScene:data.customScene,
   scopeId:data.customScene.id,atlasVersion:atlasVersion(),places,
   connections:data.connections,indoor:{...data.view.indoor,layout:data.view.indoor?.layout||'auto'}};
 }
 // PC-controlled template selection: actors elsewhere must not defeat fixed artwork.
 // Legacy locally described indoor rooms remain supported. Unknown outdoor/AU
 // parcels require an explicit, short customScene description.
 const localIndoor=!known&&listed.every(p=>p.generation&&['room','corridor','hall','tower','house','shop','pub','greenhouse','special'].includes(p.kind));
 if(!known&&!relativeGroup&&!localIndoor&&!pcPlace.atlasRef)
  throw Error('Missing recipe or unknown Atlas PC location: provide a user-created customScene with a short structural description');
 const preferred=data.view.templateId;
 const candidates=relativeGroup?[]:Object.keys(listVerifiedTemplateBindings(pcId)).filter(id=>technical(pcPlace,id,templates));
 const eligible=candidates.length?candidates:Object.keys(templates).filter(id=>technical(pcPlace,id,templates));
 // A local Atlas reference is display-only: it may target existing public
 // artwork but cannot grant entry to protected canonical places.
 eligible.sort((a,b)=>(TEMPLATE_SPECIFICITY[b]||70)-(TEMPLATE_SPECIFICITY[a]||70)||a.localeCompare(b));
 if(preferred&&data.view.preferredMode!=='generated'&&!eligible.includes(preferred))
  throw Error('Requested template has no verified PC binding: '+preferred);
 const selected=data.view.preferredMode!=='generated'?(preferred||eligible[0]):null;
 if(selected){
  const places=listed.filter(p=>technical(p,selected,templates))
   .map(p=>({...p,atlasRef:technical(p,selected,templates)}));
  return {mode:'template',templateId:selected,scopeId:'template:'+selected,atlasVersion:atlasVersion(),
   places,targets:places.map(p=>({placeId:p.id,interactiveIds:templates[selected].targets[p.atlasRef]}))};
 }
 if(data.view.preferredMode==='template')throw Error('PC location has no verified fixed template');
 assertGeneratedScene([pcId]);
 if(!known&&!relativeGroup){
  if(!localIndoor)throw Error('Missing recipe: unknown Atlas location requires an explicit customScene structural description and valid generation');
  const places=listed.map(placeWithGeneration);
  return {mode:'generated',sceneType:'local',scopeId:data.view.scopeId||'local:'+pcId,atlasVersion:atlasVersion(),places,
   connections:data.connections,indoor:{...data.view.indoor,layout:data.view.indoor?.layout||'auto'}};
 }
 const group=relativeGroup||resolveAtlasLocality(pcId,data.view.scopeId);
 if(!group){
  if(sceneTemplateOwners[pcId])throw Error('Existing fixed map/template required; missing verified binding: '+pcId);
   // Canonical standalone interiors use the same engine, without inventing a scope.
  const places=[placeWithGeneration(pcPlace)];
  return {mode:'generated',sceneType:'atlas',scopeId:'place:'+pcId,atlasVersion:atlasVersion(),
   places,exteriorContext:exteriorContextFor(places),connections:[],indoor:{...data.view.indoor,layout:data.view.indoor?.layout||'auto'}};
 }
 const scopeIds=group.expand===false?[pcId]:group.placeIds;
 const ids=new Set(scopeIds);
 const explicit=new Map(listed.filter(p=>ids.has(p.id)).map(p=>[p.id,p]));
 const revealed=new Set((data.visibility.revealedPlaceIds||[]).map(canonicalPlaceId));
 const places=scopeIds.map(id=>{
  if(isLockedAtlasPlace(id))return null;
  const p=explicit.get(id),name=atlasPlaceName(id)||id;
  const visible=Boolean(p||revealed.has(id));
  const room={...(p||{id,name:visible?name:'Chưa khám phá',kind:atlasPlaceKind(id),generation:{function:isCanonicalCorridor(id)?'circulation':'minimal'}})};
  if(!visible){room.name='Chưa khám phá';room.inspector={overhear:'',observation:''};}
  return placeWithGeneration(room);
 }).filter(Boolean);
 if(relativeGroup)places.push({...pcPlace,kind:'corridor',generation:{...pcPlace.generation,function:'circulation'}});
 if(!places.some(p=>p.id===pcId))throw Error('PC location cannot be rendered by its Atlas scope');
 return {mode:'generated',sceneType:'atlas',scopeId:group.key,atlasVersion:atlasVersion(),
  places,exteriorContext:exteriorContextFor(places)||(group.kind==='world'&&group.expand===false?{kind:'building',terrain:'grass'}:null),connections:data.connections.filter(c=>ids.has(canonicalPlaceId(c.from))&&ids.has(canonicalPlaceId(c.to))),
  indoor:generatedSceneOptions(data,{places}),
  ...(relativeGroup?{spot:{placeId:pcId,nearPlaceId:group.placeIds.includes(canonicalPlaceId(data.view.nearPlace))?canonicalPlaceId(data.view.nearPlace):null,type:data.view.spotType}}:{})};
}
