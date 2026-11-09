#!/usr/bin/env python3
"""Non-destructive functional audit and standalone HTML review. No SVG is rewritten."""
import argparse,base64,collections,gzip,hashlib,html,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
GROUPS={
 'Vạc thường / vạc lớn':('wizard.cauldron',['wizard.cauldron-large'],'Có thể dùng scale nếu hình và chi tiết được duyệt tương đương.'),
 'Lò sưởi trang trí':('wizard.fireplace-stone',['fixture.fireplace','wizard.fireplace-carved','wizard.fireplace-gothic'],'Đề xuất chung khung + decor. Giữ lò Floo riêng; bản mặt bằng là lựa chọn hybrid, không bắt buộc xóa.'),
 'Khung tranh':('decor.portrait',['object.portrait','decor.landscape','decor.portrait-wall'],'Chung khung + nội dung/nhóm tranh dạng preset; không đánh đồng tranh đơn và cụm tranh.'),
 'Gương':('decor.mirror',['object.mirror'],'Chọn hình đẹp phù hợp hybrid; chưa xác nhận hai bản cùng cấu trúc.'),
 'Rèm':('decor.curtain-tall',['extra.curtain','decor.curtain-partition','decor.curtain-bed'],'Khung rèm chung; vẫn giữ preset rèm giường/vách vì vị trí lắp khác nhau.'),
 'Đèn chùm':('decor.chandelier',['accessory.chandelier'],'Đối chiếu góc nhìn và độ chi tiết, không buộc dùng top view.'),
 'Thùng nước':('object.barrel',['extra.rainbarrel'],'Có thể chung thân thùng, giữ phần nắp/ống nước bằng decor.'),
 'Thảm chữ nhật':('object.rug',['decor.rug-runner'],'Có thể biến thể tỷ lệ/pattern; chưa thay ảnh bằng kéo giãn tự động.'),
 'Tủ trưng bày':('wizard.display',['storage.display'],'Chung chức năng trưng bày nhưng khác tạo hình; xem HTML trước khi chọn.'),
 'Tủ lưu trữ':('wizard.archive',['storage.files'],'Chỉ cân nhắc nếu hai loại đủ tương đương cho campaign.'),
 'Kính thiên văn / cụm thiên văn':('wizard.telescope',['cluster.astronomy'],'Ưu tiên giữ cụm làm preset tham chiếu đồ đơn, không tạo bản sao hình bên trong.'),
}

