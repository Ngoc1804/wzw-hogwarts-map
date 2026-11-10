# /MAP cho Gemini và AI Studio Preview

Flow: `/MAP → MAP_DATA → template/atlas hoặc dựng phòng bằng element → nội thất/decor → NPC → Preview`.

1. Đọc diễn biến RP/correction, ngày giờ RP, nơi PC đứng, NPC/nhóm hiện diện và quest đúng pack tháng. Lọc quyền biết trước khi xuất dữ liệu.
2. Tra ID trong `maps/WZW_ATLAS_CLEAN_FINAL_REVIEW.json`; runtime tự đối chiếu alias/binding. Mặt bằng có sẵn dùng template; tùy biến nội thất chọn `view.preferredMode="generated"` và mô tả `generation` của từng phòng.
3. Chọn đồ từ `elements/catalog.json`. Thiếu đồ thì tạo `custom.shapes` theo yêu cầu, cùng phong cách vector; không tự sinh lại toàn bộ HTML/SVG giao diện. Bộ mặc định theo chức năng chỉ dùng khi chưa có yêu cầu cụ thể. Xem [INDOOR_PREVIEW.md](INDOOR_PREVIEW.md).
4. Xuất HTML theo shell dưới, thay `{}` trong `rp-map-data` bằng JSON đúng [schema](../runtime/map-data.schema.json). Escape `<` thành `\u003c` trong JSON nhúng. Schema ở runtime là nguồn hợp đồng duy nhất.

Giới hạn PC + 10 tag NPC/nhóm, 6 hint đúng tháng/pack. `stance=walk` là “Đang đi”; RP quyết định việc di chuyển. Không gửi bí mật xuống Preview để giấu bằng fog. Crop theo cảnh, không có bán kính cứng quanh PC; fog cần geometry rõ.

Mọi semantic floor đi được, không phụ thuộc vật liệu. Nhân vật ở trong công trình ngoài trời dùng `environment=inside`, nhãn trên mái; ngoài trời dùng `environment=outside` và `position` trên đất/sàn. Nếu place gộp nhiều nhà, truyền `buildingId` chính xác. Không đoán điểm đứng từ bbox mái nhà.

Một cảnh một tầng; dùng 10 công thức hành lang và 6 hình phòng đã có. Mặt bằng cố định như Bộ Pháp thuật/sân trong/ngoài trời không tự dựng lại. Giữ policy AU: chỉ CCC 07.18 phòng chính, Nhà PC London và Liad’s Attic được mở; các map AU khác vẫn khóa.

Bundle và asset ghim commit. Chỉ tải atlas khi dùng template và chỉ tải asset thực dùng. Preview không ghi ngược GitHub, không storage/seed/backend/pathfinding. HTML tải xuống nhúng asset đã dùng để mở offline.

## Shell

```html
<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP</title><body><p id="status">Đang tải WIZAMAP…</p><iframe title="Bản đồ RP" sandbox="allow-scripts allow-downloads" style="width:100%;height:90dvh;border:0"></iframe><script type="application/json" id="rp-map-data">{}</script><script>
(async()=>{try{const data=JSON.parse(document.querySelector('#rp-map-data').textContent);const r=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@677595190cd1959cffedafb8968754afe0cf9fb5/runtime/bundle.js');if(!r.ok)throw Error('Runtime HTTP '+r.status);const code=await r.text();const safe=JSON.stringify(data).replace(/</g,'\\u003c');document.querySelector('iframe').srcdoc='<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body><script type="application/json" id="MAP_DATA">'+safe+'<\/script><script>'+code.replace(/<\/script/gi,'<\\/script')+'<\/script>';document.querySelector('#status').textContent='Runtime đã tải; trạng thái dữ liệu hiển thị bên trong bản đồ.'}catch(e){document.querySelector('#status').textContent='Không mở được bản đồ: '+e.message}})();
</script></body></html>
```

## Test thực nghiệm

`python tools/prepare_experiment.py` tạo sáu cảnh độc lập tại `/tmp/wizamap-experiments/index.html`. Xem tiêu chí nghiệm thu trong [INDOOR_PREVIEW.md](INDOOR_PREVIEW.md). AI Studio đăng nhập và điện thoại thật chưa nghiệm thu.

## Entry và QA

JSON `#MAP_DATA` là entry ưu tiên; `window.MAP_DATA` cũng được nhận trước khi mount UI. JSON sai hiển thị lỗi trong khung, không để trang trắng. Render lỗi xóa cảnh và inspector cũ. Thanh hành động mặc định phản ánh PC; `focus.selectedId` chỉ mở inspector của mục hiện công khai.

Production chỉ có zoom, vừa khung cảnh, motion và tải HTML. Không có menu atlas hoặc editor JSON. Dùng `python tools/build_runtime.py --out /tmp/wzw-test --data tools/contract-fixture.json --embed-atlas --debug` cho test browser; cờ debug không dành cho loader RP.

Các default và trường có thể bỏ được mô tả tại MAP_FLOW.md, lấy chính xác từ schema. Không gửi questPolicy khi không có hint cũng hợp lệ.
