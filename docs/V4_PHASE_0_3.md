# WIZAMAP V4 — PH0 / PH2 / PH3 delivery

Branch: `demo-5`. Baseline: `c6b44ebb5bf6d2b2e73ebcb70f361098ae0cca8d` (demo-3). No bulk merge from `main` or the older Atlas review branch. PH1 skipped as accepted by the user. Test suites / Preview QA not executed per requested scope.

## Delivered

- PH0: branch and baseline manifest `docs/V4_BASELINE.json`; preserved artwork/UI/SVG assets, registry, source IDs and production bundle.
- PH2: semantic V4 schema, tolerant normalizer, one legacy adapter, render-only compatibility state, no blocking RP validation, neutral data fallback in viewer.
- PH3: source-derived Atlas index with W4 context hashes/aliases/references; Fixed/Atlas/Custom resolution; RP-priority blending; layout override; no AU/canon-name/noGenerate exception gate.
- AU ACTIVE/LOCKED source facts remain unchanged. Locked Atlas groups are not automatically expanded; explicit RP input is kept for illustration.
- Full Atlas inventory and original W4 text are included for review.

## Files and dependencies

| Group | Files | Action |
| --- | --- | --- |
| Contract | runtime/map-data.mjs; runtime/map-data.schema.json | Replace public contract and validation boundary |
| Atlas | runtime/atlas-scene.mjs; runtime/atlas-index.json; tools/build_atlas_index.py | Derived lookup, context provenance, reference routing, flexible presets |
| Resolution | runtime/resolve-map.mjs | Replace veto/filter gates with resolution/blending |
| Source | maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json | Add W4 English aliases/context provenance only; keep canonical IDs/names/owners/presets/status |
| Context | maps/WZW_W4_CONTEXT.md | Original upload, unchanged bytes |
| Viewer | runtime/viewer.mjs | Minimal fallback and semantic description bridge; retain Entry and shell |
| Documentation | AGENTS.md; README.md; docs/MAP_FLOW.md; docs/V4_* | Record current branch contract, inventory, baseline and scope |
| Old generated renderer | runtime/geometry.mjs; runtime/architecture/*; runtime/furnishings.mjs; runtime/outdoor.mjs | Retain temporarily for existing viewer until PH4–PH9; do not delete early |
| Fixed helpers | runtime/template-localities.*; runtime/template-spatial.json; runtime/spatial.mjs; runtime/floor-surfaces.mjs | Retain for fixed renderer; not safe to delete with generated code |
| Build | tools/build_runtime.py | Existing module order can compile new source; V4 prefab/bundle migration belongs to PH9 |

## Compile / preservation checks

Atlas index regenerated from source. JavaScript syntax and candidate bundle compilation checked. Baseline hashes and semantic source identity inspected. No browser/Playground acceptance or QA PASS is claimed. `runtime/bundle.js` remains the previously released bundle; it does not yet contain these source changes. No merge or release.

## Remaining phases

PH4 sample architecture and aesthetic approval; PH5 Indoor builder; PH6 prefabs/themes; PH7 Outdoor; PH8 markers/UI; PH9 fixed integration and bundle migration; PH10 Gemini prompt; PH11 final cleanup. Current resolver plans for Outdoor/new custom scenes do not imply that the V4 visual engine is finished.

## PH2–PH3 correction after review

- Missing PC location remains unknown; neither normalizer nor focus/resolver selects the first known room as the PC's actual location.
- Export retains actor placeId and optional legacy generation/inspector/connections/visibility/view/customScene data. These remain optional; they are not new V4 requirements.
- Diagnostics distinguish clean input from recoverable input; rendering is never gated by a validator result.
- Fixed places without bindings receive display-only anchors within the artwork, with no inferred walkable floor. Missing environment/floor uses labels instead of rejecting the map.
- Removed the hardcoded generic-name blacklist; lookup uses existing exact names/aliases and scope uniqueness.
- Production bundle remains unchanged for PH9; no additional game/RP constraints, quotas or required input fields were introduced.
