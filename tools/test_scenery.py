"""Check neutral masters and structural roof geometry, independent of color presets."""
import json,unittest,hashlib,xml.etree.ElementTree as E
from pathlib import Path
import atlas
R=atlas.ROOT
class Scenery(unittest.TestCase):
 def test_model_counts_and_geometry_uniqueness(self):
  c=json.loads((R/'elements/catalog.json').read_text());es=[e for e in c['elements'] if e['id'].startswith(('house.','tree.'))];self.assertEqual(len(es),32)
  self.assertEqual(sum(e['id'].startswith('house.') for e in es),18)
  signatures=[]
  for e in es:
   root=E.parse(R/'elements'/e['file']).getroot()
   # Paint is excluded; separate copies with new colors still count as duplicates.
   geometry=[(n.tag,sorted((k,v) for k,v in n.attrib.items() if k in ['d','points','x','y','width','height','rx','ry','cx','cy','r','transform'])) for n in root.iter()]
   signatures.append(str(geometry))
  self.assertEqual(len(signatures),len(set(signatures)))
 def test_palette_is_separate(self):
  p=json.loads((R/'elements/palettes.json').read_text());self.assertEqual(p['neutral'],{})
  for id in ['tree.oak','tree.pine','house.wood.gable','house.brick.tall']:
   text=(R/'elements/assets'/f'{id}.svg').read_text();self.assertIn('var(--',text)
 def test_roof_topology(self):
  _,p=atlas.load(R/'index.html');root=E.fromstring(p['maps']['diagon-knockturn']['svg'])
  front=[n for n in root.iter() if n.get('data-part')=='roof-front-connected'];back=[n for n in root.iter() if n.get('data-part')=='roof-side-connected']
  self.assertEqual(len(front),69);self.assertEqual(len(back),69)
  for node in front+back:self.assertTrue(node.get('d').strip().endswith('Z'))
if __name__=='__main__':unittest.main()
