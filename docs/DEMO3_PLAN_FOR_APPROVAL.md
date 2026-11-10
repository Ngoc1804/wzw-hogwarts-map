# WIZAMAP · DEMO 3 — KẾ HOẠCH THỰC THI CHỜ DUYỆT
> Nguồn: `demo-2@4c5d5f5662d6b210beb7656a7259725691afac75`. Tạo `demo-3` từ `demo-2`. **Tài liệu kế hoạch, chưa cho phép sửa code/atlas/assets hoặc phát hành.**
> Đối chiếu với `runtime/architecture/recipes.mjs`, `runtime/geometry.mjs`, `runtime/resolve-map.mjs`, `runtime/atlas-scene.mjs`, `runtime/map-data.schema.json`, `ui/shell.css`, `docs/COVERAGE_REVIEW.md`, `docs/coverage-review.json`, và `docs/CONSOLIDATION.md`.

## 0. Phạm vi và nguyên tắc khóa
- Kết quả bắt buộc: người chơi gõ `/map`; AI trả **dữ liệu RP công khai**, JS phía GitHub giải quyết `PC → canonical place → scope/template → toàn bộ khu vực → bố cục → nội thất → PC/NPC/hint → Preview`.
- **Không bao giờ dựng một phòng cô độc giữa nền trống vì thiếu `places`**. Với khu có nhiều phòng, dựng đúng một cụm xung quanh PC; với khu thực sự một nhà/phòng riêng và có quan hệ ngoại thất, dựng công trình + không gian ngoài trời hợp lệ; phòng bên trong lâu đài không được tự bịa trời/sân bên ngoài.
- **Template ưu tiên** nếu điểm PC thuộc phạm vi template đã xác lập, indoor hoặc outdoor; ưu tiên template cụ thể nhất, không phụ thuộc NPC gửi từ nơi khác, không dựa trên số phòng trong `places`.
- Tách trách nhiệm tuyệt đối: **AI** cung cấp thời gian, RP, vị trí/thao tác NPC, quest, thông tin PC được biết, bí mật bị chặn; **GitHub** cung cấp atlas cấu trúc tĩnh, template/renderer, đồ họa SVG, sắp xếp nhãn, va chạm, UI, validation. Không sinh NPC/quest/tình tiết bằng GitHub.
- Không đổi theme giấy beige, dấu chân burgundy, header/sidebar/heading/icon đã chốt. Không viết lại 13 template hoặc thư viện 259 asset khi không cần.
- Không gộp Bắc/Đông/Nam/Tây; mỗi hướng của cùng tầng là scope độc lập. Giữ ID chuẩn, alias, khu/tầng/phòng; giữ chính sách AU: chỉ CCC 07.18 phòng chính, nhà PC London và Liad’s Attic được phép; 90 mục khóa không được tự mở.
- Không backend/API riêng; một bundle, một loader, jsDelivr ghim commit. No fuzzy-map tên mơ hồ, no fabricated canon adjacency, no fake floor/position/roof.

