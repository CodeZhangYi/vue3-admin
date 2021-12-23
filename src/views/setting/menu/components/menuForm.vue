<!--
 * @Author: your name
 * @Date: 2021-12-23 16:48:03
 * @LastEditTime: 2021-12-23 18:30:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/setting/menu/components/menuForm.vue
-->
<template>
  <div>
    <el-form :model="form" label-width="auto" label-position="right">
      <el-form-item label="类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio
            v-for="(type, index) in form.typeList"
            :key="index"
            :label="index"
            >{{ type }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <!-- 
    <el-form-item label="上级菜单" prop="parentName">
        <el-popover
          ref="menuListPopover"
          placement="bottom-start"
          trigger="click">
          <el-tree
            :data="menuList"
            :props="menuListTreeProps"
            node-key="menuId"
            ref="menuListTree"
            @current-change="menuListTreeCurrentChangeHandle"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false">
          </el-tree>
        </el-popover>
        <el-input v-model="dataForm.parentName" v-popover:menuListPopover :readonly="true" placeholder="点击选择上级菜单" class="menu-list__input"></el-input>
      </el-form-item>
       -->
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
const form = reactive({
  from: {
    type: 1,
    typeList: ["目录", "菜单", "按钮"],
  },
});

//     // menuId (integer, optional): 菜单ID ,
//     // name (string, optional): 菜单名称 ,
//     // parentId (integer, optional): 父菜单ID，一级菜单为0 ,
//     // url (string, optional): 菜单URL ,
//     // perms (string, optional): 授权标识 ,
//     // type (integer, optional): 类型 0：目录 1：菜单 2：按钮 ,
//     // icon (string, optional): 菜单图标 ,
//     // orderNum (integer, optional): 排序
//   },
// );
</script>
<style scoped>
</style>