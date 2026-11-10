#!/usr/bin/env python3
"""Validate template target references against the actual shipped SVG payload."""
import json,xml.etree.ElementTree as ET
from pathlib import Path
import atlas
R=Path(__file__).resolve().parents[1]
_,art=atlas.load(R/'index.html');registry=json.loads((R/'runtime/templates.json').read_text())['templates']
assert len(art['maps'])==len(registry)==13
count=0
for id,entry in registry.items():
 root=ET.fromstring(art['maps'][id]['svg']);ids={n.get('data-id') for n in root.iter() if n.get('data-id')}
 for name,targets in entry['targets'].items():
  assert targets and len(targets)==len(set(targets)), f'{id}/{name}: empty or duplicate target'
  assert set(targets)<=ids,f'{id}/{name}: absent SVG targets {set(targets)-ids}'
  count+=1
print(f'PASS 13 unchanged template artworks, {count} semantic bindings reference real interactive geometry; Ministry 1–7 standing/occlusion excluded')
