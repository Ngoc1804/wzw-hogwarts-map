# Hướng dẫn /MAP cho Preview

Gemini đọc diễn biến RP/correction, ngày giờ RP, vị trí PC, NPC và quest pack đúng tháng. Tra ID địa điểm trong atlas đã cấp trong context; dùng binding template thực có hoặc cung cấp generation recipe. Không tự vẽ lại CSS/SVG mỗi lượt.

Xuất một codeblock HTML dựa trên shell bên dưới. Thay {} trong rp-map-data bằng dữ liệu RP theo schema 2.0.0. Escape ký tự < trong JSON thành \u003c. Một entry URL runtime đã ghim commit nằm sẵn trong shell; bundle tự tải atlas và asset cần thiết ở commit riêng đã ghim. Preview không ghi ngược GitHub, không có seed hay storage.

PC + tối đa 10 tag NPC/nhóm, tối đa 6 hint đúng tháng/pack. stance=walk làm thanh hành động ghi Đang đi; RP quyết định di chuyển. Nhân vật ở trong công trình ngoài trời: environment=inside, ribbon trên công trình, không có dấu chân giả ngoài cửa. Ngoài trời: environment=outside và position SVG phải hợp lệ. Nếu chưa có điểm đứng được xác minh thì không đoán tọa độ.

Crop bật mặc định, fit các nơi được gửi; crop=false để toàn cảnh. Fog cần polygon fogRegions và fogRegionIds trùng ID; không gửi thông tin RP bí mật rồi chỉ giấu bằng fog. Template candidate không có binding chưa được coi là mặt bằng đã có.

## Shell

```html
<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIZAMAP</title><body><p id="status">Đang tải WIZAMAP…</p><iframe title="Bản đồ RP" sandbox="allow-scripts allow-downloads" style="width:100%;height:90dvh;border:0"></iframe><script type="application/json" id="rp-map-data">{}</script><script>
(async()=>{try{const data=JSON.parse(document.querySelector('#rp-map-data').textContent);const r=await fetch('https://cdn.jsdelivr.net/gh/Ngoc1804/wzw-hogwarts-map@f5801f36a9b31446d2516b02b4ead2c23e3758df/runtime/bundle.js');if(!r.ok)throw Error('Runtime HTTP '+r.status);const code=await r.text();const safe=JSON.stringify(data).replace(/</g,'\\u003c');document.querySelector('iframe').srcdoc='<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body><script type="application/json" id="MAP_DATA">'+safe+'<\/script><script>'+code.replace(/<\/script/gi,'<\\/script')+'<\/script>';document.querySelector('#status').textContent='Runtime đã tải; trạng thái dữ liệu hiển thị bên trong bản đồ.'}catch(e){document.querySelector('#status').textContent='Không mở được bản đồ: '+e.message}})();
</script></body></html>

```





### Generated indoor: Stage 2 scene layout

When a template does not cover the visible scene, `view.preferredMode: "generated"` uses the approved Stage 2 formulas. Pass only the currently visible place records (not the entire floor) and optional `view.indoor: {layout:"ell", roomWidth:300, roomDepth:260, corridorWidth:160}`. Supported layouts: horizontal, vertical, ell, tee, cross, court, cloister, windows, curved, tower (or auto with constraints/knownStructure). Each generated room's `generation.shape` is rectangle/L/U/T/cross/round; a corridor place with shape straight uses real hallway floor. Optional `generation.width/depth` overrides the general room dimensions. Mixed floors are rejected; no prebuilt floor, no multiple wings, no layout persistence, no A* movement simulation. A scene can contain one room or even a corridor only (except a tower formula with no rooms).

Transient `buildGeometry()` output includes `floorPolygons` (actual concave room/corridor floors), `actorZones` (conservative inset standing patches), `exclusionZones` (courtyard/void, stairs, doors, thresholds) and `suggestedAnchors` by place ID. If an indoor actor has no exact position, Preview uses a safe anchor for its current place; explicit positions outside that place's safe zones are rejected. These polygons describe illustrative standing surfaces, not routes or movement physics. Drawing uses the approved lightweight Stage 2 SVG architectural walls, doors, windows and floor materials; no furniture is generated. Room labels are architectural signage, not place ribbons.

### Spatial Geometry (optional MAP_DATA 2.0)

