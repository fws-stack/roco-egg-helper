<template>
  <div class="page-container">
    <!-- 区域切换 -->
    <div class="region-tabs">
      <div
        v-for="tab in regionTabs"
        :key="tab.key"
        :class="['region-tab', { 'region-tab--active': currentRegion === tab.key }]"
        @click="switchRegion(tab.key)"
      >
        <span>{{ tab.label }}</span>
      </div>
    </div>

    <!-- 搜索 -->
    <div class="search-bar">
      <input
        class="search-input"
        placeholder="搜索序号或名称"
        :value="searchKeyword"
        @input="onSearchInput"
      />
    </div>

    <!-- 元素筛选 -->
    <div class="filter-bar">
      <div class="filter-bar__inner">
        <span
          :class="['filter-chip', { 'filter-chip--active': elementFilter === -1 }]"
          @click="filterByElement(-1)"
        >全部</span>
        <span
          v-for="(name, idx) in elements"
          :key="idx"
          :class="['filter-chip', `filter-chip--${elementClasses[idx]}`, { 'filter-chip--active': elementFilter === idx }]"
          @click="filterByElement(idx)"
        >{{ name }}</span>
      </div>
    </div>

    <!-- 计数 -->
    <div class="pokedex-count">
      <span class="text-sm text-light">共 {{ filteredCount }} / {{ totalCount }} 个精灵</span>
    </div>

    <!-- 精灵列表 -->
    <div v-if="filteredSprites.length > 0" class="sprite-list">
      <div
        v-for="item in filteredSprites"
        :key="item.id"
        class="sprite-list__item"
        @click="onSpriteTap(item.id)"
      >
        <div v-if="item.pokedexNum" class="sprite-list__num">
          <span class="sprite-list__num-text">{{ item.pokedexNum }}</span>
        </div>
        <div class="sprite-list__card">
          <SpriteCard :spriteId="item.id" :showRarity="true" size="normal" :tappable="false" />
        </div>
        <div v-if="item.hasShiny" class="shiny-badge">
          <span>异色</span>
        </div>
        <div v-if="currentRegion === 'all'" class="sprite-list__region">
          <span class="text-sm text-lighter">{{ item.region === 'windmorn' ? '风眠省' : '洛克里安' }}</span>
        </div>
        <span class="sprite-list__arrow">›</span>
      </div>
    </div>

    <EmptyState
      v-else
      icon="search"
      text="没有找到匹配的精灵"
      subtext="试试切换区域或属性筛选"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ELEMENT_MAP, ELEMENT_CLASS, getSprite, getAllSprites } from '../utils/sprite'
import { useGlobalStore } from '../stores/global'
import SpriteCard from '../components/SpriteCard.vue'
import EmptyState from '../components/EmptyState.vue'

const router = useRouter()
const store = useGlobalStore()

const currentRegion = ref('all')
const regionTabs = [
  { key: 'all', label: '全部图鉴' },
  { key: 'windmorn', label: '风眠省' },
  { key: 'rockorian', label: '洛克里安' }
]
const elementFilter = ref(-1)
const searchKeyword = ref('')
const elements = ELEMENT_MAP
const elementClasses = ELEMENT_CLASS
const sprites = ref([])
const filteredSprites = ref([])
const totalCount = ref(0)
const filteredCount = ref(0)

onMounted(() => {
  initData()
})

function initData() {
  const pokedexData = store.pokedexData
  const shinies = store.shinies || {}
  const spriteRegion = store.spriteRegion || {}
  const pokedexOrder = pokedexData?.pokedexOrder || []

  const result = []
  const seen = {}
  let pokedexNum = 0
  pokedexOrder.forEach(id => {
    if (seen[id]) return
    seen[id] = true
    const sprite = getSprite(id)
    if (sprite) {
      pokedexNum++
      sprite.pokedexNum = pokedexNum
      sprite.hasShiny = !!shinies[id]
      sprite.region = spriteRegion[id] || ''
      result.push(sprite)
    }
  })

  const allIds = []
  if (pokedexData?.regions) {
    allIds.push(...(pokedexData.regions.windmorn || []))
    allIds.push(...(pokedexData.regions.rockorian || []))
  }
  allIds.forEach(id => {
    if (!seen[id]) {
      seen[id] = true
      const sprite = getSprite(id)
      if (sprite) {
        sprite.hasShiny = !!shinies[id]
        sprite.region = spriteRegion[id] || ''
        result.push(sprite)
      }
    }
  })

  sprites.value = result
  totalCount.value = result.length
  applyFilter()
}

function switchRegion(region) {
  currentRegion.value = region
  applyFilter()
}

function filterByElement(idx) {
  elementFilter.value = elementFilter.value === idx ? -1 : idx
  applyFilter()
}

