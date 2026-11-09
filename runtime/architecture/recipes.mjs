const horizontalRooms=[
 {name:'Lý thuyết Bùa chú',detail:'Sáu bàn học, hai dãy kệ phía tường ngoài; cửa ở phía phải phòng.',x:90,y:92,w:385,bottom:350,side:'top',door:385,kind:'class'},
 {name:'Phòng Giáo sư',detail:'Phòng làm việc có góc đọc; cùng một cửa về hành lang chung.',x:475,y:75,w:385,bottom:350,side:'top',door:770,kind:'office'},
 {name:'Kho dụng cụ',detail:'Kệ và thùng sát tường, chừa khoảng giữa và đường tiếp cận cửa.',x:860,y:105,w:385,bottom:350,side:'top',door:1150,kind:'store'},
 {name:'Thư viện nhỏ',detail:'Kệ sách theo ba vách; bàn đọc ở giữa, cửa lệch khỏi bàn.',x:1245,y:85,w:385,bottom:350,side:'top',door:1535,kind:'library'},
 {name:'Thực hành Biến hình',detail:'Bàn thực hành bố trí về cuối phòng; ngưỡng phía hành lang để trống.',x:90,y:520,w:385,bottom:795,side:'bottom',door:305,kind:'practice'},
 {name:'Phòng học nhóm',detail:'Hai cụm bàn tròn, có lối giữa từ cửa tới cuối phòng.',x:475,y:520,w:385,bottom:810,side:'bottom',door:675,kind:'group'},
 {name:'Gian nghỉ học sinh',detail:'Góc sofa và bàn trà; kệ sách phía tường ngoài.',x:860,y:520,w:385,bottom:788,side:'bottom',door:1035,kind:'lounge'},
 {name:'Phòng y tá tạm',detail:'Hai giường và tủ thấp; lối giữa nối thẳng ra cửa.',x:1245,y:520,w:385,bottom:800,side:'bottom',door:1410,kind:'infirmary'}
];
const names={class:'Lý thuyết Bùa chú',office:'Phòng Giáo sư',store:'Kho dụng cụ',library:'Thư viện nhỏ',practice:'Thực hành Biến hình',group:'Phòng học nhóm',lounge:'Gian nghỉ học sinh',infirmary:'Phòng y tá tạm'};
function roomAt(kind,x,y,w,h,side){return {kind,name:names[kind],detail:'Cửa nối trực tiếp với hành lang; nội thất giữ tỷ lệ theo diện tích phòng.',x,y,w,bottom:y+h,doorSide:side,doorPoint:side==='W'?{x,y:y+h*.55}:side==='E'?{x:x+w,y:y+h*.55}:side==='N'?{x:x+w*.62,y}:{x:x+w*.68,y:y+h}};}
function variantModel(type){if(isExtra(type))return extraModel(type);
 if(type==='vertical'){
  const out=[],left=['class','office','practice','store'],right=['library','group','lounge','infirmary'];
  for(let i=0;i<4;i++){
   const y=100+i*270;out.push(roomAt(left[i],95-(i%2)*25,y,345+(i%2)*25,270,'E'));
   out.push(roomAt(right[i],600,y,350+(i%2)*25,270,'W'));
  }
  return {rooms:out,floor:[[440,100],[600,100],[600,1180],[440,1180]],bounds:[10,15,1045,1255],stair:{x:440,y:1190,w:160,h:70}};
 }
 const out=[
  roomAt('class',80,140,360,260,'S'),roomAt('office',440,115,360,285,'S'),roomAt('library',800,130,400,270,'S'),
  roomAt('practice',80,560,360,260,'N'),roomAt('group',440,560,360,260,'N'),
  roomAt('store',800,560,240,260,'E'),roomAt('office',740,820,300,220,'E'),roomAt('lounge',740,1040,300,220,'E'),
  roomAt('infirmary',1200,560,355,350,'W'),roomAt('library',1200,910,355,350,'W')
 ];
 return {rooms:out,floor:[[80,400],[1200,400],[1200,1260],[1040,1260],[1040,560],[80,560]],bounds:[0,25,1650,1335],stair:{x:20,y:415,w:60,h:130}};
}
function ppath(p){return 'M'+p.map(v=>v.join(' ')).join('L')+'Z'}
const EXTRA_INFO={
 tee:['Chữ T · Cánh lớp học','Trục ngang phân phối sang cánh dọc; các góc giao để trống, phòng bám hai bên từng nhánh.'],
 cross:['Ngã tư · Bốn cánh','Nút giữa nối bốn hướng. Phòng và cửa nằm ngoài vùng giao để giữ lối đi thông suốt.'],
 court:['Chữ U · Sân mở','Ba cánh ôm sân mở về phía nam; hành lang nhìn vào sân, phòng bố trí về phía ngoài.'],
 cloister:['Vòng kín · Sân trong','Bốn hành lang tạo vòng quanh sân trời; có một tiền sảnh và cầu thang ở cánh nam.'],
 windows:['Hành lang cửa sổ','Một phía là các phòng học, phía kia là mặt cửa sổ nhìn ra vườn; không có phòng che mặt lấy sáng.'],
 curved:['Cánh cong · Gallery sân vườn','Đường cong nối tiếp tuyến giữa hai cánh thẳng; các phòng giữ khối chữ nhật, không chia thành múi.'],
 tower:['Chân tháp · Tiền sảnh & thang','Cánh nhà nối qua tiền sảnh tới một gian tháp tròn. Thang riêng đặt ở khớp nối để lên các tầng khác.']
};
function isExtra(type){return Object.hasOwn(EXTRA_INFO,type)}
const rectangle=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
function extraModel(type){
 const out=[],floors=[],windows=[],facades=[],voids=[];let stair,entrance;
 const r=(kind,x,y,w,h,side)=>{const a=roomAt(kind,x,y,w,h,side);out.push(a);return a;};
 const floor=(x,y,w,h)=>floors.push(rectangle(x,y,w,h));
 const entry=(axis,fixed,lo,hi)=>entrance={axis,fixed,lo,hi};
 const Hglass=(y,xs)=>xs.forEach(x=>windows.push({axis:'H',x,y}));
 const Vglass=(x,ys)=>ys.forEach(y=>windows.push({axis:'V',x,y}));
 if(type==='tee'){
  floor(100,400,1200,160);floor(620,560,160,720);
  ['class','office','library','group'].forEach((k,i)=>r(k,100+i*300,400-[280,310,280,300][i],300,[280,310,280,300][i],'S'));
  r('practice',100,560,260,280,'N');r('store',360,560,260,280,'N');r('lounge',780,560,260,280,'N');r('infirmary',1040,560,260,280,'N');
  r('office',300,840,320,220,'E');r('group',300,1060,320,220,'E');r('library',780,840,320,220,'W');r('store',780,1060,320,220,'W');
  stair={x:30,y:415,w:70,h:130,orientation:'E'};entry('V',100,415,545);
 }
 if(type==='cross'){
  floor(80,640,1440,160);floor(720,120,160,1200);
  [80,400,880,1200].forEach((x,i)=>{r(['class','office','library','group'][i],x,360,320,280,'S');r(['practice','store','lounge','infirmary'][i],x,800,320,280,'N')});
  r('group',400,120,320,240,'E');r('library',880,120,320,240,'W');r('office',400,1080,320,240,'E');r('store',880,1080,320,240,'W');
  stair={x:720,y:1320,w:160,h:70,orientation:'N'};entry('H',1320,720,880);
 }
 if(type==='court'||type==='cloister'){
  floor(400,400,960,160);
  const end=type==='court'?1280:1200;
  floor(400,560,160,end-560);floor(1200,560,160,end-560);
  ['class','office','library'].forEach((k,i)=>r(k,400+i*320,100,320,300,'S'));
  const n=type==='court'?3:2,span=(end-560)/n;
  for(let i=0;i<n;i++){r(['practice','store','group'][i],80,560+i*span,320,span,'E');r(['lounge','infirmary','library'][i],1360,560+i*span,320,span,'W');}
  if(type==='cloister'){
   floor(400,1200,960,160);floor(720,1360,320,90);
   r('group',400,1360,320,280,'N');r('office',1040,1360,320,280,'N');
   stair={x:800,y:1450,w:160,h:70,orientation:'N'};entry('H',1450,800,960);
   facades.push({axis:'H',fixed:1200,lo:560,hi:1200});Hglass(1200,[665,880,1095]);
  }else {stair={x:400,y:1280,w:160,h:70,orientation:'N'};entry('H',1280,400,560);}
  facades.push({axis:'H',fixed:560,lo:560,hi:1200},{axis:'V',fixed:560,lo:560,hi:end},{axis:'V',fixed:1200,lo:560,hi:end});
  Hglass(560,[665,880,1095]);Vglass(560,[700,900,1100]);Vglass(1200,[700,900,1100]);
  voids.push({poly:rectangle(580,580,600,end-600),name:type==='court'?'SÂN MỞ':'SÂN TRỜI',plant:true});
 }
 if(type==='windows'){
  floor(100,420,1400,180);
  ['class','office','group','library'].forEach((k,i)=>r(k,100+i*350,120,350,300,'S'));
  facades.push({axis:'H',fixed:600,lo:100,hi:1500});Hglass(600,[230,460,690,920,1150,1380]);
  voids.push({poly:rectangle(100,620,1400,240),name:'VƯỜN NGOÀI CỬA SỔ',plant:true});
  stair={x:30,y:445,w:70,h:130,orientation:'E'};entry('V',100,445,575);
 }
 if(type==='curved'){
  floor(100,440,800,160);floor(1200,900,160,650);
  const point=(radius,a)=>[900+radius*Math.cos(a),900+radius*Math.sin(a)];
  floors.push([...Array.from({length:41},(_,i)=>point(460,-Math.PI/2+i*Math.PI/80)),...Array.from({length:41},(_,i)=>point(300,-i*Math.PI/80))]);
  ['class','office','library'].forEach((k,i)=>r(k,100+i*(800/3),160,800/3,280,'S'));
  r('practice',100,600,400,260,'N');r('group',500,600,400,260,'N');
  r('store',880,900,320,325,'E');r('lounge',880,1225,320,325,'E');r('infirmary',1360,900,340,325,'W');r('library',1360,1225,340,325,'W');
  voids.push({poly:[[930,660],[1040,690],[1120,760],[1165,860],[930,860]],name:'SÂN GÓC CONG',plant:false});
  for(const a of [-Math.PI*.36,-Math.PI*.23,-Math.PI*.1]){const p=point(460,a);windows.push({axis:'D',x:p[0],y:p[1],tx:-Math.sin(a),ty:Math.cos(a)});}
  stair={x:30,y:455,w:70,h:130,orientation:'E'};entry('V',100,455,585);
 }
 if(type==='tower'){
  floor(80,430,1020,160);floor(1100,400,110,220);
  ['class','office','group'].forEach((k,i)=>r(k,80+i*340,140,340,290,'S'));
  ['practice','store','lounge'].forEach((k,i)=>r(k,80+i*340,590,340,280,'N'));
  const st=r('store',1100,180,100,220,'S');st.kind='stairs';st.name='Thang tháp';st.doorPoint.x=1165;st.detail='Lõi thang tại tiền sảnh; nối lên và xuống các tầng của tháp.';
  const chamber=r('library',1210,270,480,480,'W');chamber.name='Gian chính trong tháp';chamber.doorPoint={x:1210,y:510};chamber.poly=Array.from({length:120},(_,i)=>{const a=2*Math.PI*i/120;return [1450+240*Math.cos(a),510+240*Math.sin(a)]});chamber.circular=true;chamber.detail='Một phòng tròn nguyên vẹn ở tầng này, tiếp cận qua tiền sảnh. Không chia phòng thành các múi.';
  windows.push({axis:'H',x:1450,y:270,factor:1.25},{axis:'V',x:1690,y:510,factor:1.25});
  stair={x:10,y:445,w:70,h:130,orientation:'E'};entry('V',80,445,575);
 }
 const pts=[...floors.flat(),...out.flatMap(r=>r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)),...voids.flatMap(v=>v.poly),...rectangle(stair.x,stair.y,stair.w,stair.h)];
 const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 return {rooms:out,floors,floor:floors[0],voids,windows,facades,entrance,stair,bounds:[Math.min(...xs)-55,Math.min(...ys)-110,Math.max(...xs)-Math.min(...xs)+110,Math.max(...ys)-Math.min(...ys)+190]};
}


export {horizontalRooms,variantModel,EXTRA_INFO,isExtra,rectangle,ppath};
