# Chặng 2 — cơ chế bố trí trong nhà

## Phạm vi

10 họ công thức tùy biến; số lượng/kích thước/hình phòng, bề rộng hành lang, ID/tên riêng, cách chọn có kiểm ràng buộc. Tường cố định mức được duyệt; không nội thất hoặc trang trí. Chưa nối atlas, chưa phát triển ngoài trời. Sân/giếng trời chỉ là khoảng trống của khối nhà. Chưa thay UI vận hành MAP_DATA hoặc renderer RP trong geometry.mjs; bộ dựng trong nhà và HTML kiểm công thức có entry API riêng, sẵn để nối vào hợp đồng trong chặng tích hợp được duyệt tiếp theo. Không tuyên bố đã hoàn thiện mọi trường hợp kiến trúc hoặc mọi quan hệ canon.

## Thứ tự chọn được thực thi

1. `knownStructure` có mặt: dùng cấu trúc đã xác lập do caller cung cấp. Chỉ định khác hoặc ràng buộc mâu thuẫn -> lỗi. Không có thao tác đọc atlas trong module.
2. `layout` chỉ định: kiểm tên công thức và ràng buộc, sau đó dùng. AI/người dùng đưa yêu cầu; code quyết định yêu cầu có hợp lệ không.
3. `layout: auto`: chọn theo ràng buộc. Sân kín -> cloister; sân mở -> court; cửa sổ một phía -> windows; cong -> curved; tháp -> tower; bốn nhánh -> cross; ba nhánh -> tee; hai nhánh -> ell; định hướng dọc -> vertical. Không ràng buộc -> horizontal. Kết hợp không có công thức đáp ứng -> lỗi.
4. Chỉ random khi `strategy: random` VÀ `allowRandom: true`; lấy trong `candidates` đã kiểm hợp lệ. Không random mặc định. Nếu cấu trúc đã biết hoặc công thức đã chỉ định thì không cần bốc lại. Không lưu seed/layout giữa Preview.

Các ràng buộc là gợi ý cấu trúc được hỗ trợ, không phải giải pháp tổng quát cho graph kiến trúc bất kỳ. Không tạo kết nối canon từ hình vẽ.

## API

```js
import {buildIndoorLayout} from '../runtime/architecture/recipes.mjs';
const model = buildIndoorLayout({
  layout: 'auto',
  constraints: {courtyard: 'closed'},
  roomCount: 13,
  roomWidth: 300, roomDepth: 260, corridorWidth: 160
});
```

`rooms` có thể thay roomCount: danh sách `{id,name,width,depth,shape}`. Mặt tiền và chiều sâu được giữ theo từng phòng thông thường, không co toàn bộ bản vẽ cho vừa. Hành lang/cánh nhà thay chiều dài để đủ các khoảng đặt phòng. Trong ví dụ mẫu tháp, hai mục cuối là lõi thang và gian tháp: kích thước của chúng tính theo cấu trúc; không áp mặt tiền phòng thường cho đường kính tháp.

Giới hạn có kiểm lỗi: 4–32 phòng, mặt tiền 180–560, chiều sâu 180–520, hành lang 100–240 đơn vị thiết kế. Không tự giảm kích thước để chữa thiếu chỗ. Hình phòng: rectangle, L, U, T, cross, round; T/cross cần mặt tiền ít nhất 220 để giữ cửa và cổ nối. Phòng tròn có threshold sleeve nối cửa với vùng sàn, không chỉ tiếp xúc một điểm tiếp tuyến. Hình phức tạp tùy ý khác chưa hỗ trợ.

Kết quả: `recipe`, `selection` (nguồn/lý do), parameters, rooms với ID/name/poly/doorPoint/doorSide, floors, thresholds, stair, windows, voids, facades, entrance và bounds. Dữ liệu này là geometry nội bộ, chưa được đưa thành schema RP thứ hai. Đây là bố cục một tầng/cụm trong nhà; nhiều tầng được dựng và nối theo dữ liệu chuyển tầng ở chặng tích hợp, không tự giả lập tầng khác.

Sự đa dạng nằm trong công thức: ngang/dọc có hai dãy; L giữ góc trong; T có trục phân phối; cross tránh đặt phòng vào nút; U/ring giữ sân; windows có một phía lấy sáng; curved nối tiếp tuyến hai cánh; tower có tiền sảnh và thang. Các nhánh được tính lại, không lấy nguyên 10 bộ tọa độ cũ.

## Tối ưu

- Xóa bộ furnishing riêng của review; không sửa kho 259 asset.
- Xóa filter Gaussian/drop-shadow, batch mặt/cap cong, hợp nhất tường thẳng cùng cao độ.
- Cache tối đa 16 model/wall theo tham số; không cache DOM vô hạn.
- Pan theo requestAnimationFrame; zoom/pan không dựng lại geometry.
- HTML vẫn gzip tự chứa; file tải xuống vẫn nén.

## Kiểm tra và giới hạn bằng chứng

Unit: 10 công thức × 5 số lượng × 3 bộ kích thước = 150 tổ hợp. Kiểm số phòng, ID, bounding footprint không chồng, cửa hướng ra hành lang, không tường đóng cửa. Có kiểm chọn/mâu thuẫn/random, kích thước từng phòng, các hình phòng; lấy mẫu graph hành lang với khoảng hở bán kính 10 để kiểm liên thông. Đây chưa phải chứng nhận mọi polygon tùy ý hoặc đường đi nhân vật trong toàn bộ phòng.

Browser: cả 10 công thức ở 4 và 13 phòng; không nội thất/filter/slider độ nổi; chọn bằng phím; zoom; HTML tải lại khi chặn mạng; mobile 390px. Môi trường Chromium chặn file:// nên tải/mở lại dùng bytes thật với setContent. Chưa kiểm hiệu năng trên điện thoại thật.

Benchmark so sánh cùng viewport Chromium, 20 lần dựng, 50 frame zoom; ghi số phòng và số DOM để có ngữ cảnh. Bản cũ có nội thất, bản mới không có theo yêu cầu nên mức tăng tốc gồm cả việc gỡ đồ, giảm DOM và loại filter. Không dùng kết quả này để hứa tốc độ tuyệt đối cho mọi máy. So sánh cùng 9 phòng: stage 1 có 2.765 phần tử SVG, median dựng 75,4 ms và median frame zoom 83,4 ms; stage 2 có 359 phần tử, median dựng 4,6 ms và median frame zoom 16,7 ms. Số đo từng lượt có dao động.

Kiểm atlas kế thừa vẫn đang tham chiếu maps/decision-atlas.json đã thiếu trên nhánh nền. Không sửa atlas hoặc test đó trong tác vụ trong nhà.

Dừng sau chặng 2 để duyệt. Không triển khai ngoài trời, đọc/ghi atlas, seed/storage hay merge main trong chặng này.
