# /MAP — hợp đồng và cơ chế cố định

## Luồng

`/map → WzW Runtime/Gemini đọc context và atlas → HTML shell + MAP_DATA → Preview tải engine từ GitHub qua jsDelivr ghim commit → kiểm dữ liệu → local template hoặc hybrid → UI cố định`.

GitHub lưu code, artwork, template và dữ liệu tĩnh. Browser chạy engine. Gemini quyết định sự thật RP, NPC/nhóm, hoạt động, quest, quote và quyền biết. Không để Gemini sinh lại SVG/CSS/khung web mỗi lượt.

## Gemini đọc dữ liệu thế nào

1. Đọc diễn biến/correction đã chấp nhận gần nhất, status bar, vị trí PC và ngày giờ RP. Không dùng ngày tháng thật của máy.
2. Đọc NPC card, timetable/đời sống NPC, ràng buộc di chuyển và những sự kiện hiện tại. Được mô phỏng sự hiện diện hợp lý theo cơ chế campaign; không teleport vì lịch trình dự kiến, không ghi đè dữ kiện cảnh mới hơn.
3. Chỉ đọc quest pack của tháng RP hiện tại để chọn hint. Tỷ lệ main/side/pool/life do campaign quy định; không cố lấp đầy quota.
4. Đối chiếu atlas canon và lớp AU đã chấp nhận. Khóa khu trên tầng, quan hệ gần/giáp/nối, không ép tọa độ canon. Sách/phim/game và phần bổ sung thiết kế phải phân biệt nguồn. Atlas mới do phiên khác cung cấp; schema không phụ thuộc vào chỉ 13 template.
5. Chọn cửa sổ không gian quanh PC và lộ trình; chỉ giữ các địa điểm kề có liên quan. Phòng/hành lang là place độc lập khi PC/actor ở đó; cửa/tường là cấu kiện, không mặc định thành địa điểm.
6. Lọc knowledge gate riêng cho kiến trúc, người hiện diện, hoạt động và hint. Không gửi hidden state xuống browser để giấu bằng CSS.
7. Xuất JSON theo runtime/map-data.schema.json. Quote là một câu ngắn vui/humor, được gợi chuyện bên lề công khai; không bật mí sự tồn tại bí mật chưa có dấu hiệu.

## Gói dữ liệu phải có

| Nhóm | Nội dung |
|---|---|
| schemaVersion, atlasVersion | Phiên bản hợp đồng/atlas đã chọn; không tự đoán ID mới của atlas |
| campaignId, worldId, snapshotId | Campaign, thế giới/AU, lượt dữ liệu |
| meta | Ngày/giờ RP, tên vùng, quote tối đa 180 ký tự |
| view | scopeId, loại không gian, auto/template/generated, templateId gợi ý nếu biết, PC center, lộ trình cục bộ, ngân sách locality |
| focus | ID actor PC và nơi PC thực sự đứng; selectedId công khai nếu có |
| places | ID ổn định, tên, atlasRef nếu có, chức năng, khu cha/tầng/hướng nếu đã biết; inspector và recipe khi cần |
| connections | Hai đầu nối, kiểu kết nối, trạng thái; không suy từ khoảng cách màn hình |
| actors | PC + tối đa 10 tag NPC/nhóm/cộng đồng; vị trí, tagType, role/onPatrol, đứng/đi, hoạt động, ưu tiên và căn cứ hiện diện |
| hints | Tối đa 6; ID quest nguồn, packId tháng hiện tại, place, loại, tên gợi mở, ưu tiên, inspector công khai |
| visibility | Nơi được thấy và vùng sương công khai; fogRegionIds chỉ là region token không chứa tên/ID bí mật |
| questPolicy | Tháng RP, packId, quota nguyên main/side/pool/life tổng không quá 6 |
| layout | scopeKey, version, stateRef nếu đã có; không đổi version mỗi lượt |

`atlasRef` là ID địa điểm có ý nghĩa trong atlas. `place.id` là ID ổn định trong world/campaign. ID SVG/click do adapter tra; Gemini không cần biết tọa độ hoặc tên shape.

Locality mặc định đề xuất: 1 bước quan hệ từ PC, tối đa 12 place; guard schema hiện cho 0–2 bước và 1–20 place. Đây là ngân sách kỹ thuật có thể điều chỉnh, không phải tuyên bố lâu đài chỉ có bấy nhiêu phòng. `maxHops` xét quan hệ vị trí đã biết, không cấp quyền đi qua cửa bị chặn. Có thể gửi ít hơn giới hạn.

## Quy tắc actor và hint

