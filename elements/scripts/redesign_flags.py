from pathlib import Path
from lxml import etree as E,html
import json,re,copy,math
R=Path(__file__).resolve().parents[1];c=json.loads((R/'catalog.json').read_text());old={a['id']:a['svg'] for a in c['elements']};A={a['id']:a for a in c['elements']}
source={'gryffindor':'lorc-lion.svg','ravenclaw':'lorc-eagle-emblem.svg','hufflepuff':'caro-asercion-badger.svg','slytherin':'lorc-snake.svg'}
names=['gryffindor','ravenclaw','hufflepuff','slytherin','beauxbatons','durmstrang'];titles=['Gryffindor','Ravenclaw','Hufflepuff','Slytherin','Beauxbatons','Durmstrang'];palette=[('#6f1729','#cba451'),('#153d66','#b99362'),('#c4a448','#29251e'),('#174d3c','#c5d6c7'),('#548ba9','#ead196'),('#682b2b','#d3aa59')]
def path(d,fill='none',stroke=None,sw=1):return f'<path d="{d}" fill="{fill}"'+(f' stroke="{stroke}" stroke-width="{sw}"' if stroke else '')+'/>'
def star(x,y,r):return path('M'+' '.join(f'{x+math.sin(i*math.pi/5)*(r if i%2==0 else r*.42):.2f},{y-math.cos(i*math.pi/5)*(r if i%2==0 else r*.42):.2f}' for i in range(10))+'Z','currentColor')
def icon(key):
 if key in source:
  r=E.parse(str(R/'references/heraldry'/source[key])).getroot();s=''.join(E.tostring(n,encoding='unicode') for n in list(r)[1:]);s=s.replace('#fff','currentColor');return f'<g transform="translate(63 70) scale(.254)" stroke="none">{s}</g>'
 if key=='beauxbatons':
  return path('M89 177Q125 128 167 85M167 177Q130 130 89 85','none','currentColor',4)+path('M91 166L100 171M156 166L165 171','none','#fff0bd',1)+''.join(star(x,y,5) for x,y in [(72,66),(92,52),(108,68),(148,68),(165,52),(184,66)])+path('M88 80Q62 57 80 35M169 80Q198 57 177 35','none','currentColor',1.1)
 # two independently curved heads and layered feathered wings
 wings=''
 for side in [-1,1]:
  for i in range(7):
   x=128+side*(24+i*8);y=104+i*4
   wings+=path(f'M{128+side*13} 130Q{x} 128 {128+side*70} {77+i*11}Q{128+side*77} {119+i*8} {128+side*(30+i*3)} 160Z','currentColor')
 heads=path('M112 122Q100 110 108 90Q109 78 94 76L85 84L89 69Q104 61 117 74L128 87L139 74Q152 61 167 69L171 84L162 76Q147 78 148 90Q156 110 144 122L149 161L128 188L107 161Z','currentColor')
 return wings+heads+path('M110 92Q128 121 146 92M117 151L128 165L139 151','none','#633629',2)+path('M114 176L98 195M142 176L158 195','none','currentColor',4)+star(128,53,10)
def defs(k,bg,gold):return f'''<defs><linearGradient id="{k}-cloth"><stop stop-color="{bg}"/><stop offset=".22" stop-color="{bg}"/><stop offset=".43" stop-color="#ffffff" stop-opacity=".16"/><stop offset=".58" stop-color="{bg}"/><stop offset=".82" stop-color="#0c141a" stop-opacity=".45"/><stop offset="1" stop-color="{bg}"/></linearGradient><linearGradient id="{k}-gold" x2=".8" y2="1"><stop stop-color="#fff0bf"/><stop offset=".4" stop-color="{gold}"/><stop offset=".62" stop-color="#96743b"/><stop offset="1" stop-color="{gold}"/></linearGradient><pattern id="{k}-weave" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 1h3M1 0v3" stroke="#fff" opacity=".04" stroke-width=".4"/></pattern></defs>'''
def crest(k,bg,gold):
 shield='M55 55Q128 31 201 55L195 131Q189 183 128 218Q67 183 61 131Z'
 flour=''
 for s in [-1,1]:
  flour+=path(f'M{128+s*76} 188Q{128+s*111} 153 {128+s*83} 128Q{128+s*69} 108 {128+s*95} 78M{128+s*88} 155q{26*s} -2 {16*s} -19M{128+s*83} 128q{-24*s} -13 {-13*s} -27','none',gold,1.5)
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">{defs(k,bg,gold)}{flour}'+path(shield,bg,gold,2.6)+path('M62 60Q128 40 194 60L188 131Q181 178 128 209Q75 178 68 131Z','none',gold,1)+path(shield,f'url(#{k}-weave)')+f'<g color="{gold}">{icon(k)}</g>'+path('M63 219Q128 202 193 219L183 237Q128 221 73 237Z',f'url(#{k}-gold)',gold,.6)+''.join(star(x,224,2) for x in [91,128,165])+'</svg>'
def flag(k,bg,gold):
 silhouette='M43 25Q128 30 213 25V224Q167 224 128 245Q89 224 43 224Z'
 cbody=crest(k,bg,gold);emblem=re.sub(r'^<svg[^>]*>|</svg>$','',cbody);emblem=re.sub(r'<defs>.*?</defs>','',emblem)
 # Feather/animal artwork is genuinely curved SVG, not a polygon approximation.
 return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">{defs(k,bg,gold)}'+path(silhouette,bg)+path(silhouette,f'url(#{k}-cloth)')+path(silhouette,f'url(#{k}-weave)')+path('M50 34Q128 39 206 34V216Q164 217 128 236Q92 217 50 216Z','none',gold,2)+path('M54 38Q128 43 202 38V212','none',gold,.6)+f'<g transform="translate(22 34) scale(.83)">{emblem}</g>'+path('M29 18Q128 23 227 18','none','#635035',5)+path('M29 16Q128 21 227 16','none',gold,3)+f'<circle cx="27" cy="17" r="4" fill="{gold}"/><circle cx="229" cy="17" r="4" fill="{gold}"/>'+''.join(path(f'M{x} {226+int((1-abs(128-x)/85)*16)}v6','none',gold,.8) for x in range(50,210,5))+path('M75 33Q69 122 77 213M183 32Q193 123 182 217','none','#fff',.2)+'</svg>'
