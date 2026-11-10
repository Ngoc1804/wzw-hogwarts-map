#!/usr/bin/env python3
"""Write a reviewable pending list from the new exhaustive coverage audit."""
import argparse,json,collections
from pathlib import Path
R=Path(__file__).resolve().parents[1]
a={p['id']:p for p in json.loads((R/'maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json').read_text())['places']}
r=json.loads((R/'docs/atlas-coverage.json').read_text());pending=[e for e in r['entries'] if e['status']=='missing-fixed-binding'];counts=collections.Counter(a[e['id']]['scopeId'] for e in pending)
lines=['# Demo 3 — các binding template còn thiếu','','Nguồn: atlas-approved-2.0; đây là danh sách mới, không phải 84 case cũ.','',f'Có **{len(pending)} địa điểm** thuộc template nhưng chưa có binding hình học được xác minh. Không gán vào template khác, không dùng mái/bbox làm sàn, không tính đã hoàn thành. Các vùng tạo mới cần nằm đúng artwork đã chốt; tên sân/cầu chưa đối chiếu không được đoán thành Wyvern/Mistletoe.','','| Template | Còn thiếu |','|---|---:|']
for k,n in sorted(counts.items()):lines.append(f'| {k[9:]} | {n} |')
lines+=['','Các binding cấp nhà/container đã có chỉ định vị đúng công trình, không khẳng định đã vẽ sàn riêng cho mọi phòng bên trong.','','| ID | Địa điểm | Template | Dòng nguồn |','|---|---|---|---:|']
for e in pending:
 p=a[e['id']];lines.append(f"| `{p['id']}` | {p['name']} | {p['scopeId'][9:]} | {p['sourceLine']} |")
lines+=['','Ngoài danh sách trên: **29 mục Bộ tầng 1–7** loại khỏi đợt chỉnh sàn/che khuất theo yêu cầu; **1 mục Ủy ban Đăng ký gốc Muggle** chờ xác nhận tầng theo chính atlas; **86 bản ghi thuộc 5 map AU khóa** được giữ khóa. Không tính những mục này là đã sửa.']
text='\n'.join(lines)+'\n';target=R/'docs/DEMO3_REMAINING_BINDINGS.md'
p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');args=p.parse_args()
if args.check:
 if target.read_text()!=text:raise SystemExit('Pending template binding report is stale')
else:target.write_text(text)
print('PASS pending binding report matches exhaustive coverage')
