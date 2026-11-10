# WIZAMAP Runtime · MAP_DATA 2.0

RP context → Gemini produces filtered MAP_DATA and loader HTML → jsDelivr fetches commit-pinned bundle → Preview chooses an actual SVG template or draws only the active indoor scene. No seed/storage/backend and no fake NPC coordinates.

**Data:** `runtime/map-data.schema.json`, `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json` (747 source entries, 726 canonical places), `runtime/atlas-index.json` (21 old-ID aliases, explicitly verified bindings and scope rules).

**Generation:** 10 approved Stage 2 layout families, flexible floor/cluster presets, exact room polygons and insets, door/stair/void exclusion and NPC anchors. One-room scene uses the entire map without making hallways, stairs or extra rooms. Room furnishings/decor are now generated from function defaults or exact MAP_DATA requests, using catalog assets or custom vector shapes. See ../docs/INDOOR_PREVIEW.md. No multi-floor assembly/pathfinding.

**Scope:** Hogwarts scene/zone and tower presets; St Mungo floor presets; the fixed H1/H2/Ministry/outdoor/courtyard maps are not redrawn by the indoor generator. AU generation is only open for CCC 07.18 main room, the London PC house and Liad's Attic. Other five AU maps are preserved but locked for later.

**Exterior actors:** use conservative checked-in visible-ground patches for four exterior templates, or caller-supplied verified spatial geometry. Feet stay on exact SVG coordinates through zoom. Semantic floor elements are automatically walkable. Names for inside actors sit above the roof; hover/tap fades covering artwork to 50% and restores original styles. Ground coordinates stay separate from label placement. Ground behind building silhouettes still requires scene polygons. See `docs/DEVELOPMENT_STATUS.md` and `docs/atlas-coverage.json` for remaining gaps.

Build bundle with `python tools/build_runtime.py --out /tmp/wizamap --ref <full commit SHA>`; after committing bundle pin its exact commit in `ui/preview.html` and `docs/RUNTIME_USAGE.md`. Run CI (Node contract/atlas/geometry, bundle syntax, Python atlas and gallery). Browser/AI Studio live tests remain separate from CI.

Optional fields and defaults: see ../docs/MAP_FLOW.md; the schema is authoritative. assertMapData returns a normalized copy; callers must use that return value. No visibility or RP facts are inferred.

Production viewer accepts application/json#MAP_DATA (preferred safe embedding) or window.MAP_DATA. MAP_DATA editor and WIZAMAP_TEST only exist in explicit data-debug=true builds. Build browser fixtures with --debug; omit it for RP output.
