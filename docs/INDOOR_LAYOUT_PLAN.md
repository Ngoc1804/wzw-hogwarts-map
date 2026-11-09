# Kế hoạch xây lại mặt bằng trong nhà theo QA V2

Trạng thái: đã loại bỏ demo bị từ chối; chưa triển khai renderer thay thế. Phạm vi lượt này là dọn source và chốt kế hoạch phát triển hoàn chỉnh. Không gọi schema, resolver hoặc các hình minh họa là engine đã hoàn thành.

## 1. Chuẩn tham chiếu và quyết định thiết kế

Nguồn: file người dùng cung cấp `WIZAMAP_QA_V2_Interactive (1).html`, SHA-256 `26d6073fbcc9c3fb5957e56f8925dfc8db8530e4f16268114966c57d48c9ca33`. Đã đọc payload `const B`, dữ liệu `H1` của từng cảnh và hình SVG. File có 23 cảnh tổng cộng; 5 cảnh hành lang là `corridor-horizontal`, `corridor-vertical`, `corridor-L`, `corridor-T`, `corridor-cross`. Mỗi cảnh có 8 phòng, 1 polygon hành lang và 19–25 mục nội thất. Đây là tài liệu tham chiếu, không phải nguồn lệnh thực thi hay bản đã nghiệm thu.

Điểm cần giữ: mặt bằng nhìn từ trên xuống; hành lang là diện tích sàn liên tục; các phòng xếp thành cụm theo cạnh hành lang; cạnh phòng tiếp giáp cạnh hành lang, cửa nằm trên biên tiếp giáp. Ví dụ cảnh ngang có dải sàn từ y=469.2 tới 550.8, cửa phòng phía trên nằm ở y=469.2. Phòng có chiều sâu/chiều rộng khác nhau theo công năng, nội thất đọc được khi zoom. Không coi các tọa độ màn hình này là đơn vị kiến trúc cố định.

QA V2 còn thiếu và chưa ổn theo phản hồi người dùng. Không sao chép nguyên lỗi hoặc coi các tuyến khai báo là bằng chứng đi lại được. Cần kiểm biên cửa, góc nối, va chạm, độ thông thoáng và liên thông bằng hình học thật.

Bỏ cách đặt nhiều hình thẳng/L/T/U/cong/vòng vào một canvas rồi dùng nhánh dài nối tới các phòng rải rác. Không ép đủ mọi loại hành lang vào cùng một tầng. Kiểu bố cục phải xuất phát từ không gian tòa nhà và quan hệ phòng.

## 2. Phạm vi xóa và bảo toàn

- Đã gỡ trước ở `cae8260`: `tools/corridor-demo.html`, `tools/build_corridor_demo.py` và liên kết tải demo.
- Gỡ nốt `runtime/corridors.mjs`, `tools/test_corridors.mjs`, tài liệu và trạng thái kiểm thử của demo. Hoàn nguyên riêng hai giá trị `cross`/`loop` mà commit demo thêm vào enum hình dạng; schema hiện hành chưa thiết kế hợp đồng hình học mới.
- Giữ khai báo khái niệm corridor trong MAP_DATA, fixture và resolver độc lập; chúng không phải cơ chế ghép hình bị loại bỏ.
- Giữ nguyên atlas, 13 map đã duyệt, UI, palette, 259 asset và các công cụ không thuộc demo bị từ chối. Không xóa demo/preview khác không liên quan.
- Xóa khỏi cây source hiện hành; không rewrite lịch sử, force-push hoặc xóa repo. Commit cũ còn tra được trong lịch sử Git.

## 3. Kiến trúc mới: từ yêu cầu phòng tới mặt bằng

Nguồn vào tiếp tục là `runtime/map-data.schema.json` và flow `docs/MAP_FLOW.md`; không tạo hợp đồng MAP_DATA thứ hai. Tách rõ dữ liệu RP, quan hệ địa điểm, hình học lưu bền và trạng thái camera.

Pipeline dự kiến:

