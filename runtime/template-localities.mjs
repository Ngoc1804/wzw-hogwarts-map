import templateLocalities from './template-localities.json' with {type:'json'};
// Supplementary illustrative regions. Original artwork and IDs stay untouched.
export function mountTemplateLocalities(svg,places,template,originalBounds){
 const NS='http://www.w3.org/2000/svg',wanted=new Set(places.map(p=>p.id));
 const bounds=originalBounds?[...originalBounds]:[svg.viewBox.baseVal.x,svg.viewBox.baseVal.y,svg.viewBox.baseVal.width,svg.viewBox.baseVal.height];
 const regions=templateLocalities.regions.filter(r=>wanted.has(r.placeId)||places.some(p=>p.atlasRef==='locality-'+r.placeId));
 if(!regions.length)return null;
 for(const r of regions){
  const publicPlace=places.find(p=>p.id===r.placeId||p.atlasRef==='locality-'+r.placeId);
  const parentIds=template.targets[r.parentRef]||[],parent=[...svg.querySelectorAll('[data-id]')].find(n=>parentIds.includes(n.dataset.id));
  if(!parent)throw Error('Supplementary region missing parent: '+r.placeId);
  const b=parent.getBBox(),m=svg.getScreenCTM().inverse().multiply(parent.getScreenCTM());
  const a=new DOMPoint(b.x,b.y).matrixTransform(m),z=new DOMPoint(b.x+b.width,b.y+b.height).matrixTransform(m);
  const base=svg.viewBox.baseVal,w=94,h=62;
  const peers=templateLocalities.regions.filter(p=>p.templateId===r.templateId&&p.parentRef===r.parentRef&&p.kind===r.kind),slot=peers.findIndex(p=>p.placeId===r.placeId);
  let x=(a.x+z.x)/2-w/2+(slot-(peers.length-1)/2)*Math.min(w+12,Math.max(w,z.x-a.x)/Math.max(1,peers.length)),y=z.y+12;
  if(r.templateId==='h2'&&['forecourt','wyvern-court','mistletoe-court'].includes(r.parentRef)){x=a.x+(slot+.5)*(z.x-a.x)/peers.length-w/2;y=a.y+(z.y-a.y)*.6-h/2;}
  if(r.name.includes('Clock Tower'))x=a.x-w/2;
  if(r.parentRef==='forest'){y=a.y+(z.y-a.y)*(r.name.includes('Lối vào')?.85:r.name.includes('Aragog')?.25:r.name.includes('rừng sâu')?.35:.6)-h/2;}
  if(r.templateId==='hall'&&r.kind==='ground'){x=(a.x+z.x-w)/2;y=(a.y+z.y-h)/2;}
  if(r.kind==='deck'){x=a.x+(z.x-a.x)*(.25+.5*(slot+.5)/peers.length);y=a.y+(z.y-a.y)*(.55+.12*(slot%2));}
  if(r.kind==='inset'){x=base.x+base.width+36;y=base.y+72+templateLocalities.regions.filter(p=>p.templateId===r.templateId&&p.kind==='inset').findIndex(p=>p.placeId===r.placeId)*110;}
  const g=document.createElementNS(NS,'g');g.dataset.id='locality-'+r.placeId;g.dataset.localityPrecision=r.precision;g.dataset.localityContext=JSON.stringify([Math.min(a.x,z.x,x),Math.min(a.y,z.y,y),Math.max(a.x,z.x,x+w),Math.max(a.y,z.y,y+h)]);
  const floor=document.createElementNS(NS,r.kind==='ground'?'path':'rect');for(const [k,v] of Object.entries({x,y,width:w,height:h,rx:r.kind==='deck'?18:2,fill:r.kind==='deck'?'#b49b73':'#dfcfac',stroke:'#9f8a66','stroke-width':1,'data-surface':'floor'}))floor.setAttribute(k,v);if(r.kind==='ground'){floor.setAttribute('d',`M${x} ${y+h*.2}Q${x+w*.5} ${y-8} ${x+w} ${y+h*.2}L${x+w-3} ${y+h*.8}Q${x+w*.5} ${y+h+8} ${x} ${y+h*.8}Z`);floor.setAttribute('fill','#b9bd8c');floor.setAttribute('opacity','.18');floor.setAttribute('stroke','none');}g.append(floor);
  if(r.kind==='inset'){
   const wall=document.createElementNS(NS,'path');wall.setAttribute('d',`M${x} ${y+h}V${y}H${x+w}V${y+h}`);wall.setAttribute('fill','none');wall.setAttribute('stroke','#8c775b');wall.setAttribute('stroke-width','5');g.append(wall);
  }
  if(r.kind==='inset'){const face=document.createElementNS(NS,'rect');for(const [k,v] of Object.entries({x,y:y+h,width:w,height:20,fill:'#bda783',stroke:'#8c775b','data-shade-surface':'wall'}))face.setAttribute(k,v);g.append(face);}
  const title=document.createElementNS(NS,'title');title.textContent=publicPlace.name;g.append(title);
  const label=document.createElementNS(NS,'text');label.setAttribute('x',x+w/2);label.setAttribute('y',y-7);label.setAttribute('text-anchor','middle');label.setAttribute('font-size','9');label.setAttribute('fill','#6f604a');label.textContent=publicPlace.name.slice(0,28);if(r.kind==='inset')g.append(label);
  if(r.kind==='ground'){
   const scene=svg.querySelector('#camera')||svg,background=[...scene.children].find(n=>n.tagName.toLowerCase()==='rect');
   if(scene!==svg){const transform=scene.getScreenCTM().inverse().multiply(svg.getScreenCTM());g.setAttribute('transform',`matrix(${transform.a} ${transform.b} ${transform.c} ${transform.d} ${transform.e} ${transform.f})`);}
   scene.insertBefore(g,background?background.nextSibling:scene.firstChild);
  }else svg.append(g);
  const right=Math.max(bounds[0]+bounds[2],x+w+40),bottom=Math.max(bounds[1]+bounds[3],y+h+40),left=Math.min(bounds[0],x-40),top=Math.min(bounds[1],y-40);bounds.splice(0,4,left,top,right-left,bottom-top);
 }
 return bounds;
}
