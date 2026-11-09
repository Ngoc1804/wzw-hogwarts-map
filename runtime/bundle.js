(()=>{
const ASSET_FILES={"seat.dining": "assets/seat.dining.svg", "seat.stool": "assets/seat.stool.svg", "seat.armchair": "assets/seat.armchair.svg", "seat.lounge": "assets/seat.lounge.svg", "seat.bench": "assets/seat.bench.svg", "seat.sofa": "assets/seat.sofa.svg", "seat.corner": "assets/seat.corner.svg", "table.dining": "assets/table.dining.svg", "table.study": "assets/table.study.svg", "table.desk": "assets/table.desk.svg", "table.coffee": "assets/table.coffee.svg", "table.bedside": "assets/table.bedside.svg", "table.prep": "assets/table.prep.svg", "table.long": "assets/table.long.svg", "table.round": "assets/table.round.svg", "table.oval": "assets/table.oval.svg", "storage.bookcase": "assets/storage.bookcase.svg", "storage.double": "assets/storage.double.svg", "storage.cabinet": "assets/storage.cabinet.svg", "storage.drawers": "assets/storage.drawers.svg", "storage.files": "assets/storage.files.svg", "storage.display": "assets/storage.display.svg", "storage.open": "assets/storage.open.svg", "storage.wall": "assets/storage.wall.svg", "storage.wine": "assets/storage.wine.svg", "bed.single": "assets/bed.single.svg", "bed.double": "assets/bed.double.svg", "bed.canopy": "assets/bed.canopy.svg", "bed.bunk": "assets/bed.bunk.svg", "bed.screen": "assets/bed.screen.svg", "fixture.fireplace": "assets/fixture.fireplace.svg", "fixture.stove": "assets/fixture.stove.svg", "fixture.sink": "assets/fixture.sink.svg", "fixture.bathtub": "assets/fixture.bathtub.svg", "fixture.toilet": "assets/fixture.toilet.svg", "fixture.range": "assets/fixture.range.svg", "object.counter": "assets/object.counter.svg", "object.counter-corner": "assets/object.counter-corner.svg", "object.rug": "assets/object.rug.svg", "object.rug-round": "assets/object.rug-round.svg", "object.mirror": "assets/object.mirror.svg", "object.portrait": "assets/object.portrait.svg", "object.clock": "assets/object.clock.svg", "object.chest": "assets/object.chest.svg", "object.crate": "assets/object.crate.svg", "object.barrel": "assets/object.barrel.svg", "object.cart": "assets/object.cart.svg", "object.sack": "assets/object.sack.svg", "object.basket": "assets/object.basket.svg", "accessory.book": "assets/accessory.book.svg", "accessory.book-open": "assets/accessory.book-open.svg", "accessory.scroll": "assets/accessory.scroll.svg", "accessory.ink": "assets/accessory.ink.svg", "accessory.mug": "assets/accessory.mug.svg", "accessory.plate": "assets/accessory.plate.svg", "accessory.teapot": "assets/accessory.teapot.svg", "accessory.pot": "assets/accessory.pot.svg", "accessory.pan": "assets/accessory.pan.svg", "accessory.bottle": "assets/accessory.bottle.svg", "accessory.candle": "assets/accessory.candle.svg", "accessory.lamp": "assets/accessory.lamp.svg", "accessory.chandelier": "assets/accessory.chandelier.svg", "architecture.wall": "assets/architecture.wall.svg", "architecture.wall-corner": "assets/architecture.wall-corner.svg", "architecture.wall-t": "assets/architecture.wall-t.svg", "architecture.wall-curve": "assets/architecture.wall-curve.svg", "architecture.floor-stone": "assets/architecture.floor-stone.svg", "architecture.floor-wood": "assets/architecture.floor-wood.svg", "architecture.door": "assets/architecture.door.svg", "architecture.door-double": "assets/architecture.door-double.svg", "architecture.door-arch": "assets/architecture.door-arch.svg", "architecture.door-round": "assets/architecture.door-round.svg", "architecture.door-iron": "assets/architecture.door-iron.svg", "architecture.hatch": "assets/architecture.hatch.svg", "architecture.window": "assets/architecture.window.svg", "architecture.window-arch": "assets/architecture.window-arch.svg", "architecture.window-round": "assets/architecture.window-round.svg", "architecture.window-shutters": "assets/architecture.window-shutters.svg", "architecture.stairs": "assets/architecture.stairs.svg", "architecture.stairs-l": "assets/architecture.stairs-l.svg", "architecture.stairs-spiral": "assets/architecture.stairs-spiral.svg", "architecture.ladder": "assets/architecture.ladder.svg", "architecture.column-round": "assets/architecture.column-round.svg", "architecture.column-square": "assets/architecture.column-square.svg", "architecture.arch": "assets/architecture.arch.svg", "architecture.balustrade": "assets/architecture.balustrade.svg", "plant.bush": "assets/plant.bush.svg", "plant.flower-bush": "assets/plant.flower-bush.svg", "plant.hedge": "assets/plant.hedge.svg", "plant.fern": "assets/plant.fern.svg", "plant.reeds": "assets/plant.reeds.svg", "plant.grass": "assets/plant.grass.svg", "plant.stump": "assets/plant.stump.svg", "plant.log": "assets/plant.log.svg", "plant.planter": "assets/plant.planter.svg", "plant.hanging": "assets/plant.hanging.svg", "plant.vine": "assets/plant.vine.svg", "terrain.boulder": "assets/terrain.boulder.svg", "terrain.flat": "assets/terrain.flat.svg", "terrain.cliff": "assets/terrain.cliff.svg", "landscape.pond": "assets/landscape.pond.svg", "landscape.stream": "assets/landscape.stream.svg", "landscape.waterfall": "assets/landscape.waterfall.svg", "landscape.path": "assets/landscape.path.svg", "landscape.paving": "assets/landscape.paving.svg", "landscape.steps": "assets/landscape.steps.svg", "landscape.bridge": "assets/landscape.bridge.svg", "landscape.bridge-stone": "assets/landscape.bridge-stone.svg", "landscape.fence": "assets/landscape.fence.svg", "landscape.iron-fence": "assets/landscape.iron-fence.svg", "landscape.gate": "assets/landscape.gate.svg", "landscape.bed": "assets/landscape.bed.svg", "landscape.trellis": "assets/landscape.trellis.svg", "landscape.well": "assets/landscape.well.svg", "landscape.fountain": "assets/landscape.fountain.svg", "landscape.garden-bench": "assets/landscape.garden-bench.svg", "landscape.picnic": "assets/landscape.picnic.svg", "landscape.streetlamp": "assets/landscape.streetlamp.svg", "landscape.dock": "assets/landscape.dock.svg", "landscape.boat": "assets/landscape.boat.svg", "landscape.wheelbarrow": "assets/landscape.wheelbarrow.svg", "landscape.gravestone": "assets/landscape.gravestone.svg", "landscape.tent": "assets/landscape.tent.svg", "building-part.roof-gable": "assets/building-part.roof-gable.svg", "building-part.roof-hip": "assets/building-part.roof-hip.svg", "building-part.roof-dome": "assets/building-part.roof-dome.svg", "building-part.chimney": "assets/building-part.chimney.svg", "building-part.awning": "assets/building-part.awning.svg", "building-part.balcony": "assets/building-part.balcony.svg", "building-part.sign": "assets/building-part.sign.svg", "building-part.dormer": "assets/building-part.dormer.svg", "building-part.planter-box": "assets/building-part.planter-box.svg", "storage.bookcase-top": "assets/storage.bookcase-top.svg", "fixture.fireplace-top": "assets/fixture.fireplace-top.svg", "plant.pot-top": "assets/plant.pot-top.svg", "extra.curtain": "assets/extra.curtain.svg", "extra.lamp-floor": "assets/extra.lamp-floor.svg", "extra.sconce": "assets/extra.sconce.svg", "extra.torch": "assets/extra.torch.svg", "extra.globe": "assets/extra.globe.svg", "extra.books-stack": "assets/extra.books-stack.svg", "extra.blackboard": "assets/extra.blackboard.svg", "extra.towel": "assets/extra.towel.svg", "extra.bucket": "assets/extra.bucket.svg", "extra.rainbarrel": "assets/extra.rainbarrel.svg", "extra.compost": "assets/extra.compost.svg", "extra.woodpile": "assets/extra.woodpile.svg", "extra.flowerbed": "assets/extra.flowerbed.svg", "extra.shower": "assets/extra.shower.svg", "extra.safe": "assets/extra.safe.svg", "wizard.fireplace-stone": "assets/wizard.fireplace-stone.svg", "wizard.fireplace-carved": "assets/wizard.fireplace-carved.svg", "wizard.fireplace-gothic": "assets/wizard.fireplace-gothic.svg", "wizard.fireplace-floo": "assets/wizard.fireplace-floo.svg", "wizard.fireguard": "assets/wizard.fireguard.svg", "wizard.potions-cabinet": "assets/wizard.potions-cabinet.svg", "wizard.library-ladder": "assets/wizard.library-ladder.svg", "wizard.library-curved": "assets/wizard.library-curved.svg", "wizard.display": "assets/wizard.display.svg", "wizard.archive": "assets/wizard.archive.svg", "wizard.broom-rack": "assets/wizard.broom-rack.svg", "wizard.broom-wall": "assets/wizard.broom-wall.svg", "wizard.cauldron": "assets/wizard.cauldron.svg", "wizard.cauldron-large": "assets/wizard.cauldron-large.svg", "wizard.potions-bench": "assets/wizard.potions-bench.svg", "wizard.telescope": "assets/wizard.telescope.svg", "wizard.orrery": "assets/wizard.orrery.svg", "wizard.lectern": "assets/wizard.lectern.svg", "cluster.divination": "assets/cluster.divination.svg", "cluster.research": "assets/cluster.research.svg", "cluster.headmaster": "assets/cluster.headmaster.svg", "cluster.astronomy": "assets/cluster.astronomy.svg", "cluster.books": "assets/cluster.books.svg", "cluster.tea": "assets/cluster.tea.svg", "cluster.candelabrum": "assets/cluster.candelabrum.svg", "decor.portrait": "assets/decor.portrait.svg", "decor.portrait-wall": "assets/decor.portrait-wall.svg", "decor.landscape": "assets/decor.landscape.svg", "decor.armour": "assets/decor.armour.svg", "decor.bust": "assets/decor.bust.svg", "decor.statue": "assets/decor.statue.svg", "decor.grandfather-clock": "assets/decor.grandfather-clock.svg", "decor.mirror": "assets/decor.mirror.svg", "decor.noticeboard": "assets/decor.noticeboard.svg", "decor.planter-floor": "assets/decor.planter-floor.svg", "decor.curtain-tall": "assets/decor.curtain-tall.svg", "decor.curtain-partition": "assets/decor.curtain-partition.svg", "decor.curtain-bed": "assets/decor.curtain-bed.svg", "unique.pensieve": "assets/unique.pensieve.svg", "unique.memory-cabinet": "assets/unique.memory-cabinet.svg", "unique.sorting-hat": "assets/unique.sorting-hat.svg", "unique.goblet-fire": "assets/unique.goblet-fire.svg", "unique.triwizard-cup": "assets/unique.triwizard-cup.svg", "unique.weasley-clock": "assets/unique.weasley-clock.svg", "unique.vanishing-cabinet": "assets/unique.vanishing-cabinet.svg", "wizard.astronomy-cabinet": "assets/wizard.astronomy-cabinet.svg", "wizard.storage-top": "assets/wizard.storage-top.svg", "wizard.display-top": "assets/wizard.display-top.svg", "decor.rug-runner": "assets/decor.rug-runner.svg", "decor.chandelier": "assets/decor.chandelier.svg", "module.house-body-stone": "assets/module.house-body-stone.svg", "crest.gryffindor": "assets/crest.gryffindor.svg", "crest.ravenclaw": "assets/crest.ravenclaw.svg", "crest.hufflepuff": "assets/crest.hufflepuff.svg", "crest.slytherin": "assets/crest.slytherin.svg", "crest.beauxbatons": "assets/crest.beauxbatons.svg", "crest.durmstrang": "assets/crest.durmstrang.svg", "banner.vertical": "assets/banner.vertical.svg", "banner.forked": "assets/banner.forked.svg", "banner.pole": "assets/banner.pole.svg", "banner.plaque": "assets/banner.plaque.svg", "banner.tapestry": "assets/banner.tapestry.svg", "flag.gryffindor": "assets/flag.gryffindor.svg", "flag.ravenclaw": "assets/flag.ravenclaw.svg", "flag.hufflepuff": "assets/flag.hufflepuff.svg", "flag.slytherin": "assets/flag.slytherin.svg", "flag.beauxbatons": "assets/flag.beauxbatons.svg", "flag.durmstrang": "assets/flag.durmstrang.svg", "architecture.owl-tower": "assets/architecture.owl-tower.svg", "architecture.boathouse": "assets/architecture.boathouse.svg", "map.h1.flying-lawn": "assets/map.h1.flying-lawn.svg", "architecture.greenhouses": "assets/architecture.greenhouses.svg", "map.r2-pitch": "assets/map.r2-pitch.svg", "map.r2-dock": "assets/map.r2-dock.svg", "architecture.castle": "assets/architecture.castle.svg", "map.r2-lake": "assets/map.r2-lake.svg", "tree.ancient": "assets/map.r3-ancient-tree.svg", "map.hogwarts-wooden-bridge": "assets/map.hogwarts-wooden-bridge.svg", "tree.willow": "assets/map.willow-redesign.svg", "house.wood.gable": "assets/house.wood.gable.svg", "house.wood.hip": "assets/house.wood.hip.svg", "house.wood.wide": "assets/house.wood.wide.svg", "house.wood.barn": "assets/house.wood.barn.svg", "house.wood.l": "assets/house.wood.l.svg", "house.wood.double": "assets/house.wood.double.svg", "house.brick.low": "assets/house.brick.low.svg", "house.brick.tall": "assets/house.brick.tall.svg", "house.brick.wide": "assets/house.brick.wide.svg", "house.brick.mansard": "assets/house.brick.mansard.svg", "house.brick.l": "assets/house.brick.l.svg", "house.brick.arcade": "assets/house.brick.arcade.svg", "house.basic.rectangle": "assets/house.basic.rectangle.svg", "house.basic.tall": "assets/house.basic.tall.svg", "house.basic.hex": "assets/house.basic.hex.svg", "house.basic.l": "assets/house.basic.l.svg", "house.basic.u": "assets/house.basic.u.svg", "house.basic.round": "assets/house.basic.round.svg", "tree.oak": "assets/tree.oak.svg", "tree.beech": "assets/tree.beech.svg", "tree.birch": "assets/tree.birch.svg", "tree.pine": "assets/tree.pine.svg", "tree.spruce": "assets/tree.spruce.svg", "tree.alder": "assets/tree.alder.svg", "tree.rowan": "assets/tree.rowan.svg", "tree.spreading": "assets/tree.spreading.svg", "tree.slender": "assets/tree.slender.svg", "tree.weeping": "assets/tree.weeping.svg", "tree.bare": "assets/tree.bare.svg", "tree.fruit": "assets/tree.fruit.svg"};
const ASSET_ROOT="https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@373dcb3fa47acc8e23f6c3dfeb3820e78b669636/elements/";
const INDOOR_MATERIALS="<svg xmlns=\"http://www.w3.org/2000/svg\"><defs>\n<linearGradient id=\"stone-face\" x2=\"0\" y2=\"1\"><stop stop-color=\"#b79d76\" /><stop offset=\".45\" stop-color=\"#d4bd94\" /><stop offset=\"1\" stop-color=\"#b79b70\" /></linearGradient><linearGradient id=\"cap-tone\" x2=\".4\" y2=\"1\"><stop stop-color=\"#9a9079\" /><stop offset=\"1\" stop-color=\"#756e60\" /></linearGradient><linearGradient id=\"room-light\" x2=\".7\" y2=\"1\"><stop stop-color=\"#fff0c8\" stop-opacity=\".3\" /><stop offset=\"1\" stop-color=\"#6c5127\" stop-opacity=\".08\" /></linearGradient><linearGradient id=\"dark-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#b29361\" /><stop offset=\"1\" stop-color=\"#765335\" /></linearGradient>\n<pattern id=\"floor\" width=\"44\" height=\"36\" patternUnits=\"userSpaceOnUse\"><rect width=\"44\" height=\"36\" fill=\"#d8c29b\" /><path d=\"M0 0H44V36H0Z\" fill=\"none\" stroke=\"#bfa77f\" stroke-width=\".9\" /><path d=\"M3 2H41\" stroke=\"#eee0bf\" stroke-width=\".8\" opacity=\".7\" /></pattern><pattern id=\"hall-floor\" width=\"76\" height=\"44\" patternUnits=\"userSpaceOnUse\"><rect width=\"76\" height=\"44\" fill=\"#e4cda2\" /><path d=\"M0 0H76M0 22H76M0 0V22M38 22V44\" stroke=\"#c6ab7e\" stroke-width=\".8\" fill=\"none\" /></pattern><pattern id=\"masonry\" width=\"64\" height=\"24\" patternUnits=\"userSpaceOnUse\"><path d=\"M0 0H64M0 12H64M0 24H64M0 0V12M32 12V24\" stroke=\"#958165\" stroke-opacity=\".5\" stroke-width=\"1\" fill=\"none\" /><path d=\"M2 2H62M34 14H62\" stroke=\"#f0dbb4\" stroke-opacity=\".32\" stroke-width=\".8\" /></pattern><pattern id=\"cap-block\" width=\"28\" height=\"15\" patternUnits=\"userSpaceOnUse\"><rect width=\"28\" height=\"15\" fill=\"url(#cap-tone)\" /><path d=\"M0 0H28V15H0Z\" stroke=\"#544f46\" stroke-width=\".7\" fill=\"none\" /><path d=\"M1 1H27\" stroke=\"#d9c8a0\" opacity=\".45\" /></pattern>\n</defs></svg>\n";
const schema={"$schema":"https://json-schema.org/draft/2020-12/schema","$id":"urn:wizawi:wizamap:map-data:2.0.0","title":"WIZAMAP MAP_DATA 2.0.0","type":"object","additionalProperties":false,"properties":{"schemaVersion":{"const":"2.0.0"},"campaignId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"worldId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"snapshotId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"atlasVersion":{"type":"string","minLength":1},"meta":{"type":"object","additionalProperties":false,"properties":{"date":{"type":"string","pattern":"^\\d{4}-\\d{2}-\\d{2}$"},"time":{"type":"string","pattern":"^([01]\\d|2[0-3]):[0-5]\\d$"},"areaName":{"type":"string","minLength":1},"quote":{"type":"string","minLength":1,"maxLength":180}},"required":["date","time","areaName","quote"]},"view":{"type":"object","additionalProperties":false,"properties":{"scopeId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"spaceKind":{"type":"string","enum":["world","region","grounds","street","floor","interior","tower","train"]},"preferredMode":{"type":"string","enum":["auto","template","generated"]},"templateId":{"type":["string","null"],"pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"centerPlaceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"routePlaceIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"uniqueItems":true},"crop":{"type":"boolean"},"spatial":{"$ref":"#/$defs/spatial"},"indoor":{"$ref":"#/$defs/indoor"}},"required":["scopeId","spaceKind","preferredMode","templateId","centerPlaceId","routePlaceIds"]},"focus":{"type":"object","additionalProperties":false,"properties":{"pcActorId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"actualPlaceId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"selectedId":{"type":["string","null"],"pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"}},"required":["pcActorId","actualPlaceId","selectedId"]},"places":{"type":"array","items":{"$ref":"#/$defs/place"},"minItems":1},"connections":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"from":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"to":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"kind":{"type":"string","enum":["doorway","corridor","stairs","lift","path","passage","transport"]},"state":{"type":"string","enum":["open","restricted","blocked"]}},"required":["id","from","to","kind","state"]},"maxItems":60},"actors":{"type":"array","items":{"$ref":"#/$defs/actor"},"minItems":1,"maxItems":11},"hints":{"type":"array","items":{"$ref":"#/$defs/hint"},"maxItems":6},"visibility":{"type":"object","additionalProperties":false,"properties":{"visiblePlaceIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"uniqueItems":true},"fogRegionIds":{"type":"array","items":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"uniqueItems":true,"maxItems":30},"fogRegions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string"},"points":{"type":"array","minItems":3,"items":{"$ref":"#/$defs/point"}}},"required":["id","points"]}}},"required":["visiblePlaceIds","fogRegionIds"]},"questPolicy":{"type":"object","additionalProperties":false,"properties":{"month":{"type":"string","pattern":"^\\d{4}-\\d{2}$"},"packId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"limits":{"type":"object","additionalProperties":false,"properties":{"main":{"type":"integer","minimum":0,"maximum":6},"side":{"type":"integer","minimum":0,"maximum":6},"pool":{"type":"integer","minimum":0,"maximum":6},"life":{"type":"integer","minimum":0,"maximum":6}},"required":["main","side","pool","life"]}},"required":["month","packId","limits"]}},"required":["schemaVersion","campaignId","worldId","snapshotId","atlasVersion","meta","view","focus","places","connections","actors","hints","visibility","questPolicy"],"$defs":{"place":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"name":{"type":"string","minLength":1},"atlasRef":{"type":["string","null"],"pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"kind":{"type":"string","enum":["room","corridor","hall","tower","house","shop","pub","greenhouse","grounds","street","region","train","special"]},"parentId":{"type":["string","null"],"pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"floor":{"type":["string","null"],"minLength":1},"zone":{"type":["string","null"],"enum":["north","east","south","west","core","tower"]},"inspector":{"type":"object","additionalProperties":false,"properties":{"overhear":{"type":"string","maxLength":700},"observation":{"type":"string","maxLength":1000}},"required":["overhear","observation"]},"generation":{"type":["object","null"],"additionalProperties":false,"properties":{"function":{"type":"string","minLength":1},"shape":{"type":"string","enum":["rectangle","L","T","U","round","polygon","straight","curved","cross"]},"furnishings":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"role":{"type":"string","minLength":1},"count":{"type":"integer","minimum":1,"maximum":50}},"required":["role","count"]},"maxItems":30},"width":{"type":"number","minimum":180,"maximum":560},"depth":{"type":"number","minimum":180,"maximum":520}},"required":["function","shape","furnishings"]}},"required":["id","name","atlasRef","kind","parentId","floor","zone","inspector","generation"]},"actor":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"name":{"type":"string","minLength":1},"isPC":{"type":"boolean"},"entityType":{"type":"string","enum":["person","group","community","creature"]},"placeId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"tagType":{"type":"string","enum":["gryffindor","slytherin","ravenclaw","hufflepuff","beauxbatons","durmstrang","teacher","adult","patrol","animal","monster","ghost","unknown","crowd"]},"role":{"type":["string","null"],"minLength":1},"onPatrol":{"type":"boolean"},"stance":{"type":"string","enum":["idle","walk"]},"activity":{"type":"string","maxLength":500},"priority":{"type":"integer","minimum":0,"maximum":100},"positionMode":{"type":"string","enum":["normal","ghost","concealed-passage","animagus","inside-container"]},"positionReason":{"type":["string","null"],"minLength":1},"presenceBasis":{"type":"string","enum":["scene","status","simulation"]},"inspector":{"type":"object","additionalProperties":false,"properties":{"overhear":{"type":"string","maxLength":700},"observation":{"type":"string","maxLength":1000}},"required":["overhear","observation"]},"environment":{"type":"string","enum":["inside","outside"]},"position":{"$ref":"#/$defs/point"}},"required":["id","name","isPC","entityType","placeId","tagType","role","onPatrol","stance","activity","priority","positionMode","positionReason","presenceBasis","inspector"]},"hint":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"packId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"sourceQuestId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"placeId":{"type":"string","pattern":"^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"},"type":{"type":"string","enum":["main","side","pool","life"]},"title":{"type":"string","minLength":1,"maxLength":100},"priority":{"type":"integer","minimum":0,"maximum":100},"inspector":{"type":"object","additionalProperties":false,"properties":{"overhear":{"type":"string","maxLength":700},"observation":{"type":"string","maxLength":1000}},"required":["overhear","observation"]}},"required":["id","packId","sourceQuestId","placeId","type","title","priority","inspector"]},"point":{"type":"object","additionalProperties":false,"properties":{"x":{"type":"number"},"y":{"type":"number"}},"required":["x","y"]},"spatial":{"type":"object","additionalProperties":false,"properties":{"walkableRegions":{"type":"array","items":{"$ref":"#/$defs/region"}},"blockedRegions":{"type":"array","items":{"$ref":"#/$defs/region"}},"occlusionRegions":{"type":"array","items":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1},"targetId":{"type":"string","minLength":1},"points":{"type":"array","minItems":3,"items":{"$ref":"#/$defs/point"}},"interactiveId":{"type":"string","minLength":1}},"required":["id","targetId","points"]}}},"required":["walkableRegions","blockedRegions","occlusionRegions"]},"region":{"type":"object","additionalProperties":false,"properties":{"id":{"type":"string","minLength":1},"points":{"type":"array","minItems":3,"items":{"$ref":"#/$defs/point"}}},"required":["id","points"]},"indoor":{"type":"object","additionalProperties":false,"properties":{"layout":{"type":"string","enum":["auto","horizontal","vertical","ell","tee","cross","court","cloister","windows","curved","tower"]},"knownStructure":{"type":"string","enum":["horizontal","vertical","ell","tee","cross","court","cloister","windows","curved","tower"]},"constraints":{"type":"object","additionalProperties":false,"properties":{"courtyard":{"type":"string","enum":["open","closed"]},"windows":{"type":"boolean"},"curved":{"type":"boolean"},"tower":{"type":"boolean"},"branches":{"type":"integer","minimum":2,"maximum":4},"orientation":{"type":"string","enum":["horizontal","vertical"]}}},"roomWidth":{"type":"number","minimum":180,"maximum":560},"roomDepth":{"type":"number","minimum":180,"maximum":520},"corridorWidth":{"type":"number","minimum":100,"maximum":240},"candidates":{"type":"array","minItems":1,"maxItems":10,"uniqueItems":true,"items":{"type":"string","enum":["horizontal","vertical","ell","tee","cross","court","cloister","windows","curved","tower"]}},"strategy":{"type":"string","enum":["constraints","random"]},"allowRandom":{"type":"boolean"}}}}};
const TOKENS={"schemaVersion": "1.0.0", "owner": "Wizawi – Toà soạn Mộng Mị", "sourceCommit": "9e54f6af50bfb3b9c1429d36c88eed0d1eb87d7f", "placeTags": false, "maxNpcTags": 10, "colors": {"gryffindor": {"name": "Gryffindor", "main": "#8C2939", "accent": "#D2A64D"}, "slytherin": {"name": "Slytherin", "main": "#285846", "accent": "#B8C3BD"}, "ravenclaw": {"name": "Ravenclaw", "main": "#315878", "accent": "#B98551"}, "hufflepuff": {"name": "Hufflepuff", "main": "#D4AA44", "accent": "#3D3830"}, "beauxbatons": {"name": "Beauxbatons", "main": "#83AFD0", "accent": "#3F6484"}, "durmstrang": {"name": "Durmstrang", "main": "#722E3A", "accent": "#B18B5F"}, "teacher": {"name": "Giáo viên", "main": "#685579", "accent": "#C5A66F"}, "adult": {"name": "Người lớn bên ngoài", "main": "#7D5C42", "accent": "#C5AA82"}, "patrol": {"name": "Giám thị / Tuần tra", "main": "#E32636", "accent": "#303238"}, "animal": {"name": "Động vật", "main": "#627A50", "accent": "#C8B07D"}, "monster": {"name": "Quái vật", "main": "#573646", "accent": "#A96D60"}, "ghost": {"name": "Ma / Linh hồn", "main": "#54818A", "accent": "#C5DBD7"}, "unknown": {"name": "Không rõ phe", "main": "#706557", "accent": "#C2AD92"}, "crowd": {"name": "Nhóm / Đám đông", "main": "#526E73", "accent": "#D5BD8A"}}, "style": {"paper": "#eee4d1", "ink": "#49362b", "muted": "#8a745e", "red": "#713b37", "line": "#baa585", "header": "#3B2925"}, "motion": {"idlePeriodMs": 6400, "stepMs": 550, "steps": 6, "hideMs": 2000, "reduced": "idle alternation, no translation"}, "patrolRule": "Use patrol only while explicitly on patrol; prefect otherwise uses normal identity"};
const registry={"schemaVersion": "1.0.0", "source": "maps/catalog.json + maps/interaction-index.json", "sourceHashes": {"maps/catalog.json": "e99b2088ddef8388c508a69f8988f9f4983b420f94e6452094d0d959aa2323b3", "maps/interaction-index.json": "619a7335c8de062276100b75a60a3460d381de61c55be22d4b9c681888483178"}, "templates": {"h1": {"mapId": "h1", "targets": {"forest": ["region-4"], "lake": ["region-3"], "station-dock": ["region:station-dock"], "castle": ["region-0"], "hagrid": ["region:extra:5"], "willow": ["region:extra:2"], "greenhouses": ["region:extra:0"], "owlery": ["region:extra:1"], "quidditch-pitch": ["region:extra:4"], "flying-lawn": ["region:extra:7"], "forecourt": ["region:extra:8"], "hogsmeade": ["region-1"], "hogsmeade-shop-0": ["village-house-0"], "hogsmeade-shop-1": ["village-house-1"], "hogsmeade-shop-2": ["village-house-2"], "hogsmeade-shop-3": ["village-house-3"], "hogsmeade-shop-4": ["village-house-4"], "hogsmeade-shop-5": ["village-house-5"], "hogsmeade-shop-6": ["village-house-6"], "hogsmeade-shop-7": ["village-house-7"], "hogsmeade-shop-8": ["village-house-8"], "hogsmeade-shop-9": ["village-house-9"], "shrieking-shack": ["region-6"], "hogsmeade-station": ["region-2"], "boathouse": ["lakeside-boathouse"], "ancient-tree": ["lakeside-tree"], "hogwarts-express": ["train-v5"]}, "policy": "local-crop-required"}, "h2": {"mapId": "h2", "targets": {"lake": ["h2-place-0"], "wyvern-court": ["h2-place-3"], "mistletoe-court": ["h2-place-4"], "forecourt": ["h2-place-5"], "castle-6": ["h2-place-6"], "great-hall": ["h2-place-7"], "castle-8": ["h2-place-8"], "castle-9": ["h2-place-9"], "castle-10": ["h2-place-10"], "castle-11": ["h2-place-11"], "castle-12": ["h2-place-12"], "castle-13": ["h2-place-13"], "castle-14": ["h2-place-14"], "castle-15": ["h2-place-15"], "castle-18": ["h2-place-18"], "castle-19": ["h2-place-19"], "castle-24": ["h2-place-24"], "castle-25": ["h2-place-25"], "castle-28": ["h2-place-28"], "entrance-hall": ["h2-place-29"], "castle-30": ["h2-place-30"], "castle-31": ["h2-place-31"], "castle-35": ["h2-place-35"], "castle-36": ["h2-place-36"], "quidditch-pitch": ["h2-place-50"], "greenhouses": ["h2-place-54"], "herb-garden": ["h2-place-55"], "hagrid": ["h2-place-56"], "pumpkin-garden": ["h2-place-57"], "owlery": ["h2-place-59"], "ancient-tree": ["h2-place-60"], "willow": ["h2-place-61"], "stands": ["h2-place-70"]}, "policy": "local-crop-required"}, "hall": {"mapId": "hall", "targets": {"courtyard": ["gf-courtyard"], "staff-room": ["gf-staff"], "filch-office": ["gf-filch"], "classroom-11": ["gf-class11"], "sorting-waiting": ["gf-waiting"], "hall-antechamber": ["gf-antechamber"], "entrance-hall": ["gf-entrance"], "broom-cupboard": ["gf-broom"]}, "policy": "local-crop-required"}, "ministry2": {"mapId": "ministry2", "targets": {"department-1": ["min-level-1"], "department-2": ["min-level-2"], "department-3": ["min-level-3"], "department-4": ["min-level-4"], "department-5": ["min-level-5"], "department-6": ["min-level-6"], "department-7": ["min-level-7"]}, "policy": "local-crop-required"}, "express": {"mapId": "express", "targets": {"kings-cross": ["ex-kings"], "hogsmeade-station": ["ex-station"], "express-coach-0": ["coach-0-room-1", "coach-0-room-2", "coach-0-room-3", "coach-0-room-4", "coach-0-room-5"], "express-coach-1": ["coach-1-room-1", "coach-1-room-2", "coach-1-room-3", "coach-1-room-4", "coach-1-room-5"], "express-coach-2": ["coach-2-room-1", "coach-2-room-2", "coach-2-room-3", "coach-2-room-4", "coach-2-room-5"], "express-coach-3": ["coach-3-room-1", "coach-3-room-2", "coach-3-room-3", "coach-3-room-4", "coach-3-room-5"], "standard-coach": ["ex-standard"]}, "policy": "local-crop-required"}, "gryffindor-common": {"mapId": "gryffindor-common", "targets": {"gryffindor-common-room": ["gryffindor-hearth"], "gryffindor-dormitories": ["gryffindor-sleep-0", "gryffindor-sleep-1"]}, "policy": "local-crop-required"}, "ravenclaw-common": {"mapId": "ravenclaw-common", "targets": {"ravenclaw-common-room": ["ravenclaw-hearth"], "ravenclaw-dormitories": ["ravenclaw-sleep-0", "ravenclaw-sleep-1"]}, "policy": "local-crop-required"}, "hufflepuff-common": {"mapId": "hufflepuff-common", "targets": {"hufflepuff-common-room": ["huff-lounge"], "hufflepuff-dormitories": ["hufflepuff-bed-0", "hufflepuff-bed-1", "hufflepuff-bed-2", "hufflepuff-bed-3", "hufflepuff-bed-4"]}, "policy": "local-crop-required"}, "slytherin-common": {"mapId": "slytherin-common", "targets": {"slytherin-common-room": ["sly-lounge"], "slytherin-dormitories": ["slytherin-bed-0", "slytherin-bed-1", "slytherin-bed-2", "slytherin-bed-3", "slytherin-bed-4"]}, "policy": "local-crop-required"}, "village-static": {"mapId": "village-static", "targets": {"shrieking-shack": ["v-shack"], "hogsmeade-homes": ["v-home-6", "v-home-4", "v-home-7", "v-home-3", "v-home-1", "v-home-0", "v-home-9", "v-home-11", "v-home-12", "v-home-13", "v-home-14", "v-home-16", "v-home-17", "v-home-18", "v-home-21", "v-home-22", "v-home-29", "v-home-28", "v-home-23", "v-home-30", "v-home-27", "v-home-24"], "hogsmeade-shop-2": ["v-gladrags"], "hogsmeade-shop-1": ["v-zonkos"], "hogsmeade-shop-5": ["v-broomsticks"], "hogsmeade-shop-0": ["v-honeydukes"], "hogsmeade-shop-6": ["v-dervish"], "village-square": ["v-square"], "hogsmeade-shop-4": ["v-post"], "hogsmeade-shop-3": ["v-quills"], "hogsmeade-shop-7": ["v-hogshead"], "hogsmeade-shop-8": ["v-puddifoot"]}, "policy": "local-crop-required"}, "pitch-static": {"mapId": "pitch-static", "targets": {"commentary": ["q-commentary"], "stands": ["q-stand-0-0", "q-stand-1-0", "q-stand-0-1", "q-stand-1-1", "q-stand-0-2", "q-stand-1-2", "q-stand-0-3", "q-stand-1-3"], "quidditch-pitch": ["q-field"], "pitch-room-0": ["q-building-0"], "pitch-room-1": ["q-building-1"], "pitch-room-2": ["q-building-2"]}, "policy": "local-crop-required"}, "diagon-knockturn": {"mapId": "diagon-knockturn", "targets": {"da-homes": ["da-terrace-7", "da-terrace-11", "da-terrace-13", "da-terrace-17", "da-terrace-20", "da-terrace-8", "da-terrace-9", "da-terrace-10", "da-terrace-12", "da-terrace-14", "da-terrace-15", "da-terrace-16", "da-terrace-18", "da-terrace-19", "da-terrace-21"], "da-ollivanders": ["da-ollivanders"], "da-scribbulus": ["da-scribbulus"], "da-flourish": ["da-flourish"], "da-house-a": ["da-house-a"], "da-quidditch": ["da-quidditch"], "da-menagerie": ["da-menagerie"], "da-gambol": ["da-gambol"], "da-apothecary": ["da-apothecary"], "da-goods": ["da-goods"], "da-print": ["da-print"], "da-weasleys": ["da-weasleys"], "da-tailor": ["da-tailor"], "da-optics": ["da-optics"], "da-stationery": ["da-stationery"], "da-fortescue": ["da-fortescue"], "da-robe-used": ["da-robe-used"], "da-remedies": ["da-remedies"], "da-obscurus": ["da-obscurus"], "da-wizardwear": ["da-wizardwear"], "da-workshop": ["da-workshop"], "da-cafe": ["da-cafe"], "da-potage": ["da-potage"], "da-malkin": ["da-malkin"], "da-eeylops": ["da-eeylops"], "da-twilfitt": ["da-twilfitt"], "da-gold": ["da-gold"], "da-gringotts": ["da-gringotts"], "da-leaky": ["da-leaky"], "ka-candles": ["ka-candles"], "ka-homes": ["ka-block-0", "ka-block-8", "ka-block-9", "ka-block-10", "ka-block-11", "ka-block-1", "ka-block-13", "ka-block-12", "ka-block-2", "ka-block-14", "ka-block-4", "ka-block-3", "ka-block-15", "ka-block-5", "ka-block-6", "ka-block-7"], "ka-entrance": ["ka-entrance"], "ka-upper": ["ka-upper"], "ka-relics": ["ka-relics"], "ka-borgin": ["ka-borgin"], "ka-corner": ["ka-corner"], "ka-gloom": ["ka-gloom"], "ka-dealer": ["ka-dealer"], "ka-bones": ["ka-bones"], "ka-end": ["ka-end"]}, "policy": "local-crop-required"}, "ministry-8-10": {"mapId": "ministry-8-10", "targets": {"ministry-fountain": ["mm-fountain"], "ministry-time": ["mm-time"], "ministry-prophecy": ["mm-prophecy"], "ministry-death": ["mm-death"], "ministry-brain": ["mm-brain"], "ministry-space": ["mm-space"], "ministry-love": ["mm-love"], "ministry-rotunda": ["mm-rotunda"], "ministry-court": ["mm-court"], "ministry-waiting": ["mm-waiting"], "ministry-office": ["mm-office"]}, "policy": "local-crop-required"}}};
const FURNITURE={"desk": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"table-desk\"><defs><linearGradient id=\"table.desk-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"table.desk-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"table.desk-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"table.desk-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"158\" height=\"94\" x=\"49\" y=\"81\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"5\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"144\" height=\"80\" x=\"56\" y=\"88\" fill=\"none\" rx=\"3\"/><path fill=\"none\" d=\"M94.5 91v74M128 91v74M161.5 91v74\"/><rect width=\"142\" height=\"15\" x=\"57\" y=\"153\" fill=\"var(--detail,none)\" data-color-fill=\"detail\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><path fill=\"none\" d=\"M122 160h12\"/></g><g data-layer=\"ornament\" stroke=\"#68503a\" stroke-width=\"1.2\" fill=\"none\"></g></svg>", "table": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"table-dining\"><defs><linearGradient id=\"table.dining-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"table.dining-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"table.dining-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"table.dining-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"180\" height=\"90\" x=\"38\" y=\"83\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"5\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"166\" height=\"76\" x=\"45\" y=\"90\" fill=\"none\" rx=\"3\"/><path fill=\"none\" d=\"M89 93v70M128 93v70M167 93v70\"/></g><g data-layer=\"ornament\" stroke=\"#68503a\" stroke-width=\"1.2\" fill=\"none\"></g></svg>", "chair": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"seat-dining\"><defs><linearGradient id=\"seat.dining-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"seat.dining-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"seat.dining-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"seat.dining-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"64\" height=\"76\" x=\"96\" y=\"90\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"9\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"50\" height=\"62\" x=\"103\" y=\"97\" fill=\"var(--detail,none)\" data-color-fill=\"detail\" rx=\"7\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"72\" height=\"19\" x=\"92\" y=\"83\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"5\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/></g></svg>", "bed": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"bed-single\"><defs><linearGradient id=\"bed.single-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"bed.single-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"bed.single-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"bed.single-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"95\" height=\"178\" x=\"80.5\" y=\"39\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"85\" height=\"170\" x=\"85.5\" y=\"43\" fill=\"var(--surface,none)\" rx=\"6\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"75\" height=\"118\" x=\"90.5\" y=\"88\" fill=\"var(--detail,none)\" data-color-fill=\"detail\" rx=\"5\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><path fill=\"none\" d=\"M91.5 103h73\"/><rect width=\"62\" height=\"27\" x=\"93.5\" y=\"51\" fill=\"var(--surface,none)\" rx=\"7\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/></g></svg>", "shelf": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"storage-files\"><defs><linearGradient id=\"storage.files-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"storage.files-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"storage.files-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"storage.files-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"88\" height=\"184\" x=\"84\" y=\"36\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"74\" height=\"170\" x=\"91\" y=\"43\" fill=\"var(--detail,none)\" data-color-fill=\"detail\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><path fill=\"none\" d=\"M91 86.5h74M122 65.75h12M91 128h74M122 107.25h12M91 169.5h74M122 148.75h12M91 211h74M122 190.25h12\"/></g></svg>", "cabinet": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" id=\"storage-cabinet\"><defs><linearGradient id=\"storage.cabinet-wood\" x2=\".8\" y2=\"1\"><stop stop-color=\"#c0a27b\"/><stop offset=\"1\" stop-color=\"#886746\"/></linearGradient><linearGradient id=\"storage.cabinet-stone\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e2dfc9\"/><stop offset=\"1\" stop-color=\"#acae9a\"/></linearGradient><linearGradient id=\"storage.cabinet-metal\" x2=\".8\" y2=\"1\"><stop stop-color=\"#e1e9df\"/><stop offset=\"1\" stop-color=\"#869e99\"/></linearGradient><linearGradient id=\"storage.cabinet-roof\" x2=\".8\" y2=\"1\"><stop stop-color=\"#8d9f8d\"/><stop offset=\"1\" stop-color=\"#536d63\"/></linearGradient></defs><g stroke=\"#68503a\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.7\"><rect width=\"125\" height=\"170\" x=\"65.5\" y=\"43\" fill=\"var(--base,none)\" data-color-fill=\"base\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><rect width=\"111\" height=\"156\" x=\"72.5\" y=\"50\" fill=\"var(--detail,none)\" data-color-fill=\"detail\" rx=\"2\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><path fill=\"none\" d=\"M72.5 204h111M128 51v154\"/><circle cx=\"119\" cy=\"128\" r=\"2\" fill=\"var(--surface,none)\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/><circle cx=\"137\" cy=\"128\" r=\"2\" fill=\"var(--surface,none)\" stroke=\"var(--ink,#75684f)\" stroke-width=\".9\"/></g></svg>"};
const SHELL="<div class=\"sheet\"><header><div class=\"brand\"><div><div class=\"intro\">\u0110\u1ecba b\u00e0n c\u1ee7a m\u1edb Ph\u00f9 thu\u1ef7 m\u1ed9ng m\u01a1</div><h1>WIZAMAP</h1><div class=\"quote\">\u0110i l\u1ea1c c\u00f3 chi\u1ebfn l\u01b0\u1ee3c v\u1eabn t\u00ednh l\u00e0 \u0111i l\u1ea1c.</div></div></div><div class=\"header-right\"><div class=\"zone\" id=\"zone\"></div><div class=\"clock\"></div><div class=\"date\"></div></div></header><div class=\"layout\"><main class=\"viewport\"><div id=\"mapmount\" class=\"mapmount\"></div></main><aside aria-label=\"Th\u00f4ng tin \u0111\u1ecba \u0111i\u1ec3m\"><button class=\"drawer-toggle\" id=\"drawer-toggle\" aria-expanded=\"false\"><span id=\"drawer-name\">V\u1ecb tr\u00ed</span><span>Th\u00f4ng tin \u2195</span></button><div class=\"identity\"><div class=\"eyebrow\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n  <path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" />\n  <circle cx=\"12\" cy=\"10\" r=\"3\" />\n</svg>\n\n V\u1eca TR\u00cd</div><h2 id=\"place-title\"></h2><div class=\"area\" id=\"place-area\"></div><div class=\"ornament\">\u2767</div></div><section><h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n  <path d=\"M15 12h-5\" />\n  <path d=\"M15 8h-5\" />\n  <path d=\"M19 17V5a2 2 0 0 0-2-2H4\" />\n  <path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\" />\n</svg>\n\n NGHE H\u00d3NG</h3><p id=\"activity\"></p></section><section><h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n  <path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />\n</svg>\n\n QUAN S\u00c1T</h3><p id=\"observation\"></p></section><section><h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n  <path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" />\n  <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" />\n  <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" />\n  <circle cx=\"9\" cy=\"7\" r=\"4\" />\n</svg>\n\n AI \u0110\u00d3</h3><div class=\"actors\" id=\"actors\"></div></section><section><div class=\"questhead\"><h3><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\">\n  <path d=\"M15 12h-5\" />\n  <path d=\"M15 8h-5\" />\n  <path d=\"M19 17V5a2 2 0 0 0-2-2H4\" />\n  <path d=\"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3\" />\n</svg>\n\n H\u00d3NG H\u1edaT T\u00c1M PH\u01af\u01a0NG</h3><small id=\"hintcount\"></small></div><div id=\"quests\"></div></section></aside></div></div>";
const CSS=":root{--ink:#49362b;--muted:#8a745e;--red:#713b37;--line:#baa585;--paper:#eee4d1}*{box-sizing:border-box}html,body{width:100%;height:100%;margin:0;overflow:hidden}body{background:#352720;color:var(--ink);font:14px Georgia,serif}button{font:inherit;cursor:pointer;color:inherit}button:focus-visible,[tabindex]:focus-visible{outline:2px solid #a4724a;outline-offset:3px}button:disabled{opacity:.4;cursor:default}.sheet{width:100%;height:100%;height:100dvh;min-height:0;display:flex;flex-direction:column;border:3px solid #ab906c;background:var(--paper);overflow:hidden}header{flex:none;display:flex;justify-content:space-between;gap:12px;align-items:center;padding:clamp(6px,1vh,10px) clamp(9px,1.5vw,22px);background:#3B2925;color:#f2e5cd}.brand{min-width:0}.seal{display:none}.intro{font-size:clamp(9px,1vw,12px);font-style:italic;letter-spacing:.3px}h1{font-size:clamp(20px,2.2vw,28px);letter-spacing:4px;font-weight:500;margin:1px 0;line-height:1.1}.quote{font-size:clamp(9px,.9vw,11px);font-style:italic;color:#dbc8ad;margin-top:3px}.header-right{text-align:right;max-width:45%}.zone{font-size:clamp(12px,1.5vw,19px);font-weight:bold;font-style:italic;color:#e2c69b}.clock{font-size:clamp(11px,1.1vw,14px);margin-top:4px}.date{font-size:10px;color:#c6ae97;margin-top:2px}.reviewbar{flex:none;display:flex;align-items:center;gap:7px;padding:5px 10px;background:#30221e;border-bottom:1px solid #aa8965;color:#eadbc2;flex-wrap:wrap}.tabs{display:flex;gap:4px}.tab,.review-button,.motion-toggle{padding:5px 8px;font-size:11px;border:1px solid #94745f;background:transparent;color:#eadbc2;white-space:nowrap}.tab.active{background:#e9d8b9;color:#59382c}.review-button{display:flex;align-items:center;gap:5px}.review-button svg{width:13px;height:13px}.review-status{font-size:9px;letter-spacing:1px;margin-left:auto}.dot{display:inline-block;width:4px;height:4px;border-radius:50%;background:#cfab6d;margin-right:5px}.layout{flex:1;min-height:0;min-width:0;display:grid;grid-template-columns:minmax(0,1fr) clamp(220px,25vw,310px)}.viewport{position:relative;min-width:0;min-height:0;overflow:hidden;background:#f1e5ca;border-right:1px solid var(--line)}.mapmount{width:100%;height:100%;position:relative}.mapmount>svg{overflow:visible;display:block;width:100%;height:100%;cursor:grab;touch-action:none}.map-tools{position:absolute;top:34px;left:10px;display:grid;gap:4px;z-index:3}.tool{width:30px;height:30px;display:grid;place-items:center;border:1px solid #a38a67;background:#f3ead7e8;font-size:20px}.tool svg{width:14px;height:14px}.tool:hover{background:#fff5e0}.map-caption{position:absolute;left:13px;top:13px;font-size:9px;letter-spacing:1.6px;color:#7b7055;pointer-events:none;z-index:2}.legend{position:absolute;left:10px;bottom:9px;display:flex;gap:10px;padding:5px 8px;font-size:9px;border:1px solid #ac9977;background:#ede8d6dc;z-index:2;pointer-events:none}.legend b{color:#8c2939}.hintline{position:absolute;bottom:12px;right:12px;font-size:9px;font-style:italic;color:#81775f;pointer-events:none}.place,.village-building,.scenery{cursor:pointer}.place:hover .engraved,.village-building:hover{filter:brightness(1.08) drop-shadow(0 2px 1px #694a3333)}.spot-hit{fill:transparent;stroke:transparent!important;pointer-events:all}[data-id=\"region-1\"]>.spot-hit{pointer-events:none!important}.selected>.engraved{filter:drop-shadow(0 2px 2px #6d493955)}aside{min-width:0;min-height:0;overflow:auto;scrollbar-width:thin;scrollbar-color:#b7a17f transparent;background:#e7ddc8;padding:clamp(12px,1.6vw,23px)}.eyebrow,h3{display:flex;gap:7px;align-items:center;font-size:11px;letter-spacing:1px;color:#784236;font-weight:bold;margin:0 0 8px}.eyebrow svg,h3 svg{width:15px;height:15px;flex:none}h2{font-size:clamp(20px,2vw,27px);font-weight:500;line-height:1.1;margin:0 0 8px}.area{font-size:12px;font-style:italic;color:#826b50}.ornament{display:flex;gap:10px;align-items:center;color:#a1865c;margin:17px 0}.ornament:before,.ornament:after{content:'';height:1px;background:#c5ad8b;flex:1}aside section{margin-bottom:22px}aside p{font-size:12px;line-height:1.65;margin:0}.actors{display:flex;gap:5px;flex-wrap:wrap}.actor-chip{font-size:11px;padding:4px 8px;border:1px solid var(--accent);background:var(--main);color:var(--text,#fff0db)}.actor-chip.light{color:#172344}.questhead{display:flex;justify-content:space-between;gap:5px}.questhead small{font-size:10px;color:#8b7355}.quest{display:flex;gap:9px;width:100%;padding:10px 0;background:none;border:0;border-bottom:1px solid #c4b08c88;text-align:left;font-size:12px}.quest b{color:#8c2939;font-size:16px;font-weight:400}.quest small{display:block;margin-top:4px;color:#947a57;font-size:10px;font-style:italic}.empty{color:#967f62;font-style:italic}.sidebar-foot{font-size:9px;line-height:1.6;border-top:1px solid #c5b18f;padding-top:12px;color:#9b876b}footer{flex:none;display:flex;justify-content:space-between;gap:10px;padding:5px 11px;font-size:9px;background:#30221e;color:#cdb79b}footer button{border:0;background:none;padding:0;font-size:9px;color:#e5d4b8;text-decoration:underline}.ribbon{--main:#8C2939;--accent:#D2A64D;--text:#fff3de;border:0;padding:0;background:none;display:inline-block;vertical-align:middle;min-width:0!important;line-height:0;position:relative;filter:drop-shadow(0 1px 1px #5b403025)}.ribbon svg{display:block;width:100%;height:28px;overflow:visible}.ribbon:hover{filter:brightness(1.12)}.ribbon.light{--text:#172344}.actor-marker foreignObject{overflow:visible}.actor-marker .ribbon svg{height:26px}.cluster-more{position:absolute;right:0;bottom:-10px;background:#59362e;color:#f5ead2;border:1px solid #ba9c63;font-size:9px;padding:2px 5px}.drawer-toggle{display:none}dialog{max-width:1050px;width:calc(100% - 24px);max-height:90dvh;border:1px solid #a28660;padding:0;background:#f0e5cf;color:var(--ink);box-shadow:0 20px 80px #0005;overflow:auto}dialog::backdrop{background:#2a201ab3}.dialog-head{position:sticky;top:0;background:#eadac0;display:flex;align-items:center;justify-content:space-between;padding:17px 22px;z-index:1;border-bottom:1px solid var(--line)}.dialog-head small{display:block;font-size:10px;letter-spacing:1.4px;color:#96704d;margin-bottom:5px}.dialog-head h2{font-size:23px;margin:0}.close{font-size:20px;background:none;border:1px solid #b29a74;width:29px;height:29px}.dialog-body{padding:22px}.dialog-intro{font-size:12px;line-height:1.7;color:#8b7252;margin:0 0 20px}.palette{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px 26px;text-align:center}.codes{font:10px monospace;color:#927b5e;display:flex;gap:12px;justify-content:center;margin-top:9px}.codes i{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:4px}.location-sample{text-align:center;margin:5px 0 23px}.plaque{display:inline-block;border:1px solid #baa481;background:#e9dbc0;padding:7px 19px;font-size:15px}.demo-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.sample{padding:20px;border:1px solid #bba381;background:#f5ebd7}.sample svg{width:100%;height:110px}.sample p{font-size:11px;line-height:1.7;color:#8b7354}.animation-controls{display:flex;justify-content:space-between;align-items:center;margin-top:20px;gap:10px}.animation-controls button{padding:7px 11px;border:1px solid #815744;background:#6b4234;color:#f8ead3;font-size:11px}.phase{font-size:11px;color:#8c2939}.sources{font-size:12px;line-height:1.8}.sources a{color:#8c2939}.source-detail{max-height:200px;overflow:auto;white-space:pre-wrap;font-size:10px}.toast{position:fixed;bottom:30px;left:50%;transform:translateX(-50%);opacity:0;padding:10px 18px;background:#604331;color:#f6ead3;pointer-events:none;z-index:20;font-size:12px}.toast.show{opacity:1}\n@media(max-width:850px){.review-status{display:none}.reviewbar{gap:5px}.layout{grid-template-columns:minmax(0,1fr) 220px}.hintline{display:none}.palette{grid-template-columns:repeat(2,minmax(0,1fr))}}\n@media(max-width:720px){.sheet{border-width:2px}.layout{grid-template-columns:1fr;grid-template-rows:minmax(0,1fr) 40px}.layout.drawer-open{grid-template-rows:minmax(0,1fr) min(34dvh,240px)}.viewport{border-right:0;border-bottom:1px solid var(--line)}aside{padding:0 14px 15px}.drawer-toggle{display:flex;width:100%;position:sticky;top:0;align-items:center;justify-content:space-between;border:0;background:#e7ddc8;padding:11px 0;font-size:12px;z-index:2}.layout:not(.drawer-open) aside>.identity,.layout:not(.drawer-open) aside>section,.layout:not(.drawer-open) aside>.sidebar-foot{display:none}.identity{padding-top:5px}.intro{font-size:9px}.quote{max-width:210px;font-size:9px}.header-right{max-width:43%}.zone{font-size:12px}.clock{font-size:11px}.date{font-size:9px}.reviewbar{gap:4px;padding:4px 6px}.tab,.review-button,.motion-toggle{font-size:10px;padding:4px 6px}.review-button svg{display:none}.map-caption{font-size:8px;letter-spacing:1px}.legend{font-size:8px;gap:8px}.palette{grid-template-columns:1fr}.demo-grid{grid-template-columns:1fr}.dialog-head{padding:12px}.dialog-head h2{font-size:20px}.dialog-body{padding:15px}footer span:last-child{display:none}}\n@media(max-height:560px){.quote,.intro{display:none}header{padding:5px 10px}h1{font-size:21px}.date{display:none}.zone{font-size:12px}.clock{font-size:11px}.reviewbar{padding:3px 7px}.tab,.review-button,.motion-toggle{font-size:10px;padding:3px 7px}}\n@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}\n@media (prefers-reduced-motion:no-preference){\n#mapmount [data-id=\"suspension-bridge\"]{transform-origin:1080px 335px;animation:bridge-breeze 5s ease-in-out infinite alternate}\n#mapmount .tree-canopy{transform-origin:1285px 326px;animation:tree-breeze 6.5s ease-in-out infinite alternate}\n@keyframes bridge-breeze{from{transform:translateY(0)}to{transform:translateY(2px)}}\n@keyframes tree-breeze{from{transform:rotate(-1deg)}to{transform:rotate(1.5deg)}}}\nbody.motion-off #mapmount *{animation-play-state:paused!important}#mapmount .tree-canopy{transform-box:view-box} \n/* Current policy: no location ribbons. Map geometry remains clickable. */\n.plaque,.location-tag{display:none!important}\n/* A low iframe uses the same drawer as a narrow phone. */\n@media(max-height:650px){.layout{grid-template-columns:1fr;grid-template-rows:minmax(0,1fr) 40px}.layout.drawer-open{grid-template-rows:minmax(0,1fr) min(45dvh,240px)}aside{padding:0 14px;overflow:auto}.drawer-toggle{display:flex;width:100%;justify-content:space-between;position:sticky;top:0;background:var(--paper);z-index:5}.layout:not(.drawer-open) aside>.identity,.layout:not(.drawer-open) aside>section{display:none}}\n.mapmount{touch-action:none;min-height:0}.qa-error:empty{display:none}\n\n#actor-action{display:block;font-size:12px;color:var(--paper);margin-inline-start:auto}\n";
const ATLAS_URL="https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@373dcb3fa47acc8e23f6c3dfeb3820e78b669636/index.html";
function check(value, rule, path, errors) {
  if(rule.$ref)rule=schema.$defs[rule.$ref.split('/').at(-1)];
  if('const' in rule && value!==rule.const)errors.push(`${path}: invalid constant`);
  if(rule.type){const types=[rule.type].flat(),actual=value===null?'null':Array.isArray(value)?'array':typeof value;
    if(!types.some(t=>t===actual||(t==='integer'&&Number.isInteger(value)))){errors.push(`${path}: wrong type`);return;}}
  if(value===null)return;
  if(rule.enum&&!rule.enum.includes(value))errors.push(`${path}: invalid enum`);
  if(typeof value==='string'){
    if(rule.minLength&&value.length<rule.minLength)errors.push(`${path}: empty string`);
    if(rule.maxLength&&value.length>rule.maxLength)errors.push(`${path}: string too long`);
    if(rule.pattern&&!new RegExp(rule.pattern).test(value))errors.push(`${path}: invalid format`);
  }
  if(typeof value==='number'&&(!Number.isFinite(value)||value<(rule.minimum??-Infinity)||value>(rule.maximum??Infinity)))errors.push(`${path}: number outside bounds`);
  if(Array.isArray(value)){
    if(value.length<(rule.minItems??0)||value.length>(rule.maxItems??Infinity))errors.push(`${path}: wrong array size`);
    if(rule.uniqueItems&&new Set(value.map(v=>JSON.stringify(v))).size!==value.length)errors.push(`${path}: duplicate item`);
    value.forEach((v,i)=>check(v,rule.items,`${path}[${i}]`,errors));
  }else if(typeof value==='object'){
    for(const k of rule.required||[])if(!Object.hasOwn(value,k))errors.push(`${path}.${k}: required`);
    for(const k of Object.keys(value)){
      if(rule.properties?.[k])check(value[k],rule.properties[k],`${path}.${k}`,errors);
      else if(rule.additionalProperties===false)errors.push(`${path}.${k}: unknown field`);
    }
  }
}
function validateMapData(data) {
  const errors=[];check(data,schema,'MAP_DATA',errors);if(errors.length)return {ok:false,errors};
  const ids=new Set();for(const row of [...data.places,...data.connections,...data.actors,...data.hints]){
    if(ids.has(row.id))errors.push('Duplicate public entity ID');ids.add(row.id);
  }
  const places=new Set(data.places.map(p=>p.id)),visible=new Set(data.visibility.visiblePlaceIds);
  const requirePlace=(id,label)=>{if(!places.has(id))errors.push(`${label}: unknown place`)};
  requirePlace(data.focus.actualPlaceId,'PC');requirePlace(data.view.centerPlaceId,'view center');
  data.view.routePlaceIds.forEach(id=>requirePlace(id,'route'));data.visibility.visiblePlaceIds.forEach(id=>requirePlace(id,'visibility'));
  if(data.focus.selectedId!==null&&!ids.has(data.focus.selectedId))errors.push('Unknown selected entity');
  if(!visible.has(data.focus.actualPlaceId))errors.push('PC place must be visible');
  const pcs=data.actors.filter(a=>a.isPC);
  if(pcs.length!==1||pcs[0]?.id!==data.focus.pcActorId||pcs[0]?.placeId!==data.focus.actualPlaceId)errors.push('Exactly one matching PC required');
  if(data.actors.filter(a=>!a.isPC).length>10)errors.push('At most 10 NPC/group/community tags');
  for(const a of data.actors){
    requirePlace(a.placeId,'actor');if(!visible.has(a.placeId))errors.push('Actor in nonvisible place');
    if(a.positionMode!=='normal'&&!a.positionReason)errors.push('Special actor position needs a reason');
    if(a.tagType==='patrol'&&!a.onPatrol)errors.push('Patrol tag requires onPatrol');
    if(a.onPatrol&&!['prefect','patrol','caretaker'].includes(a.role))errors.push('Patrol duty requires an eligible role');
  }
  const date=new Date(data.meta.date+'T00:00:00Z');
  if(!Number.isFinite(date.valueOf())||date.toISOString().slice(0,10)!==data.meta.date)errors.push('Invalid RP date');
  if(data.questPolicy.month!==data.meta.date.slice(0,7))errors.push('Quest month must match RP month');
  if(Object.values(data.questPolicy.limits).reduce((a,b)=>a+b,0)>6)errors.push('Quest limits total exceeds 6');
  const counts={main:0,side:0,pool:0,life:0},questIds=new Set();
  for(const h of data.hints){
    requirePlace(h.placeId,'hint');if(!visible.has(h.placeId))errors.push('Hint in nonvisible place');
    if(h.packId!==data.questPolicy.packId)errors.push('Hint from another monthly pack');
    const key=h.packId+'/'+h.sourceQuestId;if(questIds.has(key))errors.push('Duplicate quest source');questIds.add(key);
    if(++counts[h.type]>data.questPolicy.limits[h.type])errors.push('Hint type quota exceeded');
  }
  const graph=new Map(data.places.map(p=>[p.id,[]]));
  for(const c of data.connections){requirePlace(c.from,'connection');requirePlace(c.to,'connection');if(c.from===c.to)errors.push('Self connection');graph.get(c.from)?.push(c.to);graph.get(c.to)?.push(c.from);}
  for(let i=1;i<data.view.routePlaceIds.length;i++)if(!graph.get(data.view.routePlaceIds[i-1])?.includes(data.view.routePlaceIds[i]))errors.push('Route has an unlinked step');
  if(data.view.routePlaceIds.length&&data.view.routePlaceIds[0]!==data.focus.actualPlaceId)errors.push('Route must begin at PC');
  // Geometry is explicitly sourced from the current scene: no inferred ground from roof/shape bounds.
  const spatial=data.view.spatial;
  if(spatial){
    for(const [label,regions] of [['walkable',spatial.walkableRegions],['blocked',spatial.blockedRegions],['occlusion',spatial.occlusionRegions]]){
      if(new Set(regions.map(r=>r.id)).size!==regions.length)errors.push('Duplicate '+label+' region ID');
      for(const region of regions)if(!region.points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)))errors.push('Invalid '+label+' polygon');
    }
  }
  const regions=new Set((data.visibility.fogRegions||[]).map(r=>r.id));
  for(const id of data.visibility.fogRegionIds)if(!regions.has(id))errors.push('Fog region needs explicit geometry: '+id);
  return {ok:errors.length===0,errors};
}
function assertMapData(data){const result=validateMapData(data);if(!result.ok)throw new Error(result.errors.join('; '));return data}
// Safe JSON for a non-executable application/json script element. Viewer uses textContent.
function serializeMapData(data){assertMapData(data);return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g,c=>'\\u'+c.charCodeAt(0).toString(16).padStart(4,'0'))}

function resolveMap(data,templates=registry.templates){
 assertMapData(data);
 const places=data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id));
 const ids=Object.keys(templates).filter(id=>places.every(p=>p.atlasRef&&templates[id].targets[p.atlasRef]?.length));
 const id=data.view.templateId?ids.find(id=>id===data.view.templateId):ids[0];
 if(data.view.preferredMode!=='generated'&&id)return {mode:'template',templateId:id,targets:places.map(p=>({placeId:p.id,interactiveIds:templates[id].targets[p.atlasRef]}))};
 if(data.view.preferredMode==='template')throw Error('Requested template cannot cover visible places');
 for(const p of places)if(!p.generation)throw Error('Missing recipe for '+p.id);
 return {mode:'generated',places,connections:data.connections.filter(c=>places.some(p=>p.id===c.from)&&places.some(p=>p.id===c.to))};
}

