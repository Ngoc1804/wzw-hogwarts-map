# WzW Architectural Atlas 2.0

A CDN-loaded SVG map for the WzW roleplay runtime. It renders only supplied PLAYER_SAFE data. Open `index.html` to review five clearly marked demo fixtures. These fixtures are never runtime defaults. The existing `wzw-test.js` remains untouched.

## Preserved from the supplied template

- The full header: zone title, quote, floor, concrete time and date.
- Sidebar: ĐỊA DANH, NGHE HÓNG, QUAN SÁT, AI ĐÓ, HÓNG HỚT TÁM PHƯƠNG; hint count and selection.
- Original left/right shoe SVGs, walking/idle animations, name-ribbon paths and player ribbon styling.
- Selection for rooms, people and hints, zoom and pan.

`original-shell.json` preserves the original UI markup and CSS. `legacy.js` preserves the original drawing helpers; `upgrade.js` replaces architectural rendering and data initialization. No demo character or location is injected into real maps.

## Architectural views

Grounds: castle towers, wings and courtyard; landscape landmarks. Floor: thick irregular walls, doors, buttresses, windows, room-specific furniture. Tower: circular plan and a side elevation containing supplied places only. Street: varied roofs, proportions and shopfronts. Interior: larger furnished room plans. Estate retains the original estate/landscape symbols.

These are WzW display layouts, not a canonical Hogwarts survey. Only explicit routes are traversable map links. Furnishings and unlabelled architectural details are decorative, not evidence of objects or clues in RP. Default geometry is schematic. For fixed authored geography use stable IDs and existing SVG-unit coordinates; do not let the model invent coordinates on each request. Room dimensions are optional; no geometry is required in ordinary outputs.

An animated walking footprint denotes the supplied stance at the supplied place; it does not move the actor to another location. Label leader lines preserve the footprint anchor when a name needs more room.

## Usage

Set `window.MAP_DATA` before loading `wzw-engine.js`. Use `R14.6_FINAL.md` in place of the existing R14.6 only. All other runtime rules stay intact. The old test URL remains valid; the final prompt uses the new engine URL.

Build without dependencies:

```sh
python3 build.py
python3 make-preview.py
node --check wzw-engine.js
```

`index.html` bundles the same engine for offline visual review, except optional Google Fonts. The runtime engine needs network access to load from jsDelivr. A successful old CDN test is not a test of this particular release inside Google AI Studio.

## Design references

- https://minalima.com/product/the-marauders-map/
- https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/art-department/
- https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/sets/diagon-alley/
- https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/sets/the-great-hall/

The included architecture is code-drawn; no remote reference photographs are embedded.
