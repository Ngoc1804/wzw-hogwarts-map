// Adjustable indoor formula families. No prebuilt room lists or stored layout state.
export const FORMULAS=Object.freeze({
 horizontal:['Ngang',2],vertical:['Dọc',2],ell:['Chữ L',2],tee:['Chữ T',3],cross:['Ngã tư',4],court:['Chữ U',3],cloister:['Vòng sân trong',4],windows:['Hành lang cửa sổ',2],curved:['Cánh cong',2],tower:['Nối chân tháp',2]
});
export const WALL_HEIGHT=36;
export const rectangle=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
export const ppath=p=>'M'+p.map(v=>v.join(' ')).join('L')+'Z';
const finite=(v,min,max,name)=>{if(!Number.isFinite(v)||v<min||v>max)throw Error(name+' ngoài phạm vi '+min+'–'+max);return v};
function compatible(id,c){return (!c.courtyard||(c.courtyard==='open'?id==='court':id==='cloister'))&&(!c.windows||['windows','court','cloister','curved'].includes(id))&&(!c.curved||id==='curved')&&(!c.tower||id==='tower')&&(!c.branches||FORMULAS[id][1]===c.branches)&&(!c.orientation||c.orientation!=='vertical'||id==='vertical');}
export function selectIndoorFormula(request={},random=Math.random){
 const c=request.constraints||{},known=request.knownStructure,asked=request.layout||'auto';
 if(c.courtyard&&!['open','closed'].includes(c.courtyard))throw Error('Loại sân không hợp lệ');
 if(c.branches&&![2,3,4].includes(c.branches))throw Error('Số nhánh không hợp lệ');
 const validate=id=>{if(!Object.hasOwn(FORMULAS,id))throw Error('Công thức không tồn tại: '+id);if(!compatible(id,c))throw Error('Công thức '+id+' mâu thuẫn ràng buộc');return id};
 if(known){validate(known);if(asked!=='auto'&&asked!==known)throw Error('Yêu cầu mâu thuẫn cấu trúc đã xác lập');return {id:known,source:'known',reason:'Dùng cấu trúc đã xác lập được truyền trong yêu cầu.'};}
 if(asked!=='auto')return {id:validate(asked),source:'explicit',reason:'Dùng công thức được chỉ định, sau khi kiểm ràng buộc.'};
 const candidates=request.candidates||Object.keys(FORMULAS);if(!Array.isArray(candidates)||!candidates.length)throw Error('Thiếu công thức ứng viên');
 candidates.forEach(id=>{if(!Object.hasOwn(FORMULAS,id))throw Error('Ứng viên không tồn tại: '+id)});
 const allowed=candidates.filter(id=>compatible(id,c));if(!allowed.length)throw Error('Không có công thức phù hợp các ràng buộc');
 if(request.strategy==='random'){
  if(request.allowRandom!==true)throw Error('Random chưa được cho phép');const value=random();if(!Number.isFinite(value)||value<0||value>=1)throw Error('Giá trị random không hợp lệ');
  return {id:allowed[Math.floor(value*allowed.length)],source:'random',reason:'Random được cho phép, chỉ chọn trong tập ứng viên hợp lệ.'};
 }
 if(request.strategy&&request.strategy!=='constraints')throw Error('Cách chọn không hợp lệ');
 const preferred=c.tower?'tower':c.curved?'curved':c.courtyard==='closed'?'cloister':c.courtyard==='open'?'court':c.windows?'windows':c.branches===4?'cross':c.branches===3?'tee':c.branches===2?'ell':c.orientation==='vertical'?'vertical':'horizontal';
 return {id:allowed.includes(preferred)?preferred:allowed[0],source:'constraints',reason:'Chọn có điều kiện; không random. AI truyền công thức hoặc ràng buộc, code kiểm và dựng.'};
}
function makeRoom(record,slot,offset,frontage,depth){
 const horizontal=slot.axis==='H',side=slot.side;
 const x=horizontal?slot.x+offset:side==='E'?slot.x-depth:slot.x;
 const y=horizontal?(side==='S'?slot.y-depth:slot.y):slot.y+offset;
 const w=horizontal?frontage:depth,h=horizontal?depth:frontage;
 const r={id:record.id,name:record.name,x,y,w,bottom:y+h,shape:record.shape||'rectangle',doorSide:side};
 r.doorPoint={x:side==='E'?x+w:side==='W'?x:x+w/2,y:side==='N'?y:side==='S'?y+h:y+h/2};
 if(['T','cross'].includes(r.shape)&&frontage<220)throw Error('Phòng T/cộng cần mặt tiền ít nhất 220 để chừa cửa và cổ nối');
 const shapes={L:[[0,0],[.6,0],[.6,.4],[1,.4],[1,1],[0,1]],U:[[0,0],[.3,0],[.3,.55],[.7,.55],[.7,0],[1,0],[1,1],[0,1]],T:[[0,0],[1,0],[1,.4],[.65,.4],[.65,1],[.35,1],[.35,.4],[0,.4]],cross:[[.35,0],[.65,0],[.65,.35],[1,.35],[1,.65],[.65,.65],[.65,1],[.35,1],[.35,.65],[0,.65],[0,.35],[.35,.35]]};
 if(shapes[r.shape])r.poly=shapes[r.shape].map(([a,b])=>{const [u,v]=side==='N'?[1-a,1-b]:side==='E'?[b,1-a]:side==='W'?[1-b,a]:[a,b];return [x+u*w,y+v*h]});
 else if(r.shape==='round'){r.poly=Array.from({length:48},(_,i)=>[x+w/2+w/2*Math.cos(i*Math.PI/24),y+h/2+h/2*Math.sin(i*Math.PI/24)]);r.circular=true;}
 else if(r.shape!=='rectangle')throw Error('Hình phòng không hỗ trợ: '+r.shape);
 return r;
}
export function buildIndoorLayout(request={}){
 const selection=selectIndoorFormula(request),id=selection.id;
 if(request.rooms&&!Array.isArray(request.rooms))throw Error('rooms phải là danh sách');
 const N=request.rooms?request.rooms.length:(request.roomCount??8);finite(N,request.allowEmptyRooms?0:1,60,'Số phòng');if(!Number.isInteger(N))throw Error('Số phòng phải là số nguyên');
 const F=finite(request.roomWidth??300,180,560,'Mặt tiền phòng'),D=finite(request.roomDepth??260,180,520,'Chiều sâu phòng'),C=finite(request.corridorWidth??160,100,240,'Bề rộng hành lang');
 const records=request.rooms?request.rooms.map((r,i)=>({...r,id:r.id||'room-'+(i+1),name:r.name||'Phòng '+(i+1)})):Array.from({length:N},(_,i)=>({id:'room-'+(i+1),name:'Phòng '+String(i+1).padStart(2,'0'),shape:request.roomShape||'rectangle'}));
 if(new Set(records.map(r=>r.id)).size!==N)throw Error('ID phòng trùng');
 for(const r of records){if(typeof r.id!=='string'||typeof r.name!=='string')throw Error('ID và tên phòng phải là chuỗi');if(r.width!==undefined)finite(r.width,180,560,'Mặt tiền phòng');if(r.depth!==undefined)finite(r.depth,180,520,'Chiều sâu phòng');}
 if(!request.rooms&&id==='tower'){records[N-2].name='Thang tháp';records[N-1].name='Gian tháp';}
 const maxF=Math.max(F,...records.map(r=>r.width||F)),maxD=Math.max(D,...records.map(r=>r.depth||D));
 const slots=[],floors=[],rooms=[],voids=[],windows=[],facades=[],thresholds=[];let stair,entrance;
 const floor=(x,y,w,h)=>floors.push(rectangle(x,y,w,h));
 const H=(x,y,length,side)=>slots.push({axis:'H',x,y,length,side});
 const V=(x,y,length,side)=>slots.push({axis:'V',x,y,length,side});
 const entry=(axis,fixed,lo,hi)=>entrance={axis,fixed,lo,hi};
 const length=k=>Math.max(2*maxF,maxD+2*maxF,Math.ceil(N/k)*maxF+maxD);
 if(id==='horizontal'||id==='windows'){
  const L=Math.max(1,id==='windows'?N:Math.ceil(N/2))*maxF;floor(0,0,L,C);H(0,0,L,'S');if(id==='horizontal')H(0,C,L,'N');
  stair={x:-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',0,10,C-10);
  if(id==='windows'){facades.push({axis:'H',fixed:C,lo:0,hi:L});for(let x=F/2;x<L;x+=F)windows.push({axis:'H',x,y:C});}
 }
 if(id==='vertical'){
  const L=Math.max(1,Math.ceil(N/2))*maxF;floor(0,0,C,L);V(0,0,L,'E');V(C,0,L,'W');stair={x:0,y:L,w:C,h:70,orientation:'N'};entry('H',L,0,C);
 }
 if(id==='ell'||id==='tee'||id==='cross'){
  const L=length(id==='cross'?8:4);
  if(id==='ell'){
   floor(-L,0,L+C,C);floor(0,C,C,L);H(-L,0,L,'S');H(-L,C,L-maxD,'N');V(0,C+maxD,L-maxD,'E');V(C,C,L,'W');
   stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
  }else if(id==='tee'){
   floor(-L,0,2*L+C,C);floor(0,C,C,L);H(-L,0,2*L+C,'S');H(-L,C,L,'N');H(C,C,L,'N');V(0,C+maxD,L-maxD,'E');V(C,C+maxD,L-maxD,'W');
   stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
  }else{
   floor(-L,0,2*L+C,C);floor(0,-L,C,2*L+C);
   for(const x of [-L,C]){H(x,0,L,'S');H(x,C,L,'N');}
   for(const [x,side]of [[0,'E'],[C,'W']]){V(x,-L,L-maxD,side);V(x,C+maxD,L-maxD,side);}
   stair={x:0,y:C+L,w:C,h:70,orientation:'N'};entry('H',C+L,0,C);
  }
 }
 if(id==='court'||id==='cloister'){
  const L=length(id==='court'?3:4);floor(0,0,L+2*C,C);floor(0,C,C,L);floor(L+C,C,C,L);
  H(0,0,L+2*C,'S');V(0,C,L,'E');V(L+2*C,C,L,'W');
  if(id==='cloister'){
   floor(0,L+C,L+2*C,C);const half=(L+C)/2;H(0,L+2*C,half,'N');H(half+C,L+2*C,half,'N');
   floor(half,L+2*C,C,C/2);stair={x:half,y:L+2.5*C,w:C,h:70,orientation:'N'};entry('H',L+2.5*C,half,half+C);
   facades.push({axis:'H',fixed:L+C,lo:C,hi:L+C});
  }else{stair={x:0,y:L+C,w:C,h:70,orientation:'N'};entry('H',L+C,0,C);}
  voids.push({poly:rectangle(C,C,L,L),name:id==='court'?'SÂN MỞ':'SÂN TRỜI'});
  facades.push({axis:'H',fixed:C,lo:C,hi:L+C},{axis:'V',fixed:C,lo:C,hi:L+C},{axis:'V',fixed:L+C,lo:C,hi:L+C});
  for(let n=1;n<=3;n++){const p=C+L*n/4;windows.push({axis:'H',x:p,y:C},{axis:'V',x:C,y:p},{axis:'V',x:L+C,y:p});if(id==='cloister')windows.push({axis:'H',x:p,y:L+C});}
 }
 if(id==='curved'){
  const L=length(4),R=Math.max(maxD+C,2*C),steps=24,point=(r,a)=>[r*Math.cos(a),r*Math.sin(a)];
  floor(-L,-R-C,L,C);floor(R,0,C,L);
  floors.push([...Array.from({length:steps+1},(_,i)=>point(R+C,-Math.PI/2+i*Math.PI/2/steps)),...Array.from({length:steps+1},(_,i)=>point(R,-i*Math.PI/2/steps))]);
  H(-L,-R-C,L,'S');H(-L,-R,L,'N');V(R,0,L,'E');V(R+C,0,L,'W');
  stair={x:-L-70,y:-R-C+10,w:70,h:C-20,orientation:'E'};entry('V',-L,-R-C+10,-R-10);
  for(const a of [-1.15,-.7,-.3]){const p=point(R+C,a);windows.push({axis:'D',x:p[0],y:p[1],tx:-Math.sin(a),ty:Math.cos(a)});}
 }
 if(id==='tower'){
  const L=Math.ceil((N-1)/2)*maxF,R=Math.max(maxD,1.5*C);floor(-L,0,L,C);floor(0,0,C,C);H(-L,0,L,'S');H(-L,C,L,'N');
  const chamber=makeRoom({...records.at(-1),shape:'round'}, {axis:'V',side:'W',x:C,y:C/2-R},0,2*R,2*R);chamber.name=records.at(-1).name;chamber.kind='tower';rooms.push(chamber);
  stair={x:-L-70,y:10,w:70,h:C-20,orientation:'E'};entry('V',-L,10,C-10);
 }
 if(id==='cross'){const order=[0,4,2,7,1,5,3,6],copy=[...slots];slots.splice(0,slots.length,...order.map(i=>copy[i]));}
 const ordinary=id==='tower'?records.slice(0,-1):records;
 const groups=slots.map(s=>({...s,records:[],used:0}));
 for(const r of ordinary){const w=r.width||F;const eligible=groups.filter(s=>s.used+w<=s.length+1e-6).sort((a,b)=>a.used/a.length-b.used/b.length);if(!eligible.length)throw Error('Không đủ mặt tiền để đặt phòng '+r.id);eligible[0].records.push(r);eligible[0].used+=w;}
 for(const s of groups){let offset=(s.length-s.used)/2;for(const rec of s.records){const frontage=rec.width||F;rooms.push(makeRoom(rec,s,offset,frontage,rec.depth||D));offset+=frontage;}}
 for(const r of rooms)if(r.circular){const d=r.doorPoint;const sleeve='NS'.includes(r.doorSide)?rectangle(d.x-25,d.y+(r.doorSide==='N'?-5:-15),50,20):rectangle(d.x+(r.doorSide==='W'?-5:-15),d.y-25,20,50);thresholds.push({roomId:r.id,poly:sleeve});}
 rooms.sort((a,b)=>records.findIndex(r=>r.id===a.id)-records.findIndex(r=>r.id===b.id));
 const pts=[...floors.flat(),...rooms.flatMap(r=>r.poly||rectangle(r.x,r.y,r.w,r.bottom-r.y)),...rectangle(stair.x,stair.y,stair.w,stair.h)];const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]);
 return {recipe:id,selection,parameters:{roomCount:N,roomWidth:F,roomDepth:D,corridorWidth:C},rooms,floors,thresholds,floor:floors[0],voids,windows,facades,entrance,stair,bounds:[Math.min(...xs)-55,Math.min(...ys)-110,Math.max(...xs)-Math.min(...xs)+110,Math.max(...ys)-Math.min(...ys)+190]};
}
