# WIZAMAP · Demo 2

Nguồn phát triển duy nhất: **demo-2**. Gemini xuất cảnh RP công khai; JavaScript chọn map, tự ghép nội thất và đặt nhân vật. MAP_DATA 3.0 chỉ cần meta, places, actors; hints và cấu hình hiển thị là tùy chọn.

- [Flow và hợp đồng](docs/MAP_FLOW.md) · [JSON Schema](runtime/map-data.schema.json)
- [Prompt /MAP để chép vào System Prompt](docs/MAP_PROMPT.md) · [Loader](ui/preview.html)
- [File tra cứu nạp vào Gemini](maps/ai-lookup.json)
- [Kết quả kiểm tra](docs/validation.json) · [Gộp nhánh chọn lọc](docs/CONSOLIDATION.md)
- [84 mục thiếu metadata/geometry](docs/COVERAGE_REVIEW.md)

`index.html` giữ 13 template artwork đã duyệt; `elements/index.html` là gallery 259 SVG. Hai file phục vụ hai mục đích, không phải phiên bản runtime cạnh tranh. Một bundle production tại runtime/bundle.js. Mọi bản HTML kiểm thử, cache, node_modules và ảnh kiểm tra sinh ngoài cây source hoặc bị gitignore.

Tìm/chỉnh artwork qua [PROJECT_MAP](docs/PROJECT_MAP.md), [EDITING](docs/EDITING.md), maps/catalog.json và tools/atlas.py. Giữ ID, animation, giấy phép và attribution; không sinh lại SVG từ generator cũ. Bộ khung nhà có 18 mẫu, cây có 12 dạng và 2 mẫu đặc biệt.

Kiểm tra: `node --test tools/test_*.mjs`; `python tools/atlas.py validate`; `python tools/review_coverage.py --check`. Browser và gallery chạy theo .github/workflows/validate.yml.
