# WIZAMAP · Relief
SVG.js architectural atlas. Open index.html next to wzw-engine.js for the full interactive demo. The engine contains its own library and artwork. The selector includes 70 location sheets and 12 registry indexes. Indexed rooms without bespoke drawings use procedural schematics.

## Live preview
Place a div with id wzw-map-root in the body. Set window.MAP_DATA before loading wzw-engine.js. Omit WIZAMAP_DEMO for live use. No chat, NPC schedule or quest-generation rules are stored by the renderer.

Fields: base (atlas key), terrain, meta{date,time,quote}, focus{name,place}, places[{id,name,slot?,kind?,x?,y?,connects?,activity?,arch?}], actors[{name,place,faction?,stance?,activity?,arch?}], routes[{from,to}], hints[{name,place,desc}]. Live mode renders only supplied places. Match atlas IDs or names inside the selected base to reuse slots. Supply both x and y for explicit centre anchors. Corridor is an independent place. New scopes use a custom layout. Include only established links, publicly supported factions and visible people. Example base keys: campus, region, britain, world, dungeon, ground, hall, seven, ccc, village, diagon, station, train, loft1, white0, home1. See atlas.json for the full list.

## Artwork and dependencies
Original relief SVG forms and reusable variants. SVG.js (MIT); world-atlas / Natural Earth for geographic outlines. Schematic markers indicate approximate display positions. NPCs and quests in the demo are fictional fixtures.

## Validation
Chromium smoke-tested all 82 selections, corridor selection, mobile viewport and isolated live data without demo fixtures.
