import sys,xml.etree.ElementTree as E
import atlas
from playwright.sync_api import sync_playwright
h,p=atlas.load(atlas.ROOT/'index.html');r=E.fromstring(p['maps']['diagon-knockturn']['svg']);lookup={n.get('id'):n for n in r.iter() if n.get('id')};lookup.update({k:E.fromstring(v) for k,v in p['vectors'].items()});N=atlas.NS;count=0
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);page=b.new_page()
 for g in r.iter():
  roof=next((n for n in g if n.get('data-part')=='roof-front-connected'),None)
  if roof is None or any(n.get('data-join')=='chimney-extension' for n in g):continue
  standalone=E.Element('{'+N+'}svg');defs=E.SubElement(standalone,'{'+N+'}defs')
  import copy
  needed=atlas.refs(E.tostring(g,encoding='unicode'));done=set()
  while needed-done:
   ref=sorted(needed-done)[0];v=lookup[ref];defs.append(copy.deepcopy(v));done.add(ref);needed.update(atlas.refs(E.tostring(v,encoding='unicode')))
  cloned=copy.deepcopy(g);standalone.append(cloned);page.set_content(E.tostring(standalone,encoding='unicode'))
  boxes=page.locator('body>svg>g').evaluate('''g=>[...g.children].map((n,i)=>{let b=n.getBBox();return {i,x:b.x,y:b.y,w:b.width,h:b.height}}).filter(b=>b.w>=5&&b.w<=25&&b.h>=15&&b.h<=100)''')
  for box in boxes:
   x=box['x']+box['w']/2;bottom=box['y']+box['h']
   hit=page.locator('body>svg>g [data-part="roof-front-connected"]').evaluate('''(n,x)=>{const m=n.getCTM(),inv=n.parentNode.getCTM().inverse(),mat=inv.multiply(m),bb=n.getBBox();for(let y=bb.y;y<bb.y+bb.height;y+=.3){let p=new DOMPoint(x,y);let q=new DOMPoint(x,y).matrixTransform(mat.inverse());if(n.isPointInFill(q))return y}return null}''',x)
   if hit is not None and 0<hit-bottom<35:
    E.SubElement(g,'{'+N+'}rect',{'x':str(box['x']),'y':str(bottom-.5),'width':str(box['w']),'height':str(hit-bottom+2),'fill':'#b9a57b','stroke':'#8d7959','stroke-width':'.5','data-join':'chimney-extension'});count+=1
 b.close()
p['maps']['diagon-knockturn']['svg']=E.tostring(r,encoding='unicode');atlas.save(atlas.ROOT/'index.html',h,p);print('Filled verified chimney gaps:',count)
