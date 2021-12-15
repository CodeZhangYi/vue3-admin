<!--
 * @Author: your name
 * @Date: 2021-12-15 14:22:30
 * @LastEditTime: 2021-12-15 15:07:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/components/code/code.vue
-->
<template>
  <el-row>
    <el-col :span="11">
      <el-input
        placeholder="请输入验证码"
        style="width: 98%"
        v-model="form.code"
      />
    </el-col>
    <el-col :span="13">
      <el-button type="success" @click="getCode" :disabled="codeDisabled">{{
        codeText
      }}</el-button>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, ref } from "vue";
import { GetCode } from "../../api/login/login";
import { ElMessage } from "element-plus";
const form = reactive({
  userName: "410293095@qq.com",
  password: "",
  code: "",
});
const codeText = ref("获取验证码");
const codeDisabled = ref(false);
const props = defineProps({
  username: String,
  module: String,
  code:String
});
//  获取验证码
const getCode = () => {
  GetCode({ module: props.module, username: props.username }).then((res) => {
    if (res.data.resCode === 0) {
      ElMessage.success(res.data.message);
    } else {
      ElMessage.error(res.data.message);
    }
    countDown();
  });
};
// 验证码倒计时
const countDown = () => {
  let sec = 60;
  let timer = null;
  codeDisabled.value = true;
  codeText.value = 60;
  timer = setInterval(() => {
    sec--;
    if (sec <= 0) {
      clearInterval(timer);
      codeDisabled.value = false;
      codeText.value = "重新获取";
    } else {
      codeText.value = `${sec}s`;
    }
  }, 1000);
};
</script>
<style scoped lang="scss">
</style>