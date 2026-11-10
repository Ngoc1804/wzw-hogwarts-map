# WIZAMAP DEMO 3 — PHỤ LỤC 84 TRƯỜNG HỢP COVERAGE CHƯA HOÀN THÀNH

> Trích trực tiếp từ `docs/coverage-review.json` của `demo-2@4c5d5f5`, giữ nguyên ID/tên/disposition. Chỉ để rà soát và duyệt, **không phải 84 map mới**. Không thay đổi map, index, template, quyền AU/CCC hoặc engine.

## Tổng hợp

| Nhóm lỗi | Số | Xử lý |
|---|---:|---|
| Thiếu region/polygon hoặc mặt sàn cục bộ trong template | 36 | Chỉ thêm binding/shape vào template hiện có khi đã xác minh vị trí trong artwork. |
| Chưa đối chiếu tên canon với artwork | 7 | Tìm nhãn/shape đúng trong H2 và tài liệu, không đoán cùng một sân/cầu. |
| Thiếu metadata hình học của phòng riêng | 22 | Định danh phòng và mặt sàn riêng, không lấy bbox toàn bộ tầng/phòng ban. |
| Thiếu aggregate region cấp tầng/khu | 2 | Ghép phạm vi tổng hợp từ các phòng con đã xác minh. |
| Thiếu cảnh ngoại thất/surface | 17 | Đánh giá có nằm trong phạm vi phát hành không; chỉ tạo exterior scene sau khi duyệt riêng. |
| **Tổng chưa giải quyết** | **84** | Theo phạm vi duyệt |

Nguồn review có **91** case: 84 chưa giải quyết + 6 `resolved-binding` + 1 `resolved-classification`. Các mục đã giải quyết **không** được tính trong 84.

## Thiếu region/polygon hoặc mặt sàn cục bộ trong template (36)

**Hướng xử lý:** Chỉ thêm binding/shape vào template hiện có khi đã xác minh vị trí trong artwork.

| # | Atlas ID | Tên địa điểm | Lý do từ kiểm toán |
|---:|---|---|---|
| 1 | `P-0006dd26862fbe` | Lối vào Rừng Cấm | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 2 | `P-0a1ff4c2777f64` | Cầu gỗ và các cầu nối thuộc khối lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 3 | `P-0d712868c509cf` | Bãi cỏ và đồng cỏ quanh Hogwarts | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 4 | `P-13ae06fd76adc5` | Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2 | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 5 | `P-17db50485e2b83` | Bãi cỏ ven hồ | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 6 | `P-1901b8ad031d44` | Sảnh tiếp đón Bộ Pháp thuật | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 7 | `P-1ecd945e2b86b7` | Hai sân trong lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 8 | `P-29bc58039f5eae` | Vườn cây gần nhà kính | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 9 | `P-31f204a8e0e490` | Đường giữa các nhà kính | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 10 | `P-33d82440a9be50` | Sân giữa các cánh lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 11 | `P-385234641b8727` | Đường dạo ngoài trời quanh Hogwarts | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 12 | `P-4df8571e5dea2e` | Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 13 | `P-52b6fe3a29d440` | Khu nhân mã trong Rừng Cấm | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 14 | `P-59e90d8a9ccc63` | Bờ Hồ Đen | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 15 | `P-5daf783e1e1f28` | Sân vào lâu đài trong khu cổng | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 16 | `P-5e1f1cc14a2adb` | Phố chính Hogsmeade | Có template ứng viên, nhưng chưa có binding/geometry chính xác cho địa điểm con. |
| 17 | `P-63aa8852e10090` | Đường mòn Rừng Cấm | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 18 | `P-6ac732451f03d7` | Đường đi ngoài các tường bao lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 19 | `P-8153c1a6e4e7dc` | Sân cỏ cạnh lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 20 | `P-8c15e0bfc2d11d` | Khu ổ nhện Aragog | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 21 | `P-8f7588d4e8a5bc` | Mặt hồ và khu vực trên thuyền | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 22 | `P-8fd3daca88a6f1` | Khoảng rừng sâu | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 23 | `P-9c19f623bbb1e3` | Vùng sát sân Quidditch ngoài ranh sân | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 24 | `P-9c45a4f54ea1ee` | Đường dạo ven hồ | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 25 | `P-b830cb70ee02f6` | Vườn nhà Hagrid | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 26 | `P-bb3906692ce0a3` | Lối đi và bãi đất ven hồ | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 27 | `P-c061b81bba5c42` | Đường tới sân Quidditch | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 28 | `P-d76cff03ee7601` | Đường mòn giữa Hogwarts và Hogsmeade | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 29 | `P-d85dbd8c19bb3b` | Các ngõ phố nối Hẻm Xéo và Knockturn | Có template ứng viên, nhưng chưa có binding/geometry chính xác cho địa điểm con. |
| 30 | `P-dafe46b4834d00` | Khu chờ lên tàu tại King’s Cross | Có template ứng viên, nhưng chưa có binding/geometry chính xác cho địa điểm con. |
| 31 | `P-dbdb26cb4f253a` | Sân sau Cái Vạc Lủng | Có template ứng viên, nhưng chưa có binding/geometry chính xác cho địa điểm con. |
| 32 | `P-eeb5352311e7c0` | Sân tập nhỏ trong quần thể Quidditch | Có template ứng viên, nhưng chưa có binding/geometry chính xác cho địa điểm con. |
| 33 | `P-effd8342cc396c` | Bãi cỏ học tập quanh trường | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 34 | `P-f6319cb5ddb159` | Sân chân tháp trong khối lâu đài | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 35 | `P-f9359f86975e71` | Lối đi và sân trong ranh khu Quidditch | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |
| 36 | `P-ff62bf19892de9` | Đường tới nhà ga Hogsmeade | Template ứng viên có cảnh tổng quan nhưng chưa có shape/region đủ chính xác cho toàn phạm vi địa điểm này. |

