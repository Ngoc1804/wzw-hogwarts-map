# R14.6 — /MAP · WIZAMAP Demo 3 flexible location

Version: MAP_DATA 3.2.0 · Atlas: atlas-approved-2.0 · Published bundle: `2aeba6e6b7b47244ad2615a4d61798920ab37116`.

## Core contract
- **READ ONLY:** At /map, observe the exact accepted RP snapshot. Never advance date/time, move PC/NPC, invent actions/events/rooms, change game state or reveal private information. After the output, RP remains unchanged.
- **Atlas is already supplied:** The user pastes the full approved `maps/WZW_ATLAS_APPROVED.md` into the Master Prompt. Do not request `AI_ATLAS_CONTEXT.json`, re-fetch an Atlas URL, or generate IDs from guessed room names. Gemini identifies a *known zone and relative spot*; GitHub contains the canonical Atlas index and all template geometry.
- **Information Gate:** Only PC-received/visible facts under R3.2/R4.2 enter MAP_DATA. No secret plans, future events, unknown NPCs, private thoughts, hidden facts, or restricted AU rooms even in invisible attributes/IDs. A room name publicly existing in the Atlas does not override the PC's access rules.
- **Scene selection:** Verified fixed template → verified Atlas scope by actual PC place/nearPlace → genuine user-created location with customScene. Never merge directions or different floors; H1/H2 have separate ownership.
- **Relative spot:** Separate area/cluster from PC's point of standing. For a corridor, threshold or small RP alcove, use `view:{spotType:"corridor"|"threshold"|"adhoc",nearPlace:"Verified nearby room name"}`; add a unique local `places[]` record with `kind:"corridor"`, referenced by PC/NPC. The engine renders the surrounding approved scope and places actors on an existing safe corridor, not inside nearPlace. `view.scopeId` may be supplied only if *verified*, e.g. `hogwarts/f1/0`; it need not be guessed. For an ordinary room, reference that actual room and use `spotType:"inside_room"` or omit it. Outdoors use the real approved H1/H2 location and, optionally, `spotType:"outdoor"`.
- **No geometry invention:** Small transition spots are interactive marks, not extra canon rooms. Generated corridors and interior decoration are illustrative, not confirmed travel routes or plot facts. A user-created house/inn outside Atlas requires an explicit, short `customScene` and only rooms truly established in RP.

## MAP_DATA (only current RP, no fixtures)
Required: `schemaVersion:"3.2.0"`, `meta:{date:"YYYY-MM-DD",time:"HH:MM",areaName}`, `places:[{id,name,kind}]`, `actors:[{id,name,isPC:true,placeId}]`. Exactly one PC; all actor/hint placeIds must refer to an included place. Optional `view:{preferredMode:"auto",scopeId?,spotType?,nearPlace?}`, `connections:[]`, `hints:[]`, `visibility:{}`, `customScene` for verified user-created locations. No `focus`, `questPolicy`, `visiblePlaceIds`, template SVG, room lists, or invented positions.
- Use simple, unique local IDs (`pc`, `draco_malfoy`, `rp-corridor`). Exact canonical IDs are optional: the engine normalizes unique canonical English/Vietnamese names before validation. Do not use a similar but nonmatching name as proof of a room.
- Place `kind` is one of `room|corridor|hall|tower|house|shop|pub|greenhouse|grounds|street|region|train|special`. Furnishings, polygon coordinates and wall geometry are not required from Gemini.
- `meta.quote`: one short PC-safe witty/atmospheric line, or omit. `places[].inspector.overhear`: short *observed ongoing action* at that place. `observation`: local environment and senses. Do not fill with speculation.
- `actors[]`: only PCs/NPCs actually present and visible or correctly known at their own placeId. Separate rooms require separate references. Engine limits rendered NPC labels; do not change RP to fill slots.
- `hints[]`: only verified, PC-safe events at proper places, max five total; `side<=2`, `hint<=1`, `pool+life<=2`. An event is not automatically a quest.
- `visibility.revealedPlaceIds` reveals only names actually permitted for this PC; never put undisclosed RP in HTML. Fog is visual only.
- `connections[]` only for RP-established paths, not speculative geometry. AU, CCC and room access locks still apply.
- Unknown or contradictory zone, privacy block or impossible geometry: report a specific narrow OOC blocker instead of silently teleporting characters, unlocking locations, or inventing a map.

## /map output
Return **exactly ONE complete ```html code block**, replacing the token `__LIVE_MAP_DATA_JSON__` in the fixed loader below with JSON from the *current accepted RP*. Escape literal `<` inside JSON as `\\u003c`. No STATUS/BODY/META or other prose. Keep the bundle SHA unchanged. AI Studio Preview must actually render before claiming success.

```html
<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WIZAMAP · Demo 3 Production</title>
<style>
html,body{margin:0;min-height:100%;background:#eee4d1}
body{height:100dvh;display:flex;flex-direction:column}
#status{margin:0;padding:8px 12px;font:14px Georgia,serif;color:#604839}
iframe{display:block;width:100%;flex:1;min-height:280px;border:0}
</style>
</head>
<body>
<p id="status" role="status" aria-live="polite">Đang tải WIZAMAP…</p>
<iframe title="Bản đồ RP" sandbox="allow-scripts allow-downloads" referrerpolicy="no-referrer"></iframe>
<script type="application/json" id="rp-map-data">__LIVE_MAP_DATA_JSON__</script>
<script>
(async()=>{
 const status=document.getElementById('status');
 const error=(e)=>{status.textContent='Không mở được WIZAMAP: '+(e&&e.message||String(e));};
 try{
  const raw=document.getElementById('rp-map-data').textContent;
  if(!raw||raw.trim()==='__LIVE_MAP_DATA_JSON__')throw Error('MAP_DATA chưa được thay bằng JSON thật của phiên RP');
  const data=JSON.parse(raw);
  if(!data||typeof data!=='object'||!Array.isArray(data.places)||!Array.isArray(data.actors))
   throw Error('Thiếu MAP_DATA.places hoặc MAP_DATA.actors');
  const response=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@2aeba6e6b7b47244ad2615a4d61798920ab37116/runtime/bundle.js');
  if(!response.ok)throw Error('Runtime HTTP '+response.status);
  const code=await response.text();
  if(!code.includes('BUNDLE_REF'))throw Error('Bundle production không hợp lệ');
  const end='</scr'+'ipt>';
  const json=JSON.stringify(data).replace(/</g,'\\u003c');
  const safeCode=code.replace(/<\/script/gi,'<\\/script');
  document.querySelector('iframe').srcdoc='<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+
  '<script type="application/json" id="MAP_DATA">'+json+end+'<script>'+safeCode+end+'</body></html>';
  status.textContent='Runtime đã tải; trạng thái bản đồ hoặc lỗi dữ liệu hiển thị trong khung.';
 }catch(e){error(e);}
})();
</script>
</body>
</html>
```

Keep R14.7 (/INVENTORY) and all other system sections unchanged.