## 1. Đối chiếu chính xác các tính năng đã có
| Thành phần | Hiện trạng demo-2 | Quyết định demo-3 |
|---|---|---|
| Corridor formulas | **10 họ:** `horizontal`, `vertical`, `ell`, `tee`, `cross`, `court`, `cloister`, `windows`, `curved`, `tower` | Giữ 10 họ ngữ pháp; **tự biến thiên/combine** theo constraints và scope, không làm 10 map giống hệt nhau. |
| Công thức/phòng | `recipes.mjs` có kích thước, hình phòng, tường, cầu thang, sàn; auto heuristic cứng theo constraints. | Bổ sung layout solver (room ordering, orientation, placement, wings, entry, corridor path, exterior relation), seed ổn định theo scope. |
| Generated geometry | `geometry.mjs` chỉ dùng `plan.places`; `connections` chưa quyết định topology; nhánh một phòng bỏ hành lang và mọi phía xung quanh. | Phải expand atlas trước geometry, dùng graph đã xác minh, kiểm mặt sàn và không gian ngoài trời đúng ngữ cảnh. |
| Atlas | 726 canonical place, review MD đã lọc tại `review/atlas-readable-20261111`; 44 nhóm Hogwarts = 11 tầng × 4 hướng. | Duyệt review → đồng bộ runtime index; không xóa tên trùng nhưng khác vị trí, không tách atlas theo scene RP. |
| Templates | 13 templates + registry/binding và floor surfaces; coverage thiếu 84. | Audit từng template; bổ sung mapping/mask/floor còn thiếu, không vẽ lại tất cả SVG. |
| Furnishing | `furnishings.mjs` có role/recipe, collision và 259 assets; có `custom.shapes`; nhánh Stage 1/2 đã được chọn lọc nhập demo-2. | Hoàn thiện cho **mọi generated room** theo function; ưu tiên asset thật, thiếu thì SVG procedural theo style lock; không dựng lại đồ trên template đã có. |
| NPC / hints | Viewer có PC/NPC/hint inspector, footprints, click, zoom/pan; schema hiện giới hạn **11 actor records**, không phải 10 visual labels. | Tách **số actor công khai** khỏi **số nhãn tối đa 10 (ngoài PC)**. Nhóm/chồng nhãn theo proximity/ID nhóm do AI xác lập. |
| UI | `shell.css`: sidebar desktop `clamp(220px,25vw,310px)`; rule `@media(max-height:650px)` ép drawer dù desktop rộng. | Giữ nội dung như cũ, sửa breakpoint dựa trên viewport chiều rộng + khả năng hiển thị, header/toolbar/sidebar desktop trở lại. |
| Version | MAP_DATA 3.0, bundle commit cũ, CI latest thất bại ở Playwright Chromium. | Một hợp đồng thống nhất (3.x khi cần), repin sau CI xanh, nghiệm thu AI Studio thực. |
| Legacy branches | `feat/architecture-elements-stage1`, `feat/indoor-stage2`, `feat/template-preview`, `feat/indoor-preview-simple` đã được chắt lọc vào demo-2 (xem `docs/CONSOLIDATION.md`). | **Không merge nguyên nhánh cũ**. Chỉ cherry-pick tính năng thiếu sau test đối chiếu file cụ thể. |

## 2. Flow bắt buộc và kiến trúc kỹ thuật
1. Gemini đọc RP hiện tại, gửi `meta`, PC `placeId`, các `places` **có dữ kiện RP công khai**, actors/hints công khai, quyền biết được phép hiển thị. Không gửi toàn bộ atlas hay tự vẽ SVG.
2. `validate/normalize` với schema duy nhất; chỉ canonicalize ID/alias hoặc exact name duy nhất; gặp tên mơ hồ/không thể resolve thì báo lỗi tham chiếu, không suy đoán.
3. **BƯỚC MỚI: `resolveLocality(pcPlaceId)`** tra atlas hierarchy và meta: template coverage (ưu tiên) hoặc `scopeId` chính xác; với template overlap ưu tiên phần tử cụ thể theo thứ tự có kiểm chứng (common room/hall/village/Quidditch/H2/H1); không chọn theo thứ tự registry. Trường hợp `PC` ở nhà riêng hoặc room single cần biết `building/parcel/outside`, không giả lập đường đi.
4. Nếu template: dùng SVG gốc + spatial binding + view bounds/visibility. Nếu generated indoor: lấy **tất cả place kiến trúc thuộc scope** từ atlas, đúng tầng/hướng và ràng buộc AU; dựng corridor/rooms theo graph/preset hoặc solver chọn bố cục phù hợp. Nếu một công trình đơn lẻ có ngoại thất đã xác lập: dựng cả công trình và outdoor neighborhood schematic có nền/đường đi hợp lệ; nếu thiếu quan hệ ngoại thất thì báo rõ thay vì vẽ nền trống/fake canon. **Không xây generated indoor cho toàn bộ outdoor/H2/ministry vốn thuộc template.**
5. Apply presentation gating: atlas tạo shell hình học cho scope được phép, nhưng không tự tiết lộ bí mật RP/quest/NPC; tên phòng bí mật và thông tin chỉ mở khi AI cho phép. Không trông cậy fog để bảo vệ hidden state đã gửi — AI **không gửi** dữ liệu bí mật.
6. Furnish tất cả generated rooms theo `function`/type static và explicit public exceptions; PC/NPC được đặt vào đúng place, trên floor thật; nhãn tối đa 10 NPC/nhóm **hiển thị** + PC riêng, không nhân bản.
7. Viewer thống nhất UI, zoom/pan/click, label, hints/inspector, tải offline; không sửa state RP. Test + CI + repin jsDelivr.

