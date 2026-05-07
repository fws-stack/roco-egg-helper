const spriteUtil = require('../../utils/sprite.js');
const breeding = require('../../utils/breeding.js');

Page({
  data: {
    sprite: null,
    asChildResults: [],
    asParentResults: []
  },

  onLoad(options) {
    const id = Number(options.id);
    const sprite = spriteUtil.getSprite(id);
    if (!sprite) {
      wx.showToast({ title: '精灵不存在', icon: 'none' });
      wx.navigateBack();
      return;
    }

    const fmtProb = (prob) => prob != null ? (prob * 100).toFixed(0) + '%' : null;

    // 查询有哪些组合可以孵化出此精灵 (作为子代)
    const reverseResults = breeding.queryReverse(id);
    const childResults = reverseResults.map(r => {
      const p1 = spriteUtil.getSprite(r.parentIds[0]);
      const p2 = spriteUtil.getSprite(r.parentIds[1]);
      return {
        parentAId: r.parentIds[0],
        parentAName: p1?.name || '?',
        parentBId: r.parentIds[1],
        parentBName: p2?.name || '?',
        probability: r.probability,
        probText: fmtProb(r.probability)
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
  },

  goForward() {
    wx.switchTab({ url: '/pages/forward/forward' });
  },

  goReverse() {
    wx.switchTab({ url: '/pages/reverse/reverse' });
  }
});
