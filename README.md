# WIZAMAP · Demo 3

Nguồn phát triển: **demo-3**. Atlas đã thay bằng danh mục được duyệt trong `maps/WZW_ATLAS_APPROVED.md`; runtime dùng `atlas-approved-2.0`. Gemini xuất cảnh RP công khai; JavaScript chọn map, tự ghép nội thất và đặt nhân vật. Chỉ dán một prompt; không nạp file tra cứu. Engine tự đối chiếu tên chuẩn trong dữ liệu đã đóng gói. MAP_DATA 3.0 chỉ cần meta, places, actors; hints và cấu hình hiển thị là tùy chọn.

- [Flow và hợp đồng](docs/MAP_FLOW.md) · [JSON Schema](runtime/map-data.schema.json)
- [Prompt /MAP để chép vào System Prompt](docs/MAP_PROMPT.md) · [Loader](ui/preview.html)
- [Kết quả kiểm tra](docs/validation.json) · [Gộp nhánh chọn lọc](docs/CONSOLIDATION.md)
- [Tiến độ Demo 3](docs/DEMO3_PROGRESS.md) · [Binding còn thiếu theo atlas mới](docs/DEMO3_REMAINING_BINDINGS.md)
- [Coverage cũ — chỉ lịch sử](docs/COVERAGE_REVIEW.md)

`index.html` giữ 13 template artwork đã duyệt; `elements/index.html` là gallery 259 SVG. Hai file phục vụ hai mục đích, không phải phiên bản runtime cạnh tranh. Một bundle production tại runtime/bundle.js. Mọi bản HTML kiểm thử, cache, node_modules và ảnh kiểm tra sinh ngoài cây source hoặc bị gitignore.

Tìm/chỉnh artwork qua [PROJECT_MAP](docs/PROJECT_MAP.md), [EDITING](docs/EDITING.md), maps/catalog.json và tools/atlas.py. Giữ ID, animation, giấy phép và attribution; không sinh lại SVG từ generator cũ. Bộ khung nhà có 18 mẫu, cây có 12 dạng và 2 mẫu đặc biệt.

Kiểm tra: `node --test tools/test_*.mjs`; `python tools/atlas.py validate`; `python tools/review_coverage.py --check`. Browser và gallery chạy theo .github/workflows/validate.yml.

Compile/kiểm atlas: `python tools/build_atlas_index.py --check`. Audit mới: `node tools/audit_coverage.mjs`; các trạng thái thiếu binding/chờ vị trí/loại trừ không được tính hoàn thành. Một indoor engine dùng cho mọi nhà/phòng generated, vật liệu wood/brick/stone tùy biến; outdoor schematic dùng kho assets. Bundle production chỉ cập nhật sau nghiệm thu, source/candidate không phải RP thật.
