# Approved raised-wall elements — stage 1

Source: the ten-layout HTML approved in chat. Uses current repository assets, including the later removal of repeated ornaments. The existing 259-element catalog stays authoritative for furniture; this separate architecture catalog indexes procedural building parts and does not duplicate the SVG library.

- `elements.mjs`: SVG factories for floor paths, raised straight/angled wall pieces, arches, thresholds, windows and wall decorations.
- `materials.svg`: shared floor, masonry, cap, lighting and shadow definitions.
- `furnishing.mjs`: approved furniture arrangements referencing existing asset IDs.
- `geometry.mjs`: plan-space wall endpoints and footprint metadata, independent of the raised projection.
- `catalog.json`: element exports, dimensions and recipe IDs. Curved walls are tessellated angled segments; stairs/courtyards remain recipe assemblies in this stage.
- `../../runtime/architecture/recipes.mjs`: the ten approved recipe assemblies. Dimensions remain the approved review values; arbitrary sizing/packing is stage 2.
- `../../runtime/architecture/review.mjs`: isolated review viewer; does not replace the MAP_DATA viewer, alter its UI, write storage, or change the atlas.

Build from repository root:

```sh
python tools/build_architecture_review.py --out /tmp/wizamap-architecture
```

One self-contained HTML is emitted with deterministic gzip payload, shared symbols, only referenced furniture types and unused gradient definitions removed. Download preserves the original packed document. Requires a browser with DecompressionStream support, as the existing atlas does. Build JSON records byte counts, SHA-256 and asset dependencies.

Selection design for the next stage: explicit atlas structure first, AI choice constrained by known relationships second, random selection only when explicitly permitted. This policy is documented, not wired into MAP_DATA in stage 1. No seed or persistence is added.

The generated HTML/ZIP/screenshots and previous experiment versions must not be checked in. Do not delete other branches' preview/runtime code during this extraction. Stage 2 starts only after stage-1 approval.
