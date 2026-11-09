# Trạng thái triển khai

Đã triển khai: bỏ ornament nơ lặp trong asset, gallery; MAP_DATA 2.0.0 không storage/seed/radius; xóa hai ví dụ runtime; không có fixture tự bật; decision atlas 762 nơi và 66 tham chiếu gộp; template resolver; renderer cơ sở phòng và hành lang; crop; fog polygon; UI/actor/hint/inspector; thanh hành động Đang đi; một scheduler footsteps; drawer khung thấp; bundle jsDelivr và shell một entry URL; CI.

Đã kiểm: 14 Node tests (contract/geometry/atlas/UI); 5 atlas tests; 3 inventory tests; 3 scenery tests; gallery 259 SVG; Chromium mount 13 template không page error; desktop 1360×900, mobile 390×420. Kết quả này không chứng minh hiệu năng điện thoại thật hoặc Preview AI Studio có đăng nhập.

Cần phát triển/nghiệm thu tiếp:
- Walkable polygon, blocked polygon và actor anchors được duyệt cho từng template. Ngoài trời hiện cần position rõ ràng; không giả định tâm artwork là đất hợp lệ.
- Fade công trình theo binding đã có khi hover/chọn actor ngoài trời. Cần kiểm che khuất theo chiều sâu, hit area mép ribbon và cụm +N.
- Renderer chia nhóm tầng, sắp thứ tự zone, A* tránh phòng và tăng chi phí đi trùng hành lang. Chưa bảo đảm hướng canon hay biểu diễn cầu vượt ở mọi graph giao cắt.
- Sáu role nội thất thường dùng được nhúng sẵn; toàn bộ 259 ID asset có thể dùng trực tiếp làm role và tải khi cần. Sức chứa sàn được kiểm; thiếu role báo lỗi.
- Chuẩn hóa atlas hiện dùng tên khớp chính xác và alias chỉ định, không chứng nhận tất cả 762 mục là canon. Những mục chưa có binding vẫn yêu cầu recipe; cần duyệt các trường hợp gộp theo ngữ nghĩa khác tên.
- Fog yêu cầu polygon rõ; chưa có region registry sẵn cho toàn atlas. Crop fit bounding box của các target được binding.
- Touch/pinch đã có code; nghiệm thu gesture thật, benchmark điện thoại thật, soak test memory và Preview AI Studio đăng nhập vẫn cần nghiệm thu.

PR #2 và #3 đóng, không merge. Lịch sử PR được GitHub giữ. Các thay đổi mới nằm trên nhánh riêng để review, không tự merge main.

HTML export đã nạp lại với request mạng bị chặn (setContent); Chrome của môi trường chặn file:// nên chưa xác minh thao tác mở file trực tiếp. Cloud Desktop báo enabled nhưng không có công cụ cua/js hoặc browser được cung cấp cho phiên này; không thể kiểm AI Studio trong Chrome chia sẻ. Environment: ccarenv_b64_Y2NhcmVudl8zNTNkMGRhYTc0ZjA4MTkxYTEzYWUyMzcxZDhlNTlmNg.

Địa chỉ và mặt bằng AU là hư cấu theo xác nhận người dùng và được người dùng cho phép công khai trong repository này.