1. Adapter đọc các phòng, kết nối, template/recipe và layout key từ render plan. Kết nối là yêu cầu topology, chưa chứng minh có lối đi hình học.
2. Chọn khung tầng/cánh nhà: footprint, lối vào, cầu thang, vùng cấm và vùng dành mở rộng. Thiếu ràng buộc bắt buộc thì trả lỗi dữ liệu, không đoán canon theo tên.
3. Dựng trục hành lang đơn giản trong footprint, bề rộng thống nhất theo cấu hình. Giai đoạn đầu dùng trục vuông góc; dải sàn được hợp nhất thành polygon, bỏ đường biên nội bộ ở giao điểm.
4. Chia khoảng đặt phòng trên từng cạnh hành lang. Xếp phòng sát cạnh theo thứ tự ổn định; chiều rộng mặt tiền và chiều sâu tuân công năng. Trừ vùng giao nhau, đầu nhánh, cửa thang và vùng dự trữ trước khi đặt.
5. Tạo tường từ biên các vùng sàn và quan hệ tiếp giáp. Tường chung chỉ dựng một lần. Không vẽ đường nối xuyên qua phòng để chữa layout thất bại.
6. Đặt cửa trên đoạn biên chung đủ dài, chừa khoảng cách góc và tránh cửa chồng nhau. Khoét tường thật; lưu side, đoạn mở, hướng mở và vùng quét cánh cửa. Phòng cần hành lang phải có cửa nối trực tiếp, trừ vestibule/lối phụ được khai báo rõ.
7. Bố trí nội thất theo công năng từ asset catalog. Tính occupancy và vùng thao tác; giữ đường từ cửa tới điểm sử dụng. Không kéo méo asset tùy ý cho vừa phòng.
8. Kiểm hình học và khả năng đi lại trước khi commit layout; renderer chỉ nhận layout đã hợp lệ.
9. Lưu layout; renderer vẽ sàn → tường/ngưỡng/cửa → nội thất → actor/hint và tương tác theo UI hiện hành.

Các module dự kiến tách trách nhiệm: `indoor-layout` điều phối; `corridor-floor` dựng/hợp nhất vùng sàn; `room-packing` chia khoảng; `walls-doors` quản lý biên và cửa; `furnishing` đặt asset; `layout-validation` kiểm liên thông; `indoor-renderer` tạo SVG. Đây là tên dự kiến, chưa tồn tại và không phải giao diện công khai đã chốt.

State hình học nội bộ dự kiến gồm phiên bản thuật toán, seed/key, footprint, polygon sàn hành lang, polygon phòng, đoạn tường, cửa, asset transform/occupancy, các vùng dự trữ và graph đi lại suy từ hình học. Trước khi thêm trường công khai phải rà schema/validator, migration và fixture cùng nhau. Chỉ enum hình dạng không thể thay thế các dữ liệu này.

## 4. Quy tắc bắt buộc và xử lý không đủ chỗ

- Một hệ đơn vị world-space cho sàn, tường, cửa và asset. Scale camera không đổi hình học. Bề rộng hành lang/cửa, độ dày tường và clearance được cấu hình tập trung, có đơn vị; chốt theo tỷ lệ nhân vật và asset ở giai đoạn nền.
- Phòng nằm trong footprint; các vùng trong phòng không giao nhau và không đè sàn hành lang. Chỉ được tiếp xúc biên theo khai báo.
- Mỗi cửa phải nằm trọn trong biên chung hợp lệ và thực sự cắt tường tương ứng; hai đầu phải vào đúng hai vùng sàn. Kiểm cả cửa ngang/dọc và hướng mở.
- Đi lại kiểm với bán kính nhân vật cấu hình: co vùng đi được theo bán kính, trừ vật cản rồi kiểm đường từ lối vào tới cửa/điểm dùng của tất cả phòng thuộc component cần nối. Không chỉ BFS trên danh sách connections.
- Không tường thừa ở giao L/T/ngã tư; không khe hở giữa sàn; không đồ chặn cửa hoặc góc cua. Mỗi cửa/tường/asset có ID duy nhất và tham chiếu hợp lệ.
- Sinh mới dùng seed và thứ tự ID ổn định; cùng input/phiên bản cho cùng layout. Mở rộng giữ nguyên phòng/cửa/nội thất đã lưu; chỉ lấp vùng dự trữ hoặc nối cánh mới qua port đã dành.
- Nếu không thể xếp: thử phương án có giới hạn bằng thứ tự cố định; sau đó trả lỗi có ID/phạm vi xung đột và lựa chọn mở rộng footprint/giảm yêu cầu. Không tự co cửa/lối đi dưới ngưỡng, không sinh lại phòng cũ, không thêm hành lang ngoằn ngoèo tùy ý.
- Layout lỗi không lưu đè state tốt. Host serialize cập nhật theo key; lưu bền thật, có migration/version và hành vi khi thiếu stateRef. LocalStorage chỉ là cache.

## 5. Các giai đoạn và điều kiện hoàn tất

