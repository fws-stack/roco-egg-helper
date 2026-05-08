// 洛克王国世界 - 精灵图鉴数据
// 数据来源: 游戏内图鉴截图 + 洛克王国精灵图鉴001-347.csv
// 图鉴共347个精灵: 风眠省159只, 洛克里安188只

module.exports = {

  // ========== 图鉴排序 (按游戏内图鉴001-347顺序) ==========
  pokedexOrder: [
    153, 305, 304, 320, 230, 428, 227, 390, 121, 389,
    65, 52, 242, 387, 64, 287, 212, 435, 142, 257,
    400, 203, 222, 73, 375, 374, 71, 113, 112, 19,
    144, 17, 316, 200, 78, 48, 430, 241, 261, 472,
    29, 327, 329, 39, 473, 474, 63, 454, 37, 92,
    122, 475, 146, 1, 476, 477, 478, 479, 38, 170,
    393, 249, 32, 480, 481, 54, 180, 151, 2, 339,
    444, 445, 70, 143, 260, 194, 125, 482, 34, 76,
    483, 27, 233, 214, 28, 462, 384, 186, 263, 136,
    216, 86, 294, 323, 90, 243, 244, 245, 10, 138,
    213, 20, 322, 321, 84, 105, 295, 67, 264, 128,
    87, 250, 438, 439, 440, 82, 98, 3, 484, 485,
    25, 199, 205, 450, 66, 156, 189, 9, 117, 116,
    89, 22, 150, 58, 436, 419, 46, 282, 47, 108,
    420, 126, 288, 434, 77, 344, 53, 234, 247, 286,
    277, 370, 385, 386, 467, 410, 135, 133, 388, 391,
    451, 13, 69, 312, 60, 486, 487, 457, 248, 466,
    40, 404, 361, 5, 160, 235, 33, 93, 41, 240,
    88, 195, 23, 456, 56, 255, 253, 62, 334, 335,
    332, 333, 35, 276, 42, 407, 97, 4, 336, 289,
    14, 301, 75, 442, 55, 266, 11, 124, 252, 43,
    300, 49, 192, 99, 162, 72, 225, 279, 83, 18,
    45, 258, 119, 414, 452, 80, 91, 251, 406, 372,
    7, 123, 185, 137, 408, 363, 15, 488, 6, 259,
    303, 68, 359, 164, 283, 357, 356, 340, 254, 134,
    226, 115, 422, 111, 61, 210, 211, 36, 489, 490,
    12, 311, 59, 157, 285, 31, 459, 351, 403, 21,
    353, 307, 347, 24, 174, 173, 8, 491, 492, 308,
    224, 493, 50, 267, 367, 366, 57, 315, 74, 221,
    273, 272, 411, 310, 302, 291, 118, 377, 207, 206,
    209, 208, 379, 378, 188, 171, 354, 413, 352, 405,
    187, 231, 26, 313, 427, 349, 417, 296, 470, 382,
    271, 460, 360, 338, 132, 350, 262, 424, 447, 182,
    412, 102, 100, 101, 181, 183, 297, 114, 341, 228,
    432, 130, 129, 131, 449, 426, 314
  ],

  // ========== 区域分类 ==========
  regions: {
    // 风眠省图鉴 (#1-#159, 共159只)
    windmorn: [
      153, 305, 304, 320, 230, 428, 227, 390, 121, 389,
      65, 52, 242, 387, 64, 287, 212, 435, 142, 257,
      400, 203, 222, 73, 375, 374, 71, 113, 112, 19,
      144, 17, 316, 200, 78, 48, 430, 241, 261, 472,
      29, 327, 329, 39, 473, 474, 63, 454, 37, 92,
      122, 475, 146, 1, 476, 477, 478, 479, 38, 170,
      393, 249, 32, 480, 481, 54, 180, 151, 2, 339,
      444, 445, 70, 143, 260, 194, 125, 482, 34, 76,
      483, 27, 233, 214, 28, 462, 384, 186, 263, 136,
      216, 86, 294, 323, 90, 243, 244, 245, 10, 138,
      213, 20, 322, 321, 84, 105, 295, 67, 264, 128,
      87, 250, 438, 439, 440, 82, 98, 3, 484, 485,
      25, 199, 205, 450, 66, 156, 189, 9, 117, 116,
      89, 22, 150, 58, 436, 419, 46, 282, 47, 108,
      420, 126, 288, 434, 77, 344, 53, 234, 247, 286,
      277, 370, 385, 386, 467, 410, 135, 133, 388
    ],

    // 洛克里安图鉴 (#160-#347, 共188只)
    rockorian: [
      391, 451, 13, 69, 312, 60, 486, 487, 457, 248,
      466, 40, 404, 361, 5, 160, 235, 33, 93, 41,
      240, 88, 195, 23, 456, 56, 255, 253, 62, 334,
      335, 332, 333, 35, 276, 42, 407, 97, 4, 336,
      289, 14, 301, 75, 442, 55, 266, 11, 124, 252,
      43, 300, 49, 192, 99, 162, 72, 225, 279, 83,
      18, 45, 258, 119, 414, 452, 80, 91, 251, 406,
      372, 7, 123, 185, 137, 408, 363, 15, 488, 6,
      259, 303, 68, 359, 164, 283, 357, 356, 340, 254,
      134, 226, 115, 422, 111, 61, 210, 211, 36, 489,
      490, 12, 311, 59, 157, 285, 31, 459, 351, 403,
      21, 353, 307, 347, 24, 174, 173, 8, 491, 492,
      308, 224, 493, 50, 267, 367, 366, 57, 315, 74,
      221, 273, 272, 411, 310, 302, 291, 118, 377, 207,
      206, 209, 208, 379, 378, 188, 171, 354, 413, 352,
      405, 187, 231, 26, 313, 427, 349, 417, 296, 470,
      382, 271, 460, 360, 338, 132, 350, 262, 424, 447,
      182, 412, 102, 100, 101, 181, 183, 297, 114, 341,
      228, 432, 130, 129, 131, 449, 426, 314
    ]
  },

  // ========== 进化链 ==========
  chains: [
    // --- 御三家 ---
    {
      familyId: "c001",
      baseFormId: 305,
      members: [305, 304, 320],
      edges: [
        { from: 305, to: 304, cond: { type: "level", level: 16, detail: "达到Lv.16进化→喵呜" } },
        { from: 304, to: 320, cond: { type: "level", level: 36, detail: "达到Lv.36进化→魔力猫" } }
      ]
    },
    {
      familyId: "c002",
      baseFormId: 230,
      members: [230, 428, 227, 280],
      edges: [
        { from: 230, to: 428, cond: { type: "level", level: 16, detail: "达到Lv.16进化→焰火" } },
        { from: 428, to: 227, cond: { type: "level", level: 36, detail: "达到Lv.36进化→火神" } },
        { from: 227, to: 280, cond: { type: "super", level: 100, detail: "Lv.100+150燃料棒+100火焰玻璃→烈火战神" } }
      ]
    },
    {
      familyId: "c003",
      baseFormId: 390,
      members: [390, 121, 389],
      edges: [
        { from: 390, to: 121, cond: { type: "level", level: 16, detail: "达到Lv.16进化→波波拉" } },
        { from: 121, to: 389, cond: { type: "level", level: 36, detail: "达到Lv.36进化→水灵" } }
      ]
    },

    // --- 迪莫 ---
    {
      familyId: "c004",
      baseFormId: 153,
      members: [153, 364],
      edges: [
        { from: 153, to: 364, cond: { type: "super", level: 50, detail: "Lv.50+光系灵碎+首领血脉碎片→圣光迪莫" } }
      ]
    },

    // --- 格兰种子 ---
    {
      familyId: "c005",
      baseFormId: 24,
      members: [24, 174, 173],
      edges: [
        { from: 24, to: 174, cond: { type: "level", level: 16, detail: "达到Lv.16进化→格兰花" } },
        { from: 174, to: 173, cond: { type: "level", level: 36, detail: "达到Lv.36进化→格兰球" } }
      ]
    },

    // --- 奇丽草 ---
    {
      familyId: "c006",
      baseFormId: 29,
      members: [29, 327, 329, 328],
      edges: [
        { from: 29, to: 327, cond: { type: "level", level: 16, detail: "达到Lv.16进化→奇丽叶" } },
        { from: 327, to: 329, cond: { type: "level", level: 32, detail: "达到Lv.32进化→奇丽花" } },
        { from: 329, to: 328, cond: { type: "super", level: 100, detail: "Lv.100+奇丽果之芯→奇丽果" } }
      ]
    },

    // --- 护主犬 ---
    {
      familyId: "c007",
      baseFormId: 63,
      members: [63, 454, 184],
      edges: [
        { from: 63, to: 454, cond: { type: "level", level: 16, detail: "达到Lv.16进化→音速犬" } },
        { from: 454, to: 184, cond: { type: "level", level: 36, detail: "达到Lv.36进化→风暴战犬" } }
      ]
    },

    // --- 白发懒人 ---
    {
      familyId: "c008",
      baseFormId: 70,
      members: [70, 143, 260],
      edges: [
        { from: 70, to: 143, cond: { type: "level", level: 18, detail: "达到Lv.18进化→动力猿" } },
        { from: 143, to: 260, cond: { type: "level", level: 36, detail: "达到Lv.36进化→瞌睡王" } }
      ]
    },

    // --- 雪娃娃 ---
    {
      familyId: "c009",
      baseFormId: 47,
      members: [47, 108, 420],
      edges: [
        { from: 47, to: 108, cond: { type: "level", level: 28, detail: "达到Lv.28进化→冰封怨灵" } },
        { from: 108, to: 420, cond: { type: "level", level: 40, detail: "达到Lv.40进化→雪灵" } }
      ]
    },

    // --- 大耳帽兜 ---
    {
      familyId: "c010",
      baseFormId: 126,
      members: [126, 288, 434],
      edges: [
        { from: 126, to: 288, cond: { type: "level", level: 22, detail: "达到Lv.22进化→帽兜娃娃" } },
        { from: 288, to: 434, cond: { type: "level", level: 40, detail: "达到Lv.40进化→雪影娃娃" } }
      ]
    },

    // --- 恶魔叮 ---
    {
      familyId: "c011",
      baseFormId: 19,
      members: [19, 144],
      edges: [
        { from: 19, to: 144, cond: { type: "level", level: 30, detail: "达到Lv.30进化→叮叮恶魔" } }
      ]
    },

    // --- 板板壳 ---
    {
      familyId: "c012",
      baseFormId: 52,
      members: [52, 242, 387],
      edges: [
        { from: 52, to: 242, cond: { type: "level", level: 16, detail: "达到Lv.16进化→咔咔壳" } },
        { from: 242, to: 387, cond: { type: "level", level: 36, detail: "达到Lv.36进化→水泡壳" } }
      ]
    },

    // --- 石肤蜥 ---
    {
      familyId: "c013",
      baseFormId: 73,
      members: [73, 375, 374],
      edges: [
        { from: 73, to: 375, cond: { type: "level", level: 16, detail: "达到Lv.16进化→石刺蜥" } },
        { from: 375, to: 374, cond: { type: "level", level: 36, detail: "达到Lv.36进化→石冠王蜥" } }
      ]
    },

    // --- 布是石 ---
    {
      familyId: "c014",
      baseFormId: 71,
      members: [71, 113, 112],
      edges: [
        { from: 71, to: 113, cond: { type: "level", level: 16, detail: "达到Lv.16进化→布是岩" } },
        { from: 113, to: 112, cond: { type: "level", level: 36, detail: "达到Lv.36进化→布克棱岩" } }
      ]
    },

    // --- 雪绒鸟 ---
    {
      familyId: "c015",
      baseFormId: 435,
      members: [435, 142, 257],
      edges: [
        { from: 435, to: 142, cond: { type: "level", level: 16, detail: "达到Lv.16进化→冬羽雀" } },
        { from: 142, to: 257, cond: { type: "level", level: 36, detail: "达到Lv.36进化→岚鸟" } }
      ]
    },

    // --- 小灵菇 ---
    {
      familyId: "c016",
      baseFormId: 400,
      members: [400, 203, 222],
      edges: [
        { from: 400, to: 203, cond: { type: "level", level: 16, detail: "达到Lv.16进化→幻灵菇" } },
        { from: 203, to: 222, cond: { type: "level", level: 36, detail: "达到Lv.36进化→幻影灵菇" } }
      ]
    },

    // --- 锥尾羊 ---
    {
      familyId: "c017",
      baseFormId: 64,
      members: [64, 287, 212],
      edges: [
        { from: 64, to: 287, cond: { type: "level", level: 16, detail: "达到Lv.16进化→铃兰羊" } },
        { from: 287, to: 212, cond: { type: "level", level: 36, detail: "达到Lv.36进化→花影羚羊" } }
      ]
    },

    // --- 小鼠獭 ---
    {
      familyId: "c018",
      baseFormId: 48,
      members: [48, 430, 241],
      edges: [
        { from: 48, to: 430, cond: { type: "level", level: 16, detail: "达到Lv.16进化→燕尾獭" } },
        { from: 430, to: 241, cond: { type: "level", level: 36, detail: "达到Lv.36进化→卷胡巨獭" } }
      ]
    },

    // --- 蒲公英 ---
    {
      familyId: "c019",
      baseFormId: 2,
      members: [2, 339, 457],
      edges: [
        { from: 2, to: 339, cond: { type: "level", level: 16, detail: "达到Lv.16进化→蒲公英娃娃" } },
        { from: 339, to: 457, cond: { type: "level", level: 36, detail: "达到Lv.36进化→圆眼蜘蛛" } }
      ]
    },

    // --- 海盔虫 → 刺盔虫 → 干棘盔 ---
    {
      familyId: "c020",
      baseFormId: 194,
      members: [194, 125, 482],
      edges: [
        { from: 194, to: 125, cond: { type: "level", level: 20, detail: "达到Lv.20进化→刺盔虫" } },
        { from: 125, to: 482, cond: { type: "level", level: 40, detail: "达到Lv.40进化→干棘盔" } }
      ]
    },

    // --- 一窝蜂 ---
    {
      familyId: "c021",
      baseFormId: 27,
      members: [27, 233, 214],
      edges: [
        { from: 27, to: 233, cond: { type: "level", level: 20, detail: "达到Lv.20进化→黄蜂后(需雌性母蜂)" } },
        { from: 233, to: 214, cond: { type: "gender", gender: "female", level: 38, detail: "雌性+Lv.38进化→花魁蜂后" } }
      ]
    },

    // --- 小夜 ---
    {
      familyId: "c022",
      baseFormId: 28,
      members: [28, 462, 384],
      edges: [
        { from: 28, to: 462, cond: { type: "level", level: 20, detail: "达到Lv.20进化→紫夜" } },
        { from: 462, to: 384, cond: { type: "gender", gender: "female", level: 44, detail: "雌性+Lv.44进化→朔夜伊芙" } }
      ]
    },

    // --- 乖乖鹄 → 蓝珠天鹅 → 黑羽夫人 ---
    {
      familyId: "c023",
      baseFormId: 186,
      members: [186, 263, 216],
      edges: [
        { from: 186, to: 263, cond: { type: "level", level: 20, detail: "达到Lv.20进化→蓝珠天鹅" } },
        { from: 263, to: 216, cond: { type: "branch", level: 40, detail: "Lv.40+修改为恶系血脉→黑羽夫人" } }
      ]
    },

    // --- 绿草精灵 ---
    {
      familyId: "c024",
      baseFormId: 294,
      members: [294, 323],
      edges: [
        { from: 294, to: 323, cond: { type: "level", level: 20, detail: "达到Lv.20进化→魔草巫灵" } }
      ]
    },

    // --- 咔咔羽毛 ---
    {
      familyId: "c025",
      baseFormId: 243,
      members: [243, 244, 245],
      edges: [
        { from: 243, to: 244, cond: { type: "level", level: 16, detail: "达到Lv.16进化→咔咔雀" } },
        { from: 244, to: 245, cond: { type: "level", level: 36, detail: "达到Lv.36进化→咔咔鸟" } }
      ]
    },

    // --- 小草虫 ---
    {
      familyId: "c026",
      baseFormId: 10,
      members: [10, 138, 213],
      edges: [
        { from: 10, to: 138, cond: { type: "level", level: 20, detail: "达到Lv.20进化→草衣虫" } },
        { from: 138, to: 213, cond: { type: "gender", gender: "female", level: 36, detail: "雌性+Lv.36进化→花衣蝶" } }
      ]
    },

    // --- 绿翼鸟 ---
    {
      familyId: "c027",
      baseFormId: 20,
      members: [20, 322, 321],
      edges: [
        { from: 20, to: 322, cond: { type: "level", level: 20, detail: "达到Lv.20进化→魔翼鸟" } },
        { from: 322, to: 321, cond: { type: "level", level: 40, detail: "达到Lv.40进化→魔眷鸟" } }
      ]
    },

    // --- 阿米亚特 ---
    {
      familyId: "c028",
      baseFormId: 84,
      members: [84, 105, 295],
      edges: [
        { from: 84, to: 105, cond: { type: "level", level: 20, detail: "达到Lv.20进化→阿米樱" } },
        { from: 105, to: 295, cond: { type: "level", level: 40, detail: "达到Lv.40进化→罗隐" } }
      ]
    },

    // --- 风铃鲨 ---
    {
      familyId: "c029",
      baseFormId: 67,
      members: [67, 264, 128],
      edges: [
        { from: 67, to: 264, cond: { type: "level", level: 20, detail: "达到Lv.20进化→蓝蝶鲨" } },
        { from: 264, to: 128, cond: { type: "level", level: 40, detail: "达到Lv.40进化→彩蝶鲨" } }
      ]
    },

    // --- 石石 ---
    {
      familyId: "c030",
      baseFormId: 87,
      members: [87, 250],
      edges: [
        { from: 87, to: 250, cond: { type: "level", level: 36, detail: "达到Lv.36进化→巨灵石" } }
      ]
    },

    // --- 小独角兽 ---
    {
      familyId: "c031",
      baseFormId: 82,
      members: [82, 98, 127],
      edges: [
        { from: 82, to: 98, cond: { type: "level", level: 28, detail: "达到Lv.28进化→白金独角兽" } },
        { from: 98, to: 127, cond: { type: "level", level: 50, detail: "达到Lv.50进化→彩虹独角兽" } }
      ]
    },

    // --- 蓬叶虫 → 风滚暮虫 ---
    {
      familyId: "c032",
      baseFormId: 484,
      members: [484, 485],
      edges: [
        { from: 484, to: 485, cond: { type: "level", level: 30, detail: "达到Lv.30进化→风滚暮虫" } }
      ]
    },

    // --- 小黑猫 (分支) ---
    {
      familyId: "c033",
      baseFormId: 25,
      members: [25, 198, 199],
      edges: [
        { from: 25, to: 198, cond: { type: "time", time: "night", level: 20, detail: "夜晚+Lv.20进化→黑猫密探" } },
        { from: 25, to: 199, cond: { type: "time", time: "day", level: 20, detail: "白天+Lv.20进化→黑猫巫师" } }
      ]
    },

    // --- 多多 ---
    {
      familyId: "c034",
      baseFormId: 66,
      members: [66, 156, 189],
      edges: [
        { from: 66, to: 156, cond: { type: "level", level: 16, detail: "达到Lv.16进化→多啦多" } },
        { from: 156, to: 189, cond: { type: "level", level: 36, detail: "达到Lv.36进化→古啦多" } }
      ]
    },

    // --- 灵狐 ---
    {
      familyId: "c035",
      baseFormId: 53,
      members: [53, 234, 247],
      edges: [
        { from: 53, to: 234, cond: { type: "level", level: 20, detail: "达到Lv.20进化→九尾狐" } },
        { from: 234, to: 247, cond: { type: "level", level: 40, detail: "达到Lv.40进化→尖嘴狐仙" } }
      ]
    },

    // --- 拉特 → 酷拉 ---
    {
      familyId: "c036",
      baseFormId: 55,
      members: [55, 266],
      edges: [
        { from: 55, to: 266, cond: { type: "level", level: 40, detail: "达到Lv.40进化→酷拉" } }
      ]
    },

    // --- 小电企鹅 ---
    {
      familyId: "c037",
      baseFormId: 22,
      members: [22, 150],
      edges: [
        { from: 22, to: 150, cond: { type: "level", level: 30, detail: "达到Lv.30进化→电企鹅" } }
      ]
    },

    // --- 布鲁斯 ---
    {
      familyId: "c038",
      baseFormId: 115,
      members: [115, 422, 111],
      edges: [
        { from: 115, to: 422, cond: { type: "level", level: 20, detail: "达到Lv.20进化→雪顶布鲁斯" } },
        { from: 422, to: 111, cond: { type: "level", level: 32, detail: "达到Lv.32进化→冰钻布鲁斯" } }
      ]
    },

    // --- 呼呼猪 ---
    {
      familyId: "c039",
      baseFormId: 46,
      members: [46, 282],
      edges: [
        { from: 46, to: 282, cond: { type: "level", level: 28, detail: "达到Lv.28进化→獠牙猪" } }
      ]
    },

    // --- 治愈兔 ---
    {
      familyId: "c040",
      baseFormId: 61,
      members: [61, 210, 211],
      edges: [
        { from: 61, to: 210, cond: { type: "level", level: 20, detail: "达到Lv.20进化→红丝绒" } },
        { from: 210, to: 211, cond: { type: "level", level: 40, detail: "达到Lv.40进化→红绒十字" } }
      ]
    },

    // --- 可立鸡 (双分支) ---
    {
      familyId: "c041",
      baseFormId: 31,
      members: [31, 459, 351, 403],
      edges: [
        { from: 31, to: 459, cond: { type: "level", level: 16, detail: "达到Lv.16进化→晕晕鸡" } },
        { from: 459, to: 351, cond: { type: "defeat", level: 36, defeatElement: "恶", defeatCount: 3, detail: "Lv.36+击败3只恶系精灵→绅士鸡" } },
        { from: 459, to: 403, cond: { type: "branch", level: 36, detail: "Lv.36+使用5次鹰爪技能→武者鸡" } }
      ]
    },

    // --- 果冻 (三系分支) ---
    {
      familyId: "c042",
      baseFormId: 26,
      members: [26, 427, 313, 349],
      edges: [
        { from: 26, to: 427, cond: { type: "branch", level: 30, detail: "Lv.30+修改为冰系血脉→椰浆布丁" } },
        { from: 26, to: 313, cond: { type: "branch", level: 30, detail: "Lv.30+修改为水系血脉→抹茶布丁" } },
        { from: 26, to: 349, cond: { type: "branch", level: 30, detail: "Lv.30+修改为火系血脉→熔岩布丁" } }
      ]
    },

    // --- 机械方方 ---
    {
      familyId: "c043",
      baseFormId: 59,
      members: [59, 157, 285],
      edges: [
        { from: 59, to: 157, cond: { type: "level", level: 20, detail: "达到Lv.20进化→多彩方方" } },
        { from: 157, to: 285, cond: { type: "branch", level: 40, detail: "Lv.40+进入多人联机模式→立方人" } }
      ]
    },

    // --- 柴渣虫 ---
    {
      familyId: "c044",
      baseFormId: 132,
      members: [132, 350],
      edges: [
        { from: 132, to: 350, cond: { type: "level", level: 30, detail: "达到Lv.30进化→燃薪虫" } }
      ]
    },

    // --- 厉毒小萝 ---
    {
      familyId: "c045",
      baseFormId: 273,
      members: [273, 272],
      edges: [
        { from: 273, to: 272, cond: { type: "level", level: 32, detail: "达到Lv.32进化→厉毒修萝" } }
      ]
    },

    // --- 毛头小蛛 (身高分支) ---
    {
      familyId: "c046",
      baseFormId: 291,
      members: [291, 377, 118],
      edges: [
        { from: 291, to: 377, cond: { type: "branch", level: 30, detail: "Lv.30+身高<0.375m→食尘短绒" } },
        { from: 291, to: 118, cond: { type: "branch", level: 30, detail: "Lv.30+身高>0.375m→捕尘长绒" } }
      ]
    },

    // --- 裘洛 ---
    {
      familyId: "c047",
      baseFormId: 357,
      members: [357, 356, 340],
      edges: [
        { from: 357, to: 356, cond: { type: "level", level: 20, detail: "达到Lv.20进化→裘力" } },
        { from: 356, to: 340, cond: { type: "level", level: 32, detail: "达到Lv.32进化→裘卡" } }
      ]
    },

    // --- 多西 ---
    {
      familyId: "c048",
      baseFormId: 45,
      members: [45, 258, 119],
      edges: [
        { from: 45, to: 258, cond: { type: "level", level: 20, detail: "达到Lv.20进化→库多西" } },
        { from: 258, to: 119, cond: { type: "level", level: 40, detail: "达到Lv.40进化→波多西" } }
      ]
    },

    // --- 可爱猿 ---
    {
      familyId: "c049",
      baseFormId: 254,
      members: [254, 134, 226],
      edges: [
        { from: 254, to: 134, cond: { type: "level", level: 16, detail: "达到Lv.16进化→炽热猿" } },
        { from: 134, to: 226, cond: { type: "level", level: 36, detail: "达到Lv.36进化→火焰猿" } }
      ]
    },

    // --- 火尾瓦特 ---
    {
      familyId: "c050",
      baseFormId: 72,
      members: [72, 225, 279],
      edges: [
        { from: 72, to: 225, cond: { type: "level", level: 20, detail: "达到Lv.20进化→火尾战士" } },
        { from: 225, to: 279, cond: { type: "level", level: 40, detail: "达到Lv.40进化→烈火守护" } }
      ]
    },

    // --- 呆小路 ---
    {
      familyId: "c051",
      baseFormId: 42,
      members: [42, 407, 97],
      edges: [
        { from: 42, to: 407, cond: { type: "level", level: 16, detail: "达到Lv.16进化→舞动路路" } },
        { from: 407, to: 97, cond: { type: "level", level: 32, detail: "达到Lv.32进化→白发路路" } }
      ]
    },

    // --- 甜田螺 ---
    {
      familyId: "c052",
      baseFormId: 56,
      members: [56, 255, 253],
      edges: [
        { from: 56, to: 255, cond: { type: "level", level: 16, detail: "达到Lv.16进化→壳乙螺" } },
        { from: 255, to: 253, cond: { type: "level", level: 36, detail: "达到Lv.36进化→卡洛儿" } }
      ]
    },

    // --- 帕尔萨斯 ---
    {
      familyId: "c053",
      baseFormId: 310,
      members: [310, 302],
      edges: [
        { from: 310, to: 302, cond: { type: "level", level: 28, detail: "Lv.28+放生1只一星精灵→龙息帕尔" } }
      ]
    },

    // --- 春团 ---
    {
      familyId: "c054",
      baseFormId: 130,
      members: [130, 129, 131],
      edges: [
        { from: 130, to: 129, cond: { type: "level", level: 16, detail: "达到Lv.16进化→春兔" } },
        { from: 129, to: 131, cond: { type: "level", level: 36, detail: "达到Lv.36进化→春花兔" } }
      ]
    },

    // --- 脆筒甜甜 ---
    {
      familyId: "c055",
      baseFormId: 137,
      members: [137, 408, 363],
      edges: [
        { from: 137, to: 408, cond: { type: "level", level: 18, detail: "达到Lv.18进化→香草甜甜" } },
        { from: 408, to: 363, cond: { type: "level", level: 36, detail: "达到Lv.36进化→圣代甜甜" } }
      ]
    },

    // --- 伊雷龙 ---
    {
      familyId: "c056",
      baseFormId: 75,
      members: [75, 442],
      edges: [
        { from: 75, to: 442, cond: { type: "level", level: 28, detail: "达到Lv.28进化→伊兰亚龙" } }
      ]
    },

    // --- 恶魔狼 ---
    {
      familyId: "c057",
      baseFormId: 89,
      members: [89, 161],
      edges: [
        { from: 89, to: 161, cond: { type: "level", level: 36, detail: "达到Lv.36进化→恶魔狼王" } }
      ]
    },

    // --- 绒绒 ---
    {
      familyId: "c058",
      baseFormId: 354,
      members: [354, 413, 352],
      edges: [
        { from: 354, to: 413, cond: { type: "level", level: 16, detail: "达到Lv.16进化→小绒茧" } },
        { from: 413, to: 352, cond: { type: "level", level: 30, detail: "达到Lv.30进化→绒仙子" } }
      ]
    },

    // --- 小怂猫 ---
    {
      familyId: "c059",
      baseFormId: 69,
      members: [69, 312],
      edges: [
        { from: 69, to: 312, cond: { type: "level", level: 30, detail: "达到Lv.30进化→怒目怂猫" } }
      ]
    },

    // --- 多灵 ---
    {
      familyId: "c060",
      baseFormId: 158,
      members: [158, 159],
      edges: [
        { from: 158, to: 159, cond: { type: "level", level: 36, detail: "达到Lv.36进化→多灵主" } }
      ]
    },

    // --- 尖角蜘蛛 ---
    {
      familyId: "c061",
      baseFormId: 248,
      members: [248, 162],
      edges: [
        { from: 248, to: 162, cond: { type: "level", level: 30, detail: "达到Lv.30进化→恶魔红钻" } }
      ]
    },

    // --- 电动长颈鹿 ---
    {
      familyId: "c062",
      baseFormId: 80,
      members: [80, 91, 251],
      edges: [
        { from: 80, to: 91, cond: { type: "level", level: 20, detail: "达到Lv.20进化→奔乐鹿" } },
        { from: 91, to: 251, cond: { type: "level", level: 40, detail: "达到Lv.40进化→爵士鹿" } }
      ]
    },

    // --- 画精灵 (双分支) ---
    {
      familyId: "c063",
      baseFormId: 207,
      members: [207, 206, 209, 208],
      edges: [
        { from: 207, to: 206, cond: { type: "level", level: 16, detail: "达到Lv.16进化→画像守护" } },
        { from: 206, to: 209, cond: { type: "defeat", level: 36, defeatElement: "幻", defeatCount: 3, detail: "Lv.36+击败3只幻系精灵→画间法师手" } },
        { from: 206, to: 208, cond: { type: "defeat", level: 36, defeatElement: "武", defeatCount: 3, detail: "Lv.36+击败3只武系精灵→画间沉铁兽" } }
      ]
    },

    // --- 呼拉猫 ---
    {
      familyId: "c064",
      baseFormId: 201,
      members: [201, 236],
      edges: [
        { from: 201, to: 236, cond: { type: "branch", level: 32, detail: "Lv.32+放出事件跟随→健猫教练" } }
      ]
    },

    // --- 里奥 ---
    {
      familyId: "c065",
      baseFormId: 286,
      members: [286, 277, 370],
      edges: [
        { from: 286, to: 277, cond: { type: "level", level: 28, detail: "Lv.28+放生1只一星精灵→灵羽勇士" } },
        { from: 277, to: 370, cond: { type: "super", level: 40, detail: "Lv.40+放生2只两星精灵→圣羽翼王" } }
      ]
    },

    // --- 墨鱿士 → 混乱鱿彩 (+秩序鱿蛋) ---
    {
      familyId: "c066",
      baseFormId: 493,
      members: [493, 308, 224],
      edges: [
        { from: 493, to: 308, cond: { type: "level", level: 16, detail: "达到Lv.16进化→墨鱿士" } },
        { from: 308, to: 224, cond: { type: "defeat", level: 32, defeatElement: "恶", defeatCount: 3, detail: "Lv.32+击败3只恶系→混乱鱿彩" } }
      ]
    },

    // --- 大头骨龙 ---
    {
      familyId: "c067",
      baseFormId: 74,
      members: [74, 221],
      edges: [
        { from: 74, to: 221, cond: { type: "level", level: 40, detail: "达到Lv.40进化→寂灭骨龙" } }
      ]
    },

    // --- 贝瑟 ---
    {
      familyId: "c068",
      baseFormId: 102,
      members: [102, 100, 101],
      edges: [
        { from: 102, to: 100, cond: { type: "level", level: 20, detail: "达到Lv.20进化→贝加尔" } },
        { from: 100, to: 101, cond: { type: "level", level: 40, detail: "达到Lv.40进化→贝古斯" } }
      ]
    },

    // --- 牵线木偶 ---
    {
      familyId: "c069",
      baseFormId: 337,
      members: [337, 383],
      edges: [
        { from: 337, to: 383, cond: { type: "level", level: 36, detail: "达到Lv.36进化→帅帅魔偶" } }
      ]
    },

    // --- 矿晶虫 → 钻石蜗(晶石蜗) ---
    {
      familyId: "c070",
      baseFormId: 261,
      members: [261, 472],
      edges: [
        { from: 261, to: 472, cond: { type: "branch", level: 40, detail: "Lv.40+挖矿3次不同颜色矿石→钻石蜗" } }
      ]
    },

    // --- 伏地兽 ---
    {
      familyId: "c071",
      baseFormId: 170,
      members: [170, 393, 249],
      edges: [
        { from: 170, to: 393, cond: { type: "level", level: 20, detail: "达到Lv.20进化→贪食鼹" } },
        { from: 393, to: 249, cond: { type: "level", level: 36, detail: "达到Lv.36进化→巨噬针鼹" } }
      ]
    },

    // --- 棋棋家族 ---
    {
      familyId: "c072",
      baseFormId: 62,
      members: [62, 332, 334, 335, 333, 331],
      edges: [
        { from: 62, to: 332, cond: { type: "branch", level: 36, detail: "多种分支进化: 棋祈督/棋骑士/棋齐垒/棋绮后/棋契陛下" } }
      ]
    },

    // --- 小狮鹫 → 神圣狮鹫 → 皇家狮鹫 ---
    {
      familyId: "c073",
      baseFormId: 60,
      members: [60, 486, 487],
      edges: [
        { from: 60, to: 486, cond: { type: "level", level: 32, detail: "达到Lv.32进化→神圣狮鹫" } },
        { from: 486, to: 487, cond: { type: "level", level: 48, detail: "达到Lv.48进化→皇家狮鹫" } }
      ]
    },

    // --- 小鹬 → 鄙目鹬 → 高脚鹬 ---
    {
      familyId: "c074",
      baseFormId: 7,
      members: [7, 123, 185],
      edges: [
        { from: 7, to: 123, cond: { type: "level", level: 18, detail: "达到Lv.18进化→鄙目鹬" } },
        { from: 123, to: 185, cond: { type: "level", level: 36, detail: "达到Lv.36进化→高脚鹬" } }
      ]
    },

    // --- 暗影灵面 → 幽冥眼 ---
    {
      familyId: "c075",
      baseFormId: 476,
      members: [476, 477],
      edges: [
        { from: 476, to: 477, cond: { type: "level", level: 32, detail: "达到Lv.32进化→幽冥眼" } }
      ]
    },

    // --- 梦游 → 梦悠悠 ---
    {
      familyId: "c076",
      baseFormId: 478,
      members: [478, 479],
      edges: [
        { from: 478, to: 479, cond: { type: "level", level: 28, detail: "达到Lv.28进化→梦悠悠" } }
      ]
    },

    // --- 蹦蹦草 → 蹦蹦花 ---
    {
      familyId: "c077",
      baseFormId: 480,
      members: [480, 481],
      edges: [
        { from: 480, to: 481, cond: { type: "level", level: 16, detail: "达到Lv.16进化→蹦蹦花" } }
      ]
    },

    // --- 小星光 → 星光狮 ---
    {
      familyId: "c078",
      baseFormId: 76,
      members: [76, 483],
      edges: [
        { from: 76, to: 483, cond: { type: "branch", level: 30, detail: "Lv.30+特殊条件→星光狮" } }
      ]
    },

    // --- 卡卡虫 → 卡瓦重 ---
    {
      familyId: "c079",
      baseFormId: 473,
      members: [473, 474],
      edges: [
        { from: 473, to: 474, cond: { type: "level", level: 28, detail: "达到Lv.28进化→卡瓦重" } }
      ]
    },

    // --- 遁鼠 → 遁地鼠 ---
    {
      familyId: "c080",
      baseFormId: 491,
      members: [491, 492],
      edges: [
        { from: 491, to: 492, cond: { type: "level", level: 16, detail: "达到Lv.16进化→遁地鼠" } }
      ]
    },

    // --- 迷你鸟 → 乌拉塔 ---
    {
      familyId: "c081",
      baseFormId: 489,
      members: [489, 490],
      edges: [
        { from: 489, to: 490, cond: { type: "level", level: 30, detail: "达到Lv.30进化→乌拉塔" } }
      ]
    }
  ],

  // ========== 异色形态 ==========
  shinies: {
    1:   { name: "异色小灵面", desc: "配色变化" },
    19:  { name: "异色恶魔叮", desc: "粉色变异" },
    46:  { name: "异色呼呼猪", desc: "配色变化" },
    59:  { name: "异色机械方方", desc: "配色变化" },
    61:  { name: "异色治愈兔", desc: "颜色变异" },
    89:  { name: "异色恶魔狼", desc: "深灰→墨紫/白色" },
    102: { name: "异色贝瑟", desc: "配色变化" },
    173: { name: "异色格兰球", desc: "配色变化" },
    181: { name: "异色粉星仔", desc: "柔粉色系" },
    211: { name: "异色红绒十字", desc: "红白→绿白" },
    231: { name: "异色疾光千兽", desc: "战令获取" },
    257: { name: "异色岚鸟", desc: "棕色→蓝黑色" },
    262: { name: "异色空空颅", desc: "配色变化" },
    266: { name: "异色酷拉", desc: "蓝白→金蓝渐变" },
    285: { name: "异色立方人", desc: "配色变更" },
    329: { name: "异色奇丽花", desc: "配色变化" },
    350: { name: "异色燃薪虫", desc: "翠绿→薰衣草紫" },
    352: { name: "异色绒仙子", desc: "红白→绿白(战令)" },
    434: { name: "异色雪影娃娃", desc: "冰蓝→浅紫渐变" },
    454: { name: "异色音速犬", desc: "晒黑配色+紫色围巾" },
    460: { name: "异色月牙雪熊", desc: "纯白→淡粉渐变" },
    184: { name: "异色风暴战犬", desc: "配色变化" }
  }
};
