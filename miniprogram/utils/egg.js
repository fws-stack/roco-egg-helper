/**
 * 蛋参数匹配：根据尺寸和重量匹配对应精灵蛋
 * @param {number} size - 用户输入的尺寸
 * @param {number} weight - 用户输入的重量
 * @returns {Array}
 */
function matchEgg(size, weight) {
  const eggs = getApp().globalData.eggData || [];
  const results = [];

  eggs.forEach(egg => {
    const sizeInRange = size >= egg.size.min && size <= egg.size.max;
    const weightInRange = weight >= egg.weight.min && weight <= egg.weight.max;

    if (sizeInRange && weightInRange) {
      const sizeCenter = (egg.size.min + egg.size.max) / 2;
      const weightCenter = (egg.weight.min + egg.weight.max) / 2;
      const sizeRange = egg.size.max - egg.size.min || 1;
      const weightRange = egg.weight.max - egg.weight.min || 1;
      const sizeScore = Math.abs(size - sizeCenter) / sizeRange;
      const weightScore = Math.abs(weight - weightCenter) / weightRange;
      const score = sizeScore + weightScore;

      const sizeOk = size >= egg.size.min && size <= egg.size.max;
      const weightOk = weight >= egg.weight.min && weight <= egg.weight.max;

      results.push({
        spriteId: egg.spriteId,
        name: egg.name,
        sizeMin: egg.size.min,
        sizeMax: egg.size.max,
        weightMin: egg.weight.min,
        weightMax: egg.weight.max,
        sizeOk: sizeOk,
        weightOk: weightOk,
        sizeCheck: sizeOk ? '✓' : '✗',
        weightCheck: weightOk ? '✓' : '✗',
        sizeCheckClass: sizeOk ? 'egg-result__check--pass' : '',
        weightCheckClass: weightOk ? 'egg-result__check--pass' : '',
        score: score
      });
    }
  });

  results.sort((a, b) => a.score - b.score);
  return results;
}

module.exports = {
  matchEgg
};
