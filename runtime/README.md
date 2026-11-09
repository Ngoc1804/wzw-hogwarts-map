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

## Trạng thái hành lang

Demo và bộ dựng hình hành lang cũ đã bị loại bỏ khỏi source hiện hành theo yêu cầu người dùng. Renderer thay thế chưa triển khai. Kế hoạch phát triển chưa được người dùng duyệt và phải được thảo luận trong chat trước khi đưa lên GitHub.
