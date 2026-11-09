# Rà soát 366 asset — chờ duyệt

Rooms/walls/circulation use a floor plan. Furniture/decor may use top, front or 2.5D as appropriate.

Không xóa hoặc nén lại file nguồn trong đợt này. Không bắt buộc decor chuyên dụng có bản mặt bằng.

| Phép đo | Trước | Sau dự kiến / đo thử |
|---|---|
| SVG thô → mỗi SVG gzip riêng | 3,097.0 KiB | 503.4 KiB |
| SVG thô → một luồng gzip thử trong RAM | 3,097.0 KiB | 266.2 KiB |
| HTML gallery → gzip HTTP giả lập | 402.5 KiB | 301.5 KiB |
| Gộp tất cả ứng viên (trần lý thuyết, chưa gồm preset/decor) | 3,097.0 KiB | ≥ 3,068.7 KiB |

Không cộng các con số tiết kiệm này: chúng thuộc các cách đóng gói khác nhau. Gzip HTTP không làm nhẹ file HTML lưu trên đĩa. Gallery đã nén payload nội bộ.

## Giữ / gộp / bỏ

- 0 nhóm trùng XML sau khi bỏ tên/ID root.
- Chưa có mẫu nào được xác nhận bỏ trong 366 mẫu hiện tại.
- Mỗi ứng viên gộp phải duyệt hình trước; cùng chức năng chưa đủ để xóa.

| Nhóm | Mẫu gốc đề xuất | Ứng viên thành preset | Trần giảm SVG thô |
|---|---|---|---|
| Vạc thường / vạc lớn | `wizard.cauldron` | `wizard.cauldron-large` | 1.8 KiB |
| Lò sưởi trang trí | `wizard.fireplace-stone` | `fixture.fireplace`, `wizard.fireplace-carved`, `wizard.fireplace-gothic` | 5.2 KiB |
| Khung tranh | `decor.portrait` | `object.portrait`, `decor.landscape`, `decor.portrait-wall` | 6.8 KiB |
| Gương | `decor.mirror` | `object.mirror` | 1.3 KiB |
| Rèm | `decor.curtain-tall` | `extra.curtain`, `decor.curtain-partition`, `decor.curtain-bed` | 4.0 KiB |
| Đèn chùm | `decor.chandelier` | `accessory.chandelier` | 2.1 KiB |
| Thùng nước | `object.barrel` | `extra.rainbarrel` | 1.1 KiB |
| Thảm chữ nhật | `object.rug` | `decor.rug-runner` | 1.2 KiB |
| Tủ trưng bày | `wizard.display` | `storage.display` | 1.8 KiB |
| Tủ lưu trữ | `wizard.archive` | `storage.files` | 1.3 KiB |
| Kính thiên văn / cụm thiên văn | `wizard.telescope` | `cluster.astronomy` | 1.8 KiB |

## Kiến trúc và các mẫu khác

- 63 hình nhà phố tách từ template, 38 mặt tiền, 21 biến thể map: giữ hình đã duyệt. Cần dựng hệ preset thân/mái/biển hiệu trước khi giảm số file, không xóa theo tên chức năng.
- Giường đơn/đôi/tầng/có màn; cửa đơn/đôi/vòm/sắt; tường thẳng/góc/T/cong; lò Floo và bảo vật đã chọn có khác biệt sử dụng, không gộp mù.
- Danh sách đủ 366 mẫu và quyết định từng mẫu: `functional-review.json`; HTML tải xuống hiển thị trực tiếp SVG hiện hành.
