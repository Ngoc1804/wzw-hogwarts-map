# MAP_DATA 2.0.0

Một chiều: Gemini/context RP → MAP_DATA + HTML loader → bundle ghim commit → Google AI Studio Preview. GitHub chỉ cung cấp code và artwork; Preview không ghi GitHub, không yêu cầu seed hoặc storage.

Schema duy nhất: `map-data.schema.json`. Chuyển từ 1.0.0: bỏ `layout`, `view.maxHops`, `view.maxPlaces`; thêm `view.crop` (mặc định bật), `visibility.fogRegions` (polygon SVG), actor `environment` và `position` tùy trường hợp. Hai dữ liệu ví dụ cũ đã xóa. Thiếu MAP_DATA phải báo lỗi, không thay bằng fixture.

`resolve-map.mjs` kiểm binding chính xác; template bắt buộc thiếu binding sẽ lỗi. Auto thiếu binding yêu cầu recipe cho tất cả phòng được dựng. `geometry.mjs` dựng mặt bằng tạm theo dữ liệu được cấp trong Preview, không lưu state. Actor stance=walk hiển thị thanh hành động “Đang đi”; RP quyết định di chuyển.

`viewer.mjs`: template/generated, crop theo các nơi hiển thị (không ép bán kính PC), fog polygon được chỉ định, actor/hint/inspector, pan/zoom, tải HTML offline. Nhân vật trong nhà ở template ngoài trời có ribbon trên công trình và không có dấu chân ngoài nhà. Nhân vật ngoài trời cần position được xác minh; chưa có bộ walkable polygon bao phủ 13 template. Không đoán đất hợp lệ từ bounding box.

Recipe hiện hỗ trợ room rectangle/L/T/U/round/polygon; dựng hành lang nối theo đường vuông góc. Đồ nội thất hỗ trợ role desk/table/chair/bed/shelf/cabinet hoặc ID bất kỳ trong 259 asset (tải khi cần, ghim cùng commit atlas) và phải vừa các ô sàn hợp lệ. Đây là renderer hình học cơ sở; chưa có biên tập cổng, stair/lift chi tiết, định tuyến tránh giao cắt giữa các hành lang hoặc hiệu ứng che khuất công trình chọn lọc. Không coi mặt bằng sinh ra là sơ đồ canon.

Build: `python tools/build_runtime.py --out /tmp/wizamap --ref <full atlas commit>`; bundle phải được phát hành rồi loader ghim full commit chứa bundle. `tools/contract-fixture.json` chỉ là input của test, không đóng gói runtime.

Kiểm tra: `node --test tools/test_map_data.mjs tools/test_ui.mjs`, `python tools/atlas.py validate`, `python tools/test_atlas.py`.


### Spatial Geometry (optional MAP_DATA 2.0)

Trên template ngoài trời, actor `environment=outside` cần `position` và `view.spatial.walkableRegions` (polygon sàn/đất đã xác minh), `blockedRegions` (mái, mặt nước, vật cản). Runtime kiểm tra vị trí nằm trong walkable và ngoài blocked; nếu không đủ dữ liệu sẽ báo lỗi thay vì đoán từ bbox. Có thể dùng `occlusionRegions: [{id,targetId,points}]` để định nghĩa vùng chiếu che đã xác minh: `targetId` là khóa kỹ thuật trong `runtime/templates.json`, phải thuộc whitelist công trình của template. Hover/chọn NPC bị che chỉ giảm opacity đúng công trình xuống 0.7; rời vùng hoặc đổi `/map` sẽ tính lại. Không cần state hoặc backend.

Crop lấy phạm vi cảnh/route và tọa độ actor có thể thấy, không dùng maxHops hay bán kính PC. Fog polygon che nhãn, hint, actor và chặn inspector khi vùng bị fog. MAP_DATA phải được lọc bí mật RP **trước** khi gửi cho Preview; fog không phải bảo mật.
