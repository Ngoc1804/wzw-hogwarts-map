# WIZAMAP Demo 3 — Google AI Studio setup (flexible /map)

## Release
- Atlas text to paste into Master Prompt: `maps/WZW_ATLAS_APPROVED.md` (`atlas-approved-2.0`).
- Production HTML loader: `ui/preview.html`.
- Canonical MAP_DATA and /map rules: `docs/MAP_PROMPT.md` (R14.6).
- Bundle published commit: `2aeba6e6b7b47244ad2615a4d61798920ab37116`.
- Bundle source commit recorded within bundle: `73484f60abfac699e9b7fa783477cf26dbae3a4e`.
- CDN: https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@2aeba6e6b7b47244ad2615a4d61798920ab37116/runtime/bundle.js

## Configure once
1. Keep a backup of WzW Master Prompt. Paste the full human-readable `maps/WZW_ATLAS_APPROVED.md` directly into the Atlas reference portion of the Master Prompt.
2. Replace ONLY the existing R14.6 /MAP section (ending immediately before R14.7 /INVENTORY) with the full new R14.6 contract from `docs/MAP_PROMPT.md`. Keep R0–R14.5 and R14.7 onward unchanged.
3. Do not load a second `AI_ATLAS_CONTEXT.json` alongside the approved Atlas text; no URL Context tool is required. Gemini sends only live RP MAP_DATA and the fixed loader, never a complete Atlas payload.
4. Test /map first in an actual RP corridor/threshold scene (PC marker outside the nearby classroom), then in a canonical room, a fixed H1/H2 template, a user-created room and a locked AU scope.
5. If test fails, inspect the child iframe's error; "Runtime đã tải" on the parent only proves fetch success, not completed map rendering.

## Invariants
Do not expose private game secrets to the browser. Keep H1/H2, each floor and North/East/South/West separate. Do not generate unapproved AU scenes. Keep 13 templates and their SVG intact. Each release uses an immutable bundle commit, never @main or @demo-3. The CI passed for the source code; actual signed-in Google AI Studio acceptance is a separate test.