// Adjustable indoor formula families. No prebuilt room lists or stored layout state.
const FORMULAS=Object.freeze({
 horizontal:['Ngang',2],vertical:['Dọc',2],ell:['Chữ L',2],tee:['Chữ T',3],cross:['Ngã tư',4],court:['Chữ U',3],cloister:['Vòng sân trong',4],windows:['Hành lang cửa sổ',2],curved:['Cánh cong',2],tower:['Nối chân tháp',2]
});
const WALL_HEIGHT=36;
const rectangle=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
const ppath=p=>'M'+p.map(v=>v.join(' ')).join('L')+'Z';
const finite=(v,min,max,name)=>{if(!Number.isFinite(v)||v<min||v>max)throw Error(name+' ngoài phạm vi '+min+'–'+max);return v};
function compatible(id,c){return (!c.courtyard||(c.courtyard==='open'?id==='court':id==='cloister'))&&(!c.windows||['windows','court','cloister','curved'].includes(id))&&(!c.curved||id==='curved')&&(!c.tower||id==='tower')&&(!c.branches||FORMULAS[id][1]===c.branches)&&(!c.orientation||c.orientation!=='vertical'||id==='vertical');}
function selectIndoorFormula(request={},random=Math.random){
 const c=request.constraints||{},known=request.knownStructure,asked=request.layout||'auto';
 if(c.courtyard&&!['open','closed'].includes(c.courtyard))throw Error('Loại sân không hợp lệ');
 if(c.branches&&![2,3,4].includes(c.branches))throw Error('Số nhánh không hợp lệ');
 const validate=id=>{if(!Object.hasOwn(FORMULAS,id))throw Error('Công thức không tồn tại: '+id);if(!compatible(id,c))throw Error('Công thức '+id+' mâu thuẫn ràng buộc');return id};
 if(known){validate(known);if(asked!=='auto'&&asked!==known)throw Error('Yêu cầu mâu thuẫn cấu trúc đã xác lập');return {id:known,source:'known',reason:'Dùng cấu trúc đã xác lập được truyền trong yêu cầu.'};}
 if(asked!=='auto')return {id:validate(asked),source:'explicit',reason:'Dùng công thức được chỉ định, sau khi kiểm ràng buộc.'};
 const candidates=request.candidates||Object.keys(FORMULAS);if(!Array.isArray(candidates)||!candidates.length)throw Error('Thiếu công thức ứng viên');
 candidates.forEach(id=>{if(!Object.hasOwn(FORMULAS,id))throw Error('Ứng viên không tồn tại: '+id)});
 const allowed=candidates.filter(id=>compatible(id,c));if(!allowed.length)throw Error('Không có công thức phù hợp các ràng buộc');
 if(request.strategy==='random'){
  if(request.allowRandom!==true)throw Error('Random chưa được cho phép');const value=random();if(!Number.isFinite(value)||value<0||value>=1)throw Error('Giá trị random không hợp lệ');
  return {id:allowed[Math.floor(value*allowed.length)],source:'random',reason:'Random được cho phép, chỉ chọn trong tập ứng viên hợp lệ.'};
 }
 if(request.strategy&&request.strategy!=='constraints')throw Error('Cách chọn không hợp lệ');
 const preferred=c.tower?'tower':c.curved?'curved':c.courtyard==='closed'?'cloister':c.courtyard==='open'?'court':c.windows?'windows':c.branches===4?'cross':c.branches===3?'tee':c.branches===2?'ell':c.orientation==='vertical'?'vertical':'horizontal';
 return {id:allowed.includes(preferred)?preferred:allowed[0],source:'constraints',reason:'Chọn có điều kiện; không random. AI truyền công thức hoặc ràng buộc, code kiểm và dựng.'};
}
function makeRoom(record,slot,offset,frontage,depth){
 const horizontal=slot.axis==='H',side=slot.side;
 const x=horizontal?slot.x+offset:side==='E'?slot.x-depth:slot.x;
 const y=horizontal?(side==='S'?slot.y-depth:slot.y):slot.y+offset;
 const w=horizontal?frontage:depth,h=horizontal?depth:frontage;
 const r={id:record.id,name:record.name,x,y,w,bottom:y+h,shape:record.shape||'rectangle',doorSide:side};
 r.doorPoint={x:side==='E'?x+w:side==='W'?x:x+w/2,y:side==='N'?y:side==='S'?y+h:y+h/2};
 if(['T','cross'].includes(r.shape)&&frontage<220)throw Error('Phòng T/cộng cần mặt tiền ít nhất 220 để chừa cửa và cổ nối');
 const shapes={L:[[0,0],[.6,0],[.6,.4],[1,.4],[1,1],[0,1]],U:[[0,0],[.3,0],[.3,.55],[.7,.55],[.7,0],[1,0],[1,1],[0,1]],T:[[0,0],[1,0],[1,.4],[.65,.4],[.65,1],[.35,1],[.35,.4],[0,.4]],cross:[[.35,0],[.65,0],[.65,.35],[1,.35],[1,.65],[.65,.65],[.65,1],[.35,1],[.35,.65],[0,.65],[0,.35],[.35,.35]]};
 if(shapes[r.shape])r.poly=shapes[r.shape].map(([a,b])=>{const [u,v]=side==='N'?[1-a,1-b]:side==='E'?[b,1-a]:side==='W'?[1-b,a]:[a,b];return [x+u*w,y+v*h]});
 else if(r.shape==='round'){r.poly=Array.from({length:48},(_,i)=>[x+w/2+w/2*Math.cos(i*Math.PI/24),y+h/2+h/2*Math.sin(i*Math.PI/24)]);r.circular=true;}
 else if(r.shape!=='rectangle')throw Error('Hình phòng không hỗ trợ: '+r.shape);
 return r;
}
function buildIndoorLayout(request={}){
 const selection=selectIndoorFormula(request),id=selection.id;
 if(id==='tower'&&(request.rooms?.length??request.roomCount??8)<2)throw Error('Công thức tháp cần ít nhất 2 phòng trong cảnh');
 if(request.rooms&&!Array.isArray(request.rooms))throw Error('rooms phải là danh sách');
 const N=request.rooms?request.rooms.length:(request.roomCount??8);finite(N,request.allowEmptyRooms?0:1,32,'Số phòng');if(!Number.isInteger(N))throw Error('Số phòng phải là số nguyên');
 const F=finite(request.roomWidth??300,180,560,'Mặt tiền phòng'),D=finite(request.roomDepth??260,180,520,'Chiều sâu phòng'),C=finite(request.corridorWidth??160,100,240,'Bề rộng hành lang');
 const records=request.rooms?request.rooms.map((r,i)=>({...r,id:r.id||'room-'+(i+1),name:r.name||'Phòng '+(i+1)})):Array.from({length:N},(_,i)=>({id:'room-'+(i+1),name:'Phòng '+String(i+1).padStart(2,'0'),shape:request.roomShape||'rectangle'}));
 if(new Set(records.map(r=>r.id)).size!==N)throw Error('ID phòng trùng');
 for(const r of records){if(typeof r.id!=='string'||typeof r.name!=='string')throw Error('ID và tên phòng phải là chuỗi');if(r.width!==undefined)finite(r.width,180,560,'Mặt tiền phòng');if(r.depth!==undefined)finite(r.depth,180,520,'Chiều sâu phòng');}
 if(!request.rooms&&id==='tower'){records[N-2].name='Thang tháp';records[N-1].name='Gian tháp';}
 const maxF=Math.max(F,...records.map(r=>r.width||F)),maxD=Math.max(D,...records.map(r=>r.depth||D));
 const slots=[],floors=[],rooms=[],voids=[],windows=[],facades=[],thresholds=[];let stair,entrance;
 const floor=(x,y,w,h)=>floors.push(rectangle(x,y,w,h));
 const H=(x,y,length,side)=>slots.push({axis:'H',x,y,length,side});
 const V=(x,y,length,side)=>slots.push({axis:'V',x,y,length,side});
 const entry=(axis,fixed,lo,hi)=>entrance={axis,fixed,lo,hi};
 const length=k=>Math.max(2*maxF,maxD+2*maxF,Math.ceil(N/k)*maxF+maxD);
 if(id==='horizontal'||id==='windows'){
  const L=Math.max(1,id==='windows'?N:Math.ceil(N/2))*maxF;floor(0,0,L,C);H(0,0,L,'S');if(id==='horizontal')H(0,C,L,'N');
  stair={x:-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',0,10,C-10);
  if(id==='windows'){facades.push({axis:'H',fixed:C,lo:0,hi:L});for(let x=F/2;x<L;x+=F)windows.push({axis:'H',x,y:C});}
 }
 if(id==='vertical'){
  const L=Math.max(1,Math.ceil(N/2))*maxF;floor(0,0,C,L);V(0,0,L,'E');V(C,0,L,'W');stair={x:0,y:L,w:C,h:70,orientation:'N'};entry('H',L,0,C);
 }
 if(id==='ell'||id==='tee'||id==='cross'){
  const L=length(id==='cross'?8:4);
  if(id==='ell'){
   floor(-L,0,L+C,C);floor(0,C,C,L);H(-L,0,L,'S');H(-L,C,L-maxD,'N');V(0,C+maxD,L-maxD,'E');V(C,C,L,'W');
   stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
  }else if(id==='tee'){
   floor(-L,0,2*L+C,C);floor(0,C,C,L);H(-L,0,2*L+C,'S');H(-L,C,L,'N');H(C,C,L,'N');V(0,C+maxD,L-maxD,'E');V(C,C+maxD,L-maxD,'W');
   stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
  }else{
   floor(-L,0,2*L+C,C);floor(0,-L,C,2*L+C);
   for(const x of [-L,C]){H(x,0,L,'S');H(x,C,L,'N');}
   for(const [x,side]of [[0,'E'],[C,'W']]){V(x,-L,L-maxD,side);V(x,C+maxD,L-maxD,side);}
   stair={x:0,y:C+L,w:C,h:70,orientation:'N'};entry('H',C+L,0,C);
  }
 }
 if(id==='court'||id==='cloister'){
  const L=length(id==='court'?3:4);floor(0,0,L+2*C,C);floor(0,C,C,L);floor(L+C,C,C,L);
  H(0,0,L+2*C,'S');V(0,C,L,'E');V(L+2*C,C,L,'W');
  if(id==='cloister'){
   floor(0,L+C,L+2*C,C);const half=(L+C)/2;H(0,L+2*C,half,'N');H(half+C,L+2*C,half,'N');
   floor(half,L+2*C,C,C/2);stair={x:half,y:L+2.5*C,w:C,h:70,orientation:'N'};entry('H',L+2.5*C,half,half+C);
   facades.push({axis:'H',fixed:L+C,lo:C,hi:L+C});
  }else{stair={x:0,y:L+C,w:C,h:70,orientation:'N'};entry('H',L+C,0,C);}
  voids.push({poly:rectangle(C,C,L,L),name:id==='court'?'SÂN MỞ':'SÂN TRỜI'});
  facades.push({axis:'H',fixed:C,lo:C,hi:L+C},{axis:'V',fixed:C,lo:C,hi:L+C},{axis:'V',fixed:L+C,lo:C,hi:L+C});
  for(let n=1;n<=3;n++){const p=C+L*n/4;windows.push({axis:'H',x:p,y:C},{axis:'V',x:C,y:p},{axis:'V',x:L+C,y:p});if(id==='cloister')windows.push({axis:'H',x:p,y:L+C});}
 }
 if(id==='curved'){
  const L=length(4),R=Math.max(maxD+C,2*C),steps=24,point=(r,a)=>[r*Math.cos(a),r*Math.sin(a)];
  floor(-L,-R-C,L,C);floor(R,0,C,L);
  floors.push([...Array.from({length:steps+1},(_,i)=>point(R+C,-Math.PI/2+i*Math.PI/2/steps)),...Array.from({length:steps+1},(_,i)=>point(R,-i*Math.PI/2/steps))]);
  H(-L,-R-C,L,'S');H(-L,-R,L,'N');V(R,0,L,'E');V(R+C,0,L,'W');
  stair={x:-L-70,y:-R-C+10,w:70,h:C-20,orientation:'E'};entry('V',-L,-R-C+10,-R-10);
  for(const a of [-1.15,-.7,-.3]){const p=point(R+C,a);windows.push({axis:'D',x:p[0],y:p[1],tx:-Math.sin(a),ty:Math.cos(a)});}
 }
 if(id==='tower'){
  const L=Math.ceil((N-2)/2)*maxF,R=Math.max(maxD,1.5*C);floor(-L,0,L,C);floor(0,0,C,C);H(-L,0,L,'S');H(-L,C,L,'N');
  const chamber=makeRoom({...records.at(-1),shape:'round'}, {axis:'V',side:'W',x:C,y:C/2-R},0,2*R,2*R);chamber.name=records.at(-1).name;chamber.kind='tower';rooms.push(chamber);
  const steps=makeRoom({...records.at(-2),shape:'rectangle'}, {axis:'H',side:'S',x:0,y:0},0,C,maxD);steps.kind='stairs';rooms.push(steps);
  stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
 }
 if(id==='cross'){const order=[0,4,2,7,1,5,3,6],copy=[...slots];slots.splice(0,slots.length,...order.map(i=>copy[i]));}
 const ordinary=id==='tower'?records.slice(0,-2):records;
 const groups=slots.map(s=>({...s,records:[],used:0}));
 for(const r of ordinary){const w=r.width||F;const eligible=groups.filter(s=>s.used+w<=s.length+1e-6).sort((a,b)=>a.used/a.length-b.used/b.length);if(!eligible.length)throw Error('Không đủ mặt tiền để đặt phòng '+r.id);eligible[0].records.push(r);eligible[0].used+=w;}
 for(const s of groups){let offset=(s.length-s.used)/2;for(const rec of s.records){const frontage=rec.width||F;rooms.push(makeRoom(rec,s,offset,frontage,rec.depth||D));offset+=frontage;}}
 for(const r of rooms)if(r.circular){const d=r.doorPoint;const sleeve='NS'.includes(r.doorSide)?rectangle(d.x-25,d.y+(r.doorSide==='N'?-5:-15),50,20):rectangle(d.x+(r.doorSide==='W'?-5:-15),d.y-25,20,50);thresholds.push({roomId:r.id,poly:sleeve});}
 rooms.sort((a,b)=>records.findIndex(r=>r.id===a.id)-records.findIndex(r=>r.id===b.id));
 const pts=[...floors.flat(),...rooms.flatMap(r=>r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)),...rectangle(stair.x,stair.y,stair.w,stair.h)];const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 return {recipe:id,selection,parameters:{roomCount:N,roomWidth:F,roomDepth:D,corridorWidth:C},rooms,floors,thresholds,floor:floors[0],voids,windows,facades,entrance,stair,bounds:[Math.min(...xs)-55,Math.min(...ys)-110,Math.max(...xs)-Math.min(...xs)+110,Math.max(...ys)-Math.min(...ys)+190]};
}

