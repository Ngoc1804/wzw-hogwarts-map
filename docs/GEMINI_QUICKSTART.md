# /map → Preview

Gemini đọc RP → xuất MAP_DATA → tải HTML runtime và asset từ GitHub/jsDelivr → hiện Preview trong Playground.
GitHub phục vụ file tĩnh; không có endpoint nhận RP hoặc tự sinh phòng phía server.

1. Tra `maps/decision-atlas.json` theo ID. `locked` giữ policy AU. `template-required` giữ artwork hiện hành kể cả khi nhân vật ở trong công trình. `template-or-generated` chọn theo cảnh. `generated` dùng phòng/hành lang hiện tại.
2. Với template, chọn `view.templateId`, `preferredMode="template"`. Dùng `verifiedBindings`; nếu chưa có, Gemini tra `runtime/templates.json` và truyền `places[].atlasRef` là khóa kỹ thuật thực sự đúng. `templateCandidates` chỉ chỉ ra bản đồ phù hợp, không phải tọa độ đứng hoặc binding chính xác.
3. Với phòng dựng, chọn `preferredMode="generated"`; khai báo chức năng, hình phòng, kích thước, nội thất. Dùng ID asset trong `elements/catalog.json` hoặc `custom.shapes`. Chỉ đưa phòng/hành lang của cảnh hiện tại; một phòng không tự thêm hành lang. Xem `INDOOR_PREVIEW.md`.
4. NPC dùng tọa độ sàn hợp lệ; trong cảnh dựng có thể tự lấy chỗ trống. NPC bên trong công trình ở template ngoài trời dùng `environment="inside"` và `buildingId` khi place có nhiều nhà. NPC ngoài trời dùng position cùng semantic floor hoặc `view.spatial` đã đối chiếu. Không dùng tâm mái làm vị trí đứng.
5. Nhúng JSON và loader theo `RUNTIME_USAGE.md`; xuất HTML trực tiếp vào Preview. Dữ liệu sai hiện lỗi để Gemini sửa đúng trường, không cần tạo map GitHub riêng cho mỗi địa điểm.

## Hiểu đúng báo cáo độ phủ

Các mục `missing-fixed-binding` là thiếu liên kết địa điểm → shape kỹ thuật đã kiểm chứng, không phải thiếu cả template. Gemini có thể gửi binding đúng của cảnh. Các mục `missing-outdoor-surface` cần cảnh ngoài trời/geometry phù hợp, không đổi chúng thành phòng indoor. Renderer hiện tại không tự sinh địa hình ngoài trời tùy ý. `ai-scene-required` đánh dấu rõ giới hạn này.

7 phòng Hogwarts không có ràng buộc template được sửa function trong nhà. Các phòng thuộc Bộ Pháp thuật và khu cố định vẫn giữ policy template.

Kiểm thử trình duyệt cục bộ không xác nhận phiên Gemini/Playground có đăng nhập. Bước nghiệm thu trực tiếp cần mở loader ở Playground và chạy các tình huống template, phòng dựng, NPC/tag, xuất HTML.

## MAP_DATA 2.0 gọn, tương thích dữ liệu đầy đủ

Schema `runtime/map-data.schema.json` là nguồn duy nhất. `normalizeMapData()` áp dụng `default` khai báo trong schema trên bản sao; validator, resolver và viewer dùng cùng quy tắc. Trường lạ hoặc giá trị sai vẫn báo lỗi, không dùng default để che dữ liệu sai.

Bắt buộc: `schemaVersion`, `meta.date/time/areaName`, `focus.pcActorId/actualPlaceId`, `places`, `actors`, `visibility.visiblePlaceIds`. Quyền hiển thị phải gửi rõ, không suy từ danh sách địa điểm.

Có thể bỏ campaign/world/snapshot/atlasVersion nếu không cần tracking. Có thể bỏ `view` (auto, templateId=null, route rỗng, crop=true), `connections`, `hints` (mảng rỗng), quote (chuỗi rỗng), selectedId và metadata place rỗng. Inspector mặc định rỗng; actor có role=null, onPatrol=false, activity rỗng, priority=0, positionMode=normal, positionReason=null. Không suy ngày giờ, stance, identity/tagType, vị trí hoặc sự hiện diện NPC.

Có hint thì **bắt buộc questPolicy**, tháng RP, packId và quota. Không tự chọn pack/quest hoặc quota. Có thể bỏ questPolicy khi không có hint; nếu gửi thì vẫn kiểm tra. Giới hạn 10 tag NPC ngoài PC và 6 hint giữ nguyên. Không thay bằng một hợp đồng 8 nhóm khác.
