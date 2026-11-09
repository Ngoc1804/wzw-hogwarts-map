# /MAP — Preview một chiều

Context RP → Gemini xuất MAP_DATA 2.0.0 + HTML loader → loader fetch bundle qua một URL jsDelivr ghim commit → kiểm dữ liệu → chọn template hoặc dựng → Preview.

Gemini xác định thời gian RP, vị trí thật PC, NPC/nhóm hiện diện, hoạt động và hint đúng pack tháng. Lọc quyền biết trước khi xuất JSON; không gửi bí mật xuống browser rồi dựa vào fog để bảo vệ. Giữ cap PC + 10 tag NPC/nhóm và 6 hint. Khi đang di chuyển, stance=walk và thanh hành động ghi “Đang đi”; diễn biến RP quyết định việc di chuyển.

Tra maps/decision-atlas.json bằng ID hoặc alias có ngữ cảnh. Binding thực tế nằm trong runtime/templates.json. templateCandidates là đề xuất của file atlas duyệt, không phải xác nhận mặt bằng đã có. Cùng tên trong hai ngôi nhà không tự gộp. Trường hợp chưa rõ cần recipe theo công dụng, hình dạng, furnishings, connections được xác lập trong RP/atlas; không suy kết nối canon từ tọa độ artwork.

Crop tập trung khung vào tập địa điểm được gửi, không giới hạn cứng quanh PC. view.crop=false cho toàn cảnh. Fog dùng visibility.fogRegionIds và fogRegions có polygon tọa độ SVG; không có geometry phải báo lỗi. Mask là kỹ thuật che theo hình dạng; không có luật bắt buộc mask riêng quanh PC.

Không có seed, layout state, backend persistence hay ghi ngược GitHub. Mỗi Preview dựng từ dữ liệu được gửi, bố cục giữa các Preview có thể khác. Template giữ artwork cố định của nó.

UI dùng ui/shell.html, tokens và actor ribbons; không có ribbon địa điểm. Tên trong inspector và signage thuộc artwork vẫn được giữ.
