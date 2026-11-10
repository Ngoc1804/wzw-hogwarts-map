# WIZAMAP

Nguồn phát triển `/map`: **fix/map-flow-review**, bắt đầu phần 1–3 từ `23359d6a10f9f3f22cf23ff4c5e4e097e7b6fd7a`. `main` và `demo-1` là các mốc cũ; không lấy chúng làm runtime hiện hành. Chưa merge hoặc đổi nhánh mặc định.

- [Cơ chế hiện hành](docs/MAP_FLOW.md): Preview một chiều, MAP_DATA 2.0, không seed/storage/backend.
- [Hợp đồng duy nhất](runtime/map-data.schema.json), [hướng dẫn xuất dữ liệu](docs/GEMINI_QUICKSTART.md), [HTML loader](docs/RUNTIME_USAGE.md).
- `index.html` là atlas artwork độc lập gồm 13 map, không phải entry `/map`. Runtime dùng artwork này theo dữ liệu cảnh; không thiết kế lại SVG.
- [Trạng thái và giới hạn](docs/DEVELOPMENT_STATUS.md). 84 mục còn thiếu binding/surface sau rà phần 4, policy AU và nghiệm thu Playground vẫn giữ nguyên phạm vi.
- UI production không có editor MAP_DATA, menu template hoặc test hook. Công cụ QA chỉ bật qua `tools/build_runtime.py --debug`.

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

Runtime đã có bridge, UI và renderer template/indoor trong Preview một chiều; nghiệm thu trực tiếp Google AI Studio vẫn cần thực hiện. Không đưa NPC/quest/state RP vào GitHub.

Xem [trạng thái dọn repo](docs/CLEANUP.md). Không lưu thêm HTML/ZIP phiên bản; bản cũ tra trong lịch sử Git.

## MAP_DATA và flow đã chốt

- [Cơ chế /MAP](docs/MAP_FLOW.md)
- [Hợp đồng, module và trạng thái triển khai](runtime/README.md)
- [JSON Schema 2.0.0](runtime/map-data.schema.json)
- Hai file ví dụ đã loại bỏ; runtime yêu cầu MAP_DATA RP, không tự hiển thị dữ liệu mẫu.
- Kiểm tra: `node --test tools/test_map_data.mjs`. Runtime Preview hiện hành và giới hạn được ghi trong docs/DEVELOPMENT_STATUS.md.

## Runtime mới
Xem [runtime/README.md](runtime/README.md), [quyết định atlas](maps/decision-atlas.json) và [luồng hiện hành](docs/MAP_FLOW.md). MAP_DATA 2.0.0 thay thế hợp đồng cũ có storage/locality.

## Indoor tùy biến và test thực nghiệm

Flow /MAP → MAP_DATA → template/atlas hoặc phòng dựng → nội thất/decor → Preview đã ghép trong runtime. Dùng asset có sẵn hoặc custom vector theo từng yêu cầu. Xem [hướng dẫn](docs/INDOOR_PREVIEW.md); tạo sáu cảnh offline bằng `python tools/prepare_experiment.py`.

## Bắt đầu với Gemini

Đọc [luồng /map ngắn gọn](docs/GEMINI_QUICKSTART.md) và [bảng chọn cảnh](maps/decision-atlas.json).

## Rà soát phần 4

[91 mục đã đối chiếu](docs/COVERAGE_REVIEW.md): nối 6 binding, sửa 1 phân loại indoor; còn 84 mục có hướng xử lý theo ID. Artwork và policy AU giữ nguyên.
