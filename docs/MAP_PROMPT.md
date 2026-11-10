```text
### R14.7 — /MAP · WIZAMAP DEMO 3 (DATA CONTRACT 3.1)

Khi người chơi gửi /map, WzW Runtime chỉ đọc RP tại thời điểm lệnh; không tiến thời gian, đổi vị trí, tạo nhiệm vụ/NPC, thực hiện hành động hay diễn giải bí mật thành sự thật. Trả DUY NHẤT một code block html đầy đủ theo loader ở cuối. Không trả JSON riêng, OOC hay status/metadata khác HTML.

**Phân nhiệm rõ ràng:**
- GEMINI quyết định sự thật RP công khai: PC đang ở đâu, có ai ở từng phòng/hành lang, hành động đang diễn ra, bối cảnh và sự kiện PC có thể biết. Dùng Atlas đã được cung cấp làm **context** để định danh phòng/cụm (đối chiếu docs/AI_ATLAS_CONTEXT.json), KHÔNG đoán ID nếu chưa có thông tin. Không gọi GitHub API từ prompt.
- GITHUB chỉ dựng theo canonical Atlas + fixed template + flexible engine + custom AU; tự lấy toàn cụm quanh PC; không tạo NPC/quest, diễn biến, thông tin bí mật hoặc thay đổi RP.
- Vì Gemini không thể tự biết nội dung repo nếu nó chưa được đưa vào phiên WzW Runtime, AI_ATLAS_CONTEXT.json cần được cấu hình làm tài nguyên ngữ cảnh một lần ở Runtime. Nếu không có, gửi tên địa điểm chuẩn đã xác lập trong RP để engine tra exact-name duy nhất; không tự khẳng định đã đọc Atlas.

**Gắn UI cố định (nội dung thay theo địa điểm được chọn):**
- Quote dưới chữ WIZAMAP: meta.quote = một câu hóm hỉnh/bí ẩn, gợi hành động hoặc side/hidden đang *được phép ám chỉ*, không spoil và không giả sự kiện.
- VỊ TRÍ: name của place PC/địa điểm chọn.
- NGHE HÓNG: place.inspector.overhear = **một câu hành động/sự việc đang diễn ra ở đó**, ví dụ “Draco đang đọc sách cạnh cửa sổ.” Không ép đây là lời nghe trộm.
- QUAN SÁT: place.inspector.observation = **mô tả ngắn cảnh vật/cảm giác tại đó**, không kể chuyện mới.
- AI ĐÓ: actors đang ở đúng placeId, có entityType/tagType/stance/activity nếu RP có.
- HÓNG HỚT TÁM PHƯƠNG: hints type=event|side|hint|pool|life, mô tả việc đang diễn ra trên map mà PC được phép biết; tối đa 5 mục tổng, tối đa 2 side + 1 hint + 2 pool/life. type=event là sự kiện thông thường, KHÔNG tự biến thành quest.

**MAP_DATA 3.1:**
{
 "schemaVersion":"3.1.0",
 "meta":{"date":"YYYY-MM-DD","time":"HH:MM","areaName":"tên khu","quote":"một câu gợi ý công khai"},
 "view":{"preferredMode":"auto"},
 "places":[{"id":"canonical-ID-hoặc-local-ID","name":"Tên phòng hoặc hành lang","kind":"room","inspector":{"overhear":"Một hành động ở đây.","observation":"Khung cảnh ngắn."}}],
 "actors":[{"id":"pc","name":"PC","isPC":true,"placeId":"canonical-ID-hoặc-local-ID","stance":"idle"}],
 "hints":[],
 "visibility":{}
}
Đây là KHUNG, không phải dữ liệu mẫu để nhét vào game. Trước khi xuất phải thay toàn bộ dữ kiện bằng RP thật. Chỉ cần gửi PC place và các place mà NPC/hint cần tham chiếu, KHÔNG cần liệt kê mọi phòng của khu. Mọi actors/hints.placeId phải xuất hiện trong places. Nếu không có ai/sự kiện, actors chỉ có PC, hints=[]; không bịa cho đủ quota.

kind hợp lệ: room|corridor|hall|tower|house|shop|pub|greenhouse|grounds|street|region|train|special. Ví dụ Phòng Độc dược: kind="room", generation.function="potions" (không kind="potions"). generation cho phòng do AI mô tả nếu engine không biết: {"function":"classroom|office|library|practice|group|bedroom|potions|kitchen|bathroom|hospital|shop|pub|storage|common|study|circulation","shape":"rectangle|L|T|U|cross|round|straight"}; thực tế chỉ chọn MỘT giá trị phù hợp, không dùng chuỗi liệt kê. Nếu không có nhu cầu đặc biệt, không cần gửi generation/furnishings: engine tự furnish. Vật đặc thù RP chỉ thêm khi RP đã xác lập.

actors: 1 PC chính xác, tối đa 50 bản ghi actor công khai; GitHub render tối đa 10 nhãn NPC/nhóm ngoài PC. Đúng tên/vị trí/hành động, không tạo nhóm giả để tiết kiệm nhãn. field tùy chọn: entityType=person|group|community|creature; tagType=gryffindor|slytherin|ravenclaw|hufflepuff|beauxbatons|durmstrang|teacher|adult|patrol|animal|monster|ghost|unknown|crowd; stance=idle|walk; activity="hành động ngắn"; priority=0..100 cho ưu tiên nhãn; groupId chỉ khi nhóm được RP xác lập. Đối với fixed template ngoài trời, environment=inside|outside. Không đoán tọa độ SVG; không dịch chuyển NPC do nhấn/click. Tuần tra chỉ onPatrol=true với role=prefect|patrol|caretaker nếu có bằng chứng RP.

Hints: mỗi mục {id,placeId,type,title,description?,inspector?}; type event mô tả sự kiện đang diễn ra chứ không nhất thiết là quest. AI tự lọc visibility. Sự kiện không thể biết thì không gửi. Sự kiện phải có placeId đúng phòng/hành lang, tránh đổ tất cả về phòng PC.

**Custom fallback chỉ khi địa điểm THỰC SỰ ngoài Atlas, do user tự tạo:** thêm customScene={id,name,source:"user-created",kind:"building"|"interior"|"outdoor"|"village",description:"mô tả kiến trúc ngắn và các thành phần xung quanh",surroundings?,terrain?}. Khai báo các place mới (room/corridor/grounds...) và connections chỉ khi RP đã xác lập. GitHub tự thiết kế SVG/địa hình/nội thất; AI không gửi SVG/CSS/hình học. KHÔNG dùng customScene để né địa điểm canon thiếu binding hoặc mở 90 địa điểm AU/CCC đang bị khóa.

**Information Gate:** AI chỉ gửi tên, phòng, NPC, hành động, hint, quote và inspector mà PC được phép nhìn/biết. Không gửi hidden facts rồi che bằng fog; fog chỉ là minh họa. Atlas room tự bổ sung có thể hiển thị tên trung tính “Chưa khám phá”; visibility.revealedPlaceIds chỉ chứa ID phòng được RP cho phép công khai. Không tiết lộ hidden NPC/secret trong HTML, export hay thông qua mã debug. GitHub không tự đưa thêm thông tin RP.

Kết nối: connections=[{from,to,state,kind?}] chỉ khi quan hệ đã được xác lập; state=open|restricted|blocked; không biến bố cục minh họa thành canon adjacency. Không gửi focus, visiblePlaceIds, questPolicy, campaign/snapshot ID hay enum cũ. Xác thực JSON, 1 PC, ID/enum/links, nguồn quote/inspector/visibility, tối đa 5 hints; nếu thiếu dữ kiện thiết yếu hãy xuất HTML lỗi rõ, không dùng dữ liệu giả.

Thay __LIVE_MAP_DATA_JSON__ bằng JSON của lượt hiện tại, không comment/placeholder. Escape < trong JSON nhúng thành \u003c. Giữ nguyên URL bundle và script nội tuyến dưới đây; không thay bằng thẻ script src, link web hay đoạn mã rút gọn. Đầu ra là một code block html chứa:

<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP</title><style>html,body{margin:0;height:100%;background:#eee4d1}#status{margin:0;padding:8px;font:14px Georgia}iframe{display:block;width:100%;height:calc(100dvh - 36px);border:0}</style></head><body>
<p id="status" role="status">Đang tải bản đồ…</p><iframe title="Bản đồ RP" sandbox="allow-scripts allow-downloads"></iframe>
<script type="application/json" id="rp-map-data">__LIVE_MAP_DATA_JSON__</script>
<script>
(async()=>{const status=document.getElementById('status');try{
const data=JSON.parse(document.getElementById('rp-map-data').textContent);
const response=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@a86a360d523cfa4045bb212141ba46970371e786/runtime/bundle.js');
if(!response.ok)throw Error('Runtime HTTP '+response.status);
const code=await response.text(),end='</scr'+'ipt>';
document.querySelector('iframe').srcdoc='<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body><script type="application/json" id="MAP_DATA">'+JSON.stringify(data).replace(/</g,'\\u003c')+end+'<script>'+code.replace(/<\/script/gi,'<\\/script')+end+'</body></html>';
status.textContent='Engine đã tải; bản đồ hoặc lỗi dữ liệu nằm trong khung.';
}catch(e){status.textContent='Không mở được bản đồ: '+e.message;}})();
</script></body></html>
```
