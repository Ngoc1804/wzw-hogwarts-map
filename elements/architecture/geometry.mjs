// Plan-space metadata, independent of the raised-wall drawing projection.
export function describeWall(start,end,thickness=16){
 if(![...start,...end,thickness].every(Number.isFinite)||start.length!==2||end.length!==2||thickness<=0)throw Error('Invalid wall parameters');
 const dx=end[0]-start[0],dy=end[1]-start[1],length=Math.hypot(dx,dy);if(!length)throw Error('Wall must have length');
 const nx=-dy/length*thickness/2,ny=dx/length*thickness/2;
 return {ports:{start:[...start],end:[...end]},length,footprint:[[start[0]+nx,start[1]+ny],[end[0]+nx,end[1]+ny],[end[0]-nx,end[1]-ny],[start[0]-nx,start[1]-ny]]};
}
