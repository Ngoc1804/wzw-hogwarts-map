export function createElements(META){
const NS="http://www.w3.org/2000/svg";
function el(t,a={},p){const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);if(p)p.append(n);return n}
function txt(p,x,y,t,a={}){const n=el('text',{x,y,...a},p);n.textContent=t;return n}
function path(p,d,a={}){return el('path',{d,...a},p)}
function asset(p,id,x,y,w,baseColor,detail){const b=META[id].bbox,h=w*b.height/b.width;el('use',{href:'#a-'+id,x,y,width:w,height:h,class:'asset','data-element-id':id,style:`--base:${baseColor||'url(#'+id+'-wood)'};--detail:${detail||'#bead83'};--ink:#6d563b;--wood:#987342;--glass:#809789;--surface:#dfd0a7`},p);return {id,x,y,w,h};}
function table(p,id,x,y,w,lab=false){const a=asset(p,id,x,y,w);const m=META[id],s=m.surface,b=m.bbox;if(!s||!s.width)return;const k=w/b.width,sx=x+(s.x-b.x)*k,sy=y+(s.y-b.y)*k,sw=s.width*k,sh=s.height*k;
 for(const [i,prop]of (lab?['wizard.cauldron','accessory.bottle']:['accessory.book-open','accessory.ink']).entries()){const pm=META[prop].bbox,pw=Math.min(sw*.28,sh*.66*pm.width/pm.height);asset(p,prop,sx+sw*(i?.65:.12),sy+sh*.17,pw,i?'#536d5f':lab?'#647e65':'#e9d8ad','#d0be91');}}
function hwall(p,x1,x2,y,z,t=16){if(x2<=x1)return;const g=el('g',{'data-wall':'horizontal'},p);el('rect',{x:x1,y:y-z,width:x2-x1,height:z,fill:'url(#stone-face)'},g);el('rect',{x:x1,y:y-z,width:x2-x1,height:z,fill:'url(#masonry)'},g);el('rect',{x:x1,y:y-z-t/2,width:x2-x1,height:t,fill:'url(#cap-block)',stroke:'#665e4e','stroke-width':1},g);path(g,`M${x1} ${y}H${x2}`,{stroke:'#8b7657','stroke-width':1.5,opacity:.7});}
function vwall(p,x,y1,y2,z,t=16){if(y2<=y1)return;const dx=z*.35,g=el('g',{'data-wall':'vertical'},p);
 const face=`M${x+t/2} ${y1}L${x+t/2} ${y2}L${x+t/2-dx} ${y2-z}L${x+t/2-dx} ${y1-z}Z`;
 path(g,face,{fill:'url(#stone-face)',stroke:'#8d7858','stroke-width':1});path(g,face,{fill:'url(#masonry)'});
 el('rect',{x:x-t/2-dx,y:y1-z,width:t,height:y2-y1,fill:'url(#cap-block)',stroke:'#6a6151','stroke-width':1},g);
 path(g,`M${x-t/2} ${y2}L${x+t/2} ${y2}L${x+t/2-dx} ${y2-z}L${x-t/2-dx} ${y2-z}Z`,{fill:'url(#stone-face)',stroke:'#8d7858','stroke-width':1});
 path(g,`M${x+t/2-dx} ${y1-z}V${y2-z}`,{stroke:'#ded0b1','stroke-width':1,opacity:.65});}

