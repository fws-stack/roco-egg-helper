<template>
  <div class="breeding-result">
    <!-- 正向查询结果 -->
    <template v-if="mode === 'forward'">
      <div v-if="parentAName && parentBName" class="br-summary">
        <span class="br-summary__text">{{ parentAName }} + {{ parentBName }} 的孵蛋结果</span>
      </div>

      <template v-if="results.length > 0">
        <div v-for="item in results" :key="item.childId" class="br-item">
          <SpriteCard :spriteId="item.childId" />
          <div v-if="item.probability != null" class="br-item__prob">
            <div class="br-prob-bar">
              <div class="br-prob-bar__fill" :style="{ width: (item.probability * 100) + '%' }"></div>
            </div>
            <span class="br-prob-text">{{ toPctInt(item.probability) }}%</span>
          </div>
        </div>
      </template>
      <EmptyState v-else icon="search" text="未找到该组合的孵蛋配方" />
    </template>

    <!-- 反向查询结果 -->
    <template v-if="mode === 'reverse'">
      <div v-if="childName" class="br-summary">
        <span class="br-summary__text">可孵化出 {{ childName }} 的父母组合</span>
      </div>

      <template v-if="results.length > 0">
        <div v-for="(item, idx) in results" :key="idx" class="br-item br-item--reverse">
          <div class="br-parents">
            <SpriteCard :spriteId="item.parentIds[0]" size="small" />
            <span class="br-plus">+</span>
            <SpriteCard :spriteId="item.parentIds[1]" size="small" />
          </div>
          <div v-if="item.probability != null" class="br-item__prob">
            <span class="br-prob-text">{{ toPctInt(item.probability) }}%</span>
          </div>
        </div>
      </template>
      <EmptyState v-else icon="search" text="未找到该精灵的孵蛋配方" />
    </template>

    <!-- 加载中 -->
    <div v-if="loading" class="br-loading">
      <span class="text-light">查询中...</span>
    </div>
  </div>
</template>

<script setup>
import SpriteCard from './SpriteCard.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  mode: { type: String, default: 'forward' },
  results: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  parentAName: { type: String, default: '' },
  parentBName: { type: String, default: '' },
  childName: { type: String, default: '' }
})

function toPctInt(prob) {
  return (prob * 100).toFixed(0)
}
</script>

<style scoped>
.breeding-result {
  margin-top: 12px;
}
.br-summary {
  margin-bottom: 10px;
}
.br-summary__text {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.br-item {
  margin-bottom: 8px;
}
.br-item--reverse {
  display: flex;
  align-items: center;
}
.br-parents {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 4px;
}
.br-plus {
  font-size: 14px;
  font-weight: 600;
  color: #999;
  margin: 0 2px;
}
.br-item__prob {
  display: flex;
  align-items: center;
  margin-top: 4px;
  gap: 6px;
}
.br-prob-bar {
  flex: 1;
  height: 4px;
  background: #EEE;
  border-radius: 2px;
  overflow: hidden;
}
.br-prob-bar__fill {
  height: 100%;
  background: #4A90D9;
  border-radius: 2px;
  transition: width 0.3s ease;
}
.br-prob-text {
  font-size: 12px;
  color: #4A90D9;
  font-weight: 500;
  min-width: 25px;
  text-align: right;
}
.br-loading {
  text-align: center;
  padding: 20px;
}
.text-light { color: #999; }
</style>
