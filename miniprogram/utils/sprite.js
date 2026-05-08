/** 元素枚举映射 (18种属性) */
const ELEMENT_MAP = ['普通', '草', '火', '水', '光', '地', '冰', '龙', '电', '毒', '虫', '武', '翼', '萌', '幽', '恶', '机械', '幻'];
const ELEMENT_CLASS = ['normal', 'grass', 'fire', 'water', 'light', 'earth', 'ice', 'dragon', 'electric', 'poison', 'bug', 'fighting', 'flying', 'fairy', 'ghost', 'dark', 'machine', 'magic'];

/** 稀有度映射 */
const RARITY_MAP = ['', '普通', '稀有', '精英', '史诗', '传说', '神话'];
const RARITY_STARS = ['', '★', '★★', '★★★', '★★★★', '★★★★★', '★★★★★★'];

/**
 * 获取精灵信息
 * @param {number} id
 * @returns {object|null}
 */
function getSprite(id) {
  const map = getApp().globalData.spritesMap;
  const entry = map[id];
  if (!entry) return null;
  return {
    id: id,
    name: entry.n || '未知',
    element: entry.e ?? 8,
    elementName: ELEMENT_MAP[entry.e] || '普通',
    elementClass: ELEMENT_CLASS[entry.e] || 'normal',
    rarity: entry.r || 1,
    rarityName: RARITY_MAP[entry.r] || '普通',
    rarityStars: RARITY_STARS[entry.r] || '',
    description: entry.d || ''
  };
}

/**
 * 搜索精灵（按名称模糊匹配）
 * @param {string} keyword
 * @returns {Array}
 */
function searchSprites(keyword) {
  const map = getApp().globalData.spritesMap;
  const results = [];
  const kw = (keyword || '').toLowerCase();
  Object.entries(map).forEach(([id, entry]) => {
    if (!kw || (entry.n && entry.n.toLowerCase().includes(kw))) {
      results.push(getSprite(Number(id)));
    }
  });
  return results;
}

/**
 * 获取所有精灵列表
 * @returns {Array}
 */
function getAllSprites() {
  return searchSprites('');
}

module.exports = {
  ELEMENT_MAP,
  ELEMENT_CLASS,
  RARITY_MAP,
  RARITY_STARS,
  getSprite,
  searchSprites,
  getAllSprites
};
