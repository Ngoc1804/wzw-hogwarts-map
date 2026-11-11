#!/usr/bin/env python3
"""Compile only the approved canonical atlas; legacy IDs are migration aliases, not rooms."""
import argparse,hashlib,json
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def compile_index():
 a=json.loads((R/'maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json').read_text())
 source=(R/a['source']).read_bytes()
 if hashlib.sha256(source).hexdigest()!=a['sourceSha256']:raise ValueError('Approved source hash changed without atlas review')
 context=(R/a['contextSource']).read_bytes() if a.get('contextSource') else None
 if context is not None and hashlib.sha256(context).hexdigest()!=a['contextSourceSha256']:raise ValueError('W4 context hash changed without source alignment')
 places=a['places'];byid={p['id']:p for p in places};groups=a['groups'];keys={g['key'] for g in groups}
 if a['statistics']['places']!=len(places):raise ValueError('Stale atlas statistics')
 if len(byid)!=len(places) or len(keys)!=len(groups):raise ValueError('Duplicate canonical ID or scope')
 owners={};aliases={}
 for g in groups:
  for id in g['placeIds']:
   if id not in byid or id in owners:raise ValueError('Dangling or duplicate room owner: '+id)
   if byid[id]['scopeId']!=g['key']:raise ValueError('Room scope mismatch: '+id)
   owners[id]=g['key']
 if set(owners)!=set(byid):raise ValueError('Unowned canonical records')
 for p in places:
  for id in p.get('sourceIds',[]):
   if id in byid and id!=p['id']:raise ValueError('Alias shadows a real room: '+id)
   if id in aliases and aliases[id]!=p['id']:raise ValueError('Ambiguous ID alias: '+id)
   if id!=p['id']:aliases[id]=p['id']
  if p.get('parentId') and p['parentId'] not in byid:raise ValueError('Dangling parent')
 migration=json.loads((R/'maps/atlas-id-migration.json').read_text())
 for id,target in migration['idMap'].items():
  if target and id!=target:aliases[id]=target
 for r in a['references']:
  if r.get('targetScopeId') not in keys and r.get('targetPlaceId') not in byid:raise ValueError('Dangling arrow: '+str(r))
 registry=json.loads((R/'runtime/templates.json').read_text())['templates'];bindings={};templateOwners={}
 for p in places:
  if p['owner']=='TEMPLATE':templateOwners[p['id']]=p['templateCandidates']
  b=p.get('templateBinding')
  if b:
   if b['templateId'] not in templateOwners.get(p['id'],[]):raise ValueError('Binding belongs to wrong owner')
   if b['atlasRef'] not in registry[b['templateId']]['targets']:raise ValueError('Binding target missing')
   bindings[p['id']]={b['templateId']:b['atlasRef']}
 locked=[id for g in groups if g['kind']=='au' and not g['buildEnabled'] for id in g['placeIds']]
 return dict(contextVersion=a.get('contextVersion'),contextSource=a.get('contextSource'),contextSourceSha256=a.get('contextSourceSha256'),references=a['references'],contextAlignment=a.get('contextAlignment'),schemaVersion='scene-atlas-index-2',atlasVersion=a['schemaVersion'],sourceSha256=a['sourceSha256'],statistics=a['statistics'],aliases=aliases,bindings=bindings,groups=groups,lockedPlaceIds=locked,cccNonRoomPlaceIds=[],templateIds=list(registry),knownPlaceIds=list(byid),canonicalNameById={p['id']:p['name'] for p in places},placeNamesById={p['id']:list(dict.fromkeys([p['name']]+p.get('aliases',[]))) for p in places if p.get('aliases')},placeKindById={p['id']:p['kind'] for p in places},noGeneratePlaceIds=list(templateOwners),templateOwnerById=templateOwners,ownerById={p['id']:p['owner'] for p in places},scopeById=owners,retiredPlaceIds=[i for i,t in migration['idMap'].items() if t is None],placeFunctionById={p['id']:p['function'] for p in places},corridorPlaceIds=[p['id'] for p in places if p['kind']=='corridor'],bindingPolicy='Approved owner only; missing geometry is reported, never assigned from a different template')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args();target=R/'runtime/atlas-index.json';text=json.dumps(compile_index(),ensure_ascii=False,indent=2)+'\n'
 if args.check:
  if target.read_text()!=text:raise SystemExit('Runtime atlas index is stale')
 else:target.write_text(text)
 print('Atlas index compiled from approved source and W4 context')
