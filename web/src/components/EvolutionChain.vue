<template>
  <div v-if="hasChain" class="evo-chain">
    <div class="evo-chain__title">进化链</div>
    <div class="evo-chain__body">
      <template v-for="(item, idx) in nodes" :key="idx">
        <!-- 精灵节点 -->
        <div
          v-if="item.type === 'node'"
          :class="['evo-node', { 'evo-node--current': item.data.isCurrent }]"
          @click="onNodeTap(item.data.id)"
        >
          <div :class="['evo-node__avatar', `evo-node__avatar--${item.data.elementClass}`]">
            <span class="evo-node__fallback">{{ item.data.elementName[0] }}</span>
          </div>
          <div class="evo-node__info">
            <span class="evo-node__name">{{ item.data.name }}</span>
            <span :class="['evo-node__tag', `evo-node__tag--${item.data.elementClass}`]">{{ item.data.elementName }}</span>
          </div>
          <span v-if="item.data.isCurrent" class="evo-node__badge">当前</span>
        </div>

        <!-- 进化连接 + 条件 -->
        <div v-if="item.type === 'connector'" class="evo-connector">
          <div class="evo-connector__line"></div>
          <div class="evo-connector__arrow">▼</div>
          <div v-if="item.condition" class="evo-connector__cond">
            <span class="evo-connector__cond-icon">⚡</span>
            <span class="evo-connector__cond-text">{{ item.condition.detail }}</span>
          </div>
          <div class="evo-connector__arrow">▼</div>
          <div class="evo-connector__line"></div>
        </div>
      </template>
    </div>
  </div>
  <div v-else class="evo-chain--empty">
    <span class="text-light">暂无进化链数据</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getSprite } from '../utils/sprite'

const props = defineProps({
  spriteId: { type: Number, default: 0 },
  chain: { type: Object, default: null }
})

const router = useRouter()
const nodes = ref([])
const hasChain = ref(false)

watch([() => props.chain, () => props.spriteId], ([chain, currentId]) => {
  if (!chain) {
    hasChain.value = false
    nodes.value = []
    return
  }
  buildNodes(chain, currentId)
}, { immediate: true })

function buildNodes(chain, currentId) {
  const edges = chain.edges || []
  const members = chain.members || []
  const visited = {}

  const adj = {}
  edges.forEach(e => {
    if (!adj[e.from]) adj[e.from] = []
    adj[e.from].push(e)
  })

  const hasIncoming = {}
  edges.forEach(e => {
    hasIncoming[e.to] = true
  })

  const roots = members.filter(id => !hasIncoming[id])

  const queue = [...roots]
  const depthMap = {}
  roots.forEach(r => { depthMap[r] = 0 })

  const nodeList = []

  while (queue.length > 0) {
    const id = queue.shift()
    if (visited[id]) continue
    visited[id] = true

    const sprite = getSprite(id)
    nodeList.push({
      id: id,
      name: sprite ? sprite.name : '?',
      elementClass: sprite ? sprite.elementClass : 'normal',
      elementName: sprite ? sprite.elementName : '?',
      isCurrent: id === currentId,
      depth: depthMap[id] || 0
    })

    const nextEdges = adj[id] || []
    nextEdges.forEach(edge => {
      if (!visited[edge.to] && !queue.includes(edge.to)) {
        queue.push(edge.to)
        depthMap[edge.to] = (depthMap[id] || 0) + 1
      }
    })
  }

  const result = []
  nodeList.forEach((node, i) => {
    if (i > 0) {
      const prevNode = nodeList[i - 1]
      const connectorEdges = edges.filter(e => e.from === prevNode.id && e.to === node.id)
      result.push({
        type: 'connector',
        condition: connectorEdges.length > 0 ? connectorEdges[0].cond : null
      })
    }
    result.push({ type: 'node', data: node })
  })

  nodes.value = result
  hasChain.value = result.length > 0
}

