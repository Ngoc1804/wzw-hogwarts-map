import registry from './templates.json' with {type:'json'};
import {mapSceneData} from './map-data.mjs';
import {
 canonicalPlaceId,isKnownAtlasPlace,verifiedAtlasBinding,
 generatedSceneOptions,canonicalPlaceFunction,isCanonicalCorridor,
 assertAllowedScene,assertGeneratedScene,resolveAtlasLocality,
 atlasPlaceName,listVerifiedTemplateBindings,atlasVersion,isLockedAtlasPlace
} from './atlas-scene.mjs';

const TEMPLATE_SPECIFICITY={
 'gryffindor-common':120,'ravenclaw-common':120,'hufflepuff-common':120,'slytherin-common':120,
 hall:115,'ministry-8-10':115,ministry2:110,express:110,'pitch-static':110,
 'diagon-knockturn':108,'village-static':108,h2:45,h1:10
};
const technical=(p,id,templates)=>{
 const candidate=verifiedAtlasBinding(p.id,id)||verifiedAtlasBinding(p.atlasRef||'',id)||p.atlasRef;
 return candidate&&templates[id]?.targets[candidate]?.length?candidate:null;
};
const placeWithGeneration=(p)=>{
 const id=canonicalPlaceId(p.id);
 const kind=isCanonicalCorridor(id)?'corridor':p.kind;
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
 const pcPlace=listed.find(p=>p.id===pcId);
 if(!pcPlace)throw Error('The PC place must appear in MAP_DATA.places');
 // Legacy locally described indoor rooms remain supported. Unknown outdoor/AU
 // parcels require an explicit, short customScene description.
 const localIndoor=!known&&listed.every(p=>p.generation&&['room','corridor','hall','tower','house','shop','pub','greenhouse','special'].includes(p.kind));
 if(!known&&!localIndoor&&!pcPlace.atlasRef)
  throw Error('Unknown Atlas PC location: provide a user-created customScene with a short structural description');
 const preferred=data.view.templateId;
 const candidates=Object.keys(listVerifiedTemplateBindings(pcId)).filter(id=>technical(pcPlace,id,templates));
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
 if(!known){
  if(!localIndoor)throw Error('Unknown Atlas location requires an explicit customScene structural description and valid generation');
  const places=listed.map(placeWithGeneration);
  return {mode:'generated',sceneType:'local',scopeId:data.view.scopeId||'local:'+pcId,atlasVersion:atlasVersion(),places,
   connections:data.connections,indoor:{...data.view.indoor,layout:data.view.indoor?.layout||'auto'}};
 }
 const group=resolveAtlasLocality(pcId,data.view.scopeId);
 if(!group)throw Error('Atlas PC location has no approved generated scope or fixed template: '+pcId);
 const ids=new Set(group.placeIds);
 const explicit=new Map(listed.filter(p=>ids.has(p.id)).map(p=>[p.id,p]));
 const revealed=new Set((data.visibility.revealedPlaceIds||[]).map(canonicalPlaceId));
 const places=group.placeIds.map(id=>{
  if(isLockedAtlasPlace(id))return null;
  const p=explicit.get(id),name=atlasPlaceName(id)||id;
  const visible=Boolean(p||revealed.has(id));
  const room={...(p||{id,name:visible?name:'Chưa khám phá',kind:isCanonicalCorridor(id)?'corridor':'room'})};
  if(!visible){room.name='Chưa khám phá';room.inspector={overhear:'',observation:''};}
  return placeWithGeneration(room);
 }).filter(Boolean);
 if(!places.some(p=>p.id===pcId))throw Error('PC location cannot be rendered by its Atlas scope');
 return {mode:'generated',sceneType:'atlas',scopeId:group.key,atlasVersion:atlasVersion(),
  places,connections:data.connections.filter(c=>ids.has(canonicalPlaceId(c.from))&&ids.has(canonicalPlaceId(c.to))),
  indoor:generatedSceneOptions(data,{places})};
}
