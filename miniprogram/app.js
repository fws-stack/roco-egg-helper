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
  },

  globalData: {
    spritesMap: {},
    forwardIndex: {},
    reverseIndex: {},
    eggData: []
  }
});
