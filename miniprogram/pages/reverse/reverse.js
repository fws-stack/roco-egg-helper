const breeding = require('../../utils/breeding.js');
const storage = require('../../utils/storage.js');
const spriteUtil = require('../../utils/sprite.js');

Page({
  data: {
    target: null,
    results: [],
    pickerVisible: false
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
