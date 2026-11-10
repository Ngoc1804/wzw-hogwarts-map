# WIZAMAP DEMO 3 — /MAP FLOW

## Kiến trúc cố định, không backend/API RP

`USER /map` → **Gemini WzW Runtime đọc RP + Atlas context đã cung cấp** → JSON `MAP_DATA 3.1` trong HTML shell → jsDelivr tải JS/SVG từ GitHub đã ghim commit → `validate` → `resolveMap` → `buildGeometry/draw` hoặc fixed template → NPC/hints/Inspector → WIZAMAP Preview.

- **AI quyết định sự thật RP**: ngày giờ, vị trí PC, ai ở đâu, hành động, sự kiện, điều PC có thể biết; không tạo facts để lấp quota. GitHub không tạo NPC, nhiệm vụ, lịch trình, lời thoại hay thêm sự kiện.
- **GitHub chỉ render**: exact atlas name/ID, bản đồ có sẵn, phòng/hành lang/cảnh AU mới do người chơi mô tả, SVG/nội thất, đặt nhãn, animation, tương tác.
- `docs/AI_ATLAS_CONTEXT.json` là bản **rút gọn cho WzW Runtime**, không tự gửi tới Gemini nếu chưa cấu hình nó trong ngữ cảnh AI Studio. Có thể dùng exact canonical name đã có trong RP, nhưng tên trùng/không rõ phải được xác định trước khi sinh map.

## Ba cấp chọn bản đồ — luôn dựa trên PC

1. **Fixed template**: PC nằm trên binding đã xác minh → chọn template cụ thể nhất (nhà chung/Đại Sảnh/Bộ/Quidditch/Hogsmeade, H2 trước H1 khi hợp lệ). `places` khác trong input không được tước template của PC.
2. **Atlas full locality**: PC không có fixed template nhưng nằm trong nhóm Atlas được mở → lấy tất cả phòng/hành lang thuộc **đúng scopeId và tầng/hướng**, không gộp Bắc/Đông/Nam/Tây. Gemini chỉ cần gửi PC place và nơi có NPC/sự kiện. Room chưa được RP cho phép reveal hiện tên trung tính “Chưa khám phá”.
3. **Custom scene**: PC thực sự ngoài Atlas hoặc AU do user tự dựng → Gemini gửi `customScene` (id, name, source=user-created, kind, description ngắn, terrain/surroundings nếu có) + các `places` mới đã xác lập. Github dựng geometry/nội thất/cảnh ngoài trời minh họa. Không được dùng để né bản đồ canon thiếu binding, AU/CCC khóa.

**Công thức hành lang:** 10 grammar `horizontal,vertical,ell,tee,cross,court,cloister,windows,curved,tower`. Tham số phòng/hành lang thay đổi ổn định theo `scopeId+atlasVersion`; cùng khu khác NPC/time không đổi hình học. Hành lang minh họa không chứng minh đường đi canon, cổng khóa hay chức năng nav/pathfinding. Công trình đơn lẻ user-created `kind=building` có vùng đất xung quanh thay vì một phòng nổi giữa khoảng trống; phòng trong lâu đài không được bịa ngoại cảnh.

## MAP_DATA 3.1

Schema duy nhất `runtime/map-data.schema.json`, validator `runtime/map-data.mjs`. Hỗ trợ dữ liệu 3.0 đã có để tránh gãy loader; dữ liệu mới mặc định 3.1. Bắt buộc `meta`, `places`, `actors` (đúng 1 `isPC=true`); tuỳ chọn `view`, `connections`, `hints`, `visibility`, `customScene`.

| Trường | Chỉ từ AI RP | Engine thể hiện |
|---|---|---|
| `meta.date/time/areaName/quote` | Ngày giờ, khu và câu gợi ý vui/bí ẩn, không spoil | Header + quote bên dưới WIZAMAP |
| `places[].id/name/kind` | Vị trí PC/NPC/sự kiện được biết, ID canon hoặc cục bộ | VỊ TRÍ, binding Atlas/template |
| `places[].inspector.overhear` | **Một câu hành động/sự việc ở đây** | NGHE HÓNG |
| `places[].inspector.observation` | **Mô tả cảnh vật, không khí, cảm giác** | QUAN SÁT |
| `actors[]` | NPC/nhóm thực sự có mặt, placeId, activity, stance, priority, groupId | AI ĐÓ, markers, footprints, Inspector |
| `hints[]` | Các sự kiện/hint/side/pool/life PC đã biết, đúng placeId | HÓNG HỚT TÁM PHƯƠNG + map markers |
| `visibility` | Danh sách nơi được reveal, fog minh họa | Che room chưa khám phá, không lộ hidden RP |
| `customScene` | Mô tả ngắn một nơi user-created ngoài Atlas | Dựng SVG procedurally, nội thất/terrain |