Trên template ngoài trời, actor `environment=outside` cần `position` và `view.spatial.walkableRegions` (polygon sàn/đất đã xác minh), `blockedRegions` (mái, mặt nước, vật cản). Runtime kiểm tra vị trí nằm trong walkable và ngoài blocked; nếu không đủ dữ liệu sẽ báo lỗi thay vì đoán từ bbox. Có thể dùng `occlusionRegions: [{id,targetId,points}]` để định nghĩa vùng chiếu che đã xác minh: `targetId` là khóa kỹ thuật trong `runtime/templates.json`, phải thuộc whitelist công trình của template. Nếu một binding có nhiều SVG (`hogsmeade-homes`, ...), phải cung cấp thêm `interactiveId` chính xác từ binding; không lấy tùy tiện phần tử đầu. Hover/chọn NPC bị che chỉ giảm opacity đúng công trình xuống 0.7; rời vùng hoặc đổi `/map` sẽ tính lại. Không cần state hoặc backend.

Crop lấy phạm vi cảnh/route và tọa độ actor có thể thấy, không dùng maxHops hay bán kính PC. Fog polygon che nhãn, hint, actor và chặn inspector khi vùng bị fog. MAP_DATA phải được lọc bí mật RP **trước** khi gửi cho Preview; fog không phải bảo mật.

