# ATLAS HIỆN TẠI — demo-5

**694 địa điểm · 141 nhóm · 13 Fixed Templates · 13 tham chiếu điều hướng**

Bản máy đọc: `atlas-approved-2.0`. Ngữ cảnh mới: W4.1; 44 cụm Hogwarts và 203 lượt tên phòng tiếng Anh đã đối chiếu vào bản ghi hiện có. Không đổi ID, tên chuẩn, chủ quản, hướng, layout nguồn hoặc ACTIVE/LOCKED.

## Nguồn và phiên bản

| Nguồn | Vai trò |
| --- | --- |
| [WZW_ATLAS_APPROVED.md](../maps/WZW_ATLAS_APPROVED.md) | Danh mục chuẩn chi tiết bằng tiếng Việt |
| [WZW_ATLAS_CLEAN_FINAL_REVIEW.json](../maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json) | 694 owner record + group + binding + alias |
| [WZW_W4_CONTEXT.md](../maps/WZW_W4_CONTEXT.md) | Nguyên văn W4.1/W4.2/W4.3 người dùng cung cấp |
| [atlas-index.json](../runtime/atlas-index.json) | Index được sinh từ nguồn chuẩn |

Tên file CLEAN_FINAL_REVIEW là tên lịch sử; nội dung trên demo-3/demo-5 là **atlas-approved-2.0**, không phải atlas-optimized-1.0 ở nhánh review cũ. W4 là văn bản tóm tắt, không phải danh sách 694 ID mới; không đổi nhãn phiên bản máy để giả định hai định dạng giống nhau.

## Số lượng

| Chủ quản | Địa điểm |
| --- | ---: |
| TEMPLATE | 226 |
| ATLAS | 359 |
| AU | 109 |

| Loại nhóm | Số nhóm |
| --- | ---: |
| template | 13 |
| unassigned | 1 |
| world | 30 |
| castle | 44 |
| tower | 24 |
| au | 29 |

## 13 Fixed Templates

| ID | Số địa điểm thuộc template |
| --- | ---: |
| `h1` | 46 |
| `h2` | 17 |
| `hall` | 13 |
| `gryffindor-common` | 10 |
| `ravenclaw-common` | 7 |
| `hufflepuff-common` | 5 |
| `slytherin-common` | 5 |
| `village-static` | 17 |
| `pitch-static` | 12 |
| `express` | 17 |
| `diagon-knockturn` | 31 |
| `ministry2` | 29 |
| `ministry-8-10` | 17 |

## ACTIVE / LOCKED và phạm vi runtime

ACTIVE: Nhà PC London, toàn bộ 5 phòng CCC 07.18 được liệt kê, Liad’s Attic. LOCKED/UNBUILT: Whitecap Estate, 7 Rowan Mews, WzW House Soho, Loft 5A Fitzrovia, Grayhaven Estate. Một record Bộ Pháp thuật chưa rõ tầng vẫn giữ riêng.

Nguồn giữ nguyên trạng thái này. Resolver không tự nạp phòng nền của nhóm LOCKED; dữ liệu RP được gửi rõ vẫn được giữ để dựng cảnh minh họa/fallback. Điều đó không đổi trạng thái map nguồn thành ACTIVE. Họ hành lang nguồn được giữ làm mặc định; layoutType Gemini được ưu tiên theo plan V4.

W4.2 thời gian di chuyển/lối bí mật và W4.3 trạng thái từng năm được lưu nguyên văn cho Gemini; runtime không mô phỏng travel, quest hoặc world state.

## Danh mục đầy đủ theo nhóm

### h1

`template:h1` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-e7ebf6e1f0fcb9` | Bãi học bay |  |
| `P-effd8342cc396c` | Bãi cỏ học tập quanh trường |  |
| `P-8153c1a6e4e7dc` | Sân cỏ cạnh lâu đài |  |
| `P-0d712868c509cf` | Bãi cỏ và đồng cỏ quanh Hogwarts |  |
| `P-385234641b8727` | Đường dạo ngoài trời quanh Hogwarts |  |
| `P-d76cff03ee7601` | Đường mòn giữa Hogwarts và Hogsmeade |  |
| `P-ff62bf19892de9` | Đường tới nhà ga Hogsmeade |  |
| `P-9fffb1aaa57eea` | Liễu Roi và bãi đất quanh cây |  |
| `P-9c19f623bbb1e3` | Vùng sát sân Quidditch ngoài ranh sân |  |
| `P-c061b81bba5c42` | Đường tới sân Quidditch |  |
| `P-6ac732451f03d7` | Đường đi ngoài các tường bao lâu đài |  |
| `P-13ae06fd76adc5` | Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2 |  |
| `P-6fca659549629d` | Bến ga / bến thuyền Hogsmeade ngoài khu nhà ga |  |
| `P-4df8571e5dea2e` | Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác |  |
| `P-0006dd26862fbe` | Lối vào Rừng Cấm |  |
| `P-7904b8045f6614` | Bìa Rừng Cấm |  |
| `P-63aa8852e10090` | Đường mòn Rừng Cấm |  |
| `P-8fd3daca88a6f1` | Khoảng rừng sâu |  |
| `P-52b6fe3a29d440` | Khu nhân mã trong Rừng Cấm |  |
| `P-8c15e0bfc2d11d` | Khu ổ nhện Aragog |  |
| `P-30cf89999f5e15` | Hồ Đen |  |
| `P-8f7588d4e8a5bc` | Mặt hồ và khu vực trên thuyền |  |
| `P-59e90d8a9ccc63` | Bờ Hồ Đen |  |
| `P-9c45a4f54ea1ee` | Đường dạo ven hồ |  |
| `P-17db50485e2b83` | Bãi cỏ ven hồ |  |
| `P-7f18ace1f8b2d7` | Bến thuyền Hogwarts |  |
| `P-9bf6e71ff3108b` | Nhà thuyền Hogwarts |  |
| `P-9f810bb6686c6d` | Cây cổ thụ ven hồ |  |
| `P-bb3906692ce0a3` | Lối đi và bãi đất ven hồ |  |
| `P-a575b46f2ae1a8` | Khu thử thách Hồ Đen |  |
| `P-143a2447e31c2c` | Lều Hagrid và các phòng bên trong |  |
| `P-1174317bcb3096` | Vườn bí Hagrid |  |
| `P-b830cb70ee02f6` | Vườn nhà Hagrid |  |
| `P-7debd31a87a61e` | Đường tới lều Hagrid |  |
| `P-96d14a7a982d4e` | Các nhà kính Hogwarts và các phòng bên trong |  |
| `P-f2d3a414a25b76` | Vườn Thảo dược |  |
| `P-29bc58039f5eae` | Vườn cây gần nhà kính |  |
| `P-31f204a8e0e490` | Đường giữa các nhà kính |  |
| `P-f322d7e98b6a02` | Nhà cú (Owlery) | Nhà cú và khu vực bên trong Nhà cú; Nhà cú (Owlery) |
| `TWR-11-01-02` | Kho thức ăn cho cú |  |
| `TWR-11-02-02` | Phòng chăm sóc cú bị thương |  |
| `P-cc5bcc4d694457` | Lối lên Nhà cú / Cầu thang Nhà cú | Lối lên Nhà cú; Cầu thang Nhà cú |
| `P-4ba45d2ca765ad` | Đấu trường thử thách rồng Tam Pháp thuật | Đấu trường thử thách rồng |
| `P-3a8e137752a294` | Khu cắm trại Beauxbatons |  |
| `P-0286a54346e7d7` | Bãi neo tàu Durmstrang |  |
| `P-36df14fc8355e4` | Lăng mộ Dumbledore |  |

### h2

`template:h2` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-f8ed3dbe20d357` | Ngoại thất khối lâu đài Hogwarts |  |
| `P-ae87f1280dad9c` | Cổng chính Hogwarts |  |
| `P-399f2c035627f1` | Sân trước lâu đài trong khu cổng |  |
| `P-5daf783e1e1f28` | Sân vào lâu đài trong khu cổng |  |
| `P-bca1f1945d52e9` | Sân Viaduct |  |
| `P-6d6cfd0e60241f` | Sân Transfiguration (Biến hình) |  |
| `P-38bf6be09df746` | Sân Bell Tower (Tháp Chuông) |  |
| `P-501e057d5be6b1` | Sân Quad |  |
| `P-de97c63af46b5c` | Sân Clock Tower (Đồng hồ) |  |
| `P-585c0776dc54a3` | Sân Wyvern |  |
| `P-442f7275b6c832` | Sân Mistletoe |  |
| `P-1ecd945e2b86b7` | Hai sân trong lâu đài |  |
| `P-33d82440a9be50` | Sân giữa các cánh lâu đài |  |
| `P-f6319cb5ddb159` | Sân chân tháp trong khối lâu đài |  |
| `P-f79a562f43d99a` | Cầu cạn Viaduct |  |
| `P-5eb3bde9176879` | Cầu đá nối các cánh lâu đài |  |
| `P-0a1ff4c2777f64` | Cầu gỗ và các cầu nối thuộc khối lâu đài |  |

### hall

`template:hall` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG1-S-02` | Đại Sảnh | Đại Sảnh (Great Hall) |
| `HOG-TNG1-S-01` | Tiền sảnh | Tiền sảnh (Entrance Hall); Tiền sảnh |
| `P-0880e4fe3da124` | Sảnh tiếp cận Đại Sảnh |  |
| `P-6e4b06065f0997` | Gian/phòng chờ trước Phân loại | Gian chờ trước Phân loại; Phòng chờ trước Phân loại |
| `P-ce57067fcd107f` | Phòng nhỏ cạnh Đại Sảnh |  |
| `P-95936a141ed516` | Phòng sau bàn giáo viên |  |
| `P-86e7455d5f7d47` | Phòng giáo viên | Phòng giáo viên (Staff Room) |
| `HOG-TNG1-S-06` | Văn phòng Filch |  |
| `P-ba63b94f595caf` | Sân trong gắn riêng với map hall (không gộp với các sân h2) | Sân trong gắn với map hall |
| `P-d216ce626788ed` | Lối lên Cầu thang Lớn tại Tiền sảnh |  |
| `HOG-TNG1-S-07` | Phòng tiếp khách nhà trường |  |
| `P-5fc25ea9745ef9` | Phòng học số 11 |  |
| `HOG-TNG1-W-02` | Gian chứa chổi (Kho chổi / Broom Cupboard) | Kho chổi (Broom Cupboard); Gian chứa chổi / kho chổi |

### gryffindor-common

`template:gryffindor-common` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-441745282e9e54` | Phòng sinh hoạt chung Gryffindor |  |
| `P-a63fc4014d765b` | Ký túc nam Gryffindor |  |
| `P-468097e3d74bf1` | Ký túc nữ Gryffindor |  |
| `P-6a9cb408f9f168` | Cầu thang trong khu Gryffindor |  |
| `P-337a20429f7b9d` | Khu sinh hoạt và học nhóm bên trong khu Gryffindor |  |
| `HOG-TNG8-S-01` | Lối chân dung Bà Béo |  |
| `HOG-TNG8-S-03` | Lối cầu thang ký túc Gryffindor |  |
| `TWR-01-01-02` | Lối thang ký túc nam |  |
| `TWR-01-01-03` | Lối thang ký túc nữ |  |
| `TWR-01-02-03` | Phòng sinh hoạt học sinh cuối hành lang |  |

