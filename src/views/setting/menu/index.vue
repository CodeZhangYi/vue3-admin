<!--
 * @Author: your name
 * @Date: 2021-12-22 10:13:05
 * @LastEditTime: 2021-12-27 16:26:30
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
import { delMenu } from "@/api/sys/menu.js";
import { ElMessage } from "element-plus";
import bus from "vue3-eventbus";
const dialogVisible = ref(false);
const types = ref(null);
const code = ref(Number);
const changeOperation = (data) => {
  types.value = data; //弹框类型传给子组件

  let { row, type } = data || "add";

  if (data === "add") {
    dialogVisible.value = true; //修改子组件弹框变量
  } else if (type === "del") {
    let { menuId } = row;
    delMenu(menuId).then((res) => {
      console.log(res);
      let { code, msg } = res.data;
      if (code === 0) {
        ElMessage.success("删除成功~");
        code = code;
        bus.emit("code", code);
      } else {
        ElMessage.error(msg);
      }
    });
  } else {
    dialogVisible.value = true; //修改子组件弹框变量
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