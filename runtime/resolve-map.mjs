import registry from './templates.json' with {type:'json'};
import {assertMapData} from './map-data.mjs';
export function resolveMap(data,templates=registry.templates){
 assertMapData(data);
 const places=data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id));
 const ids=Object.keys(templates).filter(id=>places.every(p=>p.atlasRef&&templates[id].targets[p.atlasRef]?.length));
 const id=data.view.templateId?ids.find(id=>id===data.view.templateId):ids[0];
 if(data.view.preferredMode!=='generated'&&id)return {mode:'template',templateId:id,targets:places.map(p=>({placeId:p.id,interactiveIds:templates[id].targets[p.atlasRef]}))};
 if(data.view.preferredMode==='template')throw Error('Requested template cannot cover visible places');
 for(const p of places)if(!p.generation)throw Error('Missing recipe for '+p.id);
 return {mode:'generated',places,connections:data.connections.filter(c=>places.some(p=>p.id===c.from)&&places.some(p=>p.id===c.to))};
}
