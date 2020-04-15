import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "general" */ '../views/_Home.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "general" */ '../views/_Search.vue'),
      props: true
    },
    {
      path: '/locations/:location',
      name: 'location',
      component: () => import(/* webpackChunkName: "routes" */ '../views/locations/_Location.vue')
    },
    {
      path: '/locations/:location/:route',
      name: 'route',
      component: () => import(/* webpackChunkName: "routes" */ '../views/routes/_Route.vue')
    },
    {
      path: '/routes',
      name: 'routes',
      component: () => import(/* webpackChunkName: "routes" */ '../views/routes/_MobileRoutes.vue')
    },
    {
      path: '/routes/all',
      name: 'all-routes',
      component: () => import(/* webpackChunkName: "routes" */ '../views/routes/_Routes.vue')
    },
    {
      path: '/tags/:tag',
      name: 'tag',
      component: () => import(/* webpackChunkName: "routes" */ '../views/routes/_Tag.vue')
    },
    {
      path: '/competitions',
      name: 'competitions',
      component: () => import(/* webpackChunkName: "competitions" */ '../views/competitions/_Competitions.vue')
    },
    {
      path: '/competitions/:competition',
      name: 'competition',
      component: () => import(/* webpackChunkName: "competitions" */ '../views/competitions/_Competition.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import(/* webpackChunkName: "general" */ '../views/_Settings.vue')
    }
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