### ravenclaw-common

`template:ravenclaw-common` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-4bde45f1a1cb07` | Phòng sinh hoạt chung Ravenclaw |  |
| `P-439400ea5f0cd4` | Ký túc nam Ravenclaw |  |
| `P-7d130cc86d97eb` | Ký túc nữ Ravenclaw |  |
| `TWR-02-01-02` | Sảnh vào / sảnh trong khu Ravenclaw | Sảnh vào Ravenclaw; Sảnh trong khu Ravenclaw |
| `P-da0da47f74a252` | Khu đọc và học nhóm Ravenclaw | Khu đọc và học nhóm bên trong khu Ravenclaw |
| `TWR-02-01-03` | Phòng đọc học thuật Ravenclaw | Phòng đọc học thuật Ravenclaw |
| `TWR-02-02-03` | Phòng học nhóm Ravenclaw | Phòng học nhóm Ravenclaw |

### hufflepuff-common

`template:hufflepuff-common` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-1795bc600c2b41` | Phòng sinh hoạt chung Hufflepuff |  |
| `P-ebceb992eb9255` | Ký túc nam Hufflepuff |  |
| `P-b4314de4234c88` | Ký túc nữ Hufflepuff |  |
| `HOG-TNGBP-E-04` | Hành lang chung Hufflepuff | Hành lang Hufflepuff; Hành lang chung trong khu Hufflepuff |
| `HOG-TNGBP-E-05` | Khu/phòng học nhóm Hufflepuff | Phòng học nhóm Hufflepuff; Khu học nhóm bên trong khu Hufflepuff |

### slytherin-common

`template:slytherin-common` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-80ce1ea13c2632` | Phòng sinh hoạt chung Slytherin | Slytherin Common Room |
| `P-6b050b321ff558` | Ký túc nam Slytherin |  |
| `P-a6425ebd843fab` | Ký túc nữ Slytherin |  |
| `P-1cbafaf3eaef87` | Hành lang chung Slytherin dưới hồ | Hành lang Slytherin dưới hồ |
| `HOG-HMNGC-E-05` | Khu đọc và học nhóm Slytherin (phòng học nhóm) | Phòng học nhóm Slytherin; Khu đọc và học nhóm bên trong khu Slytherin |

### village-static

`template:village-static` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-5e1f1cc14a2adb` | Phố chính Hogsmeade |  |
| `P-d2a51c4e5a9cd6` | Quảng trường Hogsmeade |  |
| `P-f30d790b24b65a` | Các ngõ ở Hogsmeade |  |
| `P-81c7ab0cff5ac4` | Khu nhà dân Hogsmeade |  |
| `P-197b2052678b9d` | Nhà dân trong template làng |  |
| `P-c8e6b9a47ac0b8` | Các cửa hàng hiện trong làng |  |
| `P-ce64687addd09a` | Honeydukes và tầng hầm |  |
| `P-633d0bcb4ab87e` | Zonko’s |  |
| `P-8bd319c866a655` | Gladrags |  |
| `P-eb74631b825f74` | Scrivenshaft’s |  |
| `P-f29f8a2656ded8` | Bưu điện Hogsmeade |  |
| `P-561ef194a3cfad` | Ba Cây Chổi và các phòng của quán |  |
| `P-8de3a27d58bad8` | Dervish & Banges |  |
| `P-81a969eb658163` | Đầu Heo và các phòng của quán |  |
| `P-28dd4f052c2855` | Quán trà Madam Puddifoot |  |
| `P-79710fe4d4bcfa` | Lều Hú và các phòng bên trong |  |
| `P-2be38007d6f246` | Apothecary tại Hogsmeade trong template |  |

### pitch-static

`template:pitch-static` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-7abe41594af2ff` | Sân Quidditch |  |
| `P-6575df3a62913f` | Mặt sân thi đấu |  |
| `P-5a4fefc72d7d57` | Các khán đài Quidditch |  |
| `P-09b9d228df78c4` | Khu bình luận / phòng bình luận |  |
| `P-936cbb9c617eca` | Dãy phòng phụ của sân |  |
| `P-eeb5352311e7c0` | Sân tập nhỏ trong quần thể Quidditch |  |
| `P-f9359f86975e71` | Lối đi và sân trong ranh khu Quidditch |  |
| `P-c4b0eda051d309` | Mê cung Tam Pháp thuật ở sân Quidditch (khi diễn ra) | Mê cung Tam Pháp thuật ở sân Quidditch |
| `P-638d3d8f890b97` | Phòng thay đồ đội A |  |
| `P-12d570650689e2` | Phòng thay đồ đội B |  |
| `P-e27a6e6c098632` | Phòng thay đồ các đội |  |
| `P-cf86b4537874ba` | Kho chổi tại sân |  |

### express

`template:express` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-a8f847e818afa1` | King’s Cross |  |
| `P-3a9add588aa69a` | Sân ga 9¾ |  |
| `P-dafe46b4834d00` | Khu chờ lên tàu tại King’s Cross |  |
| `P-ea0d1c088bb35d` | Hogwarts Express |  |
| `P-00020cadb6235e` | Đầu máy Hogwarts Express |  |
| `P-83c52658df2171` | Các toa Hogwarts Express |  |
| `P-5889d83ab64879` | Toa thường |  |
| `P-38988e75264a65` | Toa mẫu Gryffindor |  |
| `P-aab0be0508401d` | Toa mẫu Ravenclaw |  |
| `P-e1641c684d1741` | Toa mẫu Hufflepuff |  |
| `P-c901ae9bd25828` | Toa mẫu Slytherin |  |
| `P-226721c1fff80c` | Mọi buồng hành khách trong các toa |  |
| `P-a04785690fe84b` | Hành lang toa |  |
| `P-27cbd65e002cd1` | Lối nối giữa các toa |  |
| `P-94a7036730f10e` | Ga Hogsmeade |  |
| `P-b879bbed8fdc49` | Sân ga Hogsmeade (khu tàu) |  |
| `P-47576b791ebc5b` | Nhà ga Hogsmeade |  |

### diagon-knockturn

`template:diagon-knockturn` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-046c1c72bb9fc9` | Hẻm Xéo |  |
| `P-c7788eabe9f16a` | Cái Vạc Lủng và các phòng trọ |  |
| `P-dbdb26cb4f253a` | Sân sau Cái Vạc Lủng |  |
| `P-4cb1d44097aaf0` | Gringotts và hệ thống hầm / kho tiền |  |
| `P-cc0a4d9d894357` | Kho tiền 713 |  |
| `P-fde802b26605cc` | Kho tiền gia đình Potter |  |
| `P-1db46d6df4495f` | Kho tiền Lestrange |  |
| `P-04180946d36a33` | Ollivanders |  |
| `P-b652531fad15ad` | Flourish & Blotts |  |
| `P-c342fdc0ef620b` | Madam Malkin’s |  |
| `P-c97880d2883d88` | Quality Quidditch Supplies |  |
| `P-83b46b70fcdcc6` | Eeylops Owl Emporium |  |
| `P-c2473d02e0de42` | Magical Menagerie |  |
| `P-bdd56dfa509b7c` | Potage’s Cauldrons |  |
| `P-065a853b8d7608` | Florean Fortescue’s |  |
| `P-f4ef10f0794466` | Gambol & Japes |  |
| `P-5a0ec074efb106` | Weasleys’ Wizard Wheezes (nếu tồn tại theo thời kỳ) |  |
| `P-58bb45e6da0252` | Twilfitt & Tatting’s |  |
| `P-57a63e2aaa9159` | Scribbulus |  |
| `P-ece8b34b0783e7` | Apothecary |  |
| `P-1b93d2a168cc1a` | Tiệm đồ cũ |  |
| `P-9253053d400539` | Tiệm áo chùng cũ |  |
| `P-2b888eaec42438` | Tiệm bút lông và giấy da |  |
| `P-95cdaf84841bcd` | Các tiệm, xưởng, quán trong bản đồ Diagon |  |
| `P-06a1ce678f15be` | Các nhà dân trên phố trong bản đồ Diagon |  |
| `P-71db87f76e608b` | Hẻm Knockturn |  |
| `P-b08a347b7ef127` | Borgin & Burkes |  |
| `P-5d33c248682e4b` | Tiệm cổ vật / cầm đồ tại Knockturn |  |
| `P-5c5b87e483e862` | Các cơ sở Knockturn khác trong template |  |
| `P-0fe532e3c7b3e8` | Nhà dân và ngõ ở Knockturn |  |
| `P-d85dbd8c19bb3b` | Các ngõ phố nối Hẻm Xéo và Knockturn |  |

### ministry2

`template:ministry2` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-10ca277b3be7f2` | Văn phòng Bộ trưởng | Tầng 1 – Văn phòng Bộ trưởng |
| `P-f9c67c9c540345` | Văn phòng Thứ trưởng / trợ lý Bộ trưởng |  |
| `P-adc8756e94687f` | Thi hành Luật Pháp thuật | Tầng 2 – Thi hành Luật Pháp thuật |
| `P-af6716662de8c8` | Trụ sở Thần Sáng |  |
| `P-ad6b222c1cf8e4` | Văn phòng Sử dụng Pháp thuật Sai trái |  |
| `P-444469fe1666f1` | Văn phòng Lạm dụng Đồ tạo tác Muggle |  |
| `P-80b97fa352d930` | Khu hành chính Wizengamot |  |
| `P-8372c04e802fdc` | Tai nạn và Thảm họa Pháp thuật | Tầng 3 – Tai nạn và Thảm họa Pháp thuật |
| `P-6f640309d1ece1` | Đội Đảo ngược Tai nạn Pháp thuật |  |
| `P-951dc2baa9a710` | Bộ phận Xóa trí nhớ |  |
| `P-9301236b54857d` | Ủy ban Biện minh với Muggle |  |
| `P-4d4b012a451ee2` | Điều hòa và Kiểm soát Sinh vật | Tầng 4 – Điều hòa và Kiểm soát Sinh vật |
| `P-5fc3c5a0bcb0d1` | Bộ phận Quái thú |  |
| `P-2df6c97ce86355` | Bộ phận Sinh vật có tri giác |  |
| `P-f52be73f7dd9ce` | Bộ phận Linh hồn |  |
| `P-76e93cc0236521` | Văn phòng Liên lạc Yêu tinh |  |
| `P-873b198808d71f` | Văn phòng Tư vấn Sinh vật gây hại |  |
| `P-3d600b63857ca0` | Hợp tác Pháp thuật Quốc tế | Tầng 5 – Hợp tác Pháp thuật Quốc tế |
| `P-dfec82bd2d4f53` | Khu thương mại / luật quốc tế |  |
| `P-a3d0329c5db5e2` | Văn phòng Liên lạc Pháp thuật Quốc tế |  |
| `P-4247829f4f87d7` | Giao thông Pháp thuật | Tầng 6 – Giao thông Pháp thuật |
| `P-58ba0981b28173` | Văn phòng Mạng Floo |  |
| `P-05c90391d35da8` | Quản lý Chổi bay |  |
| `P-da0766f575a2ce` | Cơ quan Khóa Cảng |  |
| `P-13dfea8fe4bf27` | Văn phòng Cấp phép Độn thổ |  |
| `P-8f8a0811461a67` | Trò chơi và Thể thao Pháp thuật | Tầng 7 – Trò chơi và Thể thao Pháp thuật |
| `P-f66347f72f87d0` | Trụ sở Liên đoàn Quidditch Anh–Ireland |  |
| `P-91ec4108625f7b` | Câu lạc bộ Gobstones chính thức |  |
| `P-3e401191d71800` | Văn phòng Bằng sáng chế Lố bịch |  |

