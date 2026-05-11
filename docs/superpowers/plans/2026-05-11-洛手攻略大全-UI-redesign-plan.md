# 洛手攻略大全 UI 整体重设计 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将微信小程序从工具型蓝白风格重设计为杂志/图鉴风（暖色羊皮纸配色 + 双列网格图鉴 + 3 Tab 导航）

**Architecture:** 纯视觉层改造，不改数据/逻辑层。自底向上：先改全局 CSS 变量和 app.json 配色 → 再逐页重写 WXML/WXSS → 最后改组件。新增 `pages/more/more` 作为功能容器页。

**Tech Stack:** 微信小程序（WXML + WXSS + JS），无外部依赖

---

## 文件结构映射

| 文件 | 职责 | 操作 |
|------|------|------|
| `miniprogram/styles/common.wxss` | 全局 CSS 变量 + 通用样式类 | 重写 |
| `miniprogram/app.wxss` | page 基础样式 | 修改 |
| `miniprogram/app.json` | 窗口色、TabBar 配置 | 修改 |
| `miniprogram/pages/index/index.*` | 首页（入口卡片 + 历史） | 重写 WXML/WXSS |
| `miniprogram/pages/pokedex/pokedex.*` | 图鉴（列表→双列网格） | 重写 WXML/WXSS |
| `miniprogram/pages/sprite-detail/sprite-detail.*` | 精灵详情 | 重写 WXSS，微调 WXML |
| `miniprogram/pages/egg-query/egg-query.*` | 蛋参数查询 | 重写 WXSS |
| `miniprogram/pages/more/more.*` | 更多页（新建） | 创建 |
| `miniprogram/components/sprite-card/sprite-card.*` | 精灵卡片组件 | 重写 WXML/WXSS |
| `miniprogram/components/evolution-chain/evolution-chain.*` | 进化链组件 | 重写 WXML/WXSS |
| `miniprogram/components/egg-result/egg-result.*` | 孵蛋结果组件 | 重写 WXSS，微调 WXML |
| `miniprogram/components/empty-state/empty-state.*` | 空状态组件 | 重写 WXSS |

---

### Task 1: 全局样式变量 + app.json 配色

**Files:**
- Modify: `miniprogram/styles/common.wxss` (全量替换)
- Modify: `miniprogram/app.wxss`
- Modify: `miniprogram/app.json`

- [ ] **Step 1: 重写 common.wxss — CSS 变量 + 全局类**

全量替换 `miniprogram/styles/common.wxss`:

```css
/* ===== 色彩变量（暖色羊皮纸） ===== */
page {
  --color-bg: #FBF8F0;
  --color-card: #FFFFFF;
  --color-gold: #C9A96E;
  --color-gold-light: #D4C5A0;
  --color-text: #5D4E37;
  --color-text-secondary: #8B7355;
  --color-text-light: #B8A890;
  --color-text-lighter: #C9B99E;
  --color-green: #4A6741;
  --color-warm: #D4A574;
  --color-border: #E8DCC8;
  --color-border-light: #EDE5D5;
  --color-success: #4A6741;
  --color-warning: #D4A574;
  --color-danger: #C0392B;

  /* 保留元素色（用于头像底色/标签，这些需要鲜明区分） */
  --color-normal: #C4B5A5;
  --color-grass: #4CAF50;
  --color-fire: #F44336;
  --color-water: #2196F3;
  --color-light: #FFC107;
  --color-earth: #795548;
  --color-ice: #00BCD4;
  --color-dragon: #7C4DFF;
  --color-electric: #FFA000;
  --color-poison: #9C27B0;
  --color-bug: #8BC34A;
  --color-fighting: #FF5722;
  --color-flying: #87CEEB;
  --color-fairy: #E91E63;
  --color-ghost: #607D8B;
  --color-dark: #424242;
  --color-machine: #78909C;
  --color-magic: #BA68C8;

  --radius-sm: 8rpx;
  --radius-md: 12rpx;
  --radius-lg: 20rpx;
  --shadow-card: 0 2rpx 12rpx rgba(139,115,85,0.06);
  --font-serif: Georgia, "Times New Roman", serif;
}

/* ===== 通用布局 ===== */
.page-container {
  min-height: 100vh;
  padding: 24rpx;
  box-sizing: border-box;
}

.card {
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 24rpx;
  margin-bottom: 24rpx;
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
}

.card-title {
  font-size: 30rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  margin-bottom: 16rpx;
}

/* ===== 按钮 ===== */
.btn-primary {
  background: var(--color-gold);
  color: #fff;
  border-radius: var(--radius-sm);
  padding: 16rpx 32rpx;
  font-size: 28rpx;
  text-align: center;
  border: none;
}
.btn-primary:active {
  background: #B8995E;
}

/* ===== flex 工具 ===== */
.flex-row { display: flex; flex-direction: row; align-items: center; }
.flex-col { display: flex; flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-1 { flex: 1; }
.justify-between { justify-content: space-between; }
.justify-center { justify-content: center; }
.align-center { align-items: center; }

/* ===== 间距 ===== */
.mt-16 { margin-top: 16rpx; }
.mt-24 { margin-top: 24rpx; }
.mb-16 { margin-bottom: 16rpx; }
.mb-24 { margin-bottom: 24rpx; }
.ml-8  { margin-left: 8rpx; }
.ml-16 { margin-left: 16rpx; }
.mr-8  { margin-right: 8rpx; }
.mr-16 { margin-right: 16rpx; }
.p-16  { padding: 16rpx; }
.p-24  { padding: 24rpx; }

/* ===== 文本 ===== */
.text-center { text-align: center; }
.text-sm  { font-size: 24rpx; }
.text-md  { font-size: 28rpx; }
.text-lg  { font-size: 32rpx; }
.text-xl  { font-size: 36rpx; }
.text-bold { font-weight: 600; }
.text-light { color: var(--color-text-light); }
.text-lighter { color: var(--color-text-lighter); }

/* ===== 标签(保留元素色) ===== */
.tag {
  display: inline-block;
  padding: 4rpx 12rpx;
  border-radius: 6rpx;
  font-size: 20rpx;
  color: #fff;
  line-height: 1.4;
}
.tag-normal   { background: var(--color-normal); }
.tag-grass    { background: var(--color-grass); }
.tag-fire     { background: var(--color-fire); }
.tag-water    { background: var(--color-water); }
.tag-light    { background: var(--color-light); color: #333; }
.tag-earth    { background: var(--color-earth); }
.tag-ice      { background: var(--color-ice); }
.tag-dragon   { background: var(--color-dragon); }
.tag-electric { background: var(--color-electric); }
.tag-poison   { background: var(--color-poison); }
.tag-bug      { background: var(--color-bug); color: #333; }
.tag-fighting { background: var(--color-fighting); }
.tag-flying   { background: var(--color-flying); color: #333; }
.tag-fairy    { background: var(--color-fairy); }
.tag-ghost    { background: var(--color-ghost); }
.tag-dark     { background: var(--color-dark); }
.tag-machine  { background: var(--color-machine); }
.tag-magic    { background: var(--color-magic); }
```

