<!--
 * @Author: your name
 * @Date: 2021-12-23 16:48:03
 * @LastEditTime: 2021-12-27 11:36:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/setting/menu/components/menuForm.vue
-->
<template>
  <div>
    <el-form  :model="form" label-width="auto" label-position="right">
      <el-form-item label="类型:">
        <el-radio-group v-model="form.type">
          <el-radio :label="0">目录</el-radio>
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentName">
        <el-input
          v-model="form.parentName"
          placeholder="点击选择上级菜单"
          v-popover:menuListPopover
          class="menu-list__input"
        ></el-input>
        <el-popover
          placement="bottom"
          title="Title"
          :width="200"
          trigger="manual"
          ref="menuListPopover"
        >
          <template #reference>
            <el-tree
              :data="menuList"
              :props="menuListTreeProps"
              node-key="menuId"
              ref="menuListTree"
              @current-change="menuListTreeCurrentChangeHandle"
            >
            </el-tree>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item v-if="form.type === 1" label="菜单路由" prop="url">
        <el-input v-model="form.url" placeholder="菜单路由"></el-input>
      </el-form-item>
      <el-form-item v-if="form.type !== 0" label="授权标识" prop="perms">
        <el-input
          v-model="form.perms"
          placeholder="多个用逗号分隔, 如: user:list,user:create"
        ></el-input>
      </el-form-item>
      <el-form-item v-if="form.type !== 2" label="排序号" prop="orderNum">
        <el-input-number
          v-model="form.orderNum"
          controls-position="right"
          :min="0"
          label="排序号"
        ></el-input-number>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, onMounted ,getCurrentInstance} from "vue";
import { menuSelect } from "@/api/sys/menu";
import { ElMessage } from "element-plus";
import { treeDataTranslate } from "@/utils";
import bus from "vue3-eventbus";
const app = getCurrentInstance()
const form = ref({});
form.value = {
  type: null,
  parentName: null,
  url: null, //菜单路由
  perms: null, //授权标识
  orderNum: null, //排序号
  name:null,
  parentId:null
};
const menuListTreeProps = ref({});
menuListTreeProps.value = {
  label: "name",
  children: "children",
};

onMounted(() => {
  menu();
});
const menuList = ref([]);
// 菜单下拉列表
const menu = () => {
  menuSelect().then((res) => {
    let { data } = res;
    if (data ?? data.code === 0) {
      menuList.value = treeDataTranslate(data.menuList, "menuId");
    } else {
      ElMessage.error(data.msg);
    }
  });
};
// 菜单选中树
const menuListTreeCurrentChangeHandle = (data, node) => {
  let { name, parentId } = data;
  form.value.parentName = name;
  form.value.parentId = parentId;
};
const handleNodeClick = (data) => {
  console.log(data);
};
const iconActiveHandle = (iconName) => {
  form.value.icon = iconName;
};
app.emit('form',form)
</script>
<style lang="scss">
.mod-menu {
  .menu-list__input,
  .icon-list__input {
    > .el-input__inner {
      cursor: pointer;
    }
  }
  &__icon-popover {
    width: 458px;
    overflow: hidden;
  }
  &__icon-inner {
    width: 478px;
    max-height: 258px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  &__icon-list {
    width: 458px;
    padding: 0;
    margin: -8px 0 0 -8px;
    > .el-button {
      padding: 8px;
      margin: 8px 0 0 8px;
      > span {
        display: inline-block;
        vertical-align: middle;
        width: 18px;
        height: 18px;
        font-size: 18px;
      }
    }
  }
  .icon-list__tips {
    font-size: 18px;
    text-align: center;
    color: #e6a23c;
    cursor: pointer;
  }
}
</style>
