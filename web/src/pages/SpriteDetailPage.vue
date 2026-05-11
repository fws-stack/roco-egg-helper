<template>
  <div v-if="sprite" class="page-container">
    <!-- 精灵头部信息 -->
    <div class="card sprite-header">
      <div class="sprite-header__top">
        <div :class="['sprite-header__img-wrap', `sprite-header__img-wrap--${sprite.elementClass}`]">
          <span class="sprite-header__img-fallback">{{ sprite.name[0] }}</span>
        </div>
        <div class="sprite-header__info">
          <span class="sprite-header__name">{{ sprite.name }}</span>
          <div class="sprite-header__tags mt-16">
            <span :class="['tag', `tag-${sprite.elementClass}`]">{{ sprite.elementName }}</span>
            <span class="sprite-header__rarity">{{ sprite.rarityStars }}</span>
            <span class="text-sm text-light">（{{ sprite.rarityName }}）</span>
          </div>
          <p v-if="sprite.description" class="sprite-header__desc mt-16">{{ sprite.description }}</p>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="card sprite-actions">
      <button class="btn-primary" style="margin-bottom:6px;width:100%;" @click="goForward">正查此精灵的孵化公式</button>
      <button class="btn-primary" style="background:#4CAF50;width:100%;" @click="goReverse">反查如何获得此精灵</button>
    </div>

    <!-- 进化链 -->
    <div v-if="hasChain" class="card">
      <EvolutionChain :spriteId="sprite.id" :chain="chain" />
    </div>

    <!-- 异色形态 -->
    <div v-if="hasShiny" class="card">
      <span class="card-title">异色形态</span>
      <div class="shiny-compare">
        <div class="shiny-compare__item">
          <span class="shiny-compare__label">原形态</span>
          <div :class="['shiny-compare__img-wrap', `sprite-header__img-wrap--${sprite.elementClass}`]">
            <span class="shiny-compare__fallback">{{ sprite.name[0] }}</span>
          </div>
          <span class="shiny-compare__name text-sm">{{ sprite.name }}</span>
        </div>
        <div class="shiny-compare__vs">
          <span class="text-light">VS</span>
        </div>
        <div class="shiny-compare__item">
          <span class="shiny-compare__label shiny-compare__label--shiny">异色形态</span>
          <div class="shiny-compare__img-wrap shiny-compare__img-wrap--shiny">
            <span class="shiny-compare__fallback">✨</span>
          </div>
          <span class="shiny-compare__name text-sm">{{ shiny.name }}</span>
        </div>
      </div>
      <p v-if="shiny.desc" class="text-sm text-light" style="margin-top:8px;">{{ shiny.desc }}</p>
    </div>

    <!-- 作为子代的孵蛋信息 -->
    <div v-if="asChildResults.length > 0" class="card">
      <span class="card-title">孵化出 {{ sprite.name }} 的组合</span>
      <div v-for="(item, index) in asChildResults" :key="index" class="detail-breeding__item">
        <div class="flex-row align-center">
          <router-link :to="`/sprite/${item.parentAId}`" class="detail-breeding__link">{{ item.parentAName }}</router-link>
          <span class="detail-breeding__plus"> + </span>
          <router-link :to="`/sprite/${item.parentBId}`" class="detail-breeding__link">{{ item.parentBName }}</router-link>
          <span class="detail-breeding__plus"> → </span>
          <span class="detail-breeding__name text-bold">{{ sprite.name }}</span>
        </div>
        <span v-if="item.probability != null" class="text-sm text-light">概率 {{ item.probText }}</span>
      </div>
    </div>

    <!-- 作为父代的孵蛋信息 -->
    <div v-if="asParentResults.length > 0" class="card">
      <span class="card-title">{{ sprite.name }} 作为父代可孵化</span>
      <div v-for="(item, index) in asParentResults" :key="index" class="detail-breeding__item">
        <div class="flex-row align-center">
          <span class="detail-breeding__name text-bold">{{ sprite.name }}</span>
          <span class="detail-breeding__plus"> + </span>
          <router-link :to="`/sprite/${item.otherParentId}`" class="detail-breeding__link">{{ item.otherParentName }}</router-link>
          <span class="detail-breeding__plus"> → </span>
          <router-link :to="`/sprite/${item.childId}`" class="detail-breeding__link">{{ item.childName }}</router-link>
        </div>
        <span v-if="item.probability != null" class="text-sm text-light">概率 {{ item.probText }}</span>
      </div>
    </div>

    <EmptyState
      v-if="asChildResults.length === 0 && asParentResults.length === 0"
      icon="box"
      text="暂无此精灵的孵蛋数据"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSprite } from '../utils/sprite'
