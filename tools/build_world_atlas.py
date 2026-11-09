#!/usr/bin/env python3
"""Compile a compact place atlas; keep click targets in a separate technical index."""
import json,hashlib
from pathlib import Path
import atlas
ROOT=atlas.ROOT

def build():
    policy=json.loads((ROOT/'maps/atlas-policy.json').read_text());_,payload=atlas.load(ROOT/'index.html')
    raw={m['id']:m['interactiveIds'] for m in atlas.metadata(payload)}
    mapping={mid:{ident:None for ident in ids} for mid,ids in raw.items()};sections=[];ids=set()
    for section in policy['sections']:
        places=[]
        for place in section['places']:
            if place['id'] in ids:raise ValueError('Duplicate place '+place['id'])
            ids.add(place['id']);places.append({'id':place['id'],'name':place['name']})
            for view in place['views']:
                mid,ident=view.split('/',1)
                if mid not in mapping or ident not in mapping[mid]:raise ValueError('Unknown view '+view)
                if mapping[mid][ident] is not None:raise ValueError('View assigned twice '+view)
                mapping[mid][ident]=place['id']
        sections.append({'id':section['id'],'name':section['name'],'places':places})
    world={'schemaVersion':'2.0.0','owner':'Wizawi – Toà soạn Mộng Mị','scope':policy['scope'],'placeCount':len(ids),'sections':sections,'notes':policy['notes']}
    technical={'schemaVersion':'1.0.0','purpose':'Renderer mapping, not an atlas of places. null means technical/detail target omitted from semantic atlas.','atlasSha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest(),'targetCount':sum(map(len,raw.values())),'maps':mapping}
    (ROOT/'maps/world-atlas.json').write_text(json.dumps(world,ensure_ascii=False,separators=(',',':'))+'\n')
    (ROOT/'maps/interaction-index.json').write_text(json.dumps(technical,ensure_ascii=False,separators=(',',':'))+'\n')
    lines=['# Atlas WIZAMAP — khu vực / tầng và các phần bên trong','',f"{len(ids)} mục phòng/công trình/địa điểm; {technical['targetCount']} ID tương tác được giữ riêng cho renderer, không phải số địa điểm.",'','Không liệt kê từng tường, cửa, giường, bàn, vòng gôn, lò Floo hay điểm click. Khu nhà dân và phòng ngủ mẫu được gộp. Không tự thêm phòng chưa có nguồn.','','| Khu vực / tầng | Những phần bên trong |','|---|---|']
    for s in sections:lines.append('| '+s['name']+' | '+'; '.join(p['name'] for p in s['places'])+' |')
    lines+=['','## Giới hạn dữ liệu','']+['- '+n for n in policy['notes']]
    (ROOT/'docs/ATLAS.md').write_text('\n'.join(lines)+'\n')
    print(len(ids),'semantic places;',technical['targetCount'],'technical targets')
if __name__=='__main__':build()
