const breeding = require('../../utils/breeding.js');
const storage = require('../../utils/storage.js');
const spriteUtil = require('../../utils/sprite.js');

Page({
  data: {
    parentA: null,    // { id, name }
    parentB: null,
    results: [],
    pickerVisible: false,
    pickerTarget: '',  // 'parentA' | 'parentB'
    pickerTitle: '',
    pickerExclude: []
  },

  /**
   * 打开精灵选择器
   */
  openPicker(e) {
    const target = e.currentTarget.dataset.target;
    const exclude = [];
    if (target === 'parentA' && this.data.parentB) {
      exclude.push(this.data.parentB.id);
    } else if (target === 'parentB' && this.data.parentA) {
      exclude.push(this.data.parentA.id);
    }

    this.setData({
      pickerVisible: true,
      pickerTarget: target,
      pickerTitle: target === 'parentA' ? '选择父精灵 A' : '选择父精灵 B',
      pickerExclude: exclude
    });
  },

  /**
   * 选中精灵
   */
  onPickerSelect(e) {
    const { spriteId, sprite } = e.detail;
    const target = this.data.pickerTarget;

    if (target === 'parentA') {
      this.setData({ parentA: { id: spriteId, name: sprite.name } });
    } else {
      this.setData({ parentB: { id: spriteId, name: sprite.name } });
    }

    // 两个精灵都选好后自动查询
    const a = target === 'parentA' ? spriteId : this.data.parentA?.id;
    const b = target === 'parentB' ? spriteId : this.data.parentB?.id;
    if (a && b) {
      this.doQuery(a, b);
    }
  },

  onPickerClose() {
    this.setData({ pickerVisible: false });
  },

  /**
   * 清除已选精灵
   */
  clearParent(e) {
    const target = e.currentTarget.dataset.target;
    if (target === 'parentA') {
      this.setData({ parentA: null, results: [] });
    } else {
      this.setData({ parentB: null, results: [] });
    }
  },

  /**
   * 正向查询
   */
  doQuery(a, b) {
    const results = breeding.queryForward(a, b);
    this.setData({ results });

    // 保存历史
    storage.addHistory({
      type: 'forward',
      parentA: a,
      parentB: b,
      time: Date.now()
    });
  }
});
