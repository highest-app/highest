import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/locations',
    name: 'locations',
    component: () => import(/* webpackChunkName: "locations" */ '../views/Locations.vue')
  },
  {
    path: '/locations/:id',
    name: 'location',
    component: () => import(/* webpackChunkName: "locations" */ '../views/Routes.vue')
  },
  {
    path: '/routes',
    name: 'routes',
    component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
