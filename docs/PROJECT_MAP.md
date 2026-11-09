# Tìm map, asset và lớp giao diện

| Map ID | Nội dung |
|---|---|
| h1 | Hogwarts và Hogsmeade tổng quan; animation; địa hình/shading |
| h2 | Khu Hogwarts chi tiết; 72 địa điểm, Quidditch đầy đủ, cây Liễu Roi tách xa nhà cú |
| hall | Đại Sảnh |
| ministry2 | Bộ Pháp Thuật hiện có |
| express | Tuyến tàu và năm mặt bằng toa |
| gryffindor-common | Phòng chung và phòng ngủ Gryffindor |
| ravenclaw-common | Phòng chung và phòng ngủ Ravenclaw |
| hufflepuff-common | Phòng chung và phòng ngủ Hufflepuff |
| slytherin-common | Phòng chung và phòng ngủ Slytherin |
| village-static | Hogsmeade chi tiết |
| pitch-static | Quidditch chi tiết |
| diagon-knockturn | Diagon và Knockturn trong một map |

## Các điểm hay sửa trên H1

| Mục | Selector/nguồn |
|---|---|
| Nền phân khu | `#h1-terrain-washes`, `templates/h1/shading-tokens.json` |
| Bóng dưới công trình/cây | `#h1-ground-shadows` |
| Chặn shading khỏi mặt hồ | `#h1-land-only`, `[data-lake-outline]` |
| Lâu đài | `[data-element="r2-castle"]` |
| Hagrid | `[data-element="house.hagrid-hex"]` |
| Ga | `[data-element="r2-station"]`, `#station-pavers` |
| Cây cổ thụ | `#pose-lakeside-tree`, `[data-element="r3-ancient-tree"]` |
| 10 tiệm | `[data-id="village-house-0"]` tới `village-house-9` |
| Animation | hàm `mountH1Motion` trong HTML; `elements/h1-motion.js` là bản tham chiếu |

Bản mô tả map và ID máy đọc được nằm trong [catalog](../maps/catalog.json). Không có bản SVG thứ hai được commit cho mỗi map: dùng tools/atlas.py để trích đúng source hiện tại, tránh hai bản bị lệch nhau.

Element khung được đặt tên theo nhóm: `house.*`, `tree.*`, `architecture.*`, `map.h1.*`… Tìm ID trong [elements/catalog.json](../elements/catalog.json), rồi mở trường `file`. Các khung dùng biến màu; màu và decor của instance trên map có thể khác.


## H2 đã duyệt

Chọn H2 từ menu atlas. `python tools/atlas.py extract h2` lấy source hiện hành. ID SVG dùng tiền tố `h2-`; các điểm tương tác dùng `h2-place-*`. Nút Tên khu chỉ hiện ở H2. Các asset H1/elements được nhúng một lần và tái sử dụng qua symbol/use; không cần ảnh, CDN hoặc HTML riêng.
