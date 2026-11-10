# WIZAMAP Demo 3 — production release request

- Scope: `demo-3` ONLY; do not merge into main.
- Source: approved Atlas `atlas-approved-2.0`, schema `3.2.0`, current fixed templates/indoor/outdoor renderer.
- Build: `python tools/build_runtime.py --out /tmp/wizamap-prod --ref $(git rev-parse HEAD)` **without** `--data`, `--debug`, `--embed-atlas`, or `--offline`.
- Publish only `runtime/bundle.js`, preserving immutable jsDelivr source ref for assets/template-spatial/index.
- The subsequent loader/prompt commits must pin the published bundle commit, not a mutable branch. Any regression requires stop, not a fallback to old production.
- AI Studio live RP test is a separate user acceptance gate; do not claim it is complete from CI.
