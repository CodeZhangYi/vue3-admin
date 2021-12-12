/*
 * @Author: your name
 * @Date: 2021-12-12 16:59:47
 * @LastEditTime: 2021-12-12 20:21:08
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\global\register-element.js
 */
import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export function globalRegister(App) {
    App.use(ElementPlus)
}