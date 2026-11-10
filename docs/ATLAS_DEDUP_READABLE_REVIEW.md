# WIZAMAP · ATLAS ĐÃ LỌC TRÙNG & TRÌNH BÀY LẠI (BẢN REVIEW)
 
> **Mục đích:** Chỉ rà soát trùng lặp và trình bày lại dữ liệu atlas cho dễ tra cứu. **KHÔNG gộp Bắc/Đông/Nam/Tây**, không chuyển phòng giữa khu, không sửa corridor preset, không sửa chức năng, tên, ID, template, khóa AU hay engine. Đây là **bản Markdown xem xét**, không phải hợp đồng runtime hoặc bản sửa atlas JSON.
>
> **Nguồn:** `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json` và `runtime/atlas-index.json`, nhánh `demo-2` tại thời điểm xuất. Các dòng bảng sao chép theo ID chuẩn từ atlas.  
> **Nguyên tắc hành lang:** PC ở nhóm `hogwarts/f1/0` (Hầm ngục Bắc) → lấy các phòng của **đúng nhóm Bắc** để dựng hành lang. Không tự thêm Đông/Nam/Tây.

## 1. Tổng quan / Kết quả lọc

| Chỉ tiêu | Kết quả |
|---|---:|
| Tham chiếu trong atlas trước tối ưu | 747 |
| Địa điểm chuẩn có ID duy nhất | 726 |
| Alias bản ghi trùng đã gộp ở atlas nguồn | 21 |
| Alias cũ giữ để đối chiếu | 21 |
| Nhóm trùng tên cần giữ riêng vì khác địa điểm | 19 nhóm / 47 địa điểm |
| Địa điểm tham chiếu ở nhiều nhóm ngữ cảnh | 5 (CCC trên tầng 8) |
| Địa điểm ngoài các nhóm Castle/Tower/AU/World hiện hữu | 194 |
| Gộp trùng *bổ sung* khi chưa đủ bằng chứng cùng phòng | **0** |

**Kết luận lọc trùng:** 21 alias của cùng địa điểm đã được chuẩn hóa trong nguồn; 726 ID chuẩn không có ID trùng. Những trường hợp cùng tên nhưng ở các nhà/khu khác nhau **không phải trùng địa điểm**. Không xóa hoặc hợp nhất thêm khi chưa có bằng chứng.

### Quy tắc sử dụng và giới hạn

- **Khu lâu đài:** giữ **44 nhóm theo 11 tầng × 4 hướng**, mỗi nhóm là đơn vị phạm vi bản đồ độc lập (`scopeId` theo atlas runtime).
- **Tháp:** giữ tầng tháp con bên trong đúng tháp; không gộp giữa tầng.
- **World/AU:** giữ đường dẫn khu và tầng vốn có; không nhập địa điểm khác nhau chỉ vì trùng tên.
- **Template:** danh sách thuộc template là **tham chiếu**, không phải bản sao của phòng.
- **Corridor preset:** giữ nguyên JSON `layout`, `corridorPlaceIds` và nhãn `source: illustrative`. Đây chỉ là gợi ý bố cục, **không tự chứng minh kết nối canon**.
- **AU:** giữ nguyên `buildEnabled` và `buildablePlaceIds`, đặc biệt CCC chỉ được xây phòng đã mở.
- **Information Gate:** đây là chỉ mục tĩnh; không phải giấy phép hiển thị toàn bộ khu vực hay các bí mật RP.

## 2. Hogwarts — 44 nhóm theo tầng, GIỮ Bắc / Đông / Nam / Tây

### 2.1. HẦM NGẦM


#### Bắc — Đường dẫn hầm kỹ thuật (4 địa điểm)

- **`scopeId`:** `hogwarts/f0/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"vertical","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-HMNGM-N-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGM-N-01` | Hành lang đá dưới Tháp Thiên văn | `circulation` | — | — |
| `HOG-HMNGM-N-02` | Phòng Giả kim | `other` | — | — |
| `HOG-HMNGM-N-03` | Kho than và nhiên liệu | `storage` | — | — |
| `HOG-HMNGM-N-04` | Phòng kiểm tra móng tháp | `other` | — | — |


#### Đông — Hầm di tích và cửa sâu (4 địa điểm)

- **`scopeId`:** `hogwarts/f0/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-HMNGM-E-04"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGM-E-01` | Đường ống xuống Phòng Chứa Bí mật | `other` | — | — |
| `HOG-HMNGM-E-02` | Phòng Chứa Bí mật | `other` | — | — |
| `HOG-HMNGM-E-03` | Gian cửa chắn hầm cổ | `other` | — | — |
| `HOG-HMNGM-E-04` | Hành lang dẫn đến hầm bị niêm phong | `circulation` | — | — |


#### Nam — Cụm hầm đá bảo vệ cũ (5 địa điểm)

- **`scopeId`:** `hogwarts/f0/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGM-S-01` | Gian Dây Sa-tăng | `other` | — | — |
| `HOG-HMNGM-S-02` | Gian chìa khóa bay | `other` | — | — |
| `HOG-HMNGM-S-03` | Gian bàn cờ phù thủy | `other` | — | — |
| `HOG-HMNGM-S-04` | Gian thử thách Độc dược | `other` | — | — |
| `HOG-HMNGM-S-05` | Gian cuối bảo vệ Hòn đá | `other` | — | — |


#### Tây — Hầm đá xưa và phòng nghiên cứu (4 địa điểm)

- **`scopeId`:** `hogwarts/f0/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGM-W-01` | Map Chamber | `other` | — | — |
| `HOG-HMNGM-W-02` | Undercroft | `other` | — | — |
| `HOG-HMNGM-W-03` | Kho dụng cụ khảo cổ | `storage` | — | — |
| `HOG-HMNGM-W-04` | Phòng lập bản vẽ công trình | `circulation` | — | — |


### 2.2. HẦM NGỤC


#### Bắc — Cụm Độc dược và gian chuẩn bị (5 địa điểm)

- **`scopeId`:** `hogwarts/f1/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGC-N-01` | Phòng học Độc dược | `study` | — | — |
| `HOG-HMNGC-N-02` | Văn phòng Snape | `administration` | — | — |
| `HOG-HMNGC-N-03` | Kho nguyên liệu Độc dược | `storage` | — | — |
| `HOG-HMNGC-N-04` | Phòng chuẩn bị bài thực hành | `study` | — | — |
| `HOG-HMNGC-N-05` | Phòng rửa vạc | `other` | — | — |


#### Đông — Lối Slytherin dưới mặt hồ (5 địa điểm)

- **`scopeId`:** `hogwarts/f1/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"vertical","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-HMNGC-E-04"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-80ce1ea13c2632` | Phòng sinh hoạt chung Slytherin | `other` | `slytherin-common` | `HOG-HMNGC-E-01` |
| `P-6b050b321ff558` | Ký túc nam Slytherin | `residential` | `slytherin-common` | `HOG-HMNGC-E-02` |
| `P-a6425ebd843fab` | Ký túc nữ Slytherin | `residential` | `slytherin-common` | `HOG-HMNGC-E-03` |
| `HOG-HMNGC-E-04` | Hành lang Slytherin dưới hồ | `circulation` | — | — |
| `HOG-HMNGC-E-05` | Phòng học nhóm Slytherin | `study` | — | — |


#### Nam — Kho và tuyến phục vụ dưới Đại Sảnh (5 địa điểm)

- **`scopeId`:** `hogwarts/f1/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-HMNGC-S-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGC-S-01` | Phòng tiệc Tử nhật | `other` | — | — |
| `HOG-HMNGC-S-02` | Kho vật tư lau dọn | `storage` | — | — |
| `HOG-HMNGC-S-03` | Hành lang vận chuyển thực phẩm | `circulation` | — | — |
| `HOG-HMNGC-S-04` | Phòng trực gia tinh | `administration` | — | — |
| `HOG-HMNGC-S-05` | Phòng kỹ thuật lò sưởi | `other` | — | — |


#### Tây — Cụm lớp học ngầm và hầm cũ (5 địa điểm)

- **`scopeId`:** `hogwarts/f1/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-HMNGC-W-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-HMNGC-W-01` | Hành lang hầm Tháp Thiên văn | `circulation` | — | — |
| `HOG-HMNGC-W-02` | Phòng phân loại mẫu khoáng | `other` | — | — |
| `HOG-HMNGC-W-03` | Phòng học trống HN-01 | `study` | — | — |
| `HOG-HMNGC-W-04` | Kho nồi vạc cũ | `storage` | — | — |
| `HOG-HMNGC-W-05` | Phòng lưu mẫu độc dược | `storage` | — | — |


### 2.3. TẦNG BẾP


#### Bắc — Bếp và lối phục vụ (5 địa điểm)

- **`scopeId`:** `hogwarts/f2/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNGBP-N-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNGBP-N-01` | Bếp Hogwarts | `service` | — | — |
| `HOG-TNGBP-N-02` | Kho thực phẩm khô | `storage` | — | — |
| `HOG-TNGBP-N-03` | Phòng chuẩn bị suất ăn | `other` | — | — |
| `HOG-TNGBP-N-04` | Phòng rửa dụng cụ nhà bếp | `service` | — | — |
| `HOG-TNGBP-N-05` | Hành lang hậu cần bếp | `circulation` | — | — |


#### Đông — Cụm Hufflepuff (5 địa điểm)

- **`scopeId`:** `hogwarts/f2/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNGBP-E-04"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-1795bc600c2b41` | Phòng sinh hoạt chung Hufflepuff | `other` | `hufflepuff-common` | `HOG-TNGBP-E-01` |
| `P-ebceb992eb9255` | Ký túc nam Hufflepuff | `residential` | `hufflepuff-common` | `HOG-TNGBP-E-02` |
| `P-b4314de4234c88` | Ký túc nữ Hufflepuff | `residential` | `hufflepuff-common` | `HOG-TNGBP-E-03` |
| `HOG-TNGBP-E-04` | Hành lang Hufflepuff | `circulation` | — | — |
| `HOG-TNGBP-E-05` | Phòng học nhóm Hufflepuff | `study` | — | — |


#### Nam — Giặt là và kho phục vụ (5 địa điểm)

- **`scopeId`:** `hogwarts/f2/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNGBP-S-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNGBP-S-01` | Phòng giặt là | `service` | — | — |
| `HOG-TNGBP-S-02` | Phòng đồ vải | `other` | — | — |
| `HOG-TNGBP-S-03` | Kho khăn trải bàn | `storage` | — | — |
| `HOG-TNGBP-S-04` | Phòng bảo trì dụng cụ giặt | `service` | — | — |
| `HOG-TNGBP-S-05` | Hành lang kho phía Nam | `circulation` | — | — |


#### Tây — Khu công vụ và hầm thực phẩm (5 địa điểm)

- **`scopeId`:** `hogwarts/f2/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNGBP-W-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNGBP-W-01` | Phòng nghỉ gia tinh | `other` | — | — |
| `HOG-TNGBP-W-02` | Kho rau củ | `storage` | — | — |
| `HOG-TNGBP-W-03` | Kho thảo mộc nhà bếp | `storage` | — | — |
| `HOG-TNGBP-W-04` | Kho dụng cụ dự phòng | `storage` | — | — |
| `HOG-TNGBP-W-05` | Hành lang kết nối hầm phía Tây | `circulation` | — | — |


### 2.4. TẦNG 1


#### Bắc — North Hall – Bell Tower (6 địa điểm)

- **`scopeId`:** `hogwarts/f3/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"tee","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG1-N-01","HOG-TNG1-N-02","HOG-TNG1-N-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG1-N-01` | Sảnh phía Bắc (North Hall) | `circulation` | — | — |
| `HOG-TNG1-N-02` | Sảnh chân Tháp Chuông | `circulation` | — | — |
| `HOG-TNG1-N-03` | Hành lang tới cửa Bắc Hogwarts | `circulation` | — | — |
| `HOG-TNG1-N-04` | Phòng trực cửa Bắc | `administration` | — | — |
| `HOG-TNG1-N-05` | Kho đồ dùng sân tập | `storage` | — | — |
| `HOG-TNG1-N-06` | Phòng học trống B-01 | `study` | — | — |


#### Đông — Library Annex – Viaduct (6 địa điểm)

- **`scopeId`:** `hogwarts/f3/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"cross","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG1-E-01","HOG-TNG1-E-02","HOG-TNG1-E-03","HOG-TNG1-E-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG1-E-01` | Sảnh Trung tâm (Central Hall) | `circulation` | — | — |
| `HOG-TNG1-E-02` | Sảnh lối vào Cầu cạn (Viaduct Entrance) | `circulation` | — | — |
| `HOG-TNG1-E-03` | Hành lang nối khu nhà kính | `circulation` | — | — |
| `HOG-TNG1-E-04` | Phòng tiếp học sinh mới | `other` | — | — |
| `HOG-TNG1-E-05` | Kho dụng cụ sảnh Trung tâm | `circulation` | — | — |
| `HOG-TNG1-E-06` | Phòng học trống Đ-01 | `study` | — | — |


#### Nam — Entrance Hall – Great Hall (7 địa điểm)

- **`scopeId`:** `hogwarts/f3/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG1-S-01","HOG-TNG1-S-02","P-ce57067fcd107f"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG1-S-01` | Tiền sảnh (Entrance Hall) | `circulation` | — | — |
| `HOG-TNG1-S-02` | Đại Sảnh (Great Hall) | `circulation` | `hall` | `P-bd27aa15491ba5` |
| `HOG-TNG1-S-03` | Phòng chờ trước Phân loại | `common` | — | — |
| `P-ce57067fcd107f` | Phòng nhỏ cạnh Đại Sảnh | `circulation` | `hall` | `HOG-TNG1-S-04` |
| `HOG-TNG1-S-05` | Phòng giáo viên (Staff Room) | `other` | — | — |
| `HOG-TNG1-S-06` | Văn phòng Filch | `administration` | `hall` | `P-5e20349a56bd1b` |
| `HOG-TNG1-S-07` | Phòng tiếp khách nhà trường | `other` | — | — |


#### Tây — Transfiguration Courtyard approach (6 địa điểm)

- **`scopeId`:** `hogwarts/f3/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG1-W-03","HOG-TNG1-W-04"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-5fc25ea9745ef9` | Phòng học số 11 | `study` | `hall` | `HOG-TNG1-W-01` |
| `HOG-TNG1-W-02` | Kho chổi (Broom Cupboard) | `storage` | — | — |
| `HOG-TNG1-W-03` | Hành lang vào sân Biến hình | `circulation` | — | — |
| `HOG-TNG1-W-04` | Hành lang hướng sân Tứ giác | `circulation` | — | — |
| `HOG-TNG1-W-05` | Phòng gửi áo choàng | `other` | — | — |
| `HOG-TNG1-W-06` | Kho dụng cụ Biến hình | `storage` | — | — |


### 2.5. TẦNG 2


#### Bắc — History & Transfiguration corridor (6 địa điểm)

- **`scopeId`:** `hogwarts/f4/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG2-N-01` | Phòng Lịch sử Pháp thuật | `other` | — | — |
| `HOG-TNG2-N-02` | Văn phòng McGonagall | `administration` | — | — |
| `HOG-TNG2-N-03` | Phòng học Biến hình | `study` | — | — |
| `HOG-TNG2-N-04` | Phòng chuẩn bị Biến hình | `other` | — | — |
| `HOG-TNG2-N-05` | Kho sách Lịch sử Pháp thuật | `storage` | — | — |
| `HOG-TNG2-N-06` | Phòng học trống B-02 | `study` | — | — |


#### Đông — Scholars / North Hall upper walk (6 địa điểm)

- **`scopeId`:** `hogwarts/f4/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"windows","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG2-W-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG2-W-01` | Phòng học Muggle học | `study` | — | — |
| `HOG-TNG2-W-02` | Phòng Chữ tượng hình (Hieroglyphics) | `other` | — | — |
| `HOG-TNG2-W-03` | Hành lang tầng trên North Hall | `circulation` | — | — |
| `HOG-TNG2-W-04` | Phòng lưu mô hình lịch sử | `other` | — | — |
| `HOG-TNG2-W-05` | Kho bản đồ giảng dạy | `storage` | — | — |
| `HOG-TNG2-W-06` | Phòng học trống T-02 | `study` | — | — |


#### Nam — Hospital & Faculty Tower access (6 địa điểm)

- **`scopeId`:** `hogwarts/f4/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG2-S-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG2-S-01` | Bệnh xá Hogwarts | `other` | — | — |
| `HOG-TNG2-S-02` | Văn phòng bà Pomfrey | `administration` | — | — |
| `HOG-TNG2-S-03` | Hành lang vào Tháp Giáo viên | `circulation` | — | — |
| `HOG-TNG2-S-04` | Phòng thay băng | `other` | — | — |
| `HOG-TNG2-S-05` | Kho vật tư y tế | `storage` | — | — |
| `HOG-TNG2-S-06` | Phòng chờ bệnh xá | `common` | — | — |


#### Tây — DADA teaching cluster (6 địa điểm)

- **`scopeId`:** `hogwarts/f4/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG2-E-02"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG2-E-01` | Phòng học Phòng chống Nghệ thuật Hắc ám | `study` | — | — |
| `HOG-TNG2-E-02` | Hành lang Tháp DADA tầng thấp | `circulation` | — | — |
| `HOG-TNG2-E-03` | Phòng học phụ Tháp DADA | `study` | — | — |
| `HOG-TNG2-E-04` | Phòng thực hành phòng vệ | `other` | — | — |
| `HOG-TNG2-E-05` | Kho đạo cụ DADA | `storage` | — | — |
| `HOG-TNG2-E-06` | Phòng học trống Đ-02 | `study` | — | — |


### 2.6. TẦNG 3


#### Bắc — Phòng vệ sinh Myrtle và dãy hành lang (5 địa điểm)

- **`scopeId`:** `hogwarts/f5/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG3-N-02","HOG-TNG3-N-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG3-N-01` | Nhà vệ sinh Myrtle | `service` | — | — |
| `HOG-TNG3-N-02` | Hành lang tầng hai cạnh nhà vệ sinh Myrtle | `circulation` | — | — |
| `HOG-TNG3-N-03` | Nhà vệ sinh nam tầng này | `service` | — | — |
| `HOG-TNG3-N-04` | Kho bảo trì đường nước | `storage` | — | — |
| `HOG-TNG3-N-05` | Phòng trực hành lang B-03 | `circulation` | — | — |


#### Đông — Cầu thang tắt và hành lang lâu đài (4 địa điểm)

- **`scopeId`:** `hogwarts/f5/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG3-W-02","HOG-TNG3-W-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG3-W-02` | Hành lang tranh bản đồ Argyllshire | `circulation` | — | — |
| `HOG-TNG3-W-03` | Phòng kiểm tra an toàn cầu thang | `circulation` | — | — |
| `HOG-TNG3-W-04` | Phòng học trống T-03 | `study` | — | — |
| `HOG-TNG3-W-05` | Kho ghế bàn học | `storage` | — | — |


#### Nam — Phòng học bổ trợ (5 địa điểm)

- **`scopeId`:** `hogwarts/f5/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"tee","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG3-S-01` | Phòng luyện đũa phép cơ bản | `other` | — | — |
| `HOG-TNG3-S-02` | Phòng học trống N-03 | `study` | — | — |
| `HOG-TNG3-S-03` | Kho thiết bị học tập | `storage` | — | — |
| `HOG-TNG3-S-04` | Phòng làm việc trợ giảng | `administration` | — | — |
| `HOG-TNG3-S-05` | Phòng sinh hoạt học sinh nhỏ | `other` | — | — |


#### Tây — Văn phòng DADA – lối kín (5 địa điểm)

- **`scopeId`:** `hogwarts/f5/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG3-E-02"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG3-E-01` | Văn phòng giáo sư DADA (Lockhart 1992) | `administration` | — | — |
| `HOG-TNG3-E-02` | Hành lang tới văn phòng DADA | `circulation` | — | — |
| `HOG-TNG3-E-03` | Phòng tiếp phụ huynh của khoa DADA | `other` | — | — |
| `HOG-TNG3-E-04` | Phòng lưu giáo án | `other` | — | — |
| `HOG-TNG3-E-05` | Phòng học trống Đ-03 | `study` | — | — |


### 2.7. TẦNG 4


#### Bắc — Trophy – Armour Gallery (6 địa điểm)

- **`scopeId`:** `hogwarts/f6/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"windows","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG4-N-02"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG4-N-01` | Phòng Trưng bày Chiến tích | `exhibition` | — | — |
| `HOG-TNG4-N-02` | Hành lang áo giáp | `circulation` | — | — |
| `HOG-TNG4-N-03` | Phòng Âm nhạc (Music Room) | `other` | — | — |
| `HOG-TNG4-N-04` | Kho bảo quản cúp | `storage` | — | — |
| `HOG-TNG4-N-05` | Phòng tập hòa tấu | `other` | — | — |
| `HOG-TNG4-N-06` | Phòng học trống B-04 | `study` | — | — |


#### Đông — Gallery – North Hall upper route (5 địa điểm)

- **`scopeId`:** `hogwarts/f6/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG4-W-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG4-W-01` | Hành lang tầng trên Sảnh Bắc | `circulation` | — | — |
| `HOG-TNG4-W-02` | Phòng trưng bày cổ vật giáo dục | `exhibition` | — | — |
| `HOG-TNG4-W-03` | Phòng học trống T-04 | `study` | — | — |
| `HOG-TNG4-W-04` | Kho trang phục biểu diễn | `storage` | — | — |
| `HOG-TNG4-W-05` | Phòng phục hồi hiện vật | `other` | — | — |


#### Nam — Câu lạc bộ và hoạt động nhóm (5 địa điểm)

- **`scopeId`:** `hogwarts/f6/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"tee","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG4-S-01` | Phòng tập Đấu tay đôi dự phòng | `other` | — | — |
| `HOG-TNG4-S-02` | Phòng chuẩn bị câu lạc bộ | `other` | — | — |
| `HOG-TNG4-S-03` | Phòng tập diễn thuyết | `other` | — | — |
| `HOG-TNG4-S-04` | Phòng họp học sinh | `administration` | — | — |
| `HOG-TNG4-S-05` | Phòng học trống N-04 | `study` | — | — |


#### Tây — Charms – hành lang cấm cũ (6 địa điểm)

- **`scopeId`:** `hogwarts/f6/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG4-E-02","HOG-TNG4-E-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG4-E-01` | Phòng học Bùa chú | `study` | — | — |
| `HOG-TNG4-E-02` | Hành lang Bùa chú | `circulation` | — | — |
| `HOG-TNG4-E-03` | Hành lang cấm tầng ba năm 1991 | `circulation` | — | — |
| `HOG-TNG4-E-04` | Gian cửa sập của Fluffy (1991) | `other` | — | — |
| `HOG-TNG4-E-05` | Phòng thực hành Bùa chú | `other` | — | — |
| `HOG-TNG4-E-06` | Kho đồ dùng Bùa chú | `storage` | — | — |


### 2.8. TẦNG 5


#### Bắc — Library – Restricted Section (6 địa điểm)

- **`scopeId`:** `hogwarts/f7/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG5-N-01` | Thư viện Hogwarts | `study` | — | — |
| `HOG-TNG5-N-02` | Khu Sách Cấm (Restricted Section) | `other` | — | — |
| `HOG-TNG5-N-03` | Phòng làm việc thủ thư | `administration` | — | — |
| `HOG-TNG5-N-04` | Phòng đọc nghiên cứu | `study` | — | — |
| `HOG-TNG5-N-05` | Phòng tra cứu mục lục | `other` | — | — |
| `HOG-TNG5-N-06` | Kho sách ít dùng | `storage` | — | — |


#### Đông — Long Gallery – chuyên môn (5 địa điểm)

- **`scopeId`:** `hogwarts/f7/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG5-E-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG5-E-01` | Hành lang Dài (Long Gallery) | `circulation` | — | — |
| `HOG-TNG5-E-02` | Phòng học Số học (Arithmancy) | `study` | — | — |
| `HOG-TNG5-E-03` | Phòng bản đồ và địa lý pháp thuật | `other` | — | — |
| `HOG-TNG5-E-04` | Phòng giải mã mật thư | `other` | — | — |
| `HOG-TNG5-E-05` | Phòng học trống Đ-05 | `study` | — | — |


#### Nam — Lối đi tầng bốn và gian trống (6 địa điểm)

