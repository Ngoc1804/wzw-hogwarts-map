import TOKENS from './tokens.json' with { type: 'json' };
const NS='http://www.w3.org/2000/svg';
const KEYS=Object.keys(TOKENS.colors);
const COLORS=Object.values(TOKENS.colors).map(c=>[c.name,c.main,c.accent]);
function ribbon(name,index=0,pc=false){const [,main,accent]=COLORS[index],N='http://www.w3.org/2000/svg',b=document.createElement('button');b.className='ribbon'+(pc?' pc':'')+([3,4,9,11].includes(index)?' light':'');b.style.setProperty('--main',main);b.style.setProperty('--accent',accent);const w=Math.max(140,Math.min(260,Array.from(name).length*8+60));b.style.width=(w*.7)+'px';b.setAttribute('aria-label',name);const v=document.createElementNS(N,'svg');v.setAttribute('viewBox',`0 0 ${w} 44`);v.setAttribute('aria-hidden','true');const path=(d,fill,stroke)=>{const p=document.createElementNS(N,'path');p.setAttribute('d',d);p.setAttribute('fill',fill);p.setAttribute('stroke',stroke);p.setAttribute('stroke-width','1.1');v.append(p);return p};path(`M0 12H31V38H0L10 25Z M${w} 12H${w-31}V38H${w}L${w-10} 25Z`,accent,main);path(`M23 7L31 12V38L23 33Z M${w-23} 7L${w-31} 12V38L${w-23} 33Z`,main,main);path(`M23 7Q${w/2}-3 ${w-23} 7V34Q${w/2} 24 23 34Z`,main,accent);path(`M30 11Q${w/2}2 ${w-30} 11`,'none',accent);const text=document.createElementNS(N,'text');text.setAttribute('x',w/2);text.setAttribute('y','26');text.setAttribute('text-anchor','middle');text.setAttribute('fill',[3,4,9,11].includes(index)?'#172344':'#f8edda');text.setAttribute('style','font:600 17px Georgia,serif');text.textContent=name;v.append(text);b.append(v);return b}
function chip(name,index,pc){const b=document.createElement('button');b.className='actor-chip'+([3,4,9,11].includes(index)?' light':'');b.style.setProperty('--main',COLORS[index][1]);b.style.setProperty('--accent',COLORS[index][2]);b.textContent=name;return b}
function addUse(g,side){const e=document.createElementNS(NS,'use');e.setAttribute('href','#demo-shoe-'+side);g.append(e);return e}
function setupFeet(g){g.replaceChildren();if(g.dataset.motion==='idle'){
 const l=addUse(g,'l'),r=addUse(g,'r');l.setAttribute('transform','translate(-8 0) rotate(-6)');r.setAttribute('transform','translate(8 0) rotate(6)');
}else for(let i=0;i<6;i++){const e=addUse(g,i%2?'r':'l');e.setAttribute('transform',`translate(${i%2?7:-7} ${-i*17}) rotate(${i%2?6:-6})`);e.style.opacity='0'}}

export function tagType(actor) {
  if (actor.onPatrol === true && ['prefect','patrol','caretaker'].includes(actor.role)) return 'patrol';
  if (actor.entityType === 'group' && !actor.tagType) return 'crowd';
  return KEYS.includes(actor.tagType) && actor.tagType !== 'patrol' ? actor.tagType : 'unknown';
}
export function actorTag(actor, compact=false) {
  const type=tagType(actor), index=KEYS.indexOf(type);
  const label=actor.isPC ? `★ ${actor.name || 'BẠN'} ★` : actor.name || 'Chưa rõ';
  const element=compact?chip(label,index,actor.isPC):ribbon(label,index,actor.isPC);
  if(actor.isPC) {element.classList.add('pc');element.style.setProperty('--accent','#D2A64D');}
  element.dataset.tagType=type;
  return element;
}
export function feetState(elapsed, stance='idle', reduced=false) {
  if(stance!=='walk'||reduced) {
    const f=Math.sin(elapsed/6400*Math.PI*2)*.13;
    return [.78+f,.78-f];
  }
  const t=((elapsed%5300)+5300)%5300, step=Math.floor(t/550);
  return Array.from({length:6},(_,i)=>t<3300&&i===step?1:0);
}
export function mountFeet(g, stance='idle') {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let stopped=false,mode,frame;
  const origin=performance.now();
  function tick(now){
    const next=reduced.matches?'idle':stance;
    if(mode!==next){mode=next;g.dataset.motion=mode;setupFeet(g);}
    const values=feetState(now-origin,stance,reduced.matches);
    [...g.children].forEach((n,i)=>n.style.opacity=String(values[i]??0));
    if(!stopped)frame=requestAnimationFrame(tick);
  }
  tick(origin);
  return ()=>{stopped=true;cancelAnimationFrame(frame)};
}

export const shoeDefs="<g xmlns=\"http://www.w3.org/2000/svg\" id=\"demo-shoe-l\"><path d=\"M-3,-8C-5.5,-8 -6.8,-4.8 -6.6,-.8 -6.4,2.2 -5.2,4.6 -4.2,6 -3,6.5 -.2,6.5 .8,6 1.7,4.4 2.4,1.6 2.2,-1.4 1.9,-5.2 -.2,-8 -3,-8Z\"/><path d=\"M-4.5,8.4C-3.2,8 -.4,8 .6,8.4L.3,12.6C.1,14.3 -1,14.9 -2.1,14.9 -3.2,14.9 -4.3,14.2 -4.5,12.6Z\"/></g><g xmlns=\"http://www.w3.org/2000/svg\" id=\"demo-shoe-r\"><path d=\"M3,-8C5.5,-8 6.8,-4.8 6.6,-.8 6.4,2.2 5.2,4.6 4.2,6 3,6.5 .2,6.5 -.8,6 -1.7,4.4 -2.4,1.6 -2.2,-1.4 -1.9,-5.2 .2,-8 3,-8Z\"/><path d=\"M4.5,8.4C3.2,8 .4,8 -.6,8.4L-.3,12.6C-.1,14.3 1,14.9 2.1,14.9 3.2,14.9 4.3,14.2 4.5,12.6Z\"/></g>";