### ministry-8-10

`template:ministry-8-10` · template · ACTIVE · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-5b000833260ab3` | Atrium | Tầng 8 – Atrium |
| `P-1901b8ad031d44` | Sảnh tiếp đón Bộ Pháp thuật |  |
| `P-dadcf596a0437f` | Khu an ninh Bộ Pháp thuật |  |
| `P-df6ec24bb2876c` | Khu giao thông Floo Bộ Pháp thuật |  |
| `P-c251f1aa2096c0` | Khu tiếp nhận khách Bộ Pháp thuật |  |
| `P-1bd95d9a21aa0e` | Bộ Bảo mật | Tầng 9 – Bộ Bảo mật |
| `P-44a4a4856bc09b` | Sảnh tròn xoay |  |
| `P-86cd9a8defbb03` | Phòng Thời gian |  |
| `P-c089c78b883a86` | Sảnh Tiên tri |  |
| `P-bd4a42764da881` | Phòng Tử thần |  |
| `P-fd24a44f33135c` | Phòng Não |  |
| `P-f6ff23e797445d` | Phòng Không gian |  |
| `P-2c9c4c00c1d80b` | Phòng Tình yêu / phòng khóa kín |  |
| `P-4fee03ab76bb30` | Khu xử án | Tầng 10 – Khu xử án |
| `P-9805ab2f38804f` | Phòng xử án số 10 |  |
| `P-bf3c24a146fb6a` | Phòng chờ xét xử |  |
| `P-241e2fa15a09f1` | Phòng hỗ trợ xử án |  |

### Chưa rõ tầng (chỉ lưu 1 lần trong danh mục Bộ)

`ministry/unassigned` · unassigned · LOCKED / UNBUILT · layout: `—`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-9b80548a6b0f27` | Phòng của Ủy ban Đăng ký Phù thủy gốc Muggle |  |

### Britain › Scotland › Highlands › Vùng ven Hogsmeade

`world/eb7c8c1dce69` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-65ac0b29ed7007` | Hang Sirius trú ẩn ở vùng núi gần làng (không phải làng Hogsmeade) | Hang Sirius trú ở vùng núi gần làng |

### LONDON › Đường phố & ga

`world/055ce131d03e` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-a91d33c0729151` | Charing Cross Road |  |
| `P-23a728f27029ae` | Tottenham Court Road (kèm quán cà phê Tottenham Court Road) | Tottenham Court Road |
| `P-13cff25cacf38f` | Ga Paddington |  |

### LONDON › St Mungo › Tầng trệt

`world/5196877e1b05` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-a3e9554f74bb7f` | Sảnh tiếp nhận St Mungo |  |
| `P-1af0a04a59056b` | Khu điều trị tai nạn đồ tạo tác |  |

### LONDON › St Mungo › Tầng 1

`world/8a46f1f1a25f` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-aec6a126a04246` | Khu điều trị thương tích do sinh vật |  |

### LONDON › St Mungo › Tầng 2

`world/f3b6b90d84c0` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-9d882410cbff44` | Khu điều trị bệnh và nhiễm trùng pháp thuật |  |

### LONDON › St Mungo › Tầng 3

`world/654e0ee6279b` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-9f4eba8cbc0134` | Khu điều trị ngộ độc độc dược và thực vật |  |

### LONDON › St Mungo › Tầng 4

`world/165dbdbd3425` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-a62b074fca27d7` | Khu điều trị thương tổn do bùa chú |  |
| `P-c7580930f2caac` | Phòng bệnh dài hạn Janus Thickey |  |

### LONDON › St Mungo › Tầng 5

`world/3058a36fdf70` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-98946e3d409a8a` | Phòng trà khách thăm |  |
| `P-fc634b366552e4` | Cửa hàng bệnh viện |  |

### LONDON › Số 12 Grimmauld Place / nhà Black

`world/989093094a38` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-0d84f863a32ec4` | Sảnh nhà Black |  |
| `P-501145c3fc9c8d` | Bếp nhà Black |  |
| `P-9b9d65883bc0bb` | Phòng khách nhà Black |  |
| `P-b73feb15c40870` | Phòng ngủ Sirius Black |  |
| `P-1ba2a8427cd9a8` | Phòng ngủ Regulus Black |  |
| `P-81e49b0d4bd6c3` | Các phòng ngủ khác nhà Black | Phòng ngủ khác nhà Black |

### LONDON › Số nhà khác ở Grimmauld Place

`world/1436f43d0dba` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-c22fddd973f9ed` | Số 11 Grimmauld Place |  |
| `P-4f2d8576d24f18` | Số 13 Grimmauld Place |  |

### LONDON › Trại trẻ mồ côi của Tom Riddle

`world/d529df0d5c52` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-8f6fe8ad4cc0c0` | Phòng Tom Riddle ở trại trẻ |  |
| `P-561f5bd89f1fb7` | Văn phòng quản lý trại trẻ |  |

### LONDON › Công trình khác

`world/99bb4fddf856` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-000814ab7a3200` | Số 10 Downing Street / văn phòng Thủ tướng Muggle |  |
| `P-851acac2ec7f8b` | Purge and Dowse (mặt tiền / lối vào St Mungo) | Purge and Dowse (mặt tiền St Mungo) |

### England › Surrey › Little Whinging › Khu dân cư

`world/dc8a1ebe26ed` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-5cd173a0de0b12` | Little Whinging |  |
| `P-43ffcc1098a3aa` | Privet Drive |  |
| `P-3733c32c66774d` | Magnolia Crescent |  |
| `P-424cf93d589f58` | Magnolia Road |  |
| `P-2fdedba88577ad` | Công viên Little Whinging |  |
| `P-712dcf0d542fa9` | Nhà bà Figg |  |
| `P-89ce1f70269693` | Số 2 Magnolia Crescent (địa chỉ được nhắc) |  |
| `P-efe5e3b54c110c` | Số 7 Privet Drive |  |

### England › Surrey › Little Whinging › Số 4 Privet Drive / nhà Dursley

`world/60656630470d` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-7b1adb6069d328` | Phòng khách Dursley |  |
| `P-18feb9f615073d` | Bếp nhà Dursley |  |
| `P-5bc4accf8f9cfb` | Phòng ăn nhà Dursley |  |
| `P-88aadc4a38ae9c` | Phòng ngủ Harry |  |
| `P-d311ceb6407c3e` | Phòng ngủ Dudley |  |
| `P-57ffd05e36562d` | Phòng ngủ Vernon/Petunia |  |
| `P-df6db152b7d063` | Gầm cầu thang nhà Dursley |  |
| `P-4232fc85ff42c4` | Vườn nhà Dursley |  |

### England › Tây Nam › Làng Ottery St Catchpole

`world/8c6c3a563933` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-e68bc933cbfc46` | Làng Ottery St Catchpole |  |
| `P-e1b58685e41178` | Nhà Diggory (nhà Amos Diggory; không tách bản ghi) | Nhà Diggory; Nhà của Amos Diggory (nếu tách khỏi Ottery St Catchpole) |
| `P-223c9a29e759d3` | Nhà Fawcett |  |

### England › Ottery St Catchpole › Hang Sóc / nhà Weasley

`world/7ccfbfd62db3` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-2e8e6fd50795cc` | Bếp Hang Sóc |  |
| `P-4e78486f8e5d5c` | Phòng khách Hang Sóc |  |
| `P-695c706560e4fb` | Phòng ngủ Arthur & Molly |  |
| `P-0ebb356a309e42` | Phòng ngủ Ron |  |
| `P-6eac4eb0234cb3` | Phòng ngủ Ginny |  |
| `P-328fae86b7c01c` | Phòng ngủ Fred & George |  |
| `P-4890242d6f09e8` | Các phòng ngủ khác Hang Sóc |  |
| `P-c11e875f2e672c` | Gác mái Hang Sóc |  |
| `P-c3f56557f43009` | Vườn Hang Sóc |  |
| `P-ff60dc5c801cf1` | Bãi chơi Quidditch sau nhà |  |

### England › Ottery St Catchpole › Nhà Lovegood

`world/9d9623aeeb53` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-eb0e081c67cc39` | Phòng sinh hoạt nhà Lovegood |  |
| `P-1c6f7973221157` | Phòng Luna Lovegood |  |
| `P-10483afb50657b` | Phòng làm việc Xenophilius |  |
| `P-e3c60767666046` | Vườn nhà Lovegood |  |

### England › Godric’s Hollow

`world/904052c0a0e8` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-dec21f949ed798` | Làng Godric’s Hollow |  |
| `P-6c6fc8c763f6b7` | Quảng trường Godric’s Hollow |  |
| `P-2a51f7e8e278a7` | Nhà thờ Godric’s Hollow |  |
| `P-5ddef138f591ee` | Nghĩa địa Godric’s Hollow |  |
| `P-5d4b08c68c7c51` | Nhà Potter / Potter Cottage |  |
| `P-05d77e52709869` | Nhà Bathilda Bagshot |  |
| `P-55b6096c51b788` | Nhà gia đình Dumbledore |  |

### England › Little Hangleton / Great Hangleton

`world/782417b8b760` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-95f33b1a222e12` | Làng Little Hangleton |  |
| `P-e57b3aa8509cf4` | Làng Great Hangleton |  |
| `P-3af65a0ca62879` | Biệt thự Riddle |  |
| `P-cf6e6f0ff253af` | Nghĩa địa Little Hangleton |  |
| `P-1388a8951a3c11` | Nhà Gaunt |  |
| `P-1257864e10b184` | Quán The Hanged Man |  |

### England › Cokeworth / Spinner’s End

`world/6121ebe9f1b6` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-5965034df92b27` | Cokeworth |  |
| `P-2cda580d14d444` | Spinner’s End |  |
| `P-90f19984c65a90` | Nhà Snape |  |
| `P-a56cde3ee35e1c` | Railview Hotel |  |

