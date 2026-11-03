// DEMO DATA ONLY. Never used as live defaults.
window.WZW_PREVIEWS={
  "grounds": {
    "terrain": "grounds",
    "meta": {
      "zoneName": "HOGWARTS",
      "quote": "Một tấm giấy biết nhiều điều, nhưng không phải tất cả.",
      "floor": "KHUÔN VIÊN",
      "date": "14/09",
      "time": "16:20",
      "title": "BẢN ĐỒ KHÔNG GIAN"
    },
    "focus": {
      "place": "L-GROUND",
      "stance": "idle",
      "activity": "Đứng tại khuôn viên.",
      "spotArch": "Các lối đi mở ra quanh sân.",
      "name": "BẠN"
    },
    "places": [
      {
        "id": "L-CASTLE",
        "name": "Lâu đài Hogwarts",
        "kind": "castle",
        "activity": "Những ô cửa nhìn xuống sân.",
        "arch": "Cụm tháp, mái dốc và sân trong.",
        "access": "OPEN"
      },
      {
        "id": "L-GREEN",
        "name": "Nhà kính",
        "kind": "greenhouse",
        "activity": "Chưa rõ.",
        "arch": "Khung kính chia nhịp.",
        "access": "RESTRICTED"
      },
      {
        "id": "L-PITCH",
        "name": "Sân Quidditch",
        "kind": "pitch",
        "activity": "Chưa rõ.",
        "arch": "Sân bầu dục và các vòng gôn."
      },
      {
        "id": "L-HUT",
        "name": "Chòi Hagrid",
        "kind": "hut",
        "activity": "Khói mỏng trên mái.",
        "arch": "Căn chòi thấp cạnh bìa rừng."
      },
      {
        "id": "L-LAKE",
        "name": "Hồ Đen",
        "kind": "lake",
        "activity": "Mặt nước gợn nhẹ.",
        "arch": "Bờ nước uốn cong."
      },
      {
        "id": "L-GROUND",
        "name": "Khuôn viên",
        "kind": "ground",
        "activity": "Một cuộc trò chuyện ngoài sân.",
        "arch": "Đường mòn tỏa về các địa điểm."
      },
      {
        "id": "L-FOREST",
        "name": "Bìa Rừng Cấm",
        "kind": "forest",
        "access": "BLOCKED",
        "activity": "Chưa rõ.",
        "arch": "Rặng cây dày ở phía xa."
      }
    ],
    "routes": [
      {
        "from": "L-GROUND",
        "to": "L-CASTLE"
      },
      {
        "from": "L-GROUND",
        "to": "L-GREEN"
      },
      {
        "from": "L-GROUND",
        "to": "L-HUT"
      },
      {
        "from": "L-GROUND",
        "to": "L-LAKE"
      }
    ],
    "actors": [
      {
        "id": "hermione",
        "name": "Hermione Granger",
        "place": "L-GROUND",
        "stance": "idle",
        "activity": "Đang đọc ghi chú.",
        "faction": "gryffindor"
      }
    ],
    "hints": [
      {
        "id": "grounds-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "L-CASTLE",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "grounds-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "L-CASTLE",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "grounds-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "L-CASTLE",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "grounds-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "L-CASTLE",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "grounds-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "L-CASTLE",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      }
    ],
    "snapshot": "demo-grounds",
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": false
      }
    },
    "layout": {
      "key": "demo-grounds",
      "columns": 3
    }
  },
  "floor": {
    "terrain": "floor",
    "subtype": "dungeons",
    "meta": {
      "zoneName": "HẦM NGỤC HOGWARTS",
      "quote": "Có những bức tường nghe nhiều hơn chúng kể.",
      "floor": "B1 · HẦM NGỤC",
      "date": "14/09",
      "time": "16:20",
      "title": "BẢN ĐỒ KHÔNG GIAN"
    },
    "focus": {
      "place": "west-passage",
      "stance": "idle",
      "activity": "Đứng trong hành lang, chưa vào phòng.",
      "spotArch": "Cửa phòng Độc dược ở gần đó.",
      "name": "BẠN"
    },
    "places": [
      {
        "id": "POTIONS",
        "name": "Phòng Độc dược",
        "motif": "potions",
        "activity": "Vài người đang thu dọn dụng cụ.",
        "arch": "Tường dày, bàn thực hành và các vạc nhỏ.",
        "slot": 0
      },
      {
        "id": "OFFICE",
        "name": "Văn phòng Snape",
        "motif": "office",
        "access": "PRIVATE",
        "activity": "Chưa rõ.",
        "arch": "Bàn làm việc, tủ và lò sưởi.",
        "slot": 1
      },
      {
        "id": "COMMON",
        "name": "Phòng sinh hoạt Slytherin",
        "motif": "common",
        "access": "RESTRICTED",
        "activity": "Chưa rõ.",
        "arch": "Các cụm ghế quanh lò sưởi.",
        "slot": 2
      },
      {
        "id": "STORE",
        "name": "Kho nguyên liệu",
        "motif": "store",
        "access": "BLOCKED",
        "activity": "Chưa rõ.",
        "arch": "Các hòm và kệ nhỏ.",
        "slot": 3
      },
      {
        "id": "west-passage",
        "name": "Hành lang Hầm ngục",
        "kind": "corridor",
        "connects": [
          "POTIONS",
          "OFFICE",
          "COMMON",
          "STORE"
        ],
        "activity": "Có người dừng lại trước cửa phòng.",
        "arch": "Lối đi lát đá nối các gian đã biết."
      }
    ],
    "routes": [],
    "actors": [
      {
        "id": "draco",
        "name": "Draco Malfoy",
        "place": "POTIONS",
        "stance": "walk",
        "activity": "Thu dọn sách vở.",
        "arch": "Đứng cạnh bàn thực hành.",
        "faction": "slytherin"
      },
      {
        "id": "snape",
        "name": "Severus Snape",
        "place": "OFFICE",
        "stance": "idle",
        "activity": "Ngồi bên bàn làm việc.",
        "faction": "faculty"
      },
      {
        "id": "student-s",
        "name": "Nhóm học sinh Slytherin",
        "place": "west-passage",
        "stance": "walk",
        "faction": "slytherin",
        "count": 3,
        "group": true,
        "activity": "Đi dọc một đoạn hành lang."
      },
      {
        "id": "raven",
        "name": "Nhóm học sinh Ravenclaw",
        "place": "west-passage",
        "stance": "idle",
        "faction": "ravenclaw",
        "count": 2,
        "group": true,
        "activity": "Đang trao đổi."
      },
      {
        "id": "huff",
        "name": "Nhóm học sinh Hufflepuff",
        "place": "COMMON",
        "stance": "idle",
        "faction": "hufflepuff",
        "count": 2,
        "group": true,
        "activity": "Đứng gần cửa."
      }
    ],
    "hints": [
      {
        "id": "floor-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "POTIONS",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "floor-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "POTIONS",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "floor-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "POTIONS",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "floor-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "POTIONS",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "floor-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "POTIONS",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      }
    ],
    "snapshot": "demo-floor",
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": false
      }
    },
    "layout": {
      "key": "demo-floor",
      "columns": 2
    }
  },
  "tower": {
    "terrain": "tower",
    "meta": {
      "zoneName": "THÁP THIÊN VĂN",
      "quote": "Những điều nhỏ lại khi nhìn từ trên cao.",
      "floor": "TẦNG ĐỈNH",
      "date": "14/09",
      "time": "20:10",
      "title": "BẢN ĐỒ KHÔNG GIAN"
    },
    "focus": {
      "place": "ASTRO",
      "stance": "idle",
      "activity": "Đứng trên đài quan sát.",
      "spotArch": "Không gian tròn mở ra quanh kính thiên văn.",
      "name": "BẠN"
    },
    "places": [
      {
        "id": "ASTRO",
        "name": "Đài quan sát",
        "motif": "astronomy",
        "activity": "Một nhóm nhỏ quan sát bầu trời.",
        "arch": "Tháp tròn, các trụ đá và kính thiên văn."
      },
      {
        "id": "LANDING",
        "name": "Chiếu nghỉ đã biết",
        "kind": "stairs",
        "activity": "Chưa rõ.",
        "arch": "Một đoạn cầu thang nối tầng."
      }
    ],
    "routes": [
      {
        "from": "ASTRO",
        "to": "LANDING",
        "type": "stair"
      }
    ],
    "actors": [
      {
        "id": "harry",
        "name": "Harry Potter",
        "place": "ASTRO",
        "stance": "idle",
        "activity": "Nhìn qua kính thiên văn.",
        "faction": "gryffindor"
      }
    ],
    "hints": [
      {
        "id": "tower-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "ASTRO",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "tower-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "ASTRO",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "tower-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "ASTRO",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "tower-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "ASTRO",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "tower-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "ASTRO",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      }
    ],
    "snapshot": "demo-tower",
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": false
      }
    },
    "layout": {
      "key": "demo-tower",
      "columns": 2
    }
  },
  "street": {
    "terrain": "street",
    "meta": {
      "zoneName": "HOGSMEADE",
      "quote": "Mỗi biển hiệu đều có một câu chuyện riêng.",
      "floor": "PHỐ LÀNG",
      "date": "14/09",
      "time": "15:40",
      "title": "BẢN ĐỒ KHÔNG GIAN"
    },
    "focus": {
      "place": "HONEY",
      "stance": "idle",
      "activity": "Dừng bên mặt tiền cửa hiệu.",
      "spotArch": "Biển hiệu treo phía trên cửa sổ.",
      "name": "BẠN"
    },
    "places": [
      {
        "id": "BROOM",
        "name": "Ba Cây Chổi",
        "kind": "pub",
        "x": 170,
        "y": 240,
        "activity": "Những cuộc trò chuyện sau cửa.",
        "arch": "Mặt tiền cao với biển treo."
      },
      {
        "id": "HONEY",
        "name": "Honeydukes",
        "kind": "shop",
        "x": 560,
        "y": 240,
        "activity": "Có người trước cửa hiệu.",
        "arch": "Cửa kính chia ô và mái dốc."
      },
      {
        "id": "ZONKO",
        "name": "Zonko’s",
        "kind": "shop",
        "x": 1030,
        "y": 240,
        "activity": "Chưa rõ.",
        "arch": "Mái và cửa sổ khác nhịp các căn bên cạnh."
      },
      {
        "id": "PUDD",
        "name": "Madam Puddifoot’s",
        "kind": "shop",
        "x": 350,
        "y": 570,
        "activity": "Chưa rõ.",
        "arch": "Mặt tiền nhỏ có biển treo."
      },
      {
        "id": "HOG",
        "name": "Đầu Heo",
        "kind": "pub",
        "x": 830,
        "y": 570,
        "activity": "Chưa rõ.",
        "arch": "Căn nhà cao với các ô cửa nhỏ."
      }
    ],
    "routes": [
      {
        "from": "BROOM",
        "to": "HONEY",
        "via": [
          [
            170,
            395
          ],
          [
            560,
            395
          ]
        ]
      },
      {
        "from": "HONEY",
        "to": "ZONKO",
        "via": [
          [
            560,
            395
          ],
          [
            1030,
            395
          ]
        ]
      },
      {
        "from": "HONEY",
        "to": "PUDD",
        "via": [
          [
            560,
            395
          ],
          [
            350,
            410
          ]
        ]
      },
      {
        "from": "ZONKO",
        "to": "HOG",
        "via": [
          [
            1030,
            395
          ],
          [
            830,
            420
          ]
        ]
      }
    ],
    "actors": [
      {
        "id": "ron",
        "name": "Ron Weasley",
        "place": "HONEY",
        "stance": "idle",
        "activity": "Đợi bên cửa.",
        "faction": "gryffindor"
      }
    ],
    "hints": [
      {
        "id": "street-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "BROOM",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "street-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "BROOM",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "street-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "BROOM",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "street-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "BROOM",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "street-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "BROOM",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      }
    ],
    "snapshot": "demo-street",
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": false
      }
    },
    "layout": {
      "key": "demo-street",
      "columns": 2
    }
  },
  "interior": {
    "terrain": "interior",
    "meta": {
      "zoneName": "ĐẠI SẢNH",
      "quote": "Lời thì thầm đi xa hơn người ta tưởng.",
      "floor": "TẦNG TRỆT",
      "date": "14/09",
      "time": "18:30",
      "title": "BẢN ĐỒ KHÔNG GIAN"
    },
    "focus": {
      "place": "L-GREAT",
      "stance": "idle",
      "activity": "Đứng cạnh một dãy bàn.",
      "spotArch": "Lối đi giữa bốn bàn dài.",
      "name": "BẠN"
    },
    "places": [
      {
        "id": "L-GREAT",
        "name": "Đại Sảnh",
        "motif": "hall",
        "activity": "Bữa tối đang diễn ra.",
        "arch": "Bốn dãy bàn, bàn giáo viên và các khung cửa cao."
      }
    ],
    "routes": [],
    "actors": [
      {
        "id": "hermione",
        "name": "Hermione Granger",
        "place": "L-GREAT",
        "stance": "idle",
        "activity": "Đang trò chuyện.",
        "faction": "gryffindor"
      },
      {
        "id": "ron",
        "name": "Ron Weasley",
        "place": "L-GREAT",
        "stance": "idle",
        "activity": "Ngồi cạnh bàn.",
        "faction": "gryffindor"
      },
      {
        "id": "harry",
        "name": "Harry Potter",
        "place": "L-GREAT",
        "stance": "idle",
        "activity": "Lắng nghe câu chuyện.",
        "faction": "gryffindor"
      }
    ],
    "hints": [
      {
        "id": "interior-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "L-GREAT",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "interior-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "L-GREAT",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "interior-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "L-GREAT",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "interior-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "L-GREAT",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "interior-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "L-GREAT",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      }
    ],
    "snapshot": "demo-interior",
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": false
      }
    },
    "layout": {
      "key": "demo-interior",
      "columns": 2
    }
  },
  "unknown": {
    "terrain": "floor",
    "meta": {
      "title": "BẢN ĐỒ KHÔNG GIAN",
      "zoneName": "ĐIỀN TRANG AU · CHƯA CÓ TRONG CATALOGUE",
      "floor": "TẦNG HAI",
      "date": "03/11",
      "time": "19:15",
      "quote": "Bản đồ theo bước chân; bước chân chưa chắc theo bản đồ."
    },
    "snapshot": "au-scene-1",
    "layout": {
      "key": "unlisted-au-estate",
      "columns": 2
    },
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2,
        "main": "extra"
      }
    },
    "focus": {
      "name": "BẠN",
      "place": "au-gallery",
      "stance": "idle",
      "activity": "Dừng trong hành lang của điền trang.",
      "spotArch": "Hai cánh cửa đối diện nhau."
    },
    "places": [
      {
        "id": "any-a",
        "name": "Phòng thí nghiệm riêng",
        "kind": "room",
        "motif": "potions",
        "slot": 0
      },
      {
        "id": "any-b",
        "name": "Thư phòng phía đông",
        "kind": "room",
        "motif": "library",
        "slot": 1
      },
      {
        "id": "any-c",
        "name": "Phòng khách",
        "kind": "room",
        "motif": "common",
        "slot": 2
      },
      {
        "id": "any-d",
        "name": "Kho dụng cụ",
        "kind": "room",
        "motif": "store",
        "slot": 3
      },
      {
        "id": "au-gallery",
        "name": "Hành lang tầng hai",
        "kind": "corridor",
        "connects": [
          "any-a",
          "any-b",
          "any-c",
          "any-d"
        ]
      }
    ],
    "routes": [],
    "actors": [
      {
        "id": "visitor",
        "name": "Đoàn khách quốc tế",
        "place": "au-gallery",
        "faction": "international",
        "group": true,
        "count": 3,
        "stance": "walk"
      },
      {
        "id": "adult",
        "name": "Người quản gia",
        "place": "any-c",
        "faction": "adult",
        "stance": "idle"
      },
      {
        "id": "public-enemy",
        "name": "Đối thủ đã được nhận diện",
        "place": "au-gallery",
        "faction": "antagonist",
        "stance": "idle"
      }
    ],
    "hints": [
      {
        "id": "au-q0",
        "type": "side",
        "name": "Lời bàn bên cửa",
        "place": "au-gallery",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "au-q1",
        "type": "side",
        "name": "Một mẩu giấy gấp",
        "place": "au-gallery",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "au-q2",
        "type": "side",
        "name": "Dấu ghi chú cũ",
        "place": "au-gallery",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "au-q3",
        "type": "pool",
        "name": "Một câu chuyện đang lan",
        "place": "au-gallery",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "au-q4",
        "type": "pool",
        "name": "Lời hẹn chưa thành",
        "place": "au-gallery",
        "desc": "Nội dung mẫu để kiểm tra giao diện. Không thuộc trạng thái RP."
      },
      {
        "id": "au-main",
        "type": "main",
        "name": "Cuộc hẹn trong thư phòng",
        "place": "any-b",
        "desc": "Nhiệm vụ chính mẫu, chỉ bật khi prompt AU yêu cầu."
      }
    ]
  },
  "world": {
    "terrain": "world",
    "meta": {
      "title": "BẢN ĐỒ KHÔNG GIAN",
      "zoneName": "THẾ GIỚI PHÙ THỦY",
      "floor": "SƠ ĐỒ CÁC KHU ĐÃ BIẾT",
      "date": "14/09",
      "time": "16:20",
      "quote": "Một cái tên trên giấy chưa phải một chuyến đi."
    },
    "snapshot": "demo-world",
    "layout": {
      "key": "world-sheet",
      "columns": 3
    },
    "options": {
      "maxTags": 10,
      "quests": {
        "side": 3,
        "pool": 2
      }
    },
    "focus": {
      "place": "school",
      "name": "BẠN",
      "stance": "idle"
    },
    "places": [
      {
        "id": "school",
        "name": "Hogwarts",
        "kind": "school",
        "slot": 0
      },
      {
        "id": "village",
        "name": "Hogsmeade",
        "kind": "settlement",
        "slot": 1
      },
      {
        "id": "station",
        "name": "King’s Cross",
        "kind": "station",
        "slot": 2
      },
      {
        "id": "shopping",
        "name": "Diagon Alley",
        "kind": "settlement",
        "slot": 3
      },
      {
        "id": "ministry",
        "name": "Bộ Pháp thuật",
        "kind": "castle",
        "slot": 4
      },
      {
        "id": "home",
        "name": "Một tư gia đã biết",
        "kind": "house",
        "slot": 5
      }
    ],
    "routes": [],
    "actors": [],
    "hints": []
  }
};
