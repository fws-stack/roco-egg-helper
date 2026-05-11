<template>
  <div class="page-container">
    <!-- 入口卡片 -->
    <div class="entry-list">
      <div class="entry-card" @click="$router.push('/forward')">
        <div class="entry-card__icon entry-card__icon--forward">
          <span class="entry-card__emoji">🔀</span>
        </div>
        <div class="entry-card__content">
          <span class="entry-card__title">正向查询</span>
          <span class="entry-card__desc">选择两只父精灵查看孵蛋结果</span>
        </div>
        <span class="entry-card__arrow">›</span>
      </div>

      <div class="entry-card" @click="$router.push('/reverse')">
        <div class="entry-card__icon entry-card__icon--reverse">
          <span class="entry-card__emoji">🔍</span>
        </div>
        <div class="entry-card__content">
          <span class="entry-card__title">反向查询</span>
          <span class="entry-card__desc">选择目标精灵反查父母组合</span>
        </div>
        <span class="entry-card__arrow">›</span>
      </div>

      <div class="entry-card" @click="$router.push('/egg-query')">
        <div class="entry-card__icon entry-card__icon--egg">
          <span class="entry-card__emoji">🥚</span>
        </div>
        <div class="entry-card__content">
          <span class="entry-card__title">蛋参数查询</span>
          <span class="entry-card__desc">输入蛋的长和重判断精灵</span>
        </div>
        <span class="entry-card__arrow">›</span>
      </div>

      <div class="entry-card" @click="$router.push('/pokedex')">
        <div class="entry-card__icon entry-card__icon--pokedex">
          <span class="entry-card__emoji">📖</span>
        </div>
        <div class="entry-card__content">
          <span class="entry-card__title">精灵图鉴</span>
          <span class="entry-card__desc">浏览347种图鉴精灵与进化链</span>
        </div>
        <span class="entry-card__arrow">›</span>
      </div>
    </div>

    <!-- 最近查询 -->
    <div v-if="history.length > 0" class="card">
      <div class="section-header">
        <span class="card-title">最近查询</span>
        <span class="text-sm text-light" style="cursor:pointer" @click="clearHistory">清空</span>
      </div>

      <div
        v-for="(item, index) in history"
        :key="index"
        class="history-item"
        @click="onHistoryTap(item)"
      >
        <div v-if="item.type === 'forward'" class="history-item__type">
          <span class="tag tag-normal">正查</span>
        </div>
        <div v-if="item.type === 'forward'" class="history-item__content flex-row">
          <span class="history-item__name">{{ historySprites[item.parentA]?.name || '?' }}</span>
          <span class="history-item__plus">+</span>
          <span class="history-item__name">{{ historySprites[item.parentB]?.name || '?' }}</span>
        </div>

        <div v-if="item.type === 'reverse'" class="history-item__type">
          <span class="tag tag-water">反查</span>
        </div>
        <div v-if="item.type === 'reverse'" class="history-item__content">
          <span class="history-item__name">{{ historySprites[item.childId]?.name || '?' }}</span>
        </div>

        <div v-if="item.type === 'egg'" class="history-item__type">
          <span class="tag tag-warning">蛋</span>
        </div>
        <div v-if="item.type === 'egg'" class="history-item__content">
          <span class="text-sm">长{{ item.size }} / 重{{ item.weight }}</span>
        </div>
      </div>
    </div>

    <EmptyState v-else icon="box" text="还没有查询记录" subtext="选择一个查询功能开始使用" />
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getHistory, clearHistory as clearStorage } from '../utils/storage'
import { getSprite } from '../utils/sprite'
import EmptyState from '../components/EmptyState.vue'

const router = useRouter()
const history = ref([])
const historySprites = ref({})

function loadHistory() {
  history.value = getHistory()
  const map = {}
  history.value.forEach(entry => {
    if (entry.type === 'forward') {
      map[entry.parentA] = getSprite(entry.parentA)
      map[entry.parentB] = getSprite(entry.parentB)
    } else if (entry.type === 'reverse' || entry.type === 'egg') {
      map[entry.childId || entry.spriteId] = getSprite(entry.childId || entry.spriteId)
    }
  })
  historySprites.value = map
}

onMounted(() => {
  loadHistory()
})

function onHistoryTap(item) {
  if (item.type === 'forward') router.push('/forward')
  else if (item.type === 'reverse') router.push('/reverse')
  else if (item.type === 'egg') router.push('/egg-query')
}

function clearHistory() {
  clearStorage()
  history.value = []
  historySprites.value = {}
}
</script>

<style scoped>
.page-container {
  padding: 12px;
  padding-bottom: 20px;
}
.entry-list {
  margin-bottom: 16px;
}
.entry-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 14px 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  cursor: pointer;
}
.entry-card:active {
  background: #f8f8f8;
}
.entry-card__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}
.entry-card__icon--forward { background: #E3F2FD; }
.entry-card__icon--reverse { background: #E8F5E9; }
.entry-card__icon--egg { background: #FFF3E0; }
.entry-card__icon--pokedex { background: #F3E5F5; }
.entry-card__emoji { font-size: 20px; }
.entry-card__content { flex: 1; min-width: 0; }
.entry-card__title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 3px;
}
.entry-card__desc {
  font-size: 12px;
  color: #999;
}
.entry-card__arrow {
  font-size: 18px;
  color: #ccc;
  flex-shrink: 0;
  margin-left: 6px;
}
.card {
  background: #fff;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.history-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
}
.history-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.history-item__type {
  width: 40px;
  flex-shrink: 0;
}
.history-item__content {
  flex: 1;
  min-width: 0;
}
.history-item__name {
  font-size: 13px;
  color: #333;
}
.history-item__plus {
  margin: 0 4px;
  color: #999;
  font-size: 12px;
}
.tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  color: #fff;
  line-height: 1.4;
}
.tag-normal { background: #AAAAAA; }
.tag-water { background: #2196F3; }
.tag-warning { background: #FF9800; }
.text-sm { font-size: 12px; }
.text-light { color: #999; }
.flex-row {
  display: flex;
  align-items: center;
}
</style>
