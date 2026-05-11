<template>
  <div
    v-if="sprite"
    :class="['sprite-card', { 'sprite-card--small': size === 'small' }]"
    @click="onTap"
  >
    <div :class="['sprite-card__avatar', `sprite-card__avatar--${sprite.elementClass}`]">
      <img
        v-if="hasImg"
        :src="`/images/sprites/${spriteId}.png`"
        class="sprite-card__img"
        @error="onImgError"
      />
      <span v-else class="sprite-card__fallback-text">{{ sprite.elementName[0] }}</span>
    </div>
    <div class="sprite-card__info">
      <span class="sprite-card__name">{{ sprite.name }}</span>
      <div class="sprite-card__tags">
        <span :class="['tag', `tag-${sprite.elementClass}`]">{{ sprite.elementName }}</span>
        <span v-if="showRarity && sprite.rarityStars" class="sprite-card__rarity">{{ sprite.rarityStars }}</span>
      </div>
    </div>
    <div v-if="tappable" class="sprite-card__arrow">
      <span class="text-lighter">›</span>
    </div>
  </div>
  <div v-else class="sprite-card sprite-card--empty">
    <div class="sprite-card__avatar sprite-card__avatar--empty">
      <span class="text-lighter">?</span>
    </div>
    <div class="sprite-card__info">
      <span class="text-light">选择精灵</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSprite } from '../utils/sprite'

const IMG_IDS = new Set([1, 2, 4, 5])

const props = defineProps({
  spriteId: { type: Number, default: 0 },
  showRarity: { type: Boolean, default: true },
  size: { type: String, default: 'normal' },
  tappable: { type: Boolean, default: true }
})

const emit = defineEmits(['tap'])
const router = useRouter()

const imgFailed = ref(false)
const hasImg = computed(() => IMG_IDS.has(props.spriteId) && !imgFailed.value)

const sprite = computed(() => getSprite(props.spriteId))

function onImgError() {
  imgFailed.value = true
}

function onTap() {
  if (!props.tappable || !sprite.value) return
  emit('tap', { spriteId: props.spriteId })
  router.push(`/sprite/${props.spriteId}`)
}
</script>

<style scoped>
.sprite-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  padding: 10px 12px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}
.sprite-card--small {
  padding: 6px 8px;
  border-radius: 6px;
}
.sprite-card--empty {
  opacity: 0.5;
}
.sprite-card__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}
.sprite-card--small .sprite-card__avatar {
  width: 28px;
  height: 28px;
  margin-right: 6px;
}
.sprite-card__avatar--empty {
  background: #f5f5f5;
}
.sprite-card__img {
  width: 30px;
  height: 30px;
}
.sprite-card--small .sprite-card__img {
  width: 20px;
  height: 20px;
}
.sprite-card__fallback-text {
  font-size: 14px;
  color: #fff;
  font-weight: 600;
}
.sprite-card--small .sprite-card__fallback-text {
  font-size: 10px;
}
.sprite-card__avatar--normal { background: #AAAAAA; }
.sprite-card__avatar--grass { background: #4CAF50; }
.sprite-card__avatar--fire { background: #F44336; }
.sprite-card__avatar--water { background: #2196F3; }
.sprite-card__avatar--light { background: #FFD54F; }
.sprite-card__avatar--light .sprite-card__fallback-text { color: #333; }
.sprite-card__avatar--earth { background: #8D6E63; }
.sprite-card__avatar--ice { background: #00BCD4; }
.sprite-card__avatar--dragon { background: #7C4DFF; }
.sprite-card__avatar--electric { background: #FFC107; }
.sprite-card__avatar--electric .sprite-card__fallback-text { color: #333; }
.sprite-card__avatar--poison { background: #9C27B0; }
.sprite-card__avatar--bug { background: #8BC34A; }
.sprite-card__avatar--bug .sprite-card__fallback-text { color: #333; }
.sprite-card__avatar--fighting { background: #E57373; }
.sprite-card__avatar--flying { background: #90CAF9; }
.sprite-card__avatar--flying .sprite-card__fallback-text { color: #333; }
.sprite-card__avatar--fairy { background: #F48FB1; }
.sprite-card__avatar--ghost { background: #673AB7; }
.sprite-card__avatar--dark { background: #424242; }
.sprite-card__avatar--machine { background: #607D8B; }
.sprite-card__avatar--magic { background: #E040FB; }
.sprite-card__info {
  flex: 1;
  min-width: 0;
}
.sprite-card__name {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: block;
  margin-bottom: 3px;
}
.sprite-card--small .sprite-card__name {
  font-size: 12px;
}
.sprite-card__tags {
  display: flex;
  align-items: center;
  gap: 4px;
}
.sprite-card__rarity {
  font-size: 9px;
  color: #FF9800;
}
.sprite-card__arrow {
  margin-left: 6px;
  font-size: 18px;
  flex-shrink: 0;
}
.tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  color: #fff;
  line-height: 1.4;
}
.tag-normal   { background: #AAAAAA; }
.tag-grass    { background: #4CAF50; }
.tag-fire     { background: #F44336; }
.tag-water    { background: #2196F3; }
.tag-light    { background: #FFD54F; color: #333; }
.tag-earth    { background: #8D6E63; }
.tag-ice      { background: #00BCD4; }
.tag-dragon   { background: #7C4DFF; }
.tag-electric { background: #FFC107; color: #333; }
.tag-poison   { background: #9C27B0; }
.tag-bug      { background: #8BC34A; color: #333; }
.tag-fighting { background: #E57373; }
.tag-flying   { background: #90CAF9; color: #333; }
.tag-fairy    { background: #F48FB1; }
.tag-ghost    { background: #673AB7; }
.tag-dark     { background: #424242; }
.tag-machine  { background: #607D8B; }
.tag-magic    { background: #E040FB; }
.text-lighter { color: #ccc; }
.text-light { color: #999; }
</style>
