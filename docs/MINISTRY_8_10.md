# Bộ Pháp thuật · Tầng 8–10

Người dùng chọn đưa riêng map Bộ ba tầng lên GitHub ngày 09/11/2026. London và Britain chưa duyệt, không được đưa vào source/payload trong lượt này. Atlas từ 12 thành 13 map.

- Tầng 8: Atrium, 12 lò Floo, đài phun Magical Brethren năm nhân vật, tiếp nhận khách, an ninh và lobby thang máy.
- Tầng 9: sảnh tròn 12 cửa, Time/Space/Prophecy/Brain/Death/Love, hành lang và ngưỡng phòng.
- Tầng 10: phòng xử án số 10 theo hướng ảnh tham khảo, bốn cung ghế hội đồng, ghế bị cáo/xích, hành lang, phòng chờ, phòng hỗ trợ và tuyến áp giải.
- Ba tầng xếp dọc 8 → 9 → 10, cuộn native; nút đến tầng; Ctrl+cuộn hoặc +/− để zoom.
- Thang máy 8↔9, cầu thang 9↔10; liên kết lên mặt cắt Bộ 1–7 hiện có.
- Chọn phòng/địa điểm để mở inspector. Điểm London chỉ ghi mô tả, chưa có liên kết đến map chưa duyệt.

Đài phun và kiến trúc là SVG vẽ riêng, hình tĩnh. Kích thước, số lò/cabin/ghế, vị trí phòng và phòng phụ là thiết kế suy diễn. Dùng cho toàn cốt truyện, không khóa thời kỳ và không triển khai /MAP vận hành.

Nguồn nghiên cứu: Harry Potter and the Order of the Phoenix, chương 7–8 và 34–35; [Ministry Headquarters](https://www.hp-lexicon.org/place/great-britain-united-kingdom/england/london/ministry-of-magic-headquarters/), [Department of Mysteries](https://www.harrypotter.com/fact-file/locations/the-department-of-mysteries), ảnh tầng 10 do người dùng cung cấp. Không chép artwork từ các trang tham khảo.

Source đọc được: `tools/build_ministry.py`. Chạy `python tools/build_ministry.py` để dựng lại riêng map này từ code, giữ các map khác. Không sửa payload base64 bằng tay. Kiểm tra: `python tools/atlas.py validate`, `python tools/test_atlas.py`, `python tools/test_ministry.py`. Bằng chứng browser nằm trong `docs/validation.json`.
