import registry from './templates.json' with {type:'json'};
import {mapSceneData,placeNameKey} from './map-data.mjs';
import {canonicalPlaceId,verifiedAtlasBinding,generatedSceneOptions,resolveAtlasLocality,atlasBackgroundPlaces,atlasVersion,sceneTemplateOwners,isKnownAtlasPlace,sceneAtlasReferences} from './atlas-scene.mjs';

const TEMPLATE_SPECIFICITY={'gryffindor-common':120,'ravenclaw-common':120,'hufflepuff-common':120,'slytherin-common':120,hall:115,'ministry-8-10':115,ministry2:110,express:110,'pitch-static':110,'diagon-knockturn':108,'village-static':108,h2:45,h1:10};
function v4TemplateRef(place,templateId,templates){
 const candidates=[verifiedAtlasBinding(place.id,templateId),place.atlasRef];
 return candidates.find(ref=>typeof ref==='string'&&templates[templateId]?.targets?.[ref]?.length)||null;
}
function v4GeneratedPlace(place){
 const generation=place.generation&&typeof place.generation==='object'?place.generation:{};
 // Legacy renderer bridge only. The V4 builder consumes type/description/size/props.
 const usable=new Set(['classroom','office','library','practice','group','bedroom','potions','kitchen','bathroom','hospital','shop','pub','storage','common','study','circulation','minimal']);
 const aliases={administration:'office',residential:'bedroom',commerce:'shop',service:'minimal',other:'minimal',outdoor:'minimal'};
 const requested=generation.function||place.type;
 const fn=usable.has(requested)?requested:aliases[requested]||(place.kind==='corridor'?'circulation':'minimal');
 return {...place,generation:{...generation,function:fn,shape:generation.shape||(place.kind==='corridor'?'straight':'rectangle')}};
}
function v4BlendPlaces(background,rp){
 const result=background.map(p=>({...p})),byId=new Map(result.map((p,i)=>[p.id,i]));
 for(const row of rp){
  const id=canonicalPlaceId(row.id);
  // Match canonical identity first. Name matching is restricted to a unique
  // background entry, and never merges an explicitly different canonical ID.
  let at=byId.get(id);
  if(at===undefined&&!isKnownAtlasPlace(id)){
   const matches=result.map((p,i)=>({p,i})).filter(({p})=>p.presentationSource==='atlas'&&placeNameKey(p.name)===placeNameKey(row.name));
   if(matches.length===1)at=matches[0].i;
  }
  if(at===undefined){byId.set(id,result.length);result.push({...row,id,presentationSource:'rp'});}
  else {const oldId=result[at].id;result[at]={...result[at],...row,id,presentationSource:'rp'};byId.delete(oldId);byId.set(id,at);}
 }
 return result;
}
export function resolveMap(input,templates=registry.templates){
 const data=mapSceneData(input),pc=data.actors.find(a=>a.isPC);
 const pcId=canonicalPlaceId(pc?.placeId||data.focus.actualPlaceId);
 const anchor=data.atlasAnchor,custom=anchor.toLowerCase()==='custom'||Boolean(data.customScene);
 const listed=data.places.map(p=>({...p,id:custom?p.id:canonicalPlaceId(p.id)}));
 const pcPlace=listed.find(p=>p.id===pcId)||listed[0];
 const group=custom?null:resolveAtlasLocality(pcId,anchor);
 const routed=(group&&!group.placeIds.length)?(sceneAtlasReferences(group.key).find(r=>r.targetScopeId?.startsWith('template:'))?.targetScopeId.slice(9)):null;
 const explicitTemplate=templates[anchor]?anchor:templates[data.view.templateId]?data.view.templateId:templates[routed]?routed:null;
 const owners=sceneTemplateOwners[pcId]||[];
 const eligible=Object.keys(templates).filter(id=>owners.includes(id)||v4TemplateRef(pcPlace,id,templates));
 eligible.sort((a,b)=>(TEMPLATE_SPECIFICITY[b]||70)-(TEMPLATE_SPECIFICITY[a]||70)||a.localeCompare(b));
 // Explicit semantic indoor/outdoor modes also request generated rendering.
 const forceGenerated=custom||['indoor','outdoor'].includes(data.mapMode)||data.view.preferredMode==='generated';
 const selected=forceGenerated?null:explicitTemplate||eligible[0];
 const base={atlasVersion:atlasVersion(),actors:data.actors,events:data.events,diagnostics:[...data.diagnostics],connections:data.connections};
 if(selected){
  // Keep every RP place even when detailed artwork bindings are unavailable.
  const places=listed.map(p=>{
   const ref=v4TemplateRef(p,selected,templates);
   return {...p,...(ref?{atlasRef:ref}:{}),anchorPrecision:ref?'source-binding':'illustrative-template'};
  });
  return {...base,mode:'template',mapMode:'template',templateId:selected,sceneType:'template',scopeId:'template:'+selected,places,targets:places.map(p=>({placeId:p.id,interactiveIds:templates[selected].targets[p.atlasRef]||[],precision:p.anchorPrecision}))};
 }
 const background=group&&(Boolean(anchor)||group.expand!==false)?atlasBackgroundPlaces(group):[];
 const places=v4BlendPlaces(background,listed).map(v4GeneratedPlace);
 const outdoor=data.mapMode==='outdoor'||!data.mapMode&&(['outdoor','village'].includes(data.customScene?.kind)||places.some(p=>['grounds','street','region'].includes(p.kind)));
 const fallback=data.diagnostics.length>0||Boolean(anchor&&!custom&&!group&&!explicitTemplate)||data.mapMode==='template';
 if(group?.buildEnabled===false)base.diagnostics.push('Atlas scope is marked LOCKED/UNBUILT; only supplied RP places are illustrated.');
 return {...base,mode:'generated',mapMode:outdoor?'outdoor':'indoor',sceneType:custom?'custom':group?'atlas':'local',scopeId:group?.key||data.customScene?.id||'local:'+pcId,places,indoor:generatedSceneOptions(data,{atlasGroup:group,places}),layoutType:generatedSceneOptions(data,{atlasGroup:group,places}).layout,
  ...(data.customScene?{customScene:data.customScene}:{}),...(outdoor?{exteriorContext:{kind:'outdoor',terrain:data.customScene?.terrain||'grass'}}:{}),fallback,illustrative:true};
}