- [ ] **Step 2: 更新 app.wxss — page 基础样式**

修改 `miniprogram/app.wxss`:

```css
@import './styles/common.wxss';

page {
  background-color: #FBF8F0;
  font-family: -apple-system, "PingFang SC", "Helvetica Neue", sans-serif;
  font-size: 28rpx;
  color: #5D4E37;
}
```

- [ ] **Step 3: 更新 app.json — 窗口 + TabBar 配色 + 更多页路由**

修改 `miniprogram/app.json`，改动三处:

(1) `window` 对象替换:
```json
"window": {
  "navigationBarTitleText": "洛手攻略大全",
  "navigationBarBackgroundColor": "#FBF8F0",
  "navigationBarTextStyle": "black",
  "backgroundColor": "#FBF8F0"
}
```

(2) `tabBar` 对象替换 — 蛋参数查询移除，新增更多:
```json
"tabBar": {
  "color": "#B8A890",
  "selectedColor": "#C9A96E",
  "backgroundColor": "#FFFFFF",
  "borderStyle": "white",
  "list": [
    {
      "pagePath": "pages/index/index",
      "text": "首页"
    },
    {
      "pagePath": "pages/pokedex/pokedex",
      "text": "图鉴"
    },
    {
      "pagePath": "pages/more/more",
      "text": "更多"
    }
  ]
}
```

(3) `pages` 数组追加 `"pages/more/more"`:
```json
"pages": [
  "pages/index/index",
  "pages/egg-query/egg-query",
  "pages/pokedex/pokedex",
  "pages/sprite-detail/sprite-detail",
  "pages/more/more"
]
```

- [ ] **Step 4: 验证**

在微信开发者工具中打开项目，确认:
- 页面背景变为暖米白色 `#FBF8F0`
- 导航栏文字变黑色，背景同页面色
- TabBar 显示 3 项: 首页/图鉴/更多，选中态金色

- [ ] **Step 5: Commit**

```bash
git add miniprogram/styles/common.wxss miniprogram/app.wxss miniprogram/app.json
git commit -m "feat: 全局配色切换为暖色羊皮纸，TabBar 改为 3 Tab (首页/图鉴/更多)"
```

---

### Task 2: 首页重设计

**Files:**
- Modify: `miniprogram/pages/index/index.wxml`
- Modify: `miniprogram/pages/index/index.wxss`
- Modify: `miniprogram/pages/index/index.js` (更新导航方法)

- [ ] **Step 1: 重写 index.wxml — 品牌头图 + 入口卡片 + 历史**

```xml
<view class="page-container">
  <!-- 品牌头图 -->
  <view class="brand-header">
    <text class="brand-header__label">POKEDEX</text>
    <text class="brand-header__title">洛手攻略大全</text>
    <view class="brand-header__divider"></view>
  </view>

  <!-- 入口卡片 -->
  <view class="entry-list">
    <view class="entry-card" bindtap="goPokedex">
      <view class="entry-card__icon entry-card__icon--pokedex">📖</view>
      <view class="entry-card__content">
        <text class="entry-card__title">精灵图鉴</text>
        <text class="entry-card__desc">浏览347只图鉴精灵与进化链</text>
      </view>
      <text class="entry-card__arrow">→</text>
    </view>

    <view class="entry-card" bindtap="goEggQuery">
      <view class="entry-card__icon entry-card__icon--egg">🥚</view>
      <view class="entry-card__content">
        <text class="entry-card__title">蛋参数查询</text>
        <text class="entry-card__desc">输入蛋的长和重判断精灵</text>
      </view>
      <text class="entry-card__arrow">→</text>
    </view>
  </view>

  <!-- 最近查询 -->
  <view class="history-section" wx:if="{{history.length > 0}}">
    <view class="history-section__header">
      <text class="history-section__title">最近查询</text>
      <text class="history-section__clear" bindtap="clearHistory">清空</text>
    </view>

    <view
      wx:for="{{history}}"
      wx:key="index"
      class="history-item"
      data-item="{{item}}"
      bindtap="onHistoryTap"
    >
      <block wx:if="{{item.type === 'egg'}}">
        <view class="history-item__badge">蛋</view>
        <text class="history-item__text">长{{item.size}} / 重{{item.weight}}</text>
      </block>
    </view>
  </view>

  <empty-state wx:if="{{history.length === 0}}" icon="box" text="还没有查询记录" subtext="选择一个功能开始使用" />
</view>
```

- [ ] **Step 2: 重写 index.wxss — 杂志风格样式**

