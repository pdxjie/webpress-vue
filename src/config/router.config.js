// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/analysis',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: false, icon: bxAnaalyse, permission: [ 'dashboard' ] },
        children: [
          {
            path: 'analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: [ 'dashboard' ] }
          }
        ]
      },
      {
        path: '/personal',
        name: 'personal',
        component: RouteView,
        redirect: '/personal/center',
        meta: { title: '用户管理', icon: 'user', keepAlive: false },
        children: [
          {
            path: '/personal/center',
            name: 'center',
            component: () => import('@/views/personal/index'),
            meta: { title: '用户列表', keepAlive: false }
          }
        ]
      },
      {
        path: '/article',
        name: 'article',
        component: RouteView,
        redirect: '/article/center',
        meta: { title: '内容管理', icon: 'file-markdown', keepAlive: false },
        children: [
          {
            path: '/article/center',
            name: 'articleCenter',
            component: () => import('@/views/article/index'),
            meta: { title: '内容列表', keepAlive: false }
          },
          {
            path: '/article/operate',
            name: 'articleOperate',
            hidden: true,
            component: () => import('@/views/article/components/OperateArticle'),
            meta: { title: '操作内容', keepAlive: false }
          }
        ]
      },
      {
        path: '/dic',
        name: 'dictionary',
        component: RouteView,
        redirect: '/dic/center',
        meta: { title: '字典管理', icon: 'tags', keepAlive: false },
        children: [
          {
            path: '/dic/center',
            name: 'dicCenter',
            component: () => import('@/views/dictionary/index'),
            meta: { title: '字典列表', keepAlive: false }
          }
        ]
      },
      {
        path: '/category',
        name: 'category',
        component: RouteView,
        redirect: '/category/center',
        meta: { title: '分类管理', icon: 'pull-request', keepAlive: false },
        children: [
          {
            path: '/category/center',
            name: 'categoryCenter',
            component: () => import('@/views/category/index'),
            meta: { title: '分类列表', keepAlive: false }
          }
        ]
      },
      {
        path: '/banner',
        name: 'banner',
        component: RouteView,
        redirect: '/banner/center',
        meta: { title: '轮播图管理', icon: 'switcher', keepAlive: false },
        children: [
          {
            path: '/banner/center',
            name: 'bannerCenter',
            component: () => import('@/views/banner/index'),
            meta: { title: '轮播图列表', keepAlive: false }
          }
        ]
      },
      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        hidden: true,
        meta: { title: '异常页', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true, permission: [ 'user' ] }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: [ 'user' ] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('@/views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import('@/views/account/settings/Binding'),
                meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import('@/views/account/settings/Notification'),
                meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
