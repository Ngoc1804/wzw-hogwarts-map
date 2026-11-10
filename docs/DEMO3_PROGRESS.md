# Demo 3 — tiến độ sau khi thay atlas và generated design

## Đã triển khai trong source trên demo-3

- Thay atlas cũ bằng atlas-approved-2.0, từ nguyên văn `maps/WZW_ATLAS_APPROVED.md`: 694 bản ghi, mỗi nơi một chủ quản TEMPLATE / ATLAS / AU. JSON canonical mới thay toàn bộ bản cũ; runtime index được compile và kiểm hash nguồn. Giữ mã phòng, tầng/hướng, alias cùng địa điểm, tham chiếu không tạo phòng trùng. ID cũ không còn trong nguồn được ghi retired rõ ràng.
- 226 bản ghi TEMPLATE, 359 ATLAS, 109 AU. CCC dùng đủ 5 phòng liệt kê; Nhà PC và Liad’s Attic dùng được. 5 map AU còn lại khóa (86 bản ghi theo nguồn mới).
- Selector dùng vị trí PC và đúng template chủ quản; NPC nơi khác không đổi template. Không cho atlasRef đổi một địa điểm canon sang map khác. Locality chỉ mở cấu trúc cùng khu/tầng; các nhóm chỉ tham chiếu template không có bản sao room.
- Khóa đúng họ hành lang từng khu/tầng/tháp theo nguồn mới. Một indoor engine dùng cho nhà/phòng nhỏ và công trình nhiều phòng; kích thước tự biến thiên theo công dụng/ID hoặc override. Giữ đủ 40 phòng trong test; giới hạn scene 60 phù hợp schema, không cắt bỏ phòng.
- Tường/sàn wood, brick, stone bằng SVG pattern nhẹ, đổi màu/nét/tỷ lệ; tile giữ tương thích. MAP_DATA 3.2.0 thêm field tùy chọn, vẫn nhận 3.0/3.1 và default 3.1.
- Outdoor schematic từ assets cây/nhà hiện có, nền/đường, vùng nước khi có ngữ cảnh, chừa vùng đứng và phần công trình. Nhà độc lập dùng cùng indoor engine và thêm nền xung quanh; không dựng renderer nhà nhỏ riêng. Cảnh procedural không là bằng chứng adjacency canon.
- Footstep/tag trên nội thất. Tránh bàn, tường, nước và vật cản lớn; ghế/sofa không cần exclusion riêng cho actor.
- H1/H2/Diagon/Hogsmeade: nhãn inside gắn mặt tường, không lên nóc và không có dấu chân giả ngoài nhà. Actor bị che có ký hiệu mái ◆; hover/click/tap làm công trình còn opacity 30%, có giữ mở/đóng lại và cleanup khi đổi scene. Quyền hiển thị/fog vẫn áp dụng.
- Bổ sung 35 binding vào các ID artwork đã có (gồm region/aggregate và định vị cấp nhà/container có ghi độ chính xác). Giữ nguyên 13 SVG; không vẽ lại hoặc đổi bố cục.
- Nhận đúng paving Slytherin, ellipse sân Quidditch, sàn phòng Bộ 8–10; tránh bàn Đại Sảnh và đài phun nước. Sửa lỗi SVG đường viền nhãn thiếu dấu cách gây console error.
- Đồng bộ prompt, flow, AI atlas context, CI và báo cáo coverage mới. Báo cáo 84 cũ chỉ là lịch sử, vẫn kiểm chứng cứ artwork cũ.

## Kiểm chứng

- Kiểm mọi ID chỉ có một owner, alias/parent/mũi tên không dangling, mã phòng và họ hành lang khớp nguồn.
- 381 địa điểm generated có hình học và vùng đứng hợp lệ; không có generation-error trong audit.
- 13 artwork / 183 semantic binding trỏ ID SVG thật. Browser kiểm 4 template 2.5D và 8 template còn lại có sàn thật; Ministry 1–7 được loại khỏi đợt sửa này.
- Browser kiểm vật liệu, asset outdoor, thứ tự lớp, nhãn tường, roof indicator opacity 30%, rerender cleanup, 15 NPC / 10 nhãn + PC, bố cục ổn định, desktop/mobile, loader và HTML offline.
- Đây là kiểm source/candidate; không phải nghiệm thu Google AI Studio bằng RP thật.

## Trạng thái coverage và phát hành

- 64 mục cũ đã có geometry bổ sung và browser kiểm chỗ đứng: xem `docs/DEMO3_LOCALITY_SURFACES.md`. Phân loại riêng `template-supplement`; không tuyên bố những vùng mới này có sẵn trong SVG hoặc có tọa độ canon chính xác.
- 29 mục Bộ 1–7 là phạm vi được người dùng loại trừ; 1 mục Bộ chưa rõ tầng giữ chờ xác nhận.
- Bundle đợt 64 đã được publish tại `9223b72ef0938c8dd3ddbf2a839d171cfbd8d9bf`, nguồn `aa78612107779f8356c626b1dd49160ddbc054d0`; loader/prompt ghim cùng commit bất biến. CI nguồn `627dabb` đạt đầy đủ. Chưa test RP thật trong AI Studio; không dùng fixture như RP thật.

Kết quả baseline trước đợt 64: 73/73 Node tests đạt; Chromium suite đầy đủ đạt với candidate build và kiểm console của loader. Python atlas/inventory/scenery và kiểm compiler/registry/coverage chạy riêng. Không coi kết quả local là CI xanh hay nghiệm thu AI Studio.

Đợt 64: bổ sung runtime/template-localities.json và renderer sàn theo mốc cha, deck riêng trên hồ, inset có sàn/tường cho phòng chưa vẽ. Giữ artwork gốc; dữ liệu mới ghi precision illustrative-local-region. Đối chiếu hình H2 và nguồn canon theo yêu cầu người dùng, có ghi giới hạn suy luận.

Kiểm chứng đợt 64: 74/74 Node tests; Chromium render từng ID, kiểm chân nằm trong chính sàn của vùng, crop=false cho inset, mở offline mới và regression suite. Coverage không còn missing-fixed-binding; 64 vùng mới được phân loại template-supplement, tách khỏi geometry gốc.
