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
    def test_world_atlas_preserves_every_interactive_id(self):
        world=json.loads((ROOT/'maps/world-atlas.json').read_text());_,payload=atlas.load(ROOT/'index.html')
        expected={f"{m['id']}/{ident}" for m in atlas.metadata(payload) for ident in m['interactiveIds']}
        self.assertEqual(expected,{p['id'] for p in world['locations']})
        self.assertEqual(len(expected),len(world['locations']))
    def test_uploaded_v3_ids_remain_available(self):
        audit=json.loads((ROOT/'elements/docs/asset-audit.json').read_text())
        self.assertEqual(audit['v3Count'],245);self.assertEqual(audit['v3MissingIds'],[])
        self.assertEqual(audit['finalCount'],366)
if __name__=='__main__':unittest.main()
