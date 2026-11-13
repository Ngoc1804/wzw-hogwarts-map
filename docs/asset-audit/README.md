# WIZAMAP · Asset audit · Giai đoạn 1

**Nhánh:** `asset_1` · **Nguồn nền:** `demo-5` (`39951220d0ea25bc2ecea5aeeed98de427cf0665`) · **Ngày:** 2026-11-13

## Nguyên tắc đã chốt
- **Kiến trúc/phòng:** 2.5D, tường có độ dày, sàn và hành lang giữ hình học/độ sâu như bộ kiểm 10 corridor + 3 outdoor.
- **Đồ nội thất:** SVG minh họa **phẳng 2D**, cho phép phối hợp các góc `top/front/side` phù hợp mặt bằng; không ép isometric, không dựng khối 3D.
- Ngoại thất nhà 2.5D đã duyệt được bảo vệ. Không đổi Atlas, template khóa, MAP_DATA, RP và hoạt ảnh dấu chân.
- **Giai đoạn 1 chỉ audit, chưa xóa hoặc thay SVG.** Các trạng thái dưới đây là đề xuất để triển khai giai đoạn sau.

## Nguồn dữ liệu
1. File người dùng cung cấp `asset-review.html`: 432 design ứng viên trong 1 HTML; 1376 bản ghi nguồn theo metadata file, trong đó 911 bản sao dùng chung và 33 bản cây cũ loại khỏi danh sách ứng viên. File này ghi `productionStatus: UNCHANGED — pending user approval`.
2. `elements/catalog.json` tại `asset_1`: **259** asset canonical, tương ứng **259 SVG** trong `elements/assets/`.
3. Repo `runtime/furnishings.mjs`, `runtime/outdoor.mjs`, `runtime/scene-assets.mjs`, `elements/presets.json` và một số file runtime khác đã đối chiếu bằng GitHub.
4. Ảnh người dùng cung cấp: các cụm để bàn, tủ/kệ, nhà chính diện phẳng, nhóm tường/sàn và bộ screenshot preview phòng.

## Kết quả phân loại 432 ứng viên

| Quyết định | Số design | Ý nghĩa |
|---|---:|---|
| KEEP | 187 | Giữ artwork/cấu kiện hiện có, hoặc giữ cho lớp geometry/template |
| REWORK | 221 | Chỉnh nét, tỷ lệ, trang trí, bố cục theo style 2D phẳng |
| REPLACE | 10 | Tủ phẳng đơn giản: dùng thiết kế tủ đẹp hơn để thay |
| REMOVE | 14 | Nhà chính diện phẳng trong nhóm `Nhà cửa · Khối cơ bản`, đề xuất loại **khỏi artwork catalog** |
| **Tổng** | **432** | Từng design ghi đủ ID và lý do trong CSV |

**Chú ý:** 432 là design ứng viên, không phải 432 file trong repo. 259 unique `originalId` hiện diện trong source canonical; xuất hiện tổng cộng 303 hàng candidate trong file do có nhiều phiên bản theo cùng một `originalId`. 129 candidate có `originalId` ngoài canonical 259. Có 385 unique `originalId` trong 432 mục, vì vậy **47 lượt trùng ID**, không tự động đồng nghĩa SVG trùng hình.

Chi tiết theo từng design: [`phase1-432-designs.csv`](./phase1-432-designs.csv).

## Nhóm cần xử lý ưu tiên

| Nhóm | Số mẫu trong HTML | Hành động |
|---|---:|---|
| `Phù thủy · Cụm trên bàn` | 7 | REWORK: Tiên tri, nghiên cứu phép, Hiệu trưởng, Thiên văn, sách và giấy da, trà, chân nến |
| `Nội thất · Tủ kệ` | 13 | 10 REPLACE, 3 REWORK; phải chuyển tham chiếu đúng trước khi xóa |
| `Phù thủy · Tủ kệ` | 11 | REWORK: ưu tiên artwork đẹp hiện có, không làm tủ 3D |
| `Nội thất · SVG mới` | 39 | REWORK và đánh giá nguồn trước khi nhập vào canonical 259 |
| `Nhà cửa · Khối cơ bản` | 14 | REMOVE khỏi artwork hiển thị, chưa xóa file/alias/preset |
| `Nhà · Khung basic` | 6 | KEEP để làm hình học/phòng, không dùng làm tranh mặt đứng |
| `Nhà · Nhà gỗ` + `Nhà · Nhà tường` | 12 | KEEP các model 2.5D |
| `Hành lang · Sàn` + `Hành lang · Tường` | 19 | KEEP trong geometry/materials |
| `Hành lang · Cửa` + `Hành lang · Cửa sổ` | 10 | KEEP cho lớp kiến trúc |
| `Cây · Đặc biệt` và `Map · Biến thể đang dùng` | 7 | KEEP, tránh thay đồ đã duyệt |

