# /MAP — Preview một chiều

/MAP → Gemini xuất MAP_DATA + HTML loader → chọn template theo atlas hoặc dựng phòng bằng element → ghép nội thất/decor theo yêu cầu → đặt NPC → Preview. Hướng dẫn tùy biến: [INDOOR_PREVIEW.md](INDOOR_PREVIEW.md).

Gemini xác định thời gian RP, vị trí thật PC, NPC/nhóm hiện diện, hoạt động và hint đúng pack tháng. Lọc quyền biết trước khi xuất JSON; không gửi bí mật xuống browser rồi dựa vào fog để bảo vệ. Giữ cap PC + 10 tag NPC/nhóm và 6 hint. Khi đang di chuyển, stance=walk và thanh hành động ghi “Đang đi”; diễn biến RP quyết định việc di chuyển.

Tra maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json (726 địa điểm từ 747 mục nguồn) bằng ID chuẩn hoặc sourceIds trong runtime/atlas-index.json. Binding được xác minh nằm trong runtime/atlas-index.json và đối chiếu runtime/templates.json. templateCandidates là đề xuất của file atlas duyệt, không phải xác nhận mặt bằng đã có. Cùng tên trong hai ngôi nhà không tự gộp. Trường hợp chưa rõ cần recipe theo công dụng, hình dạng, furnishings, connections được xác lập trong RP/atlas; không suy kết nối canon từ tọa độ artwork.

Crop tập trung khung vào tập địa điểm được gửi, không giới hạn cứng quanh PC. view.crop=false cho toàn cảnh. Fog dùng visibility.fogRegionIds và fogRegions có polygon tọa độ SVG; không có geometry phải báo lỗi. Mask là kỹ thuật che theo hình dạng; không có luật bắt buộc mask riêng quanh PC.

Không có seed, layout state, backend persistence hay ghi ngược GitHub. Mỗi Preview dựng từ dữ liệu được gửi, bố cục giữa các Preview có thể khác. Template giữ artwork cố định của nó.

UI dùng ui/shell.html, tokens và actor ribbons; không có ribbon địa điểm. Tên trong inspector và signage thuộc artwork vẫn được giữ.


## Atlas canonical & scope build policy (2026-11-10)

Authoritative atlas: `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json` (747 source IDs → 726 physical places, 21 aliases in `sourceIds`). Runtime index: `runtime/atlas-index.json`; `runtime/atlas-scene.mjs` resolves old IDs to canonical IDs and verified technical SVG bindings, never fuzzy-matches names. Missing bindings fall back to current-scene Stage 2 generated indoor layout only where generation is allowed.

Generated corridor layout comes from the current floor/cluster's flexible `corridorPreset`. An explicit `view.indoor` layout takes precedence. A single room is allowed to fill the entire preview without a fabricated corridor or stair; short one-floor scenes are flexible. Never build a complete Hogwarts floor or multiple wings. No added corridor preset for Ministry or exterior/courtyard maps already covered by H1/H2 or other fixed templates.

AU gate: build **only CCC 07.18 main room**, **Nhà PC · London**, **Liad’s Attic**. Five other AU maps remain indexed as archival lookup data but are **blocked from Preview rendering/generation**; CCC subsidiary rooms remain indexed but not buildable. This is a runtime policy, not just documentation.

Mọi element có semantic floor tự cho đứng được; dữ liệu mặt đất cũ hoặc view.spatial là fallback cho template chưa có semantic. Nhãn trên mái và độ mờ 50% dùng chung controller. Bbox chỉ phục vụ hiển thị, không tạo sàn. This release does not claim complete walkable polygons for every H1/H2/village/Diagon artwork. Always exclude secret places before MAP_DATA is sent to Preview; fog is not a security boundary.

## MAP_DATA 2.0 gọn, tương thích dữ liệu đầy đủ

Schema `runtime/map-data.schema.json` là nguồn duy nhất. `normalizeMapData()` áp dụng `default` khai báo trong schema trên bản sao; validator, resolver và viewer dùng cùng quy tắc. Trường lạ hoặc giá trị sai vẫn báo lỗi, không dùng default để che dữ liệu sai.

Bắt buộc: `schemaVersion`, `meta.date/time/areaName`, `focus.pcActorId/actualPlaceId`, `places`, `actors`, `visibility.visiblePlaceIds`. Quyền hiển thị phải gửi rõ, không suy từ danh sách địa điểm.

Có thể bỏ campaign/world/snapshot/atlasVersion nếu không cần tracking. Có thể bỏ `view` (auto, templateId=null, route rỗng, crop=true), `connections`, `hints` (mảng rỗng), quote (chuỗi rỗng), selectedId và metadata place rỗng. Inspector mặc định rỗng; actor có role=null, onPatrol=false, activity rỗng, priority=0, positionMode=normal, positionReason=null. Không suy ngày giờ, stance, identity/tagType, vị trí hoặc sự hiện diện NPC.

Có hint thì **bắt buộc questPolicy**, tháng RP, packId và quota. Không tự chọn pack/quest hoặc quota. Có thể bỏ questPolicy khi không có hint; nếu gửi thì vẫn kiểm tra. Giới hạn 10 tag NPC ngoài PC và 6 hint giữ nguyên. Không thay bằng một hợp đồng 8 nhóm khác.
