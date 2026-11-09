# Indoor architecture elements — stage 2

The ten approved layouts are now adjustable formula families, not ten fixed maps. `runtime/architecture/recipes.mjs` exports `selectIndoorFormula(request)` and `buildIndoorLayout(request)`; `walls.mjs` derives wall segments and real doorway gaps. Source geometry and SVG projection are separate.

Wall elevation is fixed to the approved screenshot's default: 36 design units, 1.8× on corridor-facing elevations, 1.25× for round chambers. There is no height control. No furniture, props, plants, sconces, portraits or imported furniture symbols are included in this package. The main asset library is untouched.

`elements.mjs` contains reusable walls, thresholds, arches and lancet windows. `materials.svg` contains shared tile/stone/wood materials; Gaussian and drop-shadow filters have been removed. Curved faces/caps render in three compound SVG paths rather than per-segment groups. Adjacent collinear walls are merged. Pan updates are coalesced with requestAnimationFrame; a bounded cache retains model/wall computations only.

Build and test:

```sh
python tools/build_architecture_review.py --out /tmp/wizamap-indoor
node --test tools/test_architecture.mjs
node tools/test_architecture_browser.cjs http://127.0.0.1:PORT/WIZAMAP_Indoor_Stage2.html
```

Only one source shell is maintained. Build emits packed HTML and a byte/hash report outside the repository. Download preserves the packed document; no external requests are needed. No atlas or outdoor generation is implemented in this stage. No storage/seed is introduced. This request API is internal geometry input, not a replacement for MAP_DATA. See `docs/INDOOR_STAGE2.md` for parameters, selection precedence and limits.