```css
/* 品牌头图 */
.brand-header {
  text-align: center;
  padding: 40rpx 0 32rpx;
}
.brand-header__label {
  font-size: 20rpx;
  letter-spacing: 6rpx;
  color: var(--color-gold);
  display: block;
  margin-bottom: 8rpx;
}
.brand-header__title {
  font-size: 44rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
}
.brand-header__divider {
  width: 40rpx;
  height: 2rpx;
  background: var(--color-gold);
  margin: 16rpx auto 0;
}

/* 入口卡片 */
.entry-list {
  margin-bottom: 32rpx;
}
.entry-card {
  display: flex;
  align-items: center;
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 28rpx 24rpx;
  margin-bottom: 16rpx;
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
}
.entry-card:active {
  background: #FBF8F0;
}
.entry-card__icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  flex-shrink: 0;
  font-size: 36rpx;
}
.entry-card__icon--pokedex {
  background: #F5EDDC;
}
.entry-card__icon--egg {
  background: #FDF3E0;
}
.entry-card__content {
  flex: 1;
  min-width: 0;
}
.entry-card__title {
  font-size: 30rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
  margin-bottom: 4rpx;
}
.entry-card__desc {
  font-size: 24rpx;
  color: var(--color-text-light);
}
.entry-card__arrow {
  font-size: 28rpx;
  color: var(--color-gold);
  flex-shrink: 0;
  margin-left: 12rpx;
}

/* 历史记录 */
.history-section {
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 24rpx;
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
}
.history-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}
.history-section__title {
  font-size: 28rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
}
.history-section__clear {
  font-size: 24rpx;
  color: var(--color-text-light);
}
.history-item {
  display: flex;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid var(--color-border-light);
}
.history-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.history-item__badge {
  width: 56rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
  background: #FDF3E0;
  color: var(--color-gold);
  font-size: 20rpx;
  border-radius: 6rpx;
  margin-right: 16rpx;
  flex-shrink: 0;
}
.history-item__text {
  font-size: 26rpx;
  color: var(--color-text-secondary);
}
```

- [ ] **Step 3: 更新 index.js — 导航改为 navigateTo**

替换 `goEggQuery` 方法（蛋参数查询不再是 switchTab）:

```javascript
goEggQuery() {
  wx.navigateTo({ url: '/pages/egg-query/egg-query' });
},
```

- [ ] **Step 4: 验证**

在微信开发者工具中查看首页:
- 品牌头图显示 POKEDEX + 洛手攻略大全 + 金色分割线
- 两个卡片样式正确，点击跳转正常
- 历史记录区块正确

- [ ] **Step 5: Commit**

```bash
git add miniprogram/pages/index/index.wxml miniprogram/pages/index/index.wxss miniprogram/pages/index/index.js
git commit -m "feat: 首页重设计 — 杂志风品牌头图 + 入口卡片 + 暖色历史记录"
```

---

### Task 3: 图鉴页重设计（列表 → 双列网格）

**Files:**
- Modify: `miniprogram/pages/pokedex/pokedex.wxml`
- Modify: `miniprogram/pages/pokedex/pokedex.wxss`

- [ ] **Step 1: 重写 pokedex.wxml — 双列网格布局**

```xml
<view class="page-container">
  <!-- 搜索栏 -->
  <view class="search-bar">
    <input
      class="search-input"
      placeholder="搜索序号或名称"
      value="{{searchKeyword}}"
      bindinput="onSearchInput"
      confirm-type="search"
    />
  </view>

  <!-- 属性筛选 -->
  <scroll-view class="filter-bar" scroll-x enhanced show-scrollbar="{{false}}">
    <view class="filter-bar__inner">
      <view
        class="filter-chip {{elementFilter === -1 ? 'filter-chip--active' : ''}}"
        bindtap="filterByElement"
        data-index="-1"
      >全部</view>
      <view
        wx:for="{{elements}}"
        wx:for-item="name"
        wx:for-index="idx"
        wx:key="idx"
        class="filter-chip {{elementFilter === idx ? 'filter-chip--active' : ''}}"
        bindtap="filterByElement"
        data-index="{{idx}}"
      >{{name}}</view>
    </view>
  </scroll-view>

  <!-- 区域切换 -->
  <view class="region-tabs">
    <view
      wx:for="{{regionTabs}}"
      wx:key="key"
      class="region-tab {{currentRegion === item.key ? 'region-tab--active' : ''}}"
      bindtap="switchRegion"
      data-key="{{item.key}}"
    >{{item.label}}</view>
  </view>

  <!-- 计数 -->
  <view class="pokedex-count">
    <text>共 {{filteredCount}} / {{totalCount}} 只精灵</text>
  </view>

  <!-- 双列网格 -->
  <view class="sprite-grid" wx:if="{{filteredSprites.length > 0}}">
    <view
      wx:for="{{filteredSprites}}"
      wx:key="id"
      class="sprite-grid__card"
      bindtap="onSpriteTap"
      data-id="{{item.id}}"
    >
      <view class="sprite-grid__avatar sprite-grid__avatar--{{item.elementClass}}">
        <image
          wx:if="{{item.id}}"
          class="sprite-grid__img"
          src="/images/sprites/{{item.id}}.png"
          mode="aspectFit"
        />
        <text wx:else class="sprite-grid__fallback">{{item.name[0]}}</text>
      </view>
      <text class="sprite-grid__name">{{item.name}}</text>
      <text class="sprite-grid__meta">#{{item.pokedexNum}} {{item.elementName}}系</text>
      <view class="sprite-grid__shiny" wx:if="{{item.hasShiny}}">异色</view>
    </view>
  </view>

  <empty-state
    wx:else
    icon="search"
    text="没有找到匹配的精灵"
    subtext="试试切换区域或属性筛选"
  />
</view>
```

- [ ] **Step 2: 重写 pokedex.wxss — 网格卡片 + 新筛选条**