## 3. Atlas / khu vực — không gộp khác hướng
- Chỉ mục chuẩn: `world > building/area > floor > direction > scope > room`, `scopeId`, `placeIds`, `corridorPlaceIds`, `templateCoverage`, `exteriorParent` (nếu có và đã xác minh), `layoutConstraints`, `visibilityClass`, `neighborGraph` (edge có nguồn/confidence), `layoutVersion`. Mỗi place canonical thuộc một vị trí gốc; nhiều template chỉ là reference.
- Hành lang có thể không được liệt kê như một room trong atlas; engine dựng khối giao thông từ layout preset/constraints nhưng không khẳng định đây là adjacency canon khi không có dữ liệu. Không thêm Bắc vào map Tây.
- Source review MD trên nhánh `review/atlas-readable-20261111` là tài liệu; chỉ nhận vào `demo-3` **sau duyệt** và chỉ sửa index/source tối thiểu, giữ 726 ID gốc.
- Khối nhà đơn chỉ có 1 phòng: render ngoại thất thật hoặc vùng ngoài trời procedural theo metadata, có nền và framing hợp lý. Với một phòng nằm trong lâu đài, tự giải quyết đúng scope nội thành, **không đổi phòng thành căn nhà ngoài trời**.

## 4. Flexible Designer — không phải 10 preset cố định
- 10 họ công thức hiện có chỉ là **layout grammar**, không phải 10 mặt bằng đã khóa. Solver chọn theo `scopeId`, số phòng, lối vào, corridor graph, cấu trúc tầng, hình phòng, vị trí có cửa sổ/giếng trời, yêu cầu đấu nối, và exterior context.
- Thứ tự: known geometry (bắt buộc) > constraints/tuyến nối đã biết > chọn họ phù hợp > tinh chỉnh `roomWidth/depth`, thứ tự phòng, định hướng/chiều dài, phân nhánh/khúc cua, void/courtyard, cửa/entry, decor. Cấm phá graph đã biết để lấy bố cục đẹp.
- Với 1 nhóm lớn vượt limit 32 room hiện tại: chia đúng wing/tiểu khu liên kết, không xóa room; viewport mở đúng phạm vi phù hợp và có crop/pan hợp lệ; không hiển thị toàn bộ lâu đài vô cớ.
- Không dùng `Math.random` mỗi lần gọi `/map`; seed layout chỉ từ `scopeId + atlasVersion + layoutVersion` và các constraints tĩnh. NPC/quest/hours không đổi geometry.
- Kiểm topology: không room overlap, cửa phải chạm corridor/boundary hợp lệ, từ corridor có đường tiếp cận từng phòng có thể vào, riêng cửa locked giữ trạng thái. Không bịa đường dẫn canon, route navigation hay pathfinding ngoài dữ liệu.

## 5. Furnishing & SVG style lock
- Mỗi generated room (đang hiển thị) phải có floor/walls/door và recipe vật dụng theo `function`: potions, classroom, office, storage, common, bedroom, hall v.v. Các phòng thực sự không có nội thất/đồ đặc thù theo RP có ngoại lệ minh thị; không cưỡng ép thêm vật phẩm canon.
- Ưu tiên SVG từ `elements/catalog.json` và 259 assets; nếu thiếu một **hình dạng trang trí chung**, dựng SVG procedural từ geometry primitives với cùng palette/stroke/top-down/light 2.5D đã khóa; ghi asset/source và test; không thêm dịch vụ AI image.
- Tự điều chỉnh đồ theo kích thước, cửa, cửa sổ, vật cản, đường thoát, anchor PC/NPC. Không đè cửa/lối đi; đồ cần mặt bàn thì phải có supportSurface. Chế độ `furnishingsMode=add/replace` giữ theo schema.
- Không tái trang trí template đã có artwork hoàn chỉnh; sửa binding/selective missing sprite nếu thật sự lỗi.