import { queryReverse } from '../utils/breeding'
import { useGlobalStore } from '../stores/global'
import EvolutionChain from '../components/EvolutionChain.vue'
import EmptyState from '../components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const store = useGlobalStore()

const sprite = ref(null)
const asChildResults = ref([])
const asParentResults = ref([])
const chain = ref(null)
const hasChain = ref(false)
const shiny = ref(null)
const hasShiny = ref(false)

onMounted(() => {
  const id = Number(route.params.id)
  const spr = getSprite(id)
  if (!spr) {
    alert('精灵不存在')
    router.back()
    return
  }
  sprite.value = spr

  const fmtProb = (prob) => prob != null ? (prob * 100).toFixed(0) + '%' : null

  // 查询有哪些组合可以孵化出此精灵
  const reverseResults = queryReverse(id)
  asChildResults.value = reverseResults.map(r => {
    const p1 = getSprite(r.parentIds[0])
    const p2 = getSprite(r.parentIds[1])
    return {
      parentAId: r.parentIds[0],
      parentAName: p1?.name || '?',
      parentBId: r.parentIds[1],
      parentBName: p2?.name || '?',
      probability: r.probability,
      probText: fmtProb(r.probability)
    }
  })

  // 查询此精灵作为父代之一的组合
  const forwardIndex = store.forwardIndex
  const asParentSet = new Set()
  Object.entries(forwardIndex).forEach(([key, entries]) => {
    const [a, b] = key.split('_').map(Number)
    if (a === id || b === id) {
      const other = a === id ? b : a
      entries.forEach(e => {
        const childSprite = getSprite(e.c)
        const otherSprite = getSprite(other)
        asParentSet.add(JSON.stringify({
          otherParentId: other,
          otherParentName: otherSprite?.name || '?',
          childId: e.c,
          childName: childSprite?.name || '?',
          probability: e.prob,
          probText: fmtProb(e.prob)
        }))
      })
    }
  })

  asParentResults.value = Array.from(asParentSet).map(JSON.parse)
    .sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0))

  // 加载进化链
  const chainBySprite = store.chainBySprite || {}
  const ch = chainBySprite[id]
  if (ch) {
    chain.value = ch
    hasChain.value = true
  }

  // 加载异色
  const shinies = store.shinies || {}
  const sh = shinies[id]
  if (sh) {
    shiny.value = sh
    hasShiny.value = true
  }
})

function goForward() {
  store.pendingForwardId = sprite.value.id
  router.push('/forward')
}

function goReverse() {
  store.pendingReverseId = sprite.value.id
  router.push('/reverse')
}
</script>

