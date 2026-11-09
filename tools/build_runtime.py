#!/usr/bin/env python3
"""Build the template-only browser bundle and a pinned AI Studio HTML shell."""
import argparse,json,re,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',required=True);p.add_argument('--ref');a=p.parse_args()
out=Path(a.out);out.mkdir(parents=True,exist_ok=True)
ref=a.ref or subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip()
if not re.fullmatch('[0-9a-f]{40}',ref):p.error('--ref must be a full commit SHA')
def read(f):return (R/f).read_text()
def literal(f):return json.dumps(json.loads(read(f)),ensure_ascii=False)
parts=['const schema='+literal('runtime/map-data.schema.json')+';', 'const TOKENS='+literal('ui/tokens.json')+';', 'const registry='+literal('runtime/templates.json')+';', 'const FURNITURE='+json.dumps({k:read('elements/assets/'+v+'.svg') for k,v in {'desk':'table.desk','table':'table.dining','chair':'seat.dining','bed':'bed.single','shelf':'storage.files','cabinet':'storage.cabinet'}.items()},ensure_ascii=False)+';', 'const SHELL='+json.dumps(read('ui/shell.html'))+';', 'const CSS='+json.dumps(read('ui/shell.css'))+';', 'const ATLAS_URL='+json.dumps(f'https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@{ref}/index.html')+';']
for f in ['runtime/map-data.mjs','runtime/resolve-map.mjs','runtime/geometry.mjs','ui/components.mjs','elements/h1-motion.js','runtime/viewer.mjs']:
 s=read(f);s=re.sub(r'^import .*?;\s*','',s,flags=re.M);s=re.sub(r'\bexport\s+','',s);parts.append(s)
bundle='(()=>{\n'+ '\n'.join(parts)+'\n})();'
(out/'bundle.js').write_text(bundle)
html='<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP · Test template</title><body><script>'+bundle.replace('</script','<\\/script')+'</script></body></html>'
(out/'preview.html').write_text(html)
print(out/'preview.html')
