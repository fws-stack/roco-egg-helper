<template>
  <div class="empty-state">
    <div class="empty-state__icon">
      <span v-if="icon === 'search'" class="empty-state__emoji">🔍</span>
      <span v-else-if="icon === 'box'" class="empty-state__emoji">📦</span>
      <span v-else class="empty-state__emoji">📭</span>
    </div>
    <p class="empty-state__text">{{ text }}</p>
    <p v-if="subtext" class="empty-state__subtext">{{ subtext }}</p>
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, default: '' },
  text: { type: String, default: '' },
  subtext: { type: String, default: '' }
})
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}
.empty-state__icon {
  margin-bottom: 12px;
}
.empty-state__emoji {
  font-size: 40px;
}
.empty-state__text {
  font-size: 14px;
  color: #999;
  text-align: center;
}
.empty-state__subtext {
  font-size: 12px;
  color: #ccc;
  margin-top: 4px;
  text-align: center;
}
</style>
