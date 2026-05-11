<template>
  <div class="page-container">
    <div class="reverse-select" @click="openPicker">
      <span class="reverse-select__label">目标精灵</span>
      <SpriteCard :spriteId="target?.id || 0" :tappable="false" />
    </div>

    <div v-if="!target" class="forward-hint">
      <span class="text-sm text-light">点击上方卡片选择目标精灵</span>
    </div>

    <BreedingResult
      v-if="target"
      mode="reverse"
      :results="results"
      :childName="target.name"
    />

    <SpritePicker
      :visible="pickerVisible"
      title="选择目标精灵"
      @select="onPickerSelect"
      @close="onPickerClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { queryReverse } from '../utils/breeding'
import { addHistory } from '../utils/storage'
import { getSprite } from '../utils/sprite'
import { useGlobalStore } from '../stores/global'
import SpriteCard from '../components/SpriteCard.vue'
import SpritePicker from '../components/SpritePicker.vue'
import BreedingResult from '../components/BreedingResult.vue'

const store = useGlobalStore()

const target = ref(null)
const results = ref([])
const pickerVisible = ref(false)

onMounted(() => {
  const pendingId = store.pendingReverseId
  if (pendingId) {
    store.pendingReverseId = null
    const sprite = getSprite(pendingId)
    if (sprite) {
      target.value = { id: pendingId, name: sprite.name }
      doQuery(pendingId)
    }
  }
})

function openPicker() {
  pickerVisible.value = true
}

function onPickerSelect({ spriteId, sprite }) {
  target.value = { id: spriteId, name: sprite.name }
  pickerVisible.value = false
  doQuery(spriteId)
}

function onPickerClose() {
  pickerVisible.value = false
}

function doQuery(childId) {
  results.value = queryReverse(childId)
  addHistory({ type: 'reverse', childId, time: Date.now() })
}
</script>

<style scoped>
.page-container {
  padding: 12px;
  padding-bottom: 20px;
}
.reverse-select {
  margin-bottom: 4px;
  cursor: pointer;
}
.reverse-select__label {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 8px;
}
.forward-hint {
  text-align: center;
  margin-top: 20px;
}
.text-sm { font-size: 12px; }
.text-light { color: #999; }
</style>