## Chưa đối chiếu tên canon với artwork (7)

**Hướng xử lý:** Tìm nhãn/shape đúng trong H2 và tài liệu, không đoán cùng một sân/cầu.

| # | Atlas ID | Tên địa điểm | Lý do từ kiểm toán |
|---:|---|---|---|
| 1 | `P-38bf6be09df746` | Sân Bell Tower (Tháp Chuông) | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 2 | `P-501e057d5be6b1` | Sân Quad | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 3 | `P-5eb3bde9176879` | Cầu đá nối các cánh lâu đài | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 4 | `P-6d6cfd0e60241f` | Sân Transfiguration (Biến hình) | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 5 | `P-bca1f1945d52e9` | Sân Viaduct | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 6 | `P-de97c63af46b5c` | Sân Clock Tower (Đồng hồ) | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |
| 7 | `P-f79a562f43d99a` | Cầu cạn Viaduct | H2 dùng nhãn Wyvern/Tầm gửi/Đón tiếp, cầu gỗ và cầu lên nhà cú; chưa có đối chiếu đã xác minh tới tên sân/cầu canon này. |

## Thiếu metadata hình học của phòng riêng (22)

**Hướng xử lý:** Định danh phòng và mặt sàn riêng, không lấy bbox toàn bộ tầng/phòng ban.

| # | Atlas ID | Tên địa điểm | Lý do từ kiểm toán |
|---:|---|---|---|
| 1 | `P-05c90391d35da8` | Quản lý Chổi bay | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 2 | `P-13dfea8fe4bf27` | Văn phòng Cấp phép Độn thổ | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 3 | `P-2df6c97ce86355` | Bộ phận Sinh vật có tri giác | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 4 | `P-3e401191d71800` | Văn phòng Bằng sáng chế Lố bịch | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 5 | `P-444469fe1666f1` | Văn phòng Lạm dụng Đồ tạo tác Muggle | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 6 | `P-58ba0981b28173` | Văn phòng Mạng Floo | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 7 | `P-5fc3c5a0bcb0d1` | Bộ phận Quái thú | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 8 | `P-6f640309d1ece1` | Đội Đảo ngược Tai nạn Pháp thuật | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 9 | `P-76e93cc0236521` | Văn phòng Liên lạc Yêu tinh | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 10 | `P-80b97fa352d930` | Khu hành chính Wizengamot | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 11 | `P-873b198808d71f` | Văn phòng Tư vấn Sinh vật gây hại | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 12 | `P-91ec4108625f7b` | Câu lạc bộ Gobstones chính thức | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 13 | `P-9301236b54857d` | Ủy ban Biện minh với Muggle | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 14 | `P-951dc2baa9a710` | Bộ phận Xóa trí nhớ | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 15 | `P-a3d0329c5db5e2` | Văn phòng Liên lạc Pháp thuật Quốc tế | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 16 | `P-ad6b222c1cf8e4` | Văn phòng Sử dụng Pháp thuật Sai trái | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 17 | `P-af6716662de8c8` | Trụ sở Thần Sáng | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 18 | `P-da0766f575a2ce` | Cơ quan Khóa Cảng | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 19 | `P-dfec82bd2d4f53` | Khu thương mại / luật quốc tế | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 20 | `P-f52be73f7dd9ce` | Bộ phận Linh hồn | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 21 | `P-f66347f72f87d0` | Trụ sở Liên đoàn Quidditch Anh–Ireland | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |
| 22 | `P-f9c67c9c540345` | Văn phòng Thứ trưởng / trợ lý Bộ trưởng | Artwork ministry2 chỉ có min-level-1…7 và nhãn phòng; chưa có shape riêng được định danh cho mục này. |

