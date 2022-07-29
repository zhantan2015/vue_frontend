import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about-me',
    name: 'aboutMe',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutMeView.vue')
  },
  {
    path: '/leave-message',
    name: 'leaveAMessage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LeaveAMessageView.vue')
  }, {
    path: '/article/:aid',
    name: 'article',
    component: () => import('../views/ArticleView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