function insidePolygon(x,y,p){let hit=false;for(let i=0,j=p.length-1;i<p.length;j=i++){const a=p[i],b=p[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
function floorContains(model,x,y){return (model.floors||[model.floor]).some(p=>insidePolygon(x,y,p))}
function buildIndoorWalls(model){
 const rooms=model.rooms,depth=WALL_HEIGHT,layout=model.recipe;
 const raw=[],diagonal=[],gaps=[],eps=1e-5,round=n=>Math.round(n/eps)*eps;
 const addPoly=(p,z)=>{for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1];if(Math.hypot(dx,dy)<eps)continue;
  if(Math.abs(dx)>eps&&Math.abs(dy)>eps){diagonal.push({axis:'D',a,b,z});continue;}
  const h=Math.abs(dy)<eps;raw.push({axis:h?'H':'V',fixed:round(h?a[1]:a[0]),lo:round(Math.min(h?a[0]:a[1],h?b[0]:b[1])),hi:round(Math.max(h?a[0]:a[1],h?b[0]:b[1])),z});
 }};
 const polygons=model.floors||[model.floor];for(const p of polygons)addPoly(p,layout==='curved'?depth*1.8:depth);
 for(const r of rooms){const p=r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y);addPoly(p,r.circular?depth*1.25:depth);
  const d=r.doorPoint,h='NS'.includes(r.doorSide),axis=h?'H':'V',fixed=round(h?d.y:d.x),c=h?d.x:d.y;gaps.push({axis,fixed,lo:c-25,hi:c+25});
  for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length];if(h&&Math.abs(a[1]-d.y)<eps&&Math.abs(b[1]-d.y)<eps)raw.push({axis,fixed,lo:Math.min(a[0],b[0]),hi:Math.max(a[0],b[0]),z:depth*1.8});if(!h&&Math.abs(a[0]-d.x)<eps&&Math.abs(b[0]-d.x)<eps)raw.push({axis,fixed,lo:Math.min(a[1],b[1]),hi:Math.max(a[1],b[1]),z:depth*1.8});}
 }
 for(const f of model.facades||[])raw.push({...f,z:depth*1.8});
 if(model.entrance)gaps.push(model.entrance);

 const groups=new Map();for(const s of raw){const k=s.axis+':'+s.fixed;if(!groups.has(k))groups.set(k,[]);groups.get(k).push(s);}
 const walls=[];
 for(const segs of groups.values()){
  const a=segs[0],gs=gaps.filter(g=>g.axis===a.axis&&Math.abs(g.fixed-a.fixed)<eps),allcuts=polygons.flat().map(p=>a.axis==='H'?p[0]:p[1]);
  const cuts=[...new Set([...segs.flatMap(s=>[s.lo,s.hi]),...gs.flatMap(g=>[g.lo,g.hi]),...allcuts].map(round))].sort((a,b)=>a-b);
  for(let i=1;i<cuts.length;i++){const lo=cuts[i-1],hi=cuts[i],m=(lo+hi)/2,cover=segs.filter(s=>m>s.lo-eps&&m<s.hi+eps);if(!cover.length||gs.some(g=>m>g.lo&&m<g.hi))continue;
   const h=a.axis==='H',x=h?m:a.fixed,y=h?a.fixed:m;
   if(floorContains(model,x+(h?0:.2),y+(h?.2:0))&&floorContains(model,x-(h?0:.2),y-(h?.2:0)))continue;
   walls.push({axis:a.axis,fixed:a.fixed,lo,hi,z:Math.max(...cover.map(s=>s.z))});
  }
 }
 for(const d of diagonal){const x=(d.a[0]+d.b[0])/2,y=(d.a[1]+d.b[1])/2,len=Math.hypot(d.b[0]-d.a[0],d.b[1]-d.a[1]),nx=-(d.b[1]-d.a[1])/len,ny=(d.b[0]-d.a[0])/len;
  if(floorContains(model,x+nx*.2,y+ny*.2)&&floorContains(model,x-nx*.2,y-ny*.2))continue;
  if(rooms.some(r=>r.poly&&Math.hypot(x-r.doorPoint.x,y-r.doorPoint.y)<28))continue;
  walls.push(d);
 }
 const merged=[];for(const w of walls.filter(w=>w.axis!=='D').sort((a,b)=>a.axis.localeCompare(b.axis)||a.fixed-b.fixed||a.z-b.z||a.lo-b.lo)){const last=merged.at(-1);if(last&&last.axis===w.axis&&last.fixed===w.fixed&&last.z===w.z&&Math.abs(last.hi-w.lo)<eps)last.hi=w.hi;else merged.push({...w});}merged.push(...walls.filter(w=>w.axis==='D'));
 return merged.sort((a,b)=>(a.axis==='H'?a.fixed:a.axis==='V'?a.hi:Math.max(a.a[1],a.b[1]))-(b.axis==='H'?b.fixed:b.axis==='V'?b.hi:Math.max(b.a[1],b.b[1])));
}

