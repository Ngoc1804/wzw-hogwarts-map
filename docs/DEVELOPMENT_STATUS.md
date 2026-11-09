# Trạng thái triển khai

Đã triển khai: bỏ ornament nơ lặp trong asset, gallery; MAP_DATA 2.0.0 không storage/seed/radius; xóa hai ví dụ runtime; không có fixture tự bật; decision atlas 773 nơi và 55 tham chiếu gộp; template resolver; renderer cơ sở phòng và hành lang; crop; fog polygon; UI/actor/hint/inspector; thanh hành động Đang đi; một scheduler footsteps; drawer khung thấp; bundle jsDelivr và shell một entry URL; CI.

Đã kiểm: 9 Node tests (contract/geometry/atlas/UI); 5 atlas tests; 3 inventory tests; 3 scenery tests; gallery 259 SVG; Chromium mount 13 template không page error; desktop 1360×900, mobile 390×420. Kết quả này không chứng minh hiệu năng điện thoại thật hoặc Preview AI Studio có đăng nhập.

Cần phát triển/nghiệm thu tiếp:
- Walkable polygon, blocked polygon và actor anchors được duyệt cho từng template. Ngoài trời hiện cần position rõ ràng; không giả định tâm artwork là đất hợp lệ.
- Occlusion/fade chọn lọc công trình, hit area mép ribbon và cụm +N. Chưa triển khai.
- Renderer cơ sở bố trí phòng thành hàng, lối nối orthogonal ở phía dưới. Chưa dựng mặt bằng theo hướng/cụm/tầng atlas hoặc tránh mọi giao cắt hành lang. Không coi là renderer hành lang hoàn thiện.
- Recipe hiện chỉ dùng sáu role nội thất và sức chứa sàn được kiểm; thiếu role báo lỗi. Cần mở rộng mapping đủ thư viện.
- Chuẩn hóa atlas hiện dùng tên khớp chính xác và alias chỉ định, không chứng nhận tất cả 773 mục là canon. Những mục chưa có binding vẫn yêu cầu recipe; cần duyệt các trường hợp gộp theo ngữ nghĩa khác tên.
- Fog yêu cầu polygon rõ; chưa có region registry sẵn cho toàn atlas. Crop hiện lấy tập điểm neo, chưa fit đầy đủ mọi hình kiến trúc.
- Touch/pinch, benchmark điện thoại thật, soak test memory và Preview AI Studio đăng nhập vẫn cần nghiệm thu.

PR #2 và #3 đóng, không merge. Lịch sử PR được GitHub giữ. Các thay đổi mới nằm trên nhánh riêng để review, không tự merge main.
