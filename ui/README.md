# UI cố định WIZAMAP

Wizawi – Toà soạn Mộng Mị. Shell, ribbon và dấu chân lấy từ lịch sử **demo-1 tại 9e54f6a**, không lấy main làm chuẩn. Chỉ trích UI, không mang payload map cũ/NPC/quest fixture vào.

- `shell.html` và `shell.css`: khung theo ảnh duyệt. Nội dung các slot để trống.
- `tokens.json`: bảng màu; tuần tra đỏ #E32636, viền xám đen #303238; nhóm/đám đông xanh xám #526E73, viền vàng cát #D5BD8A.
- `components.mjs`: ribbon/chip nhân vật, rule prefect tuần tra và footsteps.
- Không có tag địa điểm. Tên địa điểm vẫn nằm trong sidebar; chữ biển hiệu/kiến trúc đã vẽ trên template không phải actor ribbon.
- Prefect chỉ override sang patrol khi `onPatrol=true`. Gemini gửi identity bình thường và role; không gửi mã màu.
- Reduced motion: dùng hai chân đứng luân phiên opacity chậm, không dịch chuyển; đây là lựa chọn người dùng đã chốt, khác hoàn toàn tắt animation.
- Walk: 6 nhịp × 550 ms, sau đó ẩn 2000 ms. Không tạo state di chuyển RP.

Bộ UI giữ nguyên để ghép vào viewer. Hợp đồng MAP_DATA 1.0.0 đã có tại `../runtime/`; flow tại `../docs/MAP_FLOW.md`. Chưa thay viewer `index.html` hoặc hoàn tất nối vận hành.
