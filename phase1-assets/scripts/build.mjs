import {wizard} from './wizard.mjs';
import fs from 'node:fs';
import path from 'node:path';
import paper from 'paper';
import {optimize} from 'svgo';
import rough from 'roughjs/bundled/rough.cjs.js';
const ROOT=path.resolve(import.meta.dirname,'..');paper.setup(new paper.Size(256,256));
const P={wood:'#a98459',light:'#dcc7a2',dark:'#68503a',stone:'#c8c5ad',green:'#81946b',leaf:'#a6b58a',water:'#a8c7c0',roof:'#687e75',paper:'#f1e5cd'};
const rect=(x,y,w,h,fill=P.wood,rx=2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const line=(x1,y1,x2,y2)=>`<path d="M${x1} ${y1}L${x2} ${y2}" fill="none"/>`;
const d=(s,fill='none',extra='')=>`<path d="${s}" fill="${fill}" ${extra}/>`;
const circle=(x,y,r,fill=P.light)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const ellipse=(x,y,rx,ry,fill=P.light)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}"/>`;
const g=(s,t='')=>`<g transform="${t}">${s}</g>`;
const slats=(x,y,w,h,n=5)=>Array.from({length:n},(_,i)=>line(x+w*(i+1)/(n+1),y,x+w*(i+1)/(n+1),y+h)).join('');
const pane=(x,y,w=28,h=35)=>rect(x,y,w,h,P.water)+line(x+w/2,y,x+w/2,y+h)+line(x,y+h/2,x+w,y+h/2);
const handle=(x,y)=>line(x,y,x+12,y);
const assets=[];
function add(id,name,category,body,{view='top',tags=[],surface=null,ports=[]}={}){
 if(id==='plant.fern')body=g(body,'translate(128 128) scale(.66) translate(-128 -128)');
 let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><g stroke="${P.dark}" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round">${body}</g></svg>`;
 // Semantic paint slots remain editable after optimization.
 svg=svg.replaceAll(`fill="${P.wood}"`,`fill="${P.wood}" data-color-fill="base"`).replaceAll(`fill="${P.light}"`,`fill="${P.light}" data-color-fill="detail"`).replaceAll(`fill="${P.green}"`,`fill="${P.green}" data-color-fill="foliage"`).replaceAll(`fill="${P.roof}"`,`fill="${P.roof}" data-color-fill="roof"`);
 svg=optimize(svg,{plugins:[{name:'preset-default',params:{overrides:{cleanupIds:false,convertShapeToPath:false}}}]}).data;
 fs.writeFileSync(`${ROOT}/assets/${id}.svg`,svg);
 assets.push({id,name,category,view,tags,viewBox:[0,0,256,256],anchor:{x:128,y:128},size:{width:256,height:256,unit:'design-unit'},occupancy:{type:'design-envelope',x:16,y:16,width:224,height:224},surface,ports,colorSlots:{base:P.wood,detail:P.light,foliage:P.green,roof:P.roof},source:{type:'original-procedural',license:'CC0-1.0'},file:`assets/${id}.svg`,svg});
}
// A: furniture, top view. Objects are separated from their accessories.
for(const [id,name,w,h,arms,back] of [['dining','Ghế ăn',64,76,false,true],['stool','Ghế đẩu',56,56,false,false],['armchair','Ghế bành',105,110,true,true],['lounge','Ghế thư giãn',95,156,true,true],['bench','Ghế dài',185,55,false,true],['sofa','Sofa hai chỗ',190,102,true,true]]){
 let b=rect(128-w/2,128-h/2,w,h,P.wood,9)+rect(135-w/2,135-h/2,w-14,h-14,P.light,7);
 if(back)b+=rect(124-w/2,121-h/2,w+8,19,P.wood,5);
 if(arms)b+=rect(118-w/2,135-h/2,19,h-15)+rect(119+w/2,135-h/2,19,h-15);
 if(id==='sofa')b+=line(128,99,128,165);
 add('seat.'+id,name,'Nội thất · Ghế',b,{tags:['seating'],surface:{x:128-w/2,y:128-h/2,width:w,height:h}});
}
add('seat.corner','Sofa góc','Nội thất · Ghế',d('M42 57H214V124H113V206H42Z',P.wood)+d('M53 78H194V111H102V189H53Z',P.light)+line(106,78,106,111)+line(53,132,102,132));
for(const [id,name,w,h] of [['dining','Bàn ăn',180,90],['study','Bàn học',114,78],['desk','Bàn làm việc',158,94],['coffee','Bàn trà',125,65],['bedside','Bàn đầu giường',68,65],['prep','Bàn sơ chế',180,105],['long','Bàn dài ghép đoạn',210,65]]){
 const x=128-w/2,y=128-h/2;let b=rect(x,y,w,h,P.wood,5)+rect(x+7,y+7,w-14,h-14,'none',3)+slats(x+12,y+10,w-24,h-20,3);
 if(id==='desk'||id==='bedside')b+=rect(x+8,y+h-22,w-16,15,P.light)+handle(122,y+h-15);
 if(id==='prep')b+=rect(x+10,y+10,55,38,P.light)+line(x+9,y+h/2,x+w-9,y+h/2);
 add('table.'+id,name,'Nội thất · Bàn',b,{surface:{x:x+8,y:y+8,width:w-16,height:h-16},tags:['support-surface']});
}
add('table.round','Bàn tròn','Nội thất · Bàn',circle(128,128,82,P.wood)+circle(128,128,73,'none')+line(128,56,128,200),{surface:{cx:128,cy:128,r:68}});
add('table.oval','Bàn oval','Nội thất · Bàn',ellipse(128,128,100,58,P.wood)+ellipse(128,128,91,49,'none'),{surface:{cx:128,cy:128,rx:85,ry:43}});
for(const [id,name,w,h,rows,kind] of [['bookcase','Kệ sách',180,125,3,'books'],['double','Kệ sách hai mặt',190,160,4,'books'],['cabinet','Tủ hai cánh',125,170,1,'door'],['drawers','Tủ ngăn kéo',122,142,4,'drawer'],['files','Tủ hồ sơ',88,184,4,'drawer'],['display','Tủ trưng bày kính',155,150,3,'glass'],['open','Kệ mở',165,132,3,'open'],['wall','Kệ treo tường',190,45,1,'books'],['wine','Giá chai',130,145,3,'wine']]){
 let x=128-w/2,y=128-h/2,b=rect(x,y,w,h,P.wood)+rect(x+7,y+7,w-14,h-14,P.light);
 for(let j=0;j<rows;j++){let yy=y+9+j*(h-18)/rows; b+=line(x+7,yy+(h-18)/rows,x+w-7,yy+(h-18)/rows);if(kind==='books')for(let i=0;i<Math.floor(w/17);i++)b+=rect(x+11+i*16,yy+5,10,(h-18)/rows-10,i%2?P.wood:P.paper,0);if(kind==='drawer')b+=handle(122,yy+(h-18)/rows/2);if(kind==='glass')b+=pane(x+10,yy+3,w-20,(h-18)/rows-5);if(kind==='wine')for(let i=0;i<3;i++)b+=circle(x+25+i*38,yy+20,10,P.roof);}
 if(kind==='door')b+=line(128,y+8,128,y+h-8)+circle(119,128,2,P.dark)+circle(137,128,2,P.dark);
 add('storage.'+id,name,'Nội thất · Tủ kệ',b,{view:'front',tags:['storage']});
}
for(const [id,name,w,h,pillows]of [['single','Giường đơn',85,170,1],['double','Giường đôi',160,175,2],['canopy','Giường có màn',150,185,2]]){
 let x=128-w/2,y=128-h/2,b=rect(x-5,y-4,w+10,h+8)+rect(x,y,w,h,P.paper,6)+rect(x+5,y+45,w-10,h-52,P.light,5)+line(x+6,y+60,x+w-6,y+60);
 for(let i=0;i<pillows;i++)b+=rect(x+8+i*(w-16)/pillows,y+8,(w-23)/pillows,27,P.paper,7);
 if(id==='canopy')for(const xx of [x-8,x+w+8]){b+=circle(xx,y-5,5)+circle(xx,y+h+5,5)+d(`M${xx} ${y+4}q20 55 0 ${h-8}`,P.light);}
 add('bed.'+id,name,'Nội thất · Phòng ngủ',b);
}
add('bed.bunk','Giường tầng · mặt bên','Nội thất · Phòng ngủ',rect(48,55,7,150)+rect(202,55,7,150)+rect(54,65,148,32,P.light)+rect(54,148,148,32,P.light)+rect(155,80,8,125)+rect(185,80,8,125)+[105,130,155,180].map(y=>line(163,y,185,y)).join(''),{view:'side'});
add('bed.screen','Bình phong','Nội thất · Phòng ngủ',[0,1,2].map(i=>rect(42+i*57,56,54,142,P.light,8)+rect(47+i*57,63,44,125,'none',5)).join(''),{view:'front'});
for(const [id,name,kind] of [['fireplace','Lò sưởi đá','fire'],['stove','Bếp củi','stove'],['sink','Chậu rửa','sink'],['bathtub','Bồn tắm','bath'],['toilet','Toilet','toilet'],['range','Bếp nấu','range']]){
 let b='';if(kind==='fire')b=rect(45,55,166,140,P.stone)+rect(65,75,126,98,P.dark)+rect(36,48,184,18,P.light)+d('M86 165Q75 140 107 115Q102 145 126 124Q152 98 158 165Z','#c09259')+line(72,185,184,185);
 if(kind==='stove')b=rect(73,88,110,110,P.roof,10)+rect(88,105,80,65,P.dark)+rect(95,112,66,51,P.wood)+rect(119,35,18,53,P.roof)+circle(157,136,4);
 if(kind==='sink')b=rect(48,78,160,110,P.stone,10)+rect(62,90,132,84,P.water,20)+circle(128,143,6,P.dark)+d('M128 92V58Q154 40 154 70');
 if(kind==='bath')b=rect(58,30,140,196,P.light,50)+rect(70,44,116,168,P.water,42)+circle(128,63,7,P.dark)+d('M128 27V42');
 if(kind==='toilet')b=rect(84,45,88,42,P.stone,7)+ellipse(128,139,45,65,P.light)+ellipse(128,137,30,46,P.water)+circle(150,63,4,P.wood);
 if(kind==='range')b=rect(52,51,152,154,P.stone,6)+[86,170].map(x=>[91,163].map(y=>circle(x,y,22,P.dark)+circle(x,y,13,P.wood)).join('')).join('');
 add('fixture.'+id,name,'Nội thất · Bếp & vệ sinh',b,{view:kind==='fire'||kind==='stove'?'front':'top'});
}
for(const [id,name,b] of [
 ['counter','Quầy bán hàng',rect(35,83,186,95)+rect(42,91,172,17,P.light)+slats(44,115,168,53,4)],
 ['counter-corner','Quầy góc',d('M36 47H211V105H101V211H36Z',P.wood)+d('M47 62H195V90H86V194H47Z',P.light)],
 ['rug','Thảm chữ nhật',rect(45,63,166,130,P.light,0)+rect(55,73,146,110,'none',0)+d('M128 90L165 128L128 166L91 128Z',P.wood)],
 ['rug-round','Thảm tròn',circle(128,128,83,P.light)+circle(128,128,72,'none')+d('M128 76L180 128L128 180L76 128Z',P.wood)],
 ['mirror','Gương đứng',rect(82,32,92,180,P.wood,40)+rect(91,42,74,159,P.water,35)+line(100,170,148,70)],
 ['portrait','Khung tranh trống',rect(54,43,148,170)+rect(64,53,128,150,P.light)+rect(74,63,108,130,P.paper)],
 ['clock','Đồng hồ',circle(128,128,79,P.wood)+circle(128,128,67,P.paper)+line(128,128,128,82)+line(128,128,164,144)+[0,90,180,270].map(a=>g(line(128,67,128,77),`rotate(${a} 128 128)`)).join('')],
 ['chest','Rương gỗ',rect(49,80,158,100,P.wood,12)+line(49,110,207,110)+rect(73,80,12,100,P.dark)+rect(171,80,12,100,P.dark)+rect(119,102,18,30,P.light)],
 ['crate','Thùng gỗ',rect(65,65,126,126)+rect(73,73,110,110,'none')+line(73,73,183,183)+line(73,183,183,73)],
 ['barrel','Thùng tròn',ellipse(128,128,66,88,P.wood)+d('M81 65Q108 128 81 191M175 65Q148 128 175 191')+d('M66 100Q128 120 190 100M66 158Q128 138 190 158')],
 ['cart','Xe đẩy hàng',rect(65,62,126,130)+slats(72,69,112,116,5)+line(75,62,75,34)+line(181,62,181,34)+circle(60,165,12,P.dark)+circle(196,165,12,P.dark)],
 ['sack','Bao tải',d('M103 56Q128 67 153 56L149 85Q205 171 174 203Q128 222 82 203Q51 171 107 85Z',P.light)+line(102,83,154,83)],
 ['basket','Giỏ đan',ellipse(128,142,74,51,P.wood)+ellipse(128,132,67,38,P.light)+d('M65 123Q128 16 191 123')+slats(84,121,88,53,7)]
])add('object.'+id,name,'Nội thất · Đồ dùng',b,{view:'top'});
// Loose tabletop accessories.
for(const [id,name,b]of [
 ['book','Sách đóng',rect(83,54,90,145,P.roof,5)+rect(91,61,74,130,P.light)+line(98,62,98,190)],
 ['book-open','Sách mở',d('M35 70Q81 51 128 76Q175 51 221 70V192Q175 173 128 198Q81 173 35 192Z',P.paper)+line(128,76,128,198)+[99,119,139,159].map(y=>d(`M48 ${y}Q84 ${y-10} 114 ${y+4}M142 ${y+4}Q178 ${y-10} 208 ${y}`)).join('')],
 ['scroll','Cuộn giấy',rect(69,53,118,151,P.paper)+ellipse(69,128,14,76,P.light)+ellipse(187,128,14,76,P.light)],
 ['ink','Lọ mực & bút',rect(72,126,64,64,P.roof,12)+rect(85,111,38,18)+d('M139 143Q151 69 202 41Q197 104 139 143Z',P.light)+line(139,143,185,65)],
 ['mug','Cốc',circle(119,128,45,P.light)+circle(119,128,34,P.dark)+d('M162 108Q208 106 198 143Q184 163 163 145')],
 ['plate','Đĩa',circle(128,128,77,P.light)+circle(128,128,59,'none')],
 ['teapot','Ấm trà',circle(128,133,57,P.light)+circle(128,133,20,P.wood)+d('M75 117L35 94L51 154L77 153Z',P.light)+d('M178 104Q234 132 179 165')],
 ['pot','Nồi',circle(128,128,65,P.roof)+circle(128,128,52,P.dark)+rect(41,116,21,24)+rect(194,116,21,24)],
 ['pan','Chảo',circle(114,136,59,P.dark)+circle(114,136,48,P.roof)+rect(166,126,66,18)],
 ['bottle','Chai thủy tinh',d('M110 40H146V88Q172 109 172 143V203H84V143Q84 109 110 88Z',P.water)+rect(108,31,40,15,P.wood)+rect(95,136,66,40,P.paper)],
 ['candle','Nến',circle(128,154,44,P.wood)+circle(128,154,18,P.paper)+d('M128 132Q101 107 128 72Q155 107 128 132Z','#c79655')],
 ['lamp','Đèn bàn',circle(128,165,48,P.wood)+circle(128,165,12,P.dark)+d('M128 165V95M79 102L98 51H158L177 102Z',P.light)],
 ['chandelier','Đèn chùm',circle(128,128,57,'none')+[0,60,120,180,240,300].map(a=>g(line(128,128,128,62)+circle(128,62,12,P.light),`rotate(${a} 128 128)`)).join('')+circle(128,128,15,P.wood)]
])add('accessory.'+id,name,'Nội thất · Phụ kiện',b,{tags:['place-on-surface']});
// Architecture modules: local ports, bounded geometry, no labels embedded.
for(const [id,name,b,ports]of [
 ['wall','Tường đá thẳng',rect(24,99,208,58,P.stone)+[0,1,2].map(i=>line(24,114+i*15,232,114+i*15)).join('')+[0,1,2,3].map(i=>line(50+i*47,100,50+i*47,156)).join(''),[{id:'a',x:24,y:128},{id:'b',x:232,y:128}]],
 ['wall-corner','Góc tường',d('M35 35H91V165H221V221H35Z',P.stone)+d('M62 35V193H221'),[{id:'a',x:63,y:35},{id:'b',x:221,y:193}]],
 ['wall-t','Tường nhánh T',d('M24 70H232V122H154V232H102V122H24Z',P.stone),[{id:'a',x:24,y:96},{id:'b',x:232,y:96},{id:'c',x:128,y:232}]],
 ['wall-curve','Tường cong',d('M30 222A192 192 0 0 1 222 30V73A149 149 0 0 0 73 222Z',P.stone),[]],
 ['floor-stone','Sàn lát đá',rect(29,29,198,198,P.stone)+[0,1,2].map(i=>line(29,78+i*49,227,78+i*49)+line(78+i*49,29,78+i*49,227)).join(''),[]],
 ['floor-wood','Sàn gỗ',rect(29,29,198,198,P.wood)+slats(29,29,198,198,7)+[52,102,152,202].map((y,i)=>line(29+i%2*24,y,53+i%2*24,y)).join(''),[]],
 ['door','Cửa gỗ đơn',rect(69,29,118,198,P.light)+rect(79,39,98,178)+rect(89,49,78,69,'none')+rect(89,133,78,73,'none')+circle(163,126,4,P.dark),[]],
 ['door-double','Cửa đôi',rect(38,29,180,198,P.light)+rect(47,38,162,180)+line(128,38,128,218)+rect(57,51,61,151,'none')+rect(138,51,61,151,'none')+circle(117,133,4)+circle(139,133,4),[]],
 ['door-arch','Cửa vòm',d('M61 222V96A67 67 0 0 1 195 96V222Z',P.light)+d('M72 214V97A56 56 0 0 1 184 97V214Z',P.wood)+slats(83,101,90,110,4)+circle(169,149,4),[]],
 ['door-round','Cửa tròn',circle(128,128,91,P.light)+circle(128,128,80,P.wood)+slats(74,74,108,108,4)+circle(172,128,5),[]],
 ['door-iron','Cửa song sắt',rect(59,29,138,198,P.stone)+rect(69,39,118,178,P.roof)+slats(69,39,118,178,6)+line(69,128,187,128),[]],
 ['hatch','Cửa sập',rect(48,48,160,160,P.wood)+slats(56,56,144,144,5)+rect(46,65,164,13,P.dark)+rect(46,178,164,13,P.dark)+circle(167,128,10,'none'),[]],
 ['window','Cửa sổ ô nhỏ',rect(60,42,136,172,P.light)+pane(70,52,116,152)+line(70,102,186,102)+line(70,153,186,153),[]],
 ['window-arch','Cửa sổ vòm cao',d('M65 217V94A63 63 0 0 1 191 94V217Z',P.light)+d('M75 207V95A53 53 0 0 1 181 95V207Z',P.water)+line(128,44,128,206)+line(76,107,180,107)+line(76,158,180,158),[]],
 ['window-round','Cửa sổ tròn',circle(128,128,84,P.light)+circle(128,128,72,P.water)+line(56,128,200,128)+line(128,56,128,200),[]],
 ['window-shutters','Cửa sổ có chớp',pane(88,63,80,130)+rect(39,63,43,130)+rect(174,63,43,130)+Array.from({length:9},(_,i)=>line(43,74+i*13,78,74+i*13)+line(178,74+i*13,213,74+i*13)).join(''),[]],
 ['stairs','Cầu thang thẳng',rect(65,27,126,202,P.stone)+Array.from({length:10},(_,i)=>line(65,46+i*18,191,46+i*18)).join('')+d('M128 209V50M116 66L128 50L140 66'),[{id:'bottom',x:128,y:229},{id:'top',x:128,y:27}]],
 ['stairs-l','Cầu thang chữ L',d('M35 28H112V145H228V222H35Z',P.stone)+Array.from({length:5},(_,i)=>line(35,45+i*20,112,45+i*20)+line(130+i*19,145,130+i*19,222)).join(''),[]],
 ['stairs-spiral','Cầu thang xoắn',circle(128,128,97,P.stone)+Array.from({length:12},(_,i)=>g(line(128,128,128,31),`rotate(${i*30} 128 128)`)).join('')+circle(128,128,19,P.dark),[]],
 ['ladder','Thang gỗ',rect(80,27,12,202)+rect(164,27,12,202)+Array.from({length:8},(_,i)=>rect(92,43+i*23,72,7)).join(''),[]],
 ['column-round','Cột tròn',rect(75,40,106,17,P.light)+rect(87,57,82,143,P.stone)+slats(95,63,66,131,5)+rect(69,200,118,20,P.light),[]],
 ['column-square','Trụ vuông',rect(73,36,110,22,P.light)+rect(87,58,82,142,P.stone)+rect(73,200,110,22,P.light)+rect(95,68,66,121,'none'),[]],
 ['arch','Vòm cuốn',d('M38 226V100A90 90 0 0 1 218 100V226H183V102A55 55 0 0 0 73 102V226Z',P.stone)+[65,91,117,143,169].map(a=>g(line(128,14,128,47),`rotate(${a-117} 128 103)`)).join(''),[]],
 ['balustrade','Lan can',rect(24,75,208,12)+rect(24,178,208,12)+Array.from({length:9},(_,i)=>rect(34+i*23,87,9,91,P.light,4)).join(''),[]]
])add('architecture.'+id,name,'Kiến trúc · Cấu kiện',b,{view:id.startsWith('floor')||id.startsWith('wall')||id.startsWith('stairs')?'top':'front',ports});
// C: trees use Paper.js smoothed paths, with deterministic silhouettes.
function blob(cx,cy,rx,ry,count,seed){let p=new paper.Path({closed:true});for(let i=0;i<count;i++){let a=i/count*Math.PI*2,r=1+Math.sin(i*2.17+seed)*.13;p.add(new paper.Point(cx+Math.cos(a)*rx*r,cy+Math.sin(a)*ry*r));}p.smooth({type:'catmull-rom',factor:.5});const out=p.pathData;p.remove();return d(out,P.green);}
for(const [id,name,kind]of [['round','Cây tán tròn','round'],['umbrella','Cây tán ô','umbrella'],['columnar','Cây cao hẹp','column'],['ancient','Cây cổ thụ','ancient'],['willow','Cây liễu rủ','willow'],['fruit','Cây ăn quả','fruit'],['flowering','Cây có hoa','flower'],['sapling','Cây non có cọc','sapling'],['bare','Cây trụi lá','bare'],['dead','Cây khô','dead'],['pine','Thông nhiều tầng','pine'],['cypress','Cây lá kim cao','cypress'],['spruce','Thông tán rộng','spruce']]){
 let b=d('M118 226L122 122H134L142 226Z',P.wood);
 if(['pine','cypress','spruce'].includes(kind)){let w=kind==='cypress'?38:kind==='spruce'?91:69;for(let j=3;j>=0;j--){let y=29+j*37;b+=d(`M128 ${y}L${128-w*(.45+j*.19)} ${y+69}Q128 ${y+82} ${128+w*(.45+j*.19)} ${y+69}Z`,j%2?P.green:P.leaf);}}
 else if(kind==='bare'||kind==='dead')b+=d('M128 195V53M128 116L80 74L63 34M81 75L45 71M128 146L176 99L204 89M175 100L183 54M128 76L155 49M128 163L72 127L49 105', 'none',`stroke-width="${kind==='dead'?6:4}"`);
 else {let rx=kind==='column'?40:kind==='umbrella'?104:kind==='sapling'?43:83,ry=kind==='umbrella'?42:kind==='column'?90:kind==='sapling'?49:75;
 b+=blob(128,kind==='umbrella'?95:111,rx,ry,kind==='ancient'?17:11,id.length);
 if(kind==='ancient')b+=d('M124 222L102 231M132 220L157 231M126 159L91 123M130 150L164 112');
 if(kind==='willow')for(let i=0;i<9;i++)b+=d(`M${61+i*16} 85q-24 45 -8 ${87-i%3*9}`,P.leaf);
 if(kind==='fruit'||kind==='flower')for(let i=0;i<9;i++){let x=78+i%3*46,y=72+Math.floor(i/3)*37;b+=circle(x,y,kind==='flower'?7:6,kind==='flower'?'#d1b6a0':'#bd9361');}
 if(kind==='sapling')b+=line(104,140,104,230)+line(103,164,128,171);
 }
 if(kind==='dead')b=d('M112 226L124 72L137 106L144 226Z',P.wood)+d('M128 152L71 127L48 97M128 122L169 81L185 82M128 176L178 164M128 95L102 65','none','stroke-width="5"');
 add('tree.'+id,name,'Cảnh quan · Cây',{toString:()=>b}.toString(),{view:'elevation',tags:['vegetation','outdoor']});
}
for(const [id,name,b]of [
 ['bush','Bụi thấp',blob(128,142,85,51,12,2)],['flower-bush','Bụi hoa',blob(128,142,85,51,12,3)+[76,109,141,179].map((x,i)=>circle(x,118+i%2*36,9,'#c5ab92')).join('')],
 ['hedge','Hàng rào cây',rect(28,89,200,78,P.green,26)+Array.from({length:7},(_,i)=>ellipse(43+i*28,112,19,23,P.leaf)).join('')],
 ['fern','Dương xỉ',Array.from({length:9},(_,i)=>g(d('M128 211Q88 138 128 45Q168 138 128 211Z',i%2?P.green:P.leaf),`rotate(${(i-4)*19} 128 211)`)).join('')],
 ['reeds','Lau sậy',Array.from({length:7},(_,i)=>d(`M${67+i*20} 214Q${50+i*23} 135 ${65+i*20} 62`)+rect(61+i*20,44,8,33,P.wood,4)).join('')],
 ['grass','Cỏ cao',Array.from({length:13},(_,i)=>d(`M${50+i*13} 211Q${30+i*16} ${111+i%3*17} ${45+i*14} ${82+i%4*22}`, 'none',`stroke="${P.green}" stroke-width="4"`)).join('')],
 ['stump','Gốc cây',ellipse(128,153,66,65,P.wood)+ellipse(128,109,64,34,P.light)+ellipse(128,109,44,23,'none')+ellipse(128,109,24,12,'none')+line(90,145,83,199)],
 ['log','Thân cây đổ',rect(47,98,162,62,P.wood,13)+ellipse(48,129,22,31,P.light)+ellipse(48,129,13,21,'none')+line(77,112,191,112)+line(80,145,186,145)],
 ['planter','Chậu cây lá lớn',d('M84 159H172L157 220H99Z',P.wood)+Array.from({length:5},(_,i)=>g(d('M128 166Q57 104 94 58Q152 78 128 166Z',i%2?P.green:P.leaf),`rotate(${(i-2)*33} 128 166)`)).join('')],
 ['hanging','Giỏ cây treo',d('M128 29L59 142H197Z')+d('M59 142Q128 224 197 142Z',P.wood)+[77,105,139,169].map((x,i)=>d(`M${x} 144q-16 39 6 ${54+i%2*16}`,P.green)).join('')],
 ['vine','Dây leo',d('M128 224Q59 154 136 93Q193 48 128 28')+Array.from({length:7},(_,i)=>g(ellipse(116,55+i*23,23,9,P.green),`rotate(${i%2?35:-35} 116 ${55+i*23})`)).join('')]
])add('plant.'+id,name,'Cảnh quan · Thực vật',b,{view:'elevation',tags:['vegetation']});
const generator=rough.generator();
for(const [id,name,points]of [['boulder','Tảng đá',[[45,181],[35,119],[86,62],[169,51],[222,128],[199,195],[98,211]]],['flat','Đá bẹt',[[28,157],[71,105],[184,110],[229,157],[160,189],[64,186]]],['cliff','Vách đá',[[29,56],[87,31],[151,45],[218,29],[225,224],[170,203],[111,223],[40,205]]]]){
 const shape=generator.polygon(points,{seed:42,roughness:.35,fill:P.stone,fillStyle:'solid',stroke:P.dark,strokeWidth:1.7});let b=generator.toPaths(shape).map(p=>d(p.d,p.fill||'none',`stroke="${p.stroke||P.dark}" stroke-width="${p.strokeWidth||1}"`)).join('');b+=d('M85 106L118 137L107 180M151 83L165 125L198 144');add('terrain.'+id,name,'Cảnh quan · Địa hình',b,{view:'elevation'});
}
for(const [id,name,b]of [
 ['pond','Ao hồ',blob(128,128,103,78,13,5).replaceAll(P.green,P.water)+d('M65 105Q90 97 112 105M131 157Q162 146 188 155')],
 ['stream','Đoạn suối',d('M62 24Q175 75 88 133Q49 171 163 232L204 232Q83 161 135 136Q223 76 115 24Z',P.water)+d('M89 24Q198 77 111 136Q76 172 182 232')],
 ['waterfall','Thác nhỏ',d('M55 38H201L188 183Q128 236 68 183Z',P.water)+[80,111,145,176].map(x=>d(`M${x} 53q-11 66 4 121`)).join('')+ellipse(128,205,83,20,P.water)],
 ['path','Đường đất',d('M91 22Q33 130 114 234H174Q87 130 156 22Z',P.light)+d('M103 28Q53 132 128 227', 'none','stroke-dasharray="2 11"')],
 ['paving','Sân lát',rect(27,27,202,202,P.stone)+[0,1,2,3].map(i=>line(27,67+i*40,229,67+i*40)+line(67+i*40,27,67+i*40,229)).join('')],
 ['steps','Bậc đá ngoài trời',[0,1,2,3,4].map(i=>rect(37+i*6,40+i*32,182-i*12,33,P.stone)).join('')],
 ['bridge','Cầu gỗ',rect(29,74,198,108)+slats(29,74,198,108,12)+rect(21,65,214,10,P.dark)+rect(21,181,214,10,P.dark)],
 ['bridge-stone','Cầu đá nhỏ',d('M27 169Q128 53 229 169V206Q128 95 27 206Z',P.stone)+d('M27 163Q128 45 229 163')],
 ['fence','Hàng rào gỗ',rect(27,95,202,12)+rect(27,156,202,12)+Array.from({length:7},(_,i)=>d(`M${33+i*30} 204V63L${41+i*30} 49L${49+i*30} 63V204Z`,P.wood)).join('')],
 ['iron-fence','Hàng rào sắt',line(26,90,230,90)+line(26,166,230,166)+Array.from({length:9},(_,i)=>line(35+i*23,59,35+i*23,207)+d(`M${30+i*23} 64L${35+i*23} 49L${40+i*23} 64Z`,P.roof)).join('')],
 ['gate','Cổng vườn',rect(32,62,14,153)+rect(210,62,14,153)+d('M49 202V93Q128 39 207 93V202Z',P.wood)+slats(55,94,146,100,8)+line(128,71,128,202)],
 ['bed','Luống trồng',rect(29,49,198,158,P.wood)+rect(38,58,180,140,P.dark)+[65,108,151,194].map(x=>[85,129,173].map(y=>ellipse(x,y,12,6,P.green)).join('')).join('')],
 ['trellis','Giàn leo',rect(37,38,182,170,P.wood)+Array.from({length:7},(_,i)=>line(45+i*25,45,45+i*25,200)+line(45,45+i*25,211,45+i*25)).join('')+d('M55 197Q163 163 102 102Q55 64 190 53','none',`stroke="${P.green}" stroke-width="9"`)],
 ['well','Giếng',ellipse(128,170,72,45,P.stone)+ellipse(128,156,72,39,P.light)+ellipse(128,156,47,24,P.dark)+rect(57,72,8,94)+rect(191,72,8,94)+d('M35 87L128 32L221 87Z',P.roof)+line(128,88,128,158)],
 ['fountain','Đài phun',circle(128,128,93,P.stone)+circle(128,128,79,P.water)+circle(128,128,39,P.stone)+circle(128,128,29,P.water)+circle(128,128,10,P.light)],
 ['garden-bench','Ghế vườn',rect(41,87,174,82)+Array.from({length:4},(_,i)=>line(48,97+i*19,208,97+i*19)).join('')+rect(48,73,12,111,P.dark)+rect(196,73,12,111,P.dark)],
 ['picnic','Bàn picnic',rect(49,83,158,90)+slats(49,83,158,90,5)+rect(49,45,158,24)+rect(49,187,158,24)+line(67,69,67,187)+line(189,69,189,187)],
 ['streetlamp','Đèn đường',rect(120,87,16,133,P.roof)+d('M97 89L89 39H167L159 89Z',P.light)+d('M84 35L128 14L172 35Z',P.roof)+rect(101,219,54,10,P.dark)],
 ['dock','Cầu tàu',rect(28,93,200,70)+slats(28,93,200,70,12)+[39,216].map(x=>circle(x,90,8)+circle(x,167,8)).join('')],
 ['boat','Thuyền chèo',d('M128 21Q232 128 128 235Q24 128 128 21Z',P.wood)+d('M128 42Q209 128 128 214Q47 128 128 42Z',P.light)+rect(83,96,90,12)+rect(83,150,90,12)+line(44,187,204,68)],
 ['wheelbarrow','Xe cút kít',d('M70 69H186L173 171H83Z',P.roof)+rect(80,170,12,58)+rect(164,170,12,58)+rect(120,34,16,35,P.dark)+circle(128,33,15,P.wood)],
 ['gravestone','Bia đá',d('M71 220V87Q128 21 185 87V220Z',P.stone)+d('M85 209V94Q128 47 171 94V209Z','none')],
 ['tent','Lều',d('M31 214L128 34L225 214Z',P.light)+d('M94 214L128 102L163 214Z',P.dark)+line(128,34,128,102)]
])add('landscape.'+id,name,'Cảnh quan · Hạ tầng',b,{view:['well','streetlamp','gravestone','tent','bridge-stone','fence','iron-fence','gate','trellis'].includes(id)?'elevation':'top'});
function house({w=140,h=110,roof='gable',floors=1,shop=false,porch=false,chimney=false,annex=false,glass=false}){
 let x=128-w/2,y=221-h,b=rect(x,y,w,h,glass?P.water:P.light,0);
 if(glass)b+=slats(x,y,w,h,5)+line(x,y+h/2,x+w,y+h/2);
 else{for(let j=0;j<floors;j++){let yy=y+15+j*h/floors;for(let i=0;i<2;i++)b+=pane(x+15+i*(w-53),yy,23,30);} b+=d(`M113 221V${221-h*.42}Q128 ${210-h*.42} 143 ${221-h*.42}V221Z`,P.wood)+circle(137,201,2,P.dark);}
 if(shop)b+=rect(x+7,201,w-14,10,P.wood)+rect(x-9,y+49,w+18,15,P.roof)+pane(x+10,166,32,30)+pane(x+w-42,166,32,30);
 if(roof==='hip')b+=d(`M${x-12} ${y+4}L${x+30} ${y-46}H${x+w-30}L${x+w+12} ${y+4}Z`,P.roof)+line(x+30,y-46,x+17,y+4)+line(x+w-30,y-46,x+w-17,y+4);
 else if(roof==='flat')b+=rect(x-7,y-12,w+14,16,P.stone);
 else b+=d(`M${x-14} ${y+5}L128 ${y-52}L${x+w+14} ${y+5}Z`,P.roof);
 if(chimney)b+=rect(x+w-33,y-55,18,44,P.stone)+rect(x+w-36,y-59,24,7,P.light);
 if(porch)b+=rect(83,204,90,10,P.roof)+rect(85,212,6,16,P.wood)+rect(165,212,6,16,P.wood);
 if(annex)b+=rect(x+w-4,172,47,49,P.light)+d(`M${x+w-12} 172L${x+w+19} 141L${x+w+51} 172Z`,P.roof)+pane(x+w+8,181,19,25);
 return b;
}
for(const [id,name,config]of [
 ['cottage','Cottage đá',{w:149,h:100,chimney:true}],['timber','Cottage gỗ',{w:146,h:110,porch:true,roof:'hip'}],['townhouse','Nhà phố hẹp',{w:100,h:155,floors:3,roof:'flat'}],['farmhouse','Nhà nông thôn',{w:160,h:129,floors:2,chimney:true}],['annex','Nhà có chái',{w:116,h:119,annex:true,roof:'hip'}],['porch','Nhà có hiên',{w:157,h:116,porch:true,chimney:true}],['shop','Cửa hàng cơ bản',{w:160,h:143,floors:2,shop:true}],['corner-shop','Cửa hàng góc',{w:130,h:137,floors:2,shop:true,annex:true,roof:'hip'}],['shed','Nhà kho',{w:163,h:91,roof:'gable'}],['garden','Nhà vườn',{w:123,h:96,porch:true,roof:'hip'}],['glasshouse','Nhà kính nhỏ',{w:172,h:112,glass:true}],['inn','Quán trọ',{w:175,h:147,floors:2,shop:true,chimney:true}],['station','Nhà ga nhỏ',{w:207,h:86,roof:'hip',porch:true}],['hall','Hội trường',{w:187,h:117,roof:'gable'}]
])add('house.'+id,name,'Nhà cửa · Khối cơ bản',house(config),{view:'elevation',tags:['exterior','building'],ports:[{id:'entry',x:128,y:221}],});
for(const[id,name,b]of [
 ['roof-gable','Mái hai dốc',d('M25 190L128 54L231 190Z',P.roof)+d('M42 183L128 69L214 183')],
 ['roof-hip','Mái bốn dốc',d('M25 186L79 65H177L231 186Z',P.roof)+line(79,65,73,186)+line(177,65,183,186)],
 ['roof-dome','Mái vòm',d('M30 192A98 125 0 0 1 226 192Z',P.roof)+d('M70 192Q75 21 128 68Q181 21 186 192')],
 ['chimney','Ống khói',rect(91,60,74,145,P.stone)+rect(79,45,98,26,P.light)+[91,121,151,181].map(y=>line(91,y,165,y)).join('')],
 ['awning','Mái hiên',d('M39 74H217L232 154H24Z',P.roof)+Array.from({length:7},(_,i)=>d(`M${24+i*30} 154q15 27 30 0`,P.light)).join('')+line(49,172,49,220)+line(207,172,207,220)],
 ['balcony','Ban công',rect(31,139,194,58,P.stone)+rect(31,95,194,9,P.wood)+Array.from({length:10},(_,i)=>line(37+i*20,104,37+i*20,139)).join('')],
 ['sign','Biển hiệu trống',rect(74,87,136,80,P.light,10)+line(45,46,45,213)+line(45,56,194,56)+line(95,56,95,87)+line(181,56,181,87)],
 ['dormer','Cửa gác mái',rect(77,111,102,96,P.light)+d('M62 113L128 54L194 113Z',P.roof)+pane(101,128,54,63)],
 ['planter-box','Hộp cây cửa sổ',rect(39,131,178,61,P.wood)+[66,107,151,190].map((x,i)=>ellipse(x,109,24,34,i%2?P.green:P.leaf)).join('')]
])add('building-part.'+id,name,'Nhà cửa · Phụ kiện',b,{view:'elevation'});
// Additional practical modules for consistent top-view compositions.
add('storage.bookcase-top','Kệ sách · mặt bằng','Nội thất · Tủ kệ',rect(29,94,198,68)+rect(37,102,182,51,P.light)+Array.from({length:13},(_,i)=>rect(41+i*13,107,9,40,i%3===0?P.roof:P.wood,0)).join(''),{view:'top'});
add('fixture.fireplace-top','Lò sưởi · mặt bằng','Nội thất · Bếp & vệ sinh',rect(36,68,184,126,P.stone)+rect(58,87,140,85,P.dark)+d('M70 153L181 112M77 112L176 153','none','stroke-width="8"')+rect(26,191,204,17,P.light),{view:'top'});
add('plant.pot-top','Chậu cây · mặt bằng','Cảnh quan · Thực vật',circle(128,128,66,P.wood)+circle(128,128,56,P.dark)+Array.from({length:7},(_,i)=>g(d('M128 128Q83 49 128 42Q169 69 128 128Z',i%2?P.green:P.leaf),`rotate(${i*360/7} 128 128)`)).join(''),{view:'top'});
for(const [id,name,b]of [
 ['curtain','Rèm cửa',rect(30,39,196,10,P.dark)+d('M38 50H114L93 149L108 216H38Z',P.light)+d('M142 50H218V216H148L163 149Z',P.light)+d('M54 63L65 142L52 202M90 63L80 142M202 63L191 142L204 202M166 63L176 142')],
 ['lamp-floor','Đèn đứng',ellipse(128,215,48,15,P.wood)+rect(122,81,12,130,P.roof)+d('M65 86L93 30H163L191 86Z',P.light)],
 ['sconce','Đèn tường',rect(104,71,48,135,P.wood,12)+d('M128 171Q69 172 70 126M128 171Q187 172 186 126')+rect(63,71,14,55,P.paper)+rect(179,71,14,55,P.paper)+d('M70 68Q53 49 70 29Q87 49 70 68M186 68Q169 49 186 29Q203 49 186 68','#c79655')],
 ['torch','Đuốc',d('M115 218L108 103H148L141 218Z',P.wood)+d('M128 109Q69 81 119 29Q111 63 140 45Q183 93 128 109Z','#c79655')],
 ['globe','Quả địa cầu',circle(128,108,67,P.water)+ellipse(128,108,32,67,'none')+ellipse(128,108,67,24,'none')+line(128,175,128,213)+ellipse(128,221,50,10,P.wood)],
 ['books-stack','Chồng sách',rect(64,150,140,34,P.wood)+rect(52,111,140,36,P.roof)+rect(67,73,140,35,P.light)+line(63,128,179,128)+line(77,91,198,91)+line(75,167,192,167)],
 ['blackboard','Bảng viết',rect(35,42,186,139,P.wood)+rect(45,52,166,119,P.roof)+rect(39,182,178,9)+line(62,191,55,226)+line(194,191,201,226)],
 ['towel','Giá khăn',rect(49,66,158,13,P.wood)+rect(72,76,112,124,P.paper)+line(80,186,176,186)+line(86,81,86,181)],
 ['bucket','Xô nước',d('M65 87H191L174 217H82Z',P.wood)+ellipse(128,87,63,21,P.water)+d('M67 86Q128 6 189 86')],
 ['rainbarrel','Thùng hứng mưa',rect(72,62,112,148,P.wood,17)+ellipse(128,62,56,20,P.water)+line(72,97,184,97)+line(72,176,184,176)+d('M181 183H210V202','none','stroke-width="9"')],
 ['compost','Ô ủ phân',rect(38,86,180,125,P.wood)+[100,128,156,184].map(y=>line(38,y,218,y)).join('')+ellipse(128,86,90,30,P.dark)+blob(128,77,71,21,9,4)],
 ['woodpile','Đống củi',[0,1,2].map(j=>Array.from({length:4-j},(_,i)=>circle(67+i*40+j*20,192-j*36,23,P.wood)+circle(67+i*40+j*20,192-j*36,13,P.light)).join('')).join('')],
 ['flowerbed','Bồn hoa dài',rect(31,114,194,85,P.stone)+[59,101,146,191].map((x,i)=>d(`M${x} 142V75`)+circle(x,73,20,'#c8b69b')+circle(x,73,7,P.light)).join('')],
 ['shower','Vòi sen',rect(42,42,172,172,P.stone)+rect(52,52,152,152,P.water)+circle(128,172,8,P.dark)+d('M128 42V72H166')+ellipse(166,78,20,8,P.wood)],
 ['safe','Két sắt',rect(57,48,142,160,P.roof,12)+rect(68,59,120,138,P.stone)+circle(112,120,24,P.wood)+circle(112,120,15,P.dark)+line(160,101,160,155)]
])add('extra.'+id,name,id==='compost'||id==='woodpile'||id==='flowerbed'||id==='rainbarrel'?'Cảnh quan · Tiện ích':'Nội thất · Bổ sung',b,{view:id==='shower'?'top':'elevation'});
const identityConfig=wizard({add,assets,P,rect,line,d,circle,ellipse,g,pane,slats});
fs.writeFileSync(`${ROOT}/identities.json`,JSON.stringify(identityConfig,null,2));
for(const a of assets)fs.writeFileSync(`${ROOT}/${a.file}`,a.svg);
// Independent designs; no licensed external SVG assets copied.
fs.writeFileSync(`${ROOT}/catalog.json`,JSON.stringify({schemaVersion:'2.0.0',scope:'A+C',palette:P,elements:assets},null,2));
const cats=[...new Set(assets.map(a=>a.category))];
const cards=assets.map(a=>`<article class="card" data-id="${a.id}" data-category="${a.category}"><div class="art">${a.svg}</div><h3>${a.name}</h3><small>${a.id}</small><p>${a.view==='top'?'Mặt bằng':a.view==='front'?'Mặt đứng':a.view==='side'?'Mặt bên':'Ngoại cảnh'}</p><details><summary>SVG / metadata</summary><button onclick="downloadAsset('${a.id}','svg')">Tải SVG</button><button onclick="downloadAsset('${a.id}','json')">Tải JSON</button><pre>${JSON.stringify({id:a.id,view:a.view,surface:a.surface,ports:a.ports},null,2)}</pre></details></article>`).join('');
const lib=fs.readFileSync(`${ROOT}/node_modules/@svgdotjs/svg.js/dist/svg.min.js`,'utf8').replaceAll('</script','<\\/script');
const html=`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP · A + C · Element Atlas</title><style>*{box-sizing:border-box}body{margin:0;background:#eee8da;color:#343c32;font:14px system-ui}header{padding:40px 5%;background:#263c33;color:#efe9d8}header small{letter-spacing:3px;color:#baad86}h1{font:46px Georgia;margin:14px 0}header p{color:#d0d4bf;line-height:1.6;max-width:750px}.bar{padding:20px 5%;position:sticky;top:0;background:#f7f3e9ed;backdrop-filter:blur(10px);display:flex;gap:12px;z-index:2;border-bottom:1px solid #cfc4ad;flex-wrap:wrap}input,select,button{font:inherit;border:1px solid #bdb29b;border-radius:5px;padding:10px;background:#faf7ee;color:#343c32}input[type=search]{min-width:230px;flex:1}main{padding:28px 5%}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:18px}.card{background:#fbf8ef;border:1px solid #d4c8b1;border-radius:8px;overflow:hidden;padding:12px}.art{background:#eee7d6;border-radius:5px;aspect-ratio:1;display:grid;place-items:center}.art svg{width:94%;height:94%}h3{font:19px Georgia;margin:15px 0 6px}small{font-size:11px;color:#797763}.card p{font-size:11px;color:#73745f}details{margin-top:12px;font-size:11px}summary{cursor:pointer}pre{white-space:pre-wrap;font-size:10px}details button{font-size:11px;padding:7px;margin:8px 4px 0 0}[hidden]{display:none!important}#preview{display:none;padding:18px 5%;background:#dedfcf}#preview.on{display:block}#preview svg{max-width:100%;height:280px}#preview button{margin-right:10px}a{color:inherit}.info{padding:20px 0;line-height:1.6;color:#65715e}button{cursor:pointer}@media(max-width:600px){h1{font-size:32px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.card{padding:8px}h3{font-size:16px}.bar{position:static}}</style><header><small>WIZAMAP / DESIGN LIBRARY / A + C</small><h1>Không gian bắt đầu từ chi tiết.</h1><p>${assets.length} element SVG nguyên bản cho nội thất, kiến trúc, cây cảnh và nhà cửa. Tách lớp, đổi màu và ghép thành bố cục HTML. Không bảng tên trong hình, không marker, không bản sao chỉ khác màu.</p></header><div class="bar"><input id="search" type="search" placeholder="Tìm bàn, cây, cửa, nhà…" aria-label="Tìm element"><select id="category" aria-label="Nhóm"><option value="">Tất cả nhóm</option>${cats.map(c=>`<option>${c}</option>`).join('')}</select><select id="view" aria-label="Góc nhìn"><option value="">Mọi góc nhìn</option><option value="top">Mặt bằng</option><option value="front">Mặt đứng</option><option value="elevation">Ngoại cảnh</option><option value="side">Mặt bên</option></select><span id="count">${assets.length} element</span></div><section id="preview"><button onclick="this.parentElement.classList.remove('on')">Đóng xem thử</button><label>Màu gỗ <input type="color" id="color" value="${P.wood}"></label><div id="canvas"></div></section><main><p class="info">Click hình để xem và thử đổi màu. Gallery vẫn hiện đủ hình khi JavaScript không chạy. Mặt bằng dùng cho phòng; ngoại cảnh dùng cho bản đồ tổng thể. <a href="examples/room.html">Ví dụ ghép phòng</a> · <a href="examples/garden.html">Ví dụ ghép vườn</a> · <a href="examples/village.html">Ví dụ cụm nhà</a></p><div class="grid">${cards}</div></main><script id="data" type="application/json">${JSON.stringify(assets).replaceAll('</','<\\/')}</script><script>${lib}</script><script>const assets=JSON.parse(document.getElementById('data').textContent),byId=Object.fromEntries(assets.map(a=>[a.id,a]));function filter(){const q=document.getElementById('search').value.toLowerCase(),cat=document.getElementById('category').value,v=document.getElementById('view').value;let n=0;for(const card of document.querySelectorAll('.card')){const a=byId[card.dataset.id];card.hidden=!(a.name.toLowerCase().includes(q)||a.id.includes(q))||!!cat&&a.category!==cat||!!v&&a.view!==v;if(!card.hidden)n++}document.getElementById('count').textContent=n+' element'}for(const id of ['search','category','view'])document.getElementById(id).addEventListener('input',filter);for(const card of document.querySelectorAll('.card'))card.querySelector('.art').onclick=()=>{const a=byId[card.dataset.id],canvas=document.getElementById('canvas');canvas.replaceChildren();SVG().addTo(canvas).viewbox(0,0,256,256).svg(a.svg);document.getElementById('preview').classList.add('on');document.getElementById('preview').scrollIntoView({behavior:'smooth',block:'center'})};document.getElementById('color').oninput=e=>{for(const n of document.querySelectorAll('#canvas [data-color-fill="base"]'))n.setAttribute('fill',e.target.value)};function downloadAsset(id,type){const a=byId[id],data=type==='svg'?a.svg:JSON.stringify({...a,svg:undefined},null,2),url=URL.createObjectURL(new Blob([data],{type:type==='svg'?'image/svg+xml':'application/json'})),link=document.createElement('a');link.href=url;link.download=id+'.'+type;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}</script></html>`;
fs.writeFileSync(`${ROOT}/index.html`,html);
// Composition examples preserve semantic IDs, rather than baking objects into a bitmap.
function scene(name,w,h,placements,bg){let body=bg;for(const [id,x,y,width,height]of placements){const a=assets.find(a=>a.id===id);if(!a)throw Error(id);body+=`<svg x="${x}" y="${y}" width="${width}" height="${height}" viewBox="0 0 256 256" data-element-id="${id}">${a.svg.replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg>`;}fs.writeFileSync(`${ROOT}/examples/${name}.html`,`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP / ${name}</title><body style="margin:0;background:#eee8da;font:16px system-ui;color:#343c32"><p style="padding:12px 30px"><a href="../index.html">← Element Atlas</a> / ${name}</p><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" style="width:100%;max-height:90vh">${body}</svg></body></html>`)}
scene('room',1000,700,[['storage.bookcase-top',65,40,170,150],['fixture.fireplace-top',690,20,220,180],['object.rug',300,220,370,300],['table.coffee',390,315,180,130],['seat.sofa',365,155,245,180],['seat.armchair',215,340,150,160],['seat.armchair',595,340,150,160],['table.desk',70,420,220,170],['accessory.book-open',120,450,85,85],['accessory.ink',210,470,50,50],['plant.pot-top',785,435,145,180]],rect(30,25,940,650,'#d5c29d',4));
scene('garden',1000,700,[['tree.willow',60,30,270,320],['tree.pine',720,20,210,300],['landscape.pond',300,290,340,280],['landscape.bed',60,380,220,230],['landscape.garden-bench',690,400,240,200],['plant.flower-bush',320,20,160,180],['plant.flower-bush',470,45,160,180],['landscape.fountain',630,220,140,140],['terrain.boulder',550,480,180,170]],rect(25,25,950,650,'#d8dfc4',16));
scene('village',1100,700,[['house.cottage',35,220,270,280],['house.shop',350,210,280,300],['house.inn',690,155,340,350],['tree.round',120,40,190,230],['tree.columnar',585,80,140,270],['landscape.streetlamp',645,340,90,190],['landscape.well',350,440,200,190],['landscape.garden-bench',760,500,230,130]],rect(25,25,1050,650,'#ded9bd',12)+d('M20 510Q550 425 1080 510','none','stroke="#c3b28e" stroke-width="65"'));
console.log(JSON.stringify({elements:assets.length,categories:cats.length,svgBytes:assets.reduce((s,a)=>s+a.svg.length,0)}));