## 6. MAP_DATA — AI là nguồn sự thật RP; GitHub chỉ hiện giao diện
- Giữ một schema 3.x chính thức; **không gửi** `focus`, `questPolicy`, `visiblePlaceIds` kiểu 1.0 và không dùng `kind:potions` (`kind:room`, `generation.function:potions`).
- Tối thiểu: `meta(date,time,areaName)`, `places([{id,name,kind}])`, `actors([{id,name,placeId,isPC:true}])`; optional `view`, `connections`, `hints`, `visibility`, `generation`. **AI KHÔNG cần liệt kê toàn bộ phòng**: index tự expand cấu trúc; AI chỉ gửi place thật đang liên quan tới RP/actors/hints; actor.placeId được auto-validate với atlas scope, không được suy room tùy tiện.
- `NPC`: Gemini xác định có/không, vị trí, lịch trình, hành động, hội nhóm, inspector và priorities theo từng phiên. Github không suy nội dung. Cho phép nhiều actor công khai hơn 10 nếu cần, nhưng engine chỉ vẽ **tối đa 10 nhãn ngoài PC**; thay quota `actors.maxItems=11` đang tồn tại bằng giới hạn hợp lý theo hiệu năng + label-limit render; group chỉ khi có cơ sở cùng nhóm/place, không trộn NPC vô cớ.
- `Information Gate`: AI lọc dữ kiện trước khi gửi. Với địa điểm bí mật tĩnh trong atlas, cần cơ chế public/restricted và khai báo explicit permitted reveal từ AI ở data contract; renderer không được tự mở tên/ngõ bí mật chỉ vì expand khu vực. Không đưa hidden NPC/secret quest trong payload rồi chỉ che bằng CSS/fog.
- `view` và `visibility` bổ sung tối thiểu **chỉ khi cần** để truyền ranh giới được phép (không yêu cầu Gemini truyền catalog hoặc geometry); nếu sửa schema 3.0, tăng phiên bản đúng quy tắc và viết validator/test đồng thời.

### Mẫu JSON hợp lệ theo schema 3.0 hiện tại (CHỈ FIXTURE, KHÔNG PHẢI RP THẬT)
```json
{
  "meta": {"date":"1992-09-14","time":"16:20","areaName":"Hầm ngục Hogwarts","quote":"Một buổi chiều ở Hogwarts."},
  "view": {"preferredMode":"auto"},
  "places": [
    {"id":"HOG-HMNGC-N-01","name":"Phòng học Độc dược","kind":"room","generation":{"function":"potions"}},
    {"id":"HOG-HMNGC-N-02","name":"Văn phòng Snape","kind":"room","generation":{"function":"office"}}
  ],
  "connections": [],
  "actors": [
    {"id":"pc","name":"PC","placeId":"HOG-HMNGC-N-01","isPC":true,"tagType":"gryffindor","stance":"idle"},
    {"id":"npc-1","name":"NPC công khai","placeId":"HOG-HMNGC-N-02","tagType":"teacher","stance":"idle","activity":"Hoạt động đã được RP xác lập"}
  ],
  "hints": [],
  "visibility": {}
}
```
- **Sau triển khai Demo 3**, dùng cùng dữ liệu RP này, engine phải dựng trọn `hogwarts/f1/0` (5 room) mà Gemini **không cần** cung cấp 3 room còn lại. Test fixture không được để lọt vào bundle production; prompt sẽ gửi JSON thực tế của RP.
- Cần khóa template JSON cuối bằng một file fixture + schema validator + lỗi chi tiết với field path. Quota labels là UI, không bắt AI tạo “cho đủ 10 NPC”.

