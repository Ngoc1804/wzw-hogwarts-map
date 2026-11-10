# /MAP → MAP_DATA → Preview

Gemini đọc RP, atlas và yêu cầu người dùng, xuất MAP_DATA. Runtime chọn template đã có binding; khi cần tùy biến phòng, đặt `view.preferredMode="generated"`. Runtime dựng phòng → đặt nội thất/decor → đặt NPC → Preview. Chỉ tải atlas khi dùng template, chỉ tải SVG được dùng; không ghi state, không seed/backend/pathfinding.

## Yêu cầu nội thất

`places[].generation` dùng schema hiện hành. `function` mô tả đúng công dụng: `bedroom`, `classroom`, `library`, `potions`, `kitchen`, `bathroom`, `hospital`, `shop`, `pub`, `storage`, `common`, `study`. Atlas cung cấp công dụng chung; Gemini cung cấp công dụng cụ thể và chi tiết RP. Runtime không suy ra bí mật hay canon từ tên.

Mặc định có bộ đồ chính và decor theo chức năng; bộ mặc định chỉ là điểm bắt đầu. `furnishings` có phần tử thì thay bằng đúng danh sách được yêu cầu. `furnishingsMode="add"` bổ sung/ghi đè theo `id`; `count:0` xóa mục đó. `furnishingsMode="replace"` với danh sách rỗng thể hiện phòng trống có chủ ý.

Mỗi mục có `role`, `count`; chọn `assetId` trong `elements/catalog.json` hoặc cung cấp `custom`. Các thuộc tính tùy chọn:

- `id`: ID trong phòng, dùng cho `on` và ghi đè.
- `width`, `depth`: kích thước hiển thị trong đơn vị cảnh SVG; không phải canvas 256 của asset.
- `placement`: `auto`, `center`, `rows`, `wall-north/south/east/west`.
- `position: {x,y}`: điểm giữa đồ, tính từ góc bbox phòng. Khi chỉ định phải vừa chính xác; không tự dời đồ sang chỗ khác.
- `rotation`: độ xoay; `color`: màu hex sáu chữ số.
- `near`, `nearOffset:{x,y}`: đặt cạnh đồ đã có ID, ví dụ ghế sau từng bàn.
- `on`: ID bàn/kệ đã có surface. Đồ nhỏ phải vừa surface; không tự coi cả canvas là mặt bàn.
- `blocking`: mặc định đồ lớn cản đứng; thảm, tranh, đèn tường không cản.

Ví dụ phần `generation`, không phải toàn bộ MAP_DATA:

```json
{
  "function": "study",
  "shape": "L",
  "width": 420,
  "depth": 360,
  "floorMaterial": "wood",
  "furnishings": [
    {"id":"desk","role":"Bàn nghiên cứu","assetId":"table.desk","count":1,"width":100,"depth":65,"color":"#698B82","placement":"wall-north"},
    {"role":"Sách mở","assetId":"accessory.book-open","count":2,"width":18,"depth":14,"on":"desk"},
    {"role":"Đài phép","count":1,"width":55,"depth":55,"custom":{"width":100,"height":100,"shapes":[{"type":"ellipse","cx":50,"cy":50,"rx":45,"ry":45,"fill":"#658A80"},{"type":"path","d":"M28 65L50 18L72 65Z","fill":"#D7B66B"}]}}
  ]
}
```

Đồ thiếu trong kho: Gemini tạo hình vector qua `custom.shapes` (`rect`, `ellipse`, `path`) đúng phong cách đã duyệt. Có thể ghép nhiều shape; path hỗ trợ hình tùy ý. Không cần tạo asset toàn cục chỉ cho một cảnh. Asset custom làm bàn/kệ khai báo thêm `surface:{x,y,width,height}` trong hệ tọa độ custom. Không tự thay vật đặc thù bằng hình vuông chung chung.

Bộ đặt đồ kiểm hình phòng thực, phép xoay, khoảng mở cửa, chồng đồ lớn và vùng đứng NPC. Giữ một dải trống từ cửa tới trung tâm để bố trí; đây không phải hệ tìm đường. Thiếu chỗ/asset/surface trả lỗi cụ thể, không âm thầm bỏ đồ. Cảnh trong nhà hiện dùng sáu hình phòng `rectangle/L/U/T/cross/round` và mười bố cục hành lang đã có. Đổi hình tự do khác cần thêm công thức, không giả vờ đã hỗ trợ.

## Sàn và NPC

Mọi hình SVG có `data-surface="floor"` đều là sàn đi/đứng được, không phụ thuộc vật liệu. Đặt trên path/rect/circle/ellipse/polygon hoặc group; transform được tính đúng. Template cũ có fill tham chiếu pattern/gradient tên `floor` cũng được nhận diện. `data-surface="blocked"` và vật cản nội thất loại khỏi vùng đứng. Vùng blocked trong MAP_DATA luôn có ưu tiên. Không dùng bbox mái/nhà làm sàn.

Phòng dựng mới tự gắn sàn và vật cản. `floorMaterial` là `stone/wood/tile`; `floorColor` đổi màu sàn. Các loại sàn SVG khác chỉ cần gắn semantic floor một lần, không cần thêm luật đứng riêng. Template ngoài trời giữ dữ liệu mặt đất hiện có làm fallback cho artwork chưa có semantic sàn; dữ liệu này chỉ tải khi cần.

Dấu giày đỏ sáng hơn, tăng scale 0.35 → 0.44, có viền sáng mảnh; không dời tọa độ thật. NPC `stance="walk"` giữ motion và nhãn “Đang đi”. Vị trí truyền rõ được giữ nguyên nếu hợp lệ; khi không truyền trong phòng dựng, lấy các điểm trống khác nhau theo phòng.

Bảng tên nằm trên artwork. NPC `environment="inside"` khi xem bản đồ ngoài có nhãn trên mái (không có dấu giày giả ngoài nhà). NPC ngoài trời dùng position trên đất/sàn. Nếu một place gộp nhiều căn nhà, truyền thêm actor.buildingId là data-id của căn nhà đúng trong template; runtime kiểm binding rồi đặt nhãn lên đúng căn đó. Hover/focus công trình hoặc bảng tên NPC phía sau làm công trình còn 50% opacity; click/chạm công trình giữ/bỏ trạng thái mờ. Bỏ chọn/đổi cảnh khôi phục style gốc. Bbox chỉ dùng để bố trí nhãn và phát hiện che hình, không cấp quyền đứng.

## Test thực nghiệm

```bash
python tools/prepare_experiment.py --out /tmp/wizamap-experiments
```

Mở `/tmp/wizamap-experiments/index.html`. Sáu cảnh được dựng offline, gồm thư viện, phòng ngủ, lớp học, Độc dược, đồ tùy tạo và NPC trên mái nhà. Có thể sửa MAP_DATA trong Preview, bấm Áp dụng rồi tải HTML. Thay asset khi offline cần asset đã nhúng; online sẽ tải đúng asset mới.

Tiêu chí: đủ đồ đúng số lượng; đồ nằm trong phòng, chừa cửa; sách nằm trên bàn; dấu giày rõ và giữ điểm khi zoom; tên NPC luôn đọc được; hover/chạm mờ 50%; desktop/mobile không lỗi; tải HTML và mở lại khi tắt mạng.

AI Studio có đăng nhập và điện thoại thật là bước nghiệm thu của người dùng. Bộ test tự động không thay thế hai bước này. 98 binding/mặt bằng ngoài phạm vi indoor vẫn theo báo cáo atlas, không bị coi là đã hoàn thành.
