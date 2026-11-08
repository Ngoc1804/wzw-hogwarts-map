// H1 motion hooks follow the original Demo 1 effects. Static symbol geometry is never mutated.
function mountH1Motion(svg,enabled){
 const N='http://www.w3.org/2000/svg',cam=svg.querySelector('#camera')||svg,callbacks=[],created=[];let raf=0,last=0,clock=0,previous=0,disposed=false;
 const make=(tag,a,p=cam)=>{const e=document.createElementNS(N,tag);for(const[k,v]of Object.entries(a))e.setAttribute(k,v);p.append(e);return e};
 const G=(p,a={})=>make('g',a,p),P=(p,d,a={})=>make('path',{d,fill:'none',stroke:'#9c9277','stroke-width':1,...a},p),cycle=(t,d,delay=0)=>((t-delay)%d+d)%d/d;
 function rotate(e,amplitude,duration,pivot,delay=0){if(!e)return;e.style.removeProperty('transform');e.style.removeProperty('transform-origin');e.style.removeProperty('transform-box');const base=e.getAttribute('transform')||'',b=e.getBBox(),x=pivot?.[0]??b.x+b.width/2,y=pivot?.[1]??b.y+b.height;callbacks.push(t=>e.setAttribute('transform',base+` rotate(${Math.sin((t+delay)/duration*2*Math.PI)*amplitude} ${x} ${y})`))}
 function smoke(parent,x,y,scale=1){const wrap=G(parent,{transform:`translate(${x} ${y}) scale(${scale})`,'data-live-effect':'smoke','pointer-events':'none'});created.push(wrap);for(let i=0;i<4;i++){const g=G(wrap);P(g,'M0 0C-15-10 14-20 0-33C-12-44 15-48 5-60',{stroke:'#8a8375','stroke-width':5,'stroke-linecap':'round'});callbacks.push(t=>{const f=cycle(t,5,i*1.25);g.setAttribute('transform',`translate(${f*13} ${-f*36}) scale(${.35+f*.9})`);g.setAttribute('opacity',Math.sin(f*Math.PI)*.38)})}}
 // Remove inert frame captures of effects replaced by the controlled live layers.
 for(const e of [...svg.querySelectorAll('.v12-smoke-layer,[data-effect="village-smoke"],[data-effect="boathouse-rope"]')])e.remove();
 for(const e of svg.querySelectorAll('[data-emitter="chimney"]'))smoke(e,0,0,.55);
 for(const e of svg.querySelectorAll('[data-effect="train-smoke"],[data-effect="train-steam"]')){e.replaceChildren();smoke(e,0,0,.9)}
 for(const [i,e]of [...svg.querySelectorAll('.cloth')].entries()){
  const first=(e.getAttribute('d')||'').match(/^M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);if(!first)continue;const x=+first[1],y=+first[2],w=Math.max(12,e.getBBox().width);e.style.removeProperty('transform');
  callbacks.push(t=>{const a=Math.sin(t*3.4+i*.5)*4;e.setAttribute('d',`M${x} ${y}C${x+w*.4} ${y+a} ${x+w*.6} ${y-a} ${x+w} ${y+2}L${x+w} ${y+10}C${x+w*.6} ${y+8-a} ${x+w*.4} ${y+8+a} ${x} ${y+8}Z`)})
 }
 for(const [i,e]of [...svg.querySelectorAll('.window-light-wash')].entries()){e.style.removeProperty('opacity');callbacks.push(t=>e.setAttribute('opacity',.09+.14*(.5+.5*Math.sin(t/(2.5+i%4)*Math.PI+i))))}
 for(const [i,e]of [...svg.querySelectorAll('[data-window]')].entries()){
  const glow=e.cloneNode(false);glow.removeAttribute('id');glow.removeAttribute('data-window');glow.setAttribute('fill','#e8ce8f');glow.setAttribute('pointer-events','none');e.after(glow);created.push(glow);callbacks.push(t=>glow.setAttribute('opacity',.10+.13*(.5+.5*Math.sin(t*1.1+i))))
 }
 rotate(svg.querySelector('.ancient-canopy'),.65,8,[320,280]);
 for(const [i,e]of [...svg.querySelectorAll('[data-oak-cluster]')].filter((_,i)=>i%4===0).entries())rotate(e,1,6+i*.3,[+e.dataset.pivotX,+e.dataset.pivotY],i*.7);
 for(const [i,e]of [...svg.querySelectorAll('[data-willow-strand]')].entries()){if(i%2)continue;rotate(e,2.2,8+i*.04,[0,0],i*.15)}
 const mist=svg.querySelector('[data-effect="v12-forest-mist"]');if(mist){for(const [i,e]of [...mist.children].entries()){e.style.removeProperty('transform');e.style.removeProperty('opacity');callbacks.push(t=>{const f=cycle(t,14+i*2,i*3);e.setAttribute('transform',`translate(${-160+f*350} 0)`);e.setAttribute('opacity',Math.sin(f*Math.PI)*.21)})}}
 const pitch=svg.querySelector('[data-element="r2-pitch"]'),track=pitch?.querySelector('.flight-track'),broom=pitch?.querySelector('.flying-broom'),snitch=pitch?.querySelector('.flying-snitch');
 if(track&&broom){const len=track.getTotalLength();callbacks.push(t=>{const f=cycle(t,11),p=track.getPointAtLength(f*len),q=track.getPointAtLength((f*len+2)%len);broom.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI})`);if(snitch){const z=track.getPointAtLength(((f+.1)%1)*len);snitch.setAttribute('transform',`translate(${z.x} ${z.y})`)}})}
 const outline=svg.querySelector('[data-lake-outline]');
 if(outline){
  const b=outline.getBBox(),m=cam.getCTM().inverse().multiply(outline.getCTM()),pts=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(p=>new DOMPoint(...p).matrixTransform(m)),x=pts[0].x,y=pts[0].y,w=pts[1].x-x,h=pts[1].y-y;
  const layer=G(cam,{'data-live-effect':'lake','pointer-events':'none'});created.push(layer);
  const boat=G(layer,{'data-live-effect':'boat'});P(boat,'M-13-3Q0 5 13-3Q7 11-7 8Z',{fill:'#a98e64',stroke:'#78654b'});P(boat,'M-8 1l15 3M1 1l-6-13',{stroke:'#d1ba89','stroke-width':1.1});
  callbacks.push(t=>{const a=cycle(t,26)*2*Math.PI;boat.setAttribute('transform',`translate(${x+w*.56+Math.cos(a)*w*.13} ${y+h*.52+Math.sin(a)*h*.13}) rotate(${Math.sin(a)*8})`)});
  for(let i=0;i<5;i++){const e=make('ellipse',{cx:x+w*(.3+i*.09),cy:y+h*(.27+i*.09),rx:3,ry:1,fill:'none',stroke:'#d4dfc5','stroke-width':.9},layer);callbacks.push(t=>{const f=cycle(t,5,i);e.setAttribute('rx',3+f*24);e.setAttribute('ry',1+f*8);e.setAttribute('opacity',Math.sin(f*Math.PI)*.5)})}
 }
 for(const [i,e]of [...svg.querySelectorAll('.boat-rock')].entries())rotate(e,.6,7+i);
 const owl=svg.querySelector('[data-effect="owl"]');if(owl){owl.style.removeProperty('transform');callbacks.push(t=>{const a=cycle(t,35)*Math.PI*2;owl.setAttribute('transform',`translate(${130+Math.cos(a)*90} ${100+Math.sin(a)*30}) scale(.7)`);owl.setAttribute('opacity',cycle(t,35)<.5?.8:0)})}
 for(const e of svg.querySelectorAll('[data-layer="decor"][data-optional="sign"]'))rotate(e,.7,8);
 const greenhouse=svg.querySelector('[data-element="h1.greenhouses"]');for(const [i,e]of [...(greenhouse?.querySelectorAll('[data-color-fill="foliage"]')||[])].slice(0,3).entries())rotate(e,1.8,6+i);
 for(const i of [0,1,5]){const art=svg.querySelector(`[data-id="village-house-${i}"] [data-element]`),board=[...(art?.querySelectorAll('rect')||[])].find(e=>e.getAttribute('width')==='48'&&e.getAttribute('height')==='27');if(board){const g=G(board.parentNode,{'data-live-effect':'shop-sign'}),b=board.getBBox();g.append(board);rotate(g,.8,8+i,[b.x+b.width/2,b.y])}}
 function tick(now){if(disposed)return;raf=requestAnimationFrame(tick);if(now-last<32)return;last=now;const dt=previous?Math.min(.08,(now-previous)/1000):0;previous=now;if(!enabled()||document.hidden)return;clock+=dt;for(const cb of callbacks)cb(clock);svg.dataset.motionTick=clock.toFixed(2)}
 for(const cb of callbacks)cb(0);svg.dataset.motionEffects=callbacks.length;raf=requestAnimationFrame(tick);
 return ()=>{disposed=true;cancelAnimationFrame(raf);for(const e of created)e.remove()};
}