### England › Wiltshire › Trang viên Malfoy

`world/c54eed2966f8` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-37846d42ec845c` | Khuôn viên Malfoy Manor |  |
| `P-7ceaf0fcb836c1` | Đại sảnh Malfoy Manor |  |
| `P-bbfe47f234c957` | Phòng khách Malfoy Manor |  |
| `P-cdc1a91748b387` | Hầm giam Malfoy Manor |  |

### England › Tinworth & ven biển

`world/14eb91ac7a4e` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-292e4cf5737a49` | Làng Tinworth |  |
| `P-209dc8c61fa3bb` | Shell Cottage / nhà Bill và Fleur |  |
| `P-b1b448f37c4d1e` | Bếp Shell Cottage |  |
| `P-60ff93fb1c4473` | Phòng khách Shell Cottage |  |
| `P-7c862bcde92bda` | Phòng ngủ Shell Cottage |  |
| `P-25a2f0dc7c7eba` | Vườn Shell Cottage |  |
| `P-16ec3a57420b99` | Bờ biển gần Shell Cottage |  |

### England › địa chỉ chưa xác định

`world/e68d54c5fd4f` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-52ea7749d9b897` | Nhà cô Muriel |  |
| `P-aabefd99376d5b` | Nhà Hepzibah Smith |  |
| `P-54d36cdd92de52` | Nhà Alastor Moody |  |
| `P-1809b6a4970166` | Nhà Barty Crouch Sr | Nhà Barty Crouch Sr. |
| `P-ac442939b95160` | Nhà gia đình Longbottom | Nhà gia đình Longbottom (địa chỉ không xác định) |
| `P-8ffce1da3d07cd` | Nhà Tonks | Nhà Tonks (địa chỉ không xác định) |
| `P-ecc27e85264a4a` | Nhà Kingsley Shacklebolt | Nhà Kingsley Shacklebolt (địa chỉ không xác định) |
| `P-4091d06b78b915` | Nhà Granger | Nhà Granger (địa chỉ không xác định) |
| `P-e10f1f2455074a` | Nhà Diggle | Nhà Diggle (địa chỉ không xác định) |
| `P-5bfdb63dbfad77` | Nhà Gregorovitch | Nhà Gregorovitch (địa chỉ không xác định) |

### England › Các địa danh khác

`world/c855588a2890` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-b4e7452b5bd988` | Budleigh Babberton |  |
| `P-30e83b523e3592` | Nhà Slughorn ở tạm tại Budleigh Babberton |  |
| `P-39e69af2a5fc7c` | Upper Flagley |  |
| `P-4f6ef384d93fb3` | Rừng Dean |  |
| `P-a6360747d2eff6` | Bãi cắm trại trong Rừng Dean |  |
| `P-df07d01094f11f` | Túp lều ngoài biển trong tập một (trên đá) | Túp lều ngoài biển trong tập một |

### England › Britain › Phương tiện

`world/289165859881` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-8d8c423e13cb3d` | Xe Buýt Hiệp Sĩ |  |
| `P-aa74a45869a845` | Phòng khách trên xe Buýt Hiệp Sĩ |  |

### England › Britain › Ngoài khơi / bí mật

`world/a8924a18fe13` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-d45c30dace5abc` | Nhà tù Azkaban |  |
| `P-8957dd0847f167` | Các dãy phòng giam Azkaban |  |

### England › Romania

`world/a6d4636e79fc` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-6f37aeb5ab1ff0` | Khu nuôi / bảo tồn rồng Romania – nơi Charlie làm việc | Khu nuôi/bảo tồn rồng Romania – nơi Charlie làm việc |

### England › United States › Massachusetts

`world/2778243b0f85` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-b1a5bbf296daf9` | Ilvermorny School of Witchcraft and Wizardry |  |

### England › United States › New York

`world/a907ab8667f0` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-632d1664ab4804` | MACUSA Headquarters |  |

### England › Các địa điểm riêng / không chốt vị trí

`world/ddfc9e3e7438` · world · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-b86cbfbdc07271` | Hang biển của Voldemort |  |
| `P-07666cff74b9d9` | Hồ ngầm trong hang biển |  |
| `P-c12015ea2dc205` | Đảo đá trong hồ hang biển |  |
| `P-297d369b484bc3` | Cánh đồng World Cup Quidditch |  |
| `P-a19b8a7eea3f66` | Khu lều World Cup |  |
| `P-9ebcfc85eb0c36` | Sân vận động World Cup |  |
| `P-3be97f06839afa` | Các lăng mộ Ai Cập mà Bill phá giải lời nguyền |  |

### HẦM NGẦM · Bắc · Đường dẫn hầm kỹ thuật

`hogwarts/f0/0` · castle · ACTIVE · layout: `vertical`

W4: Tech Tunnels / SUB-DUNGEONS (HẦM NGẦM) / N Tech Tunnels

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGM-N-01` | Hành lang đá dưới Tháp Thiên văn | Stone Corridor under Astronomy Tower |
| `HOG-HMNGM-N-02` | Phòng Giả kim | Alchemy Room |
| `HOG-HMNGM-N-03` | Kho than và nhiên liệu | Coal/Fuel Store |
| `HOG-HMNGM-N-04` | Phòng kiểm tra móng tháp | Tower Foundation Check Room |

### HẦM NGẦM · Đông · Hầm di tích và cửa sâu

`hogwarts/f0/1` · castle · ACTIVE · layout: `ell`

W4: Relic Vaults / SUB-DUNGEONS (HẦM NGẦM) / E Relic Vaults

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGM-E-01` | Đường ống xuống Phòng Chứa Bí mật | Chamber of Secrets Pipe |
| `HOG-HMNGM-E-02` | Phòng Chứa Bí mật | Chamber of Secrets |
| `HOG-HMNGM-E-03` | Gian cửa chắn hầm cổ | Ancient Vault Gatehouse |
| `HOG-HMNGM-E-04` | Hành lang dẫn đến hầm bị niêm phong | Sealed Vault Corridor |

### HẦM NGẦM · Nam · Cụm hầm đá bảo vệ cũ · Khu bảo vệ Hòn đá Phù thủy dưới Hogwarts

`hogwarts/f0/2` · castle · ACTIVE · layout: `horizontal`

W4: Y1 Stone Chambers / SUB-DUNGEONS (HẦM NGẦM) / S Y1 Stone Chambers

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGM-S-01` | Gian Dây Sa-tăng | Devil's Snare |
| `HOG-HMNGM-S-02` | Gian chìa khóa bay | Flying Keys |
| `HOG-HMNGM-S-03` | Gian bàn cờ phù thủy | Wizard's Chess |
| `HOG-HMNGM-S-04` | Gian thử thách Độc dược | Potions Trial |
| `HOG-HMNGM-S-05` | Gian cuối bảo vệ Hòn đá | Final Mirror Chamber |

### HẦM NGẦM · Tây · Hầm đá xưa và phòng nghiên cứu

`hogwarts/f0/3` · castle · ACTIVE · layout: `tee`

W4: Ancient Study / SUB-DUNGEONS (HẦM NGẦM) / W Ancient Study

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGM-W-01` | Map Chamber | Map Chamber |
| `HOG-HMNGM-W-02` | Undercroft | Undercroft |
| `HOG-HMNGM-W-03` | Kho dụng cụ khảo cổ | Archaeological Tool Store |
| `HOG-HMNGM-W-04` | Phòng lập bản vẽ công trình | Blueprint Room |

### HẦM NGỤC · Bắc · Cụm Độc dược và gian chuẩn bị

`hogwarts/f1/0` · castle · ACTIVE · layout: `cross`

W4: Potions Cluster / DUNGEONS (HẦM NGỤC) / N Potions Cluster

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGC-N-01` | Phòng học Độc dược | Potions Classroom |
| `HOG-HMNGC-N-02` | Văn phòng Snape | Snape's Office |
| `HOG-HMNGC-N-03` | Kho nguyên liệu Độc dược | Potions Ingredient Store; Ingredient Store |
| `HOG-HMNGC-N-04` | Phòng chuẩn bị bài thực hành | Practical Prep Room; Potions Prep Room |
| `HOG-HMNGC-N-05` | Phòng rửa vạc | Cauldron Washroom |

### HẦM NGỤC · Đông · Lối Slytherin dưới mặt hồ

`hogwarts/f1/1` · castle · ACTIVE · layout: `curved`

W4: Slytherin Approach / DUNGEONS (HẦM NGỤC) / E Slytherin Approach

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:slytherin-common` — slytherin-common

### HẦM NGỤC · Nam · Kho và tuyến phục vụ dưới Đại Sảnh

`hogwarts/f1/2` · castle · ACTIVE · layout: `horizontal`

W4: Under-Hall Service / DUNGEONS (HẦM NGỤC) / S Under-Hall Service

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGC-S-01` | Phòng tiệc Tử nhật | Deathday Party Chamber |
| `HOG-HMNGC-S-02` | Kho vật tư lau dọn | Cleaning Supply Store |
| `HOG-HMNGC-S-03` | Hành lang vận chuyển thực phẩm | Food Transit Corridor |
| `HOG-HMNGC-S-04` | Phòng trực gia tinh | House-Elf Duty Room |
| `HOG-HMNGC-S-05` | Phòng kỹ thuật lò sưởi | Furnace Tech Room |

### HẦM NGỤC · Tây · Cụm lớp học ngầm và hầm cũ

`hogwarts/f1/3` · castle · ACTIVE · layout: `ell`

W4: Subterranean Classes / DUNGEONS (HẦM NGỤC) / W Subterranean Classes

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-HMNGC-W-01` | Hành lang hầm Tháp Thiên văn | Astronomy Dungeon Corridor |
| `HOG-HMNGC-W-02` | Phòng phân loại mẫu khoáng | Mineral Sorting Room |
| `HOG-HMNGC-W-03` | Phòng học trống HN-01 | Empty Classroom HN-01 |
| `HOG-HMNGC-W-04` | Kho nồi vạc cũ | Old Cauldron Store |
| `HOG-HMNGC-W-05` | Phòng lưu mẫu độc dược | Potion Sample Archive |

### TẦNG BẾP · Bắc · Bếp và lối phục vụ

`hogwarts/f2/0` · castle · ACTIVE · layout: `tee`

