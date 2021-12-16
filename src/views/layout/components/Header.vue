<!--
 * @Author: your name
 * @Date: 2021-12-16 11:14:47
 * @LastEditTime: 2021-12-16 13:42:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/layout/components/Header.vue
-->
<template>
  <div class="header-wrap">头部</div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';

.header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $myWidth;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>