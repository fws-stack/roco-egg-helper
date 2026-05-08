const breeding = require('../../utils/breeding.js');
const storage = require('../../utils/storage.js');
const spriteUtil = require('../../utils/sprite.js');

Page({
  data: {
    target: null,
    results: [],
    pickerVisible: false
  },

  onShow() {
    const pendingId = getApp().globalData.pendingReverseId;
    if (pendingId) {
      getApp().globalData.pendingReverseId = null;
      const sprite = spriteUtil.getSprite(pendingId);
      if (sprite) {
        this.setData({ target: { id: pendingId, name: sprite.name } });
        this.doQuery(pendingId);
      }
    }
  },

  openPicker() {
    this.setData({ pickerVisible: true });
  },

  onPickerSelect(e) {
    const { spriteId, sprite } = e.detail;
    this.setData({
      target: { id: spriteId, name: sprite.name },
      pickerVisible: false
    });
    this.doQuery(spriteId);
  },

  onPickerClose() {
    this.setData({ pickerVisible: false });
  },

  clearTarget() {
    this.setData({ target: null, results: [] });
  },

  doQuery(childId) {
    const results = breeding.queryReverse(childId);
    this.setData({ results });

    storage.addHistory({
      type: 'reverse',
      childId: childId,
      time: Date.now()
    });
  }
});
