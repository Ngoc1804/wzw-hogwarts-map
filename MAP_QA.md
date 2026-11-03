# v3 validation

## Automated DOM / data checks

Passed for seven views: grounds, dungeon/corridor, tower, street, furnished hall, an unlisted AU estate and world overview.

- Arbitrary location IDs require no repository registration.
- Current hallway is a selectable place; focus retains the hallway ID.
- Missing/off-view focus is never reassigned to a room.
- 45 supplied figures produce at most 10 person/group tags including the player; supported occupants remain in sidebar data.
- Stable explicit slots keep room positions when input order changes.
- Default seeded selection produces 3 side/hidden + 2 pool; repeated snapshot keeps the selection, a changed snapshot can change it.
- Main quest off / extra / replace are controlled by prompt data.
- LATENT/unknown/hidden places and their occupants/hooks are excluded.
- Hostile names are rendered as text; no HTML/script injection.
- Ineligible/empty pools retain five truthful empty slots.
- Reduced motion / motion:false omit movement.
- Original header/sidebar markup, shoe shapes and ribbon geometry are retained.

## Chromium checks

Tested seven demo views, zoom/reset, actual mouse selection from a room into the corridor, player anchor retention and no JavaScript errors. SMIL sampling confirms a walking segment advances in one direction while an idle sprite retains its anchor. Mobile width was checked at 390×844; map and sidebar stay within the viewport. Final mobile view opens nearer the current location; reset returns to overview.

External Google Fonts were disabled for these checks to verify local fallback rendering. Architectural SVGs were also rendered and visually inspected. No raster illustration dependency was added.

## Boundary

This validates the renderer and example snapshots. It does not prove an LLM will perfectly extract every future campaign's context, or that this release has been opened in the user's own Google AI Studio session. The complete adapter makes the extraction and Information Gate responsibilities explicit. The pre-existing test engine remains available as a fallback.
