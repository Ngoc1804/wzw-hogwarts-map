import unittest
import xml.etree.ElementTree as ET
from atlas import ROOT,load,check_svg
from build_ministry import build_ministry
class MinistryTests(unittest.TestCase):
 def test_source_and_targets(self):
  _,data=load(ROOT/'index.html');m=data['maps']['ministry-8-10'];self.assertEqual(m,build_ministry());root=check_svg(m['svg']);self.assertEqual({e.get('data-id') for e in root.iter() if e.get('data-id')},{p['id'] for p in m['places']});self.assertEqual(len(m['places']),32)
  for p in m['places']:
   if p.get('targetMap'):self.assertIn(p['targetMap'],data['maps'])
 def test_only_approved_addition(self):
  _,data=load(ROOT/'index.html');self.assertEqual(len(data['maps']),13);self.assertNotIn('london',data['maps']);self.assertNotIn('britain-ireland',data['maps']);m=data['maps']['ministry-8-10'];self.assertTrue(m['vertical']);self.assertEqual([f['box'][1] for f in m['floorViews']],[155,945,1900]);ids={p['id'] for p in m['places']};self.assertTrue({'mm-fountain','mm-lift-8','mm-lift-9','mm-stairs-9','mm-stairs-10'}<=ids);self.assertNotIn('mm-lift-10',ids)
if __name__=='__main__':unittest.main()
