#!/usr/bin/env python3
"""Build the approved stage-1 review; no atlas writes or runtime integration."""
from pathlib import Path
import argparse,base64,gzip,hashlib,json,re,xml.etree.ElementTree as E
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',type=Path,required=True);a=p.parse_args();a.out.mkdir(parents=True,exist_ok=True)
files=['elements/architecture/elements.mjs','runtime/architecture/recipes.mjs','runtime/architecture/walls.mjs','runtime/architecture/review.mjs']
code='\n'.join(re.sub(r'^import .*?;\s*','', (R/f).read_text(),flags=re.M) for f in files)
code=re.sub(r'^export \{.*?\};\s*','',code,flags=re.M).replace('export ','')
catalog=json.loads((R/'elements/catalog.json').read_text())['elements']
E.register_namespace('','http://www.w3.org/2000/svg');defs=[];meta={};omitted=0;used=[]
for e in catalog:
 ident=e['id']
 if repr(ident) not in code and json.dumps(ident) not in code:continue
 root=E.fromstring((R/'elements'/e['file']).read_text());occ=e['occupancy'];root.tag='{http://www.w3.org/2000/svg}symbol';root.set('id','a-'+ident);root.set('viewBox',' '.join(str(occ[k]) for k in ['x','y','width','height']));root.attrib.pop('width',None);root.attrib.pop('height',None);root.set('overflow','visible')
 # Keep wood gradients referenced via instance CSS plus closure of literal references.
 referenced={ident+'-wood'}
 for n in root.iter():
  for v in n.attrib.values():referenced.update(re.findall(r'url\(#([^)]*)\)',v))
 for d in list(root):
  if d.tag.endswith('}defs'):
   changed=True
   while changed:
    old=set(referenced)
    for n in d.iter():
     if n.get('id') in referenced:
      for v in E.tostring(n,encoding='unicode').split('url(#')[1:]:referenced.add(v.split(')')[0])
    changed=old!=referenced
   for n in list(d):
    if n.get('id') not in referenced:d.remove(n);omitted+=1
 defs.append(E.tostring(root,encoding='unicode'));meta[ident]={'bbox':occ,'surface':e.get('surface')};used.append(ident)
material=E.fromstring((R/'elements/architecture/materials.svg').read_text());defs=''.join(E.tostring(n,encoding='unicode') for n in material[0])+''.join(defs)
code+='\nmountArchitectureViewer('+json.dumps(meta,separators=(',',':'),ensure_ascii=False)+');'
payload=json.dumps({'defs':defs,'code':code},ensure_ascii=False,separators=(',',':')).encode();packed=gzip.compress(payload,compresslevel=9,mtime=0);encoded=base64.b64encode(packed).decode()
loader='''<script>
window.__ARCHITECTURE_HTML__='<!doctype html>'+document.documentElement.outerHTML;
(async()=>{try{const b=Uint8Array.from(atob('PACKED'),c=>c.charCodeAt(0));const text=await new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream('gzip'))).text();const p=JSON.parse(text);document.querySelector('#scene defs').innerHTML=p.defs;const s=document.createElement('script');s.textContent=p.code;document.body.append(s)}catch(e){document.querySelector('#detail').textContent='Không mở được bản dựng: '+e.message;throw e}})();
</script>'''.replace('PACKED',encoded)
shell=(R/'tools/architecture-review-shell.html').read_text().replace('<!-- PACK_DEFS -->','').replace('<!-- PACK_LOADER -->',loader)
output=a.out/'WIZAMAP_Indoor_Stage2.html';output.write_text(shell)
report={'stage':2,'purpose':'adjustable indoor formulas; outdoor and atlas integration deferred','sourceFiles':files,'assetIds':used,'assetCount':len(used),'removedUnusedGradientDefs':omitted,'payloadRawBytes':len(payload),'payloadGzipBytes':len(packed),'htmlBytes':output.stat().st_size,'htmlSha256':hashlib.sha256(output.read_bytes()).hexdigest(),'compression':'gzip level 9, deterministic mtime=0; shared SVG symbols; no external requests'}
(a.out/'architecture-build.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n');print(json.dumps(report,ensure_ascii=False))