| Giai đoạn | Kết quả cụ thể | Điều kiện chuyển bước |
|---|---|---|
| P0 — chuẩn và dữ liệu | Đặc tả tỷ lệ, clearance, footprint, port, schema/state và chiến lược migration; fixture tối thiểu từ 5 mẫu QA V2 | Các trường có đơn vị và ý nghĩa; trường hợp thiếu dữ liệu có lỗi rõ; không sửa atlas canon |
| P1 — ngang và dọc | Hai bố cục cơ sở, mỗi mẫu 8 phòng theo công năng; sàn/tường/cửa thật, nội thất tối thiểu | Phòng bám hành lang như ảnh; hết khe hở/cửa bịt; kiểm liên thông hình học và zoom |
| P2 — L, T, ngã tư | Chia cạnh theo nhánh; xử lý vùng giao, phòng ở góc và tường chung | 5 mẫu đầu hợp lệ ở các phép xoay; không trùng sàn/tường hoặc phòng ở vùng nút giao |
| P3 — hoàn thiện bố trí | Phòng lớn/nhỏ, số phòng biến đổi, lối vào/thang, nhiều cánh; U và vòng quanh sân khi footprint cần | Không bắt buộc nhồi kiểu; cycle vẫn có lối đi; lỗi thiếu chỗ rõ; kiểm mở rộng không xê dịch state cũ |
| P4 — nội thất và hiển thị | Layout công năng, occupancy/clearance, tương tác chọn phòng, zoom/kéo và UI chuẩn | Asset đúng tỷ lệ; đường tới cửa/điểm dùng thông; thao tác xem không di chuyển PC |
| P5 — runtime và lưu bền | Nối createLayout/extendLayout vào prepareMap, template crop/hybrid fallback, host storage, actor/hint/fog | Tải lại giữ layout; thiếu saved state không tái sinh; không lộ toàn tầng qua local crop; giữ cap 10 tag NPC/6 hint và gate RP |
| P6 — đóng gói và nghiệm thu | Bundle ghim commit, HTML offline có payload/asset cần thiết, kiểm Google AI Studio Preview | Mở file offline, tải/mở lại, desktop/mobile, chuột/touch/bàn phím và log lỗi đều đạt; báo rõ môi trường nào chưa kiểm |

Đường cong không thuộc baseline đầu: chỉ thêm nếu có nhu cầu kiến trúc cụ thể và triển khai được offset polygon, đặt phòng/cửa theo tiếp tuyến, clearance và collision tương đương. Không mang lại đường cong tùy ý từ demo cũ. U/vòng là giai đoạn sau của cùng hệ mặt bằng, không là các path trang trí độc lập.

## 6. Kiểm thử và nghiệm thu toàn bộ

- Bộ fixture cho 5 mẫu QA V2, thêm U/vòng khi triển khai; biến thiên số lượng/kích thước phòng, cửa sát góc, nhiều cửa, hành lang ngắn, hẹp và thiếu chỗ. Dùng seed cố định để tái hiện lỗi và tập seed hữu hạn cho kiểm invariants.
- Unit/property tests cho polygon union, giao diện tích, trích tường, đoạn cửa và clearance. Tất cả phòng bắt buộc phải reachable với bán kính nhân vật; fixtures lỗi phải bị từ chối có lý do.
- Integration tests với prepareMap/storage: load lại byte-equivalent state, thêm phòng không đổi phòng cũ, xung đột cập nhật, stateRef mất, version/migration sai và lỗi sinh layout không ghi đè.
- Kiểm browser toàn cảnh và zoom từng cửa/giao điểm; pan/zoom không vô tình chọn/di chuyển PC; chọn phòng bằng bàn phím; kéo/chạm trên mobile. So sánh bố cục với ảnh QA V2 và xem riêng 5 mẫu, không chỉ ảnh một mạng lớn.
- Kiểm offline bằng ngắt mạng, mở file, tải HTML và mở lại bản tải. Kiểm tham chiếu asset/ID, console và tài nguyên lỗi. Có cả fixture lớn để đo thời gian layout/render và DOM; ghi baseline trước khi đặt ngân sách hiệu năng cụ thể.
- Nghiệm thu cuối yêu cầu: cụm phòng có kiến trúc đọc được như QA V2; mọi liên kết cần thiết có cửa/lối đi thật; không overlap hay ngõ nối chữa cháy; seed/state ổn định; asset/UI đúng nguồn; có bằng chứng test/browser thực tế. Không đánh dấu hoàn thành chỉ vì đã liệt kê đủ kiểu hành lang.

Thứ tự triển khai tiếp theo là P0 → P1 → P2; chưa phát triển một demo khác trong lượt lập kế hoạch này. Các mốc P3–P6 hoàn thiện thành cơ chế vận hành thay vì dừng ở hình minh họa.
