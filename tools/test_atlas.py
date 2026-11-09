"""Round-trip and rejection checks for atlas.py; no browser/dependencies needed."""
import copy,importlib.util,json
from pathlib import Path
import subprocess,sys,tempfile,unittest

TOOL=Path(__file__).with_name('atlas.py')
spec=importlib.util.spec_from_file_location('atlas',TOOL);atlas=importlib.util.module_from_spec(spec);spec.loader.exec_module(atlas)
BASE=TOOL.parents[1]/'index.html'

class AtlasTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.file=Path(self.tmp.name)/'index.html';self.file.write_bytes(BASE.read_bytes())
    def tearDown(self):self.tmp.cleanup()
    def run_tool(self,*args):
        return subprocess.run([sys.executable,str(TOOL),'--atlas',str(self.file),*args],capture_output=True,text=True)
    def test_extract_apply_preserves_other_maps_and_runtime(self):
        before,data=atlas.load(self.file);svg=Path(self.tmp.name)/'h1.svg'
        self.assertEqual(self.run_tool('extract','h1','--out',str(svg)).returncode,0)
        self.assertEqual(svg.read_text(),data['maps']['h1']['svg'])
        edited=svg.read_text().replace('aria-label="H1', 'data-edit-test="true" aria-label="H1',1);svg.write_text(edited)
        result=self.run_tool('apply','h1','--svg',str(svg));self.assertEqual(result.returncode,0,result.stderr)
        after,updated=atlas.load(self.file)
        for key in data['maps']:
            if key!='h1':self.assertEqual(data['maps'][key],updated['maps'][key])
        self.assertEqual(updated['maps']['h1']['svg'],edited)
        self.assertEqual(atlas.DATA.sub('',before),atlas.DATA.sub('',after))
    def test_invalid_reference_does_not_modify_atlas(self):
        original=self.file.read_bytes();svg=Path(self.tmp.name)/'bad.svg'
        svg.write_text('<svg xmlns="http://www.w3.org/2000/svg"><use href="#missing"/></svg>')
        result=self.run_tool('apply','h1','--svg',str(svg));self.assertNotEqual(result.returncode,0);self.assertEqual(self.file.read_bytes(),original)
    def test_preview_is_self_contained_and_cannot_be_applied(self):
        svg=Path(self.tmp.name)/'preview.svg';result=self.run_tool('extract','h1','--standalone','--out',str(svg));self.assertEqual(result.returncode,0,result.stderr)
        atlas.check_svg(svg.read_text());original=self.file.read_bytes()
        result=self.run_tool('apply','h1','--svg',str(svg));self.assertNotEqual(result.returncode,0);self.assertEqual(self.file.read_bytes(),original)
    def test_h2_is_self_contained_and_every_target_has_metadata(self):
        _,data=atlas.load(self.file)
        h2=data['maps']['h2'];root=atlas.check_svg(h2['svg'])
        targets=[e.get('data-id') for e in root.iter() if e.get('class')=='place']
        self.assertEqual(len(targets),72)
        self.assertEqual(set(targets),{p['id'] for p in h2['places']})
        self.assertEqual(h2['bounds'],[0,0,1760,1120])
        self.assertFalse(any(e.tag.endswith('}image') for e in root.iter()))
        self.assertFalse(any(ref.startswith('wm-s') for ref in atlas.refs(h2['svg'])))
    def test_unknown_map_is_rejected(self):
        self.assertNotEqual(self.run_tool('extract','not-a-map').returncode,0)

if __name__=='__main__':unittest.main()

