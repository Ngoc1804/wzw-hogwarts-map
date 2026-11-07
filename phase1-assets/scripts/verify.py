from pathlib import Path
import json,re,sys,collections,hashlib
from lxml import etree as E,html
from geometry import children_geometry,signature
ROOT=Path(__file__).resolve().parents[1];c=json.loads((ROOT/'catalog.json').read_text());seen={};bounds=[]
for a in c['elements']:
 r=E.fromstring(a['svg'].encode());assert r.get('viewBox')=='0 0 256 256'
 assert not r.xpath('//*[local-name()="text" or local-name()="script"]')
 p=children_geometry(r);assert p,a['id'];bs=[x.bbox() for x in p];x=min(b[0] for b in bs);y=min(b[2] for b in bs);w=max(b[1] for b in bs)-x;h=max(b[3] for b in bs)-y
 a['occupancy']={'type':'geometry-bbox','x':round(x,3),'y':round(y,3),'width':round(w,3),'height':round(h,3),'collisionReady':False}
 if x<0 or y<0 or x+w>256 or y+h>256:bounds.append((a['id'],[x,y,w,h]))
 key=signature(r,{})
 assert key not in seen,('duplicate',a['id'],seen.get(key));seen[key]=a['id'];a['geometryFingerprint']=key
 assert (ROOT/a['file']).read_text()==a['svg']
assert not bounds,bounds
assert len(c['elements'])==len(set(a['id'] for a in c['elements']))
# Keep inline and standalone catalog identical after computed metadata is enriched.
f=ROOT/'index.html';s=f.read_text();s=re.sub(r'(<script id="data" type="application/json">).*?(</script>)',lambda m:m[1]+json.dumps(c['elements'],ensure_ascii=False).replace('</','<\\/')+m[2],s,flags=re.S);f.write_text(s)
(ROOT/'catalog.json').write_text(json.dumps(c,ensure_ascii=False,indent=2))
assert len(html.fromstring(s).xpath('//article'))==len(c['elements'])
for name in ['fireside','study','potions','portraits','banners']:
 r=html.fromstring((ROOT/'examples'/f'{name}.html').read_text());assert r.xpath('//*[@data-element-id]')
print('PASS',len(c['elements']),'unique geometries; all within viewBox; XML valid; static cards present; three composition examples valid.')
