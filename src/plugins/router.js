import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "general" */ '../views/Home.vue')
    },
    {
      path: '/locations/:location',
      name: 'location',
      component: () => import(/* webpackChunkName: "routes" */ '../views/Location.vue')
    },
    {
      path: '/locations/:location/:route',
      name: 'route',
      component: () => import(/* webpackChunkName: "routes" */ '../views/Route.vue')
    },
    {
      path: '/routes',
      name: 'routes',
      component: () => import(/* webpackChunkName: "routes" */ '../views/Routes.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "general" */ '../views/Settings.vue')
    }
  ]
})
