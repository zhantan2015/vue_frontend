import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
    path: '/edit-article/:aid',
    name: 'editArticleItem',
    component: () => import('../views/EditArticleView.vue')
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
