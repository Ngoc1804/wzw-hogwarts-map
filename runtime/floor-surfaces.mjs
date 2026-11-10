// Floor semantics work for every material. Artwork bounds are never floor geometry.
export function collectFloorSurfaces(svg){
 const floorNodes=[...svg.querySelectorAll('[data-surface="floor"],[data-room-floor],[data-corridor-floor],[data-element-id^="architecture.floor-"]')];
 // Legacy SVG templates used named floor fills before data-surface existed.
 for(const n of svg.querySelectorAll('path,rect,circle,ellipse,polygon,use'))if(/url\(#[^)]*floor[^)]*\)/i.test(n.getAttribute('fill')||''))floorNodes.push(n);
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
 const blocked=[...svg.querySelectorAll('[data-surface="blocked"],[data-obstacle="true"]')];
 return {nodes:unique,contains:p=>!!p&&unique.some(n=>contains(n,p))&&!blocked.some(n=>contains(n,p))};
}