```css
/* 搜索 */
.search-bar {
  margin-bottom: 16rpx;
}
.search-input {
  width: 100%;
  height: 72rpx;
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 0 24rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  border: 1rpx solid var(--color-border);
  color: var(--color-text);
}

/* 属性筛选 */
.filter-bar {
  margin-bottom: 16rpx;
  white-space: nowrap;
}
.filter-bar__inner {
  display: flex;
  padding: 4rpx 0;
  gap: 12rpx;
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 10rpx 24rpx;
  border-radius: 32rpx;
  font-size: 24rpx;
  color: var(--color-text-secondary);
  background: var(--color-card);
  border: 1rpx solid var(--color-border);
  flex-shrink: 0;
}
.filter-chip--active {
  color: #fff;
  border-color: var(--color-gold);
  background: var(--color-gold);
}

/* 区域切换 */
.region-tabs {
  display: flex;
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 6rpx;
  margin-bottom: 16rpx;
  border: 1rpx solid var(--color-border);
}
.region-tab {
  flex: 1;
  text-align: center;
  padding: 14rpx 0;
  font-size: 26rpx;
  color: var(--color-text-secondary);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}
.region-tab--active {
  background: var(--color-gold);
  color: #fff;
  font-weight: bold;
}

/* 计数 */
.pokedex-count {
  text-align: center;
  padding: 8rpx 0 16rpx;
  font-size: 24rpx;
  color: var(--color-text-lighter);
}

/* 双列网格 */
.sprite-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}
.sprite-grid__card {
  width: calc(50% - 6rpx);
  background: var(--color-card);
  border-radius: var(--radius-sm);
  padding: 20rpx 16rpx 16rpx;
  text-align: center;
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
  box-sizing: border-box;
  position: relative;
}
.sprite-grid__card:active {
  background: #FBF8F0;
}
.sprite-grid__avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  margin: 0 auto 12rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sprite-grid__img {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
.sprite-grid__fallback {
  font-size: 36rpx;
  color: #fff;
  font-weight: bold;
}
/* 18元素头像底色 — 复用 sprite-card 的元素色 */
.sprite-grid__avatar--normal   { background: var(--color-normal); }
.sprite-grid__avatar--grass    { background: var(--color-grass); }
.sprite-grid__avatar--fire     { background: var(--color-fire); }
.sprite-grid__avatar--water    { background: var(--color-water); }
.sprite-grid__avatar--light    { background: var(--color-light); }
.sprite-grid__avatar--light .sprite-grid__fallback { color: #333; }
.sprite-grid__avatar--earth    { background: var(--color-earth); }
.sprite-grid__avatar--ice      { background: var(--color-ice); }
.sprite-grid__avatar--dragon   { background: var(--color-dragon); }
.sprite-grid__avatar--electric { background: var(--color-electric); }
.sprite-grid__avatar--electric .sprite-grid__fallback { color: #333; }
.sprite-grid__avatar--poison   { background: var(--color-poison); }
.sprite-grid__avatar--bug      { background: var(--color-bug); }
.sprite-grid__avatar--bug .sprite-grid__fallback { color: #333; }
.sprite-grid__avatar--fighting { background: var(--color-fighting); }
.sprite-grid__avatar--flying   { background: var(--color-flying); }
.sprite-grid__avatar--flying .sprite-grid__fallback { color: #333; }
.sprite-grid__avatar--fairy    { background: var(--color-fairy); }
.sprite-grid__avatar--ghost    { background: var(--color-ghost); }
.sprite-grid__avatar--dark     { background: var(--color-dark); }
.sprite-grid__avatar--machine  { background: var(--color-machine); }
.sprite-grid__avatar--magic    { background: var(--color-magic); }

.sprite-grid__name {
  font-size: 26rpx;
  font-weight: bold;
  color: var(--color-text);
  display: block;
  margin-bottom: 4rpx;
}
.sprite-grid__meta {
  font-size: 20rpx;
  color: var(--color-text-light);
  display: block;
}
.sprite-grid__shiny {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  background: var(--color-warm);
  color: #fff;
  font-size: 18rpx;
  padding: 2rpx 10rpx;
  border-radius: 12rpx;
}
```

- [ ] **Step 3: 验证**

在微信开发者工具中查看图鉴页:
- 精灵以双列网格展示
- 属性筛选胶囊和区域切换正常工作
- 搜索过滤正常
- 点击跳转精灵详情正常

- [ ] **Step 4: Commit**

```bash
git add miniprogram/pages/pokedex/pokedex.wxml miniprogram/pages/pokedex/pokedex.wxss
git commit -m "feat: 图鉴页重设计 — 列表型改为双列网格，暖色筛选条"
```

---

### Task 4: 精灵详情页重配色

**Files:**
- Modify: `miniprogram/pages/sprite-detail/sprite-detail.wxml`
- Modify: `miniprogram/pages/sprite-detail/sprite-detail.wxss`

- [ ] **Step 1: 微调 sprite-detail.wxml — Serif 标题 + 杂志式头图布局**

在头部区域加 magazine 风格标记和金色编号。替换第 3-25 行头部区块:

```xml
<view class="page-container" wx:if="{{sprite}}">
  <!-- 精灵头部 -->
  <view class="card sprite-header">
    <view class="sprite-header__top">
      <view class="sprite-header__img-wrap sprite-header__img-wrap--{{sprite.elementClass}}">
        <image
          wx:if="{{hasImg}}"
          class="sprite-header__img"
          src="/images/sprites/{{sprite.id}}.png"
          mode="aspectFit"
        />
        <text wx:else class="sprite-header__img-fallback">{{sprite.name[0]}}</text>
      </view>
      <view class="sprite-header__info">
        <text class="sprite-header__num">NO. {{sprite.pokedexNum || '???'}}</text>
        <text class="sprite-header__name">{{sprite.name}}</text>
        <view class="sprite-header__divider"></view>
        <view class="sprite-header__tags">
          <text class="tag tag-{{sprite.elementClass}}">{{sprite.elementName}}</text>
          <text class="sprite-header__rarity">{{sprite.rarityStars}}</text>
          <text class="sprite-header__rarity-label">（{{sprite.rarityName}}）</text>
        </view>
        <text class="sprite-header__desc" wx:if="{{sprite.description}}">{{sprite.description}}</text>
      </view>
    </view>
  </view>
  <!-- 后续: 进化链、异色、孵蛋信息 保持不变 -->
```

- [ ] **Step 2: 重写 sprite-detail.wxss — 全量替换为杂志风格**

