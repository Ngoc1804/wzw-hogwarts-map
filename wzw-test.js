/* WzW Map — CDN connection + interactive renderer smoke test v0.1 */
(function(){
"use strict";
function boot(){
 const host=document.getElementById("wzw-map-root");
 if(!host){console.error("[WzW] Missing #wzw-map-root");return;}
 const d=window.MAP_DATA||{};
 const places=Array.isArray(d.places)?d.places:[];
 const actors=Array.isArray(d.actors)?d.actors:[];
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 const style=document.createElement("style");
 style.textContent=`
 #wzw-map-root{font-family:Georgia,serif;color:#38271e;min-height:480px;background:#e9d7b4;background-image:radial-gradient(ellipse at 46% 34%,#fbefd6,#e2c99f);padding:16px;box-sizing:border-box;border:10px solid #3c2b20;box-shadow:inset 0 0 45px #70502a75}
 #wzw-map-root *{box-sizing:border-box}#wzw-map-root header{display:flex;justify-content:space-between;align-items:center;gap:15px;border-bottom:1px solid #95754f;padding:6px 12px 14px}
 #wzw-map-root h1{font-size:clamp(20px,3vw,34px);font-weight:normal;margin:0;color:#743c2f}#wzw-map-root small{color:#72593f}#wzw-map-root .scene{display:grid;grid-template-columns:1fr 210px;gap:12px;margin-top:12px}
 #wzw-map-root .atlas{position:relative;min-height:330px;overflow:hidden;border:1px solid #a48b65;background:repeating-linear-gradient(30deg,transparent 0 48px,#a48b6522 49px 50px)}
 #wzw-map-root .node{position:absolute;transform:translate(-50%,-50%);border:1px solid #79553d;background:#f7e9cb;padding:7px 12px;max-width:170px;cursor:pointer;box-shadow:2px 3px 0 #6c492433;text-align:center}
 #wzw-map-root .node:hover,#wzw-map-root .node:focus{background:white;outline:2px solid #8c483b}#wzw-map-root .npc{font-size:11px;color:#853f34;display:block}
 #wzw-map-root aside{border-left:1px solid #a28a65;padding:12px;overflow-wrap:anywhere}#wzw-map-root .ok{font-size:11px;color:#506741;letter-spacing:1px}
 @media(max-width:600px){#wzw-map-root .scene{grid-template-columns:1fr}#wzw-map-root aside{border-left:0;border-top:1px solid #a28a65}}
 `;
 document.head.appendChild(style);
 host.innerHTML=`<header><div><small>✦ WzW · TEST ENGINE v0.1</small><h1>${esc(d.meta?.zoneName||"HOGWARTS")}</h1></div><div><small>${esc(d.meta?.date||"--/--")} · ${esc(d.meta?.time||"--:--")}</small><p>${esc(d.meta?.floor||"")}</p></div></header><div class="scene"><main class="atlas" id="wzw-test-atlas" aria-label="Bản đồ thử nghiệm"></main><aside><small class="ok">✓ JAVASCRIPT LOADED</small><h2 id="wzw-test-title">Chọn địa điểm</h2><p id="wzw-test-info">Bấm vào một ô trên bản đồ để kiểm tra tương tác.</p><p><small>${places.length} địa điểm · ${actors.length} NPC</small></p></aside></div>`;
 const atlas=host.querySelector("#wzw-test-atlas");
 const info=host.querySelector("#wzw-test-info"),title=host.querySelector("#wzw-test-title");
 const shown=places.length?places:[{id:"test",name:"Đại Sảnh",activity:"Bản đồ thử nghiệm",x:42,y:42},{id:"library",name:"Thư Viện",activity:"Chọn một điểm trên bản đồ",x:75,y:66}];
 shown.forEach((p,i)=>{
   if(p.known===false)return;
   const b=document.createElement("button");b.type="button";b.className="node";
   b.style.left=(typeof p.x==="number"?Math.min(92,Math.max(8,p.x)):17+(i%4)*22)+"%";
   b.style.top=(typeof p.y==="number"?Math.min(86,Math.max(12,p.y)):25+Math.floor(i/4)*23)+"%";
   const a=actors.filter(n=>n.place===p.id).map(n=>n.name).join(", ");
   b.innerHTML=esc(p.name||p.id||"Địa điểm")+(a?'<span class="npc">👣 '+esc(a)+'</span>':"");
   b.addEventListener("click",()=>{title.textContent=p.name||"Địa điểm";info.textContent=(p.activity||"Chưa rõ")+(p.access?" · "+p.access:"");});
   atlas.appendChild(b);
 });
 host.dataset.wzwEngine="ok";
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});else boot();
})();