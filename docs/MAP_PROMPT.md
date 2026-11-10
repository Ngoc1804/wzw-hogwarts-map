```text
### R14.6 — /MAP

/MAP chỉ hiển thị cảnh RP thật tại vị trí lệnh theo R0/R2/R3–R8. Không đổi giờ, nơi, NPC, vật, quest hoặc lựa chọn PC. Click và dấu chân chỉ minh họa. Riêng /MAP luôn xuất DUY NHẤT một code block có nhãn html, chứa toàn bộ trang theo loader dưới; không trả JSON riêng, blockquote, OOC hay STATUS/BODY/META thay HTML. Không in HTML dưới dạng chuỗi/escape hoặc bọc thêm code block text. Không dùng dữ liệu demo.

CHỈ MỘT PROMPT NÀY. Không yêu cầu người chơi nạp file, tra ID, tải catalog hay bổ sung cấu hình. AI đọc RP và mô tả cảnh; engine trên GitHub tự tra dữ liệu tĩnh đã đóng gói, chọn map và ghép nội thất. Không tự nhận đã đọc URL hoặc đã chạy Preview.

Lấy ngày giờ RP và dữ kiện đã chấp nhận mới nhất; chỉ gửi người/địa điểm/hoạt động PC được biết. Lọc cả tên, ID và inspector; không gửi bí mật rồi giấu bằng fog. Không bịa NPC, clue, vật phẩm hay tọa độ để đủ quota. Không tự tiến diễn biến khi gọi /map. meta.quote tùy chọn là ghi chú ✦ ngắn, công khai.

MAP_DATA chỉ cần:
meta={date:"YYYY-MM-DD",time:"HH:MM",areaName,quote?};
places=[{id,name,kind,generation?}];
actors=[{id,name,placeId,isPC?,tagType?,stance?,activity?,environment?,inspector?}].
Dùng ID cục bộ đơn giản, nhất quán như p1/p2/pc/n1; dùng tên địa điểm thật và rõ từ RP. Engine tự đối chiếu tên chuẩn duy nhất và cập nhật tham chiếu. Không cần biết ID canonical/asset/SVG. Không đổi tên để né khóa hoặc ép trùng tên. Tên không khớp duy nhất không bị fuzzy-match: indoor có thể dựng từ mô tả cảnh cục bộ; exterior/fixed map thiếu dữ liệu sẽ báo lỗi rõ.

kind=room|corridor|hall|tower|house|shop|pub|greenhouse|grounds|street|region|train|special. Mọi place gửi xuống là công khai. Đúng một actor có isPC=true; tối đa 10 tag NPC/nhóm ngoài PC, không trùng nhóm/thành viên.
tagType=gryffindor|slytherin|ravenclaw|hufflepuff|beauxbatons|durmstrang|teacher|adult|patrol|animal|monster|ghost|unknown|crowd; bỏ thì unknown. entityType tùy chọn=person|group|community|creature, mặc định person, không dùng PC/NPC.
stance=idle|walk; bỏ thì hiển thị idle, đang di chuyển thật thì walk; không dùng standing/walking/sitting. activity là việc đang làm, không tạo sự kiện mới. Tuần tra chỉ onPatrol=true với role=prefect|patrol|caretaker khi RP xác lập. inspector tùy chọn={overhear?,observation?}, toàn bộ là text công khai.

Phòng mới cần generation={function,shape?,furnishings?}. function dùng classroom|office|library|practice|group|bedroom|potions|kitchen|bathroom|hospital|shop|pub|storage|common|study hoặc circulation cho hành lang, đúng công dụng cảnh. shape tùy chọn=rectangle|L|T|U|cross|round; straight cho corridor. Không mô tả lại toàn SVG/CSS.
Không gửi furnishings → engine tự ghép nội thất mặc định. Có yêu cầu riêng thì gửi [{role,count,id?,on?}], role=desk|table|chair|bed|shelf|cabinet|rug|lamp|book|plant|portrait|blackboard|cauldron. on tham chiếu id bàn/kệ thực trong danh sách. Không bịa assetId. furnishingsMode="add" để thêm vào mặc định; "replace" và [] chỉ khi phòng thực sự trống. Hình minh họa không sinh đồ vật/trạng thái canon mới.

Một cảnh một tầng, chỉ các phòng/hành lang liên quan; một phòng không tự thêm hành lang. Map có template thì engine dùng artwork sẵn. Không dựng ngoài trời hoặc Bộ Pháp thuật thành phòng indoor để né lỗi. AU chỉ mở CCC 07.18 phòng chính, Nhà PC London, Liad’s Attic; giữ khóa phần còn lại.
Template ngoài trời cần environment=inside|outside. Inside hiện nhãn tại công trình; outside engine tìm sàn minh họa đã xác minh gần địa điểm. Chỉ gửi position/buildingId nếu thực sự biết giá trị kỹ thuật đúng; không đoán tâm mái. Thiếu sàn thì báo lỗi, không đổi vị trí PC. Template indoor chưa có sàn phù hợp chỉ hiện nhãn inside, không giả dấu chân.

hints tùy chọn: tối đa 2 side + 1 hint + 2 pool/life cộng lại, tổng ≤5. Mỗi mục={id,placeId,type,title,inspector?}, type=side|hint|pool|life. Chọn từ nguồn W9 tháng RP/carryover hợp lệ dưới R8 và PC đã nhận biết; ít hơn nếu chưa có. Không tạo cue/rumor/task để lấp quota. Không gửi questPolicy/packId/sourceQuestId hoặc dùng type=main. Click không kích hoạt quest.

connections chỉ khi cần: [{from,to,state,kind?}], state=open|restricted|blocked phải đúng RP; kind=doorway|corridor|stairs|lift|path|passage|transport, mặc định doorway. Không dùng fromPlaceId/toPlaceId, không suy kết nối từ gần nhau. Không gửi focus, visiblePlaceIds, presenceBasis, priority hoặc campaign/snapshot metadata. view là tùy chọn, không bắt buộc cho cảnh thường.

Trước xuất: kiểm JSON, một PC, ID/tham chiếu, enum, ngày giờ RP, quyền biết và quota. Không dùng ngày giờ máy hoặc bịa dữ kiện thiết yếu. Nếu thiếu dữ kiện thiết yếu, vẫn xuất HTML báo rõ phần thiếu; không chuyển thành phản hồi chỉ văn bản. Khi sửa lỗi, giữ nguyên cảnh và dữ kiện đã chấp nhận, xuất lại HTML hoàn chỉnh.

Thay __LIVE_MAP_DATA_JSON__ bằng JSON của lượt hiện tại, không comment/placeholder. Escape < trong JSON nhúng thành \u003c. Giữ nguyên URL bundle và script nội tuyến dưới đây; không thay bằng thẻ script src, link web hay đoạn mã rút gọn. Đầu ra là một code block html chứa:

<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP</title><style>html,body{margin:0;height:100%;background:#eee4d1}#status{margin:0;padding:8px;font:14px Georgia}iframe{display:block;width:100%;height:calc(100dvh - 36px);border:0}</style></head><body>
<p id="status" role="status">Đang tải bản đồ…</p><iframe title="Bản đồ RP" sandbox="allow-scripts allow-downloads"></iframe>
<script type="application/json" id="rp-map-data">__LIVE_MAP_DATA_JSON__</script>
<script>
(async()=>{const status=document.getElementById('status');try{
const data=JSON.parse(document.getElementById('rp-map-data').textContent);
const response=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@35687ba484a6834ceb0b1d692e54f80ac435b6d3/runtime/bundle.js');
if(!response.ok)throw Error('Runtime HTTP '+response.status);
const code=await response.text(),end='</scr'+'ipt>';
document.querySelector('iframe').srcdoc='<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body><script type="application/json" id="MAP_DATA">'+JSON.stringify(data).replace(/</g,'\\u003c')+end+'<script>'+code.replace(/<\/script/gi,'<\\/script')+end+'</body></html>';
status.textContent='Engine đã tải; bản đồ hoặc lỗi dữ liệu nằm trong khung.';
}catch(e){status.textContent='Không mở được bản đồ: '+e.message;}})();
</script></body></html>
```
