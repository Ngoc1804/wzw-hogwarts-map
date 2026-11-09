#!/usr/bin/env python3
"""Import verified metadata and missing template artwork; never regenerate atlas."""
import argparse, copy, hashlib, json, re, sys
from pathlib import Path
import xml.etree.ElementTree as ET
import atlas
NS=atlas.NS
ROOT=atlas.ROOT

def geometry(svg):
    root=ET.fromstring(svg)
    keys={'d','points','x','y','x1','x2','y1','y2','cx','cy','r','rx','ry','width','height','transform','viewBox'}
    return [(n.tag,sorted((k,v) for k,v in n.attrib.items() if k in keys)) for n in root.iter() if n.tag.rsplit('}',1)[-1] not in ['metadata','title','desc']]

def run(v3):
    source=v3.read_text();old=json.loads(re.search(r'<script id="data"[^>]*>(.*?)</script>',source,re.S)[1])
    catalog=json.loads((ROOT/'elements/catalog.json').read_text());by={e['id']:e for e in catalog['elements']}
    _,payload=atlas.load(ROOT/'index.html')
    report={'sourceSha256':hashlib.sha256(v3.read_bytes()).hexdigest(),'v3Count':len(old),'v3MissingIds':[], 'metadataRestored':[], 'metadataNotTransferred':[], 'templateExtractions':[], 'emptyTemplateGroups':[], 'aliases':[], 'deduplication':'same geometry candidates require visual review; no color-only variants imported'}
    for item in old:
        if item['id'] not in by and item['id'] not in catalog['aliases']:
            raise ValueError('Unexpected missing V3 ID: '+item['id'])
        current=by[catalog['aliases'].get(item['id'],item['id'])];text=(ROOT/'elements'/current['file']).read_text()
        if geometry(text)==geometry(item['svg']):
            fields=[]
            for key in ['occupancy','surface']:
                if key in item and item[key] and not current.get(key):current[key]=item[key];fields.append(key)
            report['metadataRestored'].append({'id':item['id'],'fields':[k for k in ['occupancy','surface'] if item.get(k)]})
        else:report['metadataNotTransferred'].append(item['id'])
    # Local Chromium measures the original approved SVG; uploaded scripts never run.
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox'])
        page=browser.new_page()
        for mid in ['village-static','diagon-knockturn']:
            text=payload['maps'][mid]['svg'];root=ET.fromstring(text)
            idnodes={n.get('id'):n for n in root.iter() if n.get('id')}
            idnodes.update({k:ET.fromstring(v) for k,v in payload['vectors'].items()})
            # Measured local coordinates before map placement transforms.
            for place in root.iter():
                pid=place.get('data-id')
                if not pid:continue
                art=next((n for n in place if 'engraved' in n.get('class','').split()),None)
                if art is None:continue
                # Existing Diagon storefronts already have canonical standalone assets.
                existing='frontage.'+pid
                if existing in by:
                    catalog['aliases'][f'template:{mid}/{pid}']=existing
                    report['aliases'].append({'source':f'{mid}/{pid}','assetId':existing});continue
                asset_id=f'building.{mid}.{pid}'
                if asset_id in by:
                    report['templateExtractions'].append({'source':f'{mid}/{pid}','assetId':asset_id});continue
                standalone=ET.Element('{'+NS+'}svg',{'viewBox':'0 0 256 256'})
                defs=ET.SubElement(standalone,'{'+NS+'}defs');needed=atlas.refs(ET.tostring(art,encoding='unicode'));done={n.get('id') for n in art.iter() if n.get('id')}
                while needed-done:
                    ident=sorted(needed-done)[0];done.add(ident)
                    if ident not in idnodes:raise ValueError('Missing def '+ident)
                    node=copy.deepcopy(idnodes[ident]);defs.append(node);done.update(n.get('id') for n in node.iter() if n.get('id'));needed.update(atlas.refs(ET.tostring(node,encoding='unicode')))
                for style in root.iter('{'+NS+'}style'):defs.append(copy.deepcopy(style))
                standalone.append(copy.deepcopy(art))
                page.set_content(ET.tostring(standalone,encoding='unicode'))
                bbox=page.locator('svg>g').evaluate('(e)=>{let b=e.getBBox();return [b.x,b.y,b.width,b.height]}')
                if not bbox[2] or not bbox[3]:
                    report['emptyTemplateGroups'].append(f'{mid}/{pid}');continue
                bounds=[round(bbox[0]-3,3),round(bbox[1]-3,3),round(bbox[2]+6,3),round(bbox[3]+6,3)]
                standalone.set('viewBox',' '.join(map(str,bounds)))
                title=ET.SubElement(standalone,'{'+NS+'}title');title.text=asset_id
                out=ET.tostring(standalone,encoding='unicode');atlas.check_svg(out)
                file='assets/'+asset_id+'.svg';(ROOT/'elements'/file).write_text(out+'\n')
                item={'id':asset_id,'name':pid,'category':'Nhà cửa · Template 2.5D','view':'elevation','viewBox':bounds,'file':file,'sourceStatus':'extracted-from-approved-template','source':{'mapId':mid,'interactiveId':pid,'atlasSha256':hashlib.sha256((ROOT/'index.html').read_bytes()).hexdigest()},'ports':[],'occupancy':{'type':'geometry-bbox','x':bbox[0],'y':bbox[1],'width':bbox[2],'height':bbox[3],'collisionReady':False},'tags':['2.5d','template-extract']}
                catalog['elements'].append(item);by[asset_id]=item
                catalog['aliases'][f'template:{mid}/{pid}']=asset_id
                report['templateExtractions'].append({'source':f'{mid}/{pid}','assetId':asset_id})
        browser.close()
    # Exact content duplicates are safe to alias. Different geometry is not deleted.
    seen={};retained=[]
    for item in catalog['elements']:
        file=ROOT/'elements'/item['file'];normalized=ET.fromstring(file.read_text());normalized.attrib.pop('id',None);normalized.attrib.pop('aria-label',None);finger=hashlib.sha256(ET.tostring(normalized)).hexdigest()
        if finger in seen:
            catalog['aliases'][item['id']]=seen[finger];file.unlink()
        else:seen[finger]=item['id'];retained.append(item)
    catalog['elements']=retained;report['finalCount']=len(retained)
    report['removedDuplicates']=[{'id':ident,'canonical':catalog['aliases'][ident]} for ident in ['house.porch','house.garden'] if ident in catalog['aliases']]
    (ROOT/'elements/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'elements/docs/asset-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({k:len(v) if isinstance(v,list) else v for k,v in report.items()},ensure_ascii=False))

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('v3',type=Path);run(parser.parse_args().v3)
