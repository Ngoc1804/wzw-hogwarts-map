# Demo 2 — gộp chọn lọc

Nền: fix/map-flow-review@c2aa907ccdcdb904e6ed0e52ee42ab287300f28e. Nhánh phát triển duy nhất từ đợt này: demo-2. Các nhánh cũ được giữ làm lịch sử; không còn là nguồn loader/tài liệu đang dùng. Không đổi default branch hoặc xóa remote refs trong đợt này.

| Nhánh / mốc đã đọc | Quyết định |
|---|---|
| main@18c7af2 | Là tổ tiên; giữ asset/artwork đã nằm trong nền hiện hành, không phục hồi schema cũ |
| demo-1@5636f4c | 7 commit riêng gồm standing và fixtures. Tiếp nhận yêu cầu chỉ đứng trên sàn thật, không binding zone. Dùng nearestFloorPoint chung với semantic floor/registry hiện hành; không mang prepare-map, schema 1.0, seed/storage và fixture trùng sang |
| feat/template-preview@e889a09 | 4 commit riêng về viewer/loader và đặt nhãn. Viewer mới đã có các chức năng tương ứng; giữ UI, tải offline và zoom. Bỏ cách lấy mép/tâm artwork làm tọa độ dấu chân |
| feat/architecture-elements-stage1@ff6ec31 | 8 bố trí nội thất đã đối chiếu. Thêm recipe office/practice/group, nhận diện store, dùng asset cũ còn đủ. Giữ bộ xếp đồ kiểm hình phòng; không phục hồi tọa độ cố định, viewer duyệt hay bộ chỉnh chiều cao |
| feat/indoor-stage2@257bfcf | Công thức và tường đã được đưa chọn lọc vào nền; giữ bản mới hơn có hỗ trợ 1 phòng/hành lang đơn. Không merge nguyên bản yêu cầu tối thiểu 4 phòng |
| feat/wizamap-runtime@6d99d14 | Là tổ tiên: giữ atlas chuẩn, policy AU, geometry và ngoại thất hiện có |
| feat/indoor-preview-simple@3ad6352 | Là tổ tiên: giữ tự ghép nội thất, đồ trên bàn, custom vector, tải asset theo nhu cầu |
| fix/map-flow-review@c2aa907 | Giữ 6 binding đã kiểm, phân loại healing và báo cáo 84 mục thiếu; hợp đồng 2.0 thay bằng 3.0 duy nhất |

## Phần đã dọn

- Bỏ bản scenery-review.html sinh lặp từ kho asset và builder chỉ phục vụ bản đó; gallery 259 SVG giữ lại.
- Bỏ test_browser.cjs dạng mở tay và test_map_data.mjs chỉ import trùng test_runtime; thay bằng runner browser có assertion, gọi được trong CI.
- Gộp CLEANUP/DEVELOPMENT_STATUS/GEMINI_QUICKSTART/RUNTIME_USAGE/INDOOR_PREVIEW vào MAP_FLOW; kết quả test chỉ ở validation.json. Báo cáo thiếu binding có bằng chứng vẫn giữ.
- Runtime chỉ có một bundle, một schema 3.0 và loader tải script trực tiếp; bỏ iframe lồng thêm và không fetch lại bundle để bắt đầu render. Code bundle chỉ được fetch lại khi cần xuất HTML offline.
- Asset, atlas nguồn, artwork index.html và palette không bị sinh lại. Bản giả lập và ảnh sinh ngoài repo.

## Phạm vi còn thiếu

84 mục thiếu metadata/geometry, 90 mục khóa AU/CCC vẫn được ghi theo coverage. Các vùng đất bị mái che chưa có geometry không được coi là sàn. Một số template indoor chỉ có nhãn địa điểm mà chưa có điểm đứng xác minh; engine hiển thị nhãn inside và không vẽ dấu chân giả. Chưa nghiệm thu phiên Google AI Studio có đăng nhập hoặc thiết bị điện thoại thật.
