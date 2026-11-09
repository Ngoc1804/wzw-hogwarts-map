"""Normalize user-supplied atlas without inferring floor plans from overview artwork."""
import json,unicodedata,re,hashlib
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def norm(s):return re.sub(r'[^a-z0-9]+','-',unicodedata.normalize('NFKD',s.lower().replace('đ','d')).encode('ascii','ignore').decode()).strip('-')
src=json.loads((R/'maps/sources/atlas-review.json').read_text());world=json.loads((R/'maps/world-atlas.json').read_text());reg=json.loads((R/'runtime/templates.json').read_text())
rows={};merged=[]
aliases={'phong-sinh-hoat-chung-gryffindor':'gryffindor-common-room','phong-sinh-hoat-chung-slytherin':'slytherin-common-room','phong-sinh-hoat-chung-hufflepuff':'hufflepuff-common-room','phong-sinh-hoat-chung-ravenclaw':'ravenclaw-common-room','dai-sanh':'great-hall','dai-sanh-great-hall':'great-hall','tien-sanh':'entrance-hall','tien-sanh-entrance-hall':'entrance-hall','ga-hogsmeade':'hogsmeade-station','lieu-roi-va-bai-dat-quanh-cay':'willow'}
known={norm(p['name']):p['id'] for sec in world['sections'] for p in sec['places']};known.update(aliases)
for sec in world['sections']:
 for p in sec['places']:
  rows[p['id']]={**p,'aliases':[],'paths':[sec['name']],'templateCandidates':[],'bindings':{},'source':'approved-template'}
for id,row in rows.items():
 for tid,t in reg['templates'].items():
  if id in t['targets']:row['bindings'][tid]=t['targets'][id]
def add(name,path,candidate=None,id=None):
 key=known.get(norm(name)) or id or 'place-'+hashlib.sha256(('/'.join(path)+'/'+norm(name)).encode()).hexdigest()[:16]
 if key not in rows:rows[key]={'id':key,'name':name,'aliases':[],'paths':[],'templateCandidates':[],'bindings':{},'source':'user-review-unverified-canon'}
 row=rows[key]
 if path not in row['paths']:
  if row['paths']:merged.append({'id':key,'name':name,'path':path})
  row['paths'].append(path)
 if name!=row['name'] and name not in row['aliases']:row['aliases'].append(name)
 if candidate and candidate not in row['templateCandidates']:row['templateCandidates'].append(candidate)
for t in src['templates']:
 for name in t['locations']:add(name,['template',t['id']],t['id'])
for area in src['world']['areas']:
 for name in area['places']:add(name,area['path'])
for area in src['world']['au_maps']:
 for f in area['floors']:
  for name in f['places']:add(name,[area['area'],area['name'],f['floor']])
for f in src['hogwarts_castle']['floors']:
 for c in f['clusters']:
  for p in c['rooms']:add(p['name'],['Hogwarts',f['floor'],c['direction'],c['name']],id=p['id'])
for row in rows.values():row['decision']='template-if-bound' if row['bindings'] else 'recipe-required';row['note']='Overview membership does not prove an interior floor plan. A template candidate without a binding cannot be mounted automatically.'
out={'schemaVersion':'1.0.0','places':list(rows.values()),'mergedReferences':merged,'policy':'Exact IDs and scoped aliases only. User-supplied floor/direction assignments are design input, not independently verified canon. No inferred adjacency.'}
(R/'maps/decision-atlas.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
lines=['# Atlas: template hoặc dựng mới','',f"{len(rows)} địa điểm; {len(merged)} tham chiếu lặp được hợp nhất.",'','Tên giống nhau tại hai nhà/tầng khác nhau vẫn có ID riêng. Các quan hệ và tầng do file duyệt cung cấp chưa được xác minh canon độc lập.','', '| ID | Địa điểm | Binding có thật | Template đề xuất chưa có binding |','|---|---|---|---|']
for r in rows.values():lines.append('| '+r['id']+' | '+r['name']+' | '+', '.join(r['bindings'])+' | '+', '.join(t for t in r['templateCandidates'] if t not in r['bindings'])+' |')
(R/'docs/ATLAS_DECISIONS.md').write_text('\n'.join(lines)+'\n');print(len(rows),'places;',len(merged),'merged references')