def build(out,image_base=None):
 c=json.loads((ROOT/'elements/catalog.json').read_text());by={e['id']:e for e in c['elements']};data={e['id']:(ROOT/'elements'/e['file']).read_bytes() for e in c['elements']}
 assignments={};families=[]
 for name,(base,others,note) in GROUPS.items():
  members=[base]+others
  for ident in members:assert ident in by;assert ident not in assignments;assignments[ident]=(name,base,note)
  families.append({'name':name,'canonicalProposal':base,'members':members,'note':note,'bytes':sum(len(data[i]) for i in members),'conditionalRemovedBytes':sum(len(data[i]) for i in others)})
 rows=[]
 for e in c['elements']:
  ident=e['id'];group=assignments.get(ident)
  if group:
   status='GIỮ MẪU ĐỀ XUẤT' if ident==group[1] else 'ĐỢI DUYỆT GỘP'
   reason=group[2];family=group[0]
  elif ident.startswith(('building.','frontage.','map.')):
   status='GIỮ / PRESET';family='Kiến trúc template';reason='Cùng chức năng nhà/tiệm không đồng nghĩa cùng hình. Giữ LOD, biển hiệu và cấu trúc đã duyệt; chưa chứng minh có thể thay bằng một mẫu.'
  else:
   status='GIỮ';family=e['category'];reason='Vai trò/hình khác; chưa có bằng chứng dư thừa. Bản top/front được phép cùng tồn tại trong hybrid.'
  rows.append({'id':ident,'name':e['name'],'category':e['category'],'view':e.get('view','template'),'family':family,'decision':status,'reason':reason,'bytes':len(data[ident]),'gzipBytes':len(gzip.compress(data[ident],mtime=0))})
 normalized=collections.defaultdict(list)
 import xml.etree.ElementTree as ET
 for ident,raw in data.items():
  node=ET.fromstring(raw);node.attrib.pop('id',None);node.attrib.pop('aria-label',None)
  normalized[hashlib.sha256(ET.tostring(node)).hexdigest()].append(ident)
 duplicates=[v for v in normalized.values() if len(v)>1]
 raw=sum(map(len,data.values()));bundle=b'\n'.join(data[i] for i in sorted(data));packed=len(gzip.compress(bundle,compresslevel=9,mtime=0));sumgzip=sum(len(gzip.compress(v,mtime=0)) for v in data.values());conditional=sum(f['conditionalRemovedBytes'] for f in families)
 report={'schemaVersion':'1.0.0','status':'review only; no asset removed or optimized','hybrid':'Rooms/walls/circulation use a floor plan. Furniture/decor may use top, front or 2.5D as appropriate.','assetCount':len(rows),'exactDuplicateGroups':duplicates,'decisionCounts':dict(collections.Counter(r['decision'] for r in rows)),'sizes':{'svgRawBytes':raw,'svgIndividualGzipBytes':sumgzip,'svgOneGzipBundleBytes':packed,'galleryHtmlBytes':(ROOT/'elements/index.html').stat().st_size,'galleryHtmlGzipBytes':len(gzip.compress((ROOT/'elements/index.html').read_bytes(),mtime=0)),'conditionalRawSavingsUpperBound':conditional,'conditionalRawRemainingLowerBound':raw-conditional},'sizeCaveats':['Measured gzip is an in-memory estimate, not an applied asset transformation.','One gzip bundle is a text-compression benchmark, not a working runtime package.','Conditional removals assume every merge candidate can be represented as a preset. This is not verified; actual saving will be smaller after adding presets/decor.','No approved map HTML or asset changed. Gallery already embeds gzip data.'],'families':families,'assets':rows}
 (ROOT/'elements/docs/functional-review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 fmt=lambda n:f'{n/1024:,.1f} KiB'
 lines=['# Rà soát 366 asset — chờ duyệt','',report['hybrid'],'','Không xóa hoặc nén lại file nguồn trong đợt này. Không bắt buộc decor chuyên dụng có bản mặt bằng.','','| Phép đo | Trước | Sau dự kiến / đo thử |','|---|---|',f'| SVG thô → mỗi SVG gzip riêng | {fmt(raw)} | {fmt(sumgzip)} |',f'| SVG thô → một luồng gzip thử trong RAM | {fmt(raw)} | {fmt(packed)} |',f'| HTML gallery → gzip HTTP giả lập | {fmt(report["sizes"]["galleryHtmlBytes"])} | {fmt(report["sizes"]["galleryHtmlGzipBytes"])} |',f'| Gộp tất cả ứng viên (trần lý thuyết, chưa gồm preset/decor) | {fmt(raw)} | ≥ {fmt(raw-conditional)} |','','Không cộng các con số tiết kiệm này: chúng thuộc các cách đóng gói khác nhau. Gzip HTTP không làm nhẹ file HTML lưu trên đĩa. Gallery đã nén payload nội bộ.','','## Giữ / gộp / bỏ','',f"- {len(duplicates)} nhóm trùng XML sau khi bỏ tên/ID root.",'- Chưa có mẫu nào được xác nhận bỏ trong 366 mẫu hiện tại.','- Mỗi ứng viên gộp phải duyệt hình trước; cùng chức năng chưa đủ để xóa.','','| Nhóm | Mẫu gốc đề xuất | Ứng viên thành preset | Trần giảm SVG thô |','|---|---|---|---|']
 for f in families:lines.append('| '+f['name']+' | `'+f['canonicalProposal']+'` | '+', '.join('`'+i+'`' for i in f['members'][1:])+' | '+fmt(f['conditionalRemovedBytes'])+' |')
 lines+=['','## Kiến trúc và các mẫu khác','', '- 63 hình nhà phố tách từ template, 38 mặt tiền, 21 biến thể map: giữ hình đã duyệt. Cần dựng hệ preset thân/mái/biển hiệu trước khi giảm số file, không xóa theo tên chức năng.','- Giường đơn/đôi/tầng/có màn; cửa đơn/đôi/vòm/sắt; tường thẳng/góc/T/cong; lò Floo và bảo vật đã chọn có khác biệt sử dụng, không gộp mù.','- Danh sách đủ 366 mẫu và quyết định từng mẫu: `functional-review.json`; HTML tải xuống hiển thị trực tiếp SVG hiện hành.']
 (ROOT/'elements/docs/FUNCTIONAL_REVIEW.md').write_text('\n'.join(lines)+'\n')
 # Uploaded artwork is not executed. Render current trusted SVG as image data URLs.
 cards=[]
 for r in rows:
  src=(image_base.rstrip('/')+'/'+by[r['id']]['file']) if image_base else 'data:image/svg+xml;base64,'+base64.b64encode(data[r['id']]).decode();esc=html.escape
  cards.append(f'<article data-decision="{esc(r["decision"])}"><img loading="lazy" src="{src}" alt="{esc(r["name"])}"><h3>{esc(r["name"])}</h3><code>{esc(r["id"])}</code><p><b>{esc(r["decision"])}</b> · {fmt(r["bytes"])}</p><p>{esc(r["reason"])}</p></article>')
 atlas=(ROOT/'docs/ATLAS.md').read_text()
 world=json.loads((ROOT/'maps/world-atlas.json').read_text())
 atlas_table='<table><thead><tr><th>Khu vực / tầng</th><th>Những phần bên trong</th></tr></thead><tbody>'+''.join('<tr><td>'+html.escape(section['name'])+'</td><td>'+html.escape('; '.join(p['name'] for p in section['places']))+'</td></tr>' for section in world['sections'])+'</tbody></table><p>'+html.escape(' '.join(world['notes']))+'</p>'
 page='''<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>WIZAMAP · Duyệt asset và atlas</title><style>body{margin:0;background:#eee4d1;color:#49362b;font:16px Georgia}header{background:#3b2925;color:#f2e5cd;padding:25px}main{padding:20px}nav{position:sticky;top:0;background:#e4d5b7;padding:12px;display:flex;gap:12px;flex-wrap:wrap}input,select,button{font:inherit;padding:8px}#grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}article{background:#fbf4e3;border:1px solid #baa585;padding:14px;overflow-wrap:anywhere}img{width:100%;height:205px;object-fit:contain;background:#f1e5ca}code{font-size:12px}p{line-height:1.5;font-size:14px}pre{white-space:pre-wrap;line-height:1.7}table{border-collapse:collapse;width:100%;margin:15px 0}td,th{border:1px solid #baa585;padding:12px;text-align:left;line-height:1.6}td:first-child{width:28%}[hidden]{display:none!important}</style><header><h1>WIZAMAP · Rà soát 366 asset</h1><p>Wizawi – Toà soạn Mộng Mị · Bản để duyệt; chưa xóa hoặc sửa hình. Hybrid: phòng dạng mặt bằng, đồ/decor linh hoạt.</p></header><nav><input id="q" placeholder="Tìm ID, tên, chức năng"><select id="decision"><option value="">Tất cả</option><option>ĐỢI DUYỆT GỘP</option><option>GIỮ MẪU ĐỀ XUẤT</option><option>GIỮ / PRESET</option><option>GIỮ</option></select><button id="atlasToggle">Ẩn/hiện atlas</button><span id="count"></span></nav><main><details><summary>Báo cáo dung lượng và nhóm đề xuất</summary><pre>'''+html.escape('\n'.join(lines))+'''</pre></details><section id="atlas"><h2>Atlas gọn: khu vực / tầng → phần bên trong</h2>'''+atlas_table+'''</section><section id="grid">'''+''.join(cards)+'''</section></main><script>const cards=[...document.querySelectorAll('article')];function filter(){let q=document.querySelector('#q').value.toLocaleLowerCase('vi'),v=document.querySelector('#decision').value,n=0;for(const c of cards){c.hidden=!(c.textContent.toLocaleLowerCase('vi').includes(q)&&(!v||c.dataset.decision===v));if(!c.hidden)n++}document.querySelector('#count').textContent=n+' / '+cards.length}document.querySelector('#q').oninput=filter;document.querySelector('#decision').onchange=filter;document.querySelector('#atlasToggle').onclick=()=>document.querySelector('#atlas').hidden=!document.querySelector('#atlas').hidden;filter();</script></html>'''
 if image_base:page=page.replace('Bản để duyệt; chưa xóa hoặc sửa hình.','Bản để duyệt; chưa xóa hoặc sửa hình. Ảnh từ jsDelivr cần Internet; không nhúng kho SVG lần nữa vào HTML.')
 out.write_text(page)
 print(json.dumps({k:report[k] for k in ['assetCount','decisionCounts','sizes']},ensure_ascii=False))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--html',type=Path,required=True);p.add_argument('--image-base');args=p.parse_args();build(args.html,args.image_base)