## Motif nơ lặp

- Trong **432 SVG snapshot**: có **32 design** chứa chuỗi nhận dạng `q-15-15-19 0`. Đây là số **bản thiết kế**, không phải số file production.
- Đã kiểm tra một tập các asset tương ứng trong `elements/assets/` bằng GitHub: xác nhận motif có ở `wizard.fireplace-carved.svg`, `cluster.divination.svg`, `decor.portrait-wall.svg`, `decor.mirror.svg`.
- Một số mẫu trong HTML có motif nhưng bản canonical cùng `originalId` **không có** motif, ví dụ `table.dining.svg`, `storage.cabinet.svg`, `wizard.potions-cabinet.svg`. Vì vậy không được xóa theo tên file hay báo sai là 32 file hiện hành đều có nơ.
- Giai đoạn chỉnh SVG sẽ quét toàn bộ `elements/assets/*.svg`, nhận dạng chính xác nét lỗi rồi xóa **path motif**, bảo vệ hoa văn hợp lệ.

## Phụ thuộc trước khi dọn

Đã xuất [`phase1-live-dependencies-259.csv`](./phase1-live-dependencies-259.csv) liệt kê đầy đủ 259 ID, SVG nguồn và tham chiếu mã rõ ràng trong **12 file runtime/preset/gallery chọn lọc**.

- Có **49/259 ID** được nhắc trực tiếp trong tập file kiểm tra. Các file chứa tham chiếu gồm `runtime/furnishings.mjs`, `runtime/outdoor.mjs`, `elements/presets.json`.
- **Không được hiểu 210 ID còn lại là không sử dụng**. `scene-assets.mjs` nạp SVG động qua catalog/ID; template có thể tham chiếu động hoặc nhúng artwork. Phải quét toàn repo, runtime bundle và các map payload trước khi xóa.
- `house.cottage`, `house.timber`, `house.townhouse` thuộc nhóm **candidate phẳng** trong HTML, nhưng có thể là alias trong `elements/presets.json`. Loại khỏi gallery khác với xóa alias có chức năng.
- `storage.cabinet`, `storage.display`, `storage.bookcase` vẫn được `runtime/furnishings.mjs` dùng; đổi artwork mới theo ID tương thích hoặc migrate có kiểm tra.

## Danh sách 16 cụm bàn để thiết kế ở giai đoạn sau

`D01` Tiên tri · `D02` Nghiên cứu phép · `D03` Hiệu trưởng · `D04` Thiên văn · `D05` Sách/giấy da · `D06` Trà · `D07` Chân nến. Đây là 7 cụm có sẵn; sẽ làm lại với SVG **phẳng 2D**.

Đề xuất thêm `D08` Độc dược · `D09` Thảo dược · `D10` Y tế · `D11` Hồ sơ · `D12` Bếp · `D13` Bàn ăn · `D14` Quầy hàng · `D15` Chế tác · `D16` Bàn cá nhân. **Chưa tạo SVG mới trong giai đoạn 1.**

## Việc khóa bảo vệ

- Chỉ làm việc trên `asset_1`. Không merge `main`, không triển khai bản phát hành.
- Không thay `elements/catalog.json`, `runtime/`, `maps/`, `templates/`, `ui/` trong audit.
- Không xóa các asset được tạo cho H1/H2, cây đặc biệt, dấu chân sáu nhịp hoặc asset trong artwork cố định đã duyệt.
- Chỉ thực thi REMOVE/REPLACE sau khi thiết kế thay thế và kiểm thử các cảnh mẫu.

## Trạng thái

**PHASE 1: inventory + draft triage + direct-reference audit complete.** Audit hình học/đồ họa chi tiết từng asset, full-repo reachability và kiểm thử browser cần được tiếp tục trước khi xóa hoặc thay asset thật. Đây là nền an toàn cho giai đoạn 2.