function createElements(META){
const NS="http://www.w3.org/2000/svg";
function el(t,a={},p){const n=document.createElementNS(NS,t);for(const[k,v]of Object.entries(a))n.setAttribute(k,v);if(p)p.append(n);return n}
function txt(p,x,y,t,a={}){const n=el('text',{x,y,...a},p);n.textContent=t;return n}
function path(p,d,a={}){return el('path',{d,...a},p)}
function hwall(p,x1,x2,y,z,t=16){if(x2<=x1)return;const g=el('g',{'data-wall':'horizontal'},p);el('rect',{x:x1,y:y-z,width:x2-x1,height:z,fill:'url(#stone-face)'},g);el('rect',{x:x1,y:y-z,width:x2-x1,height:z,fill:'url(#masonry)'},g);el('rect',{x:x1,y:y-z-t/2,width:x2-x1,height:t,fill:'url(#cap-block)',stroke:'#665e4e','stroke-width':1},g);path(g,`M${x1} ${y}H${x2}`,{stroke:'#8b7657','stroke-width':1.5,opacity:.7});}
function vwall(p,x,y1,y2,z,t=16){if(y2<=y1)return;const dx=z*.35,g=el('g',{'data-wall':'vertical'},p);
 const face=`M${x+t/2} ${y1}L${x+t/2} ${y2}L${x+t/2-dx} ${y2-z}L${x+t/2-dx} ${y1-z}Z`;
 path(g,face,{fill:'url(#stone-face)',stroke:'#8d7858','stroke-width':1});path(g,face,{fill:'url(#masonry)'});
 el('rect',{x:x-t/2-dx,y:y1-z,width:t,height:y2-y1,fill:'url(#cap-block)',stroke:'#6a6151','stroke-width':1},g);
 path(g,`M${x-t/2} ${y2}L${x+t/2} ${y2}L${x+t/2-dx} ${y2-z}L${x-t/2-dx} ${y2-z}Z`,{fill:'url(#stone-face)',stroke:'#8d7858','stroke-width':1});
 path(g,`M${x+t/2-dx} ${y1-z}V${y2-z}`,{stroke:'#ded0b1','stroke-width':1,opacity:.65});}

function arch(p,x,y,z){const w=38,top=y-z-4,shoulder=top+18,g=el('g',{'data-door':'raised'},p);
 path(g,`M${x-w/2} ${y}V${shoulder}Q${x-w/2} ${top+7} ${x} ${top-2}Q${x+w/2} ${top+7} ${x+w/2} ${shoulder}V${y}Z`,{fill:'#594b37',stroke:'#78654c','stroke-width':1});
 // Deep jambs and separate arched stones; the narrow leaf leaves a visible opening.
 for(const side of [-1,1]){el('rect',{x:x+side*w/2-(side===-1?9:0),y:shoulder,width:9,height:y-shoulder,fill:'#b9a17b',stroke:'#867155','stroke-width':.7},g);}
 path(g,`M${x-24} ${shoulder}Q${x-24} ${top+2} ${x} ${top-10}Q${x+24} ${top+2} ${x+24} ${shoulder}`,{stroke:'#d3bb91','stroke-width':9,fill:'none'});
 for(let i=-2;i<=2;i++){const xx=x+i*8,yy=top-8+Math.abs(i)*4;path(g,`M${xx} ${yy}l${i*1.5} 8`,{stroke:'#8d795c','stroke-width':1});}
 path(g,`M${x-17} ${y-1}V${shoulder+2}Q${x-17} ${top+10} ${x-4} ${top+4}V${y-7}Z`,{fill:'url(#dark-wood)',stroke:'#685032','stroke-width':1});path(g,`M${x-12} ${shoulder+4}V${y-6}`,{stroke:'#d5ad70','stroke-width':.8});el('circle',{cx:x-7,cy:y-20,r:1.5,fill:'#c3a154'},g);path(g,`M${x-19} ${y+2}h38`,{stroke:'#d9c5a0','stroke-width':3});
}
function lowdoor(p,x,y,z){const gap=38;path(p,`M${x-19} ${y-4}h38`,{stroke:'#bfa77e','stroke-width':3,'data-door':'threshold'});path(p,`M${x-19} ${y}v34M${x+19} ${y}Q${x+17} ${y+34} ${x-19} ${y+34}`,{fill:'none',stroke:'#a98c62','stroke-width':1.1,opacity:.8});}
function ppath(p){return 'M'+p.map(v=>v.join(' ')).join('L')+'Z'}
function angledWall(p,a,b,z){const dx=z*.35,dy=z,t=8,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*t,ny=(b[0]-a[0])/len*t;
 const face=ppath([a,b,[b[0]-dx,b[1]-dy],[a[0]-dx,a[1]-dy]]);path(p,face,{fill:'url(#stone-face)',stroke:'#9a8665','stroke-width':.7});path(p,face,{fill:'url(#masonry)'});
 path(p,ppath([[a[0]-dx+nx,a[1]-dy+ny],[b[0]-dx+nx,b[1]-dy+ny],[b[0]-dx-nx,b[1]-dy-ny],[a[0]-dx-nx,a[1]-dy-ny]]),{fill:'url(#cap-block)',stroke:'#6b6353','stroke-width':.65});
}
function lancet(p,x,y,z){const top=-Math.max(20,z-9),bottom=-8,w=30,g=el('g',{transform:`translate(${x} ${y})`,'data-window':'lancet'},p);
 path(g,`M${-w/2} ${bottom}V${top+16}Q${-w/2} ${top+6} 0 ${top}Q${w/2} ${top+6} ${w/2} ${top+16}V${bottom}Z`,{fill:'#698b8b',stroke:'#d6c19b','stroke-width':5});
 path(g,`M0 ${top+4}V${bottom}M${-w/2+2} ${top+25}H${w/2-2}`,{stroke:'#c1cbbf','stroke-width':1.4});
 for(let i=-2;i<=2;i++){path(g,`M-12 ${bottom-8-i*8}l24 -18M-12 ${bottom-25-i*8}l24 18`,{stroke:'#a8bcad','stroke-width':.6,opacity:.8});}
 path(g,`M-20 ${bottom+3}h40`,{stroke:'#cbb38b','stroke-width':5});
}

return {el,txt,path,hwall,vwall,arch,lowdoor,angledWall,lancet};
}

