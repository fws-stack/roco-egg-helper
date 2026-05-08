App({
  onLaunch() {
    this.initGlobalData();
  },

  initGlobalData() {
    // 加载精灵基础数据
    const spritesMap = require('./data/sprites.js');
    this.globalData.spritesMap = spritesMap;

    // 构建孵蛋索引
    const breedingData = require('./data/breeding.js');
    const forwardIndex = {};
    const reverseIndex = {};

    (breedingData.recipes || []).forEach(entry => {
      const [a, b] = entry.p;
      const key = a <= b ? `${a}_${b}` : `${b}_${a}`;

      // 正向索引: parentKey -> [{c, prob}, ...]
      if (!forwardIndex[key]) forwardIndex[key] = [];
      forwardIndex[key].push({ c: entry.c, prob: entry.prob });

      // 反向索引: childId -> [{p: [a,b], prob}, ...]
      if (!reverseIndex[entry.c]) reverseIndex[entry.c] = [];
      reverseIndex[entry.c].push({ p: [a, b], prob: entry.prob });
    });

    this.globalData.forwardIndex = forwardIndex;
    this.globalData.reverseIndex = reverseIndex;

    // 加载蛋参数数据
    this.globalData.eggData = require('./data/egg-data.js').eggs || [];

    // 加载图鉴数据
    const pokedexData = require('./data/pokedex.js');
    this.globalData.pokedexData = pokedexData;

    // 构建进化链反向索引: spriteId -> chain
    const chainBySprite = {};
    (pokedexData.chains || []).forEach(function(chain) {
      chain.members.forEach(function(id) {
        chainBySprite[id] = chain;
      });
    });
    this.globalData.chainBySprite = chainBySprite;

    // 异色索引
    this.globalData.shinies = pokedexData.shinies || {};

    // 构建精灵所属区域索引
    const spriteRegion = {};
    (pokedexData.regions.windmorn || []).forEach(function(id) {
      spriteRegion[id] = 'windmorn';
    });
    (pokedexData.regions.rockorian || []).forEach(function(id) {
      spriteRegion[id] = 'rockorian';
    });
    this.globalData.spriteRegion = spriteRegion;
  },

  globalData: {
    spritesMap: {},
    forwardIndex: {},
    reverseIndex: {},
    eggData: [],
    pokedexData: null,
    chainBySprite: {},
    shinies: {},
    spriteRegion: {}
  }
});
