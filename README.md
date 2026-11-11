# WIZAMAP V4 · demo-5

Development branch for PH0, PH2 and PH3, based on demo-3 at `c6b44ebb`. PH1 Entry/Preview is accepted. V4 contract/resolver source is implemented; the new architectural engine and production bundle migration are later phases.

- [Current Atlas: complete inventory](docs/V4_ATLAS_CURRENT.md)
- [Original user W4.1 / W4.2 / W4.3](maps/WZW_W4_CONTEXT.md)
- [Canonical owner records](maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json) · [Approved detailed inventory](maps/WZW_ATLAS_APPROVED.md)
- [V4 data flow](docs/MAP_FLOW.md) · [Schema](runtime/map-data.schema.json)
- [PH0–PH3 delivery and remaining work](docs/V4_PHASE_0_3.md) · [Baseline hashes](docs/V4_BASELINE.json)
- [Artwork file guide](docs/PROJECT_MAP.md) · [Editing](docs/EDITING.md)

Atlas remains `atlas-approved-2.0`: 694 owner records, 141 groups, 13 routing references. W4 English aliases supplement existing records; no location IDs are renumbered. Atlas supports rendering; Gemini controls RP. No backend, world state, pathfinding or session writes.

13 Fixed Templates in `index.html`, approved UI and 259 SVG assets are preserved. `runtime/bundle.js`, `ui/preview.html` and `docs/MAP_PROMPT.md` still belong to the previous published runtime; they are not a V4 release. Build a candidate outside the repo with `python tools/build_runtime.py --out /tmp/wizamap-v4 --ref <40-character-source-commit>`.

Regenerate the runtime Atlas with `python tools/build_atlas_index.py`. Do not edit the derived index by hand. No merge or release in PH0–PH3.