// Stage 2 lightweight 2.5D SVG: actual room/corridor floors, walls, doors and windows.
// No furnishings, huge filters, extra floor assembly or scene persistence.
function drawIndoor(svg,geometry,onRoomClick){
 const doc=new DOMParser().parseFromString(INDOOR_MATERIALS,'image/svg+xml');
 const defs=doc.querySelector('defs');
 if(!defs)throw Error('Indoor SVG materials have no defs');
 svg.append(document.importNode(defs,true));
 const {el,txt,path,hwall,vwall,arch,lowdoor,angledWall,lancet}=createElements({});
 const root=el('g',{'data-indoor-scene':'true'},svg),floor=el('g',{'data-indoor-floor':'true'},root);
 const {model,walls}=geometry;
 for(const v of model.voids){
  path(floor,ppath(v.poly),{fill:'#c5c6a4',stroke:'#a3a37b','stroke-width':1,'data-void':'true','pointer-events':'none'});
 }
 for(const [i,poly] of model.floors.entries()){
  const corridorId=geometry.corridorPlaceIds?.[i%Math.max(1,geometry.corridorPlaceIds.length)];
  const segment=path(floor,ppath(poly),{fill:'url(#hall-floor)','fill-rule':'nonzero','data-corridor-floor':'true'});
  if(corridorId){
   segment.setAttribute('data-corridor',corridorId);
   segment.setAttribute('tabindex','0');segment.setAttribute('role','button');
   segment.onclick=()=>onRoomClick(corridorId);
   segment.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRoomClick(corridorId)}};
  }
 }
 const stair=model.stair;
 for(let i=0;i<8;i++){
  const vertical=stair.orientation==='N';
  el('rect',{x:stair.x+(vertical?0:i*stair.w/8),y:stair.y+(vertical?i*stair.h/8:0),
   width:vertical?stair.w:stair.w/8,height:vertical?stair.h/8:stair.h,fill:i%2?'#c7b28c':'#dac39b',stroke:'#a7916d','stroke-width':.6},floor);
 }
 for(const t of model.thresholds)path(floor,ppath(t.poly),{fill:'url(#hall-floor)'});
 for(const r of model.rooms){
  const g=el('g',{'data-room':r.id,tabindex:0,role:'button','aria-label':r.name},floor);
  path(g,ppath(geometry.rooms[r.id].poly),{fill:'url(#floor)',stroke:'#b9a483','stroke-width':.6,'data-room-floor':'true'});
  if(r.kind==='stairs')for(let j=0;j<10;j++)path(g,`M${r.x+10} ${r.y+15+j*(r.bottom-r.y-30)/10}h${r.w-20}`,{stroke:'#a38e6d','stroke-width':1});
  txt(g,r.x+r.w/2,r.y+(r.circular?85:30),r.name,{'text-anchor':'middle','font-size':14,fill:'#7c684c','pointer-events':'none'});
  g.onclick=()=>onRoomClick(r.id);
  g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onRoomClick(r.id)}};
 }
 const wallLayer=el('g',{'data-indoor-walls':'true','pointer-events':'none'},root);
 const diag=walls.filter(w=>w.axis==='D');let faces='',caps='';
 for(const w of diag){
  const a=w.a,b=w.b,z=w.z,dx=z*.35,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*8,ny=(b[0]-a[0])/len*8;
  faces+=ppath([a,b,[b[0]-dx,b[1]-z],[a[0]-dx,a[1]-z]]);
  caps+=ppath([[a[0]-dx+nx,a[1]-z+ny],[b[0]-dx+nx,b[1]-z+ny],[b[0]-dx-nx,b[1]-z-ny],[a[0]-dx-nx,a[1]-z-ny]]);
 }
 if(faces){path(wallLayer,faces,{fill:'url(#stone-face)'});path(wallLayer,faces,{fill:'url(#masonry)'});path(wallLayer,caps,{fill:'url(#cap-block)',stroke:'#786f5a','stroke-width':.5})}
 for(const w of walls){if(w.axis==='H')hwall(wallLayer,w.lo,w.hi,w.fixed,w.z);else if(w.axis==='V')vwall(wallLayer,w.fixed,w.lo,w.hi,w.z)}
 for(const r of model.rooms){
  const d=r.doorPoint,z=r.circular?45:64;
  if(r.doorSide==='S')arch(wallLayer,d.x,d.y,z);
  else if(r.doorSide==='N')lowdoor(wallLayer,d.x,d.y,36);
  else arch(el('g',{transform:`matrix(0 1 .35 1 ${d.x} ${d.y})`},wallLayer),0,0,z);
 }
 for(const w of model.windows){
  if(w.axis==='H')lancet(wallLayer,w.x,w.y,64);
  else lancet(el('g',{transform:w.axis==='V'?`matrix(0 1 .35 1 ${w.x} ${w.y})`:`matrix(${w.tx} ${w.ty} .35 1 ${w.x} ${w.y})`},wallLayer),0,0,64);
 }
 return root;
}

