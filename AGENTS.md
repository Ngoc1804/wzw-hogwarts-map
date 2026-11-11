# demo-5 — current V4 scope (overrides historical contract/gates below)

User authorized PH0, PH2 and PH3; PH1 Entry/Preview is already accepted. Use MAP_DATA V4 schema + the single legacy adapter in runtime/map-data.mjs. Follow docs/MAP_FLOW.md and docs/V4_PHASE_0_3.md. Do not restore schema-veto gates, Custom/canon-name rejection, scope filtering of new RP places, fixed corridor-family vetoes or old input actor/hint quotas. Preserve ACTIVE/LOCKED metadata; locked scopes do not auto-expand. Gemini owns RP facts.

Atlas owner records: maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json (atlas-approved-2.0), source inventory maps/WZW_ATLAS_APPROVED.md, original user W4 context maps/WZW_W4_CONTEXT.md. Generate runtime/atlas-index.json from that source using tools/build_atlas_index.py. Aliases live in source records, never a second ANCHOR_MAP. Keep canonical IDs/names/owners and approved artwork/UI/assets.

PH4–PH11 are pending. Keep the old generated renderer only until V4 replaces it; do not remove Fixed helpers based on filename alone. Production bundle/loader/prompt remain previous release until their later phases. No merge or publication without a user instruction. User requested skipping tests for this delivery; compile/preservation checks are not an acceptance claim.

# Historical artwork and repository guidance

The sections below retain artwork/resource guidance. Their previous MAP_DATA versions, quotas and render permission gates are superseded by the V4 scope above.

# WIZAMAP: nguồn phát triển demo-2

## Bắt đầu

Bản đã chốt duy nhất là `index.html` theo SHA-256 trong `docs/release.json`. Mọi chỉnh sửa tiếp theo bắt đầu từ bản này. Không khôi phục generator/catalog/HTML của các đợt cũ vào nhánh.

- Đọc README.md, maps/catalog.json và docs/PROJECT_MAP.md để chọn đúng file/map.
- `index.html` là atlas duy nhất được phát hành. SVG gốc nằm trong payload gzip `#map-data`; không sửa base64 bằng tay và không dựng lại từ cache/phiên bản cũ.
- Dùng `python tools/atlas.py extract <id>` để lấy SVG vào `.atlas-work/`, `apply` để chèn lại và `validate` để kiểm tra. Bản `--standalone` có defs chèn thêm chỉ dùng xem trước.
- `templates/h1/` chứa nền shading tái sử dụng. `elements/catalog.json` và `elements/assets/` là nguồn khung element; đọc elements/docs/AI-ASSEMBLY.md khi ghép asset.

## Giữ đúng thiết kế đã duyệt

- Giữ 13 map, ID tương tác, đường đi và bố cục trừ khi yêu cầu hiện tại cho phép thay đổi. H2 đã được duyệt và tích hợp trong atlas; không tạo thêm HTML phiên bản hoặc SVG giải nén trong repo.
- H1 có đủ 10 tiệm Hogsmeade ở vị trí cũ, Hagrid lục giác, ga giữa nền gạch, cây cổ thụ phía tây hồ.
- Giữ `#camera`, các `data-id`, `data-element`, `.cloth`, `.ancient-canopy`, `data-willow-strand`, `data-lake-outline`, `data-emitter`, nút motion và download.
- Shading đất phải dùng mask bờ hồ; ưu tiên gradient dùng chung, tránh blur diện tích lớn và nhiều vòng animation.
- Không chỉnh shape dùng chung cho một thay đổi chỉ thuộc một instance. Khi tối ưu, chỉ bỏ defs không tham chiếu và bản sao thực sự giống nhau; giữ ID cần tương tác.

## Thư viện và kiểm tra

- `cd elements && npm run build` đóng gói lại gallery từ các SVG/catalog hiện có rồi kiểm tra. Không sinh lại hình.
- Kiểm tra phù hợp thay đổi: `python tools/atlas.py validate`, `python tools/test_atlas.py`; với gallery thêm `cd elements && npm test` sau `npm ci`.
- Với thay đổi hình, kiểm tra bằng trình duyệt ở toàn cảnh và khi zoom; H1 phải còn animation, pause/resume và tải HTML rồi mở lại được.
- Chạy `python tools/atlas.py refresh` để cập nhật danh mục và mã SHA-256; cập nhật docs/validation.json đúng các kiểm tra đã làm.

## Giữ repo gọn

Không commit `.atlas-work/`, node_modules, file cache, ZIP, HTML dự phòng, ảnh kiểm thử hay payload giải nén cũ. Dùng lịch sử Git để phục hồi. Giữ giấy phép và nguồn asset. Chỉ commit/push lên GitHub khi yêu cầu người dùng cho phép; không tự merge vào main.



## UI và atlas hiện hành

UI chuẩn được trích từ lịch sử demo-1 tại 9e54f6a, không lấy main làm thiết kế. `ui/` giữ shell, palette và footsteps tái sử dụng. Không có nhãn địa điểm dạng ribbon; chỉ nhãn PC/NPC/nhóm. Chữ kiến trúc/signage nằm trong template không phải actor tag. Prefect chỉ dùng màu tuần tra khi onPatrol=true; reduced motion dùng hai chân đứng đổi opacity chậm, không dịch chuyển. `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json` là atlas canonical hiện hành; `maps/interaction-index.json` giữ ID kỹ thuật riêng. Không đưa từng tường/cửa/đồ nội thất vào atlas. Đây chưa là graph canon đầy đủ.

Hybrid: mặt bằng cho phòng/tường/lối đi; nội thất/decor dùng top/front/2.5D phù hợp. Không tự tạo bản top cho mọi đồ. Bộ hiện hành được người dùng chốt: 259 asset; 18 base nhà, 12 cây và 2 cây đặc biệt; màu tách riêng. Không tự gộp thêm vì chỉ cùng chức năng. Không phục hồi importer V3/generator hoặc HTML duyệt cũ.

Atlas canon đang do phiên khác làm: không sửa maps/*, docs/ATLAS.md hoặc docs/research/* trong tác vụ dọn file nếu chưa có yêu cầu mới. Luôn fetch head mới trước khi push; không force-push.

Cơ chế /MAP chuẩn: docs/MAP_FLOW.md và runtime/map-data.schema.json. Không tạo hợp đồng khác trong README/HTML mẫu. Giữ cap 10 tag NPC ngoài PC, 5 hint (2 side, 1 hint, 2 pool/life) đúng nguồn RP, crop/fog theo cảnh RP, không giới hạn cứng quanh PC. Resolver trả plan cho viewer; renderer/browser đã có. Không tuyên bố nghiệm thu AI Studio nếu chưa chạy phiên Playground thật.

## Yêu cầu đã duyệt mới
MAP_DATA 3.0.0, Preview một chiều, không seed/storage; không khôi phục hai file ví dụ. Khi stance=walk, thanh hành động phải ghi Đang đi; RP quyết định chuyển động. Bảng tra nằm trong engine; không yêu cầu người dùng nạp file ngoài prompt. Flow duy nhất: docs/MAP_FLOW.md. Chỉ meta/places/actors bắt buộc; không tái thêm focus/questPolicy hoặc visiblePlaceIds vào hợp đồng.
