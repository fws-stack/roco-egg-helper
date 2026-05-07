/**
 * 正向查询：给定两个父精灵 ID，返回所有可能的子代
 * @param {number} parentA
 * @param {number} parentB
 * @returns {Array<{childId: number, probability: number|null}>}
 */
function queryForward(parentA, parentB) {
  const key = normalizeKey(parentA, parentB);
  const results = getApp().globalData.forwardIndex[key] || [];
  return results
    .map(r => ({ childId: r.c, probability: r.prob != null ? r.prob : null }))
    .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0));
}

/**
 * 反向查询：给定目标子代精灵 ID，返回所有可能的父母组合
 * @param {number} childId
 * @returns {Array<{parentIds: [number, number], probability: number|null}>}
 */
function queryReverse(childId) {
  const results = getApp().globalData.reverseIndex[childId] || [];
  return results
    .map(r => ({ parentIds: r.p, probability: r.prob != null ? r.prob : null }))
    .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0));
}

/**
 * 归一化父母 key
 */
function normalizeKey(a, b) {
  return a <= b ? `${a}_${b}` : `${b}_${a}`;
}

module.exports = {
  queryForward,
  queryReverse
};