// Transient MAP_DATA scene geometry using the approved indoor Stage 2 formulas.
// No storage, pathfinding, mult-wing assembly or hidden-floor generation.
const shapeFor=(p)=>{
 const shape=p.generation?.shape||'rectangle';
 if(shape==='straight'&&p.kind==='corridor')return 'rectangle';
 if(!['rectangle','L','U','T','cross','round'].includes(shape))
  throw Error('Unsupported indoor room shape for '+p.id+': '+shape);
 return shape;
};
const point=(x,y)=>({x,y});
const distanceToSegment=(p,a,b)=>{
 const dx=b[0]-a[0],dy=b[1]-a[1],len=dx*dx+dy*dy;
 const t=Math.max(0,Math.min(1,len?((p.x-a[0])*dx+(p.y-a[1])*dy)/len:0));
 return Math.hypot(p.x-a[0]-t*dx,p.y-a[1]-t*dy);
};
const boundaryDistance=(p,poly)=>Math.min(...poly.map((a,i)=>distanceToSegment(p,a,poly[(i+1)%poly.length])));
const hit=(p,poly)=>insidePolygon(p.x,p.y,poly);
const asRegion=(id,poly)=>({id,points:poly.map(([x,y])=>point(x,y))});
function safePoint(p,polygon,exclusions,clearance){
 return hit(p,polygon)&&boundaryDistance(p,polygon)>clearance&&
  !exclusions.some(r=>hit(p,r.poly)||boundaryDistance(p,r.poly)<clearance);
}
// Conservative rectangular cells, fully inside actual floor polygon, away from edges and reserved space.
// No routing: these are illustrative positioning surfaces only.
function positions(id,polygon,exclusions,margin=13){
 const xs=polygon.map(p=>p[0]),ys=polygon.map(p=>p[1]);
 const lowX=Math.min(...xs),highX=Math.max(...xs),lowY=Math.min(...ys),highY=Math.max(...ys);
 const step=26,half=9,runs=[],anchors=[];
 for(let y=lowY+step/2;y<highY;y+=step){
  let run=null;
  for(let x=lowX+step/2;x<highX;x+=step){
   const corners=[point(x-half,y-half),point(x+half,y-half),point(x+half,y+half),point(x-half,y+half)];
   const valid=corners.every(p=>safePoint(p,polygon,exclusions,margin));
   if(valid){
    if(!run)run=[x-half,y-half,x+half,y+half];
    else run[2]=x+half;
    if(anchors.length<4&&(!anchors.length||Math.hypot(x-anchors.at(-1).x,y-anchors.at(-1).y)>65))anchors.push(point(x,y));
   }else if(run){runs.push(run);run=null}
  }
  if(run)runs.push(run);
 }
 if(!runs.length)throw Error('No safe actor surface for '+id+'; check room size/doors');
 const regions=runs.map(([x1,y1,x2,y2],i)=>asRegion(id+':zone:'+i,rectangle(x1,y1,x2-x1,y2-y1)));
 return {regions,anchors};
}
function exclusionsFor(model){
 const zones=[];
 for(const v of model.voids)zones.push({id:'void:'+v.name,kind:'void',poly:v.poly});
 for(const [i,t] of model.thresholds.entries())zones.push({id:'threshold:'+i,kind:'door',poly:t.poly});
 if(model.stair){const s=model.stair;zones.push({id:'stair',kind:'stairs',poly:rectangle(s.x-10,s.y-10,s.w+20,s.h+20)})}
 for(const r of model.rooms){
  const d=r.doorPoint,wide=40;
  zones.push({id:'door:'+r.id,kind:'door',poly:rectangle(d.x-wide,d.y-wide,wide*2,wide*2)});
 }
 return zones;
}
function buildGeometry(plan,indoor={}){
 if(plan.mode!=='generated')throw Error('Indoor build requires generated scene');
 const places=plan.places;
 if(!places.length)throw Error('Indoor scene requires at least one visible room');
 if(new Set(places.map(p=>p.floor||'')).size>1)throw Error('Only the current indoor floor/scene may be built; provide one floor per /map');
 const corridorPlaces=places.filter(p=>p.kind==='corridor');
 const roomPlaces=places.filter(p=>p.kind!=='corridor');
 if(!roomPlaces.length&&indoor.layout==='tower')throw Error('Tower recipe requires an actual room');
 const records=roomPlaces.map(p=>({
  id:p.id,name:p.name,shape:shapeFor(p),
  ...(p.generation?.width?{width:p.generation.width}:{}),
  ...(p.generation?.depth?{depth:p.generation.depth}:{})
 }));
 const request={...indoor,rooms:records,allowEmptyRooms:!records.length};
 // The current MAP_DATA place list defines the scene. Ignore any external roomCount.
 delete request.roomCount;
 const model=buildIndoorLayout(request),walls=buildIndoorWalls(model);
 const exclusions=exclusionsFor(model);
 const rooms=Object.fromEntries(model.rooms.map(r=>[r.id,{...r,h:r.bottom-r.y,shape:r.shape,poly:r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)}]));
 const floorPolygons=[
  ...model.rooms.map(r=>asRegion('room:'+r.id,rooms[r.id].poly)),
  ...model.floors.map((poly,i)=>asRegion('corridor:'+i,poly)),
  ...model.thresholds.map((v,i)=>asRegion('threshold-floor:'+i,v.poly))
 ];
 const exclusionZones=exclusions.map(z=>({...asRegion(z.id,z.poly),kind:z.kind}));
 const actorZones=[],suggestedAnchors={},safeAreas={};
 for(const r of model.rooms){
  const v=positions(r.id,rooms[r.id].poly,exclusions,12);
  actorZones.push(...v.regions);suggestedAnchors[r.id]=v.anchors;
  safeAreas[r.id]=v.regions;
 }
 const corridorZones=[],corridorAnchors=[],corridorAreas=[];
 for(let i=0;i<model.floors.length;i++){
  const p=model.floors[i];
  // Exclude overlapping rooms and void areas from corridor actor zones.
  const blockers=[...exclusions,...model.rooms.map(r=>({poly:rooms[r.id].poly}))];
  try{const v=positions('corridor:'+i,p,blockers,12);corridorZones.push(...v.regions);corridorAnchors.push(...v.anchors);corridorAreas.push({floor:p,index:i,...v})}catch(e){
   // A short connector can have no safe standing area; never manufacture one.
   if(!e.message.startsWith('No safe actor surface'))throw e;
  }
 }
 actorZones.push(...corridorZones);
 if(corridorPlaces.length&&!corridorAreas.length)throw Error('No safe corridor surface for current scene');
 corridorPlaces.forEach((p,i)=>{
  const area=corridorAreas[i%corridorAreas.length];
  suggestedAnchors[p.id]=area.anchors;safeAreas[p.id]=area.regions;
  floorPolygons.push(asRegion('corridor-place:'+p.id,area.floor));
 });
 for(const p of places)if(!suggestedAnchors[p.id]?.length)throw Error('Missing safe indoor anchor for '+p.id);
 return {rooms,model,walls,bounds:model.bounds,floorPolygons,actorZones,exclusionZones,suggestedAnchors,corridorAnchors,corridorPlaceIds:corridorPlaces.map(p=>p.id),safeAreas,routes:[]};
}
function indoorActorPoint(geometry,placeId,position){
 const zones=geometry.safeAreas[placeId];
 if(!zones)throw Error('Actor references room outside generated scene: '+placeId);
 if(position){
  if(!zones.some(r=>insidePolygon(position.x,position.y,r.points.map(p=>[p.x,p.y]))))
   throw Error('Indoor actor position outside verified safe floor: '+placeId);
  return position;
 }
 const anchor=geometry.suggestedAnchors[placeId]?.[0];
 if(!anchor)throw Error('No safe NPC anchor in room: '+placeId);
 return anchor;
}

const NS='http://www.w3.org/2000/svg';
const KEYS=Object.keys(TOKENS.colors);
const COLORS=Object.values(TOKENS.colors).map(c=>[c.name,c.main,c.accent]);
function ribbon(name,index=0,pc=false){const [,main,accent]=COLORS[index],N='http://www.w3.org/2000/svg',b=document.createElement('button');b.className='ribbon'+(pc?' pc':'')+([3,4,9,11].includes(index)?' light':'');b.style.setProperty('--main',main);b.style.setProperty('--accent',accent);const w=Math.max(140,Math.min(260,Array.from(name).length*8+60));b.style.width=(w*.7)+'px';b.setAttribute('aria-label',name);const v=document.createElementNS(N,'svg');v.setAttribute('viewBox',`0 0 ${w} 44`);v.setAttribute('aria-hidden','true');const path=(d,fill,stroke)=>{const p=document.createElementNS(N,'path');p.setAttribute('d',d);p.setAttribute('fill',fill);p.setAttribute('stroke',stroke);p.setAttribute('stroke-width','1.1');v.append(p);return p};path(`M0 12H31V38H0L10 25Z M${w} 12H${w-31}V38H${w}L${w-10} 25Z`,accent,main);path(`M23 7L31 12V38L23 33Z M${w-23} 7L${w-31} 12V38L${w-23} 33Z`,main,main);path(`M23 7Q${w/2}-3 ${w-23} 7V34Q${w/2} 24 23 34Z`,main,accent);path(`M30 11Q${w/2}2 ${w-30} 11`,'none',accent);const text=document.createElementNS(N,'text');text.setAttribute('x',w/2);text.setAttribute('y','26');text.setAttribute('text-anchor','middle');text.setAttribute('fill',[3,4,9,11].includes(index)?'#172344':'#f8edda');text.setAttribute('style','font:600 17px Georgia,serif');text.textContent=name;v.append(text);b.append(v);return b}
function chip(name,index,pc){const b=document.createElement('button');b.className='actor-chip'+([3,4,9,11].includes(index)?' light':'');b.style.setProperty('--main',COLORS[index][1]);b.style.setProperty('--accent',COLORS[index][2]);b.textContent=name;return b}
function addUse(g,side){const e=document.createElementNS(NS,'use');e.setAttribute('href','#demo-shoe-'+side);g.append(e);return e}
function setupFeet(g){g.replaceChildren();if(g.dataset.motion==='idle'){
 const l=addUse(g,'l'),r=addUse(g,'r');l.setAttribute('transform','translate(-8 0) rotate(-6)');r.setAttribute('transform','translate(8 0) rotate(6)');
}else for(let i=0;i<6;i++){const e=addUse(g,i%2?'r':'l');e.setAttribute('transform',`translate(${i%2?7:-7} ${-i*17}) rotate(${i%2?6:-6})`);e.style.opacity='0'}}

