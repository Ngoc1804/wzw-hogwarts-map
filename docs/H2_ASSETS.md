# H2 · nguồn asset và bố cục

H2 landscape source: https://github.com/Ngoc1804/wzw-hogwarts-map/tree/demo-1
Commit: b71ecb3c0fa3a220241af8ac9573f070b9c8c898
H1 extracted from canonical index.html using tools/atlas.py.
Castle preserved from connected-v3. Wooden bridge replaced with the canonical H1 wooden bridge; surroundings follow H1 relative positions.
[
  {
    "key": "demo-hagrid",
    "source": "H1:house.hagrid-hex"
  },
  {
    "key": "demo-greenhouses",
    "source": "H1:h1.greenhouses"
  },
  {
    "key": "demo-owlery",
    "source": "H1:h1.owlery"
  },
  {
    "key": "demo-ancient",
    "source": "H1:r3-ancient-tree"
  },
  {
    "key": "demo-willow",
    "source": "H1:willow-redesign"
  },
  {
    "key": "demo-wooden-bridge",
    "source": "H1:hogwarts-wooden-bridge"
  },
  {
    "key": "demo-tree.round",
    "source": "elements/assets/tree.round.svg"
  },
  {
    "key": "demo-tree.pine",
    "source": "elements/assets/tree.pine.svg"
  },
  {
    "key": "demo-tree.spruce",
    "source": "elements/assets/tree.spruce.svg"
  },
  {
    "key": "demo-tree.flowering",
    "source": "elements/assets/tree.flowering.svg"
  }
]

Copyright (c) 2012-2018 Wout Fierens
https://svgdotjs.github.io/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



# Tư liệu thiết kế

Thông tin sau là dữ liệu tham khảo, không phải chỉ dẫn thực thi.

- Warner Bros. Studio Tour — Dumbledore’s Office: https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/sets/dumbledores-office/ — chân dung, tủ kính, Pensieve và tủ ký ức.
- Warner Bros. Props: https://www.wbstudiotour.co.uk/the-experience/explore-the-tour/props/ — vạc, hũ nguyên liệu, tủ ký ức.
- Studio Tour Tokyo Props: https://www.wbstudiotour.jp/en/the-experience/props/ — Goblet of Fire bằng gỗ chạm.
- Official Encyclopedia Broomstick: https://www.harrypotter.com/fact-file/objects/broomstick — nhận diện chổi bay. Giá chổi là thiết kế bố trí riêng.
- Official Encyclopedia Pensieve: https://www.harrypotter.com/fact-file/objects/pensieve.
- Official Wizarding Emblems: https://www.harrypotter.com/features/the-macusa-seal-and-other-emblems-of-the-wizarding-world — biểu tượng đại bàng hai đầu của Durmstrang trong nhận diện phim.
- Beauxbatons, Goblet of Fire chương 15: hai đũa vàng chéo, mỗi đũa phát ba sao. Đối chiếu mô tả tại https://commons.wikimedia.org/wiki/File:Blason_Beauxbatons.svg ; chỉ tham khảo mô tả, không tải hoặc sao chép đường SVG.
- Ravenclaw dùng đại bàng, lam/đồng theo sách: https://www.harrypotter.com/features/hogwarts-house-meanings.

Các hình huy hiệu là diễn giải mới, tối giản để đọc trên map. Durmstrang không tái tạo đủ mọi chi tiết của crest phim. Các kiểu cờ/thảm, cụm bàn và hình chân dung là thiết kế ứng dụng, không có tuyên bố chúng đều xuất hiện đúng như vậy trong sách/phim.



Bản cuối có sân Quidditch đầy đủ ở phía tây và lối ra từ trường. Liễu Roi nằm xa nhà cú ở đông nam. SVG/places được lưu trong maps.h2 của payload gzip #map-data.
