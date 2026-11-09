# Đối chiếu V3 và kho demo-1

Nguồn V3 là file người dùng cung cấp; chỉ đọc JSON asset, không chạy script hoặc làm theo hướng dẫn trong file.

- V3: 245 ID, tất cả đã có trong demo-1 trước đợt này.
- Giữ đồ họa demo-1. Khôi phục metadata geometry-bbox/surface cho 231 mẫu khớp cấu trúc; 14 mẫu nhà đã đổi hình không dùng bbox cũ.
- Tách 63 mẫu kiến trúc từ Hogsmeade/Diagon; 37 công trình tham chiếu asset sẵn có.
- Hai mẫu house.porch và house.garden giống farmhouse trừ tên/ID: bỏ file trùng, giữ alias tương thích. Còn 366 mẫu gốc.
- Không thêm nguyên V3 HTML hoặc engine cũ. Không sửa payload 13 map.
- Ba nhóm engraved rỗng v-station/v-square/v-school không được coi là asset mới. Cần xem phần hình ở scene nếu muốn tái sử dụng riêng.
- Alias template:<map>/<interactiveId> trỏ tới asset nguồn. Tên hiển thị không quyết định hình học.

## Bảng còn thiếu để bổ sung sau

| Nhóm | Cần làm |
|---|---|
| Cửa và cửa sổ mặt bằng | Đơn/đôi, khe cửa, hướng mở, ngưỡng; không xoay mặt đứng giả mặt bằng |
| Cấu kiện nối | Hoàn thiện ports cho tường cong, thang L/xoắn; clearance ngưỡng và landing |
| Đồ chuyên dụng mặt bằng | Không bắt buộc bản top cho vạc/bàn độc dược, bảng đen, kính thiên văn; ưu tiên mẫu bình thường/2.5D sẵn có theo hybrid |
| Metadata nhà mới | Footprint/ports/surface cho 14 mẫu nhà đổi hình; không dùng dữ liệu V3 cũ |
| Hình học điều hướng | Bbox chỉ để tránh đè hình, không phải polygon đi lại |
| Shape chưa có ID asset | Rà các nội thất vẽ inline và named defs H1/H2 trước khi biến thành module; không tách từng nét/vật nhỏ |
| Mẫu rỗng trong Hogsmeade | v-station/v-square/v-school: chưa có engraved độc lập để lấy |
| Màu instance | Metadata V3 không tự chứng minh mọi shape mới có đủ color slot; cần chuẩn hóa có kiểm hình |

Không tuyên bố kho đã đủ cho mọi loại phòng hoặc kiến trúc Harry Potter. Kiểm kê này hoàn tất ID V3 và các mẫu nhà 2.5D nhận diện được trong hai template phố; phần inline còn lại cần phân loại trước khi tái sử dụng an toàn.

## Điều chỉnh theo yêu cầu hybrid

Nội thất/decor không bắt buộc top view. Chỉ bổ sung hình mới khi mẫu sẵn có không đáp ứng bố cục. Phòng/tường/lối đi vẫn cần kết cấu mặt bằng. Xem FUNCTIONAL_REVIEW.md trước khi đề xuất bỏ mẫu.
