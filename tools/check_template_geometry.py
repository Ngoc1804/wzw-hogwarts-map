#!/usr/bin/env python3
"""Validate template target references against the actual shipped SVG payload."""
import hashlib,json,xml.etree.ElementTree as ET
from pathlib import Path
import atlas
R=Path(__file__).resolve().parents[1]
_,art=atlas.load(R/'index.html');registry=json.loads((R/'runtime/templates.json').read_text())['templates']
assert len(art['maps'])==len(registry)==13
supplement=json.loads((R/'runtime/template-localities.json').read_text());assert supplement['sourceArtworkSha256']==hashlib.sha256((R/'index.html').read_bytes()).hexdigest(),'Artwork changed; recheck supplementary floor placements'
count=0
for id,entry in registry.items():
 root=ET.fromstring(art['maps'][id]['svg']);ids={n.get('data-id') for n in root.iter() if n.get('data-id')}
 for name,targets in entry['targets'].items():
  assert targets and len(targets)==len(set(targets)), f'{id}/{name}: empty or duplicate target'
  generated={('locality-'+p['placeId']) for p in json.loads((R/'runtime/template-localities.json').read_text())['regions'] if p['templateId']==id}
  assert set(targets)<=ids|generated,f'{id}/{name}: absent SVG targets {set(targets)-ids}'
  count+=1
print(f'PASS 13 unchanged template artworks, {count} semantic bindings reference original SVG or explicitly authored supplementary geometry; Ministry 1–7 standing/occlusion excluded')
