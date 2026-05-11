const spriteUtil = require('../../utils/sprite.js');
const IMG_IDS = require('../../data/sprites-img-ids.js');

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
      value: 'normal'
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

    onImgError() {
      this.setData({ hasImg: false });
    },

    onTap() {
      if (!this.properties.tappable || !this.data.sprite) return;
      this.triggerEvent('tap', { spriteId: this.properties.spriteId });
      wx.navigateTo({
        url: `/subpackages/sprites/pages/sprite-detail/sprite-detail?id=${this.properties.spriteId}`
      });
    }
  }
});
