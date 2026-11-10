# Demo 3 — implementation checkpoints

## Approved source and scope

The user's replacement atlas is preserved verbatim in `maps/WZW_ATLAS_APPROVED.md`.
It supersedes the old atlas as the specification. **The runtime index has not yet
been migrated.** Do not claim the old 726-place/90-lock figures are the new target.

All implementation stays on `demo-3`; no new branch or merge to main.

Approved remaining order:
1. Compile the replacement atlas with one owner per real place (TEMPLATE / ATLAS / AU), preserve room codes and directional scopes, migrate technical bindings. Enable all listed CCC rooms, PC house and Liad's Attic; keep five other AU maps locked.
2. PC-driven selector/locality using the new ownership. Fixed templates stay fixed.
3. One indoor engine for every generated interior, including small rooms/houses. Assigned corridor family is fixed; room dimensions/design/placement and furnishings are flexible. Required atlas/RP rooms cannot be dropped. Add three light wood/brick/stone material presets.
4. Outdoor generation from existing element assets, without applying indoor corridor families.
5. Furnishings and paint order: floor, furniture, footsteps, actor tags. Simplify obstacles to meaningful blocked regions; seats/sofas do not need detailed exclusion.
6. Template placement: exclude Ministry 1–7 cutaway from this positioning/occlusion pass. For H1/H2/Diagon/Hogsmeade verify walkable surfaces, place indoor labels on walls rather than roofs, show roof indicators for actors hidden behind buildings, hover/tap reduces the occluding building to opacity 0.3. Flat maps need simple sensible placement.
7. Recompute coverage from the new atlas; old 84 is historical, not the new completion target. Synchronize MAP_DATA/prompt/visibility; regression tests and candidate build.
8. Only after acceptance, rebuild/re-pin the production bundle and verify real RP in AI Studio. No AI Studio acceptance has occurred.

## Checkpoint 0 — fix inherited blockers before atlas migration

Changes:
- Retain upstream custom/exterior declaration repair; custom buildings now retain their walls, and outdoor-only places remain ground rather than indoor rooms.
- Honor the resolved indoor plan when buildGeometry is called without an override.
- Restore standalone canonical-interior fallback while retaining missing-template and outdoor-surface errors. Template ownership metadata prevents silent indoor fallback for unbound template locations.
- Tower formula no longer converts a supplied room into a cramped staircase; all supplied room IDs remain furnished rooms.
- Retain upstream multiline-import bundler repair and verify candidate syntax.
- Include every Node test and the new Demo 3 browser regressions in CI. Retain upstream schema 3.1/50-NPC record-limit tests and duplicate-ID rejection.
- Run loader regression against the freshly built candidate rather than the stale production artifact. This does not certify or update the checked-in production bundle.

Local verification:
- 71/71 Node tests PASS after synchronizing upstream, including all 44 castle + 27 tower scopes.
- Candidate build and `node --check` PASS.
- Artwork validation: 13 maps, 2718 shared vectors, references valid.
- Python atlas (5), inventory (3), scenery (3) tests PASS.
- Existing coverage-review consistency check PASS against its historical 91 records.
- Chromium source regressions: locality expands to 5 rooms; layout stable with 15 NPC records; at most 10 NPC tags plus PC; custom one-room parcel; mobile; no unexpected page errors.

This checkpoint does **not** complete atlas replacement, new material presets,
full procedural outdoor generation, wall labels/30% opacity, or the template
coverage audit. Existing opacity/roof-label tests still verify the old behavior.

Concurrent updates: synchronized demo-3@3459f18 before publication; retained upstream prompt/context, minimal undisclosed-room furnishings and all-71-scope tests. The new atlas source is archived exactly as received, with no old runtime ownership migration claimed.

Final merged local result: full candidate Chromium suite PASS (entry, flow, historical coverage bindings, four exterior templates, Demo 2, Demo 3, exact loader with CDN-equivalent CORS headers, fresh offline reopen and six offline experiments). Remote Actions status is not asserted by these local results.

Second concurrent sync: retain e799491's new cross-feature Chromium acceptance suite unchanged, and keep this checkpoint's complementary stable-layout/parcel checks as test_generated_baseline_browser.cjs. Both browser checks PASS locally.
