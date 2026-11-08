"""Validate the current framework catalog without regenerating artwork."""
from pathlib import Path
import json,re,xml.etree.ElementTree as ET

ROOT=Path(__file__).resolve().parents[1]
catalog=json.loads((ROOT/'catalog.json').read_text())
seen=set();files=set()
for item in catalog['elements']:
    id=item['id'];assert id not in seen,('duplicate ID',id);seen.add(id)
    file=ROOT/item['file'];assert file.exists(),item['file'];assert file not in files,('duplicate file',file);files.add(file)
    text=file.read_text();root=ET.fromstring(text)
    assert root.tag=='{http://www.w3.org/2000/svg}svg',(id,'namespace')
    assert root.get('viewBox'),(id,'viewBox')
    ids=[e.get('id') for e in root.iter() if e.get('id')]
    assert len(ids)==len(set(ids)),(id,'duplicate SVG IDs')
    refs=set(re.findall(r'url\(#([^)]*)\)',text))|set(re.findall(r'href=[\"\']#([^\"\']*)',text))
    assert not refs-set(ids),(id,'missing references',refs-set(ids))
    assert not any(e.tag=='{http://www.w3.org/2000/svg}script' for e in root.iter()),(id,'script')
print('PASS',len(seen),'frameworks: IDs, SVG XML, viewBox and local references')
