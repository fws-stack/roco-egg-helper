const spriteUtil = require('../../utils/sprite.js');

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
    sprite: null
  },

  lifetimes: {
    attached() {
      this.loadSprite();
    }
  },

  observers: {
    'spriteId'() {
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