function tagType(actor) {
  if (actor.onPatrol === true && ['prefect','patrol','caretaker'].includes(actor.role)) return 'patrol';
  if (actor.entityType === 'group' && !actor.tagType) return 'crowd';
  return KEYS.includes(actor.tagType) && actor.tagType !== 'patrol' ? actor.tagType : 'unknown';
}
function actorTag(actor, compact=false) {
  const type=tagType(actor), index=KEYS.indexOf(type);
  const label=actor.isPC ? `★ ${actor.name || 'BẠN'} ★` : actor.name || 'Chưa rõ';
  const element=compact?chip(label,index,actor.isPC):ribbon(label,index,actor.isPC);
  if(actor.isPC) {element.classList.add('pc');element.style.setProperty('--accent','#D2A64D');}
  element.dataset.tagType=type;
  return element;
}
function feetState(elapsed, stance='idle', reduced=false) {
  if(stance!=='walk'||reduced) {
    const f=Math.sin(elapsed/6400*Math.PI*2)*.13;
    return [.78+f,.78-f];
  }
  const t=((elapsed%5300)+5300)%5300, step=Math.floor(t/550);
  return Array.from({length:6},(_,i)=>t<3300&&i===step?1:0);
}
const feetJobs=new Set();let feetTimer;
function mountFeet(g,stance='idle'){
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');const job={g,stance,reduced,origin:performance.now(),mode:null};feetJobs.add(job);
 if(!feetTimer)feetTimer=setInterval(()=>{if(document.hidden||document.body.classList.contains('motion-off'))return;const now=performance.now();for(const j of feetJobs){const next=j.reduced.matches?'idle':j.stance;if(next!==j.mode){j.mode=next;j.g.dataset.motion=next;setupFeet(j.g)}const values=feetState(now-j.origin,j.stance,j.reduced.matches);[...j.g.children].forEach((n,i)=>n.style.opacity=String(values[i]??0));}},100);
 return ()=>{feetJobs.delete(job);if(!feetJobs.size){clearInterval(feetTimer);feetTimer=null}};
}

const shoeDefs="<g xmlns=\"http://www.w3.org/2000/svg\" id=\"demo-shoe-l\"><path d=\"M-3,-8C-5.5,-8 -6.8,-4.8 -6.6,-.8 -6.4,2.2 -5.2,4.6 -4.2,6 -3,6.5 -.2,6.5 .8,6 1.7,4.4 2.4,1.6 2.2,-1.4 1.9,-5.2 -.2,-8 -3,-8Z\"/><path d=\"M-4.5,8.4C-3.2,8 -.4,8 .6,8.4L.3,12.6C.1,14.3 -1,14.9 -2.1,14.9 -3.2,14.9 -4.3,14.2 -4.5,12.6Z\"/></g><g xmlns=\"http://www.w3.org/2000/svg\" id=\"demo-shoe-r\"><path d=\"M3,-8C5.5,-8 6.8,-4.8 6.6,-.8 6.4,2.2 5.2,4.6 4.2,6 3,6.5 .2,6.5 -.8,6 -1.7,4.4 -2.4,1.6 -2.2,-1.4 -1.9,-5.2 .2,-8 3,-8Z\"/><path d=\"M4.5,8.4C3.2,8 .4,8 -.6,8.4L-.3,12.6C-.1,14.3 1,14.9 2.1,14.9 3.2,14.9 4.3,14.2 4.5,12.6Z\"/></g>";

// H1 motion hooks follow the original Demo 1 effects. Static symbol geometry is never mutated.
function mountH1Motion(svg,enabled){
 const N='http://www.w3.org/2000/svg',cam=svg.querySelector('#camera')||svg,callbacks=[],created=[];let raf=0,last=0,clock=0,previous=0,disposed=false;
 const make=(tag,a,p=cam)=>{const e=document.createElementNS(N,tag);for(const[k,v]of Object.entries(a))e.setAttribute(k,v);p.append(e);return e};
 const G=(p,a={})=>make('g',a,p),P=(p,d,a={})=>make('path',{d,fill:'none',stroke:'#9c9277','stroke-width':1,...a},p),cycle=(t,d,delay=0)=>((t-delay)%d+d)%d/d;
 function rotate(e,amplitude,duration,pivot,delay=0){if(!e)return;e.style.removeProperty('transform');e.style.removeProperty('transform-origin');e.style.removeProperty('transform-box');const base=e.getAttribute('transform')||'',b=e.getBBox(),x=pivot?.[0]??b.x+b.width/2,y=pivot?.[1]??b.y+b.height;callbacks.push(t=>e.setAttribute('transform',base+` rotate(${Math.sin((t+delay)/duration*2*Math.PI)*amplitude} ${x} ${y})`))}
 function smoke(parent,x,y,scale=1){const wrap=G(parent,{transform:`translate(${x} ${y}) scale(${scale})`,'data-live-effect':'smoke','pointer-events':'none'});created.push(wrap);for(let i=0;i<4;i++){const g=G(wrap);P(g,'M0 0C-15-10 14-20 0-33C-12-44 15-48 5-60',{stroke:'#8a8375','stroke-width':5,'stroke-linecap':'round'});callbacks.push(t=>{const f=cycle(t,5,i*1.25);g.setAttribute('transform',`translate(${f*13} ${-f*36}) scale(${.35+f*.9})`);g.setAttribute('opacity',Math.sin(f*Math.PI)*.38)})}}
 // Remove inert frame captures of effects replaced by the controlled live layers.
 for(const e of [...svg.querySelectorAll('.v12-smoke-layer,[data-effect="village-smoke"],[data-effect="boathouse-rope"]')])e.remove();
 for(const e of svg.querySelectorAll('[data-emitter="chimney"]'))smoke(e,0,0,.55);
 for(const e of svg.querySelectorAll('[data-effect="train-smoke"],[data-effect="train-steam"]')){e.replaceChildren();smoke(e,0,0,.9)}
 for(const [i,e]of [...svg.querySelectorAll('.cloth')].entries()){
  const first=(e.getAttribute('d')||'').match(/^M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);if(!first)continue;const x=+first[1],y=+first[2],w=Math.max(12,e.getBBox().width);e.style.removeProperty('transform');
  callbacks.push(t=>{const a=Math.sin(t*3.4+i*.5)*4;e.setAttribute('d',`M${x} ${y}C${x+w*.4} ${y+a} ${x+w*.6} ${y-a} ${x+w} ${y+2}L${x+w} ${y+10}C${x+w*.6} ${y+8-a} ${x+w*.4} ${y+8+a} ${x} ${y+8}Z`)})
 }
 for(const [i,e]of [...svg.querySelectorAll('.window-light-wash')].entries()){e.style.removeProperty('opacity');callbacks.push(t=>e.setAttribute('opacity',.09+.14*(.5+.5*Math.sin(t/(2.5+i%4)*Math.PI+i))))}
 for(const [i,e]of [...svg.querySelectorAll('.lamp-glow')].entries()){e.style.removeProperty('opacity');callbacks.push(t=>e.setAttribute('opacity',.88+.12*Math.sin(t*.8+i)))}
 for(const [i,e]of [...svg.querySelectorAll('[data-window]')].entries()){
  const glow=e.cloneNode(false);glow.removeAttribute('id');glow.removeAttribute('data-window');glow.setAttribute('fill','#e8ce8f');glow.setAttribute('pointer-events','none');e.after(glow);created.push(glow);callbacks.push(t=>glow.setAttribute('opacity',.10+.13*(.5+.5*Math.sin(t*1.1+i))))
 }
 rotate(svg.querySelector('.ancient-canopy'),.65,8,[320,280]);
 for(const [i,e]of [...svg.querySelectorAll('[data-oak-cluster]')].filter((_,i)=>i%4===0).entries())rotate(e,1,6+i*.3,[+e.dataset.pivotX,+e.dataset.pivotY],i*.7);
 for(const [i,e]of [...svg.querySelectorAll('[data-willow-strand]')].entries()){if(i%2)continue;rotate(e,2.2,8+i*.04,[0,0],i*.15)}
 const mist=svg.querySelector('[data-effect="v12-forest-mist"]');if(mist){for(const [i,e]of [...mist.children].entries()){e.style.removeProperty('transform');e.style.removeProperty('opacity');callbacks.push(t=>{const f=cycle(t,14+i*2,i*3);e.setAttribute('transform',`translate(${-160+f*350} 0)`);e.setAttribute('opacity',Math.sin(f*Math.PI)*.21)})}}
 const pitch=svg.querySelector('[data-element="r2-pitch"]'),track=pitch?.querySelector('.flight-track'),broom=pitch?.querySelector('.flying-broom'),snitch=pitch?.querySelector('.flying-snitch');
 if(track&&broom){const len=track.getTotalLength();callbacks.push(t=>{const f=cycle(t,11),p=track.getPointAtLength(f*len),q=track.getPointAtLength((f*len+2)%len);broom.setAttribute('transform',`translate(${p.x} ${p.y}) rotate(${Math.atan2(q.y-p.y,q.x-p.x)*180/Math.PI})`);if(snitch){const z=track.getPointAtLength(((f+.1)%1)*len);snitch.setAttribute('transform',`translate(${z.x} ${z.y})`)}})}
 const outline=svg.querySelector('[data-lake-outline]');
 if(outline){
  const b=outline.getBBox(),m=cam.getCTM().inverse().multiply(outline.getCTM()),pts=[[b.x,b.y],[b.x+b.width,b.y+b.height]].map(p=>new DOMPoint(...p).matrixTransform(m)),x=pts[0].x,y=pts[0].y,w=pts[1].x-x,h=pts[1].y-y;
  const layer=G(cam,{'data-live-effect':'lake','pointer-events':'none'});created.push(layer);
  const boat=G(layer,{'data-live-effect':'boat'});P(boat,'M-13-3Q0 5 13-3Q7 11-7 8Z',{fill:'#a98e64',stroke:'#78654b'});P(boat,'M-8 1l15 3M1 1l-6-13',{stroke:'#d1ba89','stroke-width':1.1});
  callbacks.push(t=>{const a=cycle(t,26)*2*Math.PI;boat.setAttribute('transform',`translate(${x+w*.56+Math.cos(a)*w*.13} ${y+h*.52+Math.sin(a)*h*.13}) rotate(${Math.sin(a)*8})`)});
  for(let i=0;i<5;i++){const e=make('ellipse',{cx:x+w*(.3+i*.09),cy:y+h*(.27+i*.09),rx:3,ry:1,fill:'none',stroke:'#d4dfc5','stroke-width':.9},layer);callbacks.push(t=>{const f=cycle(t,5,i);e.setAttribute('rx',3+f*24);e.setAttribute('ry',1+f*8);e.setAttribute('opacity',Math.sin(f*Math.PI)*.5)})}
 }
 for(const [i,e]of [...svg.querySelectorAll('.boat-rock')].entries())rotate(e,.6,7+i);
 const owl=svg.querySelector('[data-effect="owl"]');if(owl){owl.style.removeProperty('transform');callbacks.push(t=>{const a=cycle(t,35)*Math.PI*2;owl.setAttribute('transform',`translate(${130+Math.cos(a)*90} ${100+Math.sin(a)*30}) scale(.7)`);owl.setAttribute('opacity',cycle(t,35)<.5?.8:0)})}
 const peek=svg.querySelector('[data-effect="owl-post-head"]');if(peek){peek.style.removeProperty('opacity');callbacks.push(t=>{const f=cycle(t,28);peek.setAttribute('opacity',f>.3&&f<.58?Math.min(1,(f-.3)*15,(.58-f)*15):0)})}
 for(const [id,count]of [['lakeside-tree',3],['region-6',2]]){const root=svg.querySelector(`[data-id="${id}"]`);if(!root)continue;const b=root.getBBox(),m=cam.getCTM().inverse().multiply(root.getCTM()),origin=new DOMPoint(b.x+b.width*.6,b.y+b.height*.3).matrixTransform(m);for(let i=0;i<count;i++){const leaf=G(cam,{'pointer-events':'none','data-live-effect':'leaf-drift'});P(leaf,'M-2 0Q1-5 5 0Q1 4-2 0Z',{fill:'#a4a17a',stroke:'#888c66','stroke-width':.4});created.push(leaf);callbacks.push(t=>{const f=cycle(t,18+i*2,i*5);leaf.setAttribute('transform',`translate(${origin.x+f*45} ${origin.y+f*45+Math.sin(f*Math.PI*3+i)*5}) rotate(${f*140})`);leaf.setAttribute('opacity',Math.sin(f*Math.PI)*.5)})}}
 for(const e of svg.querySelectorAll('[data-layer="decor"][data-optional="sign"]'))rotate(e,.7,8);
 const greenhouse=svg.querySelector('[data-element="h1.greenhouses"]');for(const [i,e]of [...(greenhouse?.querySelectorAll('[data-color-fill="foliage"]')||[])].slice(0,3).entries())rotate(e,1.8,6+i);
 for(const i of [0,1,5]){const art=svg.querySelector(`[data-id="village-house-${i}"] [data-element]`),board=[...(art?.querySelectorAll('rect')||[])].find(e=>e.getAttribute('width')==='48'&&e.getAttribute('height')==='27');if(board){const g=G(board.parentNode,{'data-live-effect':'shop-sign'}),b=board.getBBox();g.append(board);rotate(g,.8,8+i,[b.x+b.width/2,b.y])}}
 function tick(now){if(disposed)return;raf=requestAnimationFrame(tick);if(now-last<32)return;last=now;const dt=previous?Math.min(.08,(now-previous)/1000):0;previous=now;if(!enabled()||document.hidden)return;clock+=dt;for(const cb of callbacks)cb(clock);svg.dataset.motionTick=clock.toFixed(2)}
 for(const cb of callbacks)cb(0);svg.dataset.motionEffects=callbacks.length;raf=requestAnimationFrame(tick);
 return ()=>{disposed=true;cancelAnimationFrame(raf);for(const e of created)e.remove()};
}

