# Bản đồ không gian · Universal Engine 3

The map renderer is reusable across Harry Potter campaigns and AU prompts. It never reads a chat, system prompt or hidden game state itself. The AI running the host prompt resolves current accepted context and passes a PLAYER_SAFE snapshot to the engine.

## Use

1. Open `index.html` for seven clearly labelled demo views: grounds, dungeon/corridor, tower, village, furnished hall, an unlisted AU estate and world view.
2. Replace the old `/MAP` section with **the complete contents of `MAP_COMMAND_COMPLETE.md`**. Its world catalogue, year overlays, policy and HTML shell belong inside each host prompt. Keep the host's numbering if needed; no section number or campaign location ID is required by the engine.
3. Keep runtime state, secrecy rules, world definitions and SAVE conventions intact. Adjust MAP_PROFILE inside that prompt if it has a different title, year policy or main quest system.
4. Run `/map` in that AI session. Paste/run the emitted HTML in its Preview. `R14.6_FINAL.md` is the same current copy for existing users; `R14.6_V2_ARCHIVE.md` retains the old adapter.

## Behaviour

- **Header/sidebar retained:** area/floor/date/exact time/quote, NGHE HÓNG, QUAN SÁT, AI ĐÓ and HÓNG HỚT TÁM PHƯƠNG. The title is BẢN ĐỒ KHÔNG GIAN by default; no WzW/Atlas branding is imposed on a game.
- **Corridors are real map places:** their own ID, name, hit area, selected details, occupants and connection graph. Standing in a hallway is never converted to standing in a room. A focus outside the current view is left outside it.
- **Shared renderer, prompt-owned world:** arbitrary names/IDs, floors, years, factions, NPCs and quests work without GitHub registration. The built-in catalogue is TEXT in the adapter, not a browser-side disclosure database. The engine has architectural grammars and a colour palette, not campaign NPC schedules or year unlock tables.
- **New scopes:** floor, tower, interior, street, grounds, estate and world grammars produce plans from the supplied places. Unknown AU scopes work with the same schema. Fixed slots/cells and a stable layout key preserve geometry; sparse snapshots should keep the same slots instead of compacting them.
- **Density:** at most 10 person/group/community tags including the player. Full supplied occupants remain available in sidebar buttons. Automatic grouping requires a public `displayGroup`; no unknown group or count is invented.
- **Quest policy:** default three side/hidden and two pool slots, seeded selection stable per snapshot. Main is off, extra, or replaces one side as configured by the host. Empty eligible pools produce truthful empty slots, not fake quests.
- **Palette:** four House stripes, international schools, faculty/adults, publicly known antagonists, community and neutral categories. Hidden allegiance is never inferred from a name. See `MAP_PALETTE.md`.
- **Animation:** stationary feet retain their anchor. Walking sprites use local closed circuits or forward-only segments that fade/reset; no ping-pong, no actual travel or time progression. Motion respects reduced-motion settings and `options.motion:false`. Small-screen local views open nearer the current anchor; reset restores the overview.
- **Background:** restrained stone, cobble, grass and ink textures; no image asset dependency. Name leaders, spacing and a hard tag budget limit clutter. Optional external fonts have local serif fallbacks.

## Source and checks

- `original-shell.json`: preserved original UI markup/CSS and SVG footstep definitions.
- `legacy.js`, `upgrade.js`: earlier reusable drawing helpers, retained for compatibility.
- `v3.js`, `upgrade.css`: current behaviour and presentation.
- `build-v3.py`: builds `wzw-engine.js`; `make-preview.py` bundles the same engine and demo data into the self-contained `index.html`.
- `check.cjs`: deterministic DOM checks (requires Linkedom).
- `browser-check.cjs`: Chromium checks (requires Playwright). Optional `WZW_CHROMIUM` executable and JSON `WZW_CHROMIUM_ARGS` support managed environments.

```sh
python3 build-v3.py
python3 make-preview.py
node --check wzw-engine.js
node check.cjs
node browser-check.cjs
```

The preview's fixtures are never runtime defaults. The original `wzw-test.js` is left unchanged. Pinned release URLs let existing prompts retain their selected engine version.

## Limits

Architectural plans are WzW display layouts, not a complete canonical survey. Decorative furniture/textures establish no story objects or clues. A known connection is not access permission. A static JSON snapshot cannot perform live AI reasoning or receive later story changes automatically; call `/map` again for a new accepted snapshot. Browser checks are separate from validation inside the user's Google AI Studio session.

## Reference basis for the prompt catalogue

- https://www.harrypotter.com/fact-file/locations
- https://www.harrypotter.com/fact-file/locations/hogwarts
- https://www.harrypotter.com/fact-file/locations/hogsmeade
- https://www.harrypotter.com/fact-file/locations/the-ministry-of-magic
- https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/art-department/
- https://minalima.com/product/the-marauders-map/

Broad place groupings are supported by these references; display floor grouping and AU extensions remain host-prompt decisions. The engine does not claim a canonical universal floor plan or automatically unlock story secrets by year.
