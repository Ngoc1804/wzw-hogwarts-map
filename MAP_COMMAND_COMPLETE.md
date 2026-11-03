### /MAP — Bản đồ không gian

Trigger `/map`, `/bando`, case-insensitive; optional `world|castle|floor|local` or a known area/floor name selects the view, not a journey. Resolve this module by its heading/function, never by fixed section numbers. Return ONE complete previewable `html` codeblock using the shell below, then stop. No RP STATUS/BODY/META, elapsed time, PC action, quest activation, NPC relocation or story-state mutation. Do not output engine source or sample data.

#### MAP_PROFILE — per-prompt policy

Use this prompt's actual campaign, school year/date, canon/AU rules, location registry, Information Gate and quest modules. These rules override the catalogue below. No code, character, school class, plot year or quest ID is tied to GitHub.

- Title: `BẢN ĐỒ KHÔNG GIAN`; retain an explicitly different established map title. Header also retains current area, floor, exact `HH:mm`, date and one brief grounded margin quote. Keep the original sidebar sections, footsteps and scroll name tags.
- Maximum **10 visible person/group/community tags in total, including the player**. Keep named plot-relevant/nearby figures; combine only explicitly supported same-place groups with compatible public affiliation. Keep other supported occupants in the location sidebar. Never invent counts, collective membership or named presence to fill space. Busy places may have supported community groups; quiet places stay sparse.
- Default quest panel: **3 side/hidden + 2 pool slots**. Select from currently eligible, PC-perceivable/received hooks; vary selection by accepted scene/turn, keep the same snapshot stable. Hidden means a discoverable received hint, never an unrevealed solution. Main is **off unless this prompt supplies it**; set `options.quests.main` to `extra` for 5+1 or `replace` for 2 side/hidden + 2 pool + 1 main. No eligible hook→an empty slot, never a fabricated quest. Render only a known active main quest. A catalogue or year pack does not create quests.
- Faction colours are presentation only: `gryffindor`, `slytherin`, `ravenclaw`, `hufflepuff` have diagonal stripes; optional `beauxbatons`, `durmstrang`, `international`, `faculty`, `adult`, `antagonist`, `community`, `neutral`. Assign from publicly supported affiliation only. Never reveal a secret identity/allegiance through colour. Unknown affiliation→neutral. Player is red with `★` on both sides of their name.
- Geometry is a persistent display plan, not a canonical architectural survey. Stable scope `layout.key`, fixed columns and each place's `slot`/`cell` preserve positions across snapshots. Keep geometry from accepted MAP layout; never compact/reassign surviving places when others disappear. New places append free slots. Never send hidden place names, hidden IDs or invisible routes to the browser.

#### MAP_WORLD — reusable internal catalogue

This catalogue is worldbuilding input to the AI, **not player knowledge or travel permission**. Select only the current requested scope's established visible places. Host-prompt geography and accepted play override these groups. Names below require no GitHub IDs; reuse the prompt's IDs or derive stable scope-local IDs once. For default slots use the unfiltered order in the chosen group, so filtering hidden places does not shift visible ones. Preserve established floor assignments; where none exists use the named wing, not an invented canon floor number.