// Shared scene-space geometry. Coordinates are SVG viewBox units; nothing is persisted.
const EXTERIOR_OCCLUDERS = Object.freeze({
 h1:['castle','hagrid','greenhouses','owlery','boathouse','hogsmeade-station','shrieking-shack',...Array.from({length:10},(_,i)=>'hogsmeade-shop-'+i)],
 h2:['great-hall','entrance-hall',...['6','8','9','10','11','12','13','14','15','18','19','24','25','28','30','31','35','36'].map(n=>'castle-'+n),'hagrid','greenhouses','owlery'],
 'village-static':['shrieking-shack','hogsmeade-homes',...Array.from({length:9},(_,i)=>'hogsmeade-shop-'+i)],
 'diagon-knockturn':['da-homes','ka-homes','da-ollivanders','da-scribbulus','da-flourish','da-quidditch','da-menagerie','da-gambol','da-apothecary','da-goods','da-print','da-weasleys','da-tailor','da-optics','da-stationery','da-fortescue','da-robe-used','da-remedies','da-obscurus','da-wizardwear','da-workshop','da-cafe','da-potage','da-malkin','da-eeylops','da-twilfitt','da-gold','da-gringotts','da-leaky','ka-candles','ka-relics','ka-borgin','ka-corner','ka-gloom','ka-dealer','ka-bones']
});
function pointInPolygon(p,vertices){
 if(!p||!vertices||vertices.length<3)return false;
 let inside=false;
 for(let i=0,j=vertices.length-1;i<vertices.length;j=i++){
  const a=vertices[i],b=vertices[j],dx=b.x-a.x,dy=b.y-a.y;
  const cross=(p.x-a.x)*dy-(p.y-a.y)*dx;
  if(Math.abs(cross)<1e-7&&p.x>=Math.min(a.x,b.x)-1e-7&&p.x<=Math.max(a.x,b.x)+1e-7&&p.y>=Math.min(a.y,b.y)-1e-7&&p.y<=Math.max(a.y,b.y)+1e-7)return true;
  if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
function pointInRegions(p,regions){return !!p&&(regions||[]).some(r=>pointInPolygon(p,r.points))}
function pointInFog(p,visibility){
 const active=new Set(visibility.fogRegionIds||[]);
 return pointInRegions(p,(visibility.fogRegions||[]).filter(r=>active.has(r.id)));
}
function surfaceAllowed(p,spatial){
 return !!p&&!!spatial?.walkableRegions?.length&&pointInRegions(p,spatial.walkableRegions)&&!pointInRegions(p,spatial.blockedRegions||[]);
}
function fitSceneBounds(base,areas,viewport,padding=55){
 if(!areas.length)return [...base];
 const left=Math.min(...areas.map(p=>p.left??p.x)),right=Math.max(...areas.map(p=>p.right??p.x));
 const top=Math.min(...areas.map(p=>p.top??p.y)),bottom=Math.max(...areas.map(p=>p.bottom??p.y));
 if(![left,right,top,bottom].every(Number.isFinite))throw Error('Invalid scene extents');
 let w=Math.max(220,right-left+padding*2),h=Math.max(180,bottom-top+padding*2);
 const ratio=Math.max(.3,Math.min(4,(viewport.width||1)/(viewport.height||1)));
 if(w/h<ratio)w=h*ratio;else h=w/ratio;
 return [(left+right-w)/2,(top+bottom-h)/2,w,h];
}
// Last painted confirmed candidate wins; no bbox-based claim of walkability.
function selectOccluder(point,candidates){
 let result=null;
 for(const candidate of candidates)if(candidate.contains(point))result=candidate;
 return result;
}

// Runtime for one-way Preview rendering; no persistence.
Object.assign(FURNITURE,JSON.parse(document.querySelector('#qa-furniture')?.textContent||'{}'));
const embeddedAtlas=document.querySelector('#qa-atlas')?JSON.parse(document.querySelector('#qa-atlas').textContent):null;
const embeddedData=document.querySelector('#MAP_DATA')?JSON.parse(document.querySelector('#MAP_DATA').textContent):null;
let bundleSource=document.currentScript.textContent;
const bundleURL=document.currentScript.src;
const NSVG='http://www.w3.org/2000/svg';
const el=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n};
let plan,geometry,visibleActors=[];
let atlas,activeData,svg,stops=[],box,base,drag,moved=false,motion=true;
const q=s=>document.querySelector(s);
const style=el('style');style.textContent=CSS+'\n.qa-tags{position:absolute;inset:0;pointer-events:none}.qa-tags button{position:absolute;pointer-events:auto;transform:translate(-50%,-100%)}.qa-controls{display:flex;gap:6px;flex-wrap:wrap}.qa-controls select{max-width:220px}.qa-error{color:#ffb6a5;white-space:pre-wrap}.qa-overlay{position:fixed;inset:10%;z-index:20;background:var(--paper);padding:20px;display:flex;flex-direction:column;gap:8px}.qa-overlay textarea{flex:1;min-height:150px}.qa-overlay[hidden]{display:none}.qa-tags .hint-marker{border:1px solid #8c2939;border-radius:50%;background:#eee4d1;color:#8c2939}';document.head.append(style);
document.body.innerHTML=SHELL; // Trusted checked-in shell only; RP text uses textContent.
const bar=el('div');bar.className='reviewbar qa-controls';q('.layout').before(bar);
const select=el('select');select.setAttribute('aria-label','Template');bar.append(select);
function button(label,fn){const b=el('button',label);b.className='review-button';b.onclick=fn;bar.append(b);return b}
const status=el('span','Đang tải atlas…');status.setAttribute('role','status');bar.append(status);
const error=el('div');error.className='qa-error';error.setAttribute('role','alert');bar.append(error);
const panel=el('div');panel.className='qa-overlay';panel.hidden=true;
const editor=el('textarea');editor.setAttribute('aria-label','MAP_DATA JSON');panel.append(el('strong','MAP_DATA — chỉ dữ liệu công khai cho test'),editor);
const apply=el('button','Áp dụng');apply.onclick=async()=>{try{await render(JSON.parse(editor.value));panel.hidden=true}catch(e){error.textContent=e.message}};
const close=el('button','Đóng');close.onclick=()=>panel.hidden=true;panel.append(apply,close);document.body.append(panel);
button('MAP_DATA',()=>{editor.value=JSON.stringify(activeData||{},null,2);panel.hidden=false});
button('+',()=>zoom(.8));button('−',()=>zoom(1.25));button('Vừa khung',()=>{box=[...base];update()});
button('Chuyển động',()=>{motion=!motion;document.body.classList.toggle('motion-off',!motion);q('#mapmount').style.setProperty('--qa-motion',motion?'running':'paused')});
button('Tải HTML',()=>{const copy=document.documentElement.cloneNode(true);copy.querySelector('body').replaceChildren();copy.querySelectorAll('style').forEach(n=>n.remove());const payload=el('script');payload.type='application/json';payload.id='qa-atlas';payload.textContent=JSON.stringify(atlas).replace(/</g,'\\u003c');copy.querySelector('body').append(payload);const assets=el('script');assets.type='application/json';assets.id='qa-furniture';assets.textContent=JSON.stringify(FURNITURE).replace(/</g,'\\u003c');copy.querySelector('body').append(assets);const data=el('script');data.type='application/json';data.id='MAP_DATA';data.textContent=serializeMapData(activeData);copy.querySelector('body').append(data);const script=el('script');script.textContent=bundleSource;copy.querySelector('body').append(script);const url=URL.createObjectURL(new Blob(['<!doctype html>'+copy.outerHTML],{type:'text/html'}));const a=el('a');a.href=url;a.download='wizamap-template-test.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000)});
q('#drawer-toggle').onclick=()=>{const layout=q('.layout');layout.classList.toggle('drawer-open');q('#drawer-toggle').setAttribute('aria-expanded',String(layout.classList.contains('drawer-open')))};
function inspect(row,placeId){let action=q('#actor-action');if(!action){action=el('div');action.id='actor-action';action.className='review-status';bar.append(action)}action.textContent=row.stance==='walk'?'Đang đi':row.activity||'';q('#place-title').textContent=row.name||row.title;q('#drawer-name').textContent=row.name||row.title;q('#place-area').textContent=activeData.meta.areaName;q('#activity').textContent=row.inspector?.overhear||'';q('#observation').textContent=row.inspector?.observation||'';q('#actors').replaceChildren(...visibleActors.filter(a=>a.placeId===placeId).map(a=>{const n=actorTag(a,true);n.onclick=()=>inspect(a,a.placeId);return n}))}
const EXTERIOR_TEMPLATES=new Set(['h1','h2','village-static','diagon-knockturn']);
function anchor(place){
 if(geometry){const p=geometry.suggestedAnchors[place.id]?.[0];if(!p)throw Error('No indoor actor anchor for '+place.id);return p}
 const targets=registry.templates[select.value].targets[place.atlasRef];
 const nodes=[...svg.querySelectorAll('[data-id]')].filter(n=>targets.includes(n.dataset.id));
 if(!nodes.length)throw Error('Không tìm thấy shape cho '+place.id);
 // SVG shape bounds are artwork, not a walkable floor. Outdoor markers use
 // the lower edge; screen-space padding keeps feet below roofs at every zoom.
 const node=nodes[0],b=node.getBBox(),matrix=svg.getScreenCTM().inverse().multiply(node.getScreenCTM());
 const corners=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>{const p=svg.createSVGPoint();p.x=x;p.y=y;return p.matrixTransform(matrix)});
 const left=Math.min(...corners.map(p=>p.x)),right=Math.max(...corners.map(p=>p.x)),top=Math.min(...corners.map(p=>p.y)),bottom=Math.max(...corners.map(p=>p.y));
 return {x:(left+right)/2,y:EXTERIOR_TEMPLATES.has(select.value)?top+(bottom-top)*.3:(top+bottom)/2,left,right,top,bottom};
}
let labels=[];
function update(){
 if(!svg)return;svg.setAttribute('viewBox',box.join(' '));const r=q('#mapmount').getBoundingClientRect(),ctm=svg.getScreenCTM();
 for(const {node,point,dx=0,dy=0,feet} of labels){
  const inFog=pointInFog(point,activeData.visibility);node.hidden=inFog;if(feet)feet.style.display=inFog?'none':'';
  const p=svg.createSVGPoint();p.x=point.x;p.y=point.y;const s=p.matrixTransform(ctm);s.x+=dx;s.y+=dy;
  node.style.left=(s.x-r.left)+'px';node.style.top=(s.y-r.top)+'px';
  if(feet){const m=ctm.inverse().translate(s.x,s.y+12).rotate(90).scale(.35);feet.setAttribute('transform',`matrix(${m.a} ${m.b} ${m.c} ${m.d} ${m.e} ${m.f})`)}
 }
}
function zoom(f){if(!box)return;box=[box[0]+box[2]*(1-f)/2,box[1]+box[3]*(1-f)/2,box[2]*f,box[3]*f];update()}
async function render(data){assertMapData(data);plan=resolveMap(data);const id=plan.templateId;
 const spatial=data.view.spatial||null,exterior=EXTERIOR_TEMPLATES.has(id);
 if(exterior){for(const a of data.actors){if(a.environment==='outside'&&(!a.position||!surfaceAllowed(a.position,spatial)))throw Error('Actor '+a.id+': outside position requires explicit verified walkable polygon and must avoid blocked regions');}}


 stops.forEach(stop=>stop());stops=[];labels=[];visibleActors=[];error.textContent='';activeData=structuredClone(data);select.value=id;
 geometry=null;
 if(plan.mode==='generated'){
 geometry=buildGeometry(plan,data.view.indoor||{});
 svg=document.createElementNS(NSVG,'svg');svg.setAttribute('viewBox',geometry.bounds.join(' '));
 drawIndoor(svg,geometry,placeId=>{
  const p=data.places.find(row=>row.id===placeId);
  if(p&&!pointInFog(geometry.suggestedAnchors[placeId]?.[0],data.visibility))inspect(p,p.id);
 });
 base=geometry.bounds;
 }else{
 const doc=new DOMParser().parseFromString(atlas.maps[id].svg,'image/svg+xml');svg=document.importNode(doc.documentElement,true);
 const defs=document.createElementNS(NSVG,'defs');
 const needed=new Set(),pending=[svg.outerHTML];
 while(pending.length){const text=pending.pop();for(const m of text.matchAll(/(?:href=["']#|url\(#)([^"') ]+)/g)){const key=m[1];if(!needed.has(key)&&atlas.vectors[key]){needed.add(key);pending.push(atlas.vectors[key])}}}
 defs.innerHTML=[...needed].map(k=>atlas.vectors[k]).join('');svg.prepend(defs);base=atlas.maps[id].bounds||svg.getAttribute('viewBox').split(/[ ,]+/).map(Number);
 }
 const feetDefs=document.createElementNS(NSVG,'defs');feetDefs.innerHTML=shoeDefs;svg.prepend(feetDefs);
 q('#mapmount').replaceChildren(svg);const overlay=el('div');overlay.className='qa-tags';q('#mapmount').append(overlay);box=[...base];
 const points=new Map(data.places.filter(p=>data.visibility.visiblePlaceIds.includes(p.id)).map(p=>[p.id,anchor(p)]));
 // Do not expose fogged actors/hints through ribbons, navigation or inspector.
 visibleActors=data.actors.filter(a=>!pointInFog(geometry?indoorActorPoint(geometry,a.placeId,a.position):a.position||points.get(a.placeId),data.visibility));
 if(!visibleActors.some(a=>a.isPC))throw Error('PC position is inside fog; scene visibility is inconsistent');
 const visibleHints=data.hints.filter(h=>!pointInFog(points.get(h.placeId),data.visibility));
 const occluders=exterior?(spatial?.occlusionRegions||[]).map(region=>{
  const allowed=EXTERIOR_OCCLUDERS[id]||[];
  if(!allowed.includes(region.targetId))throw Error('Occlusion target not approved for template: '+region.targetId);
  const targets=registry.templates[id].targets[region.targetId]||[];
  if(targets.length!==1&&!region.interactiveId)throw Error('Ambiguous occlusion building: '+region.targetId+'; specify interactiveId');
  const interactiveId=region.interactiveId||targets[0];
  if(!targets.includes(interactiveId))throw Error('Occlusion interactiveId not in approved building: '+interactiveId);
  const target=[...svg.querySelectorAll('[data-id]')].find(n=>n.dataset.id===interactiveId);
  if(!target)throw Error('Occlusion target absent from SVG: '+region.targetId);
  return {id:region.id,target,contains:p=>pointInPolygon(p,region.points)};
 }):[];
 for(const p of data.places){if(geometry||!points.has(p.id))continue;const ids=registry.templates[id].targets[p.atlasRef];for(const n of svg.querySelectorAll('[data-id]'))if(ids.includes(n.dataset.id)){n.setAttribute('tabindex','0');n.setAttribute('role','button');n.setAttribute('aria-label',p.name);const choose=()=>{if(!pointInFog(points.get(p.id),data.visibility))inspect(p,p.id)};n.onclick=()=>{if(!moved)choose()};n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose()}}}}
 const offsets=new Map();for(const a of visibleActors){
 const point=geometry?indoorActorPoint(geometry,a.placeId,a.position):points.get(a.placeId),n=actorTag(a),i=offsets.get(a.placeId)||0;offsets.set(a.placeId,i+1);
 // Additional actors occupy rows below the same ground anchor, never climb
 // upwards into the artwork. Offsets and footprints remain readable on zoom.
 const count=visibleActors.filter(other=>other.placeId===a.placeId).length,columns=Math.min(count,3);
 const dx=((i%3)-(columns-1)/2)*110,dy=(EXTERIOR_TEMPLATES.has(id)?38:0)+Math.floor(i/3)*55;
 const occluded=a.environment==='outside'&&a.position?selectOccluder(a.position,occluders):null;
 const cover=occluded?.target||null;
 const fade=on=>{if(!cover)return;if(on)cover.style.opacity='.7';else if(![...overlay.querySelectorAll('.selected')].some(tag=>tag!==n&&tag.dataset.coverId===occluded.id))cover.style.removeProperty('opacity')};
 if(occluded)n.dataset.coverId=occluded.id;n.onmouseenter=()=>fade(true);n.onmouseleave=()=>{if(!n.classList.contains('selected'))fade(false)};n.onclick=()=>{for(const b of overlay.querySelectorAll('.selected')){b.classList.remove('selected');b.dispatchEvent(new Event('mouseleave'))}n.classList.add('selected');fade(true);inspect(a,a.placeId)};overlay.append(n);
 const feet=document.createElementNS(NSVG,'g');feet.dataset.actorFeet=a.id;feet.setAttribute('fill','#8c2939');feet.style.pointerEvents='none';svg.append(feet);
 if(a.environment==='inside'&&EXTERIOR_TEMPLATES.has(id)){feet.remove();labels.push({node:n,point,dx,dy:0})}else{if(EXTERIOR_TEMPLATES.has(id)&&!a.position)throw Error('Ngoài trời cần position đã xác minh trên đất/sàn: '+a.id);labels.push({node:n,point:geometry?point:a.position||point,dx,dy,feet});stops.push(mountFeet(feet,a.stance));}
 }
 q('#quests').replaceChildren(...visibleHints.map(h=>{const p=data.places.find(p=>p.id===h.placeId),n=el('button',h.title+' · '+p.name);n.className='quest';n.onclick=()=>inspect(h,h.placeId);const marker=el('button','?');marker.className='hint-marker';marker.setAttribute('aria-label',h.title);marker.onclick=n.onclick;overlay.append(marker);labels.push({node:marker,point:points.get(h.placeId),dx:65,dy:EXTERIOR_TEMPLATES.has(id)?38:0});return n}));q('#hintcount').textContent=visibleHints.length+'/6';q('.quote').textContent=data.meta.quote;q('#zone').textContent=data.meta.areaName;q('.clock').textContent=data.meta.time;q('.date').textContent=data.meta.date;inspect(data.places.find(p=>p.id===data.focus.actualPlaceId),data.focus.actualPlaceId);
 if(data.view.crop!==false&&points.size){const viewport=q('#mapmount').getBoundingClientRect();const extent=geometry?(()=>{const [x,y,w,h]=geometry.bounds;return [{left:x,top:y,right:x+w,bottom:y+h}]})():[...points.values(),...visibleActors.map(a=>a.position||points.get(a.placeId)),...data.view.routePlaceIds.filter(id=>points.has(id)).map(id=>points.get(id))];box=fitSceneBounds(base,extent,{width:viewport.width,height:viewport.height},geometry?0:55);}
 for(const region of data.visibility.fogRegions||[]){if(!data.visibility.fogRegionIds.includes(region.id))continue;const fog=document.createElementNS(NSVG,'polygon');fog.setAttribute('points',region.points.map(p=>`${p.x},${p.y}`).join(' '));fog.setAttribute('fill','#303238');fog.setAttribute('opacity','.94');fog.setAttribute('pointer-events','all');fog.setAttribute('aria-hidden','true');svg.append(fog);}
 svg.onwheel=e=>{e.preventDefault();zoom(e.deltaY<0?.9:1.1)};svg.onpointerdown=e=>{if(e.button!==0)return;moved=false;drag={x:e.clientX,y:e.clientY,box:[...box]}};svg.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4)moved=true;if(!moved)return;svg.setPointerCapture(e.pointerId);const r=svg.getBoundingClientRect(),scale=Math.min(r.width/drag.box[2],r.height/drag.box[3]);box=[drag.box[0]-dx/scale,drag.box[1]-dy/scale,drag.box[2],drag.box[3]];update()};svg.onpointerup=svg.onpointercancel=()=>drag=null;svg.onlostpointercapture=()=>drag=null;
 let pinch;svg.addEventListener('touchstart',e=>{if(e.touches.length===2){drag=null;pinch={distance:Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY),box:[...box]}}},{passive:true});svg.addEventListener('touchmove',e=>{if(pinch&&e.touches.length===2){e.preventDefault();const distance=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);const f=pinch.distance/Math.max(1,distance),b=pinch.box;box=[b[0]+b[2]*(1-f)/2,b[1]+b[3]*(1-f)/2,b[2]*f,b[3]*f];update()}},{passive:false});svg.addEventListener('touchend',()=>pinch=null);
 if(id==='h1')stops.push(mountH1Motion(svg,()=>motion&&!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches));update();status.textContent=geometry?'Mặt bằng dựng trong Preview':'Template: '+id;window.WIZAMAP_TEST={render,get data(){return structuredClone(activeData)},get template(){return select.value},get generatedGeometry(){return geometry?structuredClone({floorPolygons:geometry.floorPolygons,actorZones:geometry.actorZones,exclusionZones:geometry.exclusionZones,suggestedAnchors:geometry.suggestedAnchors}):null}};
}
// Capture embedded input before replacing the document body above.
async function start(){try{if(!bundleSource&&bundleURL){const source=await fetch(bundleURL);if(!source.ok)throw Error('Bundle HTTP '+source.status);bundleSource=await source.text()}atlas=embeddedAtlas;if(!atlas){const response=await fetch(ATLAS_URL);if(!response.ok)throw Error('Atlas HTTP '+response.status);const html=await response.text();const doc=new DOMParser().parseFromString(html,'text/html');const encoded=doc.querySelector('#map-data')?.textContent.trim();if(!encoded)throw Error('Atlas thiếu payload');const bytes=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));atlas=JSON.parse(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).text())}select.replaceChildren(...Object.keys(atlas.maps).map(id=>{const o=el('option',atlas.maps[id].title);o.value=id;return o}));select.hidden=true;if(!embeddedData)throw Error('Thiếu MAP_DATA. Hãy cung cấp dữ liệu RP; không có dữ liệu mẫu tự động.');await render(embeddedData);new ResizeObserver(update).observe(q('#mapmount'))}catch(e){error.textContent='Không mở được template: '+e.message;status.textContent='Lỗi'}}
start();

})();