"""Verify canonical IDs, compatible aliases, and atlas source coverage."""
import json,unittest
from pathlib import Path
import atlas
ROOT=atlas.ROOT
class Inventory(unittest.TestCase):
    def test_aliases_resolve_without_cycles(self):
        catalog=json.loads((ROOT/'elements/catalog.json').read_text());ids={e['id'] for e in catalog['elements']}
        for name in catalog['aliases']:
            seen=set();target=name
            while target in catalog['aliases']:
                self.assertNotIn(target,seen);seen.add(target);target=catalog['aliases'][target]
            self.assertIn(target,ids)
        self.assertNotIn('house.porch',ids);self.assertNotIn('house.garden',ids)
        self.assertEqual(len(ids),259)
        self.assertEqual(len([x for x in ids if x.startswith('house.')]),18)
    def test_interactive_ids_stay_in_renderer_index(self):
        # Artwork interaction IDs are technical; they are NOT new atlas place IDs.
        _,payload=atlas.load(ROOT/'index.html')
        index=json.loads((ROOT/'maps/interaction-index.json').read_text())
        expected={f"{m['id']}/{ident}" for m in atlas.metadata(payload) for ident in m['interactiveIds']}
        self.assertEqual(expected,{mid+'/'+ident for mid,items in index['maps'].items() for ident in items})
        canonical=json.loads((ROOT/'maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json').read_text())
        self.assertEqual(canonical['schemaVersion'],'atlas-optimized-1.0')
        self.assertEqual(canonical['statistics']['places'],733)
        self.assertEqual(len(canonical['places']),733)
        self.assertEqual(len(index['maps']),13)
    def test_catalog_is_the_only_asset_inventory(self):
        catalog=json.loads((ROOT/'elements/catalog.json').read_text())
        expected={e['file'] for e in catalog['elements']}
        actual={'assets/'+p.name for p in (ROOT/'elements/assets').glob('*.svg')}
        self.assertEqual(expected,actual)
        self.assertEqual(len(expected),len(catalog['elements']))
if __name__=='__main__':unittest.main()
