const storage = require('../../utils/storage.js');

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
    this.setData({ history, historySprites: {} });
  },

  goEggQuery() {
    wx.navigateTo({ url: '/pages/egg-query/egg-query' });
  },

  goPokedex() {
    wx.switchTab({ url: '/pages/pokedex/pokedex' });
  },

  onHistoryTap(e) {
    const item = e.currentTarget.dataset.item;
    if (item.type === 'egg') {
      wx.switchTab({ url: '/pages/egg-query/egg-query' });
    }
  },

  clearHistory() {
    storage.clearHistory();
    this.setData({ history: [], historySprites: {} });
  }
});