## 7. Coverage 84 — xử lý đúng trọng tâm, không hiểu thành 84 map mới
Nguồn `docs/coverage-review.json` gồm **91 case được review**, 6 resolved binding và 1 resolved classification; còn **84** chưa xử lý:
| Phân nhóm | Số | Giải pháp đúng |
|---|---:|---|
| Thiếu region/shape cục bộ | 36 | Đối chiếu artwork/template hiện có, tạo binding polygon/anchor/surface thật. |
| Chưa chứng minh correspondence tên canon ↔ artwork | 7 | Đối chiếu bằng nguồn; chỉ tạo binding khi có chứng cứ. |
| Thiếu metadata từng phòng trên template | 22 | Định danh đúng phòng/sàn/anchor cho Ministry hoặc map liên quan. |
| Thiếu region tổng hợp cấp tầng/khu | 2 | Tạo aggregate region trỏ các phòng con, không vẽ thay toàn map. |
| Thiếu hẳn ngoại cảnh | 17 | Xác nhận scope được phép + thiết kế scene ngoài trời riêng (nếu được duyệt), **không giả làm indoor room**. |
- Phụ lục đủ **84 tên/ID**: [DEMO3_COVERAGE_84_AUDIT.md](./DEMO3_COVERAGE_84_AUDIT.md).
- Trước khi xây 17 scene mới, duyệt phạm vi vì nhiều nơi ngoài Hogwarts (World Cup, Rừng Albania, Shell Cottage…). Không nở project ngoài yêu cầu hiện hành; đưa vào danh sách cần quyết định thay vì tự dựng.
- **90 locked AU/CCC không thuộc 84 pending** và không được mở tự động.

## 8. Kế hoạch hành động theo thứ tự, file và đầu ra nghiệm thu
| Bước | Nhiệm vụ | File chính dự kiến | Definition of Done (test phải chứng minh) |
|---|---|---|---|
| P0-01 | Duyệt atlas review, index nhóm và room ownership; không gộp hướng | `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json`, `runtime/atlas-index.json`, `tools/test_atlas_index.mjs` | 726 IDs/alias nhất quán; room→scope có đúng một nơi; 44 scope không lẫn hướng. |
| P0-02 | Locality resolver PC→scope, template priority, static visibility | `runtime/atlas-scene.mjs`, `runtime/resolve-map.mjs`, `runtime/templates.json` | Chỉ gửi PC + 1 room; map có template dùng template; indoor có 5 rooms → plan gồm 5 rooms, không thiếu. |
| P0-03 | Layout solver contextual & corridor graph, stable seed | `runtime/architecture/recipes.mjs`, `runtime/geometry.mjs`, module mới **nếu thật cần** | 10 họ + biến thể; không overlap; đúng cửa/lối; cùng scope ra cùng layout qua 2 snapshot khác NPC. |
| P0-04 | One-room/one-house context exterior | `runtime/geometry.mjs` + existing exterior surfaces | Một nhà độc lập có nền ngoài trời hợp lệ; một phòng lâu đài không biến thành nhà; thiếu source báo cụ thể. |
| P0-05 | Full furnishing + fallback SVG style-lock | `runtime/furnishings.mjs`, `runtime/scene-assets.mjs`, `runtime/architecture/draw.mjs` | Mọi generated room có bộ decor theo function; không đè cửa, sàn, NPC; template artwork giữ. |
| P0-06 | MAP_DATA contract/prompt & secure visibility | `runtime/map-data.schema.json`, `runtime/map-data.mjs`, `docs/MAP_PROMPT.md`, `docs/MAP_FLOW.md` | Enum valid, errors rõ; Gemini kiểm đủ trường; không hidden RP; không cần gửi danh sách toàn khu. |
| P0-07 | NPC labels + inspector/hints/footprints | `runtime/viewer.mjs`, `ui/components.mjs`, schema nếu cần | NPC theo RP đúng place, tối đa 10 label ngoài PC, không label trùng; inspector không lộ hidden state. |
| P0-08 | Khôi phục UI header/map/sidebar | `ui/shell.css`, `ui/shell.html` (chỉ khi cần) | Desktop rộng iframe thấp vẫn sidebar bên phải, header đúng; size/content/icons cũ; mobile drawer khi đúng viewport hẹp. |
| P1-09 | 13 template full QA và coverage trong phạm vi đã mở | `runtime/templates.json`, `runtime/template-spatial.json`, artwork chỉ sửa khi cần | Chọn đúng 13 template, nền, sàn, indoor/outdoor actor, crop/mask; 84 case có resolution hoặc blocker được duyệt. |
| P0-10 | Browser integration, offline export, end-to-end real RP | `tools/test_*.mjs`, `tools/test_*browser.cjs`, `.github/workflows/validate.yml` | CSS desktop/mobile, 5-room expansion, single-house exterior, NPC>10, 13 templates, invalid enum, visibility + stable layout; CI xanh. |
| P0-11 | Release one bundle + pinned jsDelivr + live Google AI Studio test | `tools/build_runtime.py`, `runtime/bundle.js`, `ui/preview.html`, `docs/MAP_PROMPT.md`, `docs/validation.json` | Build đúng commit/ref, sha256, loader duy nhất, test /map trong AI Studio thành công, không dùng fixture như RP thật. |

