# Demo 2 runtime

Hợp đồng duy nhất: map-data.schema.json. Hướng dẫn: [MAP_FLOW](../docs/MAP_FLOW.md). Không có seed, storage, backend hoặc pathfinding.

map-data.mjs kiểm dữ liệu và default trình bày; resolve-map.mjs chọn template/indoor; geometry.mjs và furnishings.mjs ghép hình; scene-assets.mjs tải SVG đang dùng; viewer.mjs mount UI. focus và danh sách place hiển thị được suy ra nội bộ từ dữ liệu công khai, không thuộc hợp đồng Gemini.

Build bằng tools/build_runtime.py. Chỉ bật --debug khi kiểm thử. Production không có dữ liệu mặc định, menu atlas, editor JSON hoặc test hook.
