# WIZAMAP Runtime · MAP_DATA 2.0

RP context → Gemini produces filtered MAP_DATA and loader HTML → jsDelivr fetches commit-pinned bundle → Preview chooses an actual SVG template or draws only the active indoor scene. No seed/storage/backend and no fake NPC coordinates.

**Data:** `runtime/map-data.schema.json`, `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json` (747 source entries, 726 canonical places), `runtime/atlas-index.json` (21 old-ID aliases, explicitly verified bindings and scope rules).

**Generation:** 10 approved Stage 2 layout families, flexible floor/cluster presets, exact room polygons and insets, door/stair/void exclusion and NPC anchors. One-room scene uses the entire map without making hallways, stairs or extra rooms. No multi-floor assembly/pathfinding/furniture regeneration.

**Scope:** Hogwarts scene/zone and tower presets; St Mungo floor presets; the fixed H1/H2/Ministry/outdoor/courtyard maps are not redrawn by the indoor generator. AU generation is only open for CCC 07.18 main room, the London PC house and Liad's Attic. Other five AU maps are preserved but locked for later.

**Exterior actors:** require caller-supplied verified walkable/blocked polygons, optional building occluder polygons, with opacity 0.70 on selected obstruction. The full polygon registry for all exterior artwork is not yet verified.

Build bundle with `python tools/build_runtime.py --out /tmp/wizamap --ref <full commit SHA>`; after committing bundle pin its exact commit in `ui/preview.html` and `docs/RUNTIME_USAGE.md`. Run CI (Node contract/atlas/geometry, bundle syntax, Python atlas and gallery). Browser/AI Studio live tests remain separate from CI.
