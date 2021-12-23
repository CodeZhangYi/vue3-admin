<!--
 * @Author:张熠
 * @Date: 2021-12-23 09:50:49
 * @LastEditTime: 2021-12-23 10:49:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/setting/menu/components/table.vue
-->
<template>
  <div>
    <el-table :data="list" row-key="menuId" border style="width: 100%">
      <el-table-column
        v-for="item in menuTab"
        :prop="item.tabProp"
        :label="item.label"
        :key="item.label"
        :show-overflow-tooltip="true"
      >
        <template #default="{ row }">
          {{
            item.tabProp === "type"
              ? row.type === 0
                ? "目录"
                : row.type === 1
                ? "菜单"
                : "按钮"
              : row[item.tabProp]
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            type="text"
            size="small"
            @click="changeOperation(row, 'edit')"
            >修改</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="changeOperation(row, 'del')"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { menuList } from "../../../../api/sys/menu";
import { treeDataTranslate } from "../../../../utils/index";
// 获取列表
onMounted(() => {
  getList();
});
const menuTab = reactive([
  { label: "名称", tabProp: "name" },
  { label: "上级菜单", tabProp: "parentName" },
  { label: "图标", tabProp: "icon" },
  { label: "类型", tabProp: "type" },
  { label: "排序号", tabProp: "orderNum" },
  { label: "菜单URL", tabProp: "url" },
  { label: "授权标识", tabProp: "perms" },
]);
const list = ref([]);
//获取menu列表
const getList = () => {
  menuList().then((res) => {
    let { status, data } = res;
    if (status === 200) {
      list.value = treeDataTranslate(data, "menuId"); //转树结构
    } else {
      ElMessage.error(res.statusText);
    }
  });
};
const app = getCurrentInstance();
// 事件操作
const changeOperation = (row, type) => {
  let obj = {
    row,
    type,
  };
  app.emit("changeOperation", obj);
};
</script>
<style scoped>
</style>