const spriteUtil = require('../../utils/sprite.js');

Page({
  data: {
    currentRegion: 'all',
    regionTabs: [
      { key: 'all', label: '全部图鉴' },
      { key: 'windmorn', label: '风眠省' },
      { key: 'rockorian', label: '洛克里安' }
    ],
    elementFilter: -1,
    searchKeyword: '',
    elements: spriteUtil.ELEMENT_MAP,
    elementClasses: spriteUtil.ELEMENT_CLASS,
    sprites: [],
    filteredSprites: [],
    shinies: {},
    totalCount: 0,
    filteredCount: 0
  },

  onLoad() {
    this.initData();
  },

  initData() {
    var app = getApp();
    var pokedexData = app.globalData.pokedexData;
    var shinies = app.globalData.shinies || {};
    var spriteRegion = app.globalData.spriteRegion || {};
    var pokedexOrder = pokedexData && pokedexData.pokedexOrder ? pokedexData.pokedexOrder : [];

    // 按pokedexOrder顺序构建精灵数组
    var sprites = [];
    var seen = {};
    var pokedexNum = 0;
    pokedexOrder.forEach(function(id) {
      if (seen[id]) return;
      seen[id] = true;
      var sprite = spriteUtil.getSprite(id);
      if (sprite) {
        pokedexNum++;
        sprite.pokedexNum = pokedexNum;
        sprite.hasShiny = !!shinies[id];
        sprite.region = spriteRegion[id] || '';
        sprites.push(sprite);
      }
    });

    // 追加未在pokedexOrder中的图鉴精灵
    var allIds = [];
    if (pokedexData && pokedexData.regions) {
      allIds = (pokedexData.regions.windmorn || []).concat(pokedexData.regions.rockorian || []);
    }
    allIds.forEach(function(id) {
      if (!seen[id]) {
        seen[id] = true;
        var sprite = spriteUtil.getSprite(id);
        if (sprite) {
          sprite.hasShiny = !!shinies[id];
          sprite.region = spriteRegion[id] || '';
          sprites.push(sprite);
        }
      }
    });

    this.setData({
      sprites: sprites,
      shinies: shinies,
      totalCount: sprites.length
    });

    this.applyFilter();
  },

  switchRegion(e) {
    var region = e.currentTarget.dataset.key;
    this.setData({ currentRegion: region });
    this.applyFilter();
  },

  filterByElement(e) {
    var idx = parseInt(e.currentTarget.dataset.index);
    if (this.data.elementFilter === idx) {
      this.setData({ elementFilter: -1 });
    } else {
      this.setData({ elementFilter: idx });
    }
    this.applyFilter();
  },

  onSpriteTap(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/sprite-detail/sprite-detail?id=' + id
    });
  },

  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilter();
  },

  applyFilter() {
    var sprites = this.data.sprites;
    var region = this.data.currentRegion;
    var element = this.data.elementFilter;
    var keyword = (this.data.searchKeyword || '').trim().toLowerCase();

    var filtered = sprites.filter(function(s) {
      if (region !== 'all' && s.region !== region) return false;
      if (element !== -1 && s.element !== element) return false;
      if (keyword) {
        if (String(s.pokedexNum).indexOf(keyword) === -1 && s.name.toLowerCase().indexOf(keyword) === -1) return false;
      }
      return true;
    });

    this.setData({
      filteredSprites: filtered,
      filteredCount: filtered.length
    });
  }
});