W4: Kitchens & Service / KITCHENS (TẦNG BẾP) / N Kitchens & Service

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNGBP-N-01` | Bếp Hogwarts | Hogwarts Kitchens |
| `HOG-TNGBP-N-02` | Kho thực phẩm khô | Dry Food Store |
| `HOG-TNGBP-N-03` | Phòng chuẩn bị suất ăn | Meal Prep Room |
| `HOG-TNGBP-N-04` | Phòng rửa dụng cụ nhà bếp | Scullery/Dishwashing |
| `HOG-TNGBP-N-05` | Hành lang hậu cần bếp | Kitchen Logistics Corridor |

### TẦNG BẾP · Đông · Cụm Hufflepuff

`hogwarts/f2/1` · castle · ACTIVE · layout: `ell`

W4: Hufflepuff Approach / KITCHENS (TẦNG BẾP) / E Hufflepuff Approach

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:hufflepuff-common` — hufflepuff-common

### TẦNG BẾP · Nam · Giặt là và kho phục vụ

`hogwarts/f2/2` · castle · ACTIVE · layout: `vertical`

W4: Laundry & Linen / KITCHENS (TẦNG BẾP) / S Laundry & Linen

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNGBP-S-01` | Phòng giặt là | Laundry Room |
| `HOG-TNGBP-S-02` | Phòng đồ vải | Linen Room |
| `HOG-TNGBP-S-03` | Kho khăn trải bàn | Tablecloth Store |
| `HOG-TNGBP-S-04` | Phòng bảo trì dụng cụ giặt | Laundry Maintenance |
| `HOG-TNGBP-S-05` | Hành lang kho phía Nam | South Storage Corridor |

### TẦNG BẾP · Tây · Khu công vụ và hầm thực phẩm

`hogwarts/f2/3` · castle · ACTIVE · layout: `cross`

W4: Elf Quarters & Larder / KITCHENS (TẦNG BẾP) / W Elf Quarters & Larder

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNGBP-W-01` | Phòng nghỉ gia tinh | House-Elf Quarters |
| `HOG-TNGBP-W-02` | Kho rau củ | Vegetable Larder |
| `HOG-TNGBP-W-03` | Kho thảo mộc nhà bếp | Kitchen Herb Store |
| `HOG-TNGBP-W-04` | Kho dụng cụ dự phòng | Spare Utensil Store |
| `HOG-TNGBP-W-05` | Hành lang kết nối hầm phía Tây | West Basement Link Corridor |

### TẦNG 1 · Bắc · North Hall – Bell Tower

`hogwarts/f3/0` · castle · ACTIVE · layout: `cloister`

W4: North Hall–Bell Tower / F1 (GROUND / TẦNG 1) / N North Hall–Bell Tower

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG1-N-01` | Sảnh phía Bắc (North Hall) | North Hall |
| `HOG-TNG1-N-02` | Sảnh chân Tháp Chuông | Bell Tower Foot Hall |
| `HOG-TNG1-N-03` | Hành lang tới cửa Bắc Hogwarts | North Gate Corridor |
| `HOG-TNG1-N-04` | Phòng trực cửa Bắc | North Gate Guardroom |
| `HOG-TNG1-N-05` | Kho đồ dùng sân tập | Practice Gear Store |
| `HOG-TNG1-N-06` | Phòng học trống B-01 | Empty Classroom B-01 |

### TẦNG 1 · Đông · Library Annex – Viaduct

`hogwarts/f3/1` · castle · ACTIVE · layout: `cross`

W4: Library Annex–Viaduct / F1 (GROUND / TẦNG 1) / E Library Annex–Viaduct

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG1-E-01` | Sảnh Trung tâm (Central Hall) | Central Hall |
| `HOG-TNG1-E-02` | Sảnh lối vào Cầu cạn (Viaduct Entrance) | Viaduct Entrance Hall |
| `HOG-TNG1-E-03` | Hành lang nối khu nhà kính | Greenhouse Link Corridor |
| `HOG-TNG1-E-04` | Phòng tiếp học sinh mới | New Pupil Reception |
| `HOG-TNG1-E-05` | Kho dụng cụ sảnh Trung tâm | Central Hall Store |
| `HOG-TNG1-E-06` | Phòng học trống Đ-01 | Empty Classroom Đ-01 |

### TẦNG 1 · Nam · Entrance Hall – Great Hall

`hogwarts/f3/2` · castle · ACTIVE · layout: `tee`

W4: Great Hall Approach / F1 (GROUND / TẦNG 1) / S Great Hall Approach

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:hall` — hall

### TẦNG 1 · Tây · Transfiguration Courtyard approach

`hogwarts/f3/3` · castle · ACTIVE · layout: `court`

W4: Transfig Courtyard Approach / F1 (GROUND / TẦNG 1) / W Transfig Courtyard Approach

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG1-W-03` | Hành lang vào sân Biến hình | Transfiguration Courtyard Corridor |
| `HOG-TNG1-W-04` | Hành lang hướng sân Tứ giác | Quad Corridor |
| `HOG-TNG1-W-05` | Phòng gửi áo choàng | Cloakroom |
| `HOG-TNG1-W-06` | Kho dụng cụ Biến hình | Transfiguration Supply Store |

→ `template:hall` — hall

### TẦNG 2 · Bắc · History & Transfiguration corridor

`hogwarts/f4/0` · castle · ACTIVE · layout: `horizontal`

W4: History & Transfiguration / F2 (TẦNG 2) / N History & Transfiguration

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG2-N-01` | Phòng Lịch sử Pháp thuật | History of Magic Classroom |
| `HOG-TNG2-N-02` | Văn phòng McGonagall | McGonagall's Office |
| `HOG-TNG2-N-03` | Phòng học Biến hình | Transfiguration Classroom |
| `HOG-TNG2-N-04` | Phòng chuẩn bị Biến hình | Transfiguration Prep Room |
| `HOG-TNG2-N-05` | Kho sách Lịch sử Pháp thuật | History Book Store |
| `HOG-TNG2-N-06` | Phòng học trống B-02 | Empty Classroom B-02 |

### TẦNG 2 · Đông · Scholars / North Hall upper walk

`hogwarts/f4/1` · castle · ACTIVE · layout: `windows`

W4: Scholars Upper Walk / F2 (TẦNG 2) / E Scholars Upper Walk

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG2-W-01` | Phòng học Muggle học | Muggle Studies Classroom |
| `HOG-TNG2-W-02` | Phòng Chữ tượng hình (Hieroglyphics) | Hieroglyphics Room |
| `HOG-TNG2-W-03` | Hành lang tầng trên North Hall | North Hall Upper Corridor |
| `HOG-TNG2-W-04` | Phòng lưu mô hình lịch sử | Historical Model Archive |
| `HOG-TNG2-W-05` | Kho bản đồ giảng dạy | Teaching Map Store |
| `HOG-TNG2-W-06` | Phòng học trống T-02 | Empty Classroom T-02 |

### TẦNG 2 · Nam · Hospital & Faculty Tower access

`hogwarts/f4/2` · castle · ACTIVE · layout: `ell`

W4: Hospital & Faculty Access / F2 (TẦNG 2) / S Hospital & Faculty Access

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG2-S-01` | Bệnh xá Hogwarts | Hospital Wing |
| `HOG-TNG2-S-02` | Văn phòng bà Pomfrey | Pomfrey's Office |
| `HOG-TNG2-S-03` | Hành lang vào Tháp Giáo viên | Faculty Tower Access Corridor |
| `HOG-TNG2-S-04` | Phòng thay băng | Bandage/Dressing Room |
| `HOG-TNG2-S-05` | Kho vật tư y tế | Medical Supply Store |
| `HOG-TNG2-S-06` | Phòng chờ bệnh xá | Infirmary Waiting Room |

### TẦNG 2 · Tây · DADA teaching cluster

`hogwarts/f4/3` · castle · ACTIVE · layout: `tee`

W4: DADA Teaching Cluster / F2 (TẦNG 2) / W DADA Teaching Cluster

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG2-E-01` | Phòng học Phòng chống Nghệ thuật Hắc ám (cửa tháp) | Phòng học Phòng chống Nghệ thuật Hắc ám; Phòng học Phòng chống Nghệ thuật Hắc ám — cửa tháp; DADA Classroom (tower door) |
| `HOG-TNG2-E-02` | Hành lang Tháp DADA tầng thấp | Lower DADA Tower Corridor |
| `HOG-TNG2-E-03` | Phòng học phụ Tháp DADA | DADA Auxiliary Room |
| `HOG-TNG2-E-04` | Phòng thực hành phòng vệ | Defence Practical Room |
| `HOG-TNG2-E-05` | Kho đạo cụ DADA (kho đạo cụ phòng vệ tại chân Tháp DADA) | Kho đạo cụ DADA; Kho đạo cụ phòng vệ; DADA Prop Store |
| `HOG-TNG2-E-06` | Phòng học trống Đ-02 | Empty Classroom Đ-02 |

### TẦNG 3 · Bắc · Phòng vệ sinh Myrtle và dãy hành lang

`hogwarts/f5/0` · castle · ACTIVE · layout: `horizontal`

W4: Myrtle's Corridor / F3 (TẦNG 3) / N Myrtle's Corridor

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG3-N-01` | Nhà vệ sinh Myrtle | Myrtle's Bathroom |
| `HOG-TNG3-N-02` | Hành lang tầng hai cạnh nhà vệ sinh Myrtle | "Second-Floor" Corridor by Myrtle's Bathroom |
| `HOG-TNG3-N-03` | Nhà vệ sinh nam tầng này | Boys' Bathroom |
| `HOG-TNG3-N-04` | Kho bảo trì đường nước | Plumbing Store |
| `HOG-TNG3-N-05` | Phòng trực hành lang B-03 | Corridor Guardroom B-03 |

### TẦNG 3 · Đông · Cầu thang tắt và hành lang lâu đài

`hogwarts/f5/1` · castle · ACTIVE · layout: `curved`

W4: Shortcut Stair Walk / F3 (TẦNG 3) / E Shortcut Stair Walk

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG3-W-02` | Hành lang tranh bản đồ Argyllshire | Argyllshire Map Tapestry Corridor |
| `HOG-TNG3-W-03` | Phòng kiểm tra an toàn cầu thang | Stair Safety Check Room |
| `HOG-TNG3-W-04` | Phòng học trống T-03 | Empty Classroom T-03 |
| `HOG-TNG3-W-05` | Kho ghế bàn học | Desk/Chair Store |

### TẦNG 3 · Nam · Phòng học bổ trợ

`hogwarts/f5/2` · castle · ACTIVE · layout: `vertical`

