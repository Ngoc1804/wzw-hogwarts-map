# WIZAMAP · Phase 1 FINAL

Bản chốt: 245 asset, có sáu cờ V3. Mở index.html trực tiếp để xem toàn bộ thư viện. Không có thử nghiệm 2.5D trong bản này.

- assets/: 245 SVG độc lập.
- catalog.json và identities.json: metadata cho AI ghép map và đổi nhận diện cờ.
- scripts/: source dựng và kiểm tra đã dùng. HTML bàn giao là snapshot đã chốt; không chạy generator để thay thế bản chốt khi chưa đối chiếu.
- references/heraldry và docs/licenses: nguồn vector và giấy phép. Xem docs/FLAGS-V3.md cho attribution CC BY 3.0.

Đã kiểm tra render SVG và các luồng bằng mô phỏng DOM; chưa có xác nhận browser thật. Bộ này chưa nối runtime và chưa tái dựng 18 template.

## Các phase tiếp theo

2. Tái dựng 18 template bằng element: giữ bố cục nguồn, thêm chọn phòng/đồ vật, điểm nối, chuyển map/tầng; dùng dữ liệu mẫu. Duyệt Đại Sảnh, Bộ 1–7 và Express trước khi nhân rộng.
3. Bộ sinh linh hoạt: hành lang ngang/dọc/L/T/ngã tư, phòng theo ràng buộc, seed theo địa điểm, lưu bố cục và vùng dự trữ. Bốn phòng sinh hoạt vẫn cố định.
4. Chuẩn hóa dữ liệu/repo: location ID, graph kết nối, canon/ước lượng/AU, version schema, contract runtime và kiểm tra CI.
5. Kết nối vận hành: /MAP, vị trí hiện tại, tiến trình, điều kiện truy cập, tuyến di chuyển, lưu/tải bố cục và trạng thái.
6. Test tổng thể: đường đi, liên kết tầng/map, seed, bí mật, lưu/tải, desktop/mobile và hiệu năng browser thật; sửa lỗi và nghiệm thu.

Giao diện và template làm trước, kết nối vận hành làm sau. Chưa thực hiện các phase 2–6 trong lần đẩy này.
