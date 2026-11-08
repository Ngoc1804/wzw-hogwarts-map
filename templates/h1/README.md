# H1 · Template shading

- `shading.svg`: overlay SVG trong suốt gồm nền địa hình và bóng đổ.
- `shading-tokens.json`: màu, opacity, tọa độ các mảng nền và hướng sáng.
- Hệ tọa độ: `viewBox="-28 -26 1456 1072"`, khớp H1 trong atlas.

Đặt overlay dưới đường đi/công trình, giữ `defs` và mask bờ hồ. Overlay không chứa lại nhà/cây và không chứa shading mặt tường/mái; những phần đó nằm trực tiếp trong map H1. Chỉ có một lớp nền hiện hành, không cộng dồn các bản relief cũ.

Cơ sở địa hình: [Hogwarts](https://www.harrypotter.com/fact-file/locations/hogwarts), [grounds theo mô tả sách](https://www.hp-lexicon.org/place/hogwarts-school-of-witchcraft-and-wizardry/hogwarts-grounds/), [nhà Hagrid sát rừng](https://www.harrypotter.com/fact-file/locations/hagrids-hut). Cao độ và hướng sáng là thể hiện minh họa, không phải dữ liệu đo đạc.