W4: Supplemental Classes / F3 (TẦNG 3) / S Supplemental Classes

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG3-S-01` | Phòng luyện đũa phép cơ bản | Basic Wand-Practice Room |
| `HOG-TNG3-S-02` | Phòng học trống N-03 | Empty Classroom N-03 |
| `HOG-TNG3-S-03` | Kho thiết bị học tập | Study Equipment Store |
| `HOG-TNG3-S-04` | Phòng làm việc trợ giảng | TA Office |
| `HOG-TNG3-S-05` | Phòng sinh hoạt học sinh nhỏ | Small Student Lounge |

### TẦNG 3 · Tây · Văn phòng DADA – lối kín

`hogwarts/f5/3` · castle · ACTIVE · layout: `ell`

W4: DADA Office Route / F3 (TẦNG 3) / W DADA Office Route

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG3-E-01` | Văn phòng giáo sư DADA (Lockhart 1992) | DADA Professor's Office (Lockhart 1992) |
| `HOG-TNG3-E-02` | Hành lang tới văn phòng DADA | DADA Office Corridor |
| `HOG-TNG3-E-03` | Phòng tiếp phụ huynh của khoa DADA | DADA Parent Reception |
| `HOG-TNG3-E-04` | Phòng lưu giáo án | Lesson Plan Archive |
| `HOG-TNG3-E-05` | Phòng học trống Đ-03 | Empty Classroom Đ-03 |

### TẦNG 4 · Bắc · Trophy – Armour Gallery

`hogwarts/f6/0` · castle · ACTIVE · layout: `windows`

W4: Trophy–Armour Gallery / F4 (TẦNG 4) / N Trophy–Armour Gallery

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG4-N-01` | Phòng Trưng bày Chiến tích | Trophy Room |
| `HOG-TNG4-N-02` | Hành lang áo giáp | Armour Gallery |
| `HOG-TNG4-N-03` | Phòng Âm nhạc (Music Room) | Music Room |
| `HOG-TNG4-N-04` | Kho bảo quản cúp | Trophy Preservation Store |
| `HOG-TNG4-N-05` | Phòng tập hòa tấu | Ensemble Practice Room |
| `HOG-TNG4-N-06` | Phòng học trống B-04 | Empty Classroom B-04 |

### TẦNG 4 · Đông · Gallery – North Hall upper route

`hogwarts/f6/1` · castle · ACTIVE · layout: `curved`

W4: Upper North Gallery / F4 (TẦNG 4) / E Upper North Gallery

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG4-W-01` | Hành lang tầng trên Sảnh Bắc | North Hall Upper Gallery Corridor |
| `HOG-TNG4-W-02` | Phòng trưng bày cổ vật giáo dục | Educational Artefact Display |
| `HOG-TNG4-W-03` | Phòng học trống T-04 | Empty Classroom T-04 |
| `HOG-TNG4-W-04` | Kho trang phục biểu diễn | Costume Store |
| `HOG-TNG4-W-05` | Phòng phục hồi hiện vật | Artefact Restoration Room |

### TẦNG 4 · Nam · Câu lạc bộ và hoạt động nhóm

`hogwarts/f6/2` · castle · ACTIVE · layout: `cross`

W4: Clubs & Group Work / F4 (TẦNG 4) / S Clubs & Group Work

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG4-S-01` | Phòng tập Đấu tay đôi dự phòng | Backup Duelling Practice Room |
| `HOG-TNG4-S-02` | Phòng chuẩn bị câu lạc bộ | Club Prep Room |
| `HOG-TNG4-S-03` | Phòng tập diễn thuyết | Public Speaking Room |
| `HOG-TNG4-S-04` | Phòng họp học sinh | Student Meeting Room |
| `HOG-TNG4-S-05` | Phòng học trống N-04 | Empty Classroom N-04 |

### TẦNG 4 · Tây · Charms – hành lang cấm cũ

`hogwarts/f6/3` · castle · ACTIVE · layout: `ell`

W4: Charms & Forbidden Route / F4 (TẦNG 4) / W Charms & Forbidden Route

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG4-E-01` | Phòng học Bùa chú | Charms Classroom |
| `HOG-TNG4-E-02` | Hành lang Bùa chú | Charms Corridor |
| `HOG-TNG4-E-03` | Hành lang cấm tầng ba năm 1991 | 1991 "Third-Floor" Forbidden Corridor |
| `HOG-TNG4-E-04` | Gian cửa sập của Fluffy (1991) | Fluffy's Trapdoor Chamber (1991) |
| `HOG-TNG4-E-05` | Phòng thực hành Bùa chú | Charms Practical Room |
| `HOG-TNG4-E-06` | Kho đồ dùng Bùa chú | Charms Supply Store |

### TẦNG 5 · Bắc · Library – Restricted Section

`hogwarts/f7/0` · castle · ACTIVE · layout: `cloister`

W4: Library & Restricted / F5 (TẦNG 5) / N Library & Restricted

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG5-N-01` | Thư viện Hogwarts | Hogwarts Library |
| `HOG-TNG5-N-02` | Khu Sách Cấm (Restricted Section) | Restricted Section |
| `HOG-TNG5-N-03` | Phòng làm việc thủ thư | Pince's Office |
| `HOG-TNG5-N-04` | Phòng đọc nghiên cứu | Research Reading Room |
| `HOG-TNG5-N-05` | Phòng tra cứu mục lục | Catalogue Index Room |
| `HOG-TNG5-N-06` | Kho sách ít dùng | Rare Book Store |

### TẦNG 5 · Đông · Long Gallery – chuyên môn

`hogwarts/f7/1` · castle · ACTIVE · layout: `windows`

W4: Long Gallery / F5 (TẦNG 5) / E Long Gallery

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG5-E-01` | Hành lang Dài (Long Gallery) | Long Gallery |
| `HOG-TNG5-E-02` | Phòng học Số học (Arithmancy) | Arithmancy Classroom |
| `HOG-TNG5-E-03` | Phòng bản đồ và địa lý pháp thuật | Magical Cartography Room |
| `HOG-TNG5-E-04` | Phòng giải mã mật thư | Cipher/Cryptology Room |
| `HOG-TNG5-E-05` | Phòng học trống Đ-05 | Empty Classroom Đ-05 |

### TẦNG 5 · Nam · Lối đi tầng bốn và gian trống

`hogwarts/f7/2` · castle · ACTIVE · layout: `ell`

W4: Fourth-Floor Walk & Mirror / F5 (TẦNG 5) / S Fourth-Floor Walk & Mirror

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG5-S-01` | Phòng trống từng chứa Gương Ảo ảnh năm 1991 | Former 1991 Mirror of Erised Room |
| `HOG-TNG5-S-02` | Hành lang gương thông lối bí mật cũ | Old Secret Mirror Corridor |
| `HOG-TNG5-S-03` | Phòng lưu hồ sơ thư viện | Library Records Archive |
| `HOG-TNG5-S-04` | Phòng học trống N-05 | Empty Classroom N-05 |
| `HOG-TNG5-S-05` | Kho vật dụng sảnh đọc | Reading Room Store |
| `HOG-TNG3-W-01` | Cầu thang tắt sau thảm treo | Tapestry Shortcut Stair |

### TẦNG 5 · Tây · Cổ ngữ – học thuật

`hogwarts/f7/3` · castle · ACTIVE · layout: `tee`

W4: Ancient Runes / F5 (TẦNG 5) / W Ancient Runes

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG5-W-01` | Phòng học Cổ ngữ Runes | Ancient Runes Classroom |
| `HOG-TNG5-W-02` | Phòng dịch cổ ngữ | Runes Translation Room |
| `HOG-TNG5-W-03` | Phòng học chuyên đề lịch sử | History Seminar Room |
| `HOG-TNG5-W-04` | Phòng nghiên cứu tư liệu | Source Research Room |
| `HOG-TNG5-W-05` | Phòng học trống T-05 | Empty Classroom T-05 |

### TẦNG 6 · Bắc · Prefects corridor – Faculty route

`hogwarts/f8/0` · castle · ACTIVE · layout: `ell`

W4: Prefects–Faculty Route / F6 (TẦNG 6) / N Prefects–Faculty Route

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG6-N-01` | Phòng tắm Huynh trưởng | Prefects' Bathroom |
| `HOG-TNG6-N-02` | Hành lang trước Phòng tắm Huynh trưởng | Prefects' Bathroom Corridor |
| `HOG-TNG6-N-03` | Hành lang Tháp Giáo viên tầng trên | Upper Faculty Tower Corridor |
| `HOG-TNG6-N-04` | Phòng nghỉ huynh trưởng | Prefects' Lounge |
| `HOG-TNG6-N-05` | Kho khăn và đồng phục | Towel/Uniform Store |
| `HOG-TNG6-N-06` | Phòng học trống B-06 | Empty Classroom B-06 |

### TẦNG 6 · Đông · Phòng học trung cấp

`hogwarts/f8/1` · castle · ACTIVE · layout: `horizontal`

W4: Intermediate Classes / F6 (TẦNG 6) / E Intermediate Classes

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG6-E-01` | Phòng nghiên cứu Số học | Arithmancy Research Room |
| `HOG-TNG6-E-02` | Hành lang cánh Đông tầng năm | "Fifth-Floor" East Wing Corridor |
| `HOG-TNG6-E-03` | Phòng mỹ thuật pháp thuật | Magical Art Room |
| `HOG-TNG6-E-04` | Kho bài tập và bảng phép | Assignment/Chart Store |
| `HOG-TNG6-E-05` | Phòng học trống Đ-06 | Empty Classroom Đ-06 |

### TẦNG 6 · Nam · Lối lên Tháp Đồng hồ

`hogwarts/f8/2` · castle · ACTIVE · layout: `curved`

W4: Clock Tower Ascent / F6 (TẦNG 6) / S Clock Tower Ascent

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG6-S-01` | Hành lang Tháp Đồng hồ tầng cao | Upper Clock Tower Corridor |
| `HOG-TNG6-S-03` | Phòng câu lạc bộ học thuật | Academic Club Room |
| `HOG-TNG6-S-04` | Phòng làm báo học sinh | Student Newspaper Room |
| `HOG-TNG6-S-05` | Kho thiết bị triển lãm | Exhibit Gear Store |

→ `TWR-06-02-02` — Tháp Đồng hồ (bảo trì cơ cấu)

### TẦNG 6 · Tây · Hành lang cửa sổ cao

`hogwarts/f8/3` · castle · ACTIVE · layout: `windows`

W4: West High Windows / F6 (TẦNG 6) / W West High Windows

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG6-W-01` | Hành lang cửa sổ phía Tây tầng năm | "Fifth-Floor" West Window Corridor |
| `HOG-TNG6-W-02` | Phòng tập nhạc nhóm nhỏ | Small Ensemble Room |
| `HOG-TNG6-W-03` | Phòng đọc yên tĩnh | Quiet Reading Room |
| `HOG-TNG6-W-04` | Phòng học trống T-06 | Empty Classroom T-06 |
| `HOG-TNG6-W-05` | Kho đồ thủ công | Craft Supply Store |

### TẦNG 7 · Bắc · Upper stair – tower access

`hogwarts/f9/0` · castle · ACTIVE · layout: `vertical`

