# Kho asset hiện hành và phần còn thiếu

Kho hiện 259 mẫu. Nhà: 6 gỗ, 6 gạch/tường, 6 basic; cây: 12 hình khối riêng và 2 mẫu đặc biệt. Các rendition theo địa điểm đã rút khỏi gallery, alias/preset chỉ ghi ánh xạ base, không khẳng định tái dựng chính xác mọi facade cũ. Template giữ artwork instance đã duyệt.

| Phần cần bổ sung | Trạng thái |
|---|---|
| Cửa/cửa sổ kết cấu mặt bằng | Hướng mở, ports, clearance; không thuộc danh mục địa điểm atlas |
| Footprint/ports | Cần đo cho các base mới; không dùng metadata từ những nhà cũ đã bỏ |
| Màu/decor theo instance | Base hiện có màu mặc định; chưa chuẩn hóa mọi màu thành token tham số |
| Canon atlas | Research độc lập toàn cõi, không giới hạn vào 13 template; xem docs/research/ATLAS_DESIGN.md |
| Phòng chưa có template | Bộ dựng hybrid phải dùng base/asset; không đòi mọi decor có bản top |

V3 đã đối chiếu ở đợt trước. Không phục hồi 366 mẫu hoặc generator nhà đời cũ. Nhà/cây vừa lọc theo yêu cầu người dùng hiện tại; Các đề xuất nội thất cũ không được tự áp dụng: giữ nguyên bộ 259 asset hiện hành.

Các master nhà/cây mới dùng CSS custom properties; palette nằm riêng ở palettes.json. So sánh hình trung tính trước khi thay màu. Không sinh ID mới vì đổi màu/xoay tán.
