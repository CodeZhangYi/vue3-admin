<!--
 * @Author: your name
 * @Date: 2021-12-15 14:22:30
 * @LastEditTime: 2021-12-16 10:43:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/components/code/code.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="15">
      <el-input
        placeholder="请输入验证码"
        v-model="form.code"
      />
    </el-col>
    <el-col :span="9">
      <el-button style="width:100%" type="success" @click="getCode" :disabled="codeDisabled"
        >{{ codeText }}
      </el-button>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, ref, watch, getCurrentInstance } from "vue";
import { GetCode } from "../../../api/login/login";
import { ElMessage } from "element-plus";

const codeText = ref("获取验证码");
const codeDisabled = ref(false);
const props = defineProps({
  username: String,
  module: String,
  code: String,
});
const app = getCurrentInstance(); //获取vue组件实例
const form = reactive({ code: "" });
watch(
  () => form.code,
  (newVal) => {
    app.emit("code", newVal); //拿到实例对象 通过实例对象的emit传给父组件code值
  }
);
//    getCode
const getCode = () => {
  GetCode({ module: props.module, username: props.username }).then((res) => {
    ElMessage.success(res.data.message);
  });
  countDown();
};
const countDown = () => {
  let sec = 60;
  let timer = null;
  codeDisabled.value = true;
  codeText.value = 60;
  timer = setInterval(() => {
    sec--;
    if (sec <= 0) {
      clearInterval(timer);
      codeText.value = "重新获取";
      codeDisabled.value = false;
    } else {
      codeText.value = `${sec}s`;
    }
  }, 1000);
};
</script>