function onNodeTap(id) {
  if (id) {
    router.push(`/sprite/${id}`)
  }
}
</script>

<style scoped>
.evo-chain {
  padding: 4px 0;
}
.evo-chain__title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}
.evo-chain__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ---- 精灵节点 ---- */
.evo-node {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 14px;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #eee;
  cursor: pointer;
  transition: all 0.2s;
  gap: 12px;
  position: relative;
}
.evo-node:active {
  background: #f8f8f8;
}
.evo-node--current {
  border-color: #4A90D9;
  background: #EBF4FD;
  box-shadow: 0 0 0 3px rgba(74, 144, 217, 0.15);
}
.evo-node__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.evo-node__avatar--normal { background: #C4B5A5; }
.evo-node__avatar--grass { background: #4CAF50; }
.evo-node__avatar--fire { background: #F44336; }
.evo-node__avatar--water { background: #2196F3; }
.evo-node__avatar--light { background: #FFC107; }
.evo-node__avatar--earth { background: #795548; }
.evo-node__avatar--ice { background: #00BCD4; }
.evo-node__avatar--dragon { background: #9C27B0; }
.evo-node__avatar--electric { background: #FFEB3B; }
.evo-node__avatar--poison { background: #9C27B0; }
.evo-node__avatar--bug { background: #8BC34A; }
.evo-node__avatar--fighting { background: #FF5722; }
.evo-node__avatar--flying { background: #87CEEB; }
.evo-node__avatar--fairy { background: #E91E63; }
.evo-node__avatar--ghost { background: #607D8B; }
.evo-node__avatar--dark { background: #424242; }
.evo-node__avatar--machine { background: #78909C; }
.evo-node__avatar--magic { background: #BA68C8; }
.evo-node__fallback {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}
.evo-node__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.evo-node__name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
}
.evo-node__tag {
  display: inline-block;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 11px;
  color: #fff;
  align-self: flex-start;
}
.evo-node__tag--normal { background: #C4B5A5; }
.evo-node__tag--grass { background: #4CAF50; }
.evo-node__tag--fire { background: #F44336; }
.evo-node__tag--water { background: #2196F3; }
.evo-node__tag--light { background: #FFC107; color: #333; }
.evo-node__tag--earth { background: #795548; }
.evo-node__tag--ice { background: #00BCD4; }
.evo-node__tag--dragon { background: #9C27B0; }
.evo-node__tag--electric { background: #FFA000; }
.evo-node__tag--poison { background: #9C27B0; }
.evo-node__tag--bug { background: #8BC34A; }
.evo-node__tag--fighting { background: #FF5722; }
.evo-node__tag--flying { background: #87CEEB; color: #333; }
.evo-node__tag--fairy { background: #E91E63; }
.evo-node__tag--ghost { background: #607D8B; }
.evo-node__tag--dark { background: #424242; }
.evo-node__tag--machine { background: #78909C; }
.evo-node__tag--magic { background: #BA68C8; }
.evo-node__badge {
  position: absolute;
  top: -8px;
  right: 10px;
  background: #4A90D9;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
}

/* ---- 进化连接器 ---- */
.evo-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 0;
  width: 100%;
}
.evo-connector__line {
  width: 2px;
  height: 8px;
  background: #d0d0d0;
}
.evo-connector__arrow {
  font-size: 10px;
  color: #bbb;
  line-height: 1;
}
.evo-connector__cond {
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #FFF8E1, #FFF3CD);
  border: 1px solid #FFE082;
  border-radius: 8px;
  padding: 8px 14px;
  margin: 4px 0;
  width: auto;
  max-width: 100%;
}
.evo-connector__cond-icon {
  font-size: 16px;
  flex-shrink: 0;
}
.evo-connector__cond-text {
  font-size: 13px;
  color: #E65100;
  font-weight: 600;
  line-height: 1.5;
  word-break: break-all;
}

.evo-chain--empty {
  padding: 16px;
  text-align: center;
}
.text-light { color: #999; }
</style>
