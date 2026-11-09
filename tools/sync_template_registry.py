"""Refresh runtime template bindings from current renderer indexes, never alter the atlas."""
from pathlib import Path
import json,hashlib
ROOT=Path(__file__).resolve().parents[1]
catalog=json.loads((ROOT/'maps/catalog.json').read_text());index=json.loads((ROOT/'maps/interaction-index.json').read_text());templates={}
for m in catalog['maps']:
    targets={}
    for interactive,entity in index['maps'][m['id']].items():
        if entity:targets.setdefault(entity,[]).append(interactive)
    templates[m['id']]={'mapId':m['id'],'targets':targets,'policy':'local-crop-required'}
result={'schemaVersion':'1.0.0','source':'maps/catalog.json + maps/interaction-index.json','sourceHashes':{p:hashlib.sha256((ROOT/p).read_bytes()).hexdigest() for p in ['maps/catalog.json','maps/interaction-index.json']},'templates':templates}
(ROOT/'runtime/templates.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Template adapters:',len(templates))
