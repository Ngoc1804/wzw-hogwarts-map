# WIZAMAP — Trạng thái triển khai (2026-11-10)

**Atlas:** 747 nguồn → **726** địa điểm vật lý, gộp 21 tham chiếu trùng; mã cũ giữ ở `sourceIds`. 44 preset Hogwarts (11 tầng × 4 khu), 27 preset tháp, 7 preset thuộc ba AU cho phép, 6 preset St Mungo. Không thêm hành lang Bộ Pháp thuật hoặc ngoài trời/sân trong H1/H2. Tất cả chỉ là công thức minh họa linh hoạt, không phải adjacency canon.

**Runtime:** có adapter ID atlas → một nhóm target SVG đối chiếu thủ công, fallback Stage 2 chỉ cho cảnh trong nhà hợp lệ. Khóa 5 AU chưa xây; CCC chỉ dựng phòng chính; nhà PC và Liad's Attic được phép. Cảnh một phòng/full tầng không tạo hành lang hoặc thang giả. Không dựng trước tầng, không lưu layout, không pathfinding.

**Spatial:** indoor floorPolygons, actorZones, exclusionZones và suggestedAnchors tạo theo scene. Ngoại thất vẫn cần `view.spatial` là polygon đã xác minh, không suy từ bbox artwork. Fade vật che theo binding chính xác, không hoàn tất đánh dấu tọa độ walkable cho mọi template.

**Kiểm thử:** Node atlas index/scene/formulas/contract, Python atlas + inventory, asset gallery và syntax bundle chạy trong CI. Preview authenticated Google AI Studio và mobile thật **chưa nghiệm thu**. Không merge `main` nếu chưa duyệt.

**Bản phát hành:** bundle `308705107c240dff20decb1d4bf08c7337186217`. Các tài liệu cũ là lịch sử, không được dùng làm schema mới.
