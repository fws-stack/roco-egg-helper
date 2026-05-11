<template>
  <div :class="['picker-overlay', { 'picker-overlay--show': visible }]" @click.self="close">
    <div class="picker-panel" @click.stop>
      <div class="picker-header">
        <span class="picker-title">{{ title }}</span>
        <div class="picker-close" @click="close">
          <span class="text-lighter">✕</span>
        </div>
      </div>

      <div class="picker-search">
        <input
          class="picker-search__input"
          :placeholder="placeholder"
          v-model="keyword"
          @input="onSearchInput"
        />
      </div>

      <div class="picker-filters">
        <span
          :class="['picker-filter__item', { 'picker-filter__item--active': elementFilter === -1 }]"
          @click="filterByElement(-1)"
        >全部</span>
        <span
          v-for="(el, idx) in ELEMENTS"
          :key="idx"
          :class="['picker-filter__item', { 'picker-filter__item--active': elementFilter === idx }]"
          @click="filterByElement(idx)"
        >{{ el }}</span>
      </div>

      <div class="picker-list">
        <template v-if="filteredList.length > 0">
          <div
            v-for="item in filteredList"
            :key="item.id"
            class="picker-list__item"
            @click="onSelect(item.id)"
          >
            <SpriteCard :spriteId="item.id" size="small" :tappable="false" />
          </div>
        </template>
        <EmptyState
          v-else
          icon="search"
          :text="allSprites.length === 0 ? '精灵数据加载中...' : '未找到匹配精灵'"
          :subtext="allSprites.length === 0 ? '请稍后重试' : '换个关键词试试'"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ELEMENT_MAP, getAllSprites } from '../utils/sprite'
import SpriteCard from './SpriteCard.vue'
import EmptyState from './EmptyState.vue'

const ELEMENTS = ELEMENT_MAP

const props = defineProps({
  visible: { type: Boolean, default: false },
  placeholder: { type: String, default: '搜索精灵...' },
  excludeIds: { type: Array, default: () => [] },
  title: { type: String, default: '选择精灵' }
})

const emit = defineEmits(['select', 'close'])

const keyword = ref('')
const allSprites = ref([])
const filteredList = ref([])
const elementFilter = ref(-1)
let searchTimer = null

if (allSprites.value.length === 0) {
  allSprites.value = getAllSprites()
  filteredList.value = allSprites.value
}

watch(() => props.visible, (val) => {
  if (val) {
    if (allSprites.value.length === 0) {
      allSprites.value = getAllSprites()
    }
    keyword.value = ''
    elementFilter.value = -1
    filterList()
  }
})

function onSearchInput() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    filterList()
  }, 200)
}

function filterByElement(el) {
  elementFilter.value = elementFilter.value === el ? -1 : el
  filterList()
}

function filterList() {
  let list = allSprites.value

  if (keyword.value) {
    const kw = keyword.value.toLowerCase()
    list = list.filter(s => s.name.toLowerCase().includes(kw))
  }

  if (elementFilter.value >= 0) {
    list = list.filter(s => s.element === elementFilter.value)
  }

  if (props.excludeIds && props.excludeIds.length) {
    const excludeSet = new Set(props.excludeIds)
    list = list.filter(s => !excludeSet.has(s.id))
  }

  filteredList.value = list
}

function onSelect(id) {
  const sprite = allSprites.value.find(s => s.id === id)
  emit('select', { spriteId: id, sprite })
  close()
}

function close() {
  emit('close')
}
</script>

<style scoped>
.picker-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.25s, visibility 0.25s;
}
.picker-overlay--show {
  visibility: visible;
  opacity: 1;
}
.picker-panel {
  background: #f5f5f5;
  border-radius: 16px 16px 0 0;
  height: 70vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 8px;
}
.picker-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.picker-close {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.picker-search {
  padding: 0 12px 8px;
}
.picker-search__input {
  background: #fff;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  width: 100%;
  box-sizing: border-box;
}
.picker-filters {
  white-space: nowrap;
  padding: 0 12px 8px;
  overflow-x: auto;
  scrollbar-width: none;
}
.picker-filters::-webkit-scrollbar {
  height: 0;
}
.picker-filter__item {
  display: inline-block;
  padding: 4px 10px;
  margin-right: 6px;
  border-radius: 10px;
  font-size: 12px;
  background: #fff;
  color: #999;
  border: 1px solid #e5e5e5;
  cursor: pointer;
}
.picker-filter__item--active {
  background: #4A90D9;
  color: #fff;
  border-color: #4A90D9;
}
.picker-list {
  flex: 1;
  padding: 0 12px;
  overflow-y: auto;
}
.picker-list__item {
  margin-bottom: 8px;
}
.text-lighter { color: #ccc; }
</style>