`kind` hợp lệ: room,corridor,hall,tower,house,shop,pub,greenhouse,grounds,street,region,train,special. Ví dụ: phòng Độc dược là `kind=room`, `generation.function=potions`, **không** `kind=potions`.

**NPC**: tối đa 50 actor record công khai trong payload để có thể mô tả đầy đủ các người đang ở cùng khu; hiển thị **PC + tối đa 10 nhãn NPC/nhóm**, không nhân đôi groupId/tên cùng phòng. Engine không tự đổi location/activity, actor đứng trên mặt sàn phù hợp; thiếu sàn thật phải báo rõ. Actor public bị cắt khỏi map nếu ngoài scope PC hiện tại; không tự dịch chuyển sang phòng PC.

**Hints/sự kiện**: type `event|side|hint|pool|life`; tổng 5 mục hiển thị trở xuống, với side ≤2, hint ≤1, pool+life ≤2. Event thông thường không phải quest; không tự sinh quest/hidden/rumor để đủ quota. Mọi actor/hint tham chiếu phải có `placeId` trong `places` AI gửi.

**Information Gate**: Gemini phải loại dữ liệu bí mật RP khỏi HTML payload trước khi render. Engine chỉ mở tên phòng chưa được liệt kê khi `visibility.revealedPlaceIds` được AI cho phép và còn phải tuân chính sách AU/CCC; click/hover/marker/Inspector/download không được hiển thị hidden RP. Fog chỉ là hiệu ứng hình học, **không bảo mật dữ liệu đã nhúng** trong bundle/HTML. Atlas tĩnh public không phải nơi lưu bí mật chiến dịch riêng tư.

## UI cố định & tương tác

Giữ nguyên chữ WIZAMAP, màu giấy cổ, dấu chân burgundy, các heading/icon `VỊ TRÍ / NGHE HÓNG / QUAN SÁT / AI ĐÓ / HÓNG HỚT TÁM PHƯƠNG`. Chọn địa điểm hoặc actor chỉ đổi Inspector, không đổi RP. Zoom, pan, animation toggle, tải HTML offline. Desktop sidebar bên phải kể cả iframe thấp; mobile viewport hẹp mới dùng drawer.

## Triển khai & kiểm thử

- 13 fixed templates và 259 asset SVG giữ nguyên artwork khi không cần.
- Unit test schema/locality/template, 44 cụm lâu đài + 27 cụm tháp, 15 NPC nhưng chỉ 10 nhãn, custom AU house/outdoor, hidden room name.
- Browser test interactive Desktop 1360×900/520, Mobile 390×700, template, NPC/hint, home/floor, offline export.
- Production chỉ **một bundle**, `ui/preview.html` và `docs/MAP_PROMPT.md` ghim commit có bundle; test checksum và Preview thực tế tại Google AI Studio cần user đăng nhập. Không đưa fixture giả vào hệ thống RP.


## Demo 3 — atlas mới và generated design

Nguồn chuẩn là `maps/WZW_ATLAS_APPROVED.md`; JSON canonical và runtime index được kiểm bằng `python tools/build_atlas_index.py --check`. Mỗi nơi có một chủ quản TEMPLATE / ATLAS / AU. Mũi tên chỉ điều hướng; không tạo phòng trùng. 5 map AU vẫn khóa; toàn bộ 5 phòng CCC, Nhà PC và Liad’s Attic được dùng. ID không còn trong nguồn mới báo retired thay vì tự dựng lại.

Khu/tầng/tháp khóa họ hành lang đã duyệt. Kích thước từng phòng và nội thất tự tính theo công dụng/ID, hoặc theo generation override; không phụ thuộc NPC/thời gian. Nhà nhỏ dùng cùng engine indoor. Ngoại cảnh ngoài template dùng assets và mặt đất schematic, không khẳng định adjacency canon.

MAP_DATA 3.2.0 bổ sung các field tùy chọn trong `places[].generation`: `wallMaterial: wood|brick|stone`, `floorMaterial: stone|wood|tile|brick`, `wallColor`, `floorColor`, `materialStroke` (màu hex sáu chữ số), `materialScale` (0.5–3). 3.0/3.1 vẫn được chấp nhận và default 3.1 giữ tương thích.

Trong H1/H2/Diagon/Hogsmeade, NPC inside gắn nhãn lên mặt tường, không lên nóc và không có dấu chân ngoài nhà. NPC outside bị công trình che có ký hiệu ◆ trên mái; hover hoặc click/tap làm công trình còn opacity 30%. Nhãn/footstep vẫn trên nội thất, và obey fog/quyền công khai. Ministry 1–7 không thuộc đợt sửa sàn/che khuất này.

`docs/atlas-coverage.json` là inventory mới; `docs/coverage-review.json` và báo cáo 84 cũ chỉ là lịch sử. Một binding cấp nhà/container không có nghĩa là đã vẽ sàn riêng cho từng phòng. Thiếu đối chiếu hình học phải được ghi rõ, không đổi sang template khác hoặc dựng indoor giả.
