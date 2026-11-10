# WIZAMAP Demo 3 — production release request

- Scope: `demo-3` ONLY; do not merge into main.
- Source: approved Atlas `atlas-approved-2.0`, schema `3.2.0`, current fixed templates/indoor/outdoor renderer.
- Build: `python tools/build_runtime.py --out /tmp/wizamap-prod --ref $(git rev-parse HEAD)` **without** `--data`, `--debug`, `--embed-atlas`, or `--offline`.
- Publish only `runtime/bundle.js`, preserving immutable jsDelivr source ref for assets/template-spatial/index.
- The subsequent loader/prompt commits must pin the published bundle commit, not a mutable branch. Any regression requires stop, not a fallback to old production.
- AI Studio live RP test is a separate user acceptance gate; do not claim it is complete from CI.

## Supplementary locality release — 64 places

- Reviewed implementation: `627dabbb273aaed5b0a25f11663cac82cbb8f1ef`.
- Adds 64 explicitly authored locality floors; keeps original artwork and canonical ownership. Positions use `illustrative-local-region` provenance, not exact canon coordinates.
- Verification: 74 Node tests, per-place Chromium own-floor checks for all 64, offline/inset framing and full browser regression. Source CI must pass before this request is published.
- Details and inference limits: [DEMO3_LOCALITY_SURFACES.md](DEMO3_LOCALITY_SURFACES.md).
- Rebuild the production candidate from this request commit, then pin loader and prompt to its immutable published bundle commit. AI Studio RP acceptance remains separate.

## Flexible RP spot production release — 2026-11-11

- Source tested: `9ca6358daa3b31602e33373af1f98a21529fd495` (GitHub Validate WIZAMAP: success).
- Fix normalize-first place/actor/hint/visibility references and generic AU name safety.
- Add optional `view.spotType` and `view.nearPlace` to MAP_DATA 3.2.0; generated corridor spots use safe existing corridor floor next to verified room.
- Preserve 694 canonical places, 141 Atlas groups, the 13 fixed templates, AU locks and information gate.
- Build and publish one immutable bundle. Update loader + R14.6 to the published commit after this workflow succeeds.
