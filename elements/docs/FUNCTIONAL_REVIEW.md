# Rà soát 259 asset — chờ duyệt

Rooms/walls/circulation use a floor plan. Furniture/decor may use top, front or 2.5D as appropriate.

Không xóa hoặc nén lại file nguồn trong đợt này. Không bắt buộc decor chuyên dụng có bản mặt bằng.

| Phép đo | Trước | Sau dự kiến / đo thử |
|---|---|
| SVG thô → mỗi SVG gzip riêng | 1,333.9 KiB | 210.9 KiB |
| SVG thô → một luồng gzip thử trong RAM | 1,333.9 KiB | 119.3 KiB |
| HTML gallery → gzip HTTP giả lập | 188.6 KiB | 141.0 KiB |
| Gộp tất cả ứng viên (trần lý thuyết, chưa gồm preset/decor) | 1,333.9 KiB | ≥ 1,305.5 KiB |

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

- Kho nhà đã rút về 9 base trong ba nhóm gỗ/tường/basic. Hình instance có tên riêng giữ trong template, không làm thành thẻ asset riêng.
- Giường đơn/đôi/tầng/có màn; cửa đơn/đôi/vòm/sắt; tường thẳng/góc/T/cong; lò Floo và bảo vật đã chọn có khác biệt sử dụng, không gộp mù.
- Danh sách đủ 259 mẫu và quyết định từng mẫu: `functional-review.json`; HTML tải xuống hiển thị trực tiếp SVG hiện hành.