## 9. Ma trận nghiệm thu tối thiểu
1. PC Phòng học Độc dược → đúng 5 room khu Hầm ngục Bắc `hogwarts/f1/0`, decor, corridor; không lẫn Nam/Đông/Tây.
2. PC ở Phòng sinh hoạt Gryffindor/Đại Sảnh/H1/H2/Hogsmeade/Quidditch/Diagon/Ministry → auto template **không cần AI liệt kê các phòng**.
3. PC ở một nhà riêng hợp lệ không thuộc template → ngôi nhà + ngoại thất xung quanh, không nền trống.
4. Cùng area gọi lại `/map` với khác NPC/time → cấu trúc phòng giữ nguyên; NPC vị trí đổi khi RP xác lập.
5. 15 NPC công khai tại nhiều room → render tối đa 10 nhãn NPC/nhóm, PC riêng; không duplicate; không thêm NPC.
6. Area có secret room → chỉ thể hiện geometry/label theo quy định public/explicit AI allow; hidden NPC/quest không xuất hiện trong payload/viewer.
7. 13 template × actor ground/inside/outside × spatial binding; zoom/pan/inspector; không fake footprint.
8. Desktop 1360×900, desktop iframe thấp 1360×520, tablet 850×650, mobile 390×700/520/420 — header/map/sidebar đúng layout.
9. Enum sai `places.kind=potions` phải báo rõ; `kind=room, generation.function=potions` pass; không giả hoàn thành nếu browser crash.
10. Unit/Python/Chromium CI PASS và test Google AI Studio thật.

## 10. Ngoài phạm vi — cấm làm khi chưa duyệt
- Không thêm lore/quest/NPC/script RP; không generate H1/H2/Ministry bằng hallway giả; không đổi 259 assets/13 template đồng loạt.
- Không mở 90 AU/CCC, không làm cả 17 exterior scene ngoài phạm vi tự động, không merge nguyên nhánh cũ, không đổi `main`, không deploy mới trước khi nghiệm thu.
- Không làm custom app/backend, network API hay lưu RP lên GitHub.
- **Điểm cần duyệt riêng:** với 17 exterior scene chưa có artwork, chỉ xây các scene nằm trong phạm vi người dùng duyệt; các nơi còn lại phải có trạng thái unsupported rõ, không tính đã hoàn thành coverage.

## 11. Trạng thái lúc lập plan
- Nhánh `demo-3` mới tách từ `demo-2@4c5d5f5`. Tại thời điểm viết, chỉ thêm tài liệu chờ duyệt; **không viết code, không commit bundle, không merge**.
- CI mới nhất của `demo-2`: failure browser Chromium ở run 42850312677 (khác lỗi `kind`); baseline trước đó thành công ở 42847555715.
- Bước triển khai tiếp theo **chỉ bắt đầu sau khi được duyệt kế hoạch**.