```css
.sprite-header__top {
  display: flex;
  align-items: flex-start;
}
.sprite-header__img-wrap {
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  margin-right: 28rpx;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid var(--color-border);
}
.sprite-header__img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.sprite-header__img-fallback {
  font-size: 52rpx;
  color: #fff;
  font-weight: bold;
}

/* 18元素底色复用 */
.sprite-header__img-wrap--normal   { background: var(--color-normal); }
.sprite-header__img-wrap--grass    { background: var(--color-grass); }
.sprite-header__img-wrap--fire     { background: var(--color-fire); }
.sprite-header__img-wrap--water    { background: var(--color-water); }
.sprite-header__img-wrap--light    { background: var(--color-light); }
.sprite-header__img-wrap--light .sprite-header__img-fallback    { color: #333; }
.sprite-header__img-wrap--earth    { background: var(--color-earth); }
.sprite-header__img-wrap--ice      { background: var(--color-ice); }
.sprite-header__img-wrap--dragon   { background: var(--color-dragon); }
.sprite-header__img-wrap--electric { background: var(--color-electric); }
.sprite-header__img-wrap--electric .sprite-header__img-fallback { color: #333; }
.sprite-header__img-wrap--poison   { background: var(--color-poison); }
.sprite-header__img-wrap--bug      { background: var(--color-bug); }
.sprite-header__img-wrap--bug .sprite-header__img-fallback      { color: #333; }
.sprite-header__img-wrap--fighting { background: var(--color-fighting); }
.sprite-header__img-wrap--flying   { background: var(--color-flying); }
.sprite-header__img-wrap--flying .sprite-header__img-fallback   { color: #333; }
.sprite-header__img-wrap--fairy    { background: var(--color-fairy); }
.sprite-header__img-wrap--ghost    { background: var(--color-ghost); }
.sprite-header__img-wrap--dark     { background: var(--color-dark); }
.sprite-header__img-wrap--machine  { background: var(--color-machine); }
.sprite-header__img-wrap--magic    { background: var(--color-magic); }

.sprite-header__info {
  flex: 1;
  min-width: 0;
}
.sprite-header__num {
  font-size: 22rpx;
  letter-spacing: 3rpx;
  color: var(--color-gold);
  display: block;
  margin-bottom: 4rpx;
}
.sprite-header__name {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
}
.sprite-header__divider {
  width: 32rpx;
  height: 2rpx;
  background: var(--color-gold);
  margin: 12rpx 0;
}
.sprite-header__tags {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-bottom: 10rpx;
}
.sprite-header__rarity {
  color: var(--color-warm);
  font-size: 22rpx;
}
.sprite-header__rarity-label {
  font-size: 22rpx;
  color: var(--color-text-light);
}
.sprite-header__desc {
  font-size: 26rpx;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* 孵蛋组合链接 */
.detail-breeding__item {
  padding: 16rpx 0;
  border-bottom: 1rpx solid var(--color-border-light);
}
.detail-breeding__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.detail-breeding__link {
  color: var(--color-gold);
  font-weight: 500;
}
.detail-breeding__name {
  color: var(--color-text);
}
.detail-breeding__plus {
  margin: 0 8rpx;
  color: var(--color-text-light);
  font-size: 24rpx;
}

/* 异色对比 */
.shiny-compare {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 16rpx;
}
.shiny-compare__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.shiny-compare__label {
  font-size: 24rpx;
  color: var(--color-text-secondary);
  margin-bottom: 12rpx;
}
.shiny-compare__label--shiny {
  color: var(--color-warm);
  font-weight: bold;
}
.shiny-compare__img-wrap {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rpx;
}
.shiny-compare__img-wrap--shiny {
  background: linear-gradient(135deg, #FFD700, #FFA000);
}
.shiny-compare__img {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.shiny-compare__fallback {
  font-size: 48rpx;
  color: #fff;
  font-weight: bold;
}
.shiny-compare__vs {
  flex-shrink: 0;
  padding: 0 16rpx;
  font-size: 28rpx;
  font-weight: bold;
  color: var(--color-text-light);
}
.shiny-compare__name {
  color: var(--color-text);
  text-align: center;
  font-size: 24rpx;
}
```

- [ ] **Step 3: 验证**

在微信开发者工具中从图鉴点击精灵进入详情:
- 头部显示金色编号 + Serif 名称 + 金色分割线
- 属性标签、稀有度正确
- 进化链和孵蛋信息区块配色正确

- [ ] **Step 4: Commit**

```bash
git add miniprogram/pages/sprite-detail/sprite-detail.wxml miniprogram/pages/sprite-detail/sprite-detail.wxss
git commit -m "feat: 精灵详情页重配色 — 杂志式头图 + 金色编号/分割线 + Serif 标题"
```

---

### Task 5: 蛋参数查询页重配色

**Files:**
- Modify: `miniprogram/pages/egg-query/egg-query.wxss`
- Modify: `miniprogram/pages/egg-query/egg-query.json` (如引用 egg-result 组件路径变更则改)

- [ ] **Step 1: 重写 egg-query.wxss — 暖色输入卡片**

```css
.egg-inputs {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}
.egg-input__group {
  display: flex;
  flex-direction: column;
}
.egg-input__label {
  font-size: 26rpx;
  color: var(--color-text-secondary);
  margin-bottom: 8rpx;
}
.egg-input__wrap {
  display: flex;
  align-items: center;
  background: var(--color-bg);
  border-radius: var(--radius-sm);
  border: 1rpx solid var(--color-border);
  overflow: hidden;
}
.egg-input__field {
  flex: 1;
  padding: 20rpx 24rpx;
  font-size: 32rpx;
  color: var(--color-text);
}
```

WXML 不变，仅配色变化。

- [ ] **Step 2: 验证**

确认蛋参数查询页输入区风格与其他页面一致（白色卡片 + 暖色边框 + 金色按钮）。

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/egg-query/egg-query.wxss
git commit -m "feat: 蛋参数查询页重配色 — 暖色输入卡片 + 金色按钮"
```

---

### Task 6: 新建更多页

**Files:**
- Create: `miniprogram/pages/more/more.js`
- Create: `miniprogram/pages/more/more.wxml`
- Create: `miniprogram/pages/more/more.wxss`
- Create: `miniprogram/pages/more/more.json`

- [ ] **Step 1: 创建 more.js**

```javascript
Page({
  data: {},

  goEggQuery() {
    wx.navigateTo({ url: '/pages/egg-query/egg-query' });
  }
});
```

- [ ] **Step 2: 创建 more.json**

```json
{
  "navigationBarTitleText": "更多",
  "usingComponents": {
    "empty-state": "/components/empty-state/empty-state"
  }
}
```

- [ ] **Step 3: 创建 more.wxml**

```xml
<view class="page-container">
  <view class="brand-header">
    <text class="brand-header__label">MORE</text>
    <text class="brand-header__title">更多功能</text>
    <view class="brand-header__divider"></view>
  </view>

  <view class="entry-list">
    <view class="entry-card" bindtap="goEggQuery">
      <view class="entry-card__icon entry-card__icon--egg">🥚</view>
      <view class="entry-card__content">
        <text class="entry-card__title">蛋参数查询</text>
        <text class="entry-card__desc">输入蛋的长和重判断精灵</text>
      </view>
      <text class="entry-card__arrow">→</text>
    </view>
  </view>

  <view class="about-card">
    <text class="about-card__title">关于</text>
    <text class="about-card__text">洛手攻略大全 v1.0</text>
    <text class="about-card__text">基于洛克王国世界手游数据整理</text>
    <text class="about-card__text">精灵图鉴与孵蛋查询工具</text>
  </view>
