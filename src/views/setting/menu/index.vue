<!--
 * @Author: your name
 * @Date: 2021-12-22 10:13:05
 * @LastEditTime: 2021-12-22 18:07:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE1
 * @FilePath: /vue3-admin/src/views/setting/menu/index.vue
-->
<template>
  <div class="mod-menu">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary">新增</el-button>
      </el-form-item>
    </el-form>
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
      <!-- <template slot-scope="scope">
          <el-button  type="text" size="small" >修改</el-button>
          <el-button type="text" size="small" >删除</el-button>
        </template> -->
      <!-- </el-table-column> -->
    </el-table>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue-demi";
import { menuList } from "../../../api/sys/menu";
import { treeDataTranslate } from "../../../utils/index";
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
const getList = () => {
  //获取menu列表
  menuList().then((res) => {
    let { status, data } = res;
    if (status === 200) {
      list.value = treeDataTranslate(data, "menuId"); //转树结构
    } else {
      ElMessage.error(res.statusText);
    }
  });
};
</script>
<style scoped>
.mod-menu {
  height: 100%;
}
</style>