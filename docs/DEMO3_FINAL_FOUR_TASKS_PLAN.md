# DEMO 3 — PLAN CHỐT 4 HẠNG MỤC (CHỜ DUYỆT)

**Baseline:** `demo-3` từ `demo-2@4c5d5f5`. **Chỉ kế hoạch; chưa chỉnh engine, assets, schema hay UI.**

## Phạm vi đóng băng
- Chỉ thực hiện 4 mục: (1) Flexible Designer, (2) Map Selector, (3) NPC & Information Gate, (4) khôi phục UI desktop cũ; cùng bộ test cần thiết của chúng.
- Không làm đợt 84 coverage, không xây 17 ngoại cảnh chưa duyệt, không mở 90 AU/CCC, không viết lại 13 SVG templates/259 assets, không thay nội dung thanh UI, không thêm RP/lore/quest.
- 726 địa điểm canon/alias giữ; **không gộp Đông/Tây/Nam/Bắc**. Hành lang là bố cục linh hoạt chứ không áp 10 mẫu y hệt nhau.
- AI Studio/WzW Runtime là **nguồn duy nhất về RP và authorization của nội dung**; GitHub chỉ cung cấp atlas, template, hình học và các điều kiện render an toàn. Không bao giờ gửi hidden RP trong payload với hy vọng fog che được.
- Giữ hợp đồng `MAP_DATA` 3.x thống nhất; nếu cần thêm field cho quyền xem, thay schema + validator + prompt + tests **đồng bộ**, không đưa field 1.0 hoặc nới enum tùy tiện.

## 1. Sửa Map Selector (LÀM TRƯỚC)
**File chính:** `runtime/atlas-scene.mjs`, `runtime/resolve-map.mjs`, `runtime/templates.json`, `runtime/atlas-index.json`.

1. `PC.placeId → canonicalId/alias → scopeId (tầng + hướng + cụm) → templateCoverage`; xử lý tên chính xác duy nhất, báo tên mơ hồ, không fuzzy.
2. Nếu PC thuộc template đã được xác minh, tự dùng **template cụ thể nhất** (indoor/outdoor), ưu tiên khu phòng cụ thể hơn H2 và H2 trước H1 **khi phạm vi đã xác minh**; không yêu cầu mọi `places` ở cùng template và không đổi ưu tiên do NPC ở khu khác.
3. Nếu không có template, lấy **toàn bộ cấu trúc tĩnh** của scope trong atlas theo floor/direction + các hành lang, graph kết nối đã xác minh; `places` từ AI chỉ bổ sung dữ kiện RP và private/public allowance, **không định nghĩa số phòng sẽ xây**.
4. Quy tắc ngữ cảnh: phòng trong lâu đài → toàn cụm trong lâu đài; chỉ một ngôi nhà/phòng độc lập → cả công trình với **cảnh ngoài trời hợp lệ** (nền/đường/khu xung quanh, không để nền trống); nếu thiếu metadata ngoài trời, thông báo thiếu scope hợp lệ, không dựng giả.
5. Không suy đường nối canon từ tên hoặc khoảng cách; giữ các vùng AU khóa.

**Test đạt:** PC chỉ đưa Phòng Độc dược → plan có 5 phòng cụm `hogwarts/f1/0`; PC ở Gryffindor/H1/H2/Đại Sảnh tự vào đúng template; PC ở 1 phòng trong lâu đài không thành nhà ngoài trời.

## 2. Nâng cấp Flexible Designer (SAU SELECTOR)
**File chính:** `runtime/architecture/recipes.mjs`, `runtime/geometry.mjs`, `runtime/architecture/walls.mjs`, `runtime/furnishings.mjs`, `runtime/architecture/draw.mjs`.

1. **Giữ 10 họ công thức** `horizontal, vertical, ell, tee, cross, court, cloister, windows, curved, tower` như grammar. Auto solver chọn theo số phòng, cửa vào, graph, hình phòng, tầng, ngoại cảnh, cửa sổ; biến thiên hướng/trật tự phòng, chiều dài nhánh, kích thước, vùng trống, vị trí cửa. Không chọn một hình giống hệt cho mọi khu; không random thay đổi mỗi lần gọi `/map`.
2. Seed dựa trên `scopeId + atlas/layout version + constraints tĩnh`. NPC/quest/thời gian không được đổi layout. Nếu scope quá lớn, chia cụm/cánh hợp lệ, giữ khả năng nhìn/pan khu liên quan, không bỏ phòng để đạt giới hạn 32.
3. Kiểm hình học: phòng không đè nhau, sàn thật, cửa đúng tiếp giáp hành lang, lối đi không bị decor chắn; connection unknown không biến thành đường canon được khẳng định.
4. Mỗi **phòng được generated** tự có tường/sàn/cửa/nội thất hợp công dụng (tái dùng 259 SVG); thiếu loại decor thông thường → SVG procedural theo style lock giấy beige, linework và góc nhìn đồng nhất. Không tự phát minh item/đồ vật đặc thù RP hoặc sửa nội thất template cố định.
5. Nhà đơn độc lập → **cảnh toàn lô/khu ngoài trời** khi có metadata, không chỉ vẽ căn phòng trên nền beige; phòng đơn trong công trình nhiều phòng vẫn lấy đúng scope.

**Test đạt:** 10 họ đều có biến thể có ràng buộc, 5 phòng Độc dược có decor, no overlap/no fake floor, 2 snapshot cùng scope cho layout giống nhau, nhà đơn có outdoor thật.

## 3. Hoàn thiện NPC Renderer & Information Gate — ĐẦY ĐỦ
**File chính:** `runtime/map-data.schema.json`, `runtime/map-data.mjs`, `runtime/viewer.mjs`, `ui/components.mjs`, `docs/MAP_PROMPT.md`, `docs/MAP_FLOW.md`.

**AI (theo phiên RP) chịu trách nhiệm** xác định ngày giờ, vị trí PC, **NPC thực sự có mặt**, nơi NPC đứng/di chuyển, hoạt động, nhóm, quest/hint, đối tượng PC biết, quyền reveal của địa điểm/phòng. Không yêu cầu GitHub suy lịch trình, sinh NPC hay quest. NPC ở nhiều phòng khác nhau phải được AI gửi với `placeId` thật; chỉ các NPC công khai được đưa vào payload.

**GitHub thực thi**:
1. Schema + validation: 1 PC, unique IDs, actors/hints tham chiếu tới địa điểm hợp lệ trong scene/scope, enums hợp lệ; `kind=room`, `generation.function=potions` (không `kind=potions`). Kiểm errors theo field path; không làm sai nơi RP hoặc ngầm chuyển NPC sang một phòng khác.
2. **Giới hạn 10 NHÃN NPC/nhóm ngoài PC, không phải bắt AI có đúng 10 NPC**. Tách actor count với label count; ưu tiên người liên quan PC/quest/đang tương tác theo dữ liệu AI, gom nhãn nhóm chỉ khi có dữ liệu nhóm thật, chống trùng tên, chống chồng và nhãn lặp giữa group/member. Với NPC dư thì ẩn nhãn/cluster, không xóa record công khai nếu cần Inspector.
3. Position và animation: đứng/đi theo `stance`/placeId, đặt trên walkable floor thật, không trên mái/void; nhóm đông có phân bố có kiểm tra va chạm. Footprints burgundy và hoạt ảnh chỉ là hiển thị, không dịch PC hoặc tiến hành động.
4. **Information Gate 2 lớp**: (i) AI lọc hết hidden facts/secret NPC/quest trước khi xuất; (ii) atlas renderer chỉ dùng phần kiến trúc/tên đã được cho phép ở khu vực, che/ẩn tên, marker, hint, Inspector, click target, hitbox, accessibility label, search/nav và dữ liệu export của các phòng restricted. Không leak khi hover, pan, zoom, tải HTML offline, debug hay đổi selected. Không coi fog là lớp bảo mật payload; hidden RP không được đưa vào.
5. Có chính sách reveal public/restricted theo place ID với allowance **tối thiểu** từ AI (thiết kế schema 3.x sau khi xác định needs); lối/cửa đã khóa vẫn trình bày được trạng thái theo quyền biết, không biến bí mật thành thông tin tự động.
6. Hints theo quota hiện hành 2 side + 1 hint + 2 pool/life (tổng ≤5); không tự tạo hint hay quest. Inspector chỉ show nội dung AI gửi đã lọc.
7. Chuẩn hóa **một JSON mẫu đầy đủ nhưng có giá trị tùy chọn hợp lý**, và prompt `/map` dạng copy-paste không buộc AI tự liệt kê toàn bộ atlas, không chép tràn JSON ví dụ làm RP thật.

**Test đạt:** 1 PC + 15 NPC công khai → tối đa 10 label không trùng, đúng room; không có NPC ẩn xuất hiện ở DOM, hitbox, Inspector, export/download; hint quota; invalid enum báo đúng; không có state RP bị thay đổi sau click.

## 4. Khôi phục UI cũ (GIỮ NGUYÊN NỘI DUNG)
**File chính:** `ui/shell.css`, nếu thật cần `ui/shell.html`, `runtime/viewer.mjs` (resize/bounds).

1. Giữ palette giấy cổ, header WIZAMAP, các mục VỊ TRÍ / NGHE HÓNG / QUAN SÁT / AI ĐÓ / HÓNG HỚT TÁM PHƯƠNG, icon, font và toolbar.
2. Chặn `@media(max-height:650px)` ép desktop rộng thành drawer. Desktop dù iframe thấp phải giữ grid **map trái + sidebar phải**, sidebar ở khoảng 25%, tối đa 310px; scroll nội bộ nếu thiếu cao. Drawer chỉ bật khi viewport thật sự hẹp.
3. Header/toolbar giảm co lệch, map tự fit theo vùng còn lại; không phá click, pan, zoom, viewport SVG. Không thêm thanh trắng status ngoài map nếu không cần; phân biệt engine loaded vs render success/error.
4. Snapshot ở 1360×900, 1360×520, 850×650, 390×700/520/420 và đối chiếu giao diện gốc.

**Test đạt:** desktop rộng iframe thấp không xuất hiện `Thông tin ↕` ở đáy, sidebar phải đủ nội dung, header đúng size, mobile drawer chỉ trên mobile.

## 5. Thứ tự thi công / cổng nghiệm thu
| Thứ tự | Milestone | Bằng chứng đạt |
|---|---|---|
| M1 | Map selector + Atlas locality | Test auto template ưu tiên và đủ phòng theo scope |
| M2 | Flexible Designer + furnishing + outdoor singleton | Browser snapshots các họ bố cục, không phòng trống, deterministic/no-overlap |
| M3 | NPC + Information Gate + JSON/prompt | Tests 15 NPC, 10 labels, visibility leak tests, validator |
| M4 | UI khôi phục | 6 viewport screenshots + CSS assertion |
| M5 | Tích hợp + release | Unit/Browser CI xanh, 13 template regression, one pinned bundle, Google AI Studio RP Preview thật |

Chỉ thay đổi file đúng 4 mục và test/guide phục vụ chúng. Nếu một template/ngoại cảnh thiếu metadata, chỉ sửa binding thực sự chặn acceptance; không kéo toàn bộ **84 coverage** thành subproject. **Không tuyên bố hoàn tất khi chỉ có tài liệu/schema mà chưa có test browser và Google AI Studio Preview thành công.**
