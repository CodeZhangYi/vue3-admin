<!--
 * @Author: your name
 * @Date: 2021-12-23 10:55:13
 * @LastEditTime: 2021-12-27 16:01:40
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
      <menu-form @form="getForm" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialog = false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, watch, getCurrentInstance, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import menuForm from "./menuForm.vue";
import { addMenu } from "@/api/sys/menu.js";
import bus from "vue3-eventbus";
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
    let { type } = props.types;
    type === "edit"
      ? (title.value = "修改")
      : type === "del"
      ? (title.value = "删除")
      : (title.value = "新增");
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
const form = ref({});
/**
 * @description: 获取子组件传来form表单对象
 * @param {*} forms为form传来表单对象
 * @return {*}
 */
const getForm = (forms) => {
  form.value = forms.value;
};
const submit = () => {
  addMenu(form.value).then((res) => {
    let { data } = res;
    bus.emit("res", res); //把添加后状态通过bug传给table组件告知table是否添加/修改成功
    if (data.code === 0) {
      ElMessage.success("新增菜单成功");
      isDialog.value = false;
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
</script>
<style scoped>
</style>