"""Build the single offline review sheet from current canonical scenery assets."""
import json,base64,html
from pathlib import Path
R=Path(__file__).resolve().parents[1];c=json.loads((R/'elements/catalog.json').read_text());cards=[]
for e in c['elements']:
 if not e['id'].startswith(('house.','tree.')):continue
 data=base64.b64encode((R/'elements'/e['file']).read_bytes()).decode();cards.append('<article><img src="data:image/svg+xml;base64,'+data+'"><p>'+html.escape(e['name'])+'</p></article>')
(R/'tools/scenery-review.html').write_text('<!doctype html><meta charset="utf-8"><title>WIZAMAP · Nhà và cây</title><style>body{background:#eee4d1;color:#49362b;font:16px Georgia;margin:20px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:15px}article{background:#faf2de;border:1px solid #baa585;padding:10px}img{width:100%;height:240px;object-fit:contain}</style><h1>Nhà gỗ · Nhà tường · Khung basic / Cây nét Quidditch</h1><p>9 base nhà; 9 cây cảnh quan và 2 cây đặc biệt. Màu và biển hiệu là thuộc tính instance.</p><main>'+''.join(cards)+'</main>')
