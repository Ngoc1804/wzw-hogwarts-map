// Exhaustive render coverage, including reasons a canonical place cannot render.
import fs from 'node:fs';
import index from '../runtime/atlas-index.json' with {type:'json'};
import {resolveMap} from '../runtime/resolve-map.mjs';
import {buildGeometry} from '../runtime/geometry.mjs';
const fixture=JSON.parse(fs.readFileSync(new URL('fixtures/scene.json',import.meta.url)));
export function auditCoverage(){
 const entries=index.knownPlaceIds.map(id=>{
  const row={id,name:index.canonicalNameById[id]};
  if(index.lockedPlaceIds.includes(id)||index.cccNonRoomPlaceIds.includes(id))return {...row,status:'locked-by-policy'};
  if(index.bindings[id])return {...row,status:'template',bindings:index.bindings[id]};
  if(index.noGeneratePlaceIds.includes(id))return {...row,status:'missing-fixed-binding'};
  if(index.placeFunctionById[id]==='outdoor')return {...row,status:'missing-outdoor-surface'};
  const d=structuredClone(fixture);d.places=[{...d.places[0],id,name:row.name,atlasRef:null,kind:index.corridorPlaceIds.includes(id)?'corridor':'room',generation:null}];
  d.view={...d.view,preferredMode:'generated',templateId:null,routePlaceIds:[id]};d.actors.forEach(a=>a.placeId=id);d.hints.forEach(h=>h.placeId=id);
  try{const plan=resolveMap(d);const geometry=buildGeometry(plan,plan.indoor);if(!geometry.suggestedAnchors[id]?.length)throw Error('No actor anchor');return {...row,status:'generated-indoor'};}
  catch(e){return {...row,status:'generation-error',reason:e.message};}
 });
 return {total:entries.length,counts:Object.fromEntries([...new Set(entries.map(e=>e.status))].sort().map(s=>[s,entries.filter(e=>e.status===s).length])),entries};
}
if(process.argv[1]===new URL(import.meta.url).pathname){const report=auditCoverage();fs.writeFileSync(new URL('../docs/atlas-coverage.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(report.counts);if(report.counts['generation-error'])process.exitCode=1;}