## Thiếu aggregate region cấp tầng/khu (2)

**Hướng xử lý:** Ghép phạm vi tổng hợp từ các phòng con đã xác minh.

| # | Atlas ID | Tên địa điểm | Lý do từ kiểm toán |
|---:|---|---|---|
| 1 | `P-1bd95d9a21aa0e` | Tầng 9 – Bộ Bảo mật | Đây là mục tổng hợp cấp tầng/khu; các phòng con có shape, nhưng chưa có region tổng hợp tương ứng. |
| 2 | `P-4fee03ab76bb30` | Tầng 10 – Khu xử án | Đây là mục tổng hợp cấp tầng/khu; các phòng con có shape, nhưng chưa có region tổng hợp tương ứng. |

## Thiếu cảnh ngoại thất/surface (17)

**Hướng xử lý:** Đánh giá có nằm trong phạm vi phát hành không; chỉ tạo exterior scene sau khi duyệt riêng.

| # | Atlas ID | Tên địa điểm | Lý do từ kiểm toán |
|---:|---|---|---|
| 1 | `P-0286a54346e7d7` | Bãi neo tàu Durmstrang | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 2 | `P-07666cff74b9d9` | Hồ ngầm trong hang biển | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 3 | `P-16ec3a57420b99` | Bờ biển gần Shell Cottage | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 4 | `P-25a2f0dc7c7eba` | Vườn Shell Cottage | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 5 | `P-2a51f7e8e278a7` | Nhà thờ Godric’s Hollow | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 6 | `P-4232fc85ff42c4` | Vườn nhà Dursley | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 7 | `P-4f6ef384d93fb3` | Rừng Dean | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 8 | `P-6acb59a2cd0cf1` | Vườn sau | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 9 | `P-9ebcfc85eb0c36` | Sân vận động World Cup | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 10 | `P-a575b46f2ae1a8` | Khu thử thách Hồ Đen | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 11 | `P-a6360747d2eff6` | Bãi cắm trại trong Rừng Dean | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 12 | `P-a69db007365fe0` | Rừng Albania – nơi Voldemort trú ẩn | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 13 | `P-c12015ea2dc205` | Đảo đá trong hồ hang biển | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 14 | `P-c3f56557f43009` | Vườn Hang Sóc | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 15 | `P-c4b0eda051d309` | Mê cung Tam Pháp thuật ở sân Quidditch | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 16 | `P-e3c60767666046` | Vườn nhà Lovegood | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |
| 17 | `P-ff60dc5c801cf1` | Bãi chơi Quidditch sau nhà | Không có template hoặc mặt đất hiện hành tương ứng; renderer indoor không tạo được cảnh này. |

## Những trường hợp đã xử lý (không thuộc 84)

| Nhóm | ID | Địa điểm |
|---|---|---|
| resolved-binding | `P-06a1ce678f15be` | Các nhà dân trên phố trong bản đồ Diagon |
| resolved-classification | `P-9d882410cbff44` | Khu điều trị bệnh và nhiễm trùng pháp thuật |
| resolved-binding | `P-ae87f1280dad9c` | Cổng chính Hogwarts |
| resolved-binding | `P-c251f1aa2096c0` | Khu tiếp nhận khách Bộ Pháp thuật |
| resolved-binding | `P-cc5bcc4d694457` | Lối lên Nhà cú |
| resolved-binding | `P-dadcf596a0437f` | Khu an ninh Bộ Pháp thuật |
| resolved-binding | `P-df6ec24bb2876c` | Khu giao thông Floo Bộ Pháp thuật |

## Quy tắc duyệt

- Không đánh đồng metadata/binding thiếu với việc 84 phòng hoặc 84 map chưa được vẽ.
- Ưu tiên thêm binding vào 13 template có sẵn và đúng vùng; không vẽ thêm H1/H2/Ministry giả.
- 17 ngoại cảnh chưa có không tự động được phép xây; không được tự mở rộng sang World/AU bị khóa.
- Thông tin vị trí đứng cần surface/geometry thật; không dùng mái hoặc bounding box giả định làm mặt đất.
- Cập nhật số lượng pending và tài liệu này khi có test xác nhận từng binding hoặc scene mới.