W4: Upper Stair Access / F7 (TẦNG 7) / N Upper Stair Access

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG7-N-01` | Phòng lưu bảng thành tích học thuật | Academic Achievement Archive |
| `HOG-TNG7-N-02` | Phòng lưu sổ kết quả học tập | Grade Ledger Archive |
| `HOG-TNG7-N-03` | Kho thiết bị tiết học nâng cao | Advanced Lesson Gear Store |
| `HOG-TNG7-N-04` | Phòng học trống B-07 | Empty Classroom B-07 |
| `HOG-TNG7-N-05` | Hành lang cầu thang phía Bắc | North Stair Corridor |

### TẦNG 7 · Đông · Seminar & advanced teaching

`hogwarts/f9/1` · castle · ACTIVE · layout: `cross`

W4: Seminar & Labs / F7 (TẦNG 7) / E Seminar & Labs

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG7-E-01` | Nhà vệ sinh nam tầng sáu | "Sixth-Floor" Boys' Bathroom |
| `HOG-TNG7-E-02` | Phòng học chuyên đề Phép thuật nâng cao | Advanced Magic Seminar Room |
| `HOG-TNG7-E-03` | Phòng hội thảo nhỏ | Small Colloquium Room |
| `HOG-TNG7-E-04` | Phòng thí nghiệm an toàn | Safe Lab |
| `HOG-TNG7-E-05` | Phòng học trống Đ-07 | Empty Classroom Đ-07 |

### TẦNG 7 · Nam · Đường nối Faculty/Clock tower

`hogwarts/f9/2` · castle · ACTIVE · layout: `ell`

W4: Faculty/Clock Link / F7 (TẦNG 7) / S Faculty/Clock Link

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG7-S-01` | Hành lang phía trên Tháp Giáo viên | Upper Faculty Tower Corridor |
| `HOG-TNG7-S-02` | Phòng lưu biên bản giáo viên | Staff Minutes Archive |
| `HOG-TNG7-S-03` | Phòng xem lịch học | Timetable Room |
| `HOG-TNG7-S-04` | Kho sách tham khảo | Reference Book Store |
| `HOG-TNG7-S-05` | Phòng học trống N-07 | Empty Classroom N-07 |

### TẦNG 7 · Tây · Cụm sinh hoạt và trò chơi

`hogwarts/f9/3` · castle · ACTIVE · layout: `windows`

W4: Games & Projects / F7 (TẦNG 7) / W Games & Projects

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG7-W-01` | Phòng Gobstones | Gobstones Room |
| `HOG-TNG7-W-02` | Phòng câu lạc bộ cờ phù thủy | Wizard's Chess Club Room |
| `HOG-TNG7-W-03` | Phòng làm dự án học sinh | Student Project Room |
| `HOG-TNG7-W-04` | Phòng học trống T-07 | Empty Classroom T-07 |
| `HOG-TNG7-W-05` | Hành lang kính tầng cao | High Glass Corridor |

### TẦNG 8 · Bắc · Upper Grand Staircase / Headmaster

`hogwarts/f10/0` · castle · ACTIVE · layout: `tower`

W4: Headmaster Approach / F8 (TẦNG 8) / N Headmaster Approach

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG8-N-01` | Hành lang dẫn lên văn phòng Hiệu trưởng | Headmaster's Office Approach Corridor |
| `HOG-TNG8-N-02` | Sảnh vào văn phòng Hiệu trưởng | Headmaster's Entrance Hall |
| `HOG-TNG8-N-03` | Sảnh tầng cao Cầu thang Lớn (Sảnh cao Cầu thang Lớn) | Sảnh tầng cao Cầu thang Lớn; Sảnh cao Cầu thang Lớn; Upper Grand Staircase Hall |
| `HOG-TNG8-N-04` | Phòng học trống B-08 | Empty Classroom B-08 |
| `HOG-TNG8-N-05` | Kho giấy tờ giáo vụ | Academic Records Store |

### TẦNG 8 · Đông · Room of Requirement

`hogwarts/f10/1` · castle · ACTIVE · layout: `horizontal`

W4: Room of Requirement / F8 (TẦNG 8) / E Room of Requirement

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG8-E-01` | Hành lang tầng bảy trước Phòng Yêu cầu | "Seventh-Floor" Corridor outside RoR |
| `HOG-TNG8-E-02` | Phòng Yêu cầu (Room of Requirement) | Room of Requirement |
| `HOG-TNG8-E-03` | Phòng học trống Đ-08 | Empty Classroom Đ-08 |
| `HOG-TNG8-E-04` | Phòng nghi lễ học thuật | Academic Ceremony Room |
| `HOG-TNG8-E-05` | Phòng bảo quản tranh phép | Portrait Conservation Room |

### TẦNG 8 · Nam · Gryffindor entrance – common route

`hogwarts/f10/2` · castle · ACTIVE · layout: `curved`

W4: Gryffindor Route / F8 (TẦNG 8) / S Gryffindor Route

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG8-S-04` | Phòng học nhóm tầng bảy | "Seventh-Floor" Study Group Room |
| `HOG-TNG8-S-05` | Hành lang tranh tầng bảy | "Seventh-Floor" Portrait Corridor |

→ `template:gryffindor-common` — gryffindor-common

### TẦNG 8 · Tây · CCC / senior clubs (AU)

`hogwarts/f10/3` · castle · ACTIVE · layout: `tee`

W4: Senior Clubs / CCC / F8 (TẦNG 8) / W Senior Clubs / CCC

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG8-W-07` | Phòng học trống T-08 | Empty Classroom T-08 |

→ `au/6/0` — AU › CCC 07.18

### Tháp Gryffindor · Tây Nam · Lối tiếp cận

`tower/0/0` · tower · ACTIVE · layout: `tower`

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:gryffindor-common` — gryffindor-common

### Tháp Ravenclaw · Tây · Lối tiếp cận

`tower/1/0` · tower · ACTIVE · layout: `tower`

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:ravenclaw-common` — ravenclaw-common

### Tháp Bắc (Tiên tri) · Bắc · Tầng tiếp cận

`tower/2/0` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-03-01-01` | Cầu thang xoắn lên Tháp Bắc |  |
| `TWR-03-01-02` | Phòng lưu bản đồ sao Tiên tri |  |

### Tháp Bắc (Tiên tri) · Bắc · Đỉnh tháp

`tower/2/1` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-03-02-01` | Phòng học Tiên tri |  |
| `TWR-03-02-02` | Kho dụng cụ bói toán |  |

### Tháp Thiên văn · Tây Bắc · Tầng chân

`tower/3/0` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-04-01-01` | Hành lang chân Tháp Thiên văn |  |
| `TWR-04-01-02` | Phòng bảo trì kính thiên văn |  |

### Tháp Thiên văn · Tây Bắc · Tầng giữa

`tower/3/1` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-04-02-01` | Phòng chuẩn bị quan sát |  |
| `TWR-04-02-02` | Kho bản đồ sao |  |

### Tháp Thiên văn · Tây Bắc · Đỉnh

`tower/3/2` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-04-03-01` | Phòng học Thiên văn |  |
| `TWR-04-03-02` | Đài quan sát Thiên văn |  |

### Tháp Hiệu trưởng · Bắc / Trung tâm · Tầng cửa vào

`tower/4/0` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-05-01-01` | Cầu thang xoắn sau tượng đá |  |
| `TWR-05-01-02` | Phòng chờ văn phòng Hiệu trưởng |  |

### Tháp Hiệu trưởng · Bắc / Trung tâm · Đỉnh

`tower/4/1` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-05-02-01` | Văn phòng Hiệu trưởng |  |
| `TWR-05-02-02` | Phòng lưu dụng cụ hiệu trưởng |  |
| `TWR-05-02-03` | Kho tài liệu Hiệu trưởng |  |

### Tháp Đồng hồ · Tây Nam · Chân tháp

`tower/5/0` · tower · ACTIVE · layout: `curved`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-06-01-01` | Sảnh Tháp Đồng hồ |  |
| `TWR-06-01-02` | Phòng trực giờ giấc |  |

### Tháp Đồng hồ · Tây Nam · Giữa tháp

`tower/5/1` · tower · ACTIVE · layout: `curved`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-06-02-01` | Gian cơ cấu bánh răng |  |
| `TWR-06-02-02` | Phòng bảo trì đồng hồ / cơ cấu đồng hồ | Phòng bảo trì đồng hồ; Phòng bảo trì cơ cấu đồng hồ |

### Tháp Đồng hồ · Tây Nam · Đỉnh

`tower/5/2` · tower · ACTIVE · layout: `curved`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-06-03-01` | Buồng quả lắc lớn |  |
| `TWR-06-03-02` | Buồng kiểm tra chuông giờ |  |

### Tháp Chuông · Bắc · Chân tháp

`tower/6/0` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-07-01-02` | Phòng giữ dụng cụ chuông |  |

### Tháp Chuông · Bắc · Đỉnh

`tower/6/1` · tower · ACTIVE · layout: `tower`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-07-02-01` | Đài treo chuông |  |
| `TWR-07-02-02` | Phòng vận hành chuông |  |

### Tháp Giáo viên (Faculty Tower) · Nam · Tầng tiếp cận

`tower/7/0` · tower · ACTIVE · layout: `windows`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-08-01-01` | Lối vào Faculty Tower |  |
| `TWR-08-01-02` | Phòng trực nhân viên |  |

### Tháp Giáo viên (Faculty Tower) · Nam · Tầng giữa

`tower/7/1` · tower · ACTIVE · layout: `windows`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-08-02-01` | Hành lang các phòng giáo viên |  |
| `TWR-08-02-02` | Phòng nghỉ giáo viên |  |

### Tháp Giáo viên (Faculty Tower) · Nam · Tầng trên

`tower/7/2` · tower · ACTIVE · layout: `windows`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-08-03-01` | Hành lang nối bệnh xá |  |
| `TWR-08-03-02` | Phòng họp giảng viên kín |  |

### Tháp DADA · Đông · Chân tháp

`tower/8/0` · tower · ACTIVE · layout: `tee`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-09-01-01` | Sảnh chân Tháp DADA |  |

→ `hogwarts/f4/3` — Tầng 2 · Tây (phòng học & kho đạo cụ)

### Tháp DADA · Đông · Tầng giảng dạy

`tower/8/1` · tower · ACTIVE · layout: `tee`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-09-02-02` | Phòng tập đũa phép tại tháp |  |

→ `hogwarts/f4/3` — Tầng 2 · Tây

### Tháp DADA · Đông · Tầng trên

`tower/8/2` · tower · ACTIVE · layout: `tee`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-09-03-01` | Hành lang Tháp DADA tầng cao |  |
| `TWR-09-03-02` | Phòng làm việc bổ trợ DADA |  |

### Tháp Cầu thang Lớn · Trung tâm · Chân tháp

