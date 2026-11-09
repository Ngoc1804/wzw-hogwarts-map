# Chặng 1 — element tường nổi và 10 bố cục đã duyệt

Nền triển khai: feat/wizamap-runtime tại 28a9cdb (đã cập nhật head trước khi push). Chỉ tách và đóng gói bộ đã duyệt; chưa thay bộ dựng MAP_DATA trong runtime/geometry.mjs, chưa mở chặng 2.

## Thành phần

- elements/architecture/: catalog, vật liệu SVG, factory kết cấu, sắp đồ và metadata footprint/ports cho tường.
- runtime/architecture/recipes.mjs: 10 công thức lắp ráp ở kích thước bản duyệt.
- runtime/architecture/review.mjs: viewer kiểm hình riêng, không đổi UI vận hành.
- tools/build_architecture_review.py: build HTML tự chứa và báo cáo dependency/kích thước/SHA-256.
- tools/architecture-review-shell.html: source shell, không chứa thêm bản sao artwork.
- tools/test_architecture.mjs và tools/test_architecture_browser.cjs: kiểm module, 10 mẫu, thao tác và tải lại bản nén không gọi mạng.

Tường cong dùng các đoạn nghiêng; sân, thang và tiền sảnh là tổ hợp trong recipe. Chưa tuyên bố đã có packing tùy ý, collision nội thất đầy đủ hoặc bộ chọn công thức theo atlas. Cả 259 asset gốc tiếp tục là nguồn hiện hành; không thêm bản sao nội thất vào catalog kiến trúc.

## Đóng gói

Chỉ nhúng 21 loại asset được source tham chiếu; mỗi loại một symbol. Loại 63 gradient không sử dụng; giữ gradient gỗ được CSS instance tham chiếu động. Gzip mức 9 với mtime=0 để build có thể lặp lại. Bản tải xuống giữ nguyên payload nén, tránh đóng gói thêm DOM đã bung nén.

Bản HTML thử trước: 78.936 byte. Bản chặng 1: 27.770 byte, giảm khoảng 64,8%. Đây là số đo cho HTML của bộ review, không phải số đo toàn runtime/atlas. Build JSON là nguồn số đo cuối mỗi lần build.

## Kiểm tra

```sh
python tools/build_architecture_review.py --out /tmp/wizamap-architecture
node --test tools/test_architecture.mjs
# Serve thư mục output, rồi:
node tools/test_architecture_browser.cjs http://127.0.0.1:PORT/WIZAMAP_Architecture_Stage1.html
python tools/atlas.py validate
```

3 test module mới đạt. 10 cảnh SVG khớp từng pixel với bản nguyên khối dùng cùng asset hiện hành; hai lần build cho cùng SHA-256. Browser đạt 10 mẫu, chỉnh độ nổi, chọn bằng bàn phím, zoom, mobile 390px và tải lại HTML với request mạng bị chặn. Atlas validate: 13 map, tham chiếu hợp lệ. Trình duyệt môi trường chặn file://; chưa xác nhận thao tác mở file trực tiếp.

Lỗi kiểm thử kế thừa từ base b48df4d: tools/test_runtime.mjs vẫn đọc maps/decision-atlas.json nhưng file đó không có trong cây source hiện tại. Test này cũng được import bởi test_map_data.mjs. Không sửa atlas hoặc nới test để bỏ qua lỗi trong chặng tách element; báo rõ trước khi tích hợp runtime ở chặng sau.

## Chính sách đã chọn cho chặng sau

Kết hợp ba cách: ưu tiên cấu trúc atlas đã chốt; phần chưa xác định do AI chọn trong ràng buộc; random chỉ khi được cho phép rõ và chỉ trong tập hợp lệ. Chặng 1 chỉ ghi chính sách trong catalog, chưa thêm field MAP_DATA hay sửa atlas. Giữ flow Preview một chiều, không thêm seed/storage bắt buộc.

Dừng sau chặng 1 để người dùng duyệt; chưa triển khai bộ xếp phòng tùy biến trong nhà/ngoài trời. Không merge main. Không commit HTML output, ZIP, ảnh test hay các bản thử cũ.
