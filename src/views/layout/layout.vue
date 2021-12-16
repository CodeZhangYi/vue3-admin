<!--
 * @Author: your name
 * @Date: 2021-12-16 11:12:40
 * @LastEditTime: 2021-12-16 11:35:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/layout/layout.vue
-->
<template>
  <div>
    <Header />
    <Main />
    <Nav />
  </div>
</template>
<script setup>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Nav from "./components/Nav.vue";
components: {
  Header, Main, Nav;
}
</script>
<style lang="scss" scoped>
</style>