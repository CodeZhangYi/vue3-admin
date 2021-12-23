<!--
 * @Author: your name
 * @Date: 2021-12-22 10:13:05
 * @LastEditTime: 2021-12-23 15:14:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE1
 * @FilePath: /vue3-admin/src/views/setting/menu/index.vue
-->
<template>
  <div class="mod-menu">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="changeOperation('add')"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表展示 -->
    <menuTable @changeOperation="changeOperation" />
    <!-- 新增/编辑弹框 -->
    <menuDialog
      :dialogVisible="dialogVisible"
      :types="types"
      @Dialog="Dialog"
    />
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import menuTable from "./components/table.vue";
import menuDialog from "./components/dialog.vue";
const dialogVisible = ref(false);
const types = ref(null);
const changeOperation = (data) => {
  types.value = data; //弹框类型传给子组件

  let { row, type } = data || "add";
  dialogVisible.value = true; //修改子组件弹框变量

  if (data === "add") {
  } else if (type === "del") {
  } else {
  }
};
const Dialog = (data) => {
  dialogVisible.value = data.value;
};
</script>
<style scoped>
.mod-menu {
  height: 100%;
}
</style>