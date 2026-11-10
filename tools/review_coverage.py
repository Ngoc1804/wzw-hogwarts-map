#!/usr/bin/env python3
"""Verify evidence for the 91-item review and reproduce its human-readable report."""
import argparse,hashlib,json,sys,xml.etree.ElementTree as ET
from pathlib import Path
import atlas
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args()
def read(f):return json.loads((R/f).read_text())
review=read('docs/coverage-review.json');index=read('runtime/atlas-index.json');registry=read('runtime/templates.json');coverage=read('docs/atlas-coverage.json');decision={p['id']:p for p in read('maps/decision-atlas.json')['places']}
assert hashlib.sha256((R/'index.html').read_bytes()).hexdigest()==review['artworkSha256'],'Artwork changed; review evidence must be rechecked'
_,art=atlas.load(R/'index.html');current={p['id']:p for p in coverage['entries']}
assert review['reviewed']==len(review['entries'])==91
assert len({p['id'] for p in review['entries']})==91
from collections import Counter
assert dict(Counter(p['disposition'] for p in review['entries']))==review['dispositions']
assert set(p['id'] for p in coverage['entries'] if p['status'].startswith('missing'))==set(p['id'] for p in review['entries'] if not p['disposition'].startswith('resolved-')),'Unresolved inventory is stale'
for entry in review['entries']:
 id=entry['id'];assert current[id]['name']==entry['name'];assert entry['reason'] and entry['nextAction']
 assert id not in index['lockedPlaceIds']+index['cccNonRoomPlaceIds'],'Review must not reopen locked places'
 if entry['disposition']=='resolved-binding':
  template=entry['templateId'];key=entry['atlasRef'];assert index['bindings'][id][template]==key
  assert decision[id]['verifiedBindings']==index['bindings'][id]
  nodes={e.get('data-id'):e for e in ET.fromstring(art['maps'][template]['svg']).iter() if e.get('data-id')}
  assert registry['templates'][template]['targets'][key]==[e['interactiveId'] for e in entry['evidence']]
  for e in entry['evidence']:
   n=nodes[e['interactiveId']];assert (n.get('aria-label') or ' '.join(n.itertext()).strip())==e['label']
  assert current[id]['status']=='template'
 elif entry['disposition']=='resolved-classification':
  assert index['placeFunctionById'][id]==decision[id]['function']==entry['effectiveFunction']
  assert current[id]['status']=='generated-indoor'
  assert any(g['key']==entry['evidence'][0]['groupKey'] and id in g['placeIds'] for g in index['groups'])
 else:assert current[id]['status'].startswith('missing')
labels={'resolved-binding':'Đã nối binding','resolved-classification':'Đã sửa phân loại indoor','needs-individual-room-metadata':'Thiếu metadata từng phòng','needs-aggregate-region-metadata':'Thiếu region tổng hợp','needs-canon-artwork-correspondence':'Cần đối chiếu canon ↔ artwork','needs-local-region-metadata':'Thiếu region cục bộ','needs-new-exterior-scene':'Cần cảnh/geometry mới'}
lines=['# Phần 4 — rà soát 91 mục thiếu binding/surface','',f"Nền: `{review['baselineCommit']}`. Artwork SHA-256: `{review['artworkSha256']}`.",'','Đã rà đủ 91 mục: nối 6 binding và sửa 1 phân loại indoor. Còn 84 mục cần metadata hoặc thiết kế; không có thay đổi artwork, ID canon, kết nối hoặc policy AU.','', '| Phân loại | Số mục |','|---|---:|']
for key,count in review['dispositions'].items():lines.append(f'| {labels[key]} | {count} |')
lines+=['','## Giới hạn và cách xử lý','','Binding là vị trí hiển thị, không chứng minh sàn để đứng. Actor vẫn cần semantic floor hoặc geometry/position đã xác minh. Chưa mở thêm sàn phía sau nhà; không lấy bbox mái làm sàn. Số template trong coverage là số địa điểm có binding, không phải số cảnh đã nghiệm thu đầy đủ.','','22 phòng Bộ Pháp thuật chưa có shape phòng được định danh: không gán từng phòng vào min-level-N. Hai mục cấp tầng cần region tổng hợp. Các tên sân/cầu canon chưa có tương ứng chắc chắn với Wyvern/Tầm gửi/Đón tiếp được giữ lại để đối chiếu.','','17 cảnh ngoài trời không có template hiện hành được ghi riêng; chưa triển khai renderer địa hình mới. Atlas nguồn giữ nguyên; chỉ override function điều trị St Mungo trong runtime với bằng chứng tầng bệnh viện.','','## Từng mục','','| ID / địa điểm | Kết quả | Bằng chứng hoặc phần thiếu | Bước tiếp theo |','|---|---|---|---|']
for e in review['entries']:
 evidence=e['reason']
 if e['disposition']=='resolved-binding':evidence+=f" `{e['templateId']} / {e['atlasRef']}` → "+', '.join('`'+v['interactiveId']+'`' for v in e['evidence'])
 lines.append('| '+' | '.join(v.replace('|','\\|').replace('\n',' ') for v in [f"`{e['id']}` · {e['name']}",labels[e['disposition']],evidence,e['nextAction']])+' |')
text='\n'.join(lines)+'\n';target=R/'docs/COVERAGE_REVIEW.md'
if args.check:assert target.read_text()==text,'Run python tools/review_coverage.py to refresh Markdown'
else:target.write_text(text)
print('PASS 91 reviewed records; 6 binding proofs; 1 indoor correction; 84 explicit remaining actions')
