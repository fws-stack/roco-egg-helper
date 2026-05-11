<template>
  <div class="egg-result">
    <template v-if="!hasQueried">
      <EmptyState icon="box" text="输入蛋的长和重开始查询" />
    </template>

    <template v-if="hasQueried && results.length > 0">
      <div class="egg-result__summary">
        <span class="egg-result__summary-text">长 {{ inputSize }} / 重 {{ inputWeight }} 匹配到 {{ results.length }} 个结果</span>
      </div>

      <div v-for="(item, index) in results" :key="item.spriteId" class="egg-result__item">
        <div v-if="index === 0" class="egg-result__badge">
          <span>最佳匹配</span>
        </div>

        <SpriteCard :spriteId="item.spriteId" />

        <div class="egg-result__detail">
          <div class="egg-result__row">
            <span class="egg-result__label">长范围</span>
            <span class="egg-result__value">{{ item.sizeMin }} - {{ item.sizeMax }}</span>
            <span :class="['egg-result__check', 'egg-result__check--pass']">✓</span>
          </div>
          <div class="egg-result__row">
            <span class="egg-result__label">重范围</span>
            <span class="egg-result__value">{{ item.weightMin }} - {{ item.weightMax }}</span>
            <span :class="['egg-result__check', 'egg-result__check--pass']">✓</span>
          </div>
        </div>
      </div>
    </template>

    <template v-if="hasQueried && results.length === 0">
      <EmptyState icon="search" text="未找到匹配的精灵蛋" subtext="尝试调整长或重参数" />
    </template>
  </div>
</template>

<script setup>
import SpriteCard from './SpriteCard.vue'
import EmptyState from './EmptyState.vue'

defineProps({
  results: { type: Array, default: () => [] },
  inputSize: { type: Number, default: 0 },
  inputWeight: { type: Number, default: 0 },
  hasQueried: { type: Boolean, default: false }
})
</script>

<style scoped>
.egg-result {
  margin-top: 12px;
}
.egg-result__summary {
  margin-bottom: 10px;
}
.egg-result__summary-text {
  font-size: 13px;
  color: #999;
}
.egg-result__item {
  position: relative;
  margin-bottom: 8px;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.egg-result__badge {
  position: absolute;
  top: 0;
  right: 8px;
  background: #4A90D9;
  color: #fff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 0 0 4px 4px;
}
.egg-result__detail {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e5e5e5;
}
.egg-result__row {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  font-size: 12px;
}
.egg-result__label {
  color: #999;
  width: 60px;
}
.egg-result__value {
  color: #333;
  flex: 1;
}
.egg-result__check {
  color: #F44336;
  font-weight: 600;
  width: 20px;
  text-align: right;
}
.egg-result__check--pass {
  color: #4CAF50;
}
</style>