</view>
```

- [ ] **Step 4: 创建 more.wxss**

```css
.brand-header {
  text-align: center;
  padding: 40rpx 0 32rpx;
}
.brand-header__label {
  font-size: 20rpx;
  letter-spacing: 6rpx;
  color: var(--color-gold);
  display: block;
  margin-bottom: 8rpx;
}
.brand-header__title {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
}
.brand-header__divider {
  width: 40rpx;
  height: 2rpx;
  background: var(--color-gold);
  margin: 16rpx auto 0;
}

.entry-list {
  margin-bottom: 32rpx;
}
.entry-card {
  display: flex;
  align-items: center;
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 28rpx 24rpx;
  margin-bottom: 16rpx;
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
}
.entry-card:active {
  background: #FBF8F0;
}
.entry-card__icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  flex-shrink: 0;
  font-size: 36rpx;
}
.entry-card__icon--egg {
  background: #FDF3E0;
}
.entry-card__content {
  flex: 1;
  min-width: 0;
}
.entry-card__title {
  font-size: 30rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
  margin-bottom: 4rpx;
}
.entry-card__desc {
  font-size: 24rpx;
  color: var(--color-text-light);
}
.entry-card__arrow {
  font-size: 28rpx;
  color: var(--color-gold);
  flex-shrink: 0;
  margin-left: 12rpx;
}

.about-card {
  background: var(--color-card);
  border-radius: var(--radius-md);
  padding: 24rpx;
  border: 1rpx solid var(--color-border);
  text-align: center;
}
.about-card__title {
  font-size: 28rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
  margin-bottom: 12rpx;
}
.about-card__text {
  font-size: 24rpx;
  color: var(--color-text-light);
  display: block;
  line-height: 1.8;
}
```

- [ ] **Step 5: 验证**

在微信开发者工具中切换 Tab 到"更多":
- 显示蛋参数查询入口卡片（可点击跳转）
- 底部关于信息区块
- 整体风格与首页一致

- [ ] **Step 6: Commit**

```bash
git add miniprogram/pages/more/
git commit -m "feat: 新建更多页 — 功能入口 + 关于信息，与首页保持一致风格"
```

---

### Task 7: 组件重设计 — sprite-card

**Files:**
- Modify: `miniprogram/components/sprite-card/sprite-card.wxml`
- Modify: `miniprogram/components/sprite-card/sprite-card.wxss`

- [ ] **Step 1: 微调 sprite-card.wxml — 杂志风布局**

```xml
<view class="sprite-card {{size === 'small' ? 'sprite-card--small' : ''}}" bindtap="onTap" wx:if="{{sprite}}">
  <view class="sprite-card__avatar sprite-card__avatar--{{sprite.elementClass}}">
    <image
      wx:if="{{hasImg}}"
      class="sprite-card__img"
      src="/images/sprites/{{spriteId}}.png"
      mode="aspectFit"
    />
    <text wx:else class="sprite-card__fallback-text">{{sprite.name[0]}}</text>
  </view>
  <view class="sprite-card__info">
    <text class="sprite-card__name">{{sprite.name}}</text>
    <view class="sprite-card__tags">
      <text class="tag tag-{{sprite.elementClass}}">{{sprite.elementName}}</text>
      <text class="sprite-card__rarity" wx:if="{{showRarity && sprite.rarityStars}}">{{sprite.rarityStars}}</text>
    </view>
  </view>
  <view class="sprite-card__arrow" wx:if="{{tappable}}">
    <text>→</text>
  </view>
</view>
<view class="sprite-card sprite-card--empty" wx:else>
  <view class="sprite-card__avatar sprite-card__avatar--empty">
    <text>?</text>
  </view>
  <view class="sprite-card__info">
    <text class="text-light">选择精灵</text>
  </view>
</view>
```

- [ ] **Step 2: 重写 sprite-card.wxss — 暖色卡片 + 金色边框**

```css
.sprite-card {
  display: flex;
  align-items: center;
  background: var(--color-card);
  border-radius: var(--radius-sm);
  padding: 20rpx 24rpx;
  border: 1rpx solid var(--color-border-light);
  box-shadow: var(--shadow-card);
}
.sprite-card--small {
  padding: 12rpx 16rpx;
}
.sprite-card--empty {
  opacity: 0.5;
}
.sprite-card__avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20rpx;
  flex-shrink: 0;
  border: 2rpx solid var(--color-border);
}
.sprite-card--small .sprite-card__avatar {
  width: 56rpx;
  height: 56rpx;
  margin-right: 12rpx;
}
.sprite-card__avatar--empty {
  background: var(--color-bg);
  border-color: var(--color-border);
}
.sprite-card__img {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}
.sprite-card--small .sprite-card__img {
  width: 40rpx;
  height: 40rpx;
}
.sprite-card__fallback-text {
  font-size: 28rpx;
  color: #fff;
  font-weight: 600;
}
.sprite-card--small .sprite-card__fallback-text {
  font-size: 20rpx;
}

