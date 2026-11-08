export function wizard({add,assets,P,rect,line,d,circle,ellipse,g,pane,slats}){
const gold='#b69a57',silver='#bac9c4',ink=P.dark;
const bead=(x,y,w,h)=>rect(x,y,w,h,'none',4)+rect(x+5,y+5,w-10,h-10,'none',2);
const scroll=(x,y)=>d(`M${x} ${y}q-15-15-19 0t19 4q15 15 19 0t-19-4`,'none',`stroke="${gold}"`);
const star=(x,y,r=6)=>d(`M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y}L${x+r*.3} ${y+r*.3}L${x} ${y+r}L${x-r*.3} ${y+r*.3}L${x-r} ${y}L${x-r*.3} ${y-r*.3}Z`,gold);
const fire=(color='#ba8d54')=>d('M94 178Q76 143 112 108Q105 139 128 117Q154 77 158 130Q180 153 158 178Z',color);
function books(x,y,w,h,n){return Array.from({length:n},(_,i)=>rect(x+i*w/n,y+(i%3)*2,w/n-2,h-(i%3)*2,[P.wood,P.roof,P.light][i%3],1)+line(x+3+i*w/n,y+8,x+w/n-5+i*w/n,y+8)).join('');}
function jar(x,y,w=18,h=30){return rect(x,y+5,w,h,silver,4)+rect(x+2,y,w-4,6,P.wood,1)+rect(x+3,y+h*.55,w-6,8,P.paper,0);}
function cabinet(w=162,h=184){return rect(128-w/2,224-h,w,h,P.wood,5)+rect(128-w/2-7,218-h,w+14,12,P.light)+bead(134-w/2,230-h,w-12,h-12)+rect(128-w/2-7,220,w+14,8,P.dark)+scroll(128,230-h+12);}
function portrait(cx=128,cy=125,w=125,h=161){return rect(cx-w/2,cy-h/2,w,h,P.wood,10)+bead(cx-w/2+4,cy-h/2+4,w-8,h-8)+rect(cx-w/2+14,cy-h/2+14,w-28,h-28,P.roof,7)+ellipse(cx,cy+39,w*.28,h*.18,P.dark)+ellipse(cx,cy-10,w*.13,h*.16,P.light)+d(`M${cx-w*.21} ${cy-17}L${cx} ${cy-h*.32}L${cx+w*.2} ${cy-17}Z`,P.dark)+scroll(cx,cy+h/2-6);}
function cauldron(x=128,y=137,s=1){return g(ellipse(x,y+12,65,57,'#78857d')+ellipse(x,y-20,63,20,P.dark)+ellipse(x,y-20,50,13,'#9daa8b')+d(`M${x-58} ${y-7}q-31-22-23 18q6 23 26 12M${x+58} ${y-7}q31-22 23 18q-6 23-26 12`)+rect(x-42,y+57,11,20,P.dark)+rect(x+31,y+57,11,20,P.dark)+d(`M${x-31} ${y+7}q-12 18-5 35`,'none','stroke="#c2c7ad" stroke-width="3"'),`translate(${x*(1-s)} ${y*(1-s)}) scale(${s})`);}
function broom(x,y,angle=0){return g(d(`M${x} ${y+120}q-12-67 5-130`,'none','stroke-width="5"')+d(`M${x-9} ${y+59}L${x-23} ${y+119}Q${x} ${y+135} ${x+24} ${y+119}L${x+8} ${y+59}Z`,P.wood)+line(x-10,y+61,x+10,y+61)+line(x-8,y+67,x+8,y+67)+[ -12,0,12].map(t=>line(x+t*.5,y+75,x+t,y+120)).join(''),`rotate(${angle} ${x} ${y+60})`);}
function large(id,name,cat,b,view='front',extra={}){add(id,name,cat,b,{view,tags:['large','wizard-interior'],...extra});}
// Four distinct fireplace structures, each with its own architecture.
for(const[id,name,kind]of [['stone','Lò sưởi đá lớn','stone'],['carved','Lò sưởi gỗ chạm','wood'],['gothic','Lò sưởi Gothic','gothic'],['floo','Lò Floo','floo']]){
 let tall=kind==='floo',y=tall?29:65,base=kind==='wood'?P.wood:P.stone;
 let b=rect(29,y,198,224-y,base,3)+rect(17,218,222,15,P.light)+rect(21,y-11,214,17,base)+bead(35,y+7,186,208-y);
 if(kind==='gothic')b+=d('M67 210V130Q67 96 128 57Q189 96 189 130V210Z',P.dark)+[45,199].map(x=>rect(x,83,12,128)+circle(x+6,77,7,gold)).join('');
 else b+=d(`M64 209V${y+62}Q128 ${y+5} 192 ${y+62}V209Z`,P.dark);
 b+=fire(kind==='floo'?'#7dac8b':'#b88e55')+d('M79 197L171 183M82 184L169 199','none','stroke-width="5"');
 if(kind==='wood')b+=scroll(128,83)+scroll(46,160)+scroll(210,160);
 if(kind==='stone')b+=[95,124,153,182].map(yy=>line(30,yy,57,yy)+line(199,yy,226,yy)).join('');
 large('wizard.fireplace-'+id,name,'Phù thủy · Lò sưởi',b);
}
large('wizard.fireguard','Chắn lò và giá củi','Phù thủy · Lò sưởi',d('M41 197V102Q128 47 215 102V197Z',P.roof)+[0,1,2,3,4,5].map(i=>line(59+i*28,104,59+i*28,192)).join('')+rect(49,197,158,13)+scroll(128,91));
// Large cabinets: complete set dressing rather than individual small bottles.
let b=cabinet();for(let j=0;j<4;j++){b+=rect(59,79+j*34,138,5,P.dark);for(let i=0;i<5;i++)b+=jar(64+i*26,51+j*34,19,23);}large('wizard.potions-cabinet','Tủ độc dược','Phù thủy · Tủ kệ',b);
b=cabinet(178,181);for(let j=0;j<4;j++)b+=books(53,62+j*36,150,29,10)+rect(49,92+j*36,158,5,P.dark);b+=rect(185,56,7,173,P.dark)+rect(211,56,7,173,P.dark)+[82,107,132,157,182,207].map(y=>line(192,y,211,y)).join('');large('wizard.library-ladder','Kệ sách cổ có thang','Phù thủy · Tủ kệ',b);
b=d('M33 61Q128 19 223 61V221Q128 180 33 221Z',P.wood);for(let j=0;j<4;j++)b+=d(`M43 ${70+j*36}Q128 ${43+j*36} 213 ${70+j*36}`)+books(49,74+j*34,158,22,11);large('wizard.library-curved','Kệ sách cong theo tháp','Phù thủy · Tủ kệ',b);
b=cabinet(173,180)+rect(53,62,150,139,P.water,0)+line(128,63,128,199)+rect(51,121,154,6,P.wood)+scroll(128,47)+circle(117,139,3,gold)+circle(139,139,3,gold);large('wizard.display','Tủ kính chạm cổ','Phù thủy · Tủ kệ',b);
b=cabinet(153,180);for(let j=0;j<5;j++)b+=rect(60,62+j*28,136,24,P.light)+rect(115,70+j*28,26,6,P.dark)+rect(74,70+j*28,19,7,P.paper);large('wizard.archive','Tủ hồ sơ cổ','Phù thủy · Tủ kệ',b);
large('wizard.broom-rack','Giá chổi bay đứng','Phù thủy · Thiết bị',rect(31,195,194,23)+rect(38,69,180,10,P.dark)+broom(70,68,-8)+broom(128,68,0)+broom(185,68,8));
large('wizard.broom-wall','Giá chổi bay treo','Phù thủy · Thiết bị',rect(35,51,13,161)+rect(208,51,13,161)+g(broom(87,46,85),'translate(-13 4)')+g(broom(87,46,85),'translate(-13 64)'));
large('wizard.cauldron','Vạc học sinh','Phù thủy · Độc dược',cauldron());
large('wizard.cauldron-large','Vạc lớn có bệ đun','Phù thủy · Độc dược',rect(54,198,148,28,P.stone)+fire()+cauldron(128,114,1.05));
large('wizard.potions-bench','Bàn thực hành có vạc','Phù thủy · Độc dược',rect(25,148,206,17)+rect(42,165,13,64)+rect(201,165,13,64)+cauldron(105,105,.72)+jar(183,106,27,38));
large('wizard.telescope','Kính thiên văn đồng','Phù thủy · Thiết bị',d('M128 126L72 230M128 126L186 230M128 126L128 226','none','stroke-width="5"')+g(rect(49,67,158,31,gold)+rect(171,59,38,47,P.wood)+rect(38,72,21,21,P.dark)+line(81,69,81,95),'rotate(-26 128 91)')+circle(128,126,10,P.dark));
large('wizard.orrery','Mô hình thiên thể','Phù thủy · Thiết bị',ellipse(128,111,94,39,'none')+g(ellipse(128,111,94,39,'none'),'rotate(48 128 111)')+g(ellipse(128,111,94,39,'none'),'rotate(-48 128 111)')+circle(128,111,22,gold)+circle(48,93,10,P.roof)+circle(187,72,12,silver)+circle(203,132,8,P.wood)+rect(120,149,16,58)+ellipse(128,215,58,13,P.wood));
large('wizard.lectern','Bục đọc và sách lớn','Phù thủy · Thiết bị',rect(117,124,22,88)+ellipse(128,219,65,12,P.wood)+d('M53 77L128 54L203 77L190 140L128 122L66 140Z',P.wood)+d('M63 79Q93 63 128 74Q163 63 193 79L183 126Q155 109 128 119Q101 109 73 126Z',P.paper)+line(128,76,128,117));
// Large tabletop arrangements. The miniature ingredients never appear alone in main gallery.
const tray=ellipse(128,190,108,28,P.wood)+ellipse(128,188,98,20,P.light);
const closedBook=(x,y,w=62)=>rect(x,y,w,20,P.roof)+rect(x+3,y+6,w-6,8,P.paper);
const openBook=d('M35 147Q77 129 117 150Q157 129 199 147V199Q157 181 117 202Q77 181 35 199Z',P.paper)+line(117,150,117,201);
const candle=(x,y)=>ellipse(x,y+65,19,7,gold)+rect(x-3,y+9,6,54,gold)+rect(x-7,y-24,14,36,P.paper)+d(`M${x} ${y-27}q-12-14 0-25q12 11 0 25Z`,'#c39658');
const orb=circle(133,115,52,'#bdd3cf')+d('M96 100Q118 76 145 83','none','stroke="#f1ead6" stroke-width="4"')+d('M102 160L91 193H176L164 160Z',P.wood)+scroll(132,179);
large('cluster.divination','Cụm Tiên tri','Phù thủy · Cụm trên bàn',tray+orb+closedBook(30,172,55));
large('cluster.research','Cụm nghiên cứu phép','Phù thủy · Cụm trên bàn',tray+closedBook(123,147)+closedBook(130,124)+openBook+circle(183,84,27,'none')+line(183,111,183,151)+ellipse(183,154,24,7,gold));
large('cluster.headmaster','Cụm bàn hiệu trưởng','Phù thủy · Cụm trên bàn',tray+closedBook(40,160)+closedBook(44,138)+candle(187,96)+rect(97,135,52,54,P.paper)+ellipse(123,130,27,9,P.light)+circle(144,118,13,silver));
large('cluster.astronomy','Cụm thiên văn','Phù thủy · Cụm trên bàn',tray+rect(37,139,91,52,P.roof)+[0,1,2,3,4].map(i=>star(49+i*16,158+i%2*14,3)).join('')+circle(159,106,44,'none')+g(ellipse(159,106,44,18,'none'),'rotate(48 159 106)')+circle(159,106,12,gold)+line(159,151,159,183));
large('cluster.books','Cụm sách và giấy da','Phù thủy · Cụm trên bàn',closedBook(58,175,133)+closedBook(46,146,143)+closedBook(64,116,125)+rect(71,70,116,36,P.paper,12)+ellipse(74,88,8,18,P.light)+ellipse(184,88,8,18,P.light));
large('cluster.tea','Cụm trà phòng sinh hoạt','Phù thủy · Cụm trên bàn',tray+ellipse(130,143,43,38,P.light)+ellipse(130,114,22,9,P.wood)+d('M89 136L62 118L74 158H91Z',P.light)+d('M168 126Q207 143 168 166')+[70,193].map(x=>ellipse(x,184,22,8,P.paper)+ellipse(x,169,15,16,P.light)+ellipse(x,158,15,5,P.dark)).join(''));
large('cluster.candelabrum','Cụm chân nến nhiều nhánh','Phù thủy · Cụm trên bàn',candle(128,99)+candle(71,119)+candle(185,119)+d('M71 169Q128 209 185 169')+ellipse(128,223,52,9,gold));
// Room-scale decor.
large('decor.portrait','Chân dung phù thủy','Phù thủy · Trang trí',portrait());
large('decor.portrait-wall','Cụm tường chân dung','Phù thủy · Trang trí',portrait(70,85,93,108)+portrait(181,81,99,116)+portrait(116,185,107,96));
large('decor.landscape','Tranh lâu đài và hồ','Phù thủy · Trang trí',rect(22,54,212,151,P.wood)+bead(27,59,202,141)+rect(37,69,182,121,P.water)+d('M39 153L83 113L118 150L167 105L216 151V187H39Z',P.green)+rect(105,111,58,52,P.stone)+rect(99,88,17,75,P.light)+d('M94 89L107 65L121 89Z',P.roof)+rect(153,92,17,71,P.light)+d('M149 92L162 73L176 92Z',P.roof));
large('decor.armour','Bộ giáp đứng','Phù thủy · Trang trí',ellipse(128,230,69,9,P.stone)+d('M91 79L71 105L86 154L102 144L97 113M165 79L185 105L170 154L154 144L159 113',silver)+d('M102 75H154L169 110L151 151H105L87 110Z',silver)+ellipse(128,48,26,29,silver)+rect(105,43,46,13,P.dark)+line(111,47,145,47)+d('M105 151L96 216L117 226L128 163L139 226L160 216L151 151Z',silver)+d('M128 82V146M102 104H154'));
large('decor.bust','Tượng bán thân trên bệ','Phù thủy · Trang trí',rect(87,151,82,71,P.stone)+rect(77,221,102,12,P.light)+d('M75 143Q82 103 110 100H146Q174 103 181 143Z',P.stone)+ellipse(128,69,29,39,P.stone)+d('M99 69Q98 27 128 28Q158 27 157 69L144 48L128 57L113 48Z',P.light));
large('decor.statue','Tượng phù thủy toàn thân','Phù thủy · Trang trí',rect(73,219,110,16,P.stone)+d('M102 82L73 218H183L154 82Z',P.stone)+ellipse(128,58,22,27,P.light)+d('M90 43L126 13L161 43Z',P.stone)+d('M96 104L64 149L81 160L110 126M150 104L183 128L176 147L143 128Z',P.stone)+line(178,105,178,219));
large('decor.grandfather-clock','Đồng hồ đứng cổ','Phù thủy · Trang trí',rect(81,73,94,148)+d('M70 80Q128 3 186 80Z',P.wood)+circle(128,81,36,P.paper)+line(128,81,128,57)+line(128,81,148,95)+rect(97,127,62,76,P.dark)+line(128,132,128,180)+circle(128,183,14,gold)+rect(71,220,114,12,P.light));
large('decor.mirror','Gương lớn chạm cổ','Phù thủy · Trang trí',d('M65 222V83Q128 3 191 83V222Z',P.wood)+d('M79 211V89Q128 25 177 89V211Z',silver)+bead(88,98,80,104)+scroll(128,52)+scroll(68,163)+scroll(188,163));
large('decor.noticeboard','Bảng thông báo lớn','Phù thủy · Trang trí',rect(30,49,196,166,P.wood)+bead(35,54,186,156)+rect(45,64,166,136,P.dark)+[0,1,2,3,4,5].map(i=>g(rect(56+i%3*48,76+Math.floor(i/3)*60,39,49,P.paper,0),`rotate(${i%2?5:-4} ${74+i%3*48} ${96+Math.floor(i/3)*60})`)).join(''));
large('decor.planter-floor','Chậu sàn lớn','Phù thủy · Trang trí',d('M87 159H169L157 230H99Z',P.wood)+bead(98,177,60,39)+[0,1,2,3,4].map(i=>g(d('M128 164Q58 103 94 39Q156 69 128 164Z',i%2?P.green:P.leaf),`rotate(${(i-2)*26} 128 164)`)).join(''));
for(const[id,name,mid]of [['tall','Rèm cửa sổ cao',false],['partition','Rèm phân khu',true],['bed','Rèm giường',false]]){
 let b=rect(23,24,210,9,gold)+d('M31 37H111L91 147L105 227H31Z',P.roof)+d('M145 37H225V227H151L165 147Z',P.roof)+[48,69,91,164,185,207].map(x=>d(`M${x} 45Q${x-7} 113 ${x} 141L${x-6} 216`,'none','stroke="#aebcac"')).join('')+line(40,146,96,146)+line(160,146,216,146);
 if(mid)b+=rect(109,38,38,188,P.light)+line(128,44,128,219);if(id==='bed')b+=d('M25 35Q128 108 231 35V66Q128 131 25 66Z',P.light);
 large('decor.curtain-'+id,name,'Phù thủy · Trang trí',b);
}
// Approved unique objects only. States remain layers within the same asset.
large('unique.pensieve','Pensieve','Độc bản · Đã chọn',d('M103 148H153L163 217H93Z',P.stone)+ellipse(128,219,62,12,P.stone)+d('M50 99Q52 170 128 178Q204 170 206 99Z',P.stone)+ellipse(128,99,80,27,P.light)+ellipse(128,98,65,20,silver)+g(d('M81 97Q105 76 158 93Q182 109 111 108Q96 105 134 94','none','stroke="#e7f2ea" stroke-width="3"'),'')+scroll(128,146));
large('unique.memory-cabinet','Tủ ký ức','Độc bản · Đã chọn',cabinet(173,190)+Array.from({length:5},(_,j)=>rect(55,77+j*29,146,4,P.dark)+Array.from({length:8},(_,i)=>jar(57+i*18,54+j*29,12,19)).join('')).join('')+d('M47 38Q128 7 209 38Z',P.wood));
large('unique.sorting-hat','Sorting Hat trên đôn','Độc bản · Đã chọn',ellipse(128,206,67,14,P.wood)+rect(87,206,10,29)+rect(159,206,10,29)+ellipse(128,175,92,23,P.wood)+d('M64 174L91 112L111 79L105 38L152 24L142 53L159 98L190 174Z',P.wood)+d('M91 129Q107 112 120 122M133 122Q147 109 161 129M109 149Q131 133 153 150M91 113L133 102L158 111'));
large('unique.goblet-fire','Goblet of Fire','Độc bản · Đã chọn',rect(74,217,108,16,P.stone)+rect(108,161,40,57,P.wood)+d('M71 86H185Q183 163 128 173Q73 163 71 86Z',P.wood)+ellipse(128,86,57,15,P.dark)+d('M101 86Q80 54 112 24Q104 58 132 40Q160 14 157 56Q186 74 160 87Z','#9dc1c5')+d('M97 111L107 142M123 107L127 153M153 110L146 142'));
large('unique.triwizard-cup','Triwizard Cup','Độc bản · Đã chọn',rect(76,217,104,14,P.dark)+rect(107,198,42,19,silver)+rect(120,144,16,54,silver)+d('M83 63H173L161 129L128 151L95 129Z',silver)+d('M83 78Q31 36 41 102Q47 143 101 130M173 78Q225 36 215 102Q209 143 155 130','none','stroke-width="7"')+d('M98 77L107 120L128 136L149 120L158 77',P.water)+star(128,101,17));
large('unique.weasley-clock','Đồng hồ gia đình Weasley','Độc bản · Đã chọn',rect(83,126,90,98,P.wood)+rect(72,218,112,14,P.light)+d('M61 133V75Q61 19 128 16Q195 19 195 75V133Z',P.wood)+circle(128,85,57,P.paper)+[0,1,2,3,4,5,6,7,8].map(i=>g(d('M128 85L124 47L128 35L132 47Z',i%2?P.wood:gold),`rotate(${i*39} 128 85)`)).join('')+circle(128,85,8,P.dark)+rect(101,155,54,49,P.dark)+line(128,160,128,188)+circle(128,190,9,gold));
large('unique.vanishing-cabinet','Tủ Biến mất','Độc bản · Đã chọn',rect(59,68,138,155,P.wood)+d('M51 70Q53 32 78 42Q96 11 128 20Q160 11 178 42Q203 32 205 70Z',P.wood)+rect(69,80,118,131,P.dark)+d('M69 80L131 93V225L69 211Z',P.wood)+bead(77,100,43,96)+circle(118,156,4,gold)+scroll(128,49)+rect(51,223,154,10,P.light));
large('wizard.astronomy-cabinet','Tủ dụng cụ thiên văn','Phù thủy · Tủ kệ',cabinet(176,188)+rect(53,53,150,149,P.roof)+circle(129,99,39,'none')+ellipse(129,99,39,16,'none')+circle(129,99,11,gold)+rect(53,146,150,5,P.wood)+closedBook(65,174,112)+jar(71,153,22,26));
large('wizard.storage-top','Tủ cổ · mặt bằng','Nội thất · Mặt bằng',rect(35,86,186,84)+rect(43,95,170,65,P.light)+line(128,95,128,160)+rect(114,108,7,32,gold)+rect(135,108,7,32,gold),'top');
large('wizard.display-top','Tủ kính · mặt bằng','Nội thất · Mặt bằng',rect(35,86,186,84)+rect(44,96,168,63,P.water)+line(128,96,128,159)+rect(102,111,52,31,P.light),'top');
large('decor.rug-runner','Thảm dài cổ','Phù thủy · Trang trí',rect(66,19,124,218,P.roof,0)+bead(73,26,110,204)+[0,1,2].map(i=>g(d('M128 55L156 81L128 107L100 81Z',P.light),`translate(0 ${i*53})`)).join(''),'top');
large('decor.chandelier','Đèn chùm nến lớn','Phù thủy · Trang trí',line(128,17,128,112)+circle(128,111,12,gold)+d('M49 119Q128 206 207 119M78 94Q128 148 178 94','none',`stroke="${gold}" stroke-width="5"`)+[49,78,128,178,207].map((x,i)=>rect(x-5,i%2?56:83,10,35,P.paper)+d(`M${x} ${i%2?52:79}q-10-12 0-22q10 10 0 22Z`,'#c29451')).join('')+ellipse(128,183,26,7,gold));
for(const [id,name,material]of [['stone','Thân nhà · đổi vật liệu',P.stone]]){large('module.house-body-'+id,name,'Nhà cửa · Module ghép',rect(35,75,186,150,material,0)+[0,1,2,3,4].map(i=>line(35,95+i*27,221,95+i*27)).join(''));assets.at(-1).ports=[{id:'roof',x:128,y:75},{id:'door',x:128,y:225}];}
// Heraldic emblems: original simplified illustrations, not reproductions of official artwork.
const lion=d('M101 141Q78 126 88 104Q98 88 116 96L130 88L145 101L140 120L157 134L147 153H119L110 183H89L100 160Z',gold)+d('M148 148Q194 183 193 125Q190 96 174 111','none',`stroke="${gold}" stroke-width="9"`)+circle(115,108,3,P.dark)+d('M91 102L98 84L114 94M118 152L141 185H161','none',`stroke="${gold}" stroke-width="9"`);
const eagle=d('M128 107L110 91L117 77L135 76L149 91L138 107L147 157L128 179L109 157Z',gold)+d('M112 118L67 79L48 76L64 134L106 153M144 118L189 79L208 76L192 134L150 153',gold)+d('M71 96L104 137M185 96L152 137M118 155L103 182M138 155L153 182');
const badger=d('M78 166Q58 139 86 116L112 95L139 98L174 122L188 147L176 162L144 157L126 178H90Z',P.paper)+d('M120 104L145 106L171 134L151 147L133 129Z',P.dark)+circle(165,136,3,P.dark)+d('M93 165L89 181M121 168L127 183','none','stroke-width="8"');
const snake=d('M164 92Q95 67 86 112Q85 141 139 137Q181 135 170 165Q150 192 96 173M165 92L184 88L174 105','none',`stroke="${silver}" stroke-width="13"`)+circle(172,94,2,P.dark);
const wands=d('M84 167L164 78M172 167L92 78','none',`stroke="${gold}" stroke-width="6"`)+[[-13,-12],[0,-28],[13,-12]].map(([x,y])=>star(91+x,74+y,5)+star(165+x,74+y,5)).join('');
const doubleEagle=eagle+d('M115 95L99 80L106 67L123 69L128 82L133 69L150 67L157 80L141 95Z',gold)+d('M109 176L96 197M147 176L160 197')+d('M106 190L128 207L150 190',silver);
const houses=[['gryffindor','Gryffindor','#813e37',gold,lion],['ravenclaw','Ravenclaw','#3e6077','#ad8652',eagle],['hufflepuff','Hufflepuff','#c3a554','#493e31',badger],['slytherin','Slytherin','#3b6554',silver,snake],['beauxbatons','Beauxbatons','#789fb3',gold,wands],['durmstrang','Durmstrang','#74433a',gold,doubleEagle]];
for(const[id,name,bg,trim,motif]of houses){
 const emblem=d('M58 53Q128 35 198 53V132Q194 184 128 218Q62 184 58 132Z',bg)+d('M66 61Q128 46 190 61V131Q185 178 128 207Q71 178 66 131Z','none',`stroke="${trim}" stroke-width="3"`)+motif;
 large('crest.'+id,'Huy hiệu '+name,'Cờ · Huy hiệu',emblem);
 // Shared banner construction, identity supplied by data. One shape per format.
 const a=assets.at(-1);a.identity=id;a.canonBasis=id==='ravenclaw'?'Book eagle/blue-bronze':id==='beauxbatons'?'Book crossed wands; original heraldic layout':id==='durmstrang'?'Film-inspired double eagle; simplified, not exact crest':'Book identity; original heraldic illustration';
}
const bannerFormats=[['vertical','Cờ treo dọc',d('M62 38H194V222L128 201L62 222Z',P.roof)+rect(49,28,158,10,gold)],['forked','Cờ đuôi chẻ',d('M62 38H194V229L128 188L62 229Z',P.roof)+rect(49,28,158,10,gold)],['pole','Cờ trên cán',rect(42,30,8,199,P.wood)+circle(46,23,6,gold)+d('M51 42H218V170L134 157H51Z',P.roof)],['plaque','Tấm huy hiệu treo tường',rect(45,35,166,190,P.wood,12)+bead(50,40,156,180)+rect(59,49,138,162,P.roof,9)],['tapestry','Thảm treo mang huy hiệu',rect(49,30,158,194,P.roof,0)+bead(57,38,142,178)+rect(38,23,180,8,gold)+Array.from({length:13},(_,i)=>line(55+i*12,224,55+i*12,236)).join('')]];
for(const[id,name,b]of bannerFormats){large('banner.'+id,name,'Cờ · Khung dùng chung',b);assets.at(-1).identitySlot={allowed:houses.map(h=>h[0]),region:id==='pole'?[65,54,133,105]:[76,69,104,124]};}
// Upgrade existing interior objects without cloning them into alternate colors.
for(const a of assets){
 a.visibility=a.id.startsWith('accessory.')?'internal':'main';
 a.mount=a.category.includes('Tủ')||a.view==='front'?'wall':'floor';
 a.clearance={front:24,side:8,unit:'design-unit',requiresSceneValidation:true};
 a.recommendedDisplay={width:a.visibility==='internal'?36:a.id.startsWith('cluster.')?100:150,unit:'css-px'};
 if(a.id.startsWith('cluster.')){a.mount='surface';a.isAssembly=true;}
 if(a.id.startsWith('unique.'))a.placementPolicy='story-specific; do not scatter as generic furniture';
 // Ornamental trim on existing substantial furniture.
 if(['seat.armchair','seat.sofa','seat.lounge','seat.corner','table.desk','table.dining','table.round','object.chest','object.portrait','object.mirror','object.clock','object.rug','object.rug-round','storage.cabinet','storage.display','storage.files'].includes(a.id)){
  const decoration=a.id.startsWith('seat.')?d('M87 101Q128 85 169 101M88 153Q128 168 168 153','none',`stroke="${gold}" stroke-width="1"`):a.id.startsWith('table.')?scroll(128,128):a.id.startsWith('storage.')?scroll(128,45):scroll(128,78)+scroll(128,181);
  a.svg=a.svg.replace('</svg>',`<g data-layer="ornament" stroke="${ink}" stroke-width="1.2" fill="none">${decoration}</g></svg>`);a.upgraded=true;
 }
}
// Reclassify decorative front views that were incorrectly labelled top in the initial catalog.
for(const id of ['object.portrait','object.mirror','object.clock'])assets.find(a=>a.id===id).view='front';
return {houses:houses.map(([id,name,bg,trim])=>({id,name,bg,trim})),bannerFormats:bannerFormats.map(x=>x[0])};
}