- **`scopeId`:** `hogwarts/f7/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG5-S-02","HOG-TNG5-S-05","HOG-TNG3-W-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG5-S-01` | Phòng trống từng chứa Gương Ảo ảnh năm 1991 | `other` | — | — |
| `HOG-TNG5-S-02` | Hành lang gương thông lối bí mật cũ | `circulation` | — | — |
| `HOG-TNG5-S-03` | Phòng lưu hồ sơ thư viện | `storage` | — | — |
| `HOG-TNG5-S-04` | Phòng học trống N-05 | `study` | — | — |
| `HOG-TNG5-S-05` | Kho vật dụng sảnh đọc | `circulation` | — | — |
| `HOG-TNG3-W-01` | Cầu thang tắt sau thảm treo | `circulation` | — | — |


#### Tây — Cổ ngữ – học thuật (5 địa điểm)

- **`scopeId`:** `hogwarts/f7/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG5-W-01` | Phòng học Cổ ngữ Runes | `study` | — | — |
| `HOG-TNG5-W-02` | Phòng dịch cổ ngữ | `other` | — | — |
| `HOG-TNG5-W-03` | Phòng học chuyên đề lịch sử | `study` | — | — |
| `HOG-TNG5-W-04` | Phòng nghiên cứu tư liệu | `other` | — | — |
| `HOG-TNG5-W-05` | Phòng học trống T-05 | `study` | — | — |


### 2.9. TẦNG 6


#### Bắc — Prefects corridor – Faculty route (6 địa điểm)

- **`scopeId`:** `hogwarts/f8/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"tee","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG6-N-02","HOG-TNG6-N-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG6-N-01` | Phòng tắm Huynh trưởng | `service` | — | — |
| `HOG-TNG6-N-02` | Hành lang trước Phòng tắm Huynh trưởng | `circulation` | — | — |
| `HOG-TNG6-N-03` | Hành lang Tháp Giáo viên tầng trên | `circulation` | — | — |
| `HOG-TNG6-N-04` | Phòng nghỉ huynh trưởng | `other` | — | — |
| `HOG-TNG6-N-05` | Kho khăn và đồng phục | `storage` | — | — |
| `HOG-TNG6-N-06` | Phòng học trống B-06 | `study` | — | — |


#### Đông — Phòng học trung cấp (5 địa điểm)

- **`scopeId`:** `hogwarts/f8/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG6-E-02"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG6-E-01` | Phòng nghiên cứu Số học | `other` | — | — |
| `HOG-TNG6-E-02` | Hành lang cánh Đông tầng năm | `circulation` | — | — |
| `HOG-TNG6-E-03` | Phòng mỹ thuật pháp thuật | `other` | — | — |
| `HOG-TNG6-E-04` | Kho bài tập và bảng phép | `storage` | — | — |
| `HOG-TNG6-E-05` | Phòng học trống Đ-06 | `study` | — | — |


#### Nam — Lối lên Tháp Đồng hồ (5 địa điểm)

- **`scopeId`:** `hogwarts/f8/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"tower","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG6-S-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG6-S-01` | Hành lang Tháp Đồng hồ tầng cao | `circulation` | — | — |
| `HOG-TNG6-S-02` | Phòng bảo trì cơ cấu đồng hồ | `other` | — | — |
| `HOG-TNG6-S-03` | Phòng câu lạc bộ học thuật | `study` | — | — |
| `HOG-TNG6-S-04` | Phòng làm báo học sinh | `other` | — | — |
| `HOG-TNG6-S-05` | Kho thiết bị triển lãm | `storage` | — | — |


#### Tây — Hành lang cửa sổ cao (5 địa điểm)

- **`scopeId`:** `hogwarts/f8/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"windows","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG6-W-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG6-W-01` | Hành lang cửa sổ phía Tây tầng năm | `circulation` | — | — |
| `HOG-TNG6-W-02` | Phòng tập nhạc nhóm nhỏ | `other` | — | — |
| `HOG-TNG6-W-03` | Phòng đọc yên tĩnh | `study` | — | — |
| `HOG-TNG6-W-04` | Phòng học trống T-06 | `study` | — | — |
| `HOG-TNG6-W-05` | Kho đồ thủ công | `storage` | — | — |


### 2.10. TẦNG 7


#### Bắc — Upper stair – tower access (5 địa điểm)

- **`scopeId`:** `hogwarts/f9/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG7-N-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG7-N-01` | Phòng lưu bảng thành tích học thuật | `other` | — | — |
| `HOG-TNG7-N-02` | Phòng lưu sổ kết quả học tập | `other` | — | — |
| `HOG-TNG7-N-03` | Kho thiết bị tiết học nâng cao | `storage` | — | — |
| `HOG-TNG7-N-04` | Phòng học trống B-07 | `study` | — | — |
| `HOG-TNG7-N-05` | Hành lang cầu thang phía Bắc | `circulation` | — | — |


#### Đông — Seminar & advanced teaching (5 địa điểm)

- **`scopeId`:** `hogwarts/f9/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG7-E-01` | Nhà vệ sinh nam tầng sáu | `service` | — | — |
| `HOG-TNG7-E-02` | Phòng học chuyên đề Phép thuật nâng cao | `study` | — | — |
| `HOG-TNG7-E-03` | Phòng hội thảo nhỏ | `other` | — | — |
| `HOG-TNG7-E-04` | Phòng thí nghiệm an toàn | `other` | — | — |
| `HOG-TNG7-E-05` | Phòng học trống Đ-07 | `study` | — | — |


#### Nam — Đường nối Faculty/Clock tower (5 địa điểm)

- **`scopeId`:** `hogwarts/f9/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG7-S-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG7-S-01` | Hành lang phía trên Tháp Giáo viên | `circulation` | — | — |
| `HOG-TNG7-S-02` | Phòng lưu biên bản giáo viên | `other` | — | — |
| `HOG-TNG7-S-03` | Phòng xem lịch học | `other` | — | — |
| `HOG-TNG7-S-04` | Kho sách tham khảo | `storage` | — | — |
| `HOG-TNG7-S-05` | Phòng học trống N-07 | `study` | — | — |


#### Tây — Cụm sinh hoạt và trò chơi (5 địa điểm)

- **`scopeId`:** `hogwarts/f9/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"windows","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG7-W-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG7-W-01` | Phòng Gobstones | `other` | — | — |
| `HOG-TNG7-W-02` | Phòng câu lạc bộ cờ phù thủy | `common` | — | — |
| `HOG-TNG7-W-03` | Phòng làm dự án học sinh | `other` | — | — |
| `HOG-TNG7-W-04` | Phòng học trống T-07 | `study` | — | — |
| `HOG-TNG7-W-05` | Hành lang kính tầng cao | `circulation` | — | — |


### 2.11. TẦNG 8


#### Bắc — Upper Grand Staircase / Headmaster (5 địa điểm)

- **`scopeId`:** `hogwarts/f10/0`
- **Preset hành lang (giữ nguyên):** `{"layout":"tower","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG8-N-01","HOG-TNG8-N-02","HOG-TNG8-N-03"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG8-N-01` | Hành lang dẫn lên văn phòng Hiệu trưởng | `circulation` | — | — |
| `HOG-TNG8-N-02` | Sảnh vào văn phòng Hiệu trưởng | `circulation` | — | — |
| `HOG-TNG8-N-03` | Sảnh tầng cao Cầu thang Lớn | `circulation` | — | — |
| `HOG-TNG8-N-04` | Phòng học trống B-08 | `study` | — | — |
| `HOG-TNG8-N-05` | Kho giấy tờ giáo vụ | `storage` | — | — |


#### Đông — Room of Requirement (5 địa điểm)

- **`scopeId`:** `hogwarts/f10/1`
- **Preset hành lang (giữ nguyên):** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG8-E-01"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG8-E-01` | Hành lang tầng bảy trước Phòng Yêu cầu | `circulation` | — | — |
| `HOG-TNG8-E-02` | Phòng Yêu cầu (Room of Requirement) | `other` | — | — |
| `HOG-TNG8-E-03` | Phòng học trống Đ-08 | `study` | — | — |
| `HOG-TNG8-E-04` | Phòng nghi lễ học thuật | `other` | — | — |
| `HOG-TNG8-E-05` | Phòng bảo quản tranh phép | `commerce` | — | — |


#### Nam — Gryffindor entrance – common route (5 địa điểm)

- **`scopeId`:** `hogwarts/f10/2`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["HOG-TNG8-S-01","HOG-TNG8-S-03","HOG-TNG8-S-05"]}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG8-S-01` | Lối chân dung Bà Béo | `circulation` | — | — |
| `P-441745282e9e54` | Phòng sinh hoạt chung Gryffindor | `other` | `gryffindor-common` | `HOG-TNG8-S-02` |
| `HOG-TNG8-S-03` | Lối cầu thang ký túc Gryffindor | `circulation` | — | — |
| `HOG-TNG8-S-04` | Phòng học nhóm tầng bảy | `study` | — | — |
| `HOG-TNG8-S-05` | Hành lang tranh tầng bảy | `circulation` | — | — |


#### Tây — CCC / senior clubs (AU) (7 địa điểm)

- **`scopeId`:** `hogwarts/f10/3`
- **Preset hành lang (giữ nguyên):** `{"layout":"ell","flexible":true,"source":"illustrative"}`
- **Ranh giới:** chỉ các ID bên dưới; không gộp sang hướng khác.

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG8-W-01` | CCC 07.18 | `other` | — | `P-7dbd9dfca98ac3` |
| `HOG-TNG8-W-02` | Tiền phòng CCC | `other` | — | `P-eb17a00f2392a6` |
| `HOG-TNG8-W-03` | Phòng thư liên nhà CCC | `other` | — | `P-4830d8d84c0a5a` |
| `HOG-TNG8-W-04` | Phòng viết CCC | `other` | — | `P-ae81c478038c2b` |
| `HOG-TNG8-W-05` | Kho hồ sơ CCC | `storage` | — | `P-8dc648ce85a4fe` |
| `HOG-TNG8-W-06` | Phòng họp liên nhà | `administration` | — | — |
| `HOG-TNG8-W-07` | Phòng học trống T-08 | `study` | — | — |


## 3. Hogwarts — Các tháp và tầng tháp

### 3.1. Tháp Gryffindor (Tây Nam)


#### Lối vào (Tầng 8) (2 địa điểm)

- **`scopeId`:** `tower/0/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-01-01-02","TWR-01-01-03"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-01-01-02` | Lối thang ký túc nam | `circulation` | — | — |
| `TWR-01-01-03` | Lối thang ký túc nữ | `circulation` | — | — |


#### Tầng tháp trên (3 địa điểm)

- **`scopeId`:** `tower/0/1`
- **Preset:** `{"layout":"vertical","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-01-02-03"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-a63fc4014d765b` | Ký túc nam Gryffindor | `residential` | `gryffindor-common` | `TWR-01-02-01` |
| `P-468097e3d74bf1` | Ký túc nữ Gryffindor | `residential` | `gryffindor-common` | `TWR-01-02-02` |
| `TWR-01-02-03` | Phòng sinh hoạt học sinh cuối hành lang | `circulation` | — | — |


### 3.2. Tháp Ravenclaw (Tây)


#### Lối vào tháp cao (3 địa điểm)

- **`scopeId`:** `tower/1/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-02-01-02"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-4bde45f1a1cb07` | Phòng sinh hoạt chung Ravenclaw | `other` | `ravenclaw-common` | `TWR-02-01-01` |
| `TWR-02-01-02` | Sảnh vào Ravenclaw | `circulation` | — | — |
| `TWR-02-01-03` | Phòng đọc học thuật Ravenclaw | `study` | — | — |


#### Khu phòng ngủ (3 địa điểm)

- **`scopeId`:** `tower/1/1`
- **Preset:** `{"layout":"tee","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-439400ea5f0cd4` | Ký túc nam Ravenclaw | `residential` | `ravenclaw-common` | `TWR-02-02-01` |
| `P-7d130cc86d97eb` | Ký túc nữ Ravenclaw | `residential` | `ravenclaw-common` | `TWR-02-02-02` |
| `TWR-02-02-03` | Phòng học nhóm Ravenclaw | `study` | — | — |


### 3.3. Tháp Bắc (Tiên tri) (Bắc)


#### Tầng tiếp cận (2 địa điểm)

- **`scopeId`:** `tower/2/0`
- **Preset:** `{"layout":"tower","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-03-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-03-01-01` | Cầu thang xoắn lên Tháp Bắc | `circulation` | — | — |
| `TWR-03-01-02` | Phòng lưu bản đồ sao Tiên tri | `other` | — | — |


#### Đỉnh tháp (2 địa điểm)

