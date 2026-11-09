// Transient geometry for one view. No persistent layout is required by this demo.
export const CORRIDOR_TYPES=['straight','L','T','cross','U','curved','loop'];
export function corridorGeometry(type,{x,y,width:w,height:h}){
 if(!CORRIDOR_TYPES.includes(type)||![x,y,w,h].every(Number.isFinite)||w<=0||h<=0)throw new Error('Invalid corridor geometry');
 let paths,ports;
 switch(type){
 case 'straight':paths=[`M${x} ${y+h/2}H${x+w}`];ports=[[x,y+h/2],[x+w,y+h/2]];break;
 case 'L':paths=[`M${x+w} ${y}H${x}V${y+h}`];ports=[[x+w,y],[x,y+h]];break;
 case 'T':paths=[`M${x} ${y}H${x+w}`,`M${x+w/2} ${y}V${y+h}`];ports=[[x,y],[x+w,y],[x+w/2,y+h]];break;
 case 'cross':paths=[`M${x} ${y+h/2}H${x+w}`,`M${x+w/2} ${y}V${y+h}`];ports=[[x,y+h/2],[x+w,y+h/2],[x+w/2,y],[x+w/2,y+h]];break;
 case 'U':paths=[`M${x} ${y}V${y+h}H${x+w}V${y}`];ports=[[x,y],[x+w,y]];break;
 case 'curved':paths=[`M${x} ${y}C${x+w} ${y} ${x} ${y+h} ${x+w} ${y+h}`];ports=[[x,y],[x+w,y+h]];break;
 case 'loop':paths=[`M${x+w/2} ${y}H${x+w}V${y+h}H${x}V${y}Z`];ports=[[x+w/2,y],[x+w,y+h/2],[x+w/2,y+h],[x,y+h/2]];break;
 }
 return {type,paths,ports,bounds:[x,y,w,h]};
}