## Hợp đồng dữ liệu

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "urn:wizawi:wizamap:map-data:2.0.0",
  "title": "WIZAMAP MAP_DATA 2.0.0",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "schemaVersion": {
      "const": "2.0.0"
    },
    "campaignId": {
      "type": "string",
      "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
    },
    "worldId": {
      "type": "string",
      "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
    },
    "snapshotId": {
      "type": "string",
      "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
    },
    "atlasVersion": {
      "type": "string",
      "minLength": 1
    },
    "meta": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "date": {
          "type": "string",
          "pattern": "^\\d{4}-\\d{2}-\\d{2}$"
        },
        "time": {
          "type": "string",
          "pattern": "^([01]\\d|2[0-3]):[0-5]\\d$"
        },
        "areaName": {
          "type": "string",
          "minLength": 1
        },
        "quote": {
          "type": "string",
          "minLength": 1,
          "maxLength": 180
        }
      },
      "required": [
        "date",
        "time",
        "areaName",
        "quote"
      ]
    },
    "view": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "scopeId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "spaceKind": {
          "type": "string",
          "enum": [
            "world",
            "region",
            "grounds",
            "street",
            "floor",
            "interior",
            "tower",
            "train"
          ]
        },
        "preferredMode": {
          "type": "string",
          "enum": [
            "auto",
            "template",
            "generated"
          ]
        },
        "templateId": {
          "type": [
            "string",
            "null"
          ],
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "centerPlaceId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "routePlaceIds": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "uniqueItems": true
        },
        "crop": {
          "type": "boolean"
        },
        "spatial": {
          "$ref": "#/$defs/spatial"
        },
        "indoor": {
          "$ref": "#/$defs/indoor"
        }
      },
      "required": [
        "scopeId",
        "spaceKind",
        "preferredMode",
        "templateId",
        "centerPlaceId",
        "routePlaceIds"
      ]
    },
    "focus": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "pcActorId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "actualPlaceId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "selectedId": {
          "type": [
            "string",
            "null"
          ],
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        }
      },
      "required": [
        "pcActorId",
        "actualPlaceId",
        "selectedId"
      ]
    },
    "places": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/place"
      },
      "minItems": 1
    },
    "connections": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "from": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "to": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "kind": {
            "type": "string",
            "enum": [
              "doorway",
              "corridor",
              "stairs",
              "lift",
              "path",
              "passage",
              "transport"
            ]
          },
          "state": {
            "type": "string",
            "enum": [
              "open",
              "restricted",
              "blocked"
            ]
          }
        },
        "required": [
          "id",
          "from",
          "to",
          "kind",
          "state"
        ]
      },
      "maxItems": 60
    },
    "actors": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/actor"
      },
      "minItems": 1,
      "maxItems": 11
    },
    "hints": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/hint"
      },
      "maxItems": 6
    },
    "visibility": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "visiblePlaceIds": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "uniqueItems": true
        },
        "fogRegionIds": {
          "type": "array",
          "items": {
            "type": "string",
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
          },
          "uniqueItems": true,
          "maxItems": 30
        },
        "fogRegions": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "id": {
                "type": "string"
              },
              "points": {
                "type": "array",
                "minItems": 3,
                "items": {
                  "$ref": "#/$defs/point"
                }
              }
            },
            "required": [
              "id",
              "points"
            ]
          }
        }
      },
      "required": [
        "visiblePlaceIds",
        "fogRegionIds"
      ]
    },
    "questPolicy": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "month": {
          "type": "string",
          "pattern": "^\\d{4}-\\d{2}$"
        },
        "packId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "limits": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "main": {
              "type": "integer",
              "minimum": 0,
              "maximum": 6
            },
            "side": {
              "type": "integer",
              "minimum": 0,
              "maximum": 6
            },
            "pool": {
              "type": "integer",
              "minimum": 0,
              "maximum": 6
            },
            "life": {
              "type": "integer",
              "minimum": 0,
              "maximum": 6
            }
          },
          "required": [
            "main",
            "side",
            "pool",
            "life"
          ]
        }
      },
      "required": [
        "month",
        "packId",
        "limits"
      ]
    }
  },
  "required": [
    "schemaVersion",
    "campaignId",
    "worldId",
    "snapshotId",
    "atlasVersion",
    "meta",
    "view",
    "focus",
    "places",
    "connections",
    "actors",
    "hints",
    "visibility",
    "questPolicy"
  ],
  "$defs": {
    "place": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "atlasRef": {
          "type": [
            "string",
            "null"
          ],
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "kind": {
          "type": "string",
          "enum": [
            "room",
            "corridor",
            "hall",
            "tower",
            "house",
            "shop",
            "pub",
            "greenhouse",
            "grounds",
            "street",
            "region",
            "train",
            "special"
          ]
        },
        "parentId": {
          "type": [
            "string",
            "null"
          ],
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "floor": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        },
        "zone": {
          "type": [
            "string",
            "null"
          ],
          "enum": [
            "north",
            "east",
            "south",
            "west",
            "core",
            "tower"
          ]
        },
        "inspector": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "overhear": {
              "type": "string",
              "maxLength": 700
            },
            "observation": {
              "type": "string",
              "maxLength": 1000
            }
          },
          "required": [
            "overhear",
            "observation"
          ]
        },
        "generation": {
          "type": [
            "object",
            "null"
          ],
          "additionalProperties": false,
          "properties": {
            "function": {
              "type": "string",
              "minLength": 1
            },
            "shape": {
              "type": "string",
              "enum": [
                "rectangle",
                "L",
                "T",
                "U",
                "round",
                "polygon",
                "straight",
                "curved",
                "cross"
              ]
            },
            "furnishings": {
              "type": "array",
              "items": {
                "type": "object",
                "additionalProperties": false,
                "properties": {
                  "role": {
                    "type": "string",
                    "minLength": 1
                  },
                  "count": {
                    "type": "integer",
                    "minimum": 1,
                    "maximum": 50
                  }
                },
                "required": [
                  "role",
                  "count"
                ]
              },
              "maxItems": 30
            },
            "width": {
              "type": "number",
              "minimum": 180,
              "maximum": 560
            },
            "depth": {
              "type": "number",
              "minimum": 180,
              "maximum": 520
            }
          },
          "required": [
            "function",
            "shape",
            "furnishings"
          ]
        }
      },
      "required": [
        "id",
        "name",
        "atlasRef",
        "kind",
        "parentId",
        "floor",
        "zone",
        "inspector",
        "generation"
      ]
    },
    "actor": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "name": {
          "type": "string",
          "minLength": 1
        },
        "isPC": {
          "type": "boolean"
        },
        "entityType": {
          "type": "string",
          "enum": [
            "person",
            "group",
            "community",
            "creature"
          ]
        },
        "placeId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "tagType": {
          "type": "string",
          "enum": [
            "gryffindor",
            "slytherin",
            "ravenclaw",
            "hufflepuff",
            "beauxbatons",
            "durmstrang",
            "teacher",
            "adult",
            "patrol",
            "animal",
            "monster",
            "ghost",
            "unknown",
            "crowd"
          ]
        },
        "role": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        },
        "onPatrol": {
          "type": "boolean"
        },
        "stance": {
          "type": "string",
          "enum": [
            "idle",
            "walk"
          ]
        },
        "activity": {
          "type": "string",
          "maxLength": 500
        },
        "priority": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100
        },
        "positionMode": {
          "type": "string",
          "enum": [
            "normal",
            "ghost",
            "concealed-passage",
            "animagus",
            "inside-container"
          ]
        },
        "positionReason": {
          "type": [
            "string",
            "null"
          ],
          "minLength": 1
        },
        "presenceBasis": {
          "type": "string",
          "enum": [
            "scene",
            "status",
            "simulation"
          ]
        },
        "inspector": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "overhear": {
              "type": "string",
              "maxLength": 700
            },
            "observation": {
              "type": "string",
              "maxLength": 1000
            }
          },
          "required": [
            "overhear",
            "observation"
          ]
        },
        "environment": {
          "type": "string",
          "enum": [
            "inside",
            "outside"
          ]
        },
        "position": {
          "$ref": "#/$defs/point"
        }
      },
      "required": [
        "id",
        "name",
        "isPC",
        "entityType",
        "placeId",
        "tagType",
        "role",
        "onPatrol",
        "stance",
        "activity",
        "priority",
        "positionMode",
        "positionReason",
        "presenceBasis",
        "inspector"
      ]
    },
    "hint": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "packId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "sourceQuestId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "placeId": {
          "type": "string",
          "pattern": "^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$"
        },
        "type": {
          "type": "string",
          "enum": [
            "main",
            "side",
            "pool",
            "life"
          ]
        },
        "title": {
          "type": "string",
          "minLength": 1,
          "maxLength": 100
        },
        "priority": {
          "type": "integer",
          "minimum": 0,
          "maximum": 100
        },
        "inspector": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "overhear": {
              "type": "string",
              "maxLength": 700
            },
            "observation": {
              "type": "string",
              "maxLength": 1000
            }
          },
          "required": [
            "overhear",
            "observation"
          ]
        }
      },
      "required": [
        "id",
        "packId",
        "sourceQuestId",
        "placeId",
        "type",
        "title",
        "priority",
        "inspector"
      ]
    },
    "point": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "x": {
          "type": "number"
        },
        "y": {
          "type": "number"
        }
      },
      "required": [
        "x",
        "y"
      ]
    },
    "spatial": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "walkableRegions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/region"
          }
        },
        "blockedRegions": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/region"
          }
        },
        "occlusionRegions": {
          "type": "array",
          "items": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "id": {
                "type": "string",
                "minLength": 1
              },
              "targetId": {
                "type": "string",
                "minLength": 1
              },
              "points": {
                "type": "array",
                "minItems": 3,
                "items": {
                  "$ref": "#/$defs/point"
                }
              },
              "interactiveId": {
                "type": "string",
                "minLength": 1
              }
            },
            "required": [
              "id",
              "targetId",
              "points"
            ]
          }
        }
      },
      "required": [
        "walkableRegions",
        "blockedRegions",
        "occlusionRegions"
      ]
    },
    "region": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "id": {
          "type": "string",
          "minLength": 1
        },
        "points": {
          "type": "array",
          "minItems": 3,
          "items": {
            "$ref": "#/$defs/point"
          }
        }
      },
      "required": [
        "id",
        "points"
      ]
    },
    "indoor": {
      "type": "object",
      "additionalProperties": false,
      "properties": {
        "layout": {
          "type": "string",
          "enum": [
            "auto",
            "horizontal",
            "vertical",
            "ell",
            "tee",
            "cross",
            "court",
            "cloister",
            "windows",
            "curved",
            "tower"
          ]
        },
        "knownStructure": {
          "type": "string",
          "enum": [
            "horizontal",
            "vertical",
            "ell",
            "tee",
            "cross",
            "court",
            "cloister",
            "windows",
            "curved",
            "tower"
          ]
        },
        "constraints": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "courtyard": {
              "type": "string",
              "enum": [
                "open",
                "closed"
              ]
            },
            "windows": {
              "type": "boolean"
            },
            "curved": {
              "type": "boolean"
            },
            "tower": {
              "type": "boolean"
            },
            "branches": {
              "type": "integer",
              "minimum": 2,
              "maximum": 4
            },
            "orientation": {
              "type": "string",
              "enum": [
                "horizontal",
                "vertical"
              ]
            }
          }
        },
        "roomWidth": {
          "type": "number",
          "minimum": 180,
          "maximum": 560
        },
        "roomDepth": {
          "type": "number",
          "minimum": 180,
          "maximum": 520
        },
        "corridorWidth": {
          "type": "number",
          "minimum": 100,
          "maximum": 240
        },
        "candidates": {
          "type": "array",
          "minItems": 1,
          "maxItems": 10,
          "uniqueItems": true,
          "items": {
            "type": "string",
            "enum": [
              "horizontal",
              "vertical",
              "ell",
              "tee",
              "cross",
              "court",
              "cloister",
              "windows",
              "curved",
              "tower"
            ]
          }
        },
        "strategy": {
          "type": "string",
          "enum": [
            "constraints",
            "random"
          ]
        },
        "allowRandom": {
          "type": "boolean"
        }
      }
    }
  }
}
```
