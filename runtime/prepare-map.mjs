import {resolveMap,layoutIdentity,layoutSeed,LAYOUT_ALGORITHM} from './resolve-map.mjs';
// Host owns durable storage and serializes concurrent updates per layout key.
export async function prepareMap(data,host){
 const plan=resolveMap(data),key=layoutIdentity(data);
 if(plan.mode==='template')return {...plan,layoutState:null};
 const previous=await host.loadLayout(key,data.layout.stateRef);
 if(data.layout.stateRef&&!previous)throw new Error('Requested saved layout is unavailable; refusing to regenerate');
 if(previous&&(previous.key!==key||previous.algorithm!==LAYOUT_ALGORITHM||typeof previous.seed!=='string'||!previous.rooms||typeof previous.rooms!=='object'))throw new Error('Saved layout identity or algorithm mismatch');
 let state,expectedSeed=previous?.seed;
 if(previous){
  const additions=plan.places.filter(p=>!Object.hasOwn(previous.rooms,p.id));
  state=additions.length?await host.extendLayout(structuredClone(previous),additions,plan.connections):structuredClone(previous);
  for(const [id,room] of Object.entries(previous.rooms))if(JSON.stringify(state.rooms?.[id])!==JSON.stringify(room))throw new Error('Existing room moved or changed');
  if(state.seed!==previous.seed)throw new Error('Stored seed changed');
 }else{
  const seed=await layoutSeed(data);expectedSeed=seed;
  state=await host.createLayout({key,seed,algorithm:LAYOUT_ALGORITHM,places:plan.places,connections:plan.connections});
 }
 if(typeof state.seed!=='string'||state.seed!==expectedSeed)throw new Error('Layout seed mismatch');
 if(state.key!==key||state.algorithm!==LAYOUT_ALGORITHM||!state.rooms||typeof state.rooms!=='object')throw new Error('Invalid layout result');
 for(const p of plan.places)if(!Object.hasOwn(state.rooms,p.id))throw new Error('Layout missing requested place');
 await host.saveLayout(key,structuredClone(state));
 // Never return the complete saved floor to the viewer; only current authorized local geometry.
 return {...plan,layoutState:{key,seed:state.seed,algorithm:state.algorithm,rooms:Object.fromEntries(plan.places.map(p=>[p.id,state.rooms[p.id]]))}};
}
