<template>
  <div class="page-container">
    <div class="card">
      <span class="card-title">蛋的参数</span>
      <span class="text-sm text-light" style="display:block;margin-bottom:12px;">输入蛋的长和重，自动判断是什么精灵</span>

      <div class="egg-inputs">
        <div class="egg-input__group">
          <span class="egg-input__label">长</span>
          <div class="egg-input__wrap">
            <input
              class="egg-input__field"
              type="number"
              step="any"
              placeholder="输入长度"
              :value="size"
              @input="onSizeInput"
            />
          </div>
        </div>

        <div class="egg-input__group">
          <span class="egg-input__label">重</span>
          <div class="egg-input__wrap">
            <input
              class="egg-input__field"
              type="number"
              step="any"
              placeholder="输入重量"
              :value="weight"
              @input="onWeightInput"
            />
          </div>
        </div>
      </div>

      <button class="btn-primary mt-24" style="width:100%;" @click="onSubmit">查询</button>
    </div>

    <EggResult
      :results="results"
      :inputSize="inputSize"
      :inputWeight="inputWeight"
      :hasQueried="hasQueried"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { matchEgg } from '../utils/egg'
import { addHistory } from '../utils/storage'
import EggResult from '../components/EggResult.vue'

const size = ref('')
const weight = ref('')
const inputSize = ref(0)
const inputWeight = ref(0)
const results = ref([])
const hasQueried = ref(false)

function onSizeInput(e) {
  size.value = e.target.value
  autoQuery(e.target.value, weight.value)
}

function onWeightInput(e) {
  weight.value = e.target.value
  autoQuery(size.value, e.target.value)
}

function autoQuery(sizeStr, weightStr) {
  const s = parseFloat(sizeStr)
  const w = parseFloat(weightStr)

  if (isNaN(s) || isNaN(w)) {
    results.value = []
    hasQueried.value = false
    return
  }

  const res = matchEgg(s, w)
  results.value = res
  hasQueried.value = true
  inputSize.value = s
  inputWeight.value = w

  if (res.length > 0) {
    addHistory({ type: 'egg', size: s, weight: w, spriteId: res[0].spriteId, time: Date.now() })
  }
}

function onSubmit() {
  const s = parseFloat(size.value)
  const w = parseFloat(weight.value)

  if (isNaN(s) || isNaN(w)) {
    alert('请输入尺寸和重量')
    return
  }

  const res = matchEgg(s, w)
  results.value = res
  hasQueried.value = true
  inputSize.value = s
  inputWeight.value = w

  if (res.length > 0) {
    addHistory({ type: 'egg', size: s, weight: w, spriteId: res[0].spriteId, time: Date.now() })
  }
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
  margin-bottom: 4px;
}
.text-sm { font-size: 12px; }
.text-light { color: #999; }
.egg-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.egg-input__group {
  display: flex;
  flex-direction: column;
}
.egg-input__label {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
}
.egg-input__wrap {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  overflow: hidden;
}
.egg-input__field {
  flex: 1;
  padding: 10px 12px;
  font-size: 16px;
  color: #333;
  border: none;
  outline: none;
  background: transparent;
}
.mt-24 { margin-top: 12px; }
.btn-primary {
  background: #4A90D9;
  color: #fff;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  text-align: center;
  border: none;
  cursor: pointer;
}
.btn-primary:active {
  background: #3A7BC8;
}
</style>