| Scope / view | Places available for contextual selection |
|---|---|
| Britain / world | Hogwarts and grounds; Hogsmeade; London wizarding districts; King's Cross / Platform 9¾; Hogwarts Express; known homes, estates, villages, institutions and journey locations |
| Hogwarts / castle | Entrance Hall; Great Hall; teaching wings; library wing; hospital wing; staff/service wings; dungeons; towers; four House residences; grounds exits |
| Dungeons / lower service areas | Potions classroom; relevant teacher's office; ingredient stores; Slytherin common room and dormitory thresholds; kitchens / Hufflepuff residence only where the host layout places them; named corridors and stairs |
| Entrance / Great Hall | Entrance Hall; Great Hall; courtyard and grounds thresholds; known adjoining rooms and circulation |
| Teaching wings / F1–F7 | Established Transfiguration, Charms, Defence, History of Magic and other classrooms; offices; Trophy Room; approved circulation. Exact room/floor pairing comes from this campaign, not a universal guess |
| Library wing | Library; reading/study spaces; Restricted Section behind its own permission/knowledge gate; known connecting corridor |
| Hospital / staff / service | Hospital Wing; staff room; head's office and threshold; caretaker's office; kitchens; storage and known connecting circulation |
| Towers | Astronomy Tower; North Tower / Divination room; Owlery; Gryffindor and Ravenclaw residences; each tower's established landings and stairs |
| House residences | Common room, dormitories and established private/service thresholds for the relevant House; no other House's private occupancy inferred |
| Bathrooms / special rooms | Myrtle's bathroom; prefects' bathroom; other explicitly established rooms. Private use has a separate gate; the catalogue does not reveal secret mechanisms |
| Hogwarts grounds | Castle entrance; courtyards/lawns; greenhouses; Quidditch pitch; Hagrid's hut; lake / boathouse; Willow; Owlery approach; forest boundary; gates and Hogsmeade approach where known |
| Hogsmeade | High Street; Three Broomsticks; Honeydukes; Zonko's; Hog's Head; Madam Puddifoot's; station; Shrieking Shack approach. Add other shops only from this prompt/play |
| Diagon / Knockturn | Leaky Cauldron; Diagon Alley; Gringotts; Ollivanders; Flourish & Blotts; Madam Malkin's; apothecary; owl/pet/Quidditch shops; Knockturn Alley / Borgin & Burkes under their own gates |
| London institutions | Ministry atrium, established departments, offices, lifts and courtrooms; St Mungo's wards; only the known, authorised parts of each |
| Homes / estates / villages | Burrow; Privet Drive; Grimmauld Place; Malfoy Manor; Godric's Hollow; Spinner's End; other campaign homes. Interiors use only established rooms; private/hidden addresses remain gated |
| Travel / events | Railway compartments, corridors, platforms; inns; camps; tournament grounds, guest carriage/ship, event venues and battle-damaged areas only when the campaign establishes them |
| International / AU | Beauxbatons, Durmstrang, Ilvermorny and other supported schools; foreign towns, custom estates, islands or new buildings. No preset floor plan is required: build the accepted scope using the nearest architectural grammar |

**Year overlays live here, not in the engine:** Y1 foundation areas remain bounded by school/private/secret rules; Y2 adds only this campaign's established events/discoveries and leaves main off if absent; Y3 may grant Hogsmeade visit eligibility with actual permission; Y4 may add tournament/guest venues and visiting affiliations when established; Y5–Y7 may expand institutions, travel and changed/damaged spaces only as established. A year never automatically reveals secrets, schedules occupants, grants access or forces canon events. AU prompts may replace every overlay. Secret rooms, concealed passages, Chamber/Requirement-related spaces and plot destinations appear only after this prompt's discovery/receipt gates pass. Retain their conditions; no future spoilers.

#### Context-to-map procedure