`tower/9/0` · tower · ACTIVE · layout: `cross`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-10-01-01` | Cầu thang Lớn |  |
| `TWR-10-01-02` | Buồng kiểm tra cầu thang |  |

### Tháp Cầu thang Lớn · Trung tâm · Lưng chừng

`tower/9/1` · tower · ACTIVE · layout: `cross`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-10-02-01` | Hành lang tranh nối Cầu thang Lớn |  |
| `TWR-10-02-02` | Phòng trực hành lang giữa tầng |  |

### Tháp Cầu thang Lớn · Trung tâm · Đỉnh

`tower/9/2` · tower · ACTIVE · layout: `cross`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `TWR-10-03-02` | Kho bảng hướng dẫn lớp |  |

→ `hogwarts/f10/0` — Tầng 8 · Bắc (sảnh cao Cầu thang Lớn)

### Tháp Tây (Nhà cú) · Tây · Lối tiếp cận

`tower/10/0` · tower · ACTIVE · layout: `tower`

Nhóm điều hướng; không tạo bản ghi phòng trùng.

→ `template:h1` — h1 (không lập Nhà cú lần hai)

### 7 Rowan Mews · London · Bán hầm

`au/0/0` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-c986bd14a65aff` | Bếp |  |
| `P-f63320e3ce02f8` | Pantry |  |
| `P-05cf8a6d391ae0` | Laundry |  |
| `P-6101b5e9235dbd` | Kho |  |

### 7 Rowan Mews · London · Tầng 1 (trệt)

`au/0/1` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-d5c52789ba1582` | Sảnh |  |
| `P-a40a9139e15cdf` | Phòng khách |  |
| `P-1d43d774de1087` | Phòng ăn |  |
| `P-36a9268e0e2288` | Phòng vườn |  |
| `P-1802311f93c216` | Sân trong |  |
| `P-3c919f6f95c429` | Phòng áo khoác |  |

### 7 Rowan Mews · London · Tầng 2

`au/0/2` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-3bf90655eabf0a` | Thư viện |  |
| `P-ad5ac899e9989d` | Study Valerian |  |
| `P-2e95be7ac27f5e` | Study Amethyst |  |
| `P-86f19e61932103` | Phòng tiếp khách |  |

### 7 Rowan Mews · London · Tầng 3

`au/0/3` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-e51ad92343c8de` | Master suite |  |
| `P-558513338bec03` | Phòng Liad |  |
| `P-4ccd67d1317f71` | Phòng khách ngủ |  |
| `P-572439c7221fb9` | Phòng tắm |  |

### 7 Rowan Mews · London · Áp mái

`au/0/4` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-2ae3745c48f04a` | Kho gia đình |  |

### WzW House · 18 Ganton Street · Soho · Tầng hầm

`au/1/0` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-836c31b9c17543` | Kho lưu trữ bản in |  |
| `P-579062ef9135bd` | Kho giấy |  |
| `P-47e13519fc6e78` | Kho mẫu |  |
| `P-c48031b40aa4a6` | Phòng thiết bị |  |

### WzW House · 18 Ganton Street · Soho · Tầng 1 (trệt)

`au/1/1` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-0f0f21af1613e3` | Sảnh tiếp tân |  |
| `P-2e483807e1273e` | Phòng trưng bày |  |
| `P-cbf1bbfe09504a` | Phòng tiếp khách |  |
| `P-f1273cfbd8dcc9` | Phòng giao nhận |  |

### WzW House · 18 Ganton Street · Soho · Tầng 2

`au/1/2` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-c6d06746fedb75` | Phòng biên tập |  |
| `P-cc6eda155ffa84` | Phòng họp |  |
| `P-35150c109c52c8` | Phòng viết nội dung |  |

### WzW House · 18 Ganton Street · Soho · Tầng 3

`au/1/3` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-056435e23f0696` | Studio ảnh |  |
| `P-eeef4f392301fb` | Phòng tạo kiểu |  |
| `P-7146cc78e7b6bb` | Phòng thay đồ |  |
| `P-ceed22a8b82bc0` | Phòng mẫu |  |

### WzW House · 18 Ganton Street · Soho · Tầng 4

`au/1/4` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-e7944584d870f6` | Studio sáng tạo |  |
| `P-b61993cdbfa4f0` | Phòng duyệt bản in |  |

### WzW House · 18 Ganton Street · Soho · Tầng mái

`au/1/5` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-f76c14a8f564e2` | Bếp nhỏ |  |
| `P-f11d32df681cb8` | Thư viện ấn phẩm |  |
| `P-45ca006de2e29d` | Sân thượng |  |

### Loft 5A · 21 Great Titchfield Street · Fitzrovia · Sảnh chung

`au/2/0` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-d1e5c9e5641c72` | Sảnh chung |  |

### Loft 5A · 21 Great Titchfield Street · Fitzrovia · Loft 5A

`au/2/1` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-d62f3f91b273a7` | Phòng khách & bếp |  |
| `P-2943e215e1b645` | Studio sáng tạo |  |
| `P-7fab1a6c46fde1` | Phòng ngủ |  |
| `P-85d4eac574abfb` | Phòng thay đồ |  |
| `P-6748bf2a512b32` | Phòng tiện ích |  |

### Whitecap Estate · Isle of Wight · Khuôn viên

`au/3/0` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-6622d43a61e262` | Biệt thự Whitecap |  |
| `P-dfec655aa06ffb` | Vườn |  |
| `P-91e1d4b9d90ce6` | Hồ bơi |  |
| `P-fb05960b29389c` | Bãi biển Whitecap |  |
| `P-35450f7ad71727` | Nhà khách |  |
| `P-fafa275e3442de` | Chuồng gia cầm |  |

### Whitecap Estate · Isle of Wight · Tầng 1 (trệt)

`au/3/1` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-704560d7aaa0f1` | Tiền sảnh |  |
| `P-4f927c3f8e69d3` | Phòng khách |  |
| `P-052c1a401bbcfe` | Phòng ăn |  |
| `P-79d20dbdcafbc7` | Thư viện |  |
| `P-62939be1327ef1` | Phòng D&D |  |
| `P-17b225b47b5160` | Bếp |  |
| `P-ca5dbc8d9268d5` | Hiên ngoài |  |
| `P-819514c84e1a30` | Phòng kính |  |

### Whitecap Estate · Isle of Wight · Tầng 2

`au/3/2` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-838b8e1603bb66` | Phòng ngủ gia đình |  |
| `P-51deeb2c56d244` | Phòng khách ngủ |  |
| `P-c2ae860eb1abb4` | Phòng sinh hoạt |  |
| `P-e320c112ea6a38` | Ban công |  |

### Whitecap Estate · Isle of Wight · Áp mái

`au/3/3` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-04c058ca77c028` | Phòng áp mái |  |
| `P-cd916ab4eeb2b0` | Kho dưới mái |  |
| `P-c2b0b9eb3b7897` | Phòng sở thích |  |

### Whitecap Estate · Isle of Wight · Bờ biển Whitecap

`au/3/4` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-6f010e23dbcf13` | Bến Whitecap |  |

### Grayhaven Estate · California · Khuôn viên

`au/4/0` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-28f1e32ca3f09f` | Biệt thự Grayhaven |  |
| `P-aae6653add136e` | Nhà khách |  |
| `P-fbcb3e25adb914` | Vườn |  |
| `P-f5b0d79a9fcc91` | Sân hồ bơi |  |
| `P-18b19a8c7825cf` | Studio nhà kính |  |

### Grayhaven Estate · California · Tầng 1 (trệt)

`au/4/1` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-fd29682932d8c0` | Tiền sảnh |  |
| `P-f257da4f8369a2` | Phòng khách |  |
| `P-26295c3fd155a4` | Phòng ăn |  |
| `P-0afb8b38025951` | Bếp gia đình |  |
| `P-0cf87e2f9d3027` | Phòng làm việc |  |
| `P-8547e7b53ee0e6` | Phòng sinh hoạt hướng vườn |  |
| `P-38afa9168985ae` | Phòng kính |  |

### Grayhaven Estate · California · Tầng 2

`au/4/2` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-fb55d3d6b976e4` | Phòng gia đình |  |
| `P-120f81b5d30c37` | Phòng khách ngủ |  |
| `P-cad4970480cc75` | Phòng đọc |  |

### Grayhaven Estate · California · Nhà khách

`au/4/3` · au · LOCKED / UNBUILT · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-aff4fe8ba8b10c` | Phòng khách & bếp |  |
| `P-239cfed7a31957` | Phòng ngủ phía đông |  |
| `P-9ce0d6987c6167` | Phòng ngủ phía tây |  |
| `P-aae0e4c8ac4172` | Terrace |  |

### Nhà PC · London · Bán hầm

`au/5/0` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-84e3b35dd330b5` | Phòng tiện ích |  |
| `P-b64b4fd825a7ea` | Phòng giặt |  |
| `P-5e88541888baad` | Kho |  |
| `P-ad08891d59bb8b` | Phòng sửa đồ |  |

### Nhà PC · London · Tầng 1 (trệt)

`au/5/1` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-b2554d6b1381cd` | Tiền sảnh |  |
| `P-8f34772df41a97` | Phòng khách |  |
| `P-7210700596d5ae` | Phòng ăn |  |
| `P-78ec748eb7b9ce` | Bếp |  |
| `P-176df525d65b31` | Hiên sau |  |
| `P-6acb59a2cd0cf1` | Vườn sau |  |

### Nhà PC · London · Tầng 2

`au/5/2` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-cadd273181369d` | Phòng ngủ chính |  |
| `P-56dbab3b62a960` | Phòng làm việc |  |
| `P-866203855d3998` | Phòng tắm |  |

### Nhà PC · London · Tầng 3

`au/5/3` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-7a95ade5b09943` | Phòng BẠN |  |
| `P-f67fdab0b798c6` | Phòng khách ngủ |  |

### Nhà PC · London · Áp mái

`au/5/4` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-9d66d64ae1eced` | Phòng sở thích |  |
| `P-aafb6b5cc0a4c6` | Kho dưới mái |  |

### CCC 07.18 · Hogwarts · Tầng 8 · cánh Tây

`au/6/0` · au · ACTIVE · layout: `tee`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `HOG-TNG8-W-02` | Tiền phòng CCC |  |
| `HOG-TNG8-W-03` | Phòng thư liên nhà CCC |  |
| `HOG-TNG8-W-04` | Phòng viết CCC |  |
| `HOG-TNG8-W-05` | Kho hồ sơ CCC |  |
| `HOG-TNG8-W-06` | Phòng họp liên nhà |  |

### Liad’s Attic · Hogwarts · Áp mái

`au/7/0` · au · ACTIVE · layout: `auto`

| ID | Tên chuẩn | Tên tiếng Anh / alias |
| --- | --- | --- |
| `P-0b2a64c33ccc84` | Phòng áp mái Liad |  |

