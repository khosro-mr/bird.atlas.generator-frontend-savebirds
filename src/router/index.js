import { createRouter, createWebHistory } from 'vue-router'
import BirdAtlasGeneratorView from '../views/BirdAtlasGeneratorView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: BirdAtlasGeneratorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 