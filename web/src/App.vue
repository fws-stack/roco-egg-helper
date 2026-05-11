<template>
  <div class="app">
    <main class="app-content">
      <router-view />
    </main>
    <nav class="tabbar">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="tabbar__item"
        active-class="tabbar__item--active"
      >
        <span class="tabbar__icon">{{ tab.icon }}</span>
        <span class="tabbar__label">{{ tab.label }}</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGlobalStore } from './stores/global'

const store = useGlobalStore()

onMounted(() => {
  store.init()
})

const tabs = [
  { path: '/', label: '首页', icon: '🏠' },
  { path: '/forward', label: '正向查询', icon: '🔀' },
  { path: '/reverse', label: '反向查询', icon: '🔍' },
  { path: '/egg-query', label: '蛋参数查询', icon: '🥚' },
  { path: '/pokedex', label: '图鉴', icon: '📖' }
]
</script>

<style>
</style>
