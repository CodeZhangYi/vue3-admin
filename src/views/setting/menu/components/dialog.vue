<!--
 * @Author: your name
 * @Date: 2021-12-23 10:55:13
 * @LastEditTime: 2021-12-23 17:02:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/setting/menu/components/dialog.vue
-->
<template>
  <div>
    <el-dialog
      v-model="isDialog"
      :title="title"
      width="40%"
      :before-close="handleClose"
    >
      <menu-form />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialog = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, watch, getCurrentInstance, reactive } from "vue";
import { ElMessageBox } from "element-plus";
import menuForm from "./menuForm.vue";
const app = getCurrentInstance();
const props = defineProps({
  dialogVisible: Boolean,
  types: Object,
});
const isDialog = ref(false);
// 监听父组件传来dialogVisible
watch(
  () => props.dialogVisible,
  (newVal) => {
    isDialog.value = newVal;
  }
);
// 监听弹框变量 传给父组件修改父组件状态
watch(
  () => isDialog.value,
  (newVal) => {
    isDialog.value = newVal;
    app.emit("Dialog", isDialog);
  }
);
const data = reactive({});
const title = ref(null); //控制弹框标题
watch(
  () => props.types,
  (newVal) => {
    data.value = newVal;
    if (data.value.type ?? data.value === "edit") {
      title.value = "修改";
    } else if (data.value.type ?? data.value === "del") {
      title.value = "删除";
    } else {
      title.value = "新增";
    }
  }
);

const handleClose = (done) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>
<style scoped>
</style>