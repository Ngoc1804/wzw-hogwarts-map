// Floor semantics work for every material. Artwork bounds are never floor geometry.
export function collectFloorSurfaces(svg){
 const floorNodes=[...svg.querySelectorAll('[data-surface="floor"],[data-room-floor],[data-corridor-floor],[data-element-id^="architecture.floor-"]')];
 // Legacy SVG templates used named floor fills before data-surface existed.
 for(const n of svg.querySelectorAll('path,rect,circle,ellipse,polygon,use'))if(/url\(#[^)]*(?:floor|paving|pavers)[^)]*\)/i.test(n.getAttribute('fill')||''))floorNodes.push(n);
 // Verified painted Quidditch playing field, rather than its rectangular hit target.
 if(svg.getAttribute('aria-label')?.startsWith('Quidditch Grounds'))floorNodes.push(...svg.querySelectorAll('ellipse[cx="780"][cy="620"][rx="360"][ry="425"]'));
 // Ministry 8–10 has colored room floors rather than a '*floor' pattern.
 floorNodes.push(...svg.querySelectorAll('[data-id^="mm-"]>rect[stroke="#776c56"],rect[fill="url(#mm-stone)"]'));
 const unique=[...new Set(floorNodes)].filter(n=>!n.closest('defs'));
 const contains=(node,p)=>{
  const shapes=node instanceof SVGGeometryElement?[node]:[...node.querySelectorAll('path,rect,circle,ellipse,polygon')];
  return shapes.some(shape=>{
   if(!shape.getScreenCTM())return false;
   const rootPoint=new DOMPoint(p.x,p.y).matrixTransform(svg.getScreenCTM());
   const local=rootPoint.matrixTransform(shape.getScreenCTM().inverse());
   return shape.isPointInFill(local);
  });
 };
 const blocked=[...svg.querySelectorAll('[data-surface="blocked"],[data-obstacle="true"],[data-id^="gf-table-"],[data-id="mm-fountain"],[data-element-id^="table."]')];
 return {nodes:unique,contains:p=>!!p&&unique.some(n=>contains(n,p))&&!blocked.some(n=>contains(n,p))};
}

// Select a display point on confirmed floor near the actual place anchor.
// SVG bounds guide the search only; the contains predicate proves walkability.
export function nearestFloorPoint({origin,contains,occupied=[],maxDistance=160}){
 const valid=p=>contains(p)&&!occupied.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<12);
 if(valid(origin))return {...origin};
 for(let radius=8;radius<=maxDistance;radius+=8){
  const count=Math.max(16,Math.ceil(radius/3));
  for(let i=0;i<count;i++){
   const angle=2*Math.PI*i/count,p={x:origin.x+radius*Math.cos(angle),y:origin.y+radius*Math.sin(angle)};
   if(valid(p))return p;
  }
 }
 return null;
}
