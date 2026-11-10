#!/usr/bin/env python3
"""Build the Preview runtime without default RP data."""
import argparse,json,re,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--ref');p.add_argument('--debug',action='store_true',help='Enable MAP_DATA editor and browser test hooks');p.add_argument('--data',help='Explicit test/RP JSON file; never bundled by default');p.add_argument('--embed-atlas',action='store_true');p.add_argument('--offline',action='store_true',help='Embed only the atlas/assets required by --data');a=p.parse_args()
out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
ref=a.ref or subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip()
if not re.fullmatch('[0-9a-f]{40}',ref):p.error('--ref must be a full commit SHA')
def read(f):return (R/f).read_text()
def literal(f):return json.dumps(json.loads(read(f)),ensure_ascii=False)
assetfiles={e['id']:e['file'] for e in json.loads(read('elements/catalog.json'))['elements']}
parts=['const BUNDLE_REF='+json.dumps(ref)+';', 'const ASSET_FILES='+json.dumps(assetfiles)+';', 'const ASSET_ROOT='+json.dumps(f'https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@{ref}/elements/')+';', 'const schema='+literal('runtime/map-data.schema.json')+';', 'const sceneAtlas='+literal('runtime/atlas-index.json')+';', 'const TOKENS='+literal('ui/tokens.json')+';', 'const registry='+literal('runtime/templates.json')+';', 'const SPATIAL_URL='+json.dumps(f'https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@{ref}/runtime/template-spatial.json')+';', 'const assetCatalog='+json.dumps({'elements':[{k:v for k,v in e.items() if k in ['id','file','occupancy','surface','viewBox']} for e in json.loads(read('elements/catalog.json'))['elements']]},ensure_ascii=False)+';', 'const SHELL='+json.dumps(read('ui/shell.html'))+';', 'const CSS='+json.dumps(read('ui/shell.css'))+';', 'const ATLAS_URL='+json.dumps(f'https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@{ref}/index.html')+';', 'const INDOOR_MATERIALS='+json.dumps(read('elements/architecture/materials.svg'),ensure_ascii=False)+';']
for f in ['runtime/map-data.mjs','runtime/atlas-scene.mjs','runtime/resolve-map.mjs','runtime/architecture/recipes.mjs','runtime/architecture/walls.mjs','runtime/furnishings.mjs','runtime/geometry.mjs','runtime/scene-assets.mjs','runtime/spatial.mjs','runtime/floor-surfaces.mjs','elements/architecture/elements.mjs','runtime/architecture/draw.mjs','ui/components.mjs','elements/h1-motion.js','runtime/viewer.mjs']:
 s=read(f);s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s);parts.append(s)
bundle='(()=>{\n'+ '\n'.join(parts)+'\n})();'
(out/'bundle.js').write_text(bundle)
payload=''
needs_atlas=False
if a.offline:
 if not a.data:p.error('--offline requires --data')
 program="""import fs from 'node:fs';import {resolveMap} from './runtime/resolve-map.mjs';import {buildGeometry} from './runtime/geometry.mjs';
 const d=JSON.parse(fs.readFileSync(process.argv[1],'utf8')),p=resolveMap(d);
 console.log(JSON.stringify({template:p.mode==='template',assets:p.mode==='generated'?[...new Set(buildGeometry(p,p.indoor).furnishingInstances.map(i=>i.assetId).filter(Boolean))]:[]}));"""
 used=json.loads(subprocess.check_output(['node','--input-type=module','-e',program,str(Path(a.data).resolve())],cwd=R,text=True))
 needs_atlas=used['template']
 cache={id:read('elements/'+assetfiles[id]) for id in used['assets']}
 payload+='<script type="application/json" id="qa-assets">'+json.dumps(cache,ensure_ascii=False).replace('<','\\u003c')+'</script>'
if a.embed_atlas or needs_atlas:
 payload+='<script type="application/json" id="qa-spatial">'+literal('runtime/template-spatial.json').replace('<','\\u003c')+'</script>'
 import atlas
 _,data=atlas.load(R/'index.html');payload+='<script type="application/json" id="qa-atlas">'+json.dumps(data,ensure_ascii=False).replace('<','\\u003c')+'</script>'
if a.data:payload+='<script type="application/json" id="MAP_DATA">'+json.dumps(json.loads(Path(a.data).read_text()),ensure_ascii=False).replace('<','\\u003c')+'</script>'
html='<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP · Test template</title><body>'+payload+('<script data-debug="true">' if a.debug else '<script>')+bundle.replace('</script','<\\/script')+'</script></body></html>'
(out/'preview.html').write_text(html)
print(out/'preview.html')
