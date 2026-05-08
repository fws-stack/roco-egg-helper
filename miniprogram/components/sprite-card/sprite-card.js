const spriteUtil = require('../../utils/sprite.js');

// 已知有本地图片的精灵ID (从 /images/sprites/ 读取)
// 新增图片后在此数组中添加对应ID即可
const IMG_IDS = new Set([1, 2, 4, 5]);

Component({
  properties: {
    spriteId: {
      type: Number,
      value: 0
    },
    showRarity: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      value: 'normal' // 'small' | 'normal'
    },
    tappable: {
      type: Boolean,
      value: true
    }
  },

  data: {
    sprite: null,
    hasImg: false
  },

  lifetimes: {
    attached() {
      this.loadSprite();
    }
  },

  observers: {
    'spriteId'(id) {
      this.setData({ hasImg: IMG_IDS.has(id) });
      this.loadSprite();
    }
  },

  methods: {
    loadSprite() {
      const sprite = spriteUtil.getSprite(this.properties.spriteId);
      this.setData({ sprite });
    },

    onTap() {
      if (!this.properties.tappable || !this.data.sprite) return;
      this.triggerEvent('tap', { spriteId: this.properties.spriteId });
      wx.navigateTo({
        url: `/pages/sprite-detail/sprite-detail?id=${this.properties.spriteId}`
      });
    }
  }
});
