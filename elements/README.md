# Element frameworks · 247 SVG

Mở [index.html](index.html) để tìm element, xem Khung/Trung tính và tải SVG. [catalog.json](catalog.json) chứa ID, nhóm, tags, view, màu và đường dẫn file; SVG độc lập nằm trong `assets/`.

Các mẫu là khung tái sử dụng: áp màu/decor ở instance. Nhà Hagrid lục giác: `house.hagrid-hex`; mặt tiền và element H1 dùng prefix `map.h1.*`. Xem [inventory](docs/inventory.md) và [hướng dẫn ghép](docs/AI-ASSEMBLY.md).

## Công cụ

- `npm ci`: cài dependency cho các công cụ thư viện.
- `npm run build`: đóng gói lại gallery từ catalog và SVG đang có, rồi kiểm tra XML/ID/tham chiếu.
- `npm test`: kiểm tra gallery hiện tại: pagination, tìm kiếm, xem trung tính và tải SVG.

Thư viện chỉ giữ công cụ đóng gói/kiểm tra hiện hành và bộ sinh framework nhà hiện tại. Không còn bộ sinh catalog cũ hoặc các script phụ thuộc catalog có trường `svg`.

Atlas chính nằm ở [../index.html](../index.html), không được tạo lại bằng generator của thư viện. Dùng [../tools/atlas.py](../tools/atlas.py) để chỉnh từng map.

Giữ [LICENSE.txt](LICENSE.txt), [SOURCES.md](SOURCES.md), [FLAGS-ATTRIBUTION.md](FLAGS-ATTRIBUTION.md) và giấy phép trong docs/licenses khi dùng lại asset. Bản demo không chuyển quyền sở hữu nhận diện hư cấu.

