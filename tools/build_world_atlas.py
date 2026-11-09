#!/usr/bin/env python3
"""Export current map knowledge without treating illustration as book canon."""
import hashlib,json,xml.etree.ElementTree as ET
import atlas
ROOT=atlas.ROOT

def build():
    _,payload=atlas.load(ROOT/'index.html');maps=[];locations=[];links=[]
    for mid,m in payload['maps'].items():
        root=ET.fromstring(m['svg']);places={p['id']:p for p in m.get('places',[])};nodes={}
        for n in root.iter():
            if n.get('data-id'):nodes.setdefault(n.get('data-id'),n)
        maps.append({'id':mid,'name':m['title'],'layoutPolicy':'fixed','bounds':m.get('bounds'),'locations':[mid+'/'+i for i in nodes],'floorViews':m.get('floorViews',{}),'source':'index.html#map-data/maps.'+mid})
        for ident,node in nodes.items():
            p=places.get(ident,{});title=node.find('{'+atlas.NS+'}title');name=p.get('name') or node.get('aria-label') or (title.text if title is not None else None) or ident
            row={'id':mid+'/'+ident,'mapId':mid,'interactiveId':ident,'name':name,'area':p.get('area'),'kind':p.get('kind'),'description':p.get('desc',''),'architecture':p.get('arch',''),'source':{'type':'approved-template','pointer':f'maps.{mid}.places/{ident}','evidence':'illustration; book canon not independently verified'},'knowledgePolicy':'Runtime must filter by campaign knowledge before sending MAP_DATA','neighbors':[]}
            for axis in ['x','y']:
                if axis in p:row[axis]=p[axis]
            for other in p.get('connects',[]):
                if other in nodes:row['neighbors'].append(mid+'/'+other);links.append({'from':row['id'],'to':mid+'/'+other,'source':'explicit connects'})
            if p.get('links'):row['unresolvedNamedLinks']=p['links']
            if p.get('targetMap'):row['targetMap']=p['targetMap']
            if p.get('focus') is not None:row['floorFocus']=p['focus']
            locations.append(row)
    result={'schemaVersion':'1.0.0','owner':'Wizawi – Toà soạn Mộng Mị','atlasSha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest(),'scope':'complete index of current approved templates, not an exhaustive Harry Potter canon catalogue','maps':maps,'locations':locations,'connections':links,'rules':['Do not infer adjacency from drawing proximity','Same names on different maps are not automatically identical','Do not use schedules as proof of presence','Static architecture does not grant knowledge/access','Do not emit hidden state to browser'],'coverageGaps':['Detailed Hogwarts floors outside approved templates','Room-to-room graph not present in most templates','Cross-map identity resolution','Year and campaign visibility overlays','Canon citations for each spatial relation','Custom locations supplied by campaign']}
    (ROOT/'maps/world-atlas.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    lines=['# Atlas không gian WIZAMAP','',result['scope'],'','Dữ liệu tra cứu: `maps/world-atlas.json`. ID toàn cục là mapId/interactiveId; ID SVG không đổi. Không chứa NPC, quest hoặc state RP.','', '| Template | Địa điểm tương tác |','|---|---|']
    lines += [f"| {m['name']} (`{m['id']}`) | {len(m['locations'])} |" for m in maps]
    lines+=['','Quan hệ chỉ xuất khi có khai báo nguồn. `unresolvedNamedLinks` chưa phải tuyến di chuyển. `floorViews` là tọa độ hiển thị, không phải dữ liệu canon. Mô tả AU/ước lượng trong template được giữ nguyên, không nâng thành canon.','','## Phần cần nghiên cứu bổ sung','']+['- '+g for g in result['coverageGaps']]
    (ROOT/'docs/ATLAS.md').write_text('\n'.join(lines)+'\n')
    print(len(maps),'maps;',len(locations),'locations;',len(links),'explicit connections')

if __name__=='__main__':build()
