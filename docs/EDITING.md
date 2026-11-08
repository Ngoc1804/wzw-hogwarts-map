# Chỉnh atlas và giữ bản phát hành gọn

1. Chọn ID từ `maps/catalog.json`.
2. `python tools/atlas.py extract <id>` tạo `.atlas-work/<id>.svg` để chỉnh; source này tham chiếu thư viện shape trong HTML.
3. Để xem riêng: `python tools/atlas.py extract <id> --standalone`. Bản `.preview.svg` có defs được chèn thêm. Không chèn bản preview vào atlas.
4. Chỉnh source và chèn lại: `python tools/atlas.py apply <id> --svg .atlas-work/<id>.svg`. Công cụ kiểm tra XML, ID trùng, tham chiếu thiếu và loại vector dùng chung không còn dùng; mã viewer/animation và map khác được giữ nguyên.
5. `python tools/atlas.py validate` và `python tools/test_atlas.py`. Kiểm tra trình duyệt khi đổi hình hoặc tương tác. `validate` là kiểm tra cấu trúc, không thay cho nhìn ảnh hay thử animation.
6. Cập nhật template liên quan nếu có. `python tools/atlas.py refresh` tái tạo catalog và docs/release.json. Ghi đúng kết quả kiểm tra cùng hash của HTML trong docs/validation.json.

## Chú ý với template H1

`templates/h1/shading.svg` chỉ có địa hình và bóng nền, cùng hệ tọa độ H1. Khi ghép, các lớp này nằm dưới đường/công trình; giữ defs và mask loại mặt nước. Tường và mái được shading trực tiếp trong asset của H1, không nằm trong overlay riêng.

## Thư viện element

`elements/assets/` và `elements/catalog.json` là nguồn của gallery. Sau khi sửa framework, chạy `cd elements && npm run build` rồi `npm test` (cài dependency bằng `npm ci` khi cần). Build không chạy generator cơ sở. Các file nguồn/license/attribution luôn đi cùng thư viện.

## Phát hành

Chỉ commit bản atlas `index.html`, template, catalog, công cụ và tài liệu hiện tại. Bản nén tải xuống được tạo ngoài repo; không thêm HTML/ZIP theo ngày hoặc bản v1/v2 vào nhánh. Lịch sử thay đổi đã có trong Git. Khi push, kiểm tra head nhánh trước và dùng cập nhật fast-forward để giữ các commit mới của người khác.
