import sceneAtlas from './atlas-index.json' with {type:'json'};
// Stable place IDs, explicit template bindings and scene-local corridor choices only.
// No fuzzy names, no inferred canon adjacency and no layout persistence.
const known=new Set(sceneAtlas.knownPlaceIds),locked=new Set(sceneAtlas.lockedPlaceIds),
      cccNonRoom=new Set(sceneAtlas.cccNonRoomPlaceIds),noGenerate=new Set(sceneAtlas.noGeneratePlaceIds);
export function canonicalPlaceId(id){return sceneAtlas.aliases[id]||id}
export function isKnownAtlasPlace(id){return known.has(canonicalPlaceId(id))}
export function verifiedAtlasBinding(id,templateId){return sceneAtlas.bindings[canonicalPlaceId(id)]?.[templateId]||null}
export function assertAllowedScene(placeIds){
 for(const id of placeIds){
  const canonical=canonicalPlaceId(id);
  if(locked.has(canonical))throw Error('AU map locked until approved: '+canonical);
  if(cccNonRoom.has(canonical))throw Error('CCC 07.18: only the main room may be generated: '+canonical);
 }
}
export function selectScenePreset(data,places){
 const ids=new Set(places.map(p=>canonicalPlaceId(p.id)));
 if(!ids.size)return null;
 const explicit=sceneAtlas.groups.find(g=>g.key===data.view.scopeId);
 if(explicit){
  if(explicit.buildEnabled===false)throw Error('AU map locked until approved: '+explicit.name);
  if([...ids].some(id=>!explicit.placeIds.includes(id)))throw Error('Scene includes places outside selected floor/area');
  return explicit;
 }
 const candidates=sceneAtlas.groups.filter(g=>g.preset&&[...ids].every(id=>g.placeIds.includes(id)));
 const pc=canonicalPlaceId(data.focus.actualPlaceId);
 const eligible=candidates.filter(g=>g.placeIds.includes(pc));
 const pool=eligible.length?eligible:candidates;
 // Most specific group wins: AU metadata only when it is allowed.
 pool.sort((a,b)=>a.placeIds.length-b.placeIds.length||a.key.localeCompare(b.key));
 return pool[0]||null;
}
export function generatedSceneOptions(data,plan){
 const group=selectScenePreset(data,plan.places);
 const options={...(group?.preset?{layout:group.preset.layout}:{}),...data.view.indoor};
 const count=plan.places.filter(p=>p.kind!=='corridor').length;
 // A small scene is never forced into an oversized predefined hallway;
 // explicit user-specified layout is still honored where geometrically possible.
 if(count<=1&&!data.view.indoor?.layout&&!data.view.indoor?.knownStructure){
   options.layout='horizontal';
 }
 if(options.layout==='tower'&&count<2&&!data.view.indoor?.knownStructure)options.layout='horizontal';
 return options;
}
export function assertGeneratedScene(placeIds){
 assertAllowedScene(placeIds);
 for(const id of placeIds)if(noGenerate.has(canonicalPlaceId(id)))
  throw Error('Existing fixed map/template required; no generated courtyard, exterior or Ministry: '+canonicalPlaceId(id));
}
export function listSceneAtlasGroups(){return sceneAtlas.groups}