1. **NOW:** Read the latest accepted scene and chronology, current status as entry state and later accepted deltas/corrections. Resolve date/time, exact PC place, stance/activity and visible changes. A schedule is not presence; a plan/attempt is not arrival. Missing precision stays `Chưa rõ`.
2. **SPACE:** Read the host's space/travel/location section by meaning, then MAP_WORLD and accepted layout. Select actual floor/wing/grounds/street/tower/interior/world. Include known relevant places and established connections. Route knowledge does not imply access. A remote view changes only the view; omit the player's marker if their actual place is outside it.
3. **CIRCULATION:** A hallway, landing, bridge, lane or path is a first-class place whenever the accepted scene uses it. Give it its own ID/name/activity/access; `kind: corridor` and `connects` only for established adjoining places. Point PC/NPC `place` to that corridor. Never snap a corridor occupant to a nearby room. If a needed current place is missing from the catalogue, add that established place; do not force a preset.
4. **FIGURES:** Read character records, schedules, current obligations and recent observed/received evidence. Respect travel, privacy and Information Gate. Distinguish supported individuals, groups and communities; deduplicate. Prioritise up to 10 tags; retain other supported occupants in `actors` for sidebar selection. `stance: walk` needs confirmed ongoing movement; idle is stationary. The engine's bounded visual loop does not create travel, pass a doorway, advance time or change anchor place.
5. **HOOKS:** Read this prompt's live side/hidden/pool/main systems by function, their stage/windows/receipt/access conditions and accepted progress. Select eligible public-facing hooks as configured above; no secret IDs, objectives, solutions, offscreen activity or future knowledge. A received rumour stays attributed/uncertain. Hook selection opens no event.
6. **LAYOUT & CHECK:** Reuse the same scope key, columns and catalogue slots. For an unseen AU scope, form a new plan from accepted rooms/circulation; do not borrow unrelated places. Preserve old slots when extending it. Avoid labels covering each other; grouping and label leaders are visual aids only. Verify current place, reference IDs, supported links, tag budget, hook slots and secrecy before emitting JSON.

#### MAP_DATA contract

`meta{title,zoneName,floor,date,time,quote}; snapshot; terrain:world|grounds|floor|tower|street|estate|interior; layout{key,columns}; options{maxTags:10,quests{side:3,pool:2,main:false|extra|replace},motion?:boolean}; focus{place,name?,stance:idle|walk,activity?,spotArch?}; places[{id,name,kind,motif?,slot?,cell?,access?,area?,activity?,arch?,connects?,path?}]; routes[{from,to,access?,type?,via?}]; actors[{id,name,place,stance:idle|walk,faction?,priority?,displayGroup?,group?,count?,activity?,arch?,motion?}]; hints[{id,type:side|hidden|pool|main,name,place,desc}]`.

Kinds include `room,corridor,hallway,path,lane,castle,school,house,shop,pub,bank,greenhouse,forest,lake,pitch,hut,region,settlement,station`; new IDs/names work without repository registration. Motifs include `classroom,potions,library,hospital,hall,common,office,dorm,store,astronomy,owl`. Access=`OPEN|RESTRICTED|PRIVATE|BLOCKED`; omit LATENT/unknown/unreceived content entirely. Names and descriptions remain Vietnamese where appropriate.

Slots are stable display cells, not world coordinates. Optional established `x,y` are SVG centre anchors; `w,h,path,via` are display units, never percentages. Use these only for approved layouts. Missing geometry is generated from kinds/slots. `connects` creates known corridor links; no proximity-derived routes. `motion:{type:segment|loop,duration?}` is optional: segment fades at the end and restarts in the same direction; loop follows a closed local circuit. Both remain inside the established location and never stand for actual transit. Idle feet stay anchored. `snapshot` identifies the accepted story turn; it does not advance it.

Do not send the complete world catalogue or prompt text to the browser. Send the current safe scope and state only. Escape `<` in JSON strings as `\u003c`. The engine renders data; it cannot read the chat, prompt, secrets or saved game by itself.

```html
<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bản đồ không gian</title>
</head>
<body>
<div id="wzw-map-root"></div>
<script>
window.MAP_DATA = {"meta":{"title":"BẢN ĐỒ KHÔNG GIAN","zoneName":"","floor":"","date":"","time":"","quote":""},"snapshot":"","terrain":"floor","layout":{"key":"","columns":3},"options":{"maxTags":10,"quests":{"side":3,"pool":2,"main":false}},"focus":{},"places":[],"routes":[],"actors":[],"hints":[]};
</script>
<script defer src="https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@7816657b0bba3eeeda62ead682ef9158ebbd3975/wzw-engine.js"></script>
</body>
</html>
```

Populate MAP_DATA from this accepted state before output; leave no placeholder data. Keep the engine URL fixed. End after the HTML codeblock.
