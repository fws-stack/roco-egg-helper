import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomePage.vue') },
  { path: '/forward', component: () => import('../pages/ForwardPage.vue') },
  { path: '/reverse', component: () => import('../pages/ReversePage.vue') },
  { path: '/egg-query', component: () => import('../pages/EggQueryPage.vue') },
  { path: '/pokedex', component: () => import('../pages/PokedexPage.vue') },
  { path: '/sprite/:id', component: () => import('../pages/SpriteDetailPage.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
