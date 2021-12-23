<!--
 * @Author: your name
 * @Date: 2021-12-16 11:15:19
 * @LastEditTime: 2021-12-22 16:43:17
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/layout/components/Main.vue
-->
<template>
  <div class="main-wrap">
    <router-view />
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';
.main-wrap {
  position: fixed;
  left: $myWidth;
  top: 75px;
  right: 0;
  bottom: 0;
  padding: 30px;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  -webkit-box-sizing: border;
  overflow-y: scroll;
}
</style>