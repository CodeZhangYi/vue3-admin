/*
 * @Author: your name
 * @Date: 2021-12-10 16:46:10
 * @LastEditTime: 2021-12-16 10:39:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/router/index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('../views/login/login')
    },
    {
        path: '/console',
        name: 'console',
        component: () => import('../views/console/console.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
