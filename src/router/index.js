import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
<<<<<<< HEAD
  }, {
    path: '/edit-article',
    name: 'editArticle',
    component: () => import('../views/EditArticleView.vue')
  }, {
    path: '/logs',
    name: 'logs',
    component: () => import('../views/LogsView.vue')
  }, {
    path: '/:pathMatch(.*)',
    name: 'test',
    component: () => import('../views/Test.vue')
=======
>>>>>>> 09cb203 (切换分支master)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
