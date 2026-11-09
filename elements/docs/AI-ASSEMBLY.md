# Hướng dẫn AI ghép element

1. Tìm ID trong catalog theo category, tags, view. Kích thước mặc định là canvas thiết kế 256×256, không phải mét. Bounding box là hình học thực tế, chưa có padding nét/bóng.
2. Chèn SVG dưới dạng SVG con hoặc symbol/use. Instance có ID riêng và `data-element-id` tham chiếu mẫu. Đổi x/y/width/height/rotation ở instance; không sửa file gốc.
3. Dùng hybrid theo mẫu đã duyệt: phòng, tường và lối đi thể hiện dạng mặt bằng; nội thất/decor có thể dùng top, front, elevation hoặc 2.5D phù hợp bố cục. Không bắt buộc tạo bản top cho mọi đồ vật. Giữ khoảng trống và tỷ lệ, không xoay hình mặt đứng để giả là ký hiệu kết cấu mặt bằng.
4. Dùng surface của bàn để đặt đồ nhỏ bên trong. Không đặt đồ vượt bề mặt. Đồ nhỏ có tag place-on-surface. Surface rỗng nghĩa là chưa có thông tin, không được tự coi là toàn canvas.
5. Thay thuộc tính fill của node có data-color-fill bằng màu trong palette instance. Không tạo catalog đỏ/xanh/vàng cho cùng shape. Giữ cấu trúc path.
6. Occupancy geometry-bbox giúp tránh đè hình; thêm khoảng trống và kiểm tra cửa/lối đi khi dựng phòng. collisionReady=false: chưa là polygon điều hướng.
7. Ports chỉ có nghĩa ở element đã khai báo. Tường thẳng dùng a/b; cầu thang dùng bottom/top; nhà entry chỉ là điểm đặt cửa minh họa. Không tự coi các điểm này đã khớp qua mọi phép biến đổi; phải chuyển về tọa độ scene.
8. Layer: nền → mặt nước/đường → kết cấu → nội thất → đồ nhỏ → cây/nhà theo độ sâu → UI tương tác. Nhãn và vùng click là lớp UI riêng, không thêm vào SVG asset.
9. Cây trùng ID được phép lặp trong scene; không sinh thêm asset chỉ vì thay kích thước hoặc màu. Seed dùng cho bố cục, không thay hình mỗi lần render.
10. Các nhà khối là preset minh họa. Roof/awning/chimney/balcony có element riêng để ghép thêm; muốn sửa cấu trúc sâu thì dùng generator house(kind) trong scripts/new_house_assets.py. Không gọi preset đã có cửa là khối nhà trống.

Ví dụ:

```html
<svg viewBox="0 0 1000 700">
  <svg x="300" y="200" width="180" height="110"
       viewBox="0 0 256 256" data-element-id="table.dining">
    <!-- nội dung SVG table.dining -->
  </svg>
</svg>
```

Thiết kế sử dụng bộ nét và palette chung; không dùng filter hoặc marker vòng tròn để báo hover. Việc tô chọn nên tác động lớp UI hoặc border của inspector.

`npm run build` chỉ đóng gói lại gallery từ catalog và asset hiện có. Atlas dùng duy nhất `../index.html`; không đưa lại catalog hoặc hình từ các bản cũ.


