# WIZAMAP Demo 3 — Google AI Studio setup (production candidate)

## Authoritative release
- Branch: `demo-3`; NOT `main`.
- **Bundle published commit (immutable):** `9223b72ef0938c8dd3ddbf2a839d171cfbd8d9bf`
- **Bundle source/asset commit:** `aa78612107779f8356c626b1dd49160ddbc054d0` (recorded in bundle as `BUNDLE_REF`).
- **Bundle URL:** https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@9223b72ef0938c8dd3ddbf2a839d171cfbd8d9bf/runtime/bundle.js
- **HTML loader:** [ui/preview.html](../ui/preview.html), identical pinned URL. Do NOT substitute `@demo-3`/`@main`.
- **AI MAP_DATA contract:** [docs/MAP_PROMPT.md](MAP_PROMPT.md), schema 3.2.0 (legacy 3.0/3.1 accepted by engine).
- **Atlas AI context:** [docs/AI_ATLAS_CONTEXT.json](AI_ATLAS_CONTEXT.json), `atlas-approved-2.0`. Engine contains full canonical index, but Gemini cannot access the URL contents unless this text is actually supplied to its context.

## In Google AI Studio — one-time installation
1. Back up the current WzW system prompt.
2. In WzW Runtime's full prompt, find both `### R14.6 — /MAP V1` and `### R14.6 — /MAP` (legacy MAP_DATA 2.0). Replace the **entire section up to `### R14.7 — /INVENTORY`** with the supplied `R14_6_WIZAMAP_DEMO3_REPLACE.txt`. Keep R14.7 onward and R0–R14.5 unchanged. Do **not** retain old `focus`, `questPolicy`, `visiblePlaceIds` or the old jsDelivr URL.
3. Supply the full **text contents** of `docs/AI_ATLAS_CONTEXT.json` as a static reference document in the WzW Runtime context/configuration where Gemini can read it. A link alone does not supply content. Do not paste the 694-location Atlas into each map request.
4. Keep this fixed: user sends `/map`; Gemini produces **one HTML code block**, fills `__LIVE_MAP_DATA_JSON__` with *current actual RP* JSON, and outputs no sample NPC, quest or secret. All geometry/CSS/SVG is supplied by the GitHub bundle.
5. If Google AI Studio has separate Preview and source instruction, paste the HTML output as generated; use the Preview renderer. **Do not** append another loader or another map engine.

## What must remain constant
- No server/API. No GitHub writes from WzW. No changing RP state when asking `/map`.
- The bundle and Atlas expose static public architecture; Gemini must remove hidden RP information *before* sending JSON to Preview.
- Each NPC or public event belongs to its exact `placeId`; a PC-place-only payload is sufficient to let the engine expand the full static scope.
- The UI headings remain: VỊ TRÍ, NGHE HÓNG (one actual local action), QUAN SÁT (scene ambience), AI ĐÓ (present cast), HÓNG HỚT TÁM PHƯƠNG (map events), plus a non-spoiling WIZAMAP quote.

## Smoke test after pasting the prompt
1. Ask `/map` in an existing accepted RP scene. Confirm its HTML contains `schemaVersion: 3.2.0` and the **pinned bundle SHA**. Do not run the example JSON as if it were real RP.
2. Verify a canonical indoor room shows the *whole approved local scope*, not one isolated room; and a canonical H1/H2/house-common or similar place selects artwork.
3. Inspect exact PC place, actors at specific rooms, one-sentence action, observation, map events, nonspoiling quote.
4. If the RP actually includes a user-created location outside Atlas, verify it uses `customScene` and provides real room/ground context without overriding a locked canon place.
5. Confirm pan/zoom/selection, 10 NPC labels maximum, desktop sidebar, mobile drawer, no hidden character/quest in JSON or Inspector.
6. If Preview reports an error, collect the exact first error message and the **redacted** MAP_DATA fields involved; don't add fake place IDs to silence it.
7. A passed GitHub CI only covers source/candidate. **Actual Google AI Studio RP acceptance must be run by someone with access to that project.**

## Release diagnostics
- Old loader pin `a86a360d523cfa4045bb212141ba46970371e786` and old `e4b915f9a106aca4bf9684a4ba592b3886f74744` must not appear in the new /map output.
- Old bundled reference `c4566668d00a5b4f3ce38f53b894f2691fe40259` must not be in runtime's `BUNDLE_REF`.
- Production `runtime/bundle.js` deliberately embeds **no** test/RP data, fixtures or editor/debug UI.
- The current source Atlas has **694 canonical places** (`atlas-approved-2.0`); old coverage-84 count is historical, not a release blocker.
