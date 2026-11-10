"""Compact static Gemini context derived from the reviewed decision atlas."""
from pathlib import Path
import argparse,json
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args()
d=json.loads((R/'maps/decision-atlas.json').read_text())
pack={'description':'Static lookup only, never RP state. Rows=[canonicalId,name,mode,verifiedBindings]. Missing bindings/surfaces are not repaired by guessing.','places':[[p['id'],p['name'],p['mode'],p['verifiedBindings']] for p in d['places']]}
text=json.dumps(pack,ensure_ascii=False,separators=(',',':'))+'\n';out=R/'maps/ai-lookup.json'
if args.check:assert out.read_text()==text,'Run python tools/build_ai_lookup.py'
else:out.write_text(text)
print('PASS Gemini lookup:',len(pack['places']),'canonical places')
