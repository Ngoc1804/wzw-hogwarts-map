# WIZAMAP — Google AI Studio /map production contract (Demo 3)

Version: `MAP_DATA 3.2.0`; public Atlas context: `atlas-approved-2.0`; pinned production bundle commit: `9223b72ef0938c8dd3ddbf2a839d171cfbd8d9bf`.

## Role split
- Gemini/WzW Runtime **reads only accepted current RP**. No time advance, teleports, NPC/quest invention, GM secrets, future cards, private thoughts or automatic PC decisions. /map is read-only.
- Gemini may use `docs/AI_ATLAS_CONTEXT.json` **only if actually supplied in the AI Studio context**. Never claim to read GitHub by a URL alone. Prefer verified canonical IDs, otherwise exact unambiguous names; unknown/ambiguous canonical places should not be guessed.
- GitHub resolves PC's location: verified fixed template → approved Atlas locality → user-created custom procedural scene. It generates SVG layout, corridors, interior, assets, NPC/markers UI; it **does not invent RP data**.
- Source of truth for allowed visibility: PC actual perception/knowledge (R3.2/R4.2). Do not transmit hidden facts to browser, even in a commented field or HTML. Fog is not secrecy. `visibility.revealedPlaceIds` only for places actually permitted to be named.

## Required MAP_DATA
```json
{
  "schemaVersion": "3.2.0",
  "meta": {"date": "1992-09-11", "time": "16:20", "areaName": "Tên khu RP hiện tại", "quote": "Một câu dẫn dắt vui/bí ẩn không spoil"},
  "view": {"preferredMode": "auto"},
  "places": [{
    "id": "CANONICAL_OR_USER_CREATED_ID",
    "name": "Tên địa điểm đã xác lập",
    "kind": "room",
    "inspector": {
      "overhear": "Một câu mô tả hành động/sự việc đang xảy ra ngay tại đây.",
      "observation": "Mô tả ngắn khung cảnh/cảm giác ở đây."
    }
  }],
  "actors": [{"id": "pc", "name": "Tên PC thực tế", "isPC": true, "placeId": "CANONICAL_OR_USER_CREATED_ID"}],
  "hints": [],
  "visibility": {}
}
```
**Above is STRUCTURE ONLY. Never output example names, dates, actions or placeholder IDs in a real /map.** Replace all content from accepted RP. If no NPC/hints, keep only PC and `hints:[]`. If a field's fact is unknown, omit its optional content instead of inventing.

## Fixed UI bindings
- Under WIZAMAP: `meta.quote` = one witty/mysterious *PC-safe* line or harmless action suggestion, not a forced quest.
- VỊ TRÍ: selected `places[].name`.
- NGHE HÓNG: `places[].inspector.overhear` = one **actual ongoing action or observable event** (not a generic rumor).
- QUAN SÁT: `places[].inspector.observation` = brief local scenery, senses and ambience.
- AI ĐÓ: `actors[]` at same `placeId`, actual known/observable participants and optional `activity`.
- HÓNG HỚT TÁM PHƯƠNG: up to 5 `hints[]` public-safe map events; `type=event|side|hint|pool|life`, no hidden objectives. Maximum: side≤2, hint≤1, pool+life≤2; do not fill quotas.
- On selection of another room, use that **room's** data, not PC's inspector for all rooms.

## References, geometry and gates
- `places` lists PC place + any referenced NPC/hint locations; the engine expands allowed static architecture. Never send full 694-place Atlas or compute SVG coordinates.
- `actors`: exactly one `isPC:true`, at most 50 additional *public* records; engine shows at most 10 NPC/group labels + PC. `groupId` only if actual group; `stance=walk` only if currently moving. `environment=inside|outside` for 2.5D exterior templates; no roof/bbox as ground.
- `connections` only if known through W/RP; unknown corridors visually illustrative, not canon navigation.
- `kind` uses schema enum `room|corridor|hall|tower|house|shop|pub|greenhouse|grounds|street|region|train|special`. Function of a Potions classroom is `kind:room`, optionally `generation.function:potions` (never `kind:potions`).
- Optional `generation` in 3.2: wallMaterial=wood|brick|stone, floorMaterial=wood|brick|stone|tile, floorColor/wallColor/materialStroke as valid hex color, materialScale between 0.5 and 3. Omit for engine auto-design.
- `customScene` **only** for genuinely outside Atlas user-created AU, with `id,name,source:"user-created",kind:"building|interior|outdoor|village",description` and optional surroundings, terrain; describe actual known buildings/rooms/roads in short text. No canonical override, no unlocking other five barred AU maps.
- On unresolved canonical binding/locked/private info/unknown position: return specific OOC error without data substitution, not fake map or nonliteral route.
- Check schema required fields, enums, unique IDs, actor/hint place references, month/time, PC membership, gate/hint quotas; do not expose hidden quest metadata via id/title.

## Output contract
On `/map`, emit exactly **one full ```html code block** with the following loader, replacing only the token `__LIVE_MAP_DATA_JSON__` with current MAP_DATA serialized as valid JSON (escape literal `<` as `\\u003c`). Do not modify URL, bundle code, styles, template SVG or iframe sandbox. No STATUS/BODY/META, invented fiction or outside prose. After output, RP state is unchanged; a Preview failure is not a completed /map.

## Pinned production HTML shell
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
  const response=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@9223b72ef0938c8dd3ddbf2a839d171cfbd8d9bf/runtime/bundle.js');
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

Note: AI Studio must have the canonical Atlas context supplied separately; a GitHub link alone does not inject it into Gemini.
