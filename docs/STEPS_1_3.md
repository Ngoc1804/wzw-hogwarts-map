# Bước 1–3: baseline, kho asset và atlas

- Baseline: demo-1 tại a73be27, 13 map; HTML và motion hiện hành giữ nguyên hash.
- UI trích từ demo-1 tại 9e54f6a vào ui/, giữ đúng khung người dùng chốt. Không phục hồi atlas V12.
- Không có ribbon địa điểm. Patrol đỏ chói/viền xám đen chỉ khi đang tuần tra; thêm hai màu đám đông. Reduced motion dùng đứng đổi độ đậm hai bên chậm.
- 245/245 ID V3 đã có trong kho; không nhập lại artwork cũ. Khôi phục metadata cho 231 mẫu khớp hình; 14 nhà đổi hình không dùng metadata cũ.
- Tách 63 mẫu nhà/kiến trúc template phố; 37 công trình ánh xạ mẫu có sẵn; bỏ hai file nhà giống hình trừ ID/tên, giữ alias. Kho 366 mẫu gốc.
- Hình có cấu trúc khác nhau không xóa chỉ vì cùng chủ đề; màu/kích thước instance không tạo mẫu mới. Bộ sinh nhà không tạo lại hai file đã gộp.
- maps/world-atlas.json: 13 template, 346 địa điểm. Không suy quan hệ canon từ gần nhau trên SVG. Đây chưa là atlas canon đầy đủ cho mọi tầng Harry Potter; xem coverageGaps.
- Còn thiếu: bảng trong elements/docs/ASSET_GAPS.md. Các hình inline/defs ngoài phạm vi tách nhà phố chưa được tuyên bố đã chuẩn hóa hết.
- ui/ hiện là bộ shell/component tái sử dụng; nối vào viewer và hợp đồng Gemini nằm ở bước tiếp theo, chưa phải /MAP hoạt động hoàn chỉnh.
- Không đóng PR, đổi default hoặc xóa nhánh trong đợt này.
