# WIZAMAP · demo-1

Bản atlas hiện tại nằm duy nhất ở **[index.html](index.html)**: 11 map, H1 có animation và shading địa hình/kiến trúc. Mở trực tiếp file HTML; không cần server hay CDN. Dùng nút **Tải HTML** để lưu bản đầy đủ.

## Tìm nhanh

| Cần làm | Bắt đầu tại |
|---|---|
| Xem/chỉnh map đang dùng | [maps/catalog.json](maps/catalog.json), [hướng dẫn chỉnh sửa](docs/EDITING.md) |
| Tìm từng map, ID và hook | [Bản đồ dự án](docs/PROJECT_MAP.md) |
| Tái sử dụng nền/shading H1 | [templates/h1](templates/h1/README.md) |
| Xem 305 element khung | [elements/index.html](elements/index.html) |
| Tìm asset theo ID/nhóm | [elements/catalog.json](elements/catalog.json), [inventory](elements/docs/inventory.md) |
| Làm việc bằng AI | [AGENTS.md](AGENTS.md) |
| Kiểm tra bản hiện tại | [docs/release.json](docs/release.json), [validation](docs/validation.json) |
| Xem atlas trong iframe thử nghiệm | [tools/preview.html](tools/preview.html) |

## Cấu trúc

```text
index.html          Atlas độc lập duy nhất, dữ liệu SVG nén gzip bên trong
maps/catalog.json   Danh mục 11 map và ID tương tác; tạo tự động từ HTML
templates/h1/      Overlay shading và bảng màu/vị trí tái sử dụng
elements/          Thư viện 305 SVG khung, gallery, tài liệu và bộ sinh mẫu
tools/             Công cụ lấy/chèn từng map, kiểm tra và trang preview
docs/              Sơ đồ dự án, quy trình chỉnh sửa, manifest và validation
```

## Chỉnh một map

```bash
python tools/atlas.py inspect
python tools/atlas.py extract h1
# Chỉnh .atlas-work/h1.svg
python tools/atlas.py apply h1 --svg .atlas-work/h1.svg
python tools/atlas.py validate
python tools/test_atlas.py
```

`extract h1 --standalone` tạo bản SVG xem riêng có đủ shape dùng chung. Bản preview này dùng để xem; áp dụng lại bằng file source từ `extract` thông thường.

## Nội dung hiện tại

H1 giữ đủ 10 tiệm Hogsmeade ở vị trí đã duyệt; nhà Hagrid lục giác; ga nằm giữa nền gạch; cây cổ thụ ở bãi cỏ phía tây hồ. Lớp địa hình dùng gradient tĩnh và mask bờ hồ. H2 không nằm trong bản xuất hiện tại.

Express, các map phòng chung/phòng ngủ, Hogsmeade, Quidditch và Diagon/Knockturn đều nằm trong atlas. Xem danh mục để lấy đúng ID. Demo giao diện/asset này chưa thay thế tích hợp MAP_DATA của WzW Runtime.

Các file cũ được theo dõi bằng lịch sử Git. Không lưu thêm index-v*.html, bản ZIP, cache hay snapshot cạnh bản chính. Thư viện trước đây ở `phase1-assets/` đã chuyển vào `elements/`; trang thử V12 cố định được thay bằng preview dùng atlas hiện tại.