function arch(p,x,y,z){const w=38,top=y-z-4,shoulder=top+18,g=el('g',{'data-door':'raised'},p);
 path(g,`M${x-w/2} ${y}V${shoulder}Q${x-w/2} ${top+7} ${x} ${top-2}Q${x+w/2} ${top+7} ${x+w/2} ${shoulder}V${y}Z`,{fill:'#594b37',stroke:'#78654c','stroke-width':1});
 // Deep jambs and separate arched stones; the narrow leaf leaves a visible opening.
 for(const side of [-1,1]){el('rect',{x:x+side*w/2-(side===-1?9:0),y:shoulder,width:9,height:y-shoulder,fill:'#b9a17b',stroke:'#867155','stroke-width':.7},g);}
 path(g,`M${x-24} ${shoulder}Q${x-24} ${top+2} ${x} ${top-10}Q${x+24} ${top+2} ${x+24} ${shoulder}`,{stroke:'#d3bb91','stroke-width':9,fill:'none'});
 for(let i=-2;i<=2;i++){const xx=x+i*8,yy=top-8+Math.abs(i)*4;path(g,`M${xx} ${yy}l${i*1.5} 8`,{stroke:'#8d795c','stroke-width':1});}
 path(g,`M${x-17} ${y-1}V${shoulder+2}Q${x-17} ${top+10} ${x-4} ${top+4}V${y-7}Z`,{fill:'url(#dark-wood)',stroke:'#685032','stroke-width':1});path(g,`M${x-12} ${shoulder+4}V${y-6}`,{stroke:'#d5ad70','stroke-width':.8});el('circle',{cx:x-7,cy:y-20,r:1.5,fill:'#c3a154'},g);path(g,`M${x-19} ${y+2}h38`,{stroke:'#d9c5a0','stroke-width':3});
}
function lowdoor(p,x,y,z){const gap=38;path(p,`M${x-19} ${y-4}h38`,{stroke:'#bfa77e','stroke-width':3,'data-door':'threshold'});path(p,`M${x-19} ${y}v34M${x+19} ${y}Q${x+17} ${y+34} ${x-19} ${y+34}`,{fill:'none',stroke:'#a98c62','stroke-width':1.1,opacity:.8});}
function sconce(p,x,y){const g=el('g',{},p);el('circle',{cx:x,cy:y-12,r:17,fill:'#ffd182',opacity:.3,filter:'url(#warm-light)'},g);path(g,`M${x} ${y}v-14m-4 2h8l-2 6h-4z`,{stroke:'#6f583a',fill:'#77613e','stroke-width':2});path(g,`M${x-4} ${y-15}Q${x-7} ${y-21} ${x} ${y-30}Q${x+5} ${y-23} ${x+4} ${y-16}Z`,{fill:'#edab42',stroke:'#c8892e','stroke-width':.7});path(g,`M${x-2} ${y-16}Q${x-3} ${y-20} ${x} ${y-24}L${x+2} ${y-16}Z`,{fill:'#ffe7a2'});}
function portrait(p,x,y,w,h){el('rect',{x,y,width:w,height:h,rx:1,fill:'#a78d4f',stroke:'#655239','stroke-width':2},p);el('rect',{x:x+4,y:y+4,width:w-8,height:h-8,fill:'#6d7966',stroke:'#cfb370','stroke-width':1},p);path(p,`M${x+7} ${y+h-7}Q${x+w*.2} ${y+h*.3} ${x+w*.4} ${y+h*.67}T${x+w-7} ${y+h*.45}V${y+h-7}Z`,{fill:'#a1a07f'});}

function ppath(p){return 'M'+p.map(v=>v.join(' ')).join('L')+'Z'}
function angledWall(p,a,b,z){const dx=z*.35,dy=z,t=8,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*t,ny=(b[0]-a[0])/len*t;
 const face=ppath([a,b,[b[0]-dx,b[1]-dy],[a[0]-dx,a[1]-dy]]);path(p,face,{fill:'url(#stone-face)',stroke:'#9a8665','stroke-width':.7});path(p,face,{fill:'url(#masonry)'});
 path(p,ppath([[a[0]-dx+nx,a[1]-dy+ny],[b[0]-dx+nx,b[1]-dy+ny],[b[0]-dx-nx,b[1]-dy-ny],[a[0]-dx-nx,a[1]-dy-ny]]),{fill:'url(#cap-block)',stroke:'#6b6353','stroke-width':.65});
}
function lancet(p,x,y,z){const top=-Math.max(20,z-9),bottom=-8,w=30,g=el('g',{transform:`translate(${x} ${y})`,'data-window':'lancet'},p);
 path(g,`M${-w/2} ${bottom}V${top+16}Q${-w/2} ${top+6} 0 ${top}Q${w/2} ${top+6} ${w/2} ${top+16}V${bottom}Z`,{fill:'#698b8b',stroke:'#d6c19b','stroke-width':5});
 path(g,`M0 ${top+4}V${bottom}M${-w/2+2} ${top+25}H${w/2-2}`,{stroke:'#c1cbbf','stroke-width':1.4});
 for(let i=-2;i<=2;i++){path(g,`M-12 ${bottom-8-i*8}l24 -18M-12 ${bottom-25-i*8}l24 18`,{stroke:'#a8bcad','stroke-width':.6,opacity:.8});}
 path(g,`M-20 ${bottom+3}h40`,{stroke:'#cbb38b','stroke-width':5});
}

return {el,txt,path,asset,table,hwall,vwall,arch,lowdoor,sconce,portrait,angledWall,lancet};
}
