// Reusable SVG patterns: colors and scale change presentation, never floor geometry.
export const MATERIAL_PRESETS=Object.freeze({wood:{color:'#BE9B70',stroke:'#8B6848',w:32,h:72,path:'M0 0V72M16 0V36H32M0 36H16V72'},brick:{color:'#BD9278',stroke:'#806B58',w:48,h:24,path:'M0 0H48M0 12H48M0 24H48M0 0V12M24 12V24'},stone:{color:'#D8C29B',stroke:'#A28D6D',w:44,h:36,path:'M0 0H44V36H0ZM0 18H20M20 0V36'},tile:{color:'#D8D1BC',stroke:'#B7AD94',w:24,h:24,path:'M0 0H24V24H0Z'}});
export function materialPattern(id,kind='stone',color,stroke,scale=1){
 const p=MATERIAL_PRESETS[kind];
 if(!p||!/^mat-[\w-]+$/.test(id))throw Error('Invalid material preset or ID');
 if(!Number.isFinite(scale)||scale<.5||scale>3)throw Error('Material scale outside bounds');
 for(const c of [color,stroke])if(c!==undefined&&!/^#[0-9a-fA-F]{6}$/.test(c))throw Error('Invalid material color');
 return `<pattern id="${id}" width="${p.w}" height="${p.h}" patternUnits="userSpaceOnUse" patternTransform="scale(${scale})"><rect width="${p.w}" height="${p.h}" fill="${color||p.color}"/><path d="${p.path}" fill="none" stroke="${stroke||p.stroke}" stroke-width=".9"/></pattern>`;
}
