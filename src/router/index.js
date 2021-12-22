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
        path: '/sys',
        name: 'sys',
        redirect: 'user',
        component: () => import('../views/layout/layout.vue'),
        meta: {
            name: '首页'
        },
        children: [
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/setting/user/index.vue'),
                meta: {
                    name: '管理员列表'
                }
            },
            {
                path: '/role',
                name: 'role',
                component: () => import('../views/setting/role/index.vue'),
                meta: {
                    name: '角色管理'
                }
            },
            {
                path: '/menu',
                name: 'menu',
                component: () => import('../views/setting/menu/index.vue'),
                meta: {
                    name: '菜单管理'
                }
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/setting/user/index.vue'),
                meta: {
                    name: 'SQL监控'
                }
            },
            {
                path: '/schedule',
                name: 'schedule',
                component: () => import('../views/setting/schedule/index.vue'),
                meta: {
                    name: '定时任务'
                }
            },
            {
                path: '/config',
                name: 'config',
                component: () => import('../views/setting/config/index.vue'),
                meta: {
                    name: '参数管理'
                }
            },
            {
                path: '/log',
                name: 'log',
                component: () => import('../views/setting/log/index.vue'),
                meta: {
                    name: '系统日志'
                }
            },
            {
                path: '/oss',
                name: 'oss',
                component: () => import('../views/setting/oss/index.vue'),
                meta: {
                    name: '文件上传'
                }
            }
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
