import registry from './templates.json' with {type:'json'};
import {assertMapData} from './map-data.mjs';
import {buildStandingSpecs} from './standing.mjs';
export const LAYOUT_ALGORITHM='hybrid-v1';
export function layoutIdentity(data){return JSON.stringify([data.worldId,data.view.scopeId,data.layout.scopeKey,data.layout.version])}
export async function layoutSeed(data){const bytes=new TextEncoder().encode(layoutIdentity(data));const hash=await crypto.subtle.digest('SHA-256',bytes);return [...new Uint8Array(hash)].map(v=>v.toString(16).padStart(2,'0')).join('')}
export function resolveMap(data,templates=registry.templates){
  assertMapData(data);
  const required=data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id));
  const candidates=Object.entries(templates).filter(([,t])=>required.every(p=>p.atlasRef&&t.targets[p.atlasRef]?.length));
  let selected=data.view.templateId?candidates.find(([id])=>id===data.view.templateId):candidates[0];
  if(data.view.preferredMode==='generated')selected=null;
  if(data.view.preferredMode==='template'&&!selected)throw new Error('Requested template cannot cover the local places');
  if(selected){const [id,t]=selected;const targets=required.map(p=>({placeId:p.id,interactiveIds:t.targets[p.atlasRef]}));return {mode:'template',templateId:id,mapId:t.mapId,requiresLocalCrop:true,targets,standing:buildStandingSpecs(data.actors,'template',targets),layoutKey:layoutIdentity(data)}}
  for(const p of required)if(!p.generation)throw new Error('Generated place requires a recipe description or atlas adapter: '+p.id);
  return {mode:'generated',scopeId:data.view.scopeId,places:required.map(p=>({id:p.id,recipe:p.generation})),connections:data.connections,standing:buildStandingSpecs(data.actors,'generated'),layoutKey:layoutIdentity(data),algorithm:LAYOUT_ALGORITHM};
}
// This resolves a render plan only. It never mounts a full floor or regenerates stored geometry.
