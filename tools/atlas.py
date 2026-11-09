#!/usr/bin/env python3
"""Inspect/edit the canonical standalone atlas; Python standard library only."""
import argparse
import base64
import collections
import gzip
import hashlib
import json
from pathlib import Path
import re
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
DATA = re.compile(r'(<script id="map-data"[^>]*>)(.*?)(</script>)', re.S)


def load(file):
    html = file.read_text(encoding='utf-8')
    match = DATA.search(html)
    if not match:
        raise ValueError('Missing #map-data payload')
    data = json.loads(gzip.decompress(base64.b64decode(match[2], validate=True)))
    return html, data


def refs(text):
    out = set(re.findall(r'url\([\"\']?#([^\)\"\']+)', text))
    out.update(re.findall(r'(?:href|xlink:href)=[\"\']#([^\"\']+)', text))
    return out


def check_svg(text, shared=None):
    root = ET.fromstring(text)
    if root.tag != '{'+NS+'}svg':
        raise ValueError('Expected SVG namespace on the root element')
    ids = [e.get('id') for e in root.iter() if e.get('id')]
    duplicates = [id for id,n in collections.Counter(ids).items() if n > 1]
    missing = refs(text)-set(ids)-set(shared or {})
    if duplicates or missing:
        raise ValueError(f'Duplicate IDs: {duplicates}; missing references: {sorted(missing)}')
    if re.search(r'\b(?:NaN|Infinity)\b', text):
        raise ValueError('Invalid SVG geometry')
    if any('data-live-effect' in e.attrib or 'data-motion-tick' in e.attrib for e in root.iter()):
        raise ValueError('Use extracted source SVG, not a captured animation frame')
    return root


def validate(data):
    used=set()
    for key,m in data['maps'].items():
        try:
            check_svg(m['svg'], data['vectors'])
        except ValueError as e:
            raise ValueError(f'{key}: {e}') from e
        used.update(refs(m['svg']))
    extra=set(data['vectors'])-used
    if extra:
        raise ValueError(f'Unused shared vectors: {sorted(extra)}')
    return {'maps':len(data['maps']), 'sharedVectors':len(data['vectors']), 'references':'valid'}


def save(file, html, data):
    validate(data)
    raw=json.dumps(data,ensure_ascii=False,separators=(',',':')).encode()
    blob=base64.b64encode(gzip.compress(raw,compresslevel=9,mtime=0)).decode()
    final=DATA.sub(lambda m:m[1]+blob+m[3],html,count=1)
    temporary=file.with_name(file.name+'.tmp')
    temporary.write_text(final,encoding='utf-8')
    temporary.replace(file)


def metadata(data):
    rows=[]
    for key,m in data['maps'].items():
        root=ET.fromstring(m['svg'])
        row={'id':key,'title':m['title'],'svgBytes':len(m['svg'].encode()),
             'bounds':m.get('bounds'),'reading':m.get('reading'),
             'interactiveIds':list(dict.fromkeys(e.get('data-id') for e in root.iter() if e.get('data-id'))),
             'extract':f'python tools/atlas.py extract {key}',
             'payloadPointer':f'#map-data / maps.{key}.svg'}
        if key=='h1':
            row.update({'animation':'inline mountH1Motion; reference elements/h1-motion.js',
                        'shadingTemplate':'templates/h1/shading.svg',
                        'shadingTokens':'templates/h1/shading-tokens.json',
                        'hooks':['#camera','#h1-terrain-washes','#h1-ground-shadows','#h1-land-only',
                                 '[data-id^="village-house-"]','[data-lake-outline]','.cloth','.ancient-canopy']})
        rows.append(row)
    return rows


def refresh(file, html, data):
    root=file.parent
    (root/'maps').mkdir(exist_ok=True)
    catalog={'schemaVersion':'1.0.0','canonicalAtlas':'index.html','mapCount':len(data['maps']),
             'h2Included':'h2' in data['maps'],'maps':metadata(data)}
    (root/'maps/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
    tracked=['index.html','maps/catalog.json','templates/h1/shading.svg','templates/h1/shading-tokens.json','tools/build_ministry.py']
    files={name:{'bytes':(root/name).stat().st_size,'sha256':hashlib.sha256((root/name).read_bytes()).hexdigest()}
           for name in tracked if (root/name).exists()}
    (root/'docs').mkdir(exist_ok=True)
    manifest={'schemaVersion':'1.0.0','branch':'demo-1','canonicalAtlas':'index.html',
              'revisionLabel':'ministry-8-10-approved' if 'ministry-8-10' in data['maps'] else 'h2-grounds-final','mapCount':len(data['maps']),'files':files}
    (root/'docs/release.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    return manifest


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--atlas',type=Path,default=ROOT/'index.html')
    sub=parser.add_subparsers(dest='command',required=True)
    sub.add_parser('inspect');sub.add_parser('validate');sub.add_parser('refresh')
    ex=sub.add_parser('extract');ex.add_argument('map');ex.add_argument('--out',type=Path);ex.add_argument('--standalone',action='store_true')
    ap=sub.add_parser('apply');ap.add_argument('map');ap.add_argument('--svg',type=Path,required=True)
    args=parser.parse_args();file=args.atlas.resolve();html,data=load(file)
    if args.command in ('extract','apply') and args.map not in data['maps']:
        raise ValueError('Unknown map: '+args.map)
    if args.command=='inspect':
        print(json.dumps(metadata(data),ensure_ascii=False,indent=2))
    elif args.command=='validate':
        report=validate(data)
        manifest=file.parent/'docs/release.json'
        if manifest.exists():
            for name,expected in json.loads(manifest.read_text())['files'].items():
                f=file.parent/name
                if not f.exists() or hashlib.sha256(f.read_bytes()).hexdigest()!=expected['sha256']:
                    raise ValueError('Manifest is stale: '+name+'; run refresh')
        print(json.dumps(report))
    elif args.command=='refresh':
        validate(data);print(json.dumps(refresh(file,html,data),ensure_ascii=False))
    elif args.command=='extract':
        text=data['maps'][args.map]['svg']
        if args.standalone:
            root=ET.fromstring(text);defs=ET.Element('{'+NS+'}defs',{'data-atlas-shared':'true'})
            for id in sorted(refs(text)&set(data['vectors'])):defs.append(ET.fromstring(data['vectors'][id]))
            root.insert(0,defs);text=ET.tostring(root,encoding='unicode')
        out=args.out or file.parent/'.atlas-work'/(args.map+('.preview' if args.standalone else '')+'.svg')
        out.parent.mkdir(parents=True,exist_ok=True);out.write_text(text,encoding='utf-8');print(out)
    else:
        text=args.svg.read_text(encoding='utf-8')
        if 'data-atlas-shared' in text:
            raise ValueError('Preview SVG contains injected definitions. Apply the raw extract instead.')
        check_svg(text,data['vectors']);data['maps'][args.map]['svg']=text
        used=set().union(*(refs(m['svg']) for m in data['maps'].values()))
        data['vectors']={k:v for k,v in data['vectors'].items() if k in used}
        save(file,html,data);refresh(file,html,data)
        print(json.dumps({'updatedMap':args.map,'atlasBytes':file.stat().st_size}))


if __name__=='__main__':
    try:main()
    except (ValueError,KeyError,ET.ParseError) as e:
        print(str(e),file=sys.stderr);sys.exit(1)

