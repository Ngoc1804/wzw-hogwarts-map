# Test template công khai

Phạm vi: dựng 13 template tĩnh đã có, nối schema/validator MAP_DATA 1.0.0 và UI chuẩn. Không gọi prepareMap, seed/storage, geometry renderer, crop hay fog. Không test hành lang. Không dùng dữ liệu bí mật RP trong viewer toàn cảnh.

- Mở HTML shell `ui/template-preview.html` (hoặc đưa nguyên HTML vào AI Studio Preview).
- Chọn template để kiểm artwork. Dữ liệu mặc định chỉ là fixture QA, không phải sự thật RP.
- Nút MAP_DATA nhận JSON theo schema hiện hành; lỗi dữ liệu được báo rõ. `view.templateId` chọn template; atlasRef phải có mapping chính xác. Generated và fog trả lỗi.
- Click shape/ribbon/hint chỉ cập nhật inspector; pan/zoom không thay đổi PC hoặc thời gian RP. Actor được neo tại tâm shape; chưa phải hệ tránh chồng nhãn hoặc mô phỏng chuyển động. Hai actor cùng nơi được xếp lệch theo chiều dọc.
- Tải HTML tạo bản tự chứa atlas, dữ liệu hiện tại và engine; có thể mở offline.
- Shell tải bundle qua jsDelivr ghim full commit. Bundle tải atlas ở commit nguồn ghi trong ATLAS_URL. Không dùng main/latest để tải runtime.

Build: `python tools/build_template_preview.py --out /tmp/wizamap-preview --ref <full-source-commit>`. Sinh bundle và HTML inline ở thư mục ngoài repo; bundle phát hành là runtime/template-bundle.js. Sau khi thay source/schema/UI phải build lại bundle. Không sửa bundle bằng tay.

Seed/giữ layout chỉ cần cho nhánh generated, vì template đã có tọa độ cố định. Giữ module cũ để không phá hợp đồng generated, nhưng viewer test không gọi chúng. Crop/fog không thuộc bản test toàn cảnh. Actor/hint placement vẫn cần để kiểm ribbon/footsteps/hint nên có adapter neo vào shape hiện hành.

Kiểm đã chạy: 18 Node tests MAP_DATA/UI; atlas validation + 5 atlas tests; Chromium desktop 1360×900 và mobile 390×844; chuyển qua 13 template không page error; tải HTML/mở lại với request mạng ngoài bị chặn. Chưa nghiệm thu AI Studio thật, touch/pinch hoặc tránh chồng nhãn.
