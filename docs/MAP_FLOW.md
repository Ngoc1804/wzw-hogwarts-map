# Demo 2 — /MAP

Gemini đọc RP → xuất dữ liệu cảnh công khai → loader nội tuyến tải bundle ghim commit → engine chọn template hoặc dựng indoor → ghép nội thất → đặt nhân vật → UI. Preview một chiều, không backend/seed/lưu layout, không thay đổi RP khi click. Ngày giờ lấy từ RP.

## Một hợp đồng

Nguồn duy nhất: `runtime/map-data.schema.json` (3.0.0). Chỉ bắt buộc `meta`, `places`, `actors`. Không gửi focus, visiblePlaceIds, questPolicy, presenceBasis hoặc các ID campaign/snapshot cũ. Engine lấy PC từ actor có isPC=true và xem mọi place được gửi là công khai. Dữ liệu cũ 2.0 được từ chối rõ, không có renderer song song.

```json
{"meta":{"date":"1992-09-11","time":"10:25","areaName":"Phòng học"},"places":[{"id":"scene-room","name":"Phòng học","kind":"room","generation":{"function":"classroom"}}],"actors":[{"id":"pc","name":"BẠN","isPC":true,"placeId":"scene-room","tagType":"gryffindor"}]}
```

Đây là dữ liệu giả lập kiểm thử, không phải lượt RP thật. Không nhúng fixture vào production bundle.

`id`, `name`, `kind` là tối thiểu cho place; `id`, `name`, `placeId` là tối thiểu cho actor. Đúng một actor phải có isPC=true. Nhận diện mặc định unknown; entityType mặc định person; stance mặc định idle chỉ là hiển thị, không ghi state RP. Đang đi thì gửi stance=walk. Inspector có thể bỏ hoặc chỉ gửi một trong overhear/observation; phần còn lại là chuỗi rỗng. Không ép dữ liệu sai kiểu thành dữ liệu đúng.

## Chọn map và đặt nhân vật

Không yêu cầu Gemini nạp lookup/catalog. Gemini gửi ID cục bộ và tên địa điểm thật từ RP; runtime đối chiếu tên chuẩn duy nhất (chuẩn hóa Unicode, hoa/thường) với atlas-index/templates đã đóng gói và cập nhật mọi tham chiếu. Tên không khớp hoặc trùng không được fuzzy-match; cảnh indoor cục bộ phải có generation.function, còn template cố định thiếu mapping thì báo rõ. ID chuẩn/alias vẫn nhận trực tiếp nếu đã biết. `view.templateId` và preferredMode chỉ cần khi muốn chỉ định template hay chọn dựng phòng. Không fuzzy-match tên. ID cảnh tự đặt chỉ dùng cho indoor được mô tả rõ, không đổi ID địa điểm bị khóa để né policy.

Một cảnh một tầng; một phòng không tự tạo hành lang. Chọn auto khi không có yêu cầu riêng. Template cố định và ngoài trời không dựng lại bằng indoor. Chỉ mở CCC 07.18 phòng chính, Nhà PC London và Liad’s Attic trong AU. 90 mục giữ khóa. 84 mục thiếu binding/surface giữ nguyên, xem COVERAGE_REVIEW.md.

Template ngoài trời cần actor.environment=inside hoặc outside. Inside hiện nhãn trên công trình, không giả dấu chân ngoài nhà; nhóm nhiều nhà cần buildingId. Outside có position thì kiểm sàn; bỏ position thì tìm điểm minh họa trên sàn đã xác minh gần anchor, cách tối đa 160 đơn vị SVG. Không tìm được thì báo thiếu sàn. Đây không phải tọa độ canon hoặc thao tác di chuyển PC. Template indoor chưa có vùng sàn phù hợp chỉ hiện nhãn khi environment=inside, không giả điểm đứng. Muốn dấu chân ở đó phải bổ sung geometry thật. Vị trí gửi rõ nhưng sai sàn luôn báo lỗi.

## Nội thất

Gemini mô tả công dụng và đồ đặc thù; JavaScript tự chọn asset và xếp đồ theo polygon phòng, cửa, vật cản và mặt bàn. Không cần dựng sẵn mọi layout. Bỏ generation.furnishings hoặc gửi [] → mặc định; danh sách không rỗng → thay thế; furnishingsMode=add → bổ sung/ghi đè theo id; replace + [] → phòng trống. count=0 xóa đồ trong add mode.

Recipe: bedroom/residential, classroom/class, office/administration, library, practice, group, potions, kitchen, bathroom, hospital/healing/infirmary, shop/commerce, pub, storage/store, common/lounge, study. Office/practice/group được chuyển chọn lọc từ bố trí Stage 1, dùng bộ kiểm va chạm hiện tại. Không chép tọa độ cố định vào phòng có hình khác.

Đồ thông thường dùng role: desk/table/chair/bed/shelf/cabinet/rug/lamp/book/plant/portrait/blackboard/cauldron; có thể chỉ định assetId từ catalog hoặc custom.shapes theo schema. Kích thước là đơn vị SVG. `on` tham chiếu id bàn/kệ có surface thật; `near` đặt gần đồ có id. Không đủ chỗ hoặc thiếu asset/surface thì báo món bị lỗi, không âm thầm bỏ.

## Hint và giới hạn

PC + tối đa 10 tag NPC/nhóm. Tối đa 5 hint: 2 side, 1 hint, 2 pool/life cộng lại. Hint chỉ cần id, placeId, type và title; inspector tùy chọn. Không đổi H thành main. Không gửi pack/questPolicy cho renderer. AI chịu trách nhiệm lọc nguồn tháng/carryover theo campaign, không tự tạo nội dung để đủ quota. Chỉ truyền thông tin PC được phép biết; fog không bảo mật payload.

## Các trường chỉ dùng khi cần

`connections`: from, to và state bắt buộc; kind mặc định doorway, id tùy chọn. state=open/restricted/blocked. Chỉ gửi kết nối được xác lập. Bố cục minh họa không chứng minh canon adjacency, đường đi thông suốt hoặc pathfinding.

`view`: preferredMode, templateId, crop, routePlaceIds, selectedId; indoor để chỉ định hình học hỗ trợ; spatial chỉ khi có geometry đã kiểm chứng. `visibility` chỉ chứa fogRegionIds/fogRegions, không khai lại place. Không thêm hidden state.

## Build và kiểm tra

`python tools/build_runtime.py --out /tmp/wzw-test --data tools/fixtures/scene.json --embed-atlas --debug` tạo bản QA, không phải loader RP. Bỏ --debug để xuất production. `python tools/prepare_experiment.py` tạo các cảnh giả lập offline ngoài repo. Các test browser dùng Playwright + Chromium, kiểm desktop/mobile, lỗi đầu vào, nội thất, template, xuất HTML/offline. CI chạy suite Node, Python, gallery và browser. Kết quả hiện hành nằm tại validation.json; không coi test giả lập là nghiệm thu Playground thật.

Khi phát hành: build bundle với ref asset đầy đủ đã tồn tại → commit bundle → ghim commit chứa bundle trong ui/preview.html và MAP_PROMPT.md → kiểm jsDelivr khớp SHA-256. Một bundle và một loader. Prompt chép từ MAP_PROMPT.md, không dùng các prompt cũ.
