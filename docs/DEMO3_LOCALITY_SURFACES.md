# Demo 3 — 64 vùng định vị bổ sung

Các vùng này là **geometry mới do engine dựng bổ sung**, không phải 64 shape đã tồn tại trong artwork gốc. Giữ nguyên 13 SVG, ID cũ và bố cục gốc. Chỉ dựng vùng khi địa điểm được đưa vào scene công khai.

Hình học và chỗ đứng được kiểm trong browser: actor phải nằm trong chính polygon sàn của địa điểm, không chỉ bất kỳ sàn nào trên template. Vùng đất dùng lớp địa hình nhẹ; mặt hồ dùng sàn deck riêng; phòng/cơ sở chưa vẽ có inset sàn/tường bên cạnh map. Framing bao gồm mốc cha và vùng bổ sung, kể cả crop=false.

## Đối chiếu và giới hạn

- H2 là lâu đài minh họa có hai sân trong và một sân trước, không phải sơ đồ canon chính xác. Các địa danh canon được đặt tương đối theo mốc kiến trúc; không đổi Wyvern/Mistletoe thành alias canon và không tạo graph cửa nối.
- Clock Tower Courtyard liên hệ đầu cầu gỗ; Quad gần khối Đại Sảnh/cụm tháp. Đây là suy luận để dựng vùng minh họa, không phải chứng cứ rằng tên canon tương đương nhãn artwork.
- Nguồn tham khảo: [Clock Tower Courtyard](https://www.hogwartscompanion.com/locations/world-map/hogwarts/clock-tower-courtyard), [The Quad](https://harry-potter-compendium.fandom.com/wiki/The_Quad).
- Không tạo NPC, quest hay trạng thái RP; không mở AU khóa. Bộ 1–7 vẫn loại khỏi đợt sửa.

- Đối chiếu thêm [Hogwarts theo sách](https://www.hp-lexicon.org/place/atlas-wizarding-world/atlas-of-hogwarts/hogwarts-environs-books/) cho bãi rồng/cỗ xe Beauxbatons và [lăng mộ](https://www.hp-lexicon.org/thing/dumbledores-white-marble-tomb/) cạnh hồ. Renderer không tự quyết định địa điểm đã xuất hiện ở thời điểm RP hay chưa; chỉ dựng khi payload công khai yêu cầu.

| ID | Địa điểm | Template | Mốc cha | Kiểu sàn |
|---|---|---|---|---|
| `P-effd8342cc396c` | Bãi cỏ học tập quanh trường | h1 | castle | ground |
| `P-8153c1a6e4e7dc` | Sân cỏ cạnh lâu đài | h1 | castle | ground |
| `P-0d712868c509cf` | Bãi cỏ và đồng cỏ quanh Hogwarts | h1 | castle | ground |
| `P-385234641b8727` | Đường dạo ngoài trời quanh Hogwarts | h1 | castle | ground |
| `P-d76cff03ee7601` | Đường mòn giữa Hogwarts và Hogsmeade | h1 | hogsmeade | ground |
| `P-ff62bf19892de9` | Đường tới nhà ga Hogsmeade | h1 | hogsmeade | ground |
| `P-9c19f623bbb1e3` | Vùng sát sân Quidditch ngoài ranh sân | h1 | quidditch-pitch | ground |
| `P-c061b81bba5c42` | Đường tới sân Quidditch | h1 | quidditch-pitch | ground |
| `P-6ac732451f03d7` | Đường đi ngoài các tường bao lâu đài | h1 | castle | ground |
| `P-13ae06fd76adc5` | Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2 | h1 | castle | ground |
| `P-4df8571e5dea2e` | Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác | h1 | castle | ground |
| `P-0006dd26862fbe` | Lối vào Rừng Cấm | h1 | forest | ground |
| `P-63aa8852e10090` | Đường mòn Rừng Cấm | h1 | forest | ground |
| `P-8fd3daca88a6f1` | Khoảng rừng sâu | h1 | forest | ground |
| `P-52b6fe3a29d440` | Khu nhân mã trong Rừng Cấm | h1 | forest | ground |
| `P-8c15e0bfc2d11d` | Khu ổ nhện Aragog | h1 | forest | ground |
| `P-8f7588d4e8a5bc` | Mặt hồ và khu vực trên thuyền | h1 | lake | deck |
| `P-59e90d8a9ccc63` | Bờ Hồ Đen | h1 | lake | ground |
| `P-9c45a4f54ea1ee` | Đường dạo ven hồ | h1 | lake | ground |
| `P-17db50485e2b83` | Bãi cỏ ven hồ | h1 | lake | ground |
| `P-bb3906692ce0a3` | Lối đi và bãi đất ven hồ | h1 | lake | ground |
| `P-a575b46f2ae1a8` | Khu thử thách Hồ Đen | h1 | lake | deck |
| `P-1174317bcb3096` | Vườn bí Hagrid | h1 | hagrid | ground |
| `P-b830cb70ee02f6` | Vườn nhà Hagrid | h1 | hagrid | ground |
| `P-f2d3a414a25b76` | Vườn Thảo dược | h1 | greenhouses | ground |
| `P-29bc58039f5eae` | Vườn cây gần nhà kính | h1 | greenhouses | ground |
| `P-31f204a8e0e490` | Đường giữa các nhà kính | h1 | greenhouses | ground |
| `P-cc5bcc4d694457` | Lối lên Nhà cú / Cầu thang Nhà cú | h1 | owlery | ground |
| `P-4ba45d2ca765ad` | Đấu trường thử thách rồng Tam Pháp thuật | h1 | forest | ground |
| `P-3a8e137752a294` | Khu cắm trại Beauxbatons | h1 | hagrid | ground |
| `P-0286a54346e7d7` | Bãi neo tàu Durmstrang | h1 | lake | deck |
| `P-36df14fc8355e4` | Lăng mộ Dumbledore | h1 | lake | ground |
| `P-5daf783e1e1f28` | Sân vào lâu đài trong khu cổng | h2 | forecourt | ground |
| `P-bca1f1945d52e9` | Sân Viaduct | h2 | forecourt | ground |
| `P-6d6cfd0e60241f` | Sân Transfiguration (Biến hình) | h2 | mistletoe-court | ground |
| `P-38bf6be09df746` | Sân Bell Tower (Tháp Chuông) | h2 | wyvern-court | ground |
| `P-501e057d5be6b1` | Sân Quad | h2 | mistletoe-court | ground |
| `P-de97c63af46b5c` | Sân Clock Tower (Đồng hồ) | h2 | wooden-bridge | inset |
| `P-1ecd945e2b86b7` | Hai sân trong lâu đài | h2 | wyvern-court | ground |
| `P-33d82440a9be50` | Sân giữa các cánh lâu đài | h2 | wyvern-court | ground |
| `P-f6319cb5ddb159` | Sân chân tháp trong khối lâu đài | h2 | mistletoe-court | ground |
| `P-f79a562f43d99a` | Cầu cạn Viaduct | h2 | forecourt | inset |
| `P-5eb3bde9176879` | Cầu đá nối các cánh lâu đài | h2 | castle-18 | inset |
| `P-0a1ff4c2777f64` | Cầu gỗ và các cầu nối thuộc khối lâu đài | h2 | wooden-bridge | inset |
| `P-0880e4fe3da124` | Sảnh tiếp cận Đại Sảnh | hall | entrance-hall | ground |
| `P-95936a141ed516` | Phòng sau bàn giáo viên | hall | teacher-dais | inset |
| `HOG-TNG1-S-07` | Phòng tiếp khách nhà trường | hall | entrance-hall | inset |
| `TWR-01-02-03` | Phòng sinh hoạt học sinh cuối hành lang | gryffindor-common | gryffindor-dormitories | inset |
| `P-5e1f1cc14a2adb` | Phố chính Hogsmeade | village-static | village-square | ground |
| `P-f30d790b24b65a` | Các ngõ ở Hogsmeade | village-static | village-square | ground |
| `P-c8e6b9a47ac0b8` | Các cửa hàng hiện trong làng | village-static | hogsmeade-shop-0 | ground |
| `P-2be38007d6f246` | Apothecary tại Hogsmeade trong template | village-static | hogsmeade-homes | inset |
| `P-eeb5352311e7c0` | Sân tập nhỏ trong quần thể Quidditch | pitch-static | quidditch-pitch | ground |
| `P-f9359f86975e71` | Lối đi và sân trong ranh khu Quidditch | pitch-static | quidditch-pitch | ground |
| `P-c4b0eda051d309` | Mê cung Tam Pháp thuật ở sân Quidditch (khi diễn ra) | pitch-static | quidditch-pitch | ground |
| `P-dafe46b4834d00` | Khu chờ lên tàu tại King’s Cross | express | kings-cross | ground |
| `P-00020cadb6235e` | Đầu máy Hogwarts Express | express | train | inset |
| `P-046c1c72bb9fc9` | Hẻm Xéo | diagon-knockturn | da-homes | ground |
| `P-dbdb26cb4f253a` | Sân sau Cái Vạc Lủng | diagon-knockturn | da-leaky | inset |
| `P-95cdaf84841bcd` | Các tiệm, xưởng, quán trong bản đồ Diagon | diagon-knockturn | da-homes | ground |
| `P-71db87f76e608b` | Hẻm Knockturn | diagon-knockturn | ka-homes | ground |
| `P-5d33c248682e4b` | Tiệm cổ vật / cầm đồ tại Knockturn | diagon-knockturn | ka-upper | ground |
| `P-5c5b87e483e862` | Các cơ sở Knockturn khác trong template | diagon-knockturn | ka-homes | ground |
| `P-d85dbd8c19bb3b` | Các ngõ phố nối Hẻm Xéo và Knockturn | diagon-knockturn | ka-homes | ground |
