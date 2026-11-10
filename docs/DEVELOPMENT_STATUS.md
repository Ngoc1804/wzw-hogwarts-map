# WIZAMAP — trạng thái sau kiểm tra toàn atlas

## Vùng đứng ngoài trời

`runtime/template-spatial.json` cung cấp vùng đứng bảo thủ cho H1, H2, Hogsmeade và Diagon/Knockturn. Sinh từ lớp đường/mặt đất SVG thật, trừ mọi artwork vật cản và mép chống răng cưa; không suy sàn từ bbox. H1/làng/Diagon chỉ cho đứng trên phần đường nhìn thấy; H2 có nền đất nhìn thấy, loại hồ, công trình, cây và khe vực. Metadata ghim SHA-256 của index.html; sửa artwork phải dựng lại bằng `node tools/build_spatial.cjs` và duyệt trực quan.

MAP_DATA có thể cung cấp `view.spatial` riêng để mô tả vùng mặt đất bị công trình che. **Chưa có mặt bằng vật lý phía sau từng công trình được duyệt**; registry bảo thủ không tự cho đứng trong silhouette mái/nhà.

Dấu chân giữ đúng tọa độ SVG khi zoom/đổi viewport; chỉ nhãn được tách hàng. Kiểm thử Chromium: 13 template mở được; bốn template ngoài trời kiểm tọa độ dấu chân desktop/mobile, zoom, serialize và render lại.

## Công trình che nhân vật

Các polygon occlusion trong MAP_DATA có binding chính xác tới SVG. Hover/focus/selection làm mờ tất cả công trình che cùng điểm xuống 0.5, giữ trạng thái chọn khi hover actor khác, khôi phục opacity/priority gốc khi bỏ chọn hoặc đổi cảnh. Chưa tuyên bố có polygon vật lý occlusion đầy đủ cho mọi công trình trong bốn bản đồ.

## Độ phủ atlas

Báo cáo máy đọc: `docs/atlas-coverage.json`; tái kiểm: `node tools/audit_coverage.mjs`.

- 726 địa điểm: 106 có binding template, 439 dựng được cảnh trong nhà với vùng đứng an toàn.
- 90 địa điểm bị khóa theo policy AU/CCC đã duyệt.
- 67 còn thiếu binding mặt bằng cố định; 24 còn thiếu mặt bằng ngoài trời.
- Tên chuẩn hiện có đủ cho mọi ID. Fallback lấy function/corridor từ atlas, không biến địa điểm ngoài trời thành phòng hình chữ nhật.

**Chưa hoàn tất toàn bộ ba hạng mục.** 91 địa điểm thiếu mặt bằng/binding và vùng đất bị nhà che cần được thiết kế/đối chiếu tiếp; không thay bằng liên kết đại khái tới cả tầng hay cả khu.

Không lưu layout, không pathfinding, không tự mở các AU đang khóa. Không merge main. AI Studio có đăng nhập và điện thoại thật chưa nghiệm thu.

Bundle: 677595190cd1959cffedafb8968754afe0cf9fb5 (asset/atlas giữ SHA nguồn cũ vì artwork không đổi).

## Indoor và flow đơn giản hóa

Đã ghép nội thất/decor theo công dụng và yêu cầu MAP_DATA, asset thư viện hoặc hình vector custom; semantic sàn dùng chung, bảng tên trên mái, hover/chạm công trình 50%, dấu giày rõ hơn. Bundle tải atlas/asset theo nhu cầu. Quy trình và bộ cảnh thử: [INDOOR_PREVIEW.md](INDOOR_PREVIEW.md). Độ phủ atlas phía trên không đổi.

## Rà lại cơ chế /MAP

Bảng quyết định: `maps/decision-atlas.json`; hướng dẫn Gemini: `docs/GEMINI_QUICKSTART.md`. Số mục thiếu binding/surface là thiếu metadata vị trí đã xác minh, không phải số map phải dựng sẵn. Template bắt buộc giữ artwork; Gemini cung cấp atlasRef kỹ thuật đúng khi chưa có binding canonical. Cảnh ngoài trời tự do vẫn cần geometry phù hợp; renderer indoor không thay thế địa hình ngoài trời.

## Phần 1–3: hợp đồng và entry production

Nguồn phát triển là fix/map-flow-review, nền 23359d6. MAP_DATA 2.0 hỗ trợ bỏ trường trình bày theo default trong schema; quyền hiển thị và dữ kiện RP vẫn gửi rõ. Có hint thì cần questPolicy. Production không có editor JSON/menu template/test hook; QA bật --debug. JSON lỗi và render lỗi hiện thông báo, xóa cảnh/inspector cũ. Cả JSON #MAP_DATA và window.MAP_DATA đều được hỗ trợ.

Kiểm tra mới ghi tại parts1to3 trong runtime-validation.json; các số liệu cũ là lịch sử, không phải nghiệm thu Playground. 91 mục thiếu binding/surface, phạm vi AU và phần dọn toàn repo không thay đổi.
