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
 * @param {object} entry - { type: 'egg', ... }
 */
function addHistory(entry) {
  let list = getHistory();
  // 去重
  list = list.filter(item => {
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