#!/usr/bin/env python3
"""Generate disposable, self-contained experiments outside the repository. Not RP state."""
import argparse,json,subprocess,copy,html
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--out',default='/tmp/wizamap-experiments');a=p.parse_args()
out=Path(a.out).resolve()
if out==ROOT or ROOT in out.parents:p.error('Keep generated test HTML outside the repository')
out.mkdir(parents=True,exist_ok=True)
base=json.loads((ROOT/'tools/contract-fixture.json').read_text())
scenes=[]
for key,title,fn,shape in [('library','Thư viện có đồ trên bàn','library','U'),('bedroom','Phòng ngủ','residential','L'),('classroom','Lớp học','classroom','rectangle'),('potions','Phòng Độc dược','potions','round')]:
 d=copy.deepcopy(base);d['view'].update(preferredMode='generated',spaceKind='interior',scopeId='experiment',templateId=None)
 d['meta']['areaName']='Cảnh kiểm thử';d['places'][0]['name']=title
 d['places'][0]['generation']={'function':fn,'shape':shape,'width':420,'depth':360,'floorMaterial':'wood' if key=='bedroom' else 'tile' if key=='potions' else 'stone','furnishings':[]}
 d['hints']=[];scenes.append((key,title,d))
d=copy.deepcopy(scenes[0][2]);d['places'][0]['name']='Phòng tùy biến';d['places'][0]['generation'].update(shape='rectangle',function='workshop',furnishings=[{'id':'desk','role':'Bàn nghiên cứu','assetId':'table.desk','count':1,'width':100,'depth':65,'color':'#698B82','placement':'wall-north'},{'role':'Sách','assetId':'accessory.book-open','count':2,'width':18,'depth':14,'on':'desk'},{'role':'Đài phép tự tạo','count':1,'width':55,'depth':55,'color':'#A46F93','custom':{'width':100,'height':100,'shapes':[{'type':'ellipse','cx':50,'cy':50,'rx':46,'ry':46,'fill':'#658A80'},{'type':'path','d':'M28 65L50 18L72 65Z','fill':'#D7B66B'}]}}]);scenes.append(('custom','Nội thất có sẵn và tự tạo',d))
d=copy.deepcopy(base);d['view'].update(preferredMode='template',templateId='h1');d['places'][0].update(atlasRef='hagrid',name='Chòi Hagrid');d['hints']=[]
for i in range(4):d['actors'].append({**copy.deepcopy(d['actors'][0]),'id':'npc-'+str(i),'name':'Khách '+str(i+1),'isPC':False})
scenes.append(('roof','NPC trong nhà, bảng tên trên mái',d))
for key,title,d in scenes:
 folder=out/key;folder.mkdir(exist_ok=True);data=folder/'input.json';data.write_text(json.dumps(d,ensure_ascii=False,indent=2))
 subprocess.run(['python',str(ROOT/'tools/build_runtime.py'),'--out',str(folder),'--data',str(data),'--offline','--debug'],check=True,cwd=ROOT)
links=''.join('<li><a href="'+key+'/preview.html">'+html.escape(title)+'</a></li>' for key,title,_ in scenes)
(out/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>WIZAMAP · Test thực nghiệm</title><style>body{font:18px Georgia;background:#eee4d1;color:#49362b;margin:40px}li{margin:18px}</style><h1>WIZAMAP · Test thực nghiệm</h1><p>Chọn cảnh. Thử zoom, bảng tên, tải HTML và mở lại khi offline. MAP_DATA cho phép sửa yêu cầu ngay trong Preview.</p><ul>'+links+'</ul>')
print(out/'index.html')
