# WIZAMAP: hướng dẫn làm việc trong demo-1

## Bắt đầu

Bản đã chốt duy nhất là `index.html` theo SHA-256 trong `docs/release.json`. Mọi chỉnh sửa tiếp theo bắt đầu từ bản này. Không khôi phục generator/catalog/HTML của các đợt cũ vào nhánh.

- Đọc README.md, maps/catalog.json và docs/PROJECT_MAP.md để chọn đúng file/map.
- `index.html` là atlas duy nhất được phát hành. SVG gốc nằm trong payload gzip `#map-data`; không sửa base64 bằng tay và không dựng lại từ cache/phiên bản cũ.
- Dùng `python tools/atlas.py extract <id>` để lấy SVG vào `.atlas-work/`, `apply` để chèn lại và `validate` để kiểm tra. Bản `--standalone` có defs chèn thêm chỉ dùng xem trước.
- `templates/h1/` chứa nền shading tái sử dụng. `elements/catalog.json` và `elements/assets/` là nguồn khung element; đọc elements/docs/AI-ASSEMBLY.md khi ghép asset.

## Giữ đúng thiết kế đã duyệt

- Giữ 13 map, ID tương tác, đường đi và bố cục trừ khi yêu cầu hiện tại cho phép thay đổi. H2 đã được duyệt và tích hợp trong atlas; không tạo thêm HTML phiên bản hoặc SVG giải nén trong repo.
- H1 có đủ 10 tiệm Hogsmeade ở vị trí cũ, Hagrid lục giác, ga giữa nền gạch, cây cổ thụ phía tây hồ.
- Giữ `#camera`, các `data-id`, `data-element`, `.cloth`, `.ancient-canopy`, `data-willow-strand`, `data-lake-outline`, `data-emitter`, nút motion và download.
- Shading đất phải dùng mask bờ hồ; ưu tiên gradient dùng chung, tránh blur diện tích lớn và nhiều vòng animation.
- Không chỉnh shape dùng chung cho một thay đổi chỉ thuộc một instance. Khi tối ưu, chỉ bỏ defs không tham chiếu và bản sao thực sự giống nhau; giữ ID cần tương tác.

## Thư viện và kiểm tra

- `cd elements && npm run build` đóng gói lại gallery từ các SVG/catalog hiện có rồi kiểm tra. Không sinh lại hình.
- Kiểm tra phù hợp thay đổi: `python tools/atlas.py validate`, `python tools/test_atlas.py`; với gallery thêm `cd elements && npm test` sau `npm ci`.
- Với thay đổi hình, kiểm tra bằng trình duyệt ở toàn cảnh và khi zoom; H1 phải còn animation, pause/resume và tải HTML rồi mở lại được.
- Chạy `python tools/atlas.py refresh` để cập nhật danh mục và mã SHA-256; cập nhật docs/validation.json đúng các kiểm tra đã làm.

## Giữ repo gọn

Không commit `.atlas-work/`, node_modules, file cache, ZIP, HTML dự phòng, ảnh kiểm thử hay payload giải nén cũ. Dùng lịch sử Git để phục hồi. Giữ giấy phép và nguồn asset. Chỉ commit/push lên GitHub khi yêu cầu người dùng cho phép; không tự merge vào main.



## UI và atlas hiện hành

UI chuẩn được trích từ lịch sử demo-1 tại 9e54f6a, không lấy main làm thiết kế. `ui/` giữ shell, palette và footsteps tái sử dụng. Không có nhãn địa điểm dạng ribbon; chỉ nhãn PC/NPC/nhóm. Chữ kiến trúc/signage nằm trong template không phải actor tag. Prefect chỉ dùng màu tuần tra khi onPatrol=true; reduced motion dùng hai chân đứng đổi opacity chậm, không dịch chuyển. `maps/world-atlas.json` là index kiến trúc, chưa phải graph canon đầy đủ.
