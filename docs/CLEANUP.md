# Repo hiện hành và bước tiếp theo

Bộ asset người dùng chốt: commit 9b1562a, 259 SVG, 18 base nhà, 12 cây hình khối riêng và 2 cây đặc biệt. Dọn repo không thay đổi byte nào của SVG, palette, catalog, gallery hoặc index.html. Không sửa phần atlas do phiên khác phụ trách.

## Đã dọn

- Đóng PR #1 và #2, không merge.
- Xóa 5 nhánh: cleanup-wizamap-html; design/wizamap-svg-qa-20261105; review/story-templates-20261109; test/wizamap-visual-20261104; wizamap-visual-test-20261104.
- Bỏ HTML duyệt toàn kho lặp với gallery, báo cáo/snapshot 366/247 cũ, importer V3, utility svgkit/lxml không còn được gọi và báo cáo bước 1–3 đã lỗi thời. Tiết kiệm khoảng 2,09 MB source hiện hành; không viết lại lịch sử Git.
- Giữ index.html duy nhất; gallery elements/index.html; bản duyệt nhà/cây offline tools/scenery-review.html; UI, palette, generator hiện hành, công cụ kiểm tra, giấy phép và attribution.
- Bộ 259 asset giữ nguyên. Các khác biệt chỉ về chức năng chưa đủ để xóa thêm; không tự áp đề xuất gộp nội thất cũ.

## Nhánh mặc định còn bị chặn quyền

GitHub API từ chối đổi default_branch sang demo-1: HTTP 403, Resource not accessible by integration. Không thể xóa main khi nó vẫn là nhánh mặc định. Tại mốc dọn cũ main từng được cập nhật fast-forward với demo-1; trạng thái này không đại diện head hiện tại; không merge artwork cũ trở lại.

Chủ repo cần đổi default branch thành demo-1 trong GitHub Settings. Sau đó có thể xóa main để chỉ còn demo-1. Trong lúc còn hai nhánh, demo-1 là nguồn làm việc chuẩn; main là nhánh mặc định đồng bộ tại mốc dọn này, không phải một bộ asset khác.

## Tiếp theo (không làm atlas trong phiên này)

1. MAP_DATA 2.0 và renderer hiện hành nằm trên fix/map-flow-review; schema là nguồn hợp đồng duy nhất. Xem docs/MAP_FLOW.md. Bước kế tiếp là adapter atlas mới và UI/local crop; ID atlas và ID click là hai lớp riêng.
2. Ghép UI cố định với viewer: thanh trên/sidebar, nhãn đúng palette, giới hạn 10 tag NPC, nhóm đông người, footsteps và inspector/hóng hớt.
3. Xây renderer hybrid: chọn template khi có, dựng phòng/hành lang từ base khi chưa có; dựng trong Preview một chiều, không seed/storage.
4. Runtime cung cấp dữ liệu RP/knowledge gate; renderer không suy NPC, lịch, quest hoặc bí mật. Có atlas thì nạp qua adapter, không phụ thuộc hoàn tất toàn atlas để định nghĩa schema.
5. HTML shell đặt MAP_DATA rồi tải engine ghim commit qua jsDelivr; kiểm trong AI Studio Preview các nhánh template/tùy biến, fog, actor/hint, motion và mobile.

Giữ lịch sử Git để tra bản cũ; không giữ thêm HTML/ZIP phiên bản trong cây file hiện hành.
