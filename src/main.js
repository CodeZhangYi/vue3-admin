/*
 * @Author: 张熠
 * @Date: 2021-12-10 16:46:10
 * @LastEditTime: 2021-12-13 15:04:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/main.js
 */
import { createApp } from 'vue'
// import vueCompositionApi from '@vue/composition-api'
import 'normalize.css/normalize.css' //初始化浏览器默认样式
import App from './App.vue'
import router from './router'
import store from './store'
import { globalRegister } from './global/register-element'
createApp(App).use(store).use(router).use(globalRegister).mount('#app')
