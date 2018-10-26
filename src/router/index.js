import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    // redirect: '/example/table',
    name: 'User',
    // meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/mall',
    component: Layout,
    name: 'Mall',
    meta: { title: '商城管理', icon: 'form' },
    children: [
      {
        path: 'order',
        component: () => import('@/views/mall/order/index'),
        name: 'Order',
        meta: { title: '订单管理' },
        children: [
          {
            path: 'orderList',
            component: () => import('@/views/mall/order/orderList'),
            name: 'OrderList',
            meta: { title: '订单列表' }
          },
          {
            path: 'refundOrder',
            component: () => import('@/views/mall/order/refundOrder'),
            name: 'RefundOrder',
            meta: { title: '退款订单' }
          }
        ]
      },
      {
        path: 'product',
        component: () => import('@/views/mall/product/index'),
        name: 'Product',
        meta: { title: '商品管理' },
        children: [
          {
            path: 'productList',
            component: () => import('@/views/mall/product/productList'),
            name: 'ProductList',
            meta: { title: '商品列表' }
          },
          {
            path: 'addProduct',
            component: () => import('@/views/mall/product/addProduct'),
            name: 'AddProduct',
            meta: { title: '添加商品' }
          }
        ]
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
