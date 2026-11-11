import sceneAtlas from './atlas-index.json' with {type:'json'};
import {resolveAtlasName,resolveAtlasGroup,normalizeLayoutType} from './map-data.mjs';

// Atlas IDs/ownership/status stay source facts. They are not render permission gates.
const known=new Set(sceneAtlas.knownPlaceIds);
export function canonicalPlaceId(id){return sceneAtlas.aliases[id]||id;}
export function isKnownAtlasPlace(id){return known.has(canonicalPlaceId(id));}
export function verifiedAtlasBinding(id,templateId){return sceneAtlas.bindings[canonicalPlaceId(id)]?.[templateId]||null;}
export function atlasPlaceName(id){return sceneAtlas.canonicalNameById[canonicalPlaceId(id)]||null;}
export function atlasPlaceKind(id){return sceneAtlas.placeKindById?.[canonicalPlaceId(id)]||'room';}
export function canonicalPlaceFunction(id){return sceneAtlas.placeFunctionById[canonicalPlaceId(id)]||null;}
export function isCanonicalCorridor(id){return sceneAtlas.corridorPlaceIds.includes(canonicalPlaceId(id));}
export function listVerifiedTemplateBindings(id){return sceneAtlas.bindings[canonicalPlaceId(id)]||{};}
export function atlasVersion(){return sceneAtlas.atlasVersion;}
export function listSceneAtlasGroups(){return sceneAtlas.groups;}
export const sceneTemplateOwners=sceneAtlas.templateOwnerById||{};
export function isLockedAtlasPlace(id){return (sceneAtlas.lockedPlaceIds||[]).includes(canonicalPlaceId(id));}
// Kept for old imports. Status is queried separately; rendering is never refused.
export function assertAllowedScene(){return true;}
export function assertGeneratedScene(){return true;}

export function resolveAtlasLocality(pcId,scopeId=null){
 const anchor=typeof scopeId==='string'?scopeId:'';
 const exact=resolveAtlasGroup(anchor);
 if(exact)return exact;
 // An anchor can be an existing canonical place ID or an unambiguous source name.
 const place=resolveAtlasName(anchor)||canonicalPlaceId(pcId);
 const scope=sceneAtlas.scopeById?.[place];
 return sceneAtlas.groups.find(g=>g.key===scope)||sceneAtlas.groups.find(g=>g.placeIds.includes(place))||null;
}
export function resolveRelativeSceneScope(scopeId,nearPlace){return resolveAtlasLocality(resolveAtlasName(nearPlace)||nearPlace,scopeId);}
export function selectScenePreset(data){
 return resolveAtlasLocality(data.focus?.actualPlaceId||data.actors?.find(a=>a.isPC)?.placeId,data.atlasAnchor||data.view?.scopeId);
}
export function generatedSceneOptions(data,plan={}){
 const group=plan.atlasGroup||selectScenePreset(data),legacy=data.view?.indoor||{};
 const layout=normalizeLayoutType(data.layoutType)||normalizeLayoutType(legacy.layout)||normalizeLayoutType(group?.preset?.layout)||'auto';
 // Do not propagate legacy constraints/knownStructure as vetoes over Gemini.
 const {knownStructure,constraints,candidates,strategy,allowRandom,...presentation}=legacy;
 return {...presentation,layout};
}
export function atlasBackgroundPlaces(group){
 // LOCKED/UNBUILT remains source metadata. Do not invent a background for it.
 if(!group||group.buildEnabled===false)return [];
 return group.placeIds.map(id=>({id,name:atlasPlaceName(id)||id,type:canonicalPlaceFunction(id)||atlasPlaceKind(id),kind:atlasPlaceKind(id),description:'',props:[],inspector:{overhear:'',observation:''},presentationSource:'atlas'}));
}

export function sceneAtlasReferences(scopeId){return (sceneAtlas.references||[]).filter(r=>r.sourceScope===scopeId);}
