const spriteUtil = require('../../utils/sprite.js');

// 已知有本地图片的精灵ID
const IMG_IDS = new Set([1, 2, 4, 5]);

Page({
  data: {
    sprite: null,
    asChildResults: [],
    asParentResults: [],
    hasImg: false,
    chain: null,
    hasChain: false,
    shiny: null,
    hasShiny: false
  },

  onLoad(options) {
    const id = Number(options.id);
    this.setData({ hasImg: IMG_IDS.has(id) });
    const sprite = spriteUtil.getSprite(id);
    if (!sprite) {
      wx.showToast({ title: '精灵不存在', icon: 'none' });
      wx.navigateBack();
      return;
    }

    const fmtProb = (prob) => prob != null ? (prob * 100).toFixed(0) + '%' : null;

    // 查询有哪些组合可以孵化出此精灵 (作为子代)
    const reverseIndex = getApp().globalData.reverseIndex || {};
    const reverseResults = reverseIndex[id] || [];
    const childResults = reverseResults.map(r => {
      const p1 = spriteUtil.getSprite(r.p[0]);
      const p2 = spriteUtil.getSprite(r.p[1]);
      return {
        parentAId: r.p[0],
        parentAName: p1?.name || '?',
        parentBId: r.p[1],
        parentBName: p2?.name || '?',
        probability: r.prob,
        probText: fmtProb(r.prob)
      };
    });

    // 查询此精灵作为父代之一的组合
    const forwardIndex = getApp().globalData.forwardIndex;
    const asParentSet = new Set();
    Object.entries(forwardIndex).forEach(([key, entries]) => {
      const [a, b] = key.split('_').map(Number);
      if (a === id || b === id) {
        const other = a === id ? b : a;
        entries.forEach(e => {
          const childSprite = spriteUtil.getSprite(e.c);
          const otherSprite = spriteUtil.getSprite(other);
          asParentSet.add(JSON.stringify({
            otherParentId: other,
            otherParentName: otherSprite?.name || '?',
            childId: e.c,
            childName: childSprite?.name || '?',
            probability: e.prob,
            probText: fmtProb(e.prob)
          }));
        });
      }
    });

    const asParentResults = Array.from(asParentSet).map(JSON.parse)
      .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0));

    this.setData({ sprite, asChildResults: childResults, asParentResults });

    // 加载进化链数据
    var chainBySprite = getApp().globalData.chainBySprite || {};
    var chain = chainBySprite[id];
    if (chain) {
      this.setData({ chain: chain, hasChain: true });
    }

    // 加载异色数据
    var shinies = getApp().globalData.shinies || {};
    var shiny = shinies[id];
    if (shiny) {
      this.setData({ shiny: shiny, hasShiny: true });
    }
  },

});
