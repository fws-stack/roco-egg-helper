const storage = require('../../utils/storage.js');
const spriteUtil = require('../../utils/sprite.js');

Page({
  data: {
    history: [],
    historySprites: {}
  },

  onShow() {
    this.loadHistory();
  },

  loadHistory() {
    const history = storage.getHistory();
    const historySprites = {};
    history.forEach(entry => {
      if (entry.type === 'forward') {
        historySprites[entry.parentA] = spriteUtil.getSprite(entry.parentA);
        historySprites[entry.parentB] = spriteUtil.getSprite(entry.parentB);
      } else if (entry.type === 'reverse' || entry.type === 'egg') {
        historySprites[entry.childId || entry.spriteId] = spriteUtil.getSprite(entry.childId || entry.spriteId);
      }
    });
    this.setData({ history, historySprites });
  },

  goForward() {
    wx.switchTab({ url: '/pages/forward/forward' });
  },

  goReverse() {
    wx.switchTab({ url: '/pages/reverse/reverse' });
  },

  goEggQuery() {
    wx.switchTab({ url: '/pages/egg-query/egg-query' });
  },

  onHistoryTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item.type === 'forward') {
      wx.switchTab({ url: '/pages/forward/forward' });
    } else if (item.type === 'reverse') {
      wx.switchTab({ url: '/pages/reverse/reverse' });
    } else if (item.type === 'egg') {
      wx.switchTab({ url: '/pages/egg-query/egg-query' });
    }
  },

  clearHistory() {
    storage.clearHistory();
    this.setData({ history: [], historySprites: {} });
  }
});
