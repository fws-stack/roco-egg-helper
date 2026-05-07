const HISTORY_KEY = 'query_history';
const MAX_HISTORY = 10;

/**
 * 获取查询历史
 * @returns {Array}
 */
function getHistory() {
  try {
    return wx.getStorageSync(HISTORY_KEY) || [];
  } catch (e) {
    return [];
  }
}

/**
 * 添加查询历史
 * @param {object} entry - { type: 'forward'|'reverse'|'egg', ... }
 */
function addHistory(entry) {
  let list = getHistory();
  // 去重：检查是否已有完全相同的查询
  list = list.filter(item => {
    if (entry.type === 'forward' && item.type === 'forward') {
      const same = (item.parentA === entry.parentA && item.parentB === entry.parentB) ||
                   (item.parentA === entry.parentB && item.parentB === entry.parentA);
      return !same;
    }
    if (entry.type === 'reverse' && item.type === 'reverse') {
      return item.childId !== entry.childId;
    }
    if (entry.type === 'egg' && item.type === 'egg') {
      return !(item.size === entry.size && item.weight === entry.weight);
    }
    return true;
  });

  list.unshift(entry);
  if (list.length > MAX_HISTORY) list.pop();
  wx.setStorageSync(HISTORY_KEY, list);
  return list;
}

/**
 * 清空历史
 */
function clearHistory() {
  wx.removeStorageSync(HISTORY_KEY);
}

module.exports = {
  getHistory,
  addHistory,
  clearHistory
};
