const egg = require('../../utils/egg.js');
const storage = require('../../utils/storage.js');

Page({
  data: {
    size: '',
    weight: '',
    inputSize: 0,
    inputWeight: 0,
    results: [],
    hasQueried: false
  },

  onSizeInput(e) {
    this.setData({ size: e.detail.value });
    this.autoQuery(e.detail.value, this.data.weight);
  },

  onWeightInput(e) {
    this.setData({ weight: e.detail.value });
    this.autoQuery(this.data.size, e.detail.value);
  },

  autoQuery(sizeStr, weightStr) {
    const size = parseFloat(sizeStr);
    const weight = parseFloat(weightStr);

    if (isNaN(size) || isNaN(weight)) {
      this.setData({ results: [], hasQueried: false });
      return;
    }

    const results = egg.matchEgg(size, weight);
    this.setData({ results, hasQueried: true, inputSize: size, inputWeight: weight });

    if (results.length > 0) {
      storage.addHistory({
        type: 'egg',
        size: size,
        weight: weight,
        spriteId: results[0].spriteId,
        time: Date.now()
      });
    }
  },

  onSubmit() {
    const size = parseFloat(this.data.size);
    const weight = parseFloat(this.data.weight);

    if (isNaN(size) || isNaN(weight)) {
      wx.showToast({ title: '请输入尺寸和重量', icon: 'none' });
      return;
    }

    const results = egg.matchEgg(size, weight);
    this.setData({ results, hasQueried: true, inputSize: size, inputWeight: weight });

    if (results.length > 0) {
      storage.addHistory({
        type: 'egg',
        size: size,
        weight: weight,
        spriteId: results[0].spriteId,
        time: Date.now()
      });
    }
  }
});
