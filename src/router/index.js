import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '@/pages/MainPage.vue'
import SignUpPage from '@/pages/register/SignUpPage.vue'
import BirthGenderPage from '@/pages/register/BirthGenderPage.vue'
import AccountSelectPage from '@/pages/register/AccountSelectPage.vue'


import Q1 from '@/pages/register/questions/Q1.vue'
import Q2 from '@/pages/register/questions/Q2.vue'
import Q3 from '@/pages/register/questions/Q3.vue'
import Q4 from '@/pages/register/questions/Q4.vue'
import Q5 from '@/pages/register/questions/Q5.vue'
import ResultPage from '@/pages/register/questions/ResultPage.vue'

import AccountHome from '../pages/management/AccountHome.vue'
import AccountDetail from '../pages/management/AccountDetail.vue'
import AccountList from '../pages/list/AccountList.vue'
import MyPage from '@/pages/mypage/MyPage.vue'

import Subscribe from "@/pages/subscribe/Subscribe.vue";


import SharingAccount from '@/pages/account/SharingAccountPage.vue'
import AccountPassword from '@/pages/account/AccountPasswordPage.vue'
import TermsOne from '@/pages/account/TermsOne.vue'
import TermsTwo from '@/pages/account/TermsTwo.vue'
import TermsThree from '@/pages/account/TermsThree.vue'
import StartTerms from '@/pages/account/StartTermsPage.vue'
import EndTerms from '@/pages/account/EndTermsPage.vue'



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
    path: "/Q1",
    name: "Q1",
    component: Q1
  },
  {
    path: "/Q2",
    name: "Q2",
    component: Q2
  },
  {
    path: "/Q3",
    name: "Q3",
    component: Q3
  },
  {
    path: "/Q4",
    name: "Q4",
    component: Q4
  },
  {
    path: "/Q5",
    name: "Q5",
    component: Q5
  },
  {
    path: '/result',
    name: 'ResultPage',
    component: ResultPage
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
  },
  {
    path: '/subscribe',
    name: 'Subscribe',
    component: Subscribe
  },
  
  {
    path: '/sharingaccount',
    name: 'SharingAccount',
    component: SharingAccount
  },
  {
    path: '/accountpassword',
    name: 'AccountPassword',
    component: AccountPassword
  },
  {
    path: '/termsone',
    name: 'TermsOne',
    component: TermsOne
  },
  {
    path: '/termstwo',
    name: 'TermsTwo',
    component: TermsTwo
  },
  {
    path: '/termsthree',
    name: 'TermsThree',
    component: TermsThree
  },
  {
    path: '/startterms',
    name: 'StartTerms',
    component: StartTerms
  },
  {
    path: '/endterms',
    name: 'EndTerms',
    component: EndTerms
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
