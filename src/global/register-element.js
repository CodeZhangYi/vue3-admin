import { App } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export function globalRegister(App) {
    App.use(ElementPlus)
}