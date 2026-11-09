# WIZAMAP · demo-1

**Bản đã chốt:** atlas hiện tại nằm duy nhất ở **[index.html](index.html)**: 13 map, H1 có animation và shading địa hình/kiến trúc. Mở trực tiếp file HTML; không cần server hay CDN. Dùng nút **Tải HTML** để lưu bản đầy đủ.

## Tìm nhanh

| Cần làm | Bắt đầu tại |
|---|---|
| Xem/chỉnh map đang dùng | [maps/catalog.json](maps/catalog.json), [hướng dẫn chỉnh sửa](docs/EDITING.md) |
| Tìm từng map, ID và hook | [Bản đồ dự án](docs/PROJECT_MAP.md) |
| Tái sử dụng nền/shading H1 | [templates/h1](templates/h1/README.md) |
| Xem 259 element khung | [elements/index.html](elements/index.html) |
| Tìm asset theo ID/nhóm | [elements/catalog.json](elements/catalog.json), [inventory](elements/docs/inventory.md) |
| Làm việc bằng AI | [AGENTS.md](AGENTS.md) |
| Kiểm tra bản hiện tại | [docs/release.json](docs/release.json), [validation](docs/validation.json) |
| Xem atlas trong iframe thử nghiệm | [tools/preview.html](tools/preview.html) |

## Cấu trúc

```text
index.html          Atlas độc lập duy nhất, dữ liệu SVG nén gzip bên trong
maps/catalog.json   Danh mục 13 map và ID tương tác; tạo tự động từ HTML
templates/h1/      Overlay shading và bảng màu/vị trí tái sử dụng
elements/          Thư viện 259 SVG khung, gallery, tài liệu và bộ sinh mẫu
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

H1 giữ đủ 10 tiệm Hogsmeade ở vị trí đã duyệt; nhà Hagrid lục giác; ga nằm giữa nền gạch; cây cổ thụ ở bãi cỏ phía tây hồ. Lớp địa hình dùng gradient tĩnh và mask bờ hồ. H2 có lâu đài, hai sân trong, sân Quidditch đầy đủ, nhà kính, nhà Hagrid, nhà cú, cầu gỗ H1 và Liễu Roi. Bản đồ là SVG tương tác, có nền địa hình và lối đi; dữ liệu nằm trong payload gzip dùng chung.

Express, các map phòng chung/phòng ngủ, Hogsmeade, Quidditch và Diagon/Knockturn đều nằm trong atlas. Xem danh mục để lấy đúng ID. Demo giao diện/asset này chưa thay thế tích hợp MAP_DATA của WzW Runtime.

Nhánh chỉ giữ bản hiện hành. Không lưu thêm index-v*.html, bản ZIP, cache, snapshot hoặc bộ sinh catalog cũ cạnh bản chính. Lấy đúng bản theo mã SHA-256 trong `docs/release.json`; mọi chỉnh sửa tiếp theo bắt đầu từ bản này.



## Bộ tầng 8–10

Chọn Bộ Pháp thuật · Tầng 8–10 trong menu. Atrium, Bảo mật và Xét xử xếp dọc, nối bằng lift 8↔9 và cầu thang 9↔10. Xem `docs/MINISTRY_8_10.md` và source `tools/build_ministry.py`.

## Bộ hiện hành và bước tiếp theo

- **259 asset** trong `elements/catalog.json` và `elements/assets/`; không có file SVG mồ côi.
- **18 base nhà** (6 gỗ, 6 tường, 6 basic), **12 cây hình khối riêng + 2 cây đặc biệt**.
- Hình gốc trung tính; màu là instance/palette tại `elements/palettes.json`.
- Gallery đầy đủ: `elements/index.html`. Bản duyệt nhà/cây offline duy nhất: `tools/scenery-review.html`.
- Nguồn sinh mẫu hiện hành: `elements/scripts/redesign_scenery.py`; dựng bản duyệt: `python tools/build_scenery_review.py`.
- UI/nhãn/footsteps nằm trong `ui/`, được nối qua runtime/viewer.mjs.
- Phần atlas canon do phiên khác phụ trách; không lấy danh mục template hiện tại làm giới hạn toàn thế giới.

Sau khi nhận atlas: chốt schema MAP_DATA và bridge engine → ghép UI cố định → renderer template/hybrid trong Preview một chiều → actor/hint/fog → kiểm thử HTML shell trong Google AI Studio qua jsDelivr ghim commit. Không đưa NPC/quest/state RP vào GitHub.

Xem [trạng thái dọn repo](docs/CLEANUP.md). Không lưu thêm HTML/ZIP phiên bản; bản cũ tra trong lịch sử Git.

## MAP_DATA và flow đã chốt

- [Cơ chế /MAP](docs/MAP_FLOW.md)
- [Hợp đồng, module và trạng thái triển khai](runtime/README.md)
- [JSON Schema 2.0.0](runtime/map-data.schema.json)
- Hai file ví dụ đã loại bỏ; runtime yêu cầu MAP_DATA RP, không tự hiển thị dữ liệu mẫu.
- Kiểm tra: `node --test tools/test_map_data.mjs`. Runtime Preview hiện hành và giới hạn được ghi trong docs/DEVELOPMENT_STATUS.md.

## Runtime mới
Xem [runtime/README.md](runtime/README.md), [quyết định atlas](docs/ATLAS_DECISIONS.md) và [luồng hiện hành](docs/MAP_FLOW.md). MAP_DATA 2.0.0 thay thế hợp đồng cũ có storage/locality.

## Công thức kiến trúc trong nhà — chặng 2

10 họ công thức có thể điều chỉnh số phòng, kích thước, hình phòng và bề rộng hành lang; tường cố định, không nội thất. [Source element](elements/architecture/README.md) · [API, cách chọn và giới hạn](docs/INDOOR_STAGE2.md). HTML review nén tự chứa được build từ source. Atlas, ngoài trời và tích hợp viewer MAP_DATA để chặng sau khi được duyệt.
