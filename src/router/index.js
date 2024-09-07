import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MedalDetail from '../views/medalDetail.vue'
import userComments from '../views/userComments.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/userComments',
    name: 'userComments',
    component: userComments
  },
  {
    path: '/medalDetail',
    name: 'medalDetail',
    component: MedalDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