flags=[]
for k,title,(bg,gold) in zip(names,titles,palette):
 a=A['crest.'+k];a['svg']=crest(k,bg,gold);a['attribution']='Adapted Game-icons: Lorc (lion/eagle/snake), Caro Asercion (badger), CC BY 3.0; custom heraldic setting.' if k in source else 'Original Beauxbatons/Durmstrang interpretation; book/film identity references.'
 (R/a['file']).write_text(a['svg']);f=copy.deepcopy(a);f.update(id='flag.'+k,name='Cờ thêu '+title,svg=flag(k,bg,gold),file='assets/flag.'+k+'.svg');c['elements'].append(f);flags.append(f);(R/f['file']).write_text(f['svg'])
# Patch complete HTML, preserving existing application and assets.
p=R/'index.html';s=p.read_text()
for k in names:s=s.replace(old['crest.'+k],A['crest.'+k]['svg'])
s=re.sub(r'(<script id="data" type="application/json">).*?(</script>)',lambda m:m[1]+json.dumps(c['elements'],ensure_ascii=False).replace('</','<\\/')+m[2],s,flags=re.S)
show='''<section style="padding:35px 5%;background:#192c28;color:#eee5ca"><small style="letter-spacing:3px;color:#bfa66d">HERALDRY / EMBROIDERED BANNERS / V3</small><h2 style="font:34px Georgia">Sáu cờ nhà & trường — thiết kế lại.</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px">'''
for a in flags:show+=f'<article style="text-align:center;background:#243a34;border:1px solid #746640;border-radius:8px;padding:20px"><div style="height:340px">{a["svg"].replace("<svg ","<svg style=\"width:100%;height:100%\" ",1)}</div><h3 style="font:23px Georgia">{a["name"]}</h3><button onclick="select(\'{a["id"]}\')" style="padding:9px;background:#d2bd85;border:0;border-radius:4px">Xem lớn / tải SVG</button></article>'
show+='</div><p style="font-size:11px;line-height:1.8;color:#bfc3ae">Linh vật được dựng lại từ vector Game-icons (Lorc, Caro Asercion), CC BY 3.0 — https://github.com/game-icons/icons. Đã đổi màu và ghép huy hiệu/vải cờ. Beauxbatons và Durmstrang là minh họa mới dựa trên nhận diện sách/phim, không phải bản sao logo chính thức.</p></section>'
s=s.replace('<div class="layout">',show+'<div class="layout">',1)
# Ensure new flags also work with normal catalog filters.
newcards=''.join(f'<article class="card" data-id="{a["id"]}"><button class="art" aria-label="{a["name"]}">{a["svg"]}</button><div class="caption"><small>front / {a["id"]}</small><h3>{a["name"]}</h3><span>CỜ THÊU · V3</span></div></article>' for a in flags)
s=s.replace('<div class="grid">','<div class="grid">'+newcards,1).replace('<b>239</b>','<b>245</b>').replace('<b>226</b>','<b>232</b>')
# Replace the old tiny six-crest scene with the actual full-length banners.
start=s.index('<summary>Khu cờ nhà và trường</summary>');end=s.index('</details>',start)
s=s[:start]+'<summary>Khu cờ nhà và trường</summary><div style="display:grid;grid-template-columns:repeat(3,1fr)">'+''.join(f['svg'] for f in flags)+'</div>'+s[end:]
s=s.replace('Các huy hiệu là minh họa giản lược dựng lại','Các huy hiệu được thiết kế lại với vector chi tiết')
p.write_text(s);(R/'catalog.json').write_text(json.dumps(c,ensure_ascii=False,indent=2))
(R/'flags.html').write_text('<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP · Six banners V3</title><body style="margin:0;background:#192c28">'+show.replace('onclick="select(', 'onclick="void(')+'</body></html>')
print('Updated 6 crests + 6 full banners; complete catalog',len(c['elements']))
