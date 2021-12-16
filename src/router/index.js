/*
 * @Author: your name
 * @Date: 2021-12-10 16:46:10
 * @LastEditTime: 2021-12-16 15:56:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'login',
        hidden: true,
        component: () => import('../views/login/login'),
        meta: {
            name: '登陆'
        }
    },
    {
        path: '/console',
        name: 'console',
        redirect: 'index',
        component: () => import('../views/layout/layout.vue'),
        meta: {
            name: '控制台'
        },
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('../views/console/console.vue'),
                meta: {
                    name: '首页'
                }
            }
        ]
    },
    // 信息管理
    {
        path: '/info',
        name: 'Info',
        meta: {
            name: '信息管理'
        },
        component: () => import('../views/layout/layout.vue'),
        children: [
            {
                path: '/info',
                name: 'Info',
                meta: {
                    name: '信息列表'
                },
                component: () => import('../views/info/info.vue'),
            },
            {
                path: '/category',
                name: 'category',
                meta: {
                    name: '信息分类'
                },
                component: () => import('../views/info/category.vue'),
            },

        ]
    },
    // 用户管理
    {
        path: '/info',
        name: 'Info',
        meta: {
            name: '用户管理'
        },
        component: () => import('../views/layout/layout.vue'),
        children: [
            {
                path: '/user',
                name: 'InfoIndex',
                meta: {
                    name: '用户列表'
                },
                component: () => import('../views/user/user.vue'),
            },

        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
