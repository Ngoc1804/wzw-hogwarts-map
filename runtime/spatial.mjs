// Shared scene-space geometry. Coordinates are SVG viewBox units; nothing is persisted.
export const EXTERIOR_OCCLUDERS = Object.freeze({
 h1:['castle','hagrid','greenhouses','owlery','boathouse','hogsmeade-station','shrieking-shack',...Array.from({length:10},(_,i)=>'hogsmeade-shop-'+i)],
 h2:['great-hall','entrance-hall',...['6','8','9','10','11','12','13','14','15','18','19','24','25','28','30','31','35','36'].map(n=>'castle-'+n),'hagrid','greenhouses','owlery'],
 'village-static':['shrieking-shack','hogsmeade-homes',...Array.from({length:9},(_,i)=>'hogsmeade-shop-'+i)],
 'diagon-knockturn':['da-homes','ka-homes','da-ollivanders','da-scribbulus','da-flourish','da-quidditch','da-menagerie','da-gambol','da-apothecary','da-goods','da-print','da-weasleys','da-tailor','da-optics','da-stationery','da-fortescue','da-robe-used','da-remedies','da-obscurus','da-wizardwear','da-workshop','da-cafe','da-potage','da-malkin','da-eeylops','da-twilfitt','da-gold','da-gringotts','da-leaky','ka-candles','ka-relics','ka-borgin','ka-corner','ka-gloom','ka-dealer','ka-bones']
});
export function pointInPolygon(p,vertices){
 if(!p||!vertices||vertices.length<3)return false;
 let inside=false;
 for(let i=0,j=vertices.length-1;i<vertices.length;j=i++){
  const a=vertices[i],b=vertices[j],dx=b.x-a.x,dy=b.y-a.y;
  const cross=(p.x-a.x)*dy-(p.y-a.y)*dx;
  if(Math.abs(cross)<1e-7&&p.x>=Math.min(a.x,b.x)-1e-7&&p.x<=Math.max(a.x,b.x)+1e-7&&p.y>=Math.min(a.y,b.y)-1e-7&&p.y<=Math.max(a.y,b.y)+1e-7)return true;
  if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
export function pointInRegions(p,regions){return !!p&&(regions||[]).some(r=>pointInPolygon(p,r.points))}
export function pointInFog(p,visibility){
 const active=new Set(visibility.fogRegionIds||[]);
 return pointInRegions(p,(visibility.fogRegions||[]).filter(r=>active.has(r.id)));
}
export function surfaceAllowed(p,spatial){
 return !!p&&!!spatial?.walkableRegions?.length&&pointInRegions(p,spatial.walkableRegions)&&!pointInRegions(p,spatial.blockedRegions||[]);
}
export function fitSceneBounds(base,areas,viewport,padding=55){
 if(!areas.length)return [...base];
 const left=Math.min(...areas.map(p=>p.left??p.x)),right=Math.max(...areas.map(p=>p.right??p.x));
 const top=Math.min(...areas.map(p=>p.top??p.y)),bottom=Math.max(...areas.map(p=>p.bottom??p.y));
 if(![left,right,top,bottom].every(Number.isFinite))throw Error('Invalid scene extents');
 let w=Math.max(220,right-left+padding*2),h=Math.max(180,bottom-top+padding*2);
 const ratio=Math.max(.3,Math.min(4,(viewport.width||1)/(viewport.height||1)));
 if(w/h<ratio)w=h*ratio;else h=w/ratio;
 return [(left+right-w)/2,(top+bottom-h)/2,w,h];
}
// Last painted confirmed candidate wins; no bbox-based claim of walkability.
export function selectOccluder(point,candidates){
 let result=null;
 for(const candidate of candidates)if(candidate.contains(point))result=candidate;
 return result;
}
