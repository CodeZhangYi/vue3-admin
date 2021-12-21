<!--
 * @Author: your name
 * @Date: 2021-12-16 11:15:33
 * @LastEditTime: 2021-12-21 17:51:36
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
      <template v-for="(item, index) in routes" :key="item.menuId">
        <el-sub-menu :index="index + ''">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <!-- {{item.list}} -->
          <el-menu-item
            v-for="(subItem, index) in item.list"
            :key="index"
            :index="subItem.url"
            >{{ subItem.name }}</el-menu-item
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
// import { useRouter } from "vue-router";
import { getRoutes } from "../../../utils/cookies";
// routes 存储在本地 取出来渲染
const routes = getRoutes();
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