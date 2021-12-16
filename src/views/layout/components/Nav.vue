<!--
 * @Author: your name
 * @Date: 2021-12-16 11:15:33
 * @LastEditTime: 2021-12-16 17:08:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/layout/components/Nav.vue
-->
<template>
  <div class="nav-wrap">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#000"
      router
    >
      <template v-for="(item, index) in routes" :key="item.id">
        <el-sub-menu :index="index + ''" v-if="!item.hidden">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="(subItem, index) in item.children"
            :key="index"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script setup>
//elMenu图标
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const useRouters = useRouter(); //获取路由数组
let { routes } = useRouters.options;
// console.log(routes);
// const handleOpen = (key, keyPath) => {
//   //   console.log(key, keyPath);
// };
// const handleClose = (key, keyPath) => {
//   //   console.log(key, keyPath);
// };
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";

.nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $myWidth;
  height: 100vh;
  background-color: #344a5f;
}
</style>