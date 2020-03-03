import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'iconfont icon-jijin' }
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('@/views/list/index.vue'),
        meta: { title: '收支明细', icon: 'iconfont icon-jijin' }
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '系统设置', icon: 'iconfont icon-jijin' }
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
