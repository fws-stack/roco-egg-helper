const spriteUtil = require('../../utils/sprite.js');

Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: '搜索精灵...'
    },
    excludeIds: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: '选择精灵'
    }
  },

  data: {
    keyword: '',
    allSprites: [],
    filteredList: [],
    elementFilter: -1
  },

  lifetimes: {
    attached() {
      this.setData({
        allSprites: spriteUtil.getAllSprites()
      });
      this.filterList();
    }
  },

  observers: {
    'visible'(val) {
      if (val) {
        this.setData({ keyword: '', elementFilter: -1 });
        this.filterList();
      }
    }
  },

  methods: {
    onSearchInput(e) {
      this.setData({ keyword: e.detail.value });
      clearTimeout(this._searchTimer);
      this._searchTimer = setTimeout(() => {
        this.filterList();
      }, 200);
    },

    onFilterByElement(e) {
      const el = Number(e.currentTarget.dataset.element);
      const newFilter = this.data.elementFilter === el ? -1 : el;
      this.setData({ elementFilter: newFilter });
      this.filterList();
    },

    filterList() {
      const { allSprites, keyword, excludeIds, elementFilter } = this.data;
      let list = allSprites;

      if (keyword) {
        const kw = keyword.toLowerCase();
        list = list.filter(s => s.name.toLowerCase().includes(kw));
      }

      if (elementFilter >= 0) {
        list = list.filter(s => s.element === elementFilter);
      }

      if (excludeIds && excludeIds.length) {
        const excludeSet = new Set(excludeIds);
        list = list.filter(s => !excludeSet.has(s.id));
      }

      this.setData({ filteredList: list });
    },

    onSelect(e) {
      const spriteId = Number(e.currentTarget.dataset.id);
      const sprite = this.data.allSprites.find(s => s.id === spriteId);
      this.triggerEvent('select', { spriteId, sprite });
      this.close();
    },

    close() {
      this.triggerEvent('close');
    }
  }
});