<style scoped>
.page-container {
  padding: 12px;
  padding-bottom: 20px;
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
  margin-bottom: 8px;
  display: block;
}
.sprite-header__top {
  display: flex;
  align-items: flex-start;
}
.sprite-header__img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #f5f5f5;
  margin-right: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sprite-header__img-fallback {
  font-size: 24px;
  color: #fff;
  font-weight: 700;
}
.sprite-header__img-wrap--normal { background: #AAAAAA; }
.sprite-header__img-wrap--grass { background: #4CAF50; }
.sprite-header__img-wrap--fire { background: #F44336; }
.sprite-header__img-wrap--water { background: #2196F3; }
.sprite-header__img-wrap--light { background: #FFD54F; }
.sprite-header__img-wrap--light .sprite-header__img-fallback { color: #333; }
.sprite-header__img-wrap--earth { background: #8D6E63; }
.sprite-header__img-wrap--ice { background: #00BCD4; }
.sprite-header__img-wrap--dragon { background: #7C4DFF; }
.sprite-header__img-wrap--electric { background: #FFC107; }
.sprite-header__img-wrap--electric .sprite-header__img-fallback { color: #333; }
.sprite-header__img-wrap--poison { background: #9C27B0; }
.sprite-header__img-wrap--bug { background: #8BC34A; }
.sprite-header__img-wrap--bug .sprite-header__img-fallback { color: #333; }
.sprite-header__img-wrap--fighting { background: #E57373; }
.sprite-header__img-wrap--flying { background: #90CAF9; }
.sprite-header__img-wrap--flying .sprite-header__img-fallback { color: #333; }
.sprite-header__img-wrap--fairy { background: #F48FB1; }
.sprite-header__img-wrap--ghost { background: #673AB7; }
.sprite-header__img-wrap--dark { background: #424242; }
.sprite-header__img-wrap--machine { background: #607D8B; }
.sprite-header__img-wrap--magic { background: #E040FB; }
.sprite-header__info {
  flex: 1;
  min-width: 0;
}
.sprite-header__name {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.sprite-header__tags {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}
.sprite-header__rarity {
  color: #FF9800;
  font-size: 12px;
}
.sprite-header__desc {
  font-size: 13px;
  color: #999;
  line-height: 1.5;
  margin-top: 4px;
}
.sprite-actions {
  padding: 10px 12px;
}
.btn-primary {
  background: #4A90D9;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  text-align: center;
  border: none;
  cursor: pointer;
  display: block;
}
.btn-primary:active {
  background: #3A7BC8;
}
.detail-breeding__item {
  padding: 8px 0;
  border-bottom: 1px solid #e5e5e5;
}
.detail-breeding__item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.detail-breeding__link {
  color: #4A90D9;
  text-decoration: none;
}
.detail-breeding__name {
  color: #333;
}
.detail-breeding__plus {
  margin: 0 3px;
  color: #999;
  font-size: 12px;
}
.shiny-compare {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
}
.shiny-compare__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
.shiny-compare__label {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}
.shiny-compare__label--shiny {
  color: #FFA000;
  font-weight: bold;
}
.shiny-compare__img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}
.shiny-compare__img-wrap--shiny {
  background: linear-gradient(135deg, #FFD700, #FFA000);
}
.shiny-compare__fallback {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
}
.shiny-compare__vs {
  flex-shrink: 0;
  padding: 0 8px;
  font-size: 16px;
  font-weight: bold;
}
.shiny-compare__name {
  color: #333;
  text-align: center;
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
.tag-grass { background: #4CAF50; }
.tag-fire { background: #F44336; }
.tag-water { background: #2196F3; }
.tag-light { background: #FFD54F; color: #333; }
.tag-earth { background: #8D6E63; }
.tag-ice { background: #00BCD4; }
.tag-dragon { background: #7C4DFF; }
.tag-electric { background: #FFC107; color: #333; }
.tag-poison { background: #9C27B0; }
.tag-bug { background: #8BC34A; color: #333; }
.tag-fighting { background: #E57373; }
.tag-flying { background: #90CAF9; color: #333; }
.tag-fairy { background: #F48FB1; }
.tag-ghost { background: #673AB7; }
.tag-dark { background: #424242; }
.tag-machine { background: #607D8B; }
.tag-magic { background: #E040FB; }
.text-sm { font-size: 12px; }
.text-light { color: #999; }
.mt-16 { margin-top: 8px; }
.text-bold { font-weight: 600; }
.flex-row {
  display: flex;
  align-items: center;
}
</style>
