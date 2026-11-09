# MAP_DATA 1.0.0 — cơ chế đã chốt

**Trạng thái:** có schema, ví dụ, validator, bộ chọn template/recipe và adapter lưu layout có kiểm tính ổn định. Chưa có full rendering engine, chưa ghép UI vào index.html, chưa triển khai /map vận hành trong AI Studio. Không nhầm module trả render plan với bản đồ đã vẽ.

Nguồn hợp đồng duy nhất: `map-data.schema.json`. Quy tắc và flow: `../docs/MAP_FLOW.md`. Hai JSON trong `examples/` chỉ là fixture minh họa, không phải NPC/quest thật hoặc bản đồ canon mới.

| File | Vai trò |
|---|---|
| map-data.schema.json | Hợp đồng đầy đủ, đóng trường lạ, giới hạn và loại dữ liệu |
| map-data.mjs | Kiểm schema được dùng ở đây và các quan hệ ID, locality, cap, tháng/pack; serialize an toàn |
| templates.json | Registry adapter từ index template hiện tại, không phải atlas canon |
| resolve-map.mjs | Chọn template chính xác hoặc recipe; khóa layout + seed SHA-256 |
| prepare-map.mjs | Gọi storage/geometry callbacks, không cho di chuyển phòng cũ hoặc đổi seed |

```js
import {prepareMap} from './prepare-map.mjs';
const plan = await prepareMap(MAP_DATA, {
  loadLayout, saveLayout, createLayout, extendLayout
});
// Render plan cục bộ bằng viewer/template crop hoặc hybrid renderer sau khi chúng được hoàn thiện.
```

Các callback do host cung cấp; module không giả làm storage đã triển khai. Host phải lưu bền và khóa/serialize cập nhật theo layout key. LocalStorage chỉ là cache, không bảo đảm qua các Preview origin khác nhau. Thiếu state đã chỉ định phải báo lỗi, không tự dựng lại.

Validator không biết NPC card, bí mật, monthly pack hay chat. Nó chỉ kiểm tính nhất quán của dữ liệu khai báo. Gemini chịu trách nhiệm chọn đúng nội dung, gate và quest nguồn. Không fetch hoặc gửi toàn bộ prompt/pack vào GitHub.

Template không khớp là fallback sang recipe (auto) hoặc lỗi rõ (template bắt buộc). Recipe còn thiếu thì yêu cầu bổ sung dữ liệu; không đoán theo tên. Chỉ được mount sau khi thực hiện crop/mask cục bộ; không mount toàn tầng rồi gọi đó là local map. Full SVG tĩnh không phải cơ chế bảo mật bí mật RP.

Node 24+ dùng được các module này; trình duyệt hiện đại cần JSON modules và Web Crypto. Đóng gói thành browser bundle ghim commit và thử AI Studio vẫn là công việc tiếp theo.

Kiểm tra: `node --test tools/test_map_data.mjs` từ root repo.

Khi index atlas thay đổi, chạy `python tools/sync_template_registry.py` để cập nhật adapter; lệnh này không sửa maps/*.

## Prototype hình học hành lang

`corridors.mjs` có 7 loại: straight, L, T, cross, U, curved, loop; trả path/ports theo kích thước đầu vào. `tools/corridor-demo.html` là một mạng mẫu nối 16 phòng với asset hiện hành. Dựng lại bằng `python tools/build_corridor_demo.py`. Đây là test hình học, chưa tự bố trí từ mọi MAP_DATA, chưa nối UI/gameplay. Không có persistence bắt buộc giữa các Preview độc lập.