- PC riêng, ngoài tối đa 10 tag NPC; một nhóm/cộng đồng tính một tag. Không gửi cả tag nhóm và các thành viên để đếm/hiển thị trùng. Ưu tiên đang tương tác → gần PC → liên quan → người nền; không bắt đủ 10.
- Mỗi actor bắt buộc tagType trong palette UI. Không gửi màu/HTML. Engine chọn đúng màu; prefect chỉ override patrol khi đang tuần. Group hỗn hợp dùng crowd nếu không có nhận diện chung được xác lập.
- Vị trí đặc biệt cần positionMode và lý do. Animagus không tự xuyên tường: cần khe, ống, đường hầm hoặc phép hợp lý; không lộ danh tính bí mật qua tag.
- Inspector cho place/actor/hint có overhear (ai/nhóm đang làm gì, không spoil) và observation (bối cảnh ngắn). Ai đó lấy từ actor đang ở nơi được chọn. Hóng hớt tám phương chỉ liệt kê tên gợi mở và nơi.
- Hint phải từ tháng RP hiện tại; side/hidden/pool/main không tự kích hoạt vì click. Hidden chỉ thể hiện dấu hiệu đã qua gate, không gửi mục tiêu, đáp án hoặc nhãn bí mật xuống browser.
- Click chỉ chọn/xem. Footsteps chỉ minh họa; không di chuyển actor, tiến thời gian hoặc nhận quest.

## Cách chọn template / hybrid

1. Kiểm schema, tham chiếu, cap, tháng/pack và locality. Dữ liệu sai thì lỗi rõ, không dựng map khác để che lỗi.
2. Adapter tra atlasRef → templateId + interactiveIds. Registry hiện tại là runtime/templates.json, chỉ bao phủ mapping đã có; sẽ cần cập nhật khi atlas phiên khác sẵn sàng.
3. Nếu tất cả place đang hiển thị có mapping trong một template: chọn template và trả danh sách target cục bộ. Bắt buộc crop/mask vùng PC trước khi mount; không mở cả tầng.
4. Nếu thiếu mapping: auto dùng generated khi có recipe; template bắt buộc nhưng không khớp thì báo lỗi. Không dùng tên tương tự để đoán nhầm template.
5. Hybrid dựng mặt bằng phòng/tường/lối đi. Nội thất/decor có thể top/front/2.5D. AI gửi công dụng, số lượng/cụm đồ và hình dạng yêu cầu; engine chọn base/asset, màu instance và lối đi thông thoáng.
6. Render các lớp: kiến trúc → decor → actor/footsteps → hint/UI/visibility. Không có nhãn địa điểm dạng ribbon. Không chèn text RP bằng innerHTML.

## Seed và lưu bố cục

Khóa: `worldId + scopeId + layout.scopeKey + layout.version`. Seed SHA-256 từ khóa, không phụ thuộc snapshot, giờ, NPC, quote hay thứ tự các mảng.

Bố cục đã lưu là nguồn đúng, gồm thuật toán/phiên bản, seed và geometry từng room ID. Thêm phòng chỉ dùng vùng dự trữ; không dịch phòng cũ. Hết chỗ thì cần mở rộng có kiểm soát. Actor/hint biến mất không xóa phòng. Không tự tăng layout.version để xáo lại map.

Host phải lưu bền và serialize cập nhật. Có thể cần export/import state qua Preview mới; chưa chốt backend lưu trữ. Không dùng trí nhớ văn bản của Gemini để nhớ tọa độ. Không chỉ dựa localStorage của một Preview origin.

prepare-map.mjs chỉ gọi callbacks và kiểm không đổi room cũ/seed; chưa tự sinh hình học. Chỉ trả geometry cục bộ được phép hiển thị cho viewer, không xuất toàn bộ tầng đã lưu.

## Giữ UI và trạng thái triển khai

UI chuẩn nằm nguyên trong ui/, không thiết kế lại. Giữ hai thanh, palette, ribbon nhân vật, PC viền vàng, patrol đỏ/viền xám, crowd, footsteps và các mục sidebar đã duyệt. Reduced motion dùng hai dấu đứng thay opacity chậm.

Đã có trong đợt này: schema; 2 fixture; validator; serialization an toàn; template registry; resolver/render plan; seed/key; adapter persistence; tests.

Còn phải triển khai: atlas adapter mới; đo vùng/crop template; UI mount; renderer hình học phòng/hành lang; collision/ports và vùng dự trữ; storage thật; actor/hint placement; fog; browser bundle/HTML shell; kiểm AI Studio Preview. Không gọi đây là engine /MAP đã hoàn tất.
