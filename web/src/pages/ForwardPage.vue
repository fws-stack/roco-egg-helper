<template>
  <div class="page-container">
    <!-- 父精灵选择区 -->
    <div class="forward-select">
      <div class="forward-select__item" @click="openPicker('parentA')">
        <SpriteCard :spriteId="parentA?.id || 0" :tappable="false" />
      </div>

      <div class="forward-select__plus">
        <span class="text-xlarge text-lighter">+</span>
      </div>

      <div class="forward-select__item" @click="openPicker('parentB')">
        <SpriteCard :spriteId="parentB?.id || 0" :tappable="false" />
      </div>
    </div>

    <div v-if="!parentA || !parentB" class="forward-hint">
      <span class="text-sm text-light">点击上方卡片选择两只父精灵</span>
    </div>

    <BreedingResult
      v-if="parentA && parentB"
      mode="forward"
      :results="results"
      :parentAName="parentA?.name || ''"
      :parentBName="parentB?.name || ''"
    />

    <SpritePicker
      :visible="pickerVisible"
      :title="pickerTitle"
      :excludeIds="pickerExclude"
      @select="onPickerSelect"
      @close="onPickerClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { queryForward } from '../utils/breeding'
import { addHistory } from '../utils/storage'
import { getSprite } from '../utils/sprite'
import { useGlobalStore } from '../stores/global'
import SpriteCard from '../components/SpriteCard.vue'
import SpritePicker from '../components/SpritePicker.vue'
import BreedingResult from '../components/BreedingResult.vue'

const store = useGlobalStore()

const parentA = ref(null)
const parentB = ref(null)
const results = ref([])
const pickerVisible = ref(false)
const pickerTarget = ref('')
const pickerTitle = ref('')
const pickerExclude = ref([])

onMounted(() => {
  const pendingId = store.pendingForwardId
  if (pendingId) {
    store.pendingForwardId = null
    const sprite = getSprite(pendingId)
    if (sprite) {
      parentA.value = { id: pendingId, name: sprite.name }
      results.value = []
    }
  }
})

function openPicker(target) {
  const exclude = []
  if (target === 'parentA' && parentB.value) {
    exclude.push(parentB.value.id)
  } else if (target === 'parentB' && parentA.value) {
    exclude.push(parentA.value.id)
  }

  pickerVisible.value = true
  pickerTarget.value = target
  pickerTitle.value = target === 'parentA' ? '选择父精灵 A' : '选择父精灵 B'
  pickerExclude.value = exclude
}

function onPickerSelect({ spriteId, sprite }) {
  const target = pickerTarget.value

  if (target === 'parentA') {
    parentA.value = { id: spriteId, name: sprite.name }
  } else {
    parentB.value = { id: spriteId, name: sprite.name }
  }

  const a = target === 'parentA' ? spriteId : parentA.value?.id
  const b = target === 'parentB' ? spriteId : parentB.value?.id
  if (a && b) {
    doQuery(a, b)
  }
}

function onPickerClose() {
  pickerVisible.value = false
}

function doQuery(a, b) {
  results.value = queryForward(a, b)
  addHistory({ type: 'forward', parentA: a, parentB: b, time: Date.now() })
}
</script>

<style scoped>
.page-container {
  padding: 12px;
  padding-bottom: 20px;
}
.forward-select {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.forward-select__item {
  flex: 1;
  max-width: 140px;
  cursor: pointer;
}
.forward-select__plus {
  flex-shrink: 0;
  font-size: 20px;
  font-weight: 300;
}
.forward-hint {
  text-align: center;
  margin-top: 20px;
}
.text-sm { font-size: 12px; }
.text-light { color: #999; }
.text-xlarge { font-size: 20px; }
.text-lighter { color: #ccc; }
</style>
