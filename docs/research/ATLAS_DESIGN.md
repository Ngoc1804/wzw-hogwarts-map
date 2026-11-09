# Research / design cho atlas canon và bộ dựng

Nguồn hình cây: SVG template Quidditch hiện hành. Nét mảnh, tán hữu cơ nhiều tầng, thân có nhánh/vân, bóng chân nhẹ; tránh quả cầu/khối tam giác đơn giản. Nhà dùng ba nhóm base gỗ, gạch/tường và khung basic; biển hiệu, màu, số tầng và decor thuộc instance/preset, không tạo thêm thẻ theo từng cửa hàng. Hybrid: phòng/tường/đường đi là mặt bằng; decor được dùng mặt đứng/2.5D.

## Nguồn và ranh giới canon

- [Hogwarts Castle](https://www.hp-lexicon.org/place/great-britain-united-kingdom/scotland/hogwarts-castle/): nguồn đối chiếu vị trí theo sách; các vị trí có thể mâu thuẫn qua các tập.
- [Floor by Floor — Introduction](https://www.hp-lexicon.org/place/atlas-wizarding-world/atlas-of-hogwarts/hogwarts-castle-floor-floor-introduction/): bản blueprint của người nghiên cứu, tự xác nhận không phải canon. Chỉ dùng để dẫn nghiên cứu, không chép sơ đồ thành sự thật sách.
- [Room of Requirement — official](https://www.harrypotter.com/fact-file/locations/the-room-of-requirement): tầng bảy. Cơ chế xuất hiện phụ thuộc nhu cầu, không cố định mặt bằng.
- [Các tầng Hogwarts](https://www.hp-lexicon.org/placetype/rooms/?letter=H): phòng tắm prefect tầng năm, dẫn GF23; Phòng Yêu cầu dẫn OP18/27, HBP21. Phải lưu nguồn từng khẳng định, không suy cửa cạnh nhau.
- [Diagon Alley](https://www.hp-lexicon.org/place/great-britain-united-kingdom/england/london/diagon-alley/): PS5/PA4/HBP6. Cửa hàng đóng/mở theo thời kỳ phải là overlay, không đẻ template mới.
- [Hogsmeade](https://www.hp-lexicon.org/place/great-britain-united-kingdom/scotland/hogsmeade/): dẫn PA10. Nhà gỗ là ngôn ngữ thiết kế đã duyệt, không phải tuyên bố mọi nhà trong sách đều gỗ.
- [Department of Mysteries](https://www.hp-lexicon.org/thing/ministry-of-magic/department-of-mysteries/): tầng chín, OP7; nội dung các phòng qua OP34/35 cần knowledge gate.
- [Auror Headquarters](https://www.hp-lexicon.org/thing/ministry-of-magic/department-of-magical-law-enforcement/auror-headquarters/): tầng hai, dẫn OP7.

Các nguồn Lexicon là nghiên cứu thứ cấp dẫn chương sách. Chưa tuyên bố đã kiểm trực tiếp toàn văn bảy sách. Không chép prose dài hay artwork từ nguồn web.

## Kiến trúc dữ liệu phải tiếp tục

1. Canon registry độc lập với template: khu vực/tầng → phòng, nhà, tiệm và địa điểm đặc biệt. Phòng chưa có hình vẫn được khai báo.
2. Mỗi vị trí có evidence theo từng thuộc tính: book/chapter, nguồn tham chiếu, certainty; tọa độ/đường bao tự thiết kế là illustration/AU.
3. Không cố ép phòng có vị trí mâu thuẫn vào một floor duy nhất. Cho phép assertion theo sách/thời kỳ và override campaign.
4. Campaign overlay thay/đặt thêm địa điểm, AU và trạng thái theo năm; không sửa canon gốc.
5. Renderer quyết định template/base/preset. Asset hình không chứng minh địa điểm tồn tại trong canon.
6. Runtime lọc NPC, quest, quyền biết, các phòng bí mật trước khi xuất MAP_DATA; atlas không chứa state RP.

Đây là research/design brief. Atlas hiện 138 mục template vẫn chưa phải bộ canon toàn cõi; không đổi nhãn phạm vi để che thiếu dữ liệu. Cần nghiên cứu thêm nhà ở, St Mungo, Azkaban, địa điểm các tập và trường quốc tế; không tự thêm phòng nội thất không được sách xác định.
