import registry from './templates.json' with {type:'json'};
import {assertMapData} from './map-data.mjs';
import {assertAllowedScene,assertGeneratedScene,canonicalPlaceId,isKnownAtlasPlace,verifiedAtlasBinding,generatedSceneOptions,canonicalPlaceFunction,isCanonicalCorridor} from './atlas-scene.mjs';
export function resolveMap(data,templates=registry.templates){
 data=assertMapData(data);
 const places=data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id));
 const canonicalIds=places.map(p=>canonicalPlaceId(p.id));
 if(new Set(canonicalIds).size!==canonicalIds.length)throw Error('Duplicate canonical place in current scene');
 assertAllowedScene(places.map(p=>p.id));
 const technical=(p,id)=>{
  const candidate=verifiedAtlasBinding(p.id,id)||verifiedAtlasBinding(p.atlasRef||'',id)||p.atlasRef;
  return candidate&&templates[id]?.targets[candidate]?.length?candidate:null;
 };
 const eligible=Object.keys(templates).filter(id=>places.every(p=>technical(p,id)));
 const selected=data.view.templateId?eligible.find(id=>id===data.view.templateId):eligible[0];
 if(data.view.preferredMode!=='generated'&&selected){
  const resolved=places.map(p=>({...p,id:canonicalPlaceId(p.id),atlasRef:technical(p,selected)}));
  return {mode:'template',templateId:selected,places:resolved,targets:resolved.map(p=>({placeId:p.id,interactiveIds:templates[selected].targets[p.atlasRef]}))};
 }
 if(data.view.preferredMode==='template')throw Error('Requested template cannot cover visible places');
 assertGeneratedScene(places.map(p=>p.id));
 const resolved=places.map(p=>{
  if(canonicalPlaceFunction(p.id)==='outdoor'||['grounds','street','region'].includes(p.kind))throw Error('Outdoor place requires an actual template or verified exterior surface: '+p.id);
  if(p.generation)return {...p,id:canonicalPlaceId(p.id)};
  if(!isKnownAtlasPlace(p.id))throw Error('Missing recipe for '+p.id);
  const kind=isCanonicalCorridor(p.id)?'corridor':p.kind;
  return {...p,kind,id:canonicalPlaceId(p.id),generation:{function:canonicalPlaceFunction(p.id)||kind||'room',shape:kind==='corridor'?'straight':'rectangle',furnishings:[]}};
 });
 const seen=new Set();
 for(const p of resolved){if(seen.has(p.id))throw Error('Duplicate canonical place in current scene: '+p.id);seen.add(p.id)}
 const connections=data.connections.filter(c=>seen.has(canonicalPlaceId(c.from))&&seen.has(canonicalPlaceId(c.to))).map(c=>({...c,from:canonicalPlaceId(c.from),to:canonicalPlaceId(c.to)}));
 return {mode:'generated',places:resolved,connections,indoor:generatedSceneOptions(data,{places:resolved})};
}