function onSpriteTap(id) {
  router.push(`/sprite/${id}`)
}

function onSearchInput(e) {
  searchKeyword.value = e.target.value
  applyFilter()
}

function applyFilter() {
  const region = currentRegion.value
  const element = elementFilter.value
  const keyword = (searchKeyword.value || '').trim().toLowerCase()

  const filtered = sprites.value.filter(s => {
    if (region !== 'all' && s.region !== region) return false
    if (element !== -1 && s.element !== element) return false
    if (keyword) {
      if (String(s.pokedexNum).indexOf(keyword) === -1 && s.name.toLowerCase().indexOf(keyword) === -1) return false
    }
    return true
  })

  filteredSprites.value = filtered
  filteredCount.value = filtered.length
}
</script>

<style scoped>
.page-container {
  padding: 12px;
  padding-bottom: 20px;
}
.region-tabs {
  display: flex;
  background: #fff;
  border-radius: 10px;
  padding: 4px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.region-tab {
  flex: 1;
  text-align: center;
  padding: 8px 0;
  font-size: 14px;
  color: #999;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}
.region-tab--active {
  background: #4A90D9;
  color: #fff;
  font-weight: bold;
}
.search-bar {
  margin-bottom: 8px;
}
.search-input {
  width: 100%;
  height: 36px;
  background: #fff;
  border-radius: 8px;
  padding: 0 12px;
  font-size: 14px;
  border: none;
  box-sizing: border-box;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
  outline: none;
}
.filter-bar {
  margin-bottom: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.filter-bar::-webkit-scrollbar {
  height: 0;
}
.filter-bar__inner {
  display: flex;
  padding: 4px 0;
  gap: 6px;
}
.filter-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #999;
  background: #fff;
  border: 1px solid #e5e5e5;
  flex-shrink: 0;
  cursor: pointer;
}
.filter-chip--active {
  color: #fff;
  border-color: #4A90D9;
  background: #4A90D9;
}
.filter-chip--normal.filter-chip--active { background: #C4B5A5; border-color: #C4B5A5; }
.filter-chip--grass.filter-chip--active { background: #4CAF50; border-color: #4CAF50; }
.filter-chip--fire.filter-chip--active { background: #F44336; border-color: #F44336; }
.filter-chip--water.filter-chip--active { background: #2196F3; border-color: #2196F3; }
.filter-chip--light.filter-chip--active { background: #FFC107; border-color: #FFC107; }
.filter-chip--earth.filter-chip--active { background: #795548; border-color: #795548; }
.filter-chip--ice.filter-chip--active { background: #00BCD4; border-color: #00BCD4; }
.filter-chip--dragon.filter-chip--active { background: #9C27B0; border-color: #9C27B0; }
.filter-chip--electric.filter-chip--active { background: #FFA000; border-color: #FFA000; }
.filter-chip--poison.filter-chip--active { background: #9C27B0; border-color: #9C27B0; }
.filter-chip--bug.filter-chip--active { background: #8BC34A; border-color: #8BC34A; }
.filter-chip--fighting.filter-chip--active { background: #FF5722; border-color: #FF5722; }
.filter-chip--flying.filter-chip--active { background: #87CEEB; border-color: #87CEEB; }
.filter-chip--fairy.filter-chip--active { background: #E91E63; border-color: #E91E63; }
.filter-chip--ghost.filter-chip--active { background: #607D8B; border-color: #607D8B; }
.filter-chip--dark.filter-chip--active { background: #424242; border-color: #424242; }
.filter-chip--machine.filter-chip--active { background: #78909C; border-color: #78909C; }
.filter-chip--magic.filter-chip--active { background: #BA68C8; border-color: #BA68C8; }
.pokedex-count {
  padding: 4px 0 8px;
}
.sprite-list {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.sprite-list__item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
}
.sprite-list__item:active {
  background: #f8f8f8;
}
.sprite-list__num {
  width: 30px;
  flex-shrink: 0;
  text-align: center;
}
.sprite-list__num-text {
  font-size: 13px;
  color: #999;
  font-weight: 500;
}
.sprite-list__card {
  flex: 1;
  min-width: 0;
}
.shiny-badge {
  flex-shrink: 0;
  background: linear-gradient(135deg, #FFD700, #FFA000);
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 8px;
  margin-left: 4px;
}
.sprite-list__region {
  margin-left: 6px;
  flex-shrink: 0;
}
.sprite-list__arrow {
  font-size: 18px;
  color: #ccc;
  flex-shrink: 0;
  margin-left: 4px;
}
.text-sm { font-size: 12px; }
.text-light { color: #999; }
.text-lighter { color: #ccc; }
</style>
