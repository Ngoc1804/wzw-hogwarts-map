"""Curate reusable assets: remove review UI, merge paint variants, limit vegetation."""
import copy, hashlib, json, math, re
import numpy as np
from lxml import etree as E
from svgpathtools import parse_path
from svgpathtools.path import transform
from svgpathtools.parser import parse_transform

def local(n):return E.QName(n).localname
def children_geometry(node, matrix=None, ids=None, visited=None):
    matrix=np.eye(3) if matrix is None else matrix
    matrix=matrix@parse_transform(node.get('transform',''))
    t=local(node);p=None
    def f(k,d=0):return float(node.get(k,d))
    if t in ('defs','style','title','desc','text','clipPath','pattern','filter'):return []
    if t=='use':
        ref=node.get('href',node.get('{http://www.w3.org/1999/xlink}href','')).lstrip('#')
        if ref in (ids or {}) and ref not in (visited or set()):
            return children_geometry(ids[ref],matrix@parse_transform(f'translate({f("x")} {f("y")})'),ids,(visited or set())|{ref})
        return []
    if t=='path':
        try:p=parse_path(node.get('d',''))
        except Exception:return []
    elif t=='rect':
        x,y,w,h=f('x'),f('y'),f('width'),f('height');rx=min(f('rx'),w/2);ry=min(f('ry',rx),h/2)
        if rx and ry:p=parse_path(f'M{x+rx} {y}H{x+w-rx}Q{x+w} {y} {x+w} {y+ry}V{y+h-ry}Q{x+w} {y+h} {x+w-rx} {y+h}H{x+rx}Q{x} {y+h} {x} {y+h-ry}V{y+ry}Q{x} {y} {x+rx} {y}Z')
        else:p=parse_path(f'M{x} {y}h{w}v{h}h{-w}Z')
    elif t in ('circle','ellipse'):
        x,y=f('cx'),f('cy');rx=f('r') if t=='circle' else f('rx');ry=rx if t=='circle' else f('ry')
        if rx>0 and ry>0:p=parse_path(f'M{x-rx} {y}a{rx} {ry} 0 1 0 {rx*2} 0a{rx} {ry} 0 1 0 {-rx*2} 0')
    elif t=='line':p=parse_path(f'M{f("x1")} {f("y1")}L{f("x2")} {f("y2")}')
    elif t in ('polyline','polygon'):
        v=re.findall(r'[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?',node.get('points',''))
        if len(v)>3:p=parse_path('M'+' '.join(v[:2])+'L'+' '.join(v[2:])+('Z' if t=='polygon' else ''))
    if p is not None and len(p):
        try:return [transform(p,matrix)]
        except Exception:return []
    result=[]
    for c in node:result+=children_geometry(c,matrix,ids,visited)
    return result

def signature(node,ids):
    paths=children_geometry(node,ids=ids)
    if not paths:return None
    boxes=[p.bbox() for p in paths];x=min(b[0] for b in boxes);y=min(b[2] for b in boxes)
    w=max(b[1] for b in boxes)-x;h=max(b[3] for b in boxes)-y;scale=max(w,h,1)
    atoms=[]
    for p in paths:
        s=p.translated(-complex(x,y)).scaled(1/scale).d()
        s=re.sub(r'[-+]?(?:\d*\.\d+|\d+\.?\d*)(?:[eE][-+]?\d+)?',lambda m:f'{float(m[0]):.4f}',s)
        atoms.append(s)
    return hashlib.sha256(json.dumps(atoms).encode()).hexdigest()