- **`scopeId`:** `tower/2/1`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-03-02-01` | Phòng học Tiên tri | `study` | — | — |
| `TWR-03-02-02` | Kho dụng cụ bói toán | `storage` | — | — |


### 3.4. Tháp Thiên văn (Tây Bắc)


#### Tầng chân tháp (2 địa điểm)

- **`scopeId`:** `tower/3/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-04-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-04-01-01` | Hành lang chân Tháp Thiên văn | `circulation` | — | — |
| `TWR-04-01-02` | Phòng bảo trì kính thiên văn | `other` | — | — |


#### Tầng giữa (2 địa điểm)

- **`scopeId`:** `tower/3/1`
- **Preset:** `{"layout":"vertical","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-04-02-01` | Phòng chuẩn bị quan sát | `commerce` | — | — |
| `TWR-04-02-02` | Kho bản đồ sao | `storage` | — | — |


#### Đỉnh tháp (2 địa điểm)

- **`scopeId`:** `tower/3/2`
- **Preset:** `{"layout":"tower","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-04-03-01` | Phòng học Thiên văn | `study` | — | — |
| `TWR-04-03-02` | Đài quan sát Thiên văn | `commerce` | — | — |


### 3.5. Tháp Hiệu trưởng (Bắc / Trung tâm)


#### Tầng cửa vào (2 địa điểm)

- **`scopeId`:** `tower/4/0`
- **Preset:** `{"layout":"tower","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-05-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-05-01-01` | Cầu thang xoắn sau tượng đá | `circulation` | — | — |
| `TWR-05-01-02` | Phòng chờ văn phòng Hiệu trưởng | `administration` | — | — |


#### Đỉnh tháp (3 địa điểm)

- **`scopeId`:** `tower/4/1`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-05-02-01` | Văn phòng Hiệu trưởng | `administration` | — | — |
| `TWR-05-02-02` | Phòng lưu dụng cụ hiệu trưởng | `other` | — | — |
| `TWR-05-02-03` | Kho tài liệu Hiệu trưởng | `storage` | — | — |


### 3.6. Tháp Đồng hồ (Tây Nam)


#### Chân tháp (2 địa điểm)

- **`scopeId`:** `tower/5/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-06-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-06-01-01` | Sảnh Tháp Đồng hồ | `circulation` | — | — |
| `TWR-06-01-02` | Phòng trực giờ giấc | `administration` | — | — |


#### Giữa tháp (2 địa điểm)

- **`scopeId`:** `tower/5/1`
- **Preset:** `{"layout":"tower","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-06-02-01` | Gian cơ cấu bánh răng | `other` | — | — |
| `TWR-06-02-02` | Phòng bảo trì đồng hồ | `other` | — | — |


#### Đỉnh tháp (2 địa điểm)

- **`scopeId`:** `tower/5/2`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-06-03-01` | Buồng quả lắc lớn | `other` | — | — |
| `TWR-06-03-02` | Buồng kiểm tra chuông giờ | `other` | — | — |


### 3.7. Tháp Chuông (Bắc)


#### Chân tháp (1 địa điểm)

- **`scopeId`:** `tower/6/0`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-07-01-02` | Phòng giữ dụng cụ chuông | `other` | — | — |


#### Đỉnh tháp (2 địa điểm)

- **`scopeId`:** `tower/6/1`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-07-02-01` | Đài treo chuông | `other` | — | — |
| `TWR-07-02-02` | Phòng vận hành chuông | `other` | — | — |


### 3.8. Tháp Giáo viên (Faculty Tower) (Nam)


#### Tầng tiếp cận (2 địa điểm)

- **`scopeId`:** `tower/7/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-08-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-08-01-01` | Lối vào Faculty Tower | `circulation` | — | — |
| `TWR-08-01-02` | Phòng trực nhân viên | `administration` | — | — |


#### Tầng giữa (2 địa điểm)

- **`scopeId`:** `tower/7/1`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-08-02-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-08-02-01` | Hành lang các phòng giáo viên | `circulation` | — | — |
| `TWR-08-02-02` | Phòng nghỉ giáo viên | `other` | — | — |


#### Tầng trên (2 địa điểm)

- **`scopeId`:** `tower/7/2`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-08-03-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-08-03-01` | Hành lang nối bệnh xá | `circulation` | — | — |
| `TWR-08-03-02` | Phòng họp giảng viên kín | `administration` | — | — |


### 3.9. Tháp DADA (Đông)


#### Chân tháp (2 địa điểm)

- **`scopeId`:** `tower/8/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-09-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-09-01-01` | Sảnh chân Tháp DADA | `circulation` | — | — |
| `TWR-09-01-02` | Kho đạo cụ phòng vệ | `storage` | — | — |


#### Tầng giảng dạy (2 địa điểm)

- **`scopeId`:** `tower/8/1`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-09-02-01` | Phòng học Phòng chống Nghệ thuật Hắc ám — cửa tháp | `study` | — | — |
| `TWR-09-02-02` | Phòng tập đũa phép tại tháp | `other` | — | — |


#### Tầng trên (2 địa điểm)

- **`scopeId`:** `tower/8/2`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-09-03-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-09-03-01` | Hành lang Tháp DADA tầng cao | `circulation` | — | — |
| `TWR-09-03-02` | Phòng làm việc bổ trợ DADA | `administration` | — | — |


### 3.10. Tháp Cầu thang Lớn (Trung tâm)


#### Chân tháp (2 địa điểm)

- **`scopeId`:** `tower/9/0`
- **Preset:** `{"layout":"tower","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-10-01-01","TWR-10-01-02"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-10-01-01` | Cầu thang Lớn | `circulation` | — | — |
| `TWR-10-01-02` | Buồng kiểm tra cầu thang | `circulation` | — | — |


#### Lưng chừng (2 địa điểm)

- **`scopeId`:** `tower/9/1`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-10-02-01","TWR-10-02-02"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-10-02-01` | Hành lang tranh nối Cầu thang Lớn | `circulation` | — | — |
| `TWR-10-02-02` | Phòng trực hành lang giữa tầng | `circulation` | — | — |


#### Đỉnh tháp (2 địa điểm)

- **`scopeId`:** `tower/9/2`
- **Preset:** `{"layout":"tee","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-10-03-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-10-03-01` | Sảnh cao Cầu thang Lớn | `circulation` | — | — |
| `TWR-10-03-02` | Kho bảng hướng dẫn lớp | `storage` | — | — |


### 3.11. Tháp Tây (Nhà cú) (Tây)


#### Lối lên (2 địa điểm)

- **`scopeId`:** `tower/10/0`
- **Preset:** `{"layout":"vertical","flexible":true,"source":"illustrative","corridorPlaceIds":["TWR-11-01-01"]}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-11-01-01` | Cầu thang Nhà cú | `circulation` | — | — |
| `TWR-11-01-02` | Kho thức ăn cho cú | `storage` | — | — |


#### Tầng chuồng cú (2 địa điểm)

- **`scopeId`:** `tower/10/1`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `TWR-11-02-01` | Nhà cú (Owlery) | `other` | — | — |
| `TWR-11-02-02` | Phòng chăm sóc cú bị thương | `other` | — | — |


## 4. AU — Giữ nguyên công trình, từng tầng và chính sách khóa

### 4.1. 7 Rowan Mews · London

- **Vùng:** Britain › London
- **buildEnabled:** `false`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Bán hầm (4 địa điểm)

- **`scopeId`:** `au/0/0`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-c986bd14a65aff` | Bếp | `service` | — | — |
| `P-f63320e3ce02f8` | Pantry | `service` | — | — |
| `P-05cf8a6d391ae0` | Laundry | `service` | — | — |
| `P-6101b5e9235dbd` | Kho | `other` | — | — |


#### Tầng 1 (trệt) (6 địa điểm)

- **`scopeId`:** `au/0/1`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-d5c52789ba1582` | Sảnh | `circulation` | — | — |
| `P-a40a9139e15cdf` | Phòng khách | `other` | — | — |
| `P-1d43d774de1087` | Phòng ăn | `other` | — | — |
| `P-36a9268e0e2288` | Phòng vườn | `outdoor` | — | — |
| `P-1802311f93c216` | Sân trong | `outdoor` | — | — |
| `P-3c919f6f95c429` | Phòng áo khoác | `other` | — | — |


#### Tầng 2 (4 địa điểm)

- **`scopeId`:** `au/0/2`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-3bf90655eabf0a` | Thư viện | `study` | — | — |
| `P-ad5ac899e9989d` | Study Valerian | `study` | — | — |
| `P-2e95be7ac27f5e` | Study Amethyst | `study` | — | — |
| `P-86f19e61932103` | Phòng tiếp khách | `other` | — | — |


#### Tầng 3 (4 địa điểm)

- **`scopeId`:** `au/0/3`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-e51ad92343c8de` | Master suite | `residential` | — | — |
| `P-558513338bec03` | Phòng Liad | `other` | — | — |
| `P-4ccd67d1317f71` | Phòng khách ngủ | `residential` | — | — |
| `P-572439c7221fb9` | Phòng tắm | `service` | — | — |


#### Áp mái (1 địa điểm)

- **`scopeId`:** `au/0/4`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-2ae3745c48f04a` | Kho gia đình | `storage` | — | — |


### 4.2. WzW House · 18 Ganton Street · Soho

- **Vùng:** Britain › London
- **buildEnabled:** `false`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Tầng hầm (4 địa điểm)

- **`scopeId`:** `au/1/0`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-836c31b9c17543` | Kho lưu trữ bản in | `storage` | — | — |
| `P-579062ef9135bd` | Kho giấy | `storage` | — | — |
| `P-47e13519fc6e78` | Kho mẫu | `storage` | — | — |
| `P-c48031b40aa4a6` | Phòng thiết bị | `other` | — | — |


#### Tầng 1 (trệt) (4 địa điểm)

- **`scopeId`:** `au/1/1`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-0f0f21af1613e3` | Sảnh tiếp tân | `circulation` | — | — |
| `P-2e483807e1273e` | Phòng trưng bày | `outdoor` | — | — |
| `P-cbf1bbfe09504a` | Phòng tiếp khách | `other` | — | — |
| `P-f1273cfbd8dcc9` | Phòng giao nhận | `other` | — | — |


#### Tầng 2 (3 địa điểm)

- **`scopeId`:** `au/1/2`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-c6d06746fedb75` | Phòng biên tập | `other` | — | — |
| `P-cc6eda155ffa84` | Phòng họp | `administration` | — | — |
| `P-35150c109c52c8` | Phòng viết nội dung | `other` | — | — |


#### Tầng 3 (4 địa điểm)

- **`scopeId`:** `au/1/3`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-056435e23f0696` | Studio ảnh | `other` | — | — |
| `P-eeef4f392301fb` | Phòng tạo kiểu | `other` | — | — |
| `P-7146cc78e7b6bb` | Phòng thay đồ | `other` | — | — |
| `P-ceed22a8b82bc0` | Phòng mẫu | `other` | — | — |


#### Tầng 4 (2 địa điểm)

- **`scopeId`:** `au/1/4`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-e7944584d870f6` | Studio sáng tạo | `other` | — | — |
| `P-b61993cdbfa4f0` | Phòng duyệt bản in | `other` | — | — |


#### Tầng mái (3 địa điểm)

- **`scopeId`:** `au/1/5`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-f76c14a8f564e2` | Bếp nhỏ | `service` | — | — |
| `P-f11d32df681cb8` | Thư viện ấn phẩm | `study` | — | — |
| `P-45ca006de2e29d` | Sân thượng | `outdoor` | — | — |


### 4.3. Loft 5A · 21 Great Titchfield Street · Fitzrovia

- **Vùng:** Britain › London
- **buildEnabled:** `false`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Sảnh chung (1 địa điểm)

- **`scopeId`:** `au/2/0`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-d1e5c9e5641c72` | Sảnh chung | `circulation` | — | — |


#### Loft 5A (5 địa điểm)

- **`scopeId`:** `au/2/1`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-d62f3f91b273a7` | Phòng khách & bếp | `service` | — | — |
| `P-2943e215e1b645` | Studio sáng tạo | `other` | — | — |
| `P-7fab1a6c46fde1` | Phòng ngủ | `residential` | — | — |
| `P-85d4eac574abfb` | Phòng thay đồ | `other` | — | — |
| `P-6748bf2a512b32` | Phòng tiện ích | `other` | — | — |


### 4.4. Whitecap Estate · Isle of Wight

- **Vùng:** Britain › Isle of Wight
- **buildEnabled:** `false`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Khuôn viên (6 địa điểm)

- **`scopeId`:** `au/3/0`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-6622d43a61e262` | Biệt thự Whitecap | `other` | — | — |
| `P-dfec655aa06ffb` | Vườn | `outdoor` | — | — |
| `P-91e1d4b9d90ce6` | Hồ bơi | `outdoor` | — | — |
| `P-fb05960b29389c` | Bãi biển Whitecap | `outdoor` | — | — |
| `P-35450f7ad71727` | Nhà khách | `other` | — | — |
| `P-fafa275e3442de` | Chuồng gia cầm | `other` | — | — |


#### Tầng 1 (trệt) (8 địa điểm)

- **`scopeId`:** `au/3/1`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-704560d7aaa0f1` | Tiền sảnh | `circulation` | — | — |
| `P-4f927c3f8e69d3` | Phòng khách | `other` | — | — |
| `P-052c1a401bbcfe` | Phòng ăn | `other` | — | — |
| `P-79d20dbdcafbc7` | Thư viện | `study` | — | — |
| `P-62939be1327ef1` | Phòng D&D | `other` | — | — |
| `P-17b225b47b5160` | Bếp | `service` | — | — |
| `P-ca5dbc8d9268d5` | Hiên ngoài | `other` | — | — |
| `P-819514c84e1a30` | Phòng kính | `other` | — | — |


#### Tầng 2 (4 địa điểm)

- **`scopeId`:** `au/3/2`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-838b8e1603bb66` | Phòng ngủ gia đình | `residential` | — | — |
| `P-51deeb2c56d244` | Phòng khách ngủ | `residential` | — | — |
| `P-c2ae860eb1abb4` | Phòng sinh hoạt | `other` | — | — |
| `P-e320c112ea6a38` | Ban công | `other` | — | — |


#### Áp mái (3 địa điểm)

- **`scopeId`:** `au/3/3`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-04c058ca77c028` | Phòng áp mái | `other` | — | — |
| `P-cd916ab4eeb2b0` | Kho dưới mái | `storage` | — | — |
| `P-c2b0b9eb3b7897` | Phòng sở thích | `other` | — | — |


#### Bờ biển Whitecap (1 địa điểm)

- **`scopeId`:** `au/3/4`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-6f010e23dbcf13` | Bến Whitecap | `other` | — | — |


### 4.5. Grayhaven Estate · California

- **Vùng:** United States › California
- **buildEnabled:** `false`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Khuôn viên (5 địa điểm)

- **`scopeId`:** `au/4/0`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-28f1e32ca3f09f` | Biệt thự Grayhaven | `other` | — | — |
| `P-aae6653add136e` | Nhà khách | `other` | — | — |
| `P-fbcb3e25adb914` | Vườn | `outdoor` | — | — |
| `P-f5b0d79a9fcc91` | Sân hồ bơi | `outdoor` | — | — |
| `P-18b19a8c7825cf` | Studio nhà kính | `other` | — | — |


#### Tầng 1 (trệt) (7 địa điểm)

- **`scopeId`:** `au/4/1`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-fd29682932d8c0` | Tiền sảnh | `circulation` | — | — |
| `P-f257da4f8369a2` | Phòng khách | `other` | — | — |
| `P-26295c3fd155a4` | Phòng ăn | `other` | — | — |
| `P-0afb8b38025951` | Bếp gia đình | `service` | — | — |
| `P-0cf87e2f9d3027` | Phòng làm việc | `administration` | — | — |
| `P-8547e7b53ee0e6` | Phòng sinh hoạt hướng vườn | `outdoor` | — | — |
| `P-38afa9168985ae` | Phòng kính | `other` | — | — |


#### Tầng 2 (3 địa điểm)

- **`scopeId`:** `au/4/2`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-fb55d3d6b976e4` | Phòng gia đình | `other` | — | — |
| `P-120f81b5d30c37` | Phòng khách ngủ | `residential` | — | — |
| `P-cad4970480cc75` | Phòng đọc | `study` | — | — |


#### Nhà khách (4 địa điểm)

- **`scopeId`:** `au/4/3`
- **Preset:** Không khai báo

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-aff4fe8ba8b10c` | Phòng khách & bếp | `service` | — | — |
| `P-239cfed7a31957` | Phòng ngủ phía đông | `residential` | — | — |
| `P-9ce0d6987c6167` | Phòng ngủ phía tây | `residential` | — | — |
| `P-aae0e4c8ac4172` | Terrace | `other` | — | — |


### 4.6. Nhà PC · London

- **Vùng:** Britain › London
- **buildEnabled:** `true`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Bán hầm (4 địa điểm)

- **`scopeId`:** `au/5/0`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-84e3b35dd330b5` | Phòng tiện ích | `other` | — | — |
| `P-b64b4fd825a7ea` | Phòng giặt | `service` | — | — |
| `P-5e88541888baad` | Kho | `other` | — | — |
| `P-ad08891d59bb8b` | Phòng sửa đồ | `other` | — | — |


#### Tầng 1 (trệt) (6 địa điểm)

- **`scopeId`:** `au/5/1`
- **Preset:** `{"layout":"tee","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-b2554d6b1381cd` | Tiền sảnh | `circulation` | — | — |
| `P-8f34772df41a97` | Phòng khách | `other` | — | — |
| `P-7210700596d5ae` | Phòng ăn | `other` | — | — |
| `P-78ec748eb7b9ce` | Bếp | `service` | — | — |
| `P-176df525d65b31` | Hiên sau | `other` | — | — |
| `P-6acb59a2cd0cf1` | Vườn sau | `outdoor` | — | — |


#### Tầng 2 (3 địa điểm)

- **`scopeId`:** `au/5/2`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-cadd273181369d` | Phòng ngủ chính | `residential` | — | — |
| `P-56dbab3b62a960` | Phòng làm việc | `administration` | — | — |
| `P-866203855d3998` | Phòng tắm | `service` | — | — |


#### Tầng 3 (2 địa điểm)

- **`scopeId`:** `au/5/3`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-7a95ade5b09943` | Phòng BẠN | `other` | — | — |
| `P-f67fdab0b798c6` | Phòng khách ngủ | `residential` | — | — |


#### Áp mái (2 địa điểm)

- **`scopeId`:** `au/5/4`
- **Preset:** `{"layout":"ell","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-9d66d64ae1eced` | Phòng sở thích | `other` | — | — |
| `P-aafb6b5cc0a4c6` | Kho dưới mái | `storage` | — | — |


### 4.7. CCC 07.18 · Hogwarts

- **Vùng:** Hogwarts › Tầng 8 · cánh Tây
- **buildEnabled:** `true`
- **Chỉ phòng được phép xây:** `HOG-TNG8-W-01`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Tầng 8 · cánh Tây (5 địa điểm)

- **`scopeId`:** `au/6/0`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `HOG-TNG8-W-01` | CCC 07.18 | `other` | — | `P-7dbd9dfca98ac3` |
| `HOG-TNG8-W-02` | Tiền phòng CCC | `other` | — | `P-eb17a00f2392a6` |
| `HOG-TNG8-W-03` | Phòng thư liên nhà CCC | `other` | — | `P-4830d8d84c0a5a` |
| `HOG-TNG8-W-04` | Phòng viết CCC | `other` | — | `P-ae81c478038c2b` |
| `HOG-TNG8-W-05` | Kho hồ sơ CCC | `storage` | — | `P-8dc648ce85a4fe` |


### 4.8. Liad’s Attic · Hogwarts

- **Vùng:** Hogwarts › Áp mái
- **buildEnabled:** `true`
- **Lưu ý:** Không thay đổi quyền dựng hoặc mở khóa AU.


#### Áp mái (1 địa điểm)

- **`scopeId`:** `au/7/0`
- **Preset:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-0b2a64c33ccc84` | Phòng áp mái Liad | `other` | — | — |


## 5. World — Giữ nguyên đường dẫn khu vực

### 5.1. Albania › Rừng (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/0` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-a69db007365fe0` | Rừng Albania – nơi Voldemort trú ẩn | `outdoor` | — | — |


### 5.2. Bắc Âu › Trường pháp thuật (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/1` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-0b1c0c88e006f3` | Durmstrang Institute (vị trí bí mật, chưa chốt nước) | `other` | — | — |


### 5.3. Brazil › Trường pháp thuật (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/2` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-dc6e4d25cb717b` | Castelobruxo School of Magic | `other` | — | — |


### 5.4. Britain › England › Các địa điểm và nhà khác (12 địa điểm)

- **Mục tham chiếu nguồn:** `world/3` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-b4e7452b5bd988` | Budleigh Babberton | `other` | — | — |
| `P-54d36cdd92de52` | Nhà Alastor Moody | `other` | — | — |
| `P-1809b6a4970166` | Nhà Barty Crouch Sr. | `other` | — | — |
| `P-52ea7749d9b897` | Nhà cô Muriel | `other` | — | — |
| `P-7c0776422fe490` | Nhà của Amos Diggory (nếu tách khỏi Ottery St Catchpole) | `other` | — | — |
| `P-ac442939b95160` | Nhà gia đình Longbottom (địa chỉ không xác định) | `other` | — | — |
| `P-aabefd99376d5b` | Nhà Hepzibah Smith | `other` | — | — |
| `P-30e83b523e3592` | Nhà Slughorn ở tạm tại Budleigh Babberton | `other` | — | — |
| `P-df07d01094f11f` | Túp lều ngoài biển trong tập một | `other` | — | — |
| `P-39e69af2a5fc7c` | Upper Flagley | `other` | — | — |
| `P-a6360747d2eff6` | Bãi cắm trại trong Rừng Dean | `outdoor` | — | — |
| `P-4f6ef384d93fb3` | Rừng Dean | `outdoor` | — | — |


### 5.5. Britain › England › Cokeworth / Spinner’s End (4 địa điểm)

- **Mục tham chiếu nguồn:** `world/4` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-5965034df92b27` | Cokeworth | `other` | — | — |
| `P-90f19984c65a90` | Nhà Snape | `other` | — | — |
| `P-a56cde3ee35e1c` | Railview Hotel | `other` | — | — |
| `P-2cda580d14d444` | Spinner’s End | `other` | — | — |


### 5.6. Britain › England › Godric’s Hollow (7 địa điểm)

- **Mục tham chiếu nguồn:** `world/5` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-dec21f949ed798` | Làng Godric’s Hollow | `other` | — | — |
| `P-5ddef138f591ee` | Nghĩa địa Godric’s Hollow | `other` | — | — |
| `P-05d77e52709869` | Nhà Bathilda Bagshot | `other` | — | — |
| `P-55b6096c51b788` | Nhà gia đình Dumbledore | `other` | — | — |
| `P-5d4b08c68c7c51` | Nhà Potter / Potter Cottage | `other` | — | — |
| `P-6c6fc8c763f6b7` | Quảng trường Godric’s Hollow | `other` | — | — |
| `P-2a51f7e8e278a7` | Nhà thờ Godric’s Hollow | `outdoor` | — | — |


### 5.7. Britain › England › Little Hangleton / Great Hangleton (6 địa điểm)

- **Mục tham chiếu nguồn:** `world/6` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-1257864e10b184` | Quán The Hanged Man | `commerce` | — | — |
| `P-3af65a0ca62879` | Biệt thự Riddle | `other` | — | — |
| `P-e57b3aa8509cf4` | Làng Great Hangleton | `other` | — | — |
| `P-95f33b1a222e12` | Làng Little Hangleton | `other` | — | — |
| `P-cf6e6f0ff253af` | Nghĩa địa Little Hangleton | `other` | — | — |
| `P-1388a8951a3c11` | Nhà Gaunt | `other` | — | — |


### 5.8. Britain › England › London › Bệnh viện St Mungo › Tầng 1 (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/7` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-aec6a126a04246` | Khu điều trị thương tích do sinh vật | `other` | — | — |


### 5.9. Britain › England › London › Bệnh viện St Mungo › Tầng 2 (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/8` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-9d882410cbff44` | Khu điều trị bệnh và nhiễm trùng pháp thuật | `outdoor` | — | — |


### 5.10. Britain › England › London › Bệnh viện St Mungo › Tầng 3 (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/9` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"horizontal","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-9f4eba8cbc0134` | Khu điều trị ngộ độc độc dược và thực vật | `other` | — | — |


### 5.11. Britain › England › London › Bệnh viện St Mungo › Tầng 4 (2 địa điểm)

- **Mục tham chiếu nguồn:** `world/10` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"tee","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-a62b074fca27d7` | Khu điều trị thương tổn do bùa chú | `other` | — | — |
| `P-c7580930f2caac` | Phòng bệnh dài hạn Janus Thickey | `other` | — | — |


### 5.12. Britain › England › London › Bệnh viện St Mungo › Tầng 5 (2 địa điểm)

- **Mục tham chiếu nguồn:** `world/11` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"ell","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-fc634b366552e4` | Cửa hàng bệnh viện | `commerce` | — | — |
| `P-98946e3d409a8a` | Phòng trà khách thăm | `other` | — | — |


### 5.13. Britain › England › London › Bệnh viện St Mungo › Tầng trệt (2 địa điểm)

- **Mục tham chiếu nguồn:** `world/12` (chỉ mục trình bày, không mặc định là `scopeId` runtime)
- **Preset giữ nguyên:** `{"layout":"tee","flexible":true,"source":"illustrative"}`

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-a3e9554f74bb7f` | Sảnh tiếp nhận St Mungo | `circulation` | — | — |
| `P-1af0a04a59056b` | Khu điều trị tai nạn đồ tạo tác | `other` | — | — |


### 5.14. Britain › England › London › Cửa ngõ và ga (4 địa điểm)

- **Mục tham chiếu nguồn:** `world/13` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-2236da8489dfad` | Quán cà phê Tottenham Court Road | `commerce` | — | — |
| `P-a91d33c0729151` | Charing Cross Road | `other` | — | — |
| `P-13cff25cacf38f` | Ga Paddington | `other` | — | — |
| `P-23a728f27029ae` | Tottenham Court Road | `other` | — | — |


### 5.15. Britain › England › London › Địa điểm khác (5 địa điểm)

- **Mục tham chiếu nguồn:** `world/14` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-000814ab7a3200` | Số 10 Downing Street / văn phòng Thủ tướng Muggle | `administration` | — | — |
| `P-561f5bd89f1fb7` | Văn phòng quản lý trại trẻ | `administration` | — | — |
| `P-8f6fe8ad4cc0c0` | Phòng Tom Riddle ở trại trẻ | `other` | — | — |
| `P-851acac2ec7f8b` | Purge and Dowse (mặt tiền St Mungo) | `other` | — | — |
| `P-ee2064eb7e377a` | Trại trẻ mồ côi của Tom Riddle | `other` | — | — |


### 5.16. Britain › England › London › Nhà ở / trụ sở (14 địa điểm)

- **Mục tham chiếu nguồn:** `world/15` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-0d84f863a32ec4` | Sảnh nhà Black | `circulation` | — | — |
| `P-e10f1f2455074a` | Nhà Diggle (địa chỉ không xác định) | `other` | — | — |
| `P-4091d06b78b915` | Nhà Granger (địa chỉ không xác định) | `other` | — | — |
| `P-5bfdb63dbfad77` | Nhà Gregorovitch (địa chỉ không xác định) | `other` | — | — |
| `P-ecc27e85264a4a` | Nhà Kingsley Shacklebolt (địa chỉ không xác định) | `other` | — | — |
| `P-8ffce1da3d07cd` | Nhà Tonks (địa chỉ không xác định) | `other` | — | — |
| `P-9b9d65883bc0bb` | Phòng khách nhà Black | `other` | — | — |
| `P-c22fddd973f9ed` | Số 11 Grimmauld Place | `other` | — | — |
| `P-c7df9592a50155` | Số 12 Grimmauld Place / nhà Black | `other` | — | — |
| `P-4f2d8576d24f18` | Số 13 Grimmauld Place | `other` | — | — |
| `P-81e49b0d4bd6c3` | Phòng ngủ khác nhà Black | `residential` | — | — |
| `P-1ba2a8427cd9a8` | Phòng ngủ Regulus Black | `residential` | — | — |
| `P-b73feb15c40870` | Phòng ngủ Sirius Black | `residential` | — | — |
| `P-501145c3fc9c8d` | Bếp nhà Black | `service` | — | — |


### 5.17. Britain › England › Surrey › Little Whinging (17 địa điểm)

- **Mục tham chiếu nguồn:** `world/16` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-2fdedba88577ad` | Công viên Little Whinging | `circulation` | — | — |
| `P-df6db152b7d063` | Gầm cầu thang nhà Dursley | `circulation` | — | — |
| `P-5cd173a0de0b12` | Little Whinging | `other` | — | — |
| `P-3733c32c66774d` | Magnolia Crescent | `other` | — | — |
| `P-424cf93d589f58` | Magnolia Road | `other` | — | — |
| `P-712dcf0d542fa9` | Nhà bà Figg | `other` | — | — |
| `P-5bc4accf8f9cfb` | Phòng ăn nhà Dursley | `other` | — | — |
| `P-7b1adb6069d328` | Phòng khách Dursley | `other` | — | — |
| `P-43ffcc1098a3aa` | Privet Drive | `other` | — | — |
| `P-89ce1f70269693` | Số 2 Magnolia Crescent (địa chỉ được nhắc) | `other` | — | — |
| `P-911d23f3180589` | Số 4 Privet Drive / nhà Dursley | `other` | — | — |
| `P-efe5e3b54c110c` | Số 7 Privet Drive | `other` | — | — |
| `P-4232fc85ff42c4` | Vườn nhà Dursley | `outdoor` | — | — |
| `P-d311ceb6407c3e` | Phòng ngủ Dudley | `residential` | — | — |
| `P-88aadc4a38ae9c` | Phòng ngủ Harry | `residential` | — | — |
| `P-57ffd05e36562d` | Phòng ngủ Vernon/Petunia | `residential` | — | — |
| `P-18feb9f615073d` | Bếp nhà Dursley | `service` | — | — |


### 5.18. Britain › England › Tây Nam › Ottery St Catchpole (19 địa điểm)

- **Mục tham chiếu nguồn:** `world/17` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-10483afb50657b` | Phòng làm việc Xenophilius | `administration` | — | — |
| `P-c11e875f2e672c` | Gác mái Hang Sóc | `other` | — | — |
| `P-0bdde710277c5f` | Hang Sóc / Nhà Weasley | `other` | — | — |
| `P-e68bc933cbfc46` | Làng Ottery St Catchpole | `other` | — | — |
| `P-e1b58685e41178` | Nhà Diggory | `other` | — | — |
| `P-223c9a29e759d3` | Nhà Fawcett | `other` | — | — |
| `P-64d0087ee0c1b2` | Nhà Lovegood | `other` | — | — |
| `P-4e78486f8e5d5c` | Phòng khách Hang Sóc | `other` | — | — |
| `P-1c6f7973221157` | Phòng Luna Lovegood | `other` | — | — |
| `P-eb0e081c67cc39` | Phòng sinh hoạt nhà Lovegood | `other` | — | — |
| `P-ff60dc5c801cf1` | Bãi chơi Quidditch sau nhà | `outdoor` | — | — |
| `P-c3f56557f43009` | Vườn Hang Sóc | `outdoor` | — | — |
| `P-e3c60767666046` | Vườn nhà Lovegood | `outdoor` | — | — |
| `P-4890242d6f09e8` | Các phòng ngủ khác Hang Sóc | `residential` | — | — |
| `P-695c706560e4fb` | Phòng ngủ Arthur & Molly | `residential` | — | — |
| `P-328fae86b7c01c` | Phòng ngủ Fred & George | `residential` | — | — |
| `P-6eac4eb0234cb3` | Phòng ngủ Ginny | `residential` | — | — |
| `P-0ebb356a309e42` | Phòng ngủ Ron | `residential` | — | — |
| `P-2e8e6fd50795cc` | Bếp Hang Sóc | `service` | — | — |


### 5.19. Britain › England › Tinworth / ven biển (7 địa điểm)

- **Mục tham chiếu nguồn:** `world/18` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-292e4cf5737a49` | Làng Tinworth | `other` | — | — |
| `P-60ff93fb1c4473` | Phòng khách Shell Cottage | `other` | — | — |
| `P-209dc8c61fa3bb` | Shell Cottage / nhà Bill và Fleur | `other` | — | — |
| `P-16ec3a57420b99` | Bờ biển gần Shell Cottage | `outdoor` | — | — |
| `P-25a2f0dc7c7eba` | Vườn Shell Cottage | `outdoor` | — | — |
| `P-7c862bcde92bda` | Phòng ngủ Shell Cottage | `residential` | — | — |
| `P-b1b448f37c4d1e` | Bếp Shell Cottage | `service` | — | — |


### 5.20. Britain › England › Wiltshire (5 địa điểm)

- **Mục tham chiếu nguồn:** `world/19` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-7ceaf0fcb836c1` | Đại sảnh Malfoy Manor | `circulation` | — | — |
| `P-cdc1a91748b387` | Hầm giam Malfoy Manor | `other` | — | — |
| `P-37846d42ec845c` | Khuôn viên Malfoy Manor | `other` | — | — |
| `P-bbfe47f234c957` | Phòng khách Malfoy Manor | `other` | — | — |
| `P-0a94eb38a5cf40` | Trang viên Malfoy | `other` | — | — |


### 5.21. Britain › Ngoài khơi, vị trí bí mật (2 địa điểm)

- **Mục tham chiếu nguồn:** `world/20` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-8957dd0847f167` | Các dãy phòng giam Azkaban | `other` | — | — |
| `P-d45c30dace5abc` | Nhà tù Azkaban | `other` | — | — |


### 5.22. Britain › Phương tiện và tuyến đường (2 địa điểm)

- **Mục tham chiếu nguồn:** `world/21` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-aa74a45869a845` | Phòng khách trên xe Buýt Hiệp Sĩ | `other` | — | — |
| `P-8d8c423e13cb3d` | Xe Buýt Hiệp Sĩ | `other` | — | — |


### 5.23. Britain › Scotland › Highlands › Hogsmeade: đường phố và cơ sở (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/22` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-65ac0b29ed7007` | Hang Sirius trú ở vùng núi gần làng | `other` | — | — |


### 5.24. Châu Âu › Vị trí không xác định › Nurmengard (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/23` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-4427f295c86374` | Nurmengard | `other` | — | — |


### 5.25. France › Trường pháp thuật (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/24` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-240c66e1c2ad19` | Beauxbatons Academy of Magic | `other` | — | — |


### 5.26. Japan › Minami Iwo Jima (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/25` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-e207e1cad9aa75` | Mahoutokoro School of Magic | `other` | — | — |


### 5.27. Khác (15 địa điểm)

- **Mục tham chiếu nguồn:** `world/26` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-3be97f06839afa` | Các lăng mộ Ai Cập mà Bill phá giải lời nguyền | `circulation` | — | — |
| `P-297d369b484bc3` | Cánh đồng World Cup Quidditch | `other` | — | — |
| `P-4ba45d2ca765ad` | Đấu trường thử thách rồng | `other` | — | — |
| `P-b86cbfbdc07271` | Hang biển của Voldemort | `other` | — | — |
| `P-f012e9d745204b` | Khu bảo vệ Hòn đá Phù thủy dưới Hogwarts | `other` | — | — |
| `P-3a8e137752a294` | Khu cắm trại Beauxbatons | `other` | — | — |
| `P-a19b8a7eea3f66` | Khu lều World Cup | `other` | — | — |
| `P-36df14fc8355e4` | Lăng mộ Dumbledore | `other` | — | — |
| `P-9b80548a6b0f27` | Phòng của Ủy ban Đăng ký Phù thủy gốc Muggle | `other` | — | — |
| `P-0286a54346e7d7` | Bãi neo tàu Durmstrang | `outdoor` | — | — |
| `P-c12015ea2dc205` | Đảo đá trong hồ hang biển | `outdoor` | — | — |
| `P-07666cff74b9d9` | Hồ ngầm trong hang biển | `outdoor` | — | — |
| `P-a575b46f2ae1a8` | Khu thử thách Hồ Đen | `outdoor` | — | — |
| `P-c4b0eda051d309` | Mê cung Tam Pháp thuật ở sân Quidditch | `outdoor` | — | — |
| `P-9ebcfc85eb0c36` | Sân vận động World Cup | `outdoor` | — | — |


### 5.28. Romania › Khu bảo tồn (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/27` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-6f37aeb5ab1ff0` | Khu nuôi/bảo tồn rồng Romania – nơi Charlie làm việc | `other` | — | — |


### 5.29. Uganda › Mountains of the Moon (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/28` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-42ca1a78fc7d46` | Uagadou School of Magic | `other` | — | — |


### 5.30. United States › Massachusetts › Trường học (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/29` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-b1a5bbf296daf9` | Ilvermorny School of Witchcraft and Wizardry | `other` | — | — |


### 5.31. United States › New York › Cơ quan pháp thuật (1 địa điểm)

- **Mục tham chiếu nguồn:** `world/30` (chỉ mục trình bày, không mặc định là `scopeId` runtime)

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-632d1664ab4804` | MACUSA Headquarters | `other` | — | — |


## 6. Địa điểm chuẩn không nằm trong các nhóm Castle/Tower/AU/World (194)

Các địa điểm này **vẫn nằm trong atlas chuẩn**, có thể thuộc template hoặc cần metadata phân vùng riêng. **Không tự gán vào nhóm mới.**

| ID | Tên địa điểm | Công dụng | Template ứng viên | Alias nguồn |
|---|---|---|---|---|
| `P-ece8b34b0783e7` | Apothecary | `other` | `diagon-knockturn` | — |
| `P-2be38007d6f246` | Apothecary tại Hogsmeade trong template | `other` | `village-static` | — |
| `P-561ef194a3cfad` | Ba Cây Chổi và các phòng của quán | `other` | `village-static` | — |
| `P-effd8342cc396c` | Bãi cỏ học tập quanh trường | `outdoor` | `h1` | — |
| `P-0d712868c509cf` | Bãi cỏ và đồng cỏ quanh Hogwarts | `outdoor` | `h1` | — |
| `P-17db50485e2b83` | Bãi cỏ ven hồ | `outdoor` | `h1` | — |
| `P-e7ebf6e1f0fcb9` | Bãi học bay | `outdoor` | `h1` | — |
| `P-6fca659549629d` | Bến ga / bến thuyền Hogsmeade ngoài khu nhà ga | `other` | `h1` | — |
| `P-7f18ace1f8b2d7` | Bến thuyền Hogwarts | `other` | `h1` | — |
| `P-7904b8045f6614` | Bìa Rừng Cấm | `outdoor` | `h1` | — |
| `P-b08a347b7ef127` | Borgin & Burkes | `other` | `diagon-knockturn` | — |
| `P-f52be73f7dd9ce` | Bộ phận Linh hồn | `outdoor` | `ministry2` | — |
| `P-5fc3c5a0bcb0d1` | Bộ phận Quái thú | `outdoor` | `ministry2` | — |
| `P-2df6c97ce86355` | Bộ phận Sinh vật có tri giác | `outdoor` | `ministry2` | — |
| `P-951dc2baa9a710` | Bộ phận Xóa trí nhớ | `outdoor` | `ministry2` | — |
| `P-59e90d8a9ccc63` | Bờ Hồ Đen | `outdoor` | `h1` | — |
| `P-f29f8a2656ded8` | Bưu điện Hogsmeade | `other` | `village-static` | — |
| `P-13ae06fd76adc5` | Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2 | `circulation` | `h1` | — |
| `P-5c5b87e483e862` | Các cơ sở Knockturn khác trong template | `other` | `diagon-knockturn` | — |
| `P-c8e6b9a47ac0b8` | Các cửa hàng hiện trong làng | `commerce` | `village-static` | — |
| `P-4df8571e5dea2e` | Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác | `outdoor` | `h1` | — |
| `P-5a4fefc72d7d57` | Các khán đài Quidditch | `other` | `pitch-static` | — |
| `P-f30d790b24b65a` | Các ngõ ở Hogsmeade | `other` | `village-static` | — |
| `P-d85dbd8c19bb3b` | Các ngõ phố nối Hẻm Xéo và Knockturn | `outdoor` | `diagon-knockturn` | — |
| `P-06a1ce678f15be` | Các nhà dân trên phố trong bản đồ Diagon | `outdoor` | `diagon-knockturn` | — |
| `P-96d14a7a982d4e` | Các nhà kính Hogwarts và các phòng bên trong | `other` | `h1` | — |
| `P-95cdaf84841bcd` | Các tiệm, xưởng, quán trong bản đồ Diagon | `commerce` | `diagon-knockturn` | — |
| `P-83c52658df2171` | Các toa Hogwarts Express | `other` | `express` | — |
| `P-c7788eabe9f16a` | Cái Vạc Lủng và các phòng trọ | `other` | `diagon-knockturn` | — |
| `P-f79a562f43d99a` | Cầu cạn Viaduct | `circulation` | `h2` | — |
| `P-5eb3bde9176879` | Cầu đá nối các cánh lâu đài | `other` | `h2` | — |
| `P-0a1ff4c2777f64` | Cầu gỗ và các cầu nối thuộc khối lâu đài | `other` | `h2` | — |
| `P-91ec4108625f7b` | Câu lạc bộ Gobstones chính thức | `outdoor` | `ministry2` | — |
| `P-6a9cb408f9f168` | Cầu thang trong khu Gryffindor | `circulation` | `gryffindor-common` | — |
| `P-9f810bb6686c6d` | Cây cổ thụ ven hồ | `other` | `h1` | — |
| `P-ae87f1280dad9c` | Cổng chính Hogwarts | `circulation` | `h2` | — |
| `P-da0766f575a2ce` | Cơ quan Khóa Cảng | `commerce` | `ministry2` | — |
| `P-936cbb9c617eca` | Dãy phòng phụ của sân | `other` | `pitch-static` | — |
| `P-8de3a27d58bad8` | Dervish & Banges | `other` | `village-static` | — |
| `P-81a969eb658163` | Đầu Heo và các phòng của quán | `other` | `village-static` | — |
| `P-00020cadb6235e` | Đầu máy Hogwarts Express | `other` | `express` | — |
| `P-6f640309d1ece1` | Đội Đảo ngược Tai nạn Pháp thuật | `other` | `ministry2` | — |
| `P-385234641b8727` | Đường dạo ngoài trời quanh Hogwarts | `other` | `h1` | — |
| `P-9c45a4f54ea1ee` | Đường dạo ven hồ | `other` | `h1` | — |
| `P-6ac732451f03d7` | Đường đi ngoài các tường bao lâu đài | `other` | `h1` | — |
| `P-31f204a8e0e490` | Đường giữa các nhà kính | `other` | `h1` | — |
| `P-d76cff03ee7601` | Đường mòn giữa Hogwarts và Hogsmeade | `other` | `h1` | — |
| `P-63aa8852e10090` | Đường mòn Rừng Cấm | `outdoor` | `h1` | — |
| `P-7debd31a87a61e` | Đường tới lều Hagrid | `other` | `h1` | — |
| `P-ff62bf19892de9` | Đường tới nhà ga Hogsmeade | `other` | `h1` | — |
| `P-c061b81bba5c42` | Đường tới sân Quidditch | `outdoor` | `h1` | — |
| `P-83b46b70fcdcc6` | Eeylops Owl Emporium | `other` | `diagon-knockturn` | — |
| `P-065a853b8d7608` | Florean Fortescue’s | `other` | `diagon-knockturn` | — |
| `P-b652531fad15ad` | Flourish & Blotts | `other` | `diagon-knockturn` | — |
| `P-94a7036730f10e` | Ga Hogsmeade | `other` | `express` | — |
| `P-f4ef10f0794466` | Gambol & Japes | `other` | `diagon-knockturn` | — |
| `P-6e4b06065f0997` | Gian chờ trước Phân loại | `outdoor` | `hall` | — |
| `P-14c5870146b747` | Gian chứa chổi / kho chổi | `storage` | `hall` | — |
| `P-8bd319c866a655` | Gladrags | `other` | `village-static` | — |
| `P-4cb1d44097aaf0` | Gringotts và hệ thống hầm / kho tiền | `storage` | `diagon-knockturn` | — |
| `P-1ecd945e2b86b7` | Hai sân trong lâu đài | `outdoor` | `h2` | — |
| `P-1cbafaf3eaef87` | Hành lang chung Slytherin dưới hồ | `circulation` | `slytherin-common` | — |
| `P-cabb450c67c344` | Hành lang chung trong khu Hufflepuff | `circulation` | `hufflepuff-common` | — |
| `P-a04785690fe84b` | Hành lang toa | `circulation` | `express` | — |
| `P-71db87f76e608b` | Hẻm Knockturn | `other` | `diagon-knockturn` | — |
| `P-046c1c72bb9fc9` | Hẻm Xéo | `other` | `diagon-knockturn` | — |
| `P-ea0d1c088bb35d` | Hogwarts Express | `other` | `express` | — |
| `P-ce64687addd09a` | Honeydukes và tầng hầm | `other` | `village-static` | — |
| `P-30cf89999f5e15` | Hồ Đen | `outdoor` | `h1` | — |
| `P-cf86b4537874ba` | Kho chổi tại sân | `storage` | `pitch-static` | — |
| `P-cc0a4d9d894357` | Kho tiền 713 | `storage` | `diagon-knockturn` | — |
| `P-fde802b26605cc` | Kho tiền gia đình Potter | `storage` | `diagon-knockturn` | — |
| `P-1db46d6df4495f` | Kho tiền Lestrange | `storage` | `diagon-knockturn` | — |
| `P-8fd3daca88a6f1` | Khoảng rừng sâu | `outdoor` | `h1` | — |
| `P-dadcf596a0437f` | Khu an ninh Bộ Pháp thuật | `outdoor` | `ministry-8-10` | — |
| `P-09b9d228df78c4` | Khu bình luận / phòng bình luận | `other` | `pitch-static` | — |
| `P-dafe46b4834d00` | Khu chờ lên tàu tại King’s Cross | `outdoor` | `express` | — |
| `P-da0da47f74a252` | Khu đọc và học nhóm bên trong khu Ravenclaw | `study` | `ravenclaw-common` | — |
| `P-b063050bb041b4` | Khu đọc và học nhóm bên trong khu Slytherin | `study` | `slytherin-common` | — |
| `P-df6ec24bb2876c` | Khu giao thông Floo Bộ Pháp thuật | `outdoor` | `ministry-8-10` | — |
| `P-80b97fa352d930` | Khu hành chính Wizengamot | `other` | `ministry2` | — |
| `P-18305f9ea8f94d` | Khu học nhóm bên trong khu Hufflepuff | `study` | `hufflepuff-common` | — |
| `P-81c7ab0cff5ac4` | Khu nhà dân Hogsmeade | `other` | `village-static` | — |
| `P-52b6fe3a29d440` | Khu nhân mã trong Rừng Cấm | `outdoor` | `h1` | — |
| `P-8c15e0bfc2d11d` | Khu ổ nhện Aragog | `other` | `h1` | — |
| `P-337a20429f7b9d` | Khu sinh hoạt và học nhóm bên trong khu Gryffindor | `study` | `gryffindor-common` | — |
| `P-dfec82bd2d4f53` | Khu thương mại / luật quốc tế | `other` | `ministry2` | — |
| `P-c251f1aa2096c0` | Khu tiếp nhận khách Bộ Pháp thuật | `outdoor` | `ministry-8-10` | — |
| `P-a8f847e818afa1` | King’s Cross | `other` | `express` | — |
| `P-143a2447e31c2c` | Lều Hagrid và các phòng bên trong | `other` | `h1` | — |
| `P-79710fe4d4bcfa` | Lều Hú và các phòng bên trong | `other` | `village-static` | — |
| `P-9fffb1aaa57eea` | Liễu Roi và bãi đất quanh cây | `outdoor` | `h1` | — |
| `P-bb3906692ce0a3` | Lối đi và bãi đất ven hồ | `circulation` | `h1` | — |
| `P-f9359f86975e71` | Lối đi và sân trong ranh khu Quidditch | `circulation` | `pitch-static` | — |
| `P-d216ce626788ed` | Lối lên Cầu thang Lớn tại Tiền sảnh | `circulation` | `hall` | — |
| `P-cc5bcc4d694457` | Lối lên Nhà cú | `circulation` | `h1` | — |
| `P-27cbd65e002cd1` | Lối nối giữa các toa | `circulation` | `express` | — |
| `P-0006dd26862fbe` | Lối vào Rừng Cấm | `circulation` | `h1` | — |
| `P-c342fdc0ef620b` | Madam Malkin’s | `other` | `diagon-knockturn` | — |
| `P-c2473d02e0de42` | Magical Menagerie | `other` | `diagon-knockturn` | — |
| `P-8f7588d4e8a5bc` | Mặt hồ và khu vực trên thuyền | `outdoor` | `h1` | — |
| `P-6575df3a62913f` | Mặt sân thi đấu | `outdoor` | `pitch-static` | — |
| `P-226721c1fff80c` | Mọi buồng hành khách trong các toa | `other` | `express` | — |
| `P-f8ed3dbe20d357` | Ngoại thất khối lâu đài Hogwarts | `other` | `h2` | — |
| `P-f322d7e98b6a02` | Nhà cú và khu vực bên trong Nhà cú | `other` | `h1` | — |
| `P-197b2052678b9d` | Nhà dân trong template làng | `other` | `village-static` | — |
| `P-0fe532e3c7b3e8` | Nhà dân và ngõ ở Knockturn | `other` | `diagon-knockturn` | — |
| `P-47576b791ebc5b` | Nhà ga Hogsmeade | `other` | `express` | — |
| `P-9bf6e71ff3108b` | Nhà thuyền Hogwarts | `other` | `h1` | — |
| `P-04180946d36a33` | Ollivanders | `other` | `diagon-knockturn` | — |
| `P-bf3c24a146fb6a` | Phòng chờ xét xử | `outdoor` | `ministry-8-10` | — |
| `P-86e7455d5f7d47` | Phòng giáo viên | `other` | `hall` | — |
| `P-241e2fa15a09f1` | Phòng hỗ trợ xử án | `outdoor` | `ministry-8-10` | — |
| `P-f6ff23e797445d` | Phòng Không gian | `other` | `ministry-8-10` | — |
| `P-fd24a44f33135c` | Phòng Não | `other` | `ministry-8-10` | — |
| `P-95936a141ed516` | Phòng sau bàn giáo viên | `other` | `hall` | — |
| `P-e27a6e6c098632` | Phòng thay đồ các đội | `other` | `pitch-static` | — |
| `P-638d3d8f890b97` | Phòng thay đồ đội A | `other` | `pitch-static` | — |
| `P-12d570650689e2` | Phòng thay đồ đội B | `other` | `pitch-static` | — |
| `P-86cd9a8defbb03` | Phòng Thời gian | `other` | `ministry-8-10` | — |
| `P-2c9c4c00c1d80b` | Phòng Tình yêu / phòng khóa kín | `other` | `ministry-8-10` | — |
| `P-bd4a42764da881` | Phòng Tử thần | `other` | `ministry-8-10` | — |
| `P-9805ab2f38804f` | Phòng xử án số 10 | `other` | `ministry-8-10` | — |
| `P-5e1f1cc14a2adb` | Phố chính Hogsmeade | `outdoor` | `village-static` | — |
| `P-bdd56dfa509b7c` | Potage’s Cauldrons | `other` | `diagon-knockturn` | — |
| `P-c97880d2883d88` | Quality Quidditch Supplies | `other` | `diagon-knockturn` | — |
| `P-05c90391d35da8` | Quản lý Chổi bay | `commerce` | `ministry2` | — |
| `P-28dd4f052c2855` | Quán trà Madam Puddifoot | `commerce` | `village-static` | — |
| `P-d2a51c4e5a9cd6` | Quảng trường Hogsmeade | `other` | `village-static` | — |
| `P-c089c78b883a86` | Sảnh Tiên tri | `circulation` | `ministry-8-10` | — |
| `P-0880e4fe3da124` | Sảnh tiếp cận Đại Sảnh | `circulation` | `hall` | — |
| `P-1901b8ad031d44` | Sảnh tiếp đón Bộ Pháp thuật | `circulation` | `ministry-8-10` | — |
| `P-44a4a4856bc09b` | Sảnh tròn xoay | `circulation` | `ministry-8-10` | — |
| `P-8fd2ba76f6cef8` | Sảnh trong khu Ravenclaw | `circulation` | `ravenclaw-common` | — |
| `P-38bf6be09df746` | Sân Bell Tower (Tháp Chuông) | `outdoor` | `h2` | — |
| `P-f6319cb5ddb159` | Sân chân tháp trong khối lâu đài | `outdoor` | `h2` | — |
| `P-de97c63af46b5c` | Sân Clock Tower (Đồng hồ) | `outdoor` | `h2` | — |
| `P-8153c1a6e4e7dc` | Sân cỏ cạnh lâu đài | `outdoor` | `h1` | — |
| `P-3a9add588aa69a` | Sân ga 9¾ | `outdoor` | `express` | — |
| `P-b879bbed8fdc49` | Sân ga Hogsmeade (khu tàu) | `outdoor` | `express` | — |
| `P-33d82440a9be50` | Sân giữa các cánh lâu đài | `outdoor` | `h2` | — |
| `P-442f7275b6c832` | Sân Mistletoe | `outdoor` | `h2` | — |
| `P-501e057d5be6b1` | Sân Quad | `outdoor` | `h2` | — |
| `P-7abe41594af2ff` | Sân Quidditch | `outdoor` | `pitch-static` | — |
| `P-dbdb26cb4f253a` | Sân sau Cái Vạc Lủng | `outdoor` | `diagon-knockturn` | — |
| `P-eeb5352311e7c0` | Sân tập nhỏ trong quần thể Quidditch | `outdoor` | `pitch-static` | — |
| `P-6d6cfd0e60241f` | Sân Transfiguration (Biến hình) | `outdoor` | `h2` | — |
| `P-ba63b94f595caf` | Sân trong gắn với map hall | `outdoor` | `hall` | — |
| `P-399f2c035627f1` | Sân trước lâu đài trong khu cổng | `outdoor` | `h2` | — |
| `P-5daf783e1e1f28` | Sân vào lâu đài trong khu cổng | `outdoor` | `h2` | — |
| `P-bca1f1945d52e9` | Sân Viaduct | `outdoor` | `h2` | — |
| `P-585c0776dc54a3` | Sân Wyvern | `outdoor` | `h2` | — |
| `P-57a63e2aaa9159` | Scribbulus | `other` | `diagon-knockturn` | — |
| `P-eb74631b825f74` | Scrivenshaft’s | `other` | `village-static` | — |
| `P-10ca277b3be7f2` | Tầng 1 – Văn phòng Bộ trưởng | `administration` | `ministry2` | — |
| `P-4fee03ab76bb30` | Tầng 10 – Khu xử án | `other` | `ministry-8-10` | — |
| `P-adc8756e94687f` | Tầng 2 – Thi hành Luật Pháp thuật | `other` | `ministry2` | — |
| `P-8372c04e802fdc` | Tầng 3 – Tai nạn và Thảm họa Pháp thuật | `other` | `ministry2` | — |
| `P-4d4b012a451ee2` | Tầng 4 – Điều hòa và Kiểm soát Sinh vật | `other` | `ministry2` | — |
| `P-3d600b63857ca0` | Tầng 5 – Hợp tác Pháp thuật Quốc tế | `other` | `ministry2` | — |
| `P-4247829f4f87d7` | Tầng 6 – Giao thông Pháp thuật | `other` | `ministry2` | — |
| `P-8f8a0811461a67` | Tầng 7 – Trò chơi và Thể thao Pháp thuật | `other` | `ministry2` | — |
| `P-5b000833260ab3` | Tầng 8 – Atrium | `other` | `ministry-8-10` | — |
| `P-1bd95d9a21aa0e` | Tầng 9 – Bộ Bảo mật | `outdoor` | `ministry-8-10` | — |
| `P-9253053d400539` | Tiệm áo chùng cũ | `commerce` | `diagon-knockturn` | — |
| `P-2b888eaec42438` | Tiệm bút lông và giấy da | `commerce` | `diagon-knockturn` | — |
| `P-5d33c248682e4b` | Tiệm cổ vật / cầm đồ tại Knockturn | `commerce` | `diagon-knockturn` | — |
| `P-1b93d2a168cc1a` | Tiệm đồ cũ | `commerce` | `diagon-knockturn` | — |
| `P-660382eb5d124f` | Tiền sảnh | `circulation` | `hall` | — |
| `P-38988e75264a65` | Toa mẫu Gryffindor | `other` | `express` | — |
| `P-e1641c684d1741` | Toa mẫu Hufflepuff | `other` | `express` | — |
| `P-aab0be0508401d` | Toa mẫu Ravenclaw | `other` | `express` | — |
| `P-c901ae9bd25828` | Toa mẫu Slytherin | `other` | `express` | — |
| `P-5889d83ab64879` | Toa thường | `other` | `express` | — |
| `P-f66347f72f87d0` | Trụ sở Liên đoàn Quidditch Anh–Ireland | `other` | `ministry2` | — |
| `P-af6716662de8c8` | Trụ sở Thần Sáng | `other` | `ministry2` | — |
| `P-58bb45e6da0252` | Twilfitt & Tatting’s | `other` | `diagon-knockturn` | — |
| `P-9301236b54857d` | Ủy ban Biện minh với Muggle | `other` | `ministry2` | — |
| `P-3e401191d71800` | Văn phòng Bằng sáng chế Lố bịch | `administration` | `ministry2` | — |
| `P-13dfea8fe4bf27` | Văn phòng Cấp phép Độn thổ | `administration` | `ministry2` | — |
| `P-444469fe1666f1` | Văn phòng Lạm dụng Đồ tạo tác Muggle | `administration` | `ministry2` | — |
| `P-a3d0329c5db5e2` | Văn phòng Liên lạc Pháp thuật Quốc tế | `administration` | `ministry2` | — |
| `P-76e93cc0236521` | Văn phòng Liên lạc Yêu tinh | `administration` | `ministry2` | — |
| `P-58ba0981b28173` | Văn phòng Mạng Floo | `administration` | `ministry2` | — |
| `P-ad6b222c1cf8e4` | Văn phòng Sử dụng Pháp thuật Sai trái | `administration` | `ministry2` | — |
| `P-f9c67c9c540345` | Văn phòng Thứ trưởng / trợ lý Bộ trưởng | `administration` | `ministry2` | — |
| `P-873b198808d71f` | Văn phòng Tư vấn Sinh vật gây hại | `administration` | `ministry2` | — |
| `P-9c19f623bbb1e3` | Vùng sát sân Quidditch ngoài ranh sân | `outdoor` | `h1` | — |
| `P-1174317bcb3096` | Vườn bí Hagrid | `outdoor` | `h1` | — |
| `P-29bc58039f5eae` | Vườn cây gần nhà kính | `outdoor` | `h1` | — |
| `P-b830cb70ee02f6` | Vườn nhà Hagrid | `outdoor` | `h1` | — |
| `P-f2d3a414a25b76` | Vườn Thảo dược | `outdoor` | `h1` | — |
| `P-5a0ec074efb106` | Weasleys’ Wizard Wheezes (nếu tồn tại theo thời kỳ) | `other` | `diagon-knockturn` | — |
| `P-633d0bcb4ab87e` | Zonko’s | `other` | `village-static` | — |

## 7. Template — Tham chiếu địa điểm, không nhân bản

### 7. `h1` — Hogwarts và vùng phụ cận — ngoài trời (39 tham chiếu)

- `P-e7ebf6e1f0fcb9` · Bãi học bay
- `P-effd8342cc396c` · Bãi cỏ học tập quanh trường
- `P-8153c1a6e4e7dc` · Sân cỏ cạnh lâu đài
- `P-0d712868c509cf` · Bãi cỏ và đồng cỏ quanh Hogwarts
- `P-385234641b8727` · Đường dạo ngoài trời quanh Hogwarts
- `P-d76cff03ee7601` · Đường mòn giữa Hogwarts và Hogsmeade
- `P-ff62bf19892de9` · Đường tới nhà ga Hogsmeade
- `P-0006dd26862fbe` · Lối vào Rừng Cấm
- `P-7904b8045f6614` · Bìa Rừng Cấm
- `P-63aa8852e10090` · Đường mòn Rừng Cấm
- `P-8fd3daca88a6f1` · Khoảng rừng sâu
- `P-52b6fe3a29d440` · Khu nhân mã trong Rừng Cấm
- `P-8c15e0bfc2d11d` · Khu ổ nhện Aragog
- `P-30cf89999f5e15` · Hồ Đen
- `P-8f7588d4e8a5bc` · Mặt hồ và khu vực trên thuyền
- `P-59e90d8a9ccc63` · Bờ Hồ Đen
- `P-9c45a4f54ea1ee` · Đường dạo ven hồ
- `P-17db50485e2b83` · Bãi cỏ ven hồ
- `P-7f18ace1f8b2d7` · Bến thuyền Hogwarts
- `P-9bf6e71ff3108b` · Nhà thuyền Hogwarts
- `P-9f810bb6686c6d` · Cây cổ thụ ven hồ
- `P-bb3906692ce0a3` · Lối đi và bãi đất ven hồ
- `P-143a2447e31c2c` · Lều Hagrid và các phòng bên trong
- `P-1174317bcb3096` · Vườn bí Hagrid
- `P-b830cb70ee02f6` · Vườn nhà Hagrid
- `P-7debd31a87a61e` · Đường tới lều Hagrid
- `P-96d14a7a982d4e` · Các nhà kính Hogwarts và các phòng bên trong
- `P-f2d3a414a25b76` · Vườn Thảo dược
- `P-29bc58039f5eae` · Vườn cây gần nhà kính
- `P-31f204a8e0e490` · Đường giữa các nhà kính
- `P-f322d7e98b6a02` · Nhà cú và khu vực bên trong Nhà cú
- `P-cc5bcc4d694457` · Lối lên Nhà cú
- `P-9fffb1aaa57eea` · Liễu Roi và bãi đất quanh cây
- `P-9c19f623bbb1e3` · Vùng sát sân Quidditch ngoài ranh sân
- `P-c061b81bba5c42` · Đường tới sân Quidditch
- `P-6ac732451f03d7` · Đường đi ngoài các tường bao lâu đài
- `P-13ae06fd76adc5` · Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2
- `P-6fca659549629d` · Bến ga / bến thuyền Hogsmeade ngoài khu nhà ga
- `P-4df8571e5dea2e` · Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác


### 7. `h2` — Lâu đài Hogwarts — khối kiến trúc, sân trong và cầu (17 tham chiếu)

- `P-f8ed3dbe20d357` · Ngoại thất khối lâu đài Hogwarts
- `P-399f2c035627f1` · Sân trước lâu đài trong khu cổng
- `P-5daf783e1e1f28` · Sân vào lâu đài trong khu cổng
- `P-bca1f1945d52e9` · Sân Viaduct
- `P-6d6cfd0e60241f` · Sân Transfiguration (Biến hình)
- `P-38bf6be09df746` · Sân Bell Tower (Tháp Chuông)
- `P-501e057d5be6b1` · Sân Quad
- `P-de97c63af46b5c` · Sân Clock Tower (Đồng hồ)
- `P-585c0776dc54a3` · Sân Wyvern
- `P-442f7275b6c832` · Sân Mistletoe
- `P-1ecd945e2b86b7` · Hai sân trong lâu đài
- `P-f79a562f43d99a` · Cầu cạn Viaduct
- `P-5eb3bde9176879` · Cầu đá nối các cánh lâu đài
- `P-0a1ff4c2777f64` · Cầu gỗ và các cầu nối thuộc khối lâu đài
- `P-ae87f1280dad9c` · Cổng chính Hogwarts
- `P-33d82440a9be50` · Sân giữa các cánh lâu đài
- `P-f6319cb5ddb159` · Sân chân tháp trong khối lâu đài


### 7. `hall` — Tầng trệt & Đại Sảnh Hogwarts (12 tham chiếu)

- `HOG-TNG1-S-02` · Đại Sảnh (Great Hall)
- `P-660382eb5d124f` · Tiền sảnh
- `P-0880e4fe3da124` · Sảnh tiếp cận Đại Sảnh
- `P-6e4b06065f0997` · Gian chờ trước Phân loại
- `P-ce57067fcd107f` · Phòng nhỏ cạnh Đại Sảnh
- `P-95936a141ed516` · Phòng sau bàn giáo viên
- `P-86e7455d5f7d47` · Phòng giáo viên
- `HOG-TNG1-S-06` · Văn phòng Filch
- `P-5fc25ea9745ef9` · Phòng học số 11
- `P-14c5870146b747` · Gian chứa chổi / kho chổi
- `P-ba63b94f595caf` · Sân trong gắn với map hall
- `P-d216ce626788ed` · Lối lên Cầu thang Lớn tại Tiền sảnh


### 7. `gryffindor-common` — Gryffindor · phòng chung và phòng ngủ (5 tham chiếu)

- `P-441745282e9e54` · Phòng sinh hoạt chung Gryffindor
- `P-a63fc4014d765b` · Ký túc nam Gryffindor
- `P-468097e3d74bf1` · Ký túc nữ Gryffindor
- `P-6a9cb408f9f168` · Cầu thang trong khu Gryffindor
- `P-337a20429f7b9d` · Khu sinh hoạt và học nhóm bên trong khu Gryffindor


### 7. `ravenclaw-common` — Ravenclaw · phòng chung và phòng ngủ (5 tham chiếu)

- `P-4bde45f1a1cb07` · Phòng sinh hoạt chung Ravenclaw
- `P-439400ea5f0cd4` · Ký túc nam Ravenclaw
- `P-7d130cc86d97eb` · Ký túc nữ Ravenclaw
- `P-8fd2ba76f6cef8` · Sảnh trong khu Ravenclaw
- `P-da0da47f74a252` · Khu đọc và học nhóm bên trong khu Ravenclaw


### 7. `hufflepuff-common` — Hufflepuff · phòng chung và phòng ngủ (5 tham chiếu)

- `P-1795bc600c2b41` · Phòng sinh hoạt chung Hufflepuff
- `P-ebceb992eb9255` · Ký túc nam Hufflepuff
- `P-b4314de4234c88` · Ký túc nữ Hufflepuff
- `P-cabb450c67c344` · Hành lang chung trong khu Hufflepuff
- `P-18305f9ea8f94d` · Khu học nhóm bên trong khu Hufflepuff


### 7. `slytherin-common` — Slytherin · phòng chung và phòng ngủ (5 tham chiếu)

- `P-80ce1ea13c2632` · Phòng sinh hoạt chung Slytherin
- `P-6b050b321ff558` · Ký túc nam Slytherin
- `P-a6425ebd843fab` · Ký túc nữ Slytherin
- `P-1cbafaf3eaef87` · Hành lang chung Slytherin dưới hồ
- `P-b063050bb041b4` · Khu đọc và học nhóm bên trong khu Slytherin


### 7. `village-static` — Làng Hogsmeade (17 tham chiếu)

- `P-5e1f1cc14a2adb` · Phố chính Hogsmeade
- `P-d2a51c4e5a9cd6` · Quảng trường Hogsmeade
- `P-f30d790b24b65a` · Các ngõ ở Hogsmeade
- `P-81c7ab0cff5ac4` · Khu nhà dân Hogsmeade
- `P-197b2052678b9d` · Nhà dân trong template làng
- `P-ce64687addd09a` · Honeydukes và tầng hầm
- `P-633d0bcb4ab87e` · Zonko’s
- `P-8bd319c866a655` · Gladrags
- `P-eb74631b825f74` · Scrivenshaft’s
- `P-f29f8a2656ded8` · Bưu điện Hogsmeade
- `P-561ef194a3cfad` · Ba Cây Chổi và các phòng của quán
- `P-8de3a27d58bad8` · Dervish & Banges
- `P-81a969eb658163` · Đầu Heo và các phòng của quán
- `P-28dd4f052c2855` · Quán trà Madam Puddifoot
- `P-79710fe4d4bcfa` · Lều Hú và các phòng bên trong
- `P-c8e6b9a47ac0b8` · Các cửa hàng hiện trong làng
- `P-2be38007d6f246` · Apothecary tại Hogsmeade trong template


### 7. `pitch-static` — Sân Quidditch · toàn khu (11 tham chiếu)

- `P-7abe41594af2ff` · Sân Quidditch
- `P-6575df3a62913f` · Mặt sân thi đấu
- `P-5a4fefc72d7d57` · Các khán đài Quidditch
- `P-09b9d228df78c4` · Khu bình luận / phòng bình luận
- `P-638d3d8f890b97` · Phòng thay đồ đội A
- `P-12d570650689e2` · Phòng thay đồ đội B
- `P-e27a6e6c098632` · Phòng thay đồ các đội
- `P-cf86b4537874ba` · Kho chổi tại sân
- `P-936cbb9c617eca` · Dãy phòng phụ của sân
- `P-eeb5352311e7c0` · Sân tập nhỏ trong quần thể Quidditch
- `P-f9359f86975e71` · Lối đi và sân trong ranh khu Quidditch


### 7. `express` — Ga và Hogwarts Express (17 tham chiếu)

- `P-a8f847e818afa1` · King’s Cross
- `P-3a9add588aa69a` · Sân ga 9¾
- `P-dafe46b4834d00` · Khu chờ lên tàu tại King’s Cross
- `P-ea0d1c088bb35d` · Hogwarts Express
- `P-00020cadb6235e` · Đầu máy Hogwarts Express
- `P-83c52658df2171` · Các toa Hogwarts Express
- `P-5889d83ab64879` · Toa thường
- `P-38988e75264a65` · Toa mẫu Gryffindor
- `P-aab0be0508401d` · Toa mẫu Ravenclaw
- `P-e1641c684d1741` · Toa mẫu Hufflepuff
- `P-c901ae9bd25828` · Toa mẫu Slytherin
- `P-226721c1fff80c` · Mọi buồng hành khách trong các toa
- `P-a04785690fe84b` · Hành lang toa
- `P-27cbd65e002cd1` · Lối nối giữa các toa
- `P-94a7036730f10e` · Ga Hogsmeade
- `P-b879bbed8fdc49` · Sân ga Hogsmeade (khu tàu)
- `P-47576b791ebc5b` · Nhà ga Hogsmeade


### 7. `diagon-knockturn` — Diagon Alley & Knockturn Alley (31 tham chiếu)

- `P-046c1c72bb9fc9` · Hẻm Xéo
- `P-71db87f76e608b` · Hẻm Knockturn
- `P-d85dbd8c19bb3b` · Các ngõ phố nối Hẻm Xéo và Knockturn
- `P-c7788eabe9f16a` · Cái Vạc Lủng và các phòng trọ
- `P-dbdb26cb4f253a` · Sân sau Cái Vạc Lủng
- `P-4cb1d44097aaf0` · Gringotts và hệ thống hầm / kho tiền
- `P-cc0a4d9d894357` · Kho tiền 713
- `P-fde802b26605cc` · Kho tiền gia đình Potter
- `P-1db46d6df4495f` · Kho tiền Lestrange
- `P-04180946d36a33` · Ollivanders
- `P-b652531fad15ad` · Flourish & Blotts
- `P-c342fdc0ef620b` · Madam Malkin’s
- `P-c97880d2883d88` · Quality Quidditch Supplies
- `P-83b46b70fcdcc6` · Eeylops Owl Emporium
- `P-c2473d02e0de42` · Magical Menagerie
- `P-bdd56dfa509b7c` · Potage’s Cauldrons
- `P-065a853b8d7608` · Florean Fortescue’s
- `P-f4ef10f0794466` · Gambol & Japes
- `P-5a0ec074efb106` · Weasleys’ Wizard Wheezes (nếu tồn tại theo thời kỳ)
- `P-58bb45e6da0252` · Twilfitt & Tatting’s
- `P-57a63e2aaa9159` · Scribbulus
- `P-ece8b34b0783e7` · Apothecary
- `P-1b93d2a168cc1a` · Tiệm đồ cũ
- `P-9253053d400539` · Tiệm áo chùng cũ
- `P-2b888eaec42438` · Tiệm bút lông và giấy da
- `P-95cdaf84841bcd` · Các tiệm, xưởng, quán trong bản đồ Diagon
- `P-06a1ce678f15be` · Các nhà dân trên phố trong bản đồ Diagon
- `P-b08a347b7ef127` · Borgin & Burkes
- `P-5d33c248682e4b` · Tiệm cổ vật / cầm đồ tại Knockturn
- `P-5c5b87e483e862` · Các cơ sở Knockturn khác trong template
- `P-0fe532e3c7b3e8` · Nhà dân và ngõ ở Knockturn


### 7. `ministry2` — Bộ Pháp thuật · tầng 1–7 (29 tham chiếu)

- `P-10ca277b3be7f2` · Tầng 1 – Văn phòng Bộ trưởng
- `P-f9c67c9c540345` · Văn phòng Thứ trưởng / trợ lý Bộ trưởng
- `P-adc8756e94687f` · Tầng 2 – Thi hành Luật Pháp thuật
- `P-af6716662de8c8` · Trụ sở Thần Sáng
- `P-ad6b222c1cf8e4` · Văn phòng Sử dụng Pháp thuật Sai trái
- `P-444469fe1666f1` · Văn phòng Lạm dụng Đồ tạo tác Muggle
- `P-80b97fa352d930` · Khu hành chính Wizengamot
- `P-8372c04e802fdc` · Tầng 3 – Tai nạn và Thảm họa Pháp thuật
- `P-6f640309d1ece1` · Đội Đảo ngược Tai nạn Pháp thuật
- `P-951dc2baa9a710` · Bộ phận Xóa trí nhớ
- `P-9301236b54857d` · Ủy ban Biện minh với Muggle
- `P-4d4b012a451ee2` · Tầng 4 – Điều hòa và Kiểm soát Sinh vật
- `P-5fc3c5a0bcb0d1` · Bộ phận Quái thú
- `P-2df6c97ce86355` · Bộ phận Sinh vật có tri giác
- `P-f52be73f7dd9ce` · Bộ phận Linh hồn
- `P-76e93cc0236521` · Văn phòng Liên lạc Yêu tinh
- `P-873b198808d71f` · Văn phòng Tư vấn Sinh vật gây hại
- `P-3d600b63857ca0` · Tầng 5 – Hợp tác Pháp thuật Quốc tế
- `P-dfec82bd2d4f53` · Khu thương mại / luật quốc tế
- `P-a3d0329c5db5e2` · Văn phòng Liên lạc Pháp thuật Quốc tế
- `P-4247829f4f87d7` · Tầng 6 – Giao thông Pháp thuật
- `P-58ba0981b28173` · Văn phòng Mạng Floo
- `P-05c90391d35da8` · Quản lý Chổi bay
- `P-da0766f575a2ce` · Cơ quan Khóa Cảng
- `P-13dfea8fe4bf27` · Văn phòng Cấp phép Độn thổ
- `P-8f8a0811461a67` · Tầng 7 – Trò chơi và Thể thao Pháp thuật
- `P-f66347f72f87d0` · Trụ sở Liên đoàn Quidditch Anh–Ireland
- `P-91ec4108625f7b` · Câu lạc bộ Gobstones chính thức
- `P-3e401191d71800` · Văn phòng Bằng sáng chế Lố bịch


### 7. `ministry-8-10` — Bộ Pháp thuật · tầng 8–10 (17 tham chiếu)

- `P-5b000833260ab3` · Tầng 8 – Atrium
- `P-1901b8ad031d44` · Sảnh tiếp đón Bộ Pháp thuật
- `P-dadcf596a0437f` · Khu an ninh Bộ Pháp thuật
- `P-df6ec24bb2876c` · Khu giao thông Floo Bộ Pháp thuật
- `P-c251f1aa2096c0` · Khu tiếp nhận khách Bộ Pháp thuật
- `P-1bd95d9a21aa0e` · Tầng 9 – Bộ Bảo mật
- `P-44a4a4856bc09b` · Sảnh tròn xoay
- `P-86cd9a8defbb03` · Phòng Thời gian
- `P-c089c78b883a86` · Sảnh Tiên tri
- `P-bd4a42764da881` · Phòng Tử thần
- `P-fd24a44f33135c` · Phòng Não
- `P-f6ff23e797445d` · Phòng Không gian
- `P-2c9c4c00c1d80b` · Phòng Tình yêu / phòng khóa kín
- `P-4fee03ab76bb30` · Tầng 10 – Khu xử án
- `P-9805ab2f38804f` · Phòng xử án số 10
- `P-bf3c24a146fb6a` · Phòng chờ xét xử
- `P-241e2fa15a09f1` · Phòng hỗ trợ xử án


## 8. Các alias đã gộp đúng (21 địa điểm nguồn cũ)
| ID chuẩn được giữ | Tên | ID nguồn cũ (alias) |
|---|---|---|
| `HOG-TNG1-S-06` | Văn phòng Filch | `P-5e20349a56bd1b` |
| `HOG-TNG1-S-02` | Đại Sảnh (Great Hall) | `P-bd27aa15491ba5` |
| `P-ce57067fcd107f` | Phòng nhỏ cạnh Đại Sảnh | `HOG-TNG1-S-04` |
| `HOG-TNG8-W-01` | CCC 07.18 | `P-7dbd9dfca98ac3` |
| `P-441745282e9e54` | Phòng sinh hoạt chung Gryffindor | `HOG-TNG8-S-02` |
| `P-1795bc600c2b41` | Phòng sinh hoạt chung Hufflepuff | `HOG-TNGBP-E-01` |
| `P-4bde45f1a1cb07` | Phòng sinh hoạt chung Ravenclaw | `TWR-02-01-01` |
| `P-80ce1ea13c2632` | Phòng sinh hoạt chung Slytherin | `HOG-HMNGC-E-01` |
| `HOG-TNG8-W-03` | Phòng thư liên nhà CCC | `P-4830d8d84c0a5a` |
| `HOG-TNG8-W-04` | Phòng viết CCC | `P-ae81c478038c2b` |
| `HOG-TNG8-W-02` | Tiền phòng CCC | `P-eb17a00f2392a6` |
| `P-a63fc4014d765b` | Ký túc nam Gryffindor | `TWR-01-02-01` |
| `P-ebceb992eb9255` | Ký túc nam Hufflepuff | `HOG-TNGBP-E-02` |
| `P-439400ea5f0cd4` | Ký túc nam Ravenclaw | `TWR-02-02-01` |
| `P-6b050b321ff558` | Ký túc nam Slytherin | `HOG-HMNGC-E-02` |
| `P-468097e3d74bf1` | Ký túc nữ Gryffindor | `TWR-01-02-02` |
| `P-b4314de4234c88` | Ký túc nữ Hufflepuff | `HOG-TNGBP-E-03` |
| `P-7d130cc86d97eb` | Ký túc nữ Ravenclaw | `TWR-02-02-02` |
| `P-a6425ebd843fab` | Ký túc nữ Slytherin | `HOG-HMNGC-E-03` |
| `HOG-TNG8-W-05` | Kho hồ sơ CCC | `P-8dc648ce85a4fe` |
| `P-5fc25ea9745ef9` | Phòng học số 11 | `HOG-TNG1-W-01` |

## 9. Tên giống nhau nhưng là địa điểm khác — KHÔNG xóa

### Bếp (3 địa điểm khác nhau)

- `P-17b225b47b5160` · au/3/1 · service
- `P-78ec748eb7b9ce` · au/5/1 · service
- `P-c986bd14a65aff` · au/0/0 · service


### Kho (2 địa điểm khác nhau)

- `P-5e88541888baad` · au/5/0 · other
- `P-6101b5e9235dbd` · au/0/0 · other


### Kho dưới mái (2 địa điểm khác nhau)

- `P-aafb6b5cc0a4c6` · au/5/4 · storage
- `P-cd916ab4eeb2b0` · au/3/3 · storage


### Nhà khách (2 địa điểm khác nhau)

- `P-35450f7ad71727` · au/3/0 · other
- `P-aae6653add136e` · au/4/0 · other


### Phòng ăn (4 địa điểm khác nhau)

- `P-052c1a401bbcfe` · au/3/1 · other
- `P-1d43d774de1087` · au/0/1 · other
- `P-26295c3fd155a4` · au/4/1 · other
- `P-7210700596d5ae` · au/5/1 · other


### Phòng khách (4 địa điểm khác nhau)

- `P-4f927c3f8e69d3` · au/3/1 · other
- `P-8f34772df41a97` · au/5/1 · other
- `P-a40a9139e15cdf` · au/0/1 · other
- `P-f257da4f8369a2` · au/4/1 · other


### Phòng khách & bếp (2 địa điểm khác nhau)

- `P-aff4fe8ba8b10c` · au/4/3 · service
- `P-d62f3f91b273a7` · au/2/1 · service


### Phòng khách ngủ (4 địa điểm khác nhau)

- `P-120f81b5d30c37` · au/4/2 · residential
- `P-4ccd67d1317f71` · au/0/3 · residential
- `P-51deeb2c56d244` · au/3/2 · residential
- `P-f67fdab0b798c6` · au/5/3 · residential


### Phòng kính (2 địa điểm khác nhau)

- `P-38afa9168985ae` · au/4/1 · other
- `P-819514c84e1a30` · au/3/1 · other


### Phòng làm việc (2 địa điểm khác nhau)

- `P-0cf87e2f9d3027` · au/4/1 · administration
- `P-56dbab3b62a960` · au/5/2 · administration


### Phòng sở thích (2 địa điểm khác nhau)

- `P-9d66d64ae1eced` · au/5/4 · other
- `P-c2b0b9eb3b7897` · au/3/3 · other


### Phòng tắm (2 địa điểm khác nhau)

- `P-572439c7221fb9` · au/0/3 · service
- `P-866203855d3998` · au/5/2 · service


### Phòng thay đồ (2 địa điểm khác nhau)

- `P-7146cc78e7b6bb` · au/1/3 · other
- `P-85d4eac574abfb` · au/2/1 · other


### Phòng tiện ích (2 địa điểm khác nhau)

- `P-6748bf2a512b32` · au/2/1 · other
- `P-84e3b35dd330b5` · au/5/0 · other


### Phòng tiếp khách (2 địa điểm khác nhau)

- `P-86f19e61932103` · au/0/2 · other
- `P-cbf1bbfe09504a` · au/1/1 · other


### Studio sáng tạo (2 địa điểm khác nhau)

- `P-2943e215e1b645` · au/2/1 · other
- `P-e7944584d870f6` · au/1/4 · other


### Thư viện (2 địa điểm khác nhau)

- `P-3bf90655eabf0a` · au/0/2 · study
- `P-79d20dbdcafbc7` · au/3/1 · study


### Tiền sảnh (4 địa điểm khác nhau)

- `P-660382eb5d124f` · Ngoài nhóm hiện hành · circulation
- `P-704560d7aaa0f1` · au/3/1 · circulation
- `P-b2554d6b1381cd` · au/5/1 · circulation
- `P-fd29682932d8c0` · au/4/1 · circulation


### Vườn (2 địa điểm khác nhau)

- `P-dfec655aa06ffb` · au/3/0 · outdoor
- `P-fbcb3e25adb914` · au/4/0 · outdoor


## 10. ID xuất hiện ở hai ngữ cảnh nhóm (không phải trùng vật lý)

| Place ID | Nhóm tham chiếu |
|---|---|
| `HOG-TNG8-W-01` | `hogwarts/f10/3`, `au/6/0` |
| `HOG-TNG8-W-02` | `hogwarts/f10/3`, `au/6/0` |
| `HOG-TNG8-W-03` | `hogwarts/f10/3`, `au/6/0` |
| `HOG-TNG8-W-04` | `hogwarts/f10/3`, `au/6/0` |
| `HOG-TNG8-W-05` | `hogwarts/f10/3`, `au/6/0` |

## 11. Chỉ mục tra nhanh: Place ID → Tên → Nhóm → Template

*Danh sách đủ 726 ID chuẩn, mỗi ID đúng một dòng. Khi có nhiều nhóm tham chiếu, giữ nguyên tất cả scope.*

| Place ID | Tên | Nhóm hiện hữu | Template tham chiếu |
|---|---|---|---|
| `HOG-HMNGC-E-04` | Hành lang Slytherin dưới hồ | `hogwarts/f1/1` | — |
| `HOG-HMNGC-E-05` | Phòng học nhóm Slytherin | `hogwarts/f1/1` | — |
| `HOG-HMNGC-N-01` | Phòng học Độc dược | `hogwarts/f1/0` | — |
| `HOG-HMNGC-N-02` | Văn phòng Snape | `hogwarts/f1/0` | — |
| `HOG-HMNGC-N-03` | Kho nguyên liệu Độc dược | `hogwarts/f1/0` | — |
| `HOG-HMNGC-N-04` | Phòng chuẩn bị bài thực hành | `hogwarts/f1/0` | — |
| `HOG-HMNGC-N-05` | Phòng rửa vạc | `hogwarts/f1/0` | — |
| `HOG-HMNGC-S-01` | Phòng tiệc Tử nhật | `hogwarts/f1/2` | — |
| `HOG-HMNGC-S-02` | Kho vật tư lau dọn | `hogwarts/f1/2` | — |
| `HOG-HMNGC-S-03` | Hành lang vận chuyển thực phẩm | `hogwarts/f1/2` | — |
| `HOG-HMNGC-S-04` | Phòng trực gia tinh | `hogwarts/f1/2` | — |
| `HOG-HMNGC-S-05` | Phòng kỹ thuật lò sưởi | `hogwarts/f1/2` | — |
| `HOG-HMNGC-W-01` | Hành lang hầm Tháp Thiên văn | `hogwarts/f1/3` | — |
| `HOG-HMNGC-W-02` | Phòng phân loại mẫu khoáng | `hogwarts/f1/3` | — |
| `HOG-HMNGC-W-03` | Phòng học trống HN-01 | `hogwarts/f1/3` | — |
| `HOG-HMNGC-W-04` | Kho nồi vạc cũ | `hogwarts/f1/3` | — |
| `HOG-HMNGC-W-05` | Phòng lưu mẫu độc dược | `hogwarts/f1/3` | — |
| `HOG-HMNGM-E-01` | Đường ống xuống Phòng Chứa Bí mật | `hogwarts/f0/1` | — |
| `HOG-HMNGM-E-02` | Phòng Chứa Bí mật | `hogwarts/f0/1` | — |
| `HOG-HMNGM-E-03` | Gian cửa chắn hầm cổ | `hogwarts/f0/1` | — |
| `HOG-HMNGM-E-04` | Hành lang dẫn đến hầm bị niêm phong | `hogwarts/f0/1` | — |
| `HOG-HMNGM-N-01` | Hành lang đá dưới Tháp Thiên văn | `hogwarts/f0/0` | — |
| `HOG-HMNGM-N-02` | Phòng Giả kim | `hogwarts/f0/0` | — |
| `HOG-HMNGM-N-03` | Kho than và nhiên liệu | `hogwarts/f0/0` | — |
| `HOG-HMNGM-N-04` | Phòng kiểm tra móng tháp | `hogwarts/f0/0` | — |
| `HOG-HMNGM-S-01` | Gian Dây Sa-tăng | `hogwarts/f0/2` | — |
| `HOG-HMNGM-S-02` | Gian chìa khóa bay | `hogwarts/f0/2` | — |
| `HOG-HMNGM-S-03` | Gian bàn cờ phù thủy | `hogwarts/f0/2` | — |
| `HOG-HMNGM-S-04` | Gian thử thách Độc dược | `hogwarts/f0/2` | — |
| `HOG-HMNGM-S-05` | Gian cuối bảo vệ Hòn đá | `hogwarts/f0/2` | — |
| `HOG-HMNGM-W-01` | Map Chamber | `hogwarts/f0/3` | — |
| `HOG-HMNGM-W-02` | Undercroft | `hogwarts/f0/3` | — |
| `HOG-HMNGM-W-03` | Kho dụng cụ khảo cổ | `hogwarts/f0/3` | — |
| `HOG-HMNGM-W-04` | Phòng lập bản vẽ công trình | `hogwarts/f0/3` | — |
| `HOG-TNG1-E-01` | Sảnh Trung tâm (Central Hall) | `hogwarts/f3/1` | — |
| `HOG-TNG1-E-02` | Sảnh lối vào Cầu cạn (Viaduct Entrance) | `hogwarts/f3/1` | — |
| `HOG-TNG1-E-03` | Hành lang nối khu nhà kính | `hogwarts/f3/1` | — |
| `HOG-TNG1-E-04` | Phòng tiếp học sinh mới | `hogwarts/f3/1` | — |
| `HOG-TNG1-E-05` | Kho dụng cụ sảnh Trung tâm | `hogwarts/f3/1` | — |
| `HOG-TNG1-E-06` | Phòng học trống Đ-01 | `hogwarts/f3/1` | — |
| `HOG-TNG1-N-01` | Sảnh phía Bắc (North Hall) | `hogwarts/f3/0` | — |
| `HOG-TNG1-N-02` | Sảnh chân Tháp Chuông | `hogwarts/f3/0` | — |
| `HOG-TNG1-N-03` | Hành lang tới cửa Bắc Hogwarts | `hogwarts/f3/0` | — |
| `HOG-TNG1-N-04` | Phòng trực cửa Bắc | `hogwarts/f3/0` | — |
| `HOG-TNG1-N-05` | Kho đồ dùng sân tập | `hogwarts/f3/0` | — |
| `HOG-TNG1-N-06` | Phòng học trống B-01 | `hogwarts/f3/0` | — |
| `HOG-TNG1-S-01` | Tiền sảnh (Entrance Hall) | `hogwarts/f3/2` | — |
| `HOG-TNG1-S-02` | Đại Sảnh (Great Hall) | `hogwarts/f3/2` | `hall` |
| `HOG-TNG1-S-03` | Phòng chờ trước Phân loại | `hogwarts/f3/2` | — |
| `HOG-TNG1-S-05` | Phòng giáo viên (Staff Room) | `hogwarts/f3/2` | — |
| `HOG-TNG1-S-06` | Văn phòng Filch | `hogwarts/f3/2` | `hall` |
| `HOG-TNG1-S-07` | Phòng tiếp khách nhà trường | `hogwarts/f3/2` | — |
| `HOG-TNG1-W-02` | Kho chổi (Broom Cupboard) | `hogwarts/f3/3` | — |
| `HOG-TNG1-W-03` | Hành lang vào sân Biến hình | `hogwarts/f3/3` | — |
| `HOG-TNG1-W-04` | Hành lang hướng sân Tứ giác | `hogwarts/f3/3` | — |
| `HOG-TNG1-W-05` | Phòng gửi áo choàng | `hogwarts/f3/3` | — |
| `HOG-TNG1-W-06` | Kho dụng cụ Biến hình | `hogwarts/f3/3` | — |
| `HOG-TNG2-E-01` | Phòng học Phòng chống Nghệ thuật Hắc ám | `hogwarts/f4/3` | — |
| `HOG-TNG2-E-02` | Hành lang Tháp DADA tầng thấp | `hogwarts/f4/3` | — |
| `HOG-TNG2-E-03` | Phòng học phụ Tháp DADA | `hogwarts/f4/3` | — |
| `HOG-TNG2-E-04` | Phòng thực hành phòng vệ | `hogwarts/f4/3` | — |
| `HOG-TNG2-E-05` | Kho đạo cụ DADA | `hogwarts/f4/3` | — |
| `HOG-TNG2-E-06` | Phòng học trống Đ-02 | `hogwarts/f4/3` | — |
| `HOG-TNG2-N-01` | Phòng Lịch sử Pháp thuật | `hogwarts/f4/0` | — |
| `HOG-TNG2-N-02` | Văn phòng McGonagall | `hogwarts/f4/0` | — |
| `HOG-TNG2-N-03` | Phòng học Biến hình | `hogwarts/f4/0` | — |
| `HOG-TNG2-N-04` | Phòng chuẩn bị Biến hình | `hogwarts/f4/0` | — |
| `HOG-TNG2-N-05` | Kho sách Lịch sử Pháp thuật | `hogwarts/f4/0` | — |
| `HOG-TNG2-N-06` | Phòng học trống B-02 | `hogwarts/f4/0` | — |
| `HOG-TNG2-S-01` | Bệnh xá Hogwarts | `hogwarts/f4/2` | — |
| `HOG-TNG2-S-02` | Văn phòng bà Pomfrey | `hogwarts/f4/2` | — |
| `HOG-TNG2-S-03` | Hành lang vào Tháp Giáo viên | `hogwarts/f4/2` | — |
| `HOG-TNG2-S-04` | Phòng thay băng | `hogwarts/f4/2` | — |
| `HOG-TNG2-S-05` | Kho vật tư y tế | `hogwarts/f4/2` | — |
| `HOG-TNG2-S-06` | Phòng chờ bệnh xá | `hogwarts/f4/2` | — |
| `HOG-TNG2-W-01` | Phòng học Muggle học | `hogwarts/f4/1` | — |
| `HOG-TNG2-W-02` | Phòng Chữ tượng hình (Hieroglyphics) | `hogwarts/f4/1` | — |
| `HOG-TNG2-W-03` | Hành lang tầng trên North Hall | `hogwarts/f4/1` | — |
| `HOG-TNG2-W-04` | Phòng lưu mô hình lịch sử | `hogwarts/f4/1` | — |
| `HOG-TNG2-W-05` | Kho bản đồ giảng dạy | `hogwarts/f4/1` | — |
| `HOG-TNG2-W-06` | Phòng học trống T-02 | `hogwarts/f4/1` | — |
| `HOG-TNG3-E-01` | Văn phòng giáo sư DADA (Lockhart 1992) | `hogwarts/f5/3` | — |
| `HOG-TNG3-E-02` | Hành lang tới văn phòng DADA | `hogwarts/f5/3` | — |
| `HOG-TNG3-E-03` | Phòng tiếp phụ huynh của khoa DADA | `hogwarts/f5/3` | — |
| `HOG-TNG3-E-04` | Phòng lưu giáo án | `hogwarts/f5/3` | — |
| `HOG-TNG3-E-05` | Phòng học trống Đ-03 | `hogwarts/f5/3` | — |
| `HOG-TNG3-N-01` | Nhà vệ sinh Myrtle | `hogwarts/f5/0` | — |
| `HOG-TNG3-N-02` | Hành lang tầng hai cạnh nhà vệ sinh Myrtle | `hogwarts/f5/0` | — |
| `HOG-TNG3-N-03` | Nhà vệ sinh nam tầng này | `hogwarts/f5/0` | — |
| `HOG-TNG3-N-04` | Kho bảo trì đường nước | `hogwarts/f5/0` | — |
| `HOG-TNG3-N-05` | Phòng trực hành lang B-03 | `hogwarts/f5/0` | — |
| `HOG-TNG3-S-01` | Phòng luyện đũa phép cơ bản | `hogwarts/f5/2` | — |
| `HOG-TNG3-S-02` | Phòng học trống N-03 | `hogwarts/f5/2` | — |
| `HOG-TNG3-S-03` | Kho thiết bị học tập | `hogwarts/f5/2` | — |
| `HOG-TNG3-S-04` | Phòng làm việc trợ giảng | `hogwarts/f5/2` | — |
| `HOG-TNG3-S-05` | Phòng sinh hoạt học sinh nhỏ | `hogwarts/f5/2` | — |
| `HOG-TNG3-W-01` | Cầu thang tắt sau thảm treo | `hogwarts/f7/2` | — |
| `HOG-TNG3-W-02` | Hành lang tranh bản đồ Argyllshire | `hogwarts/f5/1` | — |
| `HOG-TNG3-W-03` | Phòng kiểm tra an toàn cầu thang | `hogwarts/f5/1` | — |
| `HOG-TNG3-W-04` | Phòng học trống T-03 | `hogwarts/f5/1` | — |
| `HOG-TNG3-W-05` | Kho ghế bàn học | `hogwarts/f5/1` | — |
| `HOG-TNG4-E-01` | Phòng học Bùa chú | `hogwarts/f6/3` | — |
| `HOG-TNG4-E-02` | Hành lang Bùa chú | `hogwarts/f6/3` | — |
| `HOG-TNG4-E-03` | Hành lang cấm tầng ba năm 1991 | `hogwarts/f6/3` | — |
| `HOG-TNG4-E-04` | Gian cửa sập của Fluffy (1991) | `hogwarts/f6/3` | — |
| `HOG-TNG4-E-05` | Phòng thực hành Bùa chú | `hogwarts/f6/3` | — |
| `HOG-TNG4-E-06` | Kho đồ dùng Bùa chú | `hogwarts/f6/3` | — |
| `HOG-TNG4-N-01` | Phòng Trưng bày Chiến tích | `hogwarts/f6/0` | — |
| `HOG-TNG4-N-02` | Hành lang áo giáp | `hogwarts/f6/0` | — |
| `HOG-TNG4-N-03` | Phòng Âm nhạc (Music Room) | `hogwarts/f6/0` | — |
| `HOG-TNG4-N-04` | Kho bảo quản cúp | `hogwarts/f6/0` | — |
| `HOG-TNG4-N-05` | Phòng tập hòa tấu | `hogwarts/f6/0` | — |
| `HOG-TNG4-N-06` | Phòng học trống B-04 | `hogwarts/f6/0` | — |
| `HOG-TNG4-S-01` | Phòng tập Đấu tay đôi dự phòng | `hogwarts/f6/2` | — |
| `HOG-TNG4-S-02` | Phòng chuẩn bị câu lạc bộ | `hogwarts/f6/2` | — |
| `HOG-TNG4-S-03` | Phòng tập diễn thuyết | `hogwarts/f6/2` | — |
| `HOG-TNG4-S-04` | Phòng họp học sinh | `hogwarts/f6/2` | — |
| `HOG-TNG4-S-05` | Phòng học trống N-04 | `hogwarts/f6/2` | — |
| `HOG-TNG4-W-01` | Hành lang tầng trên Sảnh Bắc | `hogwarts/f6/1` | — |
| `HOG-TNG4-W-02` | Phòng trưng bày cổ vật giáo dục | `hogwarts/f6/1` | — |
| `HOG-TNG4-W-03` | Phòng học trống T-04 | `hogwarts/f6/1` | — |
| `HOG-TNG4-W-04` | Kho trang phục biểu diễn | `hogwarts/f6/1` | — |
| `HOG-TNG4-W-05` | Phòng phục hồi hiện vật | `hogwarts/f6/1` | — |
| `HOG-TNG5-E-01` | Hành lang Dài (Long Gallery) | `hogwarts/f7/1` | — |
| `HOG-TNG5-E-02` | Phòng học Số học (Arithmancy) | `hogwarts/f7/1` | — |
| `HOG-TNG5-E-03` | Phòng bản đồ và địa lý pháp thuật | `hogwarts/f7/1` | — |
| `HOG-TNG5-E-04` | Phòng giải mã mật thư | `hogwarts/f7/1` | — |
| `HOG-TNG5-E-05` | Phòng học trống Đ-05 | `hogwarts/f7/1` | — |
| `HOG-TNG5-N-01` | Thư viện Hogwarts | `hogwarts/f7/0` | — |
| `HOG-TNG5-N-02` | Khu Sách Cấm (Restricted Section) | `hogwarts/f7/0` | — |
| `HOG-TNG5-N-03` | Phòng làm việc thủ thư | `hogwarts/f7/0` | — |
| `HOG-TNG5-N-04` | Phòng đọc nghiên cứu | `hogwarts/f7/0` | — |
| `HOG-TNG5-N-05` | Phòng tra cứu mục lục | `hogwarts/f7/0` | — |
| `HOG-TNG5-N-06` | Kho sách ít dùng | `hogwarts/f7/0` | — |
| `HOG-TNG5-S-01` | Phòng trống từng chứa Gương Ảo ảnh năm 1991 | `hogwarts/f7/2` | — |
| `HOG-TNG5-S-02` | Hành lang gương thông lối bí mật cũ | `hogwarts/f7/2` | — |
| `HOG-TNG5-S-03` | Phòng lưu hồ sơ thư viện | `hogwarts/f7/2` | — |
| `HOG-TNG5-S-04` | Phòng học trống N-05 | `hogwarts/f7/2` | — |
| `HOG-TNG5-S-05` | Kho vật dụng sảnh đọc | `hogwarts/f7/2` | — |
| `HOG-TNG5-W-01` | Phòng học Cổ ngữ Runes | `hogwarts/f7/3` | — |
| `HOG-TNG5-W-02` | Phòng dịch cổ ngữ | `hogwarts/f7/3` | — |
| `HOG-TNG5-W-03` | Phòng học chuyên đề lịch sử | `hogwarts/f7/3` | — |
| `HOG-TNG5-W-04` | Phòng nghiên cứu tư liệu | `hogwarts/f7/3` | — |
| `HOG-TNG5-W-05` | Phòng học trống T-05 | `hogwarts/f7/3` | — |
| `HOG-TNG6-E-01` | Phòng nghiên cứu Số học | `hogwarts/f8/1` | — |
| `HOG-TNG6-E-02` | Hành lang cánh Đông tầng năm | `hogwarts/f8/1` | — |
| `HOG-TNG6-E-03` | Phòng mỹ thuật pháp thuật | `hogwarts/f8/1` | — |
| `HOG-TNG6-E-04` | Kho bài tập và bảng phép | `hogwarts/f8/1` | — |
| `HOG-TNG6-E-05` | Phòng học trống Đ-06 | `hogwarts/f8/1` | — |
| `HOG-TNG6-N-01` | Phòng tắm Huynh trưởng | `hogwarts/f8/0` | — |
| `HOG-TNG6-N-02` | Hành lang trước Phòng tắm Huynh trưởng | `hogwarts/f8/0` | — |
| `HOG-TNG6-N-03` | Hành lang Tháp Giáo viên tầng trên | `hogwarts/f8/0` | — |
| `HOG-TNG6-N-04` | Phòng nghỉ huynh trưởng | `hogwarts/f8/0` | — |
| `HOG-TNG6-N-05` | Kho khăn và đồng phục | `hogwarts/f8/0` | — |
| `HOG-TNG6-N-06` | Phòng học trống B-06 | `hogwarts/f8/0` | — |
| `HOG-TNG6-S-01` | Hành lang Tháp Đồng hồ tầng cao | `hogwarts/f8/2` | — |
| `HOG-TNG6-S-02` | Phòng bảo trì cơ cấu đồng hồ | `hogwarts/f8/2` | — |
| `HOG-TNG6-S-03` | Phòng câu lạc bộ học thuật | `hogwarts/f8/2` | — |
| `HOG-TNG6-S-04` | Phòng làm báo học sinh | `hogwarts/f8/2` | — |
| `HOG-TNG6-S-05` | Kho thiết bị triển lãm | `hogwarts/f8/2` | — |
| `HOG-TNG6-W-01` | Hành lang cửa sổ phía Tây tầng năm | `hogwarts/f8/3` | — |
| `HOG-TNG6-W-02` | Phòng tập nhạc nhóm nhỏ | `hogwarts/f8/3` | — |
| `HOG-TNG6-W-03` | Phòng đọc yên tĩnh | `hogwarts/f8/3` | — |
| `HOG-TNG6-W-04` | Phòng học trống T-06 | `hogwarts/f8/3` | — |
| `HOG-TNG6-W-05` | Kho đồ thủ công | `hogwarts/f8/3` | — |
| `HOG-TNG7-E-01` | Nhà vệ sinh nam tầng sáu | `hogwarts/f9/1` | — |
| `HOG-TNG7-E-02` | Phòng học chuyên đề Phép thuật nâng cao | `hogwarts/f9/1` | — |
| `HOG-TNG7-E-03` | Phòng hội thảo nhỏ | `hogwarts/f9/1` | — |
| `HOG-TNG7-E-04` | Phòng thí nghiệm an toàn | `hogwarts/f9/1` | — |
| `HOG-TNG7-E-05` | Phòng học trống Đ-07 | `hogwarts/f9/1` | — |
| `HOG-TNG7-N-01` | Phòng lưu bảng thành tích học thuật | `hogwarts/f9/0` | — |
| `HOG-TNG7-N-02` | Phòng lưu sổ kết quả học tập | `hogwarts/f9/0` | — |
| `HOG-TNG7-N-03` | Kho thiết bị tiết học nâng cao | `hogwarts/f9/0` | — |
| `HOG-TNG7-N-04` | Phòng học trống B-07 | `hogwarts/f9/0` | — |
| `HOG-TNG7-N-05` | Hành lang cầu thang phía Bắc | `hogwarts/f9/0` | — |
| `HOG-TNG7-S-01` | Hành lang phía trên Tháp Giáo viên | `hogwarts/f9/2` | — |
| `HOG-TNG7-S-02` | Phòng lưu biên bản giáo viên | `hogwarts/f9/2` | — |
| `HOG-TNG7-S-03` | Phòng xem lịch học | `hogwarts/f9/2` | — |
| `HOG-TNG7-S-04` | Kho sách tham khảo | `hogwarts/f9/2` | — |
| `HOG-TNG7-S-05` | Phòng học trống N-07 | `hogwarts/f9/2` | — |
| `HOG-TNG7-W-01` | Phòng Gobstones | `hogwarts/f9/3` | — |
| `HOG-TNG7-W-02` | Phòng câu lạc bộ cờ phù thủy | `hogwarts/f9/3` | — |
| `HOG-TNG7-W-03` | Phòng làm dự án học sinh | `hogwarts/f9/3` | — |
| `HOG-TNG7-W-04` | Phòng học trống T-07 | `hogwarts/f9/3` | — |
| `HOG-TNG7-W-05` | Hành lang kính tầng cao | `hogwarts/f9/3` | — |
| `HOG-TNG8-E-01` | Hành lang tầng bảy trước Phòng Yêu cầu | `hogwarts/f10/1` | — |
| `HOG-TNG8-E-02` | Phòng Yêu cầu (Room of Requirement) | `hogwarts/f10/1` | — |
| `HOG-TNG8-E-03` | Phòng học trống Đ-08 | `hogwarts/f10/1` | — |
| `HOG-TNG8-E-04` | Phòng nghi lễ học thuật | `hogwarts/f10/1` | — |
| `HOG-TNG8-E-05` | Phòng bảo quản tranh phép | `hogwarts/f10/1` | — |
| `HOG-TNG8-N-01` | Hành lang dẫn lên văn phòng Hiệu trưởng | `hogwarts/f10/0` | — |
| `HOG-TNG8-N-02` | Sảnh vào văn phòng Hiệu trưởng | `hogwarts/f10/0` | — |
| `HOG-TNG8-N-03` | Sảnh tầng cao Cầu thang Lớn | `hogwarts/f10/0` | — |
| `HOG-TNG8-N-04` | Phòng học trống B-08 | `hogwarts/f10/0` | — |
| `HOG-TNG8-N-05` | Kho giấy tờ giáo vụ | `hogwarts/f10/0` | — |
| `HOG-TNG8-S-01` | Lối chân dung Bà Béo | `hogwarts/f10/2` | — |
| `HOG-TNG8-S-03` | Lối cầu thang ký túc Gryffindor | `hogwarts/f10/2` | — |
| `HOG-TNG8-S-04` | Phòng học nhóm tầng bảy | `hogwarts/f10/2` | — |
| `HOG-TNG8-S-05` | Hành lang tranh tầng bảy | `hogwarts/f10/2` | — |
| `HOG-TNG8-W-01` | CCC 07.18 | `hogwarts/f10/3`, `au/6/0` | — |
| `HOG-TNG8-W-02` | Tiền phòng CCC | `hogwarts/f10/3`, `au/6/0` | — |
| `HOG-TNG8-W-03` | Phòng thư liên nhà CCC | `hogwarts/f10/3`, `au/6/0` | — |
| `HOG-TNG8-W-04` | Phòng viết CCC | `hogwarts/f10/3`, `au/6/0` | — |
| `HOG-TNG8-W-05` | Kho hồ sơ CCC | `hogwarts/f10/3`, `au/6/0` | — |
| `HOG-TNG8-W-06` | Phòng họp liên nhà | `hogwarts/f10/3` | — |
| `HOG-TNG8-W-07` | Phòng học trống T-08 | `hogwarts/f10/3` | — |
| `HOG-TNGBP-E-04` | Hành lang Hufflepuff | `hogwarts/f2/1` | — |
| `HOG-TNGBP-E-05` | Phòng học nhóm Hufflepuff | `hogwarts/f2/1` | — |
| `HOG-TNGBP-N-01` | Bếp Hogwarts | `hogwarts/f2/0` | — |
| `HOG-TNGBP-N-02` | Kho thực phẩm khô | `hogwarts/f2/0` | — |
| `HOG-TNGBP-N-03` | Phòng chuẩn bị suất ăn | `hogwarts/f2/0` | — |
| `HOG-TNGBP-N-04` | Phòng rửa dụng cụ nhà bếp | `hogwarts/f2/0` | — |
| `HOG-TNGBP-N-05` | Hành lang hậu cần bếp | `hogwarts/f2/0` | — |
| `HOG-TNGBP-S-01` | Phòng giặt là | `hogwarts/f2/2` | — |
| `HOG-TNGBP-S-02` | Phòng đồ vải | `hogwarts/f2/2` | — |
| `HOG-TNGBP-S-03` | Kho khăn trải bàn | `hogwarts/f2/2` | — |
| `HOG-TNGBP-S-04` | Phòng bảo trì dụng cụ giặt | `hogwarts/f2/2` | — |
| `HOG-TNGBP-S-05` | Hành lang kho phía Nam | `hogwarts/f2/2` | — |
| `HOG-TNGBP-W-01` | Phòng nghỉ gia tinh | `hogwarts/f2/3` | — |
| `HOG-TNGBP-W-02` | Kho rau củ | `hogwarts/f2/3` | — |
| `HOG-TNGBP-W-03` | Kho thảo mộc nhà bếp | `hogwarts/f2/3` | — |
| `HOG-TNGBP-W-04` | Kho dụng cụ dự phòng | `hogwarts/f2/3` | — |
| `HOG-TNGBP-W-05` | Hành lang kết nối hầm phía Tây | `hogwarts/f2/3` | — |
| `P-00020cadb6235e` | Đầu máy Hogwarts Express | — | `express` |
| `P-0006dd26862fbe` | Lối vào Rừng Cấm | — | `h1` |
| `P-000814ab7a3200` | Số 10 Downing Street / văn phòng Thủ tướng Muggle | `world/14` | — |
| `P-0286a54346e7d7` | Bãi neo tàu Durmstrang | `world/26` | — |
| `P-04180946d36a33` | Ollivanders | — | `diagon-knockturn` |
| `P-046c1c72bb9fc9` | Hẻm Xéo | — | `diagon-knockturn` |
| `P-04c058ca77c028` | Phòng áp mái | `au/3/3` | — |
| `P-052c1a401bbcfe` | Phòng ăn | `au/3/1` | — |
| `P-056435e23f0696` | Studio ảnh | `au/1/3` | — |
| `P-05c90391d35da8` | Quản lý Chổi bay | — | `ministry2` |
| `P-05cf8a6d391ae0` | Laundry | `au/0/0` | — |
| `P-05d77e52709869` | Nhà Bathilda Bagshot | `world/5` | — |
| `P-065a853b8d7608` | Florean Fortescue’s | — | `diagon-knockturn` |
| `P-06a1ce678f15be` | Các nhà dân trên phố trong bản đồ Diagon | — | `diagon-knockturn` |
| `P-07666cff74b9d9` | Hồ ngầm trong hang biển | `world/26` | — |
| `P-0880e4fe3da124` | Sảnh tiếp cận Đại Sảnh | — | `hall` |
| `P-09b9d228df78c4` | Khu bình luận / phòng bình luận | — | `pitch-static` |
| `P-0a1ff4c2777f64` | Cầu gỗ và các cầu nối thuộc khối lâu đài | — | `h2` |
| `P-0a94eb38a5cf40` | Trang viên Malfoy | `world/19` | — |
| `P-0afb8b38025951` | Bếp gia đình | `au/4/1` | — |
| `P-0b1c0c88e006f3` | Durmstrang Institute (vị trí bí mật, chưa chốt nước) | `world/1` | — |
| `P-0b2a64c33ccc84` | Phòng áp mái Liad | `au/7/0` | — |
| `P-0bdde710277c5f` | Hang Sóc / Nhà Weasley | `world/17` | — |
| `P-0cf87e2f9d3027` | Phòng làm việc | `au/4/1` | — |
| `P-0d712868c509cf` | Bãi cỏ và đồng cỏ quanh Hogwarts | — | `h1` |
| `P-0d84f863a32ec4` | Sảnh nhà Black | `world/15` | — |
| `P-0ebb356a309e42` | Phòng ngủ Ron | `world/17` | — |
| `P-0f0f21af1613e3` | Sảnh tiếp tân | `au/1/1` | — |
| `P-0fe532e3c7b3e8` | Nhà dân và ngõ ở Knockturn | — | `diagon-knockturn` |
| `P-10483afb50657b` | Phòng làm việc Xenophilius | `world/17` | — |
| `P-10ca277b3be7f2` | Tầng 1 – Văn phòng Bộ trưởng | — | `ministry2` |
| `P-1174317bcb3096` | Vườn bí Hagrid | — | `h1` |
| `P-120f81b5d30c37` | Phòng khách ngủ | `au/4/2` | — |
| `P-1257864e10b184` | Quán The Hanged Man | `world/6` | — |
| `P-12d570650689e2` | Phòng thay đồ đội B | — | `pitch-static` |
| `P-1388a8951a3c11` | Nhà Gaunt | `world/6` | — |
| `P-13ae06fd76adc5` | Các bãi cỏ ngoài sân trong và ngoài khu cầu/cổng H2 | — | `h1` |
| `P-13cff25cacf38f` | Ga Paddington | `world/13` | — |
| `P-13dfea8fe4bf27` | Văn phòng Cấp phép Độn thổ | — | `ministry2` |
| `P-143a2447e31c2c` | Lều Hagrid và các phòng bên trong | — | `h1` |
| `P-14c5870146b747` | Gian chứa chổi / kho chổi | — | `hall` |
| `P-16ec3a57420b99` | Bờ biển gần Shell Cottage | `world/18` | — |
| `P-176df525d65b31` | Hiên sau | `au/5/1` | — |
| `P-1795bc600c2b41` | Phòng sinh hoạt chung Hufflepuff | `hogwarts/f2/1` | `hufflepuff-common` |
| `P-17b225b47b5160` | Bếp | `au/3/1` | — |
| `P-17db50485e2b83` | Bãi cỏ ven hồ | — | `h1` |
| `P-1802311f93c216` | Sân trong | `au/0/1` | — |
| `P-1809b6a4970166` | Nhà Barty Crouch Sr. | `world/3` | — |
| `P-18305f9ea8f94d` | Khu học nhóm bên trong khu Hufflepuff | — | `hufflepuff-common` |
| `P-18b19a8c7825cf` | Studio nhà kính | `au/4/0` | — |
| `P-18feb9f615073d` | Bếp nhà Dursley | `world/16` | — |
| `P-1901b8ad031d44` | Sảnh tiếp đón Bộ Pháp thuật | — | `ministry-8-10` |
| `P-197b2052678b9d` | Nhà dân trong template làng | — | `village-static` |
| `P-1af0a04a59056b` | Khu điều trị tai nạn đồ tạo tác | `world/12` | — |
| `P-1b93d2a168cc1a` | Tiệm đồ cũ | — | `diagon-knockturn` |
| `P-1ba2a8427cd9a8` | Phòng ngủ Regulus Black | `world/15` | — |
| `P-1bd95d9a21aa0e` | Tầng 9 – Bộ Bảo mật | — | `ministry-8-10` |
| `P-1c6f7973221157` | Phòng Luna Lovegood | `world/17` | — |
| `P-1cbafaf3eaef87` | Hành lang chung Slytherin dưới hồ | — | `slytherin-common` |
| `P-1d43d774de1087` | Phòng ăn | `au/0/1` | — |
| `P-1db46d6df4495f` | Kho tiền Lestrange | — | `diagon-knockturn` |
| `P-1ecd945e2b86b7` | Hai sân trong lâu đài | — | `h2` |
| `P-209dc8c61fa3bb` | Shell Cottage / nhà Bill và Fleur | `world/18` | — |
| `P-2236da8489dfad` | Quán cà phê Tottenham Court Road | `world/13` | — |
| `P-223c9a29e759d3` | Nhà Fawcett | `world/17` | — |
| `P-226721c1fff80c` | Mọi buồng hành khách trong các toa | — | `express` |
| `P-239cfed7a31957` | Phòng ngủ phía đông | `au/4/3` | — |
| `P-23a728f27029ae` | Tottenham Court Road | `world/13` | — |
| `P-240c66e1c2ad19` | Beauxbatons Academy of Magic | `world/24` | — |
| `P-241e2fa15a09f1` | Phòng hỗ trợ xử án | — | `ministry-8-10` |
| `P-25a2f0dc7c7eba` | Vườn Shell Cottage | `world/18` | — |
| `P-26295c3fd155a4` | Phòng ăn | `au/4/1` | — |
| `P-27cbd65e002cd1` | Lối nối giữa các toa | — | `express` |
| `P-28dd4f052c2855` | Quán trà Madam Puddifoot | — | `village-static` |
| `P-28f1e32ca3f09f` | Biệt thự Grayhaven | `au/4/0` | — |
| `P-292e4cf5737a49` | Làng Tinworth | `world/18` | — |
| `P-2943e215e1b645` | Studio sáng tạo | `au/2/1` | — |
| `P-297d369b484bc3` | Cánh đồng World Cup Quidditch | `world/26` | — |
| `P-29bc58039f5eae` | Vườn cây gần nhà kính | — | `h1` |
| `P-2a51f7e8e278a7` | Nhà thờ Godric’s Hollow | `world/5` | — |
| `P-2ae3745c48f04a` | Kho gia đình | `au/0/4` | — |
| `P-2b888eaec42438` | Tiệm bút lông và giấy da | — | `diagon-knockturn` |
| `P-2be38007d6f246` | Apothecary tại Hogsmeade trong template | — | `village-static` |
| `P-2c9c4c00c1d80b` | Phòng Tình yêu / phòng khóa kín | — | `ministry-8-10` |
| `P-2cda580d14d444` | Spinner’s End | `world/4` | — |
| `P-2df6c97ce86355` | Bộ phận Sinh vật có tri giác | — | `ministry2` |
| `P-2e483807e1273e` | Phòng trưng bày | `au/1/1` | — |
| `P-2e8e6fd50795cc` | Bếp Hang Sóc | `world/17` | — |
| `P-2e95be7ac27f5e` | Study Amethyst | `au/0/2` | — |
| `P-2fdedba88577ad` | Công viên Little Whinging | `world/16` | — |
| `P-30cf89999f5e15` | Hồ Đen | — | `h1` |
| `P-30e83b523e3592` | Nhà Slughorn ở tạm tại Budleigh Babberton | `world/3` | — |
| `P-31f204a8e0e490` | Đường giữa các nhà kính | — | `h1` |
| `P-328fae86b7c01c` | Phòng ngủ Fred & George | `world/17` | — |
| `P-337a20429f7b9d` | Khu sinh hoạt và học nhóm bên trong khu Gryffindor | — | `gryffindor-common` |
| `P-33d82440a9be50` | Sân giữa các cánh lâu đài | — | `h2` |
| `P-35150c109c52c8` | Phòng viết nội dung | `au/1/2` | — |
| `P-35450f7ad71727` | Nhà khách | `au/3/0` | — |
| `P-36a9268e0e2288` | Phòng vườn | `au/0/1` | — |
| `P-36df14fc8355e4` | Lăng mộ Dumbledore | `world/26` | — |
| `P-3733c32c66774d` | Magnolia Crescent | `world/16` | — |
| `P-37846d42ec845c` | Khuôn viên Malfoy Manor | `world/19` | — |
| `P-385234641b8727` | Đường dạo ngoài trời quanh Hogwarts | — | `h1` |
| `P-38988e75264a65` | Toa mẫu Gryffindor | — | `express` |
| `P-38afa9168985ae` | Phòng kính | `au/4/1` | — |
| `P-38bf6be09df746` | Sân Bell Tower (Tháp Chuông) | — | `h2` |
| `P-399f2c035627f1` | Sân trước lâu đài trong khu cổng | — | `h2` |
| `P-39e69af2a5fc7c` | Upper Flagley | `world/3` | — |
| `P-3a8e137752a294` | Khu cắm trại Beauxbatons | `world/26` | — |
| `P-3a9add588aa69a` | Sân ga 9¾ | — | `express` |
| `P-3af65a0ca62879` | Biệt thự Riddle | `world/6` | — |
| `P-3be97f06839afa` | Các lăng mộ Ai Cập mà Bill phá giải lời nguyền | `world/26` | — |
| `P-3bf90655eabf0a` | Thư viện | `au/0/2` | — |
| `P-3c919f6f95c429` | Phòng áo khoác | `au/0/1` | — |
| `P-3d600b63857ca0` | Tầng 5 – Hợp tác Pháp thuật Quốc tế | — | `ministry2` |
| `P-3e401191d71800` | Văn phòng Bằng sáng chế Lố bịch | — | `ministry2` |
| `P-4091d06b78b915` | Nhà Granger (địa chỉ không xác định) | `world/15` | — |
| `P-4232fc85ff42c4` | Vườn nhà Dursley | `world/16` | — |
| `P-4247829f4f87d7` | Tầng 6 – Giao thông Pháp thuật | — | `ministry2` |
| `P-424cf93d589f58` | Magnolia Road | `world/16` | — |
| `P-42ca1a78fc7d46` | Uagadou School of Magic | `world/28` | — |
| `P-439400ea5f0cd4` | Ký túc nam Ravenclaw | `tower/1/1` | `ravenclaw-common` |
| `P-43ffcc1098a3aa` | Privet Drive | `world/16` | — |
| `P-441745282e9e54` | Phòng sinh hoạt chung Gryffindor | `hogwarts/f10/2` | `gryffindor-common` |
| `P-4427f295c86374` | Nurmengard | `world/23` | — |
| `P-442f7275b6c832` | Sân Mistletoe | — | `h2` |
| `P-444469fe1666f1` | Văn phòng Lạm dụng Đồ tạo tác Muggle | — | `ministry2` |
| `P-44a4a4856bc09b` | Sảnh tròn xoay | — | `ministry-8-10` |
| `P-45ca006de2e29d` | Sân thượng | `au/1/5` | — |
| `P-468097e3d74bf1` | Ký túc nữ Gryffindor | `tower/0/1` | `gryffindor-common` |
| `P-47576b791ebc5b` | Nhà ga Hogsmeade | — | `express` |
| `P-47e13519fc6e78` | Kho mẫu | `au/1/0` | — |
| `P-4890242d6f09e8` | Các phòng ngủ khác Hang Sóc | `world/17` | — |
| `P-4ba45d2ca765ad` | Đấu trường thử thách rồng | `world/26` | — |
| `P-4bde45f1a1cb07` | Phòng sinh hoạt chung Ravenclaw | `tower/1/0` | `ravenclaw-common` |
| `P-4cb1d44097aaf0` | Gringotts và hệ thống hầm / kho tiền | — | `diagon-knockturn` |
| `P-4ccd67d1317f71` | Phòng khách ngủ | `au/0/3` | — |
| `P-4d4b012a451ee2` | Tầng 4 – Điều hòa và Kiểm soát Sinh vật | — | `ministry2` |
| `P-4df8571e5dea2e` | Các đường dạo và bãi đất trống ngoài trời quanh trường chưa thuộc template khác | — | `h1` |
| `P-4e78486f8e5d5c` | Phòng khách Hang Sóc | `world/17` | — |
| `P-4f2d8576d24f18` | Số 13 Grimmauld Place | `world/15` | — |
| `P-4f6ef384d93fb3` | Rừng Dean | `world/3` | — |
| `P-4f927c3f8e69d3` | Phòng khách | `au/3/1` | — |
| `P-4fee03ab76bb30` | Tầng 10 – Khu xử án | — | `ministry-8-10` |
| `P-501145c3fc9c8d` | Bếp nhà Black | `world/15` | — |
| `P-501e057d5be6b1` | Sân Quad | — | `h2` |
| `P-51deeb2c56d244` | Phòng khách ngủ | `au/3/2` | — |
| `P-52b6fe3a29d440` | Khu nhân mã trong Rừng Cấm | — | `h1` |
| `P-52ea7749d9b897` | Nhà cô Muriel | `world/3` | — |
| `P-54d36cdd92de52` | Nhà Alastor Moody | `world/3` | — |
| `P-558513338bec03` | Phòng Liad | `au/0/3` | — |
| `P-55b6096c51b788` | Nhà gia đình Dumbledore | `world/5` | — |
| `P-561ef194a3cfad` | Ba Cây Chổi và các phòng của quán | — | `village-static` |
| `P-561f5bd89f1fb7` | Văn phòng quản lý trại trẻ | `world/14` | — |
| `P-56dbab3b62a960` | Phòng làm việc | `au/5/2` | — |
| `P-572439c7221fb9` | Phòng tắm | `au/0/3` | — |
| `P-579062ef9135bd` | Kho giấy | `au/1/0` | — |
| `P-57a63e2aaa9159` | Scribbulus | — | `diagon-knockturn` |
| `P-57ffd05e36562d` | Phòng ngủ Vernon/Petunia | `world/16` | — |
| `P-585c0776dc54a3` | Sân Wyvern | — | `h2` |
| `P-5889d83ab64879` | Toa thường | — | `express` |
| `P-58ba0981b28173` | Văn phòng Mạng Floo | — | `ministry2` |
| `P-58bb45e6da0252` | Twilfitt & Tatting’s | — | `diagon-knockturn` |
| `P-5965034df92b27` | Cokeworth | `world/4` | — |
| `P-59e90d8a9ccc63` | Bờ Hồ Đen | — | `h1` |
| `P-5a0ec074efb106` | Weasleys’ Wizard Wheezes (nếu tồn tại theo thời kỳ) | — | `diagon-knockturn` |
| `P-5a4fefc72d7d57` | Các khán đài Quidditch | — | `pitch-static` |
| `P-5b000833260ab3` | Tầng 8 – Atrium | — | `ministry-8-10` |
| `P-5bc4accf8f9cfb` | Phòng ăn nhà Dursley | `world/16` | — |
| `P-5bfdb63dbfad77` | Nhà Gregorovitch (địa chỉ không xác định) | `world/15` | — |
| `P-5c5b87e483e862` | Các cơ sở Knockturn khác trong template | — | `diagon-knockturn` |
| `P-5cd173a0de0b12` | Little Whinging | `world/16` | — |
| `P-5d33c248682e4b` | Tiệm cổ vật / cầm đồ tại Knockturn | — | `diagon-knockturn` |
| `P-5d4b08c68c7c51` | Nhà Potter / Potter Cottage | `world/5` | — |
| `P-5daf783e1e1f28` | Sân vào lâu đài trong khu cổng | — | `h2` |
| `P-5ddef138f591ee` | Nghĩa địa Godric’s Hollow | `world/5` | — |
| `P-5e1f1cc14a2adb` | Phố chính Hogsmeade | — | `village-static` |
| `P-5e88541888baad` | Kho | `au/5/0` | — |
| `P-5eb3bde9176879` | Cầu đá nối các cánh lâu đài | — | `h2` |
| `P-5fc25ea9745ef9` | Phòng học số 11 | `hogwarts/f3/3` | `hall` |
| `P-5fc3c5a0bcb0d1` | Bộ phận Quái thú | — | `ministry2` |
| `P-60ff93fb1c4473` | Phòng khách Shell Cottage | `world/18` | — |
| `P-6101b5e9235dbd` | Kho | `au/0/0` | — |
| `P-62939be1327ef1` | Phòng D&D | `au/3/1` | — |
| `P-632d1664ab4804` | MACUSA Headquarters | `world/30` | — |
| `P-633d0bcb4ab87e` | Zonko’s | — | `village-static` |
| `P-638d3d8f890b97` | Phòng thay đồ đội A | — | `pitch-static` |
| `P-63aa8852e10090` | Đường mòn Rừng Cấm | — | `h1` |
| `P-64d0087ee0c1b2` | Nhà Lovegood | `world/17` | — |
| `P-6575df3a62913f` | Mặt sân thi đấu | — | `pitch-static` |
| `P-65ac0b29ed7007` | Hang Sirius trú ở vùng núi gần làng | `world/22` | — |
| `P-660382eb5d124f` | Tiền sảnh | — | `hall` |
| `P-6622d43a61e262` | Biệt thự Whitecap | `au/3/0` | — |
| `P-6748bf2a512b32` | Phòng tiện ích | `au/2/1` | — |
| `P-695c706560e4fb` | Phòng ngủ Arthur & Molly | `world/17` | — |
| `P-6a9cb408f9f168` | Cầu thang trong khu Gryffindor | — | `gryffindor-common` |
| `P-6ac732451f03d7` | Đường đi ngoài các tường bao lâu đài | — | `h1` |
| `P-6acb59a2cd0cf1` | Vườn sau | `au/5/1` | — |
| `P-6b050b321ff558` | Ký túc nam Slytherin | `hogwarts/f1/1` | `slytherin-common` |
| `P-6c6fc8c763f6b7` | Quảng trường Godric’s Hollow | `world/5` | — |
| `P-6d6cfd0e60241f` | Sân Transfiguration (Biến hình) | — | `h2` |
| `P-6e4b06065f0997` | Gian chờ trước Phân loại | — | `hall` |
| `P-6eac4eb0234cb3` | Phòng ngủ Ginny | `world/17` | — |
| `P-6f010e23dbcf13` | Bến Whitecap | `au/3/4` | — |
| `P-6f37aeb5ab1ff0` | Khu nuôi/bảo tồn rồng Romania – nơi Charlie làm việc | `world/27` | — |
| `P-6f640309d1ece1` | Đội Đảo ngược Tai nạn Pháp thuật | — | `ministry2` |
| `P-6fca659549629d` | Bến ga / bến thuyền Hogsmeade ngoài khu nhà ga | — | `h1` |
| `P-704560d7aaa0f1` | Tiền sảnh | `au/3/1` | — |
| `P-712dcf0d542fa9` | Nhà bà Figg | `world/16` | — |
| `P-7146cc78e7b6bb` | Phòng thay đồ | `au/1/3` | — |
| `P-71db87f76e608b` | Hẻm Knockturn | — | `diagon-knockturn` |
| `P-7210700596d5ae` | Phòng ăn | `au/5/1` | — |
| `P-76e93cc0236521` | Văn phòng Liên lạc Yêu tinh | — | `ministry2` |
| `P-78ec748eb7b9ce` | Bếp | `au/5/1` | — |
| `P-7904b8045f6614` | Bìa Rừng Cấm | — | `h1` |
| `P-79710fe4d4bcfa` | Lều Hú và các phòng bên trong | — | `village-static` |
| `P-79d20dbdcafbc7` | Thư viện | `au/3/1` | — |
| `P-7a95ade5b09943` | Phòng BẠN | `au/5/3` | — |
| `P-7abe41594af2ff` | Sân Quidditch | — | `pitch-static` |
| `P-7b1adb6069d328` | Phòng khách Dursley | `world/16` | — |
| `P-7c0776422fe490` | Nhà của Amos Diggory (nếu tách khỏi Ottery St Catchpole) | `world/3` | — |
| `P-7c862bcde92bda` | Phòng ngủ Shell Cottage | `world/18` | — |
| `P-7ceaf0fcb836c1` | Đại sảnh Malfoy Manor | `world/19` | — |
| `P-7d130cc86d97eb` | Ký túc nữ Ravenclaw | `tower/1/1` | `ravenclaw-common` |
| `P-7debd31a87a61e` | Đường tới lều Hagrid | — | `h1` |
| `P-7f18ace1f8b2d7` | Bến thuyền Hogwarts | — | `h1` |
| `P-7fab1a6c46fde1` | Phòng ngủ | `au/2/1` | — |
| `P-80b97fa352d930` | Khu hành chính Wizengamot | — | `ministry2` |
| `P-80ce1ea13c2632` | Phòng sinh hoạt chung Slytherin | `hogwarts/f1/1` | `slytherin-common` |
| `P-8153c1a6e4e7dc` | Sân cỏ cạnh lâu đài | — | `h1` |
| `P-819514c84e1a30` | Phòng kính | `au/3/1` | — |
| `P-81a969eb658163` | Đầu Heo và các phòng của quán | — | `village-static` |
| `P-81c7ab0cff5ac4` | Khu nhà dân Hogsmeade | — | `village-static` |
| `P-81e49b0d4bd6c3` | Phòng ngủ khác nhà Black | `world/15` | — |
| `P-836c31b9c17543` | Kho lưu trữ bản in | `au/1/0` | — |
| `P-8372c04e802fdc` | Tầng 3 – Tai nạn và Thảm họa Pháp thuật | — | `ministry2` |
| `P-838b8e1603bb66` | Phòng ngủ gia đình | `au/3/2` | — |
| `P-83b46b70fcdcc6` | Eeylops Owl Emporium | — | `diagon-knockturn` |
| `P-83c52658df2171` | Các toa Hogwarts Express | — | `express` |
| `P-84e3b35dd330b5` | Phòng tiện ích | `au/5/0` | — |
| `P-851acac2ec7f8b` | Purge and Dowse (mặt tiền St Mungo) | `world/14` | — |
| `P-8547e7b53ee0e6` | Phòng sinh hoạt hướng vườn | `au/4/1` | — |
| `P-85d4eac574abfb` | Phòng thay đồ | `au/2/1` | — |
| `P-866203855d3998` | Phòng tắm | `au/5/2` | — |
| `P-86cd9a8defbb03` | Phòng Thời gian | — | `ministry-8-10` |
| `P-86e7455d5f7d47` | Phòng giáo viên | — | `hall` |
| `P-86f19e61932103` | Phòng tiếp khách | `au/0/2` | — |
| `P-873b198808d71f` | Văn phòng Tư vấn Sinh vật gây hại | — | `ministry2` |
| `P-88aadc4a38ae9c` | Phòng ngủ Harry | `world/16` | — |
| `P-8957dd0847f167` | Các dãy phòng giam Azkaban | `world/20` | — |
| `P-89ce1f70269693` | Số 2 Magnolia Crescent (địa chỉ được nhắc) | `world/16` | — |
| `P-8bd319c866a655` | Gladrags | — | `village-static` |
| `P-8c15e0bfc2d11d` | Khu ổ nhện Aragog | — | `h1` |
| `P-8d8c423e13cb3d` | Xe Buýt Hiệp Sĩ | `world/21` | — |
| `P-8de3a27d58bad8` | Dervish & Banges | — | `village-static` |
| `P-8f34772df41a97` | Phòng khách | `au/5/1` | — |
| `P-8f6fe8ad4cc0c0` | Phòng Tom Riddle ở trại trẻ | `world/14` | — |
| `P-8f7588d4e8a5bc` | Mặt hồ và khu vực trên thuyền | — | `h1` |
| `P-8f8a0811461a67` | Tầng 7 – Trò chơi và Thể thao Pháp thuật | — | `ministry2` |
| `P-8fd2ba76f6cef8` | Sảnh trong khu Ravenclaw | — | `ravenclaw-common` |
| `P-8fd3daca88a6f1` | Khoảng rừng sâu | — | `h1` |
| `P-8ffce1da3d07cd` | Nhà Tonks (địa chỉ không xác định) | `world/15` | — |
| `P-90f19984c65a90` | Nhà Snape | `world/4` | — |
| `P-911d23f3180589` | Số 4 Privet Drive / nhà Dursley | `world/16` | — |
| `P-91e1d4b9d90ce6` | Hồ bơi | `au/3/0` | — |
| `P-91ec4108625f7b` | Câu lạc bộ Gobstones chính thức | — | `ministry2` |
| `P-9253053d400539` | Tiệm áo chùng cũ | — | `diagon-knockturn` |
| `P-9301236b54857d` | Ủy ban Biện minh với Muggle | — | `ministry2` |
| `P-936cbb9c617eca` | Dãy phòng phụ của sân | — | `pitch-static` |
| `P-94a7036730f10e` | Ga Hogsmeade | — | `express` |
| `P-951dc2baa9a710` | Bộ phận Xóa trí nhớ | — | `ministry2` |
| `P-95936a141ed516` | Phòng sau bàn giáo viên | — | `hall` |
| `P-95cdaf84841bcd` | Các tiệm, xưởng, quán trong bản đồ Diagon | — | `diagon-knockturn` |
| `P-95f33b1a222e12` | Làng Little Hangleton | `world/6` | — |
| `P-96d14a7a982d4e` | Các nhà kính Hogwarts và các phòng bên trong | — | `h1` |
| `P-9805ab2f38804f` | Phòng xử án số 10 | — | `ministry-8-10` |
| `P-98946e3d409a8a` | Phòng trà khách thăm | `world/11` | — |
| `P-9b80548a6b0f27` | Phòng của Ủy ban Đăng ký Phù thủy gốc Muggle | `world/26` | — |
| `P-9b9d65883bc0bb` | Phòng khách nhà Black | `world/15` | — |
| `P-9bf6e71ff3108b` | Nhà thuyền Hogwarts | — | `h1` |
| `P-9c19f623bbb1e3` | Vùng sát sân Quidditch ngoài ranh sân | — | `h1` |
| `P-9c45a4f54ea1ee` | Đường dạo ven hồ | — | `h1` |
| `P-9ce0d6987c6167` | Phòng ngủ phía tây | `au/4/3` | — |
| `P-9d66d64ae1eced` | Phòng sở thích | `au/5/4` | — |
| `P-9d882410cbff44` | Khu điều trị bệnh và nhiễm trùng pháp thuật | `world/8` | — |
| `P-9ebcfc85eb0c36` | Sân vận động World Cup | `world/26` | — |
| `P-9f4eba8cbc0134` | Khu điều trị ngộ độc độc dược và thực vật | `world/9` | — |
| `P-9f810bb6686c6d` | Cây cổ thụ ven hồ | — | `h1` |
| `P-9fffb1aaa57eea` | Liễu Roi và bãi đất quanh cây | — | `h1` |
| `P-a04785690fe84b` | Hành lang toa | — | `express` |
| `P-a19b8a7eea3f66` | Khu lều World Cup | `world/26` | — |
| `P-a3d0329c5db5e2` | Văn phòng Liên lạc Pháp thuật Quốc tế | — | `ministry2` |
| `P-a3e9554f74bb7f` | Sảnh tiếp nhận St Mungo | `world/12` | — |
| `P-a40a9139e15cdf` | Phòng khách | `au/0/1` | — |
| `P-a56cde3ee35e1c` | Railview Hotel | `world/4` | — |
| `P-a575b46f2ae1a8` | Khu thử thách Hồ Đen | `world/26` | — |
| `P-a62b074fca27d7` | Khu điều trị thương tổn do bùa chú | `world/10` | — |
| `P-a6360747d2eff6` | Bãi cắm trại trong Rừng Dean | `world/3` | — |
| `P-a63fc4014d765b` | Ký túc nam Gryffindor | `tower/0/1` | `gryffindor-common` |
| `P-a6425ebd843fab` | Ký túc nữ Slytherin | `hogwarts/f1/1` | `slytherin-common` |
| `P-a69db007365fe0` | Rừng Albania – nơi Voldemort trú ẩn | `world/0` | — |
| `P-a8f847e818afa1` | King’s Cross | — | `express` |
| `P-a91d33c0729151` | Charing Cross Road | `world/13` | — |
| `P-aa74a45869a845` | Phòng khách trên xe Buýt Hiệp Sĩ | `world/21` | — |
| `P-aab0be0508401d` | Toa mẫu Ravenclaw | — | `express` |
| `P-aabefd99376d5b` | Nhà Hepzibah Smith | `world/3` | — |
| `P-aae0e4c8ac4172` | Terrace | `au/4/3` | — |
| `P-aae6653add136e` | Nhà khách | `au/4/0` | — |
| `P-aafb6b5cc0a4c6` | Kho dưới mái | `au/5/4` | — |
| `P-ac442939b95160` | Nhà gia đình Longbottom (địa chỉ không xác định) | `world/3` | — |
| `P-ad08891d59bb8b` | Phòng sửa đồ | `au/5/0` | — |
| `P-ad5ac899e9989d` | Study Valerian | `au/0/2` | — |
| `P-ad6b222c1cf8e4` | Văn phòng Sử dụng Pháp thuật Sai trái | — | `ministry2` |
| `P-adc8756e94687f` | Tầng 2 – Thi hành Luật Pháp thuật | — | `ministry2` |
| `P-ae87f1280dad9c` | Cổng chính Hogwarts | — | `h2` |
| `P-aec6a126a04246` | Khu điều trị thương tích do sinh vật | `world/7` | — |
| `P-af6716662de8c8` | Trụ sở Thần Sáng | — | `ministry2` |
| `P-aff4fe8ba8b10c` | Phòng khách & bếp | `au/4/3` | — |
| `P-b063050bb041b4` | Khu đọc và học nhóm bên trong khu Slytherin | — | `slytherin-common` |
| `P-b08a347b7ef127` | Borgin & Burkes | — | `diagon-knockturn` |
| `P-b1a5bbf296daf9` | Ilvermorny School of Witchcraft and Wizardry | `world/29` | — |
| `P-b1b448f37c4d1e` | Bếp Shell Cottage | `world/18` | — |
| `P-b2554d6b1381cd` | Tiền sảnh | `au/5/1` | — |
| `P-b4314de4234c88` | Ký túc nữ Hufflepuff | `hogwarts/f2/1` | `hufflepuff-common` |
| `P-b4e7452b5bd988` | Budleigh Babberton | `world/3` | — |
| `P-b61993cdbfa4f0` | Phòng duyệt bản in | `au/1/4` | — |
| `P-b64b4fd825a7ea` | Phòng giặt | `au/5/0` | — |
| `P-b652531fad15ad` | Flourish & Blotts | — | `diagon-knockturn` |
| `P-b73feb15c40870` | Phòng ngủ Sirius Black | `world/15` | — |
| `P-b830cb70ee02f6` | Vườn nhà Hagrid | — | `h1` |
| `P-b86cbfbdc07271` | Hang biển của Voldemort | `world/26` | — |
| `P-b879bbed8fdc49` | Sân ga Hogsmeade (khu tàu) | — | `express` |
| `P-ba63b94f595caf` | Sân trong gắn với map hall | — | `hall` |
| `P-bb3906692ce0a3` | Lối đi và bãi đất ven hồ | — | `h1` |
| `P-bbfe47f234c957` | Phòng khách Malfoy Manor | `world/19` | — |
| `P-bca1f1945d52e9` | Sân Viaduct | — | `h2` |
| `P-bd4a42764da881` | Phòng Tử thần | — | `ministry-8-10` |
| `P-bdd56dfa509b7c` | Potage’s Cauldrons | — | `diagon-knockturn` |
| `P-bf3c24a146fb6a` | Phòng chờ xét xử | — | `ministry-8-10` |
| `P-c061b81bba5c42` | Đường tới sân Quidditch | — | `h1` |
| `P-c089c78b883a86` | Sảnh Tiên tri | — | `ministry-8-10` |
| `P-c11e875f2e672c` | Gác mái Hang Sóc | `world/17` | — |
| `P-c12015ea2dc205` | Đảo đá trong hồ hang biển | `world/26` | — |
| `P-c22fddd973f9ed` | Số 11 Grimmauld Place | `world/15` | — |
| `P-c2473d02e0de42` | Magical Menagerie | — | `diagon-knockturn` |
| `P-c251f1aa2096c0` | Khu tiếp nhận khách Bộ Pháp thuật | — | `ministry-8-10` |
| `P-c2ae860eb1abb4` | Phòng sinh hoạt | `au/3/2` | — |
| `P-c2b0b9eb3b7897` | Phòng sở thích | `au/3/3` | — |
| `P-c342fdc0ef620b` | Madam Malkin’s | — | `diagon-knockturn` |
| `P-c3f56557f43009` | Vườn Hang Sóc | `world/17` | — |
| `P-c48031b40aa4a6` | Phòng thiết bị | `au/1/0` | — |
| `P-c4b0eda051d309` | Mê cung Tam Pháp thuật ở sân Quidditch | `world/26` | — |
| `P-c6d06746fedb75` | Phòng biên tập | `au/1/2` | — |
| `P-c7580930f2caac` | Phòng bệnh dài hạn Janus Thickey | `world/10` | — |
| `P-c7788eabe9f16a` | Cái Vạc Lủng và các phòng trọ | — | `diagon-knockturn` |
| `P-c7df9592a50155` | Số 12 Grimmauld Place / nhà Black | `world/15` | — |
| `P-c8e6b9a47ac0b8` | Các cửa hàng hiện trong làng | — | `village-static` |
| `P-c901ae9bd25828` | Toa mẫu Slytherin | — | `express` |
| `P-c97880d2883d88` | Quality Quidditch Supplies | — | `diagon-knockturn` |
| `P-c986bd14a65aff` | Bếp | `au/0/0` | — |
| `P-ca5dbc8d9268d5` | Hiên ngoài | `au/3/1` | — |
| `P-cabb450c67c344` | Hành lang chung trong khu Hufflepuff | — | `hufflepuff-common` |
| `P-cad4970480cc75` | Phòng đọc | `au/4/2` | — |
| `P-cadd273181369d` | Phòng ngủ chính | `au/5/2` | — |
| `P-cbf1bbfe09504a` | Phòng tiếp khách | `au/1/1` | — |
| `P-cc0a4d9d894357` | Kho tiền 713 | — | `diagon-knockturn` |
| `P-cc5bcc4d694457` | Lối lên Nhà cú | — | `h1` |
| `P-cc6eda155ffa84` | Phòng họp | `au/1/2` | — |
| `P-cd916ab4eeb2b0` | Kho dưới mái | `au/3/3` | — |
| `P-cdc1a91748b387` | Hầm giam Malfoy Manor | `world/19` | — |
| `P-ce57067fcd107f` | Phòng nhỏ cạnh Đại Sảnh | `hogwarts/f3/2` | `hall` |
| `P-ce64687addd09a` | Honeydukes và tầng hầm | — | `village-static` |
| `P-ceed22a8b82bc0` | Phòng mẫu | `au/1/3` | — |
| `P-cf6e6f0ff253af` | Nghĩa địa Little Hangleton | `world/6` | — |
| `P-cf86b4537874ba` | Kho chổi tại sân | — | `pitch-static` |
| `P-d1e5c9e5641c72` | Sảnh chung | `au/2/0` | — |
| `P-d216ce626788ed` | Lối lên Cầu thang Lớn tại Tiền sảnh | — | `hall` |
| `P-d2a51c4e5a9cd6` | Quảng trường Hogsmeade | — | `village-static` |
| `P-d311ceb6407c3e` | Phòng ngủ Dudley | `world/16` | — |
| `P-d45c30dace5abc` | Nhà tù Azkaban | `world/20` | — |
| `P-d5c52789ba1582` | Sảnh | `au/0/1` | — |
| `P-d62f3f91b273a7` | Phòng khách & bếp | `au/2/1` | — |
| `P-d76cff03ee7601` | Đường mòn giữa Hogwarts và Hogsmeade | — | `h1` |
| `P-d85dbd8c19bb3b` | Các ngõ phố nối Hẻm Xéo và Knockturn | — | `diagon-knockturn` |
| `P-da0766f575a2ce` | Cơ quan Khóa Cảng | — | `ministry2` |
| `P-da0da47f74a252` | Khu đọc và học nhóm bên trong khu Ravenclaw | — | `ravenclaw-common` |
| `P-dadcf596a0437f` | Khu an ninh Bộ Pháp thuật | — | `ministry-8-10` |
| `P-dafe46b4834d00` | Khu chờ lên tàu tại King’s Cross | — | `express` |
| `P-dbdb26cb4f253a` | Sân sau Cái Vạc Lủng | — | `diagon-knockturn` |
| `P-dc6e4d25cb717b` | Castelobruxo School of Magic | `world/2` | — |
| `P-de97c63af46b5c` | Sân Clock Tower (Đồng hồ) | — | `h2` |
| `P-dec21f949ed798` | Làng Godric’s Hollow | `world/5` | — |
| `P-df07d01094f11f` | Túp lều ngoài biển trong tập một | `world/3` | — |
| `P-df6db152b7d063` | Gầm cầu thang nhà Dursley | `world/16` | — |
| `P-df6ec24bb2876c` | Khu giao thông Floo Bộ Pháp thuật | — | `ministry-8-10` |
| `P-dfec655aa06ffb` | Vườn | `au/3/0` | — |
| `P-dfec82bd2d4f53` | Khu thương mại / luật quốc tế | — | `ministry2` |
| `P-e10f1f2455074a` | Nhà Diggle (địa chỉ không xác định) | `world/15` | — |
| `P-e1641c684d1741` | Toa mẫu Hufflepuff | — | `express` |
| `P-e1b58685e41178` | Nhà Diggory | `world/17` | — |
| `P-e207e1cad9aa75` | Mahoutokoro School of Magic | `world/25` | — |
| `P-e27a6e6c098632` | Phòng thay đồ các đội | — | `pitch-static` |
| `P-e320c112ea6a38` | Ban công | `au/3/2` | — |
| `P-e3c60767666046` | Vườn nhà Lovegood | `world/17` | — |
| `P-e51ad92343c8de` | Master suite | `au/0/3` | — |
| `P-e57b3aa8509cf4` | Làng Great Hangleton | `world/6` | — |
| `P-e68bc933cbfc46` | Làng Ottery St Catchpole | `world/17` | — |
| `P-e7944584d870f6` | Studio sáng tạo | `au/1/4` | — |
| `P-e7ebf6e1f0fcb9` | Bãi học bay | — | `h1` |
| `P-ea0d1c088bb35d` | Hogwarts Express | — | `express` |
| `P-eb0e081c67cc39` | Phòng sinh hoạt nhà Lovegood | `world/17` | — |
| `P-eb74631b825f74` | Scrivenshaft’s | — | `village-static` |
| `P-ebceb992eb9255` | Ký túc nam Hufflepuff | `hogwarts/f2/1` | `hufflepuff-common` |
| `P-ecc27e85264a4a` | Nhà Kingsley Shacklebolt (địa chỉ không xác định) | `world/15` | — |
| `P-ece8b34b0783e7` | Apothecary | — | `diagon-knockturn` |
| `P-ee2064eb7e377a` | Trại trẻ mồ côi của Tom Riddle | `world/14` | — |
| `P-eeb5352311e7c0` | Sân tập nhỏ trong quần thể Quidditch | — | `pitch-static` |
| `P-eeef4f392301fb` | Phòng tạo kiểu | `au/1/3` | — |
| `P-efe5e3b54c110c` | Số 7 Privet Drive | `world/16` | — |
| `P-effd8342cc396c` | Bãi cỏ học tập quanh trường | — | `h1` |
| `P-f012e9d745204b` | Khu bảo vệ Hòn đá Phù thủy dưới Hogwarts | `world/26` | — |
| `P-f11d32df681cb8` | Thư viện ấn phẩm | `au/1/5` | — |
| `P-f1273cfbd8dcc9` | Phòng giao nhận | `au/1/1` | — |
| `P-f257da4f8369a2` | Phòng khách | `au/4/1` | — |
| `P-f29f8a2656ded8` | Bưu điện Hogsmeade | — | `village-static` |
| `P-f2d3a414a25b76` | Vườn Thảo dược | — | `h1` |
| `P-f30d790b24b65a` | Các ngõ ở Hogsmeade | — | `village-static` |
| `P-f322d7e98b6a02` | Nhà cú và khu vực bên trong Nhà cú | — | `h1` |
| `P-f4ef10f0794466` | Gambol & Japes | — | `diagon-knockturn` |
| `P-f52be73f7dd9ce` | Bộ phận Linh hồn | — | `ministry2` |
| `P-f5b0d79a9fcc91` | Sân hồ bơi | `au/4/0` | — |
| `P-f6319cb5ddb159` | Sân chân tháp trong khối lâu đài | — | `h2` |
| `P-f63320e3ce02f8` | Pantry | `au/0/0` | — |
| `P-f66347f72f87d0` | Trụ sở Liên đoàn Quidditch Anh–Ireland | — | `ministry2` |
| `P-f67fdab0b798c6` | Phòng khách ngủ | `au/5/3` | — |
| `P-f6ff23e797445d` | Phòng Không gian | — | `ministry-8-10` |
| `P-f76c14a8f564e2` | Bếp nhỏ | `au/1/5` | — |
| `P-f79a562f43d99a` | Cầu cạn Viaduct | — | `h2` |
| `P-f8ed3dbe20d357` | Ngoại thất khối lâu đài Hogwarts | — | `h2` |
| `P-f9359f86975e71` | Lối đi và sân trong ranh khu Quidditch | — | `pitch-static` |
| `P-f9c67c9c540345` | Văn phòng Thứ trưởng / trợ lý Bộ trưởng | — | `ministry2` |
| `P-fafa275e3442de` | Chuồng gia cầm | `au/3/0` | — |
| `P-fb05960b29389c` | Bãi biển Whitecap | `au/3/0` | — |
| `P-fb55d3d6b976e4` | Phòng gia đình | `au/4/2` | — |
| `P-fbcb3e25adb914` | Vườn | `au/4/0` | — |
| `P-fc634b366552e4` | Cửa hàng bệnh viện | `world/11` | — |
| `P-fd24a44f33135c` | Phòng Não | — | `ministry-8-10` |
| `P-fd29682932d8c0` | Tiền sảnh | `au/4/1` | — |
| `P-fde802b26605cc` | Kho tiền gia đình Potter | — | `diagon-knockturn` |
| `P-ff60dc5c801cf1` | Bãi chơi Quidditch sau nhà | `world/17` | — |
| `P-ff62bf19892de9` | Đường tới nhà ga Hogsmeade | — | `h1` |
| `TWR-01-01-02` | Lối thang ký túc nam | `tower/0/0` | — |
| `TWR-01-01-03` | Lối thang ký túc nữ | `tower/0/0` | — |
| `TWR-01-02-03` | Phòng sinh hoạt học sinh cuối hành lang | `tower/0/1` | — |
| `TWR-02-01-02` | Sảnh vào Ravenclaw | `tower/1/0` | — |
| `TWR-02-01-03` | Phòng đọc học thuật Ravenclaw | `tower/1/0` | — |
| `TWR-02-02-03` | Phòng học nhóm Ravenclaw | `tower/1/1` | — |
| `TWR-03-01-01` | Cầu thang xoắn lên Tháp Bắc | `tower/2/0` | — |
| `TWR-03-01-02` | Phòng lưu bản đồ sao Tiên tri | `tower/2/0` | — |
| `TWR-03-02-01` | Phòng học Tiên tri | `tower/2/1` | — |
| `TWR-03-02-02` | Kho dụng cụ bói toán | `tower/2/1` | — |
| `TWR-04-01-01` | Hành lang chân Tháp Thiên văn | `tower/3/0` | — |
| `TWR-04-01-02` | Phòng bảo trì kính thiên văn | `tower/3/0` | — |
| `TWR-04-02-01` | Phòng chuẩn bị quan sát | `tower/3/1` | — |
| `TWR-04-02-02` | Kho bản đồ sao | `tower/3/1` | — |
| `TWR-04-03-01` | Phòng học Thiên văn | `tower/3/2` | — |
| `TWR-04-03-02` | Đài quan sát Thiên văn | `tower/3/2` | — |
| `TWR-05-01-01` | Cầu thang xoắn sau tượng đá | `tower/4/0` | — |
| `TWR-05-01-02` | Phòng chờ văn phòng Hiệu trưởng | `tower/4/0` | — |
| `TWR-05-02-01` | Văn phòng Hiệu trưởng | `tower/4/1` | — |
| `TWR-05-02-02` | Phòng lưu dụng cụ hiệu trưởng | `tower/4/1` | — |
| `TWR-05-02-03` | Kho tài liệu Hiệu trưởng | `tower/4/1` | — |
| `TWR-06-01-01` | Sảnh Tháp Đồng hồ | `tower/5/0` | — |
| `TWR-06-01-02` | Phòng trực giờ giấc | `tower/5/0` | — |
| `TWR-06-02-01` | Gian cơ cấu bánh răng | `tower/5/1` | — |
| `TWR-06-02-02` | Phòng bảo trì đồng hồ | `tower/5/1` | — |
| `TWR-06-03-01` | Buồng quả lắc lớn | `tower/5/2` | — |
| `TWR-06-03-02` | Buồng kiểm tra chuông giờ | `tower/5/2` | — |
| `TWR-07-01-02` | Phòng giữ dụng cụ chuông | `tower/6/0` | — |
| `TWR-07-02-01` | Đài treo chuông | `tower/6/1` | — |
| `TWR-07-02-02` | Phòng vận hành chuông | `tower/6/1` | — |
| `TWR-08-01-01` | Lối vào Faculty Tower | `tower/7/0` | — |
| `TWR-08-01-02` | Phòng trực nhân viên | `tower/7/0` | — |
| `TWR-08-02-01` | Hành lang các phòng giáo viên | `tower/7/1` | — |
| `TWR-08-02-02` | Phòng nghỉ giáo viên | `tower/7/1` | — |
| `TWR-08-03-01` | Hành lang nối bệnh xá | `tower/7/2` | — |
| `TWR-08-03-02` | Phòng họp giảng viên kín | `tower/7/2` | — |
| `TWR-09-01-01` | Sảnh chân Tháp DADA | `tower/8/0` | — |
| `TWR-09-01-02` | Kho đạo cụ phòng vệ | `tower/8/0` | — |
| `TWR-09-02-01` | Phòng học Phòng chống Nghệ thuật Hắc ám — cửa tháp | `tower/8/1` | — |
| `TWR-09-02-02` | Phòng tập đũa phép tại tháp | `tower/8/1` | — |
| `TWR-09-03-01` | Hành lang Tháp DADA tầng cao | `tower/8/2` | — |
| `TWR-09-03-02` | Phòng làm việc bổ trợ DADA | `tower/8/2` | — |
| `TWR-10-01-01` | Cầu thang Lớn | `tower/9/0` | — |
| `TWR-10-01-02` | Buồng kiểm tra cầu thang | `tower/9/0` | — |
| `TWR-10-02-01` | Hành lang tranh nối Cầu thang Lớn | `tower/9/1` | — |
| `TWR-10-02-02` | Phòng trực hành lang giữa tầng | `tower/9/1` | — |
| `TWR-10-03-01` | Sảnh cao Cầu thang Lớn | `tower/9/2` | — |
| `TWR-10-03-02` | Kho bảng hướng dẫn lớp | `tower/9/2` | — |
| `TWR-11-01-01` | Cầu thang Nhà cú | `tower/10/0` | — |
| `TWR-11-01-02` | Kho thức ăn cho cú | `tower/10/0` | — |
| `TWR-11-02-01` | Nhà cú (Owlery) | `tower/10/1` | — |
| `TWR-11-02-02` | Phòng chăm sóc cú bị thương | `tower/10/1` | — |

---

**Điều kiện đối chiếu:** 726 ID chuẩn duy nhất; các nhóm không có ID treo; 21 bản ghi có alias; 5 ID nhiều nhóm chỉ là tham chiếu; 44 khu Hogwarts còn nguyên Bắc/Đông/Nam/Tây. **Không có thay đổi trực tiếp lên JSON hoặc logic engine.**