/* 18元素头像底色保留 */
.sprite-card__avatar--normal   { background: var(--color-normal); border-color: var(--color-normal); }
.sprite-card__avatar--grass    { background: var(--color-grass); border-color: var(--color-grass); }
.sprite-card__avatar--fire     { background: var(--color-fire); border-color: var(--color-fire); }
.sprite-card__avatar--water    { background: var(--color-water); border-color: var(--color-water); }
.sprite-card__avatar--light    { background: var(--color-light); border-color: var(--color-light); }
.sprite-card__avatar--light .sprite-card__fallback-text    { color: #333; }
.sprite-card__avatar--earth    { background: var(--color-earth); border-color: var(--color-earth); }
.sprite-card__avatar--ice      { background: var(--color-ice); border-color: var(--color-ice); }
.sprite-card__avatar--dragon   { background: var(--color-dragon); border-color: var(--color-dragon); }
.sprite-card__avatar--electric { background: var(--color-electric); border-color: var(--color-electric); }
.sprite-card__avatar--electric .sprite-card__fallback-text { color: #333; }
.sprite-card__avatar--poison   { background: var(--color-poison); border-color: var(--color-poison); }
.sprite-card__avatar--bug      { background: var(--color-bug); border-color: var(--color-bug); }
.sprite-card__avatar--bug .sprite-card__fallback-text      { color: #333; }
.sprite-card__avatar--fighting { background: var(--color-fighting); border-color: var(--color-fighting); }
.sprite-card__avatar--flying   { background: var(--color-flying); border-color: var(--color-flying); }
.sprite-card__avatar--flying .sprite-card__fallback-text   { color: #333; }
.sprite-card__avatar--fairy    { background: var(--color-fairy); border-color: var(--color-fairy); }
.sprite-card__avatar--ghost    { background: var(--color-ghost); border-color: var(--color-ghost); }
.sprite-card__avatar--dark     { background: var(--color-dark); border-color: var(--color-dark); }
.sprite-card__avatar--machine  { background: var(--color-machine); border-color: var(--color-machine); }
.sprite-card__avatar--magic    { background: var(--color-magic); border-color: var(--color-magic); }

.sprite-card__info {
  flex: 1;
  min-width: 0;
}
.sprite-card__name {
  font-size: 28rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  display: block;
  margin-bottom: 6rpx;
}
.sprite-card--small .sprite-card__name {
  font-size: 24rpx;
}
.sprite-card__tags {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.sprite-card__rarity {
  font-size: 18rpx;
  color: var(--color-warm);
}
.sprite-card__arrow {
  margin-left: 12rpx;
  font-size: 32rpx;
  color: var(--color-gold);
  flex-shrink: 0;
}
```

- [ ] **Step 3: 验证**

检查精灵卡片在以下位置显示正确:
- 蛋参数查询结果中的 sprite-card
- 首页历史中的 sprite-card（如有）
- 所有场景下头像、名字、标签样式一致

- [ ] **Step 4: Commit**

```bash
git add miniprogram/components/sprite-card/
git commit -m "feat: sprite-card 组件重设计 — 杂志风圆形头像 + Georgia 字体 + 金色箭头"
```

---

### Task 8: 组件重设计 — evolution-chain（竖向布局）

**Files:**
- Modify: `miniprogram/components/evolution-chain/evolution-chain.wxml`
- Modify: `miniprogram/components/evolution-chain/evolution-chain.wxss`

- [ ] **Step 1: 重写 evolution-chain.wxml — 竖向排列 + 金色连接线**

```xml
<view class="evo-chain" wx:if="{{hasChain}}">
  <text class="evo-chain__title">进化链</text>
  <view class="evo-chain__body">
    <block wx:for="{{nodes}}" wx:key="index">
      <!-- 精灵节点 -->
      <view
        wx:if="{{item.type === 'node'}}"
        class="evo-node {{item.data.isCurrent ? 'evo-node--current' : ''}}"
        bindtap="onNodeTap"
        data-id="{{item.data.id}}"
      >
        <view class="evo-node__avatar evo-node__avatar--{{item.data.elementClass}}">
          <text class="evo-node__fallback">{{item.data.name[0]}}</text>
        </view>
        <view class="evo-node__info">
          <text class="evo-node__name">{{item.data.name}}</text>
          <text class="evo-node__tag evo-node__tag--{{item.data.elementClass}}">{{item.data.elementName}}</text>
        </view>
        <view wx:if="{{item.data.isCurrent}}" class="evo-node__badge">当前</view>
      </view>

      <!-- 进化连接 -->
      <view wx:if="{{item.type === 'connector'}}" class="evo-connector">
        <view class="evo-connector__line"></view>
        <text class="evo-connector__arrow">▼</text>
        <view wx:if="{{item.condition}}" class="evo-connector__cond">
          <text class="evo-connector__cond-text">{{item.condition.detail}}</text>
        </view>
        <text class="evo-connector__arrow">▼</text>
        <view class="evo-connector__line"></view>
      </view>
    </block>
  </view>
</view>
<view wx:else class="evo-chain--empty">
  <text class="text-light">暂无进化链数据</text>
</view>
```

- [ ] **Step 2: 重写 evolution-chain.wxss — 暖色节点 + 金色当前态**

```css
.evo-chain {
  padding: 8rpx 0;
}
.evo-chain__title {
  font-size: 30rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
  margin-bottom: 24rpx;
}
.evo-chain__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 精灵节点 */
.evo-node {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20rpx 24rpx;
  background: var(--color-card);
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  gap: 20rpx;
  position: relative;
  box-sizing: border-box;
}
.evo-node:active {
  background: #FBF8F0;
}
.evo-node--current {
  border-color: var(--color-gold);
  background: #FBF6ED;
  box-shadow: 0 0 0 6rpx rgba(201,169,110,0.12);
}
.evo-node__avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.evo-node__avatar--normal { background: var(--color-normal); }
.evo-node__avatar--grass { background: var(--color-grass); }
.evo-node__avatar--fire { background: var(--color-fire); }
.evo-node__avatar--water { background: var(--color-water); }
.evo-node__avatar--light { background: var(--color-light); }
.evo-node__avatar--earth { background: var(--color-earth); }
.evo-node__avatar--ice { background: var(--color-ice); }
.evo-node__avatar--dragon { background: var(--color-dragon); }
.evo-node__avatar--electric { background: var(--color-electric); }
.evo-node__avatar--poison { background: var(--color-poison); }
.evo-node__avatar--bug { background: var(--color-bug); }
.evo-node__avatar--fighting { background: var(--color-fighting); }
.evo-node__avatar--flying { background: var(--color-flying); }
.evo-node__avatar--fairy { background: var(--color-fairy); }
.evo-node__avatar--ghost { background: var(--color-ghost); }
.evo-node__avatar--dark { background: var(--color-dark); }
.evo-node__avatar--machine { background: var(--color-machine); }
.evo-node__avatar--magic { background: var(--color-magic); }
.evo-node__fallback {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
}
.evo-node__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6rpx;
}
.evo-node__name {
  font-size: 28rpx;
  font-weight: bold;
  color: var(--color-text);
  font-family: var(--font-serif);
}
.evo-node__tag {
  display: inline-block;
  padding: 2rpx 16rpx;
  border-radius: 8rpx;
  font-size: 22rpx;
  color: #fff;
  align-self: flex-start;
}
/* 18元素标签色保留 */
.evo-node__tag--normal { background: var(--color-normal); }
.evo-node__tag--grass { background: var(--color-grass); }
.evo-node__tag--fire { background: var(--color-fire); }
.evo-node__tag--water { background: var(--color-water); }
.evo-node__tag--light { background: var(--color-light); color: #333; }
.evo-node__tag--earth { background: var(--color-earth); }
.evo-node__tag--ice { background: var(--color-ice); }
.evo-node__tag--dragon { background: var(--color-dragon); }
.evo-node__tag--electric { background: var(--color-electric); }
.evo-node__tag--poison { background: var(--color-poison); }
.evo-node__tag--bug { background: var(--color-bug); }
.evo-node__tag--fighting { background: var(--color-fighting); }
.evo-node__tag--flying { background: var(--color-flying); color: #333; }
.evo-node__tag--fairy { background: var(--color-fairy); }
.evo-node__tag--ghost { background: var(--color-ghost); }
.evo-node__tag--dark { background: var(--color-dark); }
.evo-node__tag--machine { background: var(--color-machine); }
.evo-node__tag--magic { background: var(--color-magic); }
.evo-node__badge {
  position: absolute;
  top: -14rpx;
  right: 20rpx;
  background: var(--color-gold);
  color: #fff;
  font-size: 20rpx;
  font-weight: 600;
  padding: 4rpx 16rpx;
  border-radius: 16rpx;
}

/* 进化连接器 */
.evo-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rpx 0;
  width: 100%;
}
.evo-connector__line {
  width: 2rpx;
  height: 16rpx;
  background: var(--color-border);
}
.evo-connector__arrow {
  font-size: 18rpx;
  color: var(--color-gold);
  line-height: 1;
}
.evo-connector__cond {
  display: flex;
  align-items: center;
  gap: 12rpx;
  background: #FBF6ED;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 12rpx 20rpx;
  margin: 6rpx 0;
  max-width: 100%;
  box-sizing: border-box;
}
.evo-connector__cond-text {
  font-size: 24rpx;
  color: var(--color-text-secondary);
  font-weight: 500;
  line-height: 1.5;
}

.evo-chain--empty {
  padding: 32rpx;
  text-align: center;
}
```

- [ ] **Step 3: 验证**

在精灵详情页查看进化链:
- 竖向排列，金色箭头
- 当前阶段有金色边框和光晕
- 进化条件背景为暖色

- [ ] **Step 4: Commit**

```bash
git add miniprogram/components/evolution-chain/
git commit -m "feat: evolution-chain 组件重设计 — 竖向布局 + 金色当前态 + 暖色进化条件"
```

---

### Task 9: 组件重设计 — egg-result + empty-state

**Files:**
- Modify: `miniprogram/components/egg-result/egg-result.wxss`
- Modify: `miniprogram/components/empty-state/empty-state.wxss`

- [ ] **Step 1: 重写 egg-result.wxss — 暖色结果卡片**

```css
.egg-result {
  margin-top: 24rpx;
}
.egg-result__summary {
  margin-bottom: 20rpx;
}
.egg-result__summary-text {
  font-size: 26rpx;
  color: var(--color-text-secondary);
}
.egg-result__item {
  position: relative;
  margin-bottom: 16rpx;
  padding: 16rpx;
  background: var(--color-card);
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  box-shadow: var(--shadow-card);
}
.egg-result__badge {
  position: absolute;
  top: -1rpx;
  right: 16rpx;
  background: var(--color-gold);
  color: #fff;
  font-size: 20rpx;
  padding: 2rpx 16rpx;
  border-radius: 0 0 8rpx 8rpx;
}
.egg-result__detail {
  margin-top: 16rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid var(--color-border-light);
}
.egg-result__row {
  display: flex;
  align-items: center;
  margin-bottom: 8rpx;
  font-size: 24rpx;
}
.egg-result__label {
  color: var(--color-text-light);
  width: 120rpx;
}
.egg-result__value {
  color: var(--color-text);
  flex: 1;
}
.egg-result__check {
  color: var(--color-danger);
  font-weight: 600;
  width: 40rpx;
  text-align: right;
}
.egg-result__check--pass {
  color: var(--color-success);
}
```

- [ ] **Step 2: 重写 empty-state.wxss — 暖色空状态**

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 40rpx;
}
.empty-state__icon {
  margin-bottom: 24rpx;
}
.empty-state__emoji {
  font-size: 80rpx;
  opacity: 0.6;
}
.empty-state__text {
  font-size: 28rpx;
  color: var(--color-text-light);
  text-align: center;
}
.empty-state__subtext {
  font-size: 24rpx;
  color: var(--color-text-lighter);
  margin-top: 8rpx;
  text-align: center;
}
```

- [ ] **Step 3: 验证**

确认:
- 蛋参数查询结果显示正常，配色统一
- 空状态在各页面显示正常

- [ ] **Step 4: Commit**

```bash
git add miniprogram/components/egg-result/egg-result.wxss miniprogram/components/empty-state/empty-state.wxss
git commit -m "feat: egg-result + empty-state 组件重配色 — 暖色卡片 + 金色徽章"
```

---

### Task 10: 最终验证 + 收尾

- [ ] **Step 1: 全流程走查**

在微信开发者工具中依次验证:
1. 首页 → 品牌头图、入口卡片、历史记录样式正确
2. 首页 → 点击蛋参数查询 → 跳转到 egg-query（navigateTo）
3. 蛋参数查询 → 输入参数 → 查询结果显示正常
4. 首页 → 点击精灵图鉴 → 切换到图鉴 Tab
5. 图鉴 → 双列网格 + 筛选功能正常
6. 图鉴 → 点击精灵 → 精灵详情页样式正确
7. 精灵详情 → 进化链竖向排列、异色对比、孵蛋信息正确
8. 更多 Tab → 功能入口 + 关于信息正确

- [ ] **Step 2: 修复未对齐问题**

逐页检查 WXSS，修复任何颜色残留（蓝色 `#4A90D9`、`#3A7BC8` 等旧色值不应出现）。

快速检查命令:
```bash
grep -rn "4A90D9\|3A7BC8\|3A7BC8" miniprogram/pages miniprogram/components --include="*.wxss"
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: 最终走查修复 — 清除旧配色残留，统一羊皮纸风格"
```
