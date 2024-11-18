import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import SignUpPage from '@/pages/register/SignUpPage.vue'
import BirthGenderPage from '@/pages/register/BirthGenderPage.vue'
import AccountSelectPage from '@/pages/register/AccountSelectPage.vue'

import AccountHome from '../pages/management/AccountHome.vue'
import AccountDetail from '../pages/management/AccountDetail.vue'
import AccountList from '../pages/list/AccountList.vue'
import MyPage from '@/pages/mypage/MyPage.vue'

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpPage,
  },

  {
    path: "/",
    name: "MainPage",
    component: MainPage
  },

  { path: "/birth-gender",
    name: "BirthGender",
    component: BirthGenderPage
  },

  { path: "/account-select", 
    name: "AccountSelect", 
    component: AccountSelectPage
  },

  {
    path: '/home',
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
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/accountlist',
    name: 'AccountList',
    component: AccountList
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
