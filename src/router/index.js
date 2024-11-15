import { createRouter, createWebHistory } from 'vue-router'
import AccountHome from '../pages/management/AccountHome.vue'
import AccountDetail from '../pages/management/AccountDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AccountHome
  },
  {
    path: '/account/home',
    name: 'AccountHome',
    component: AccountHome
  },
  {
    path: '/account/:id',
    name: 'AccountDetail',
    component: AccountDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
