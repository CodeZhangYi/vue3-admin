<!--
 * @Author: your name
 * @Date: 2021-12-12 12:37:59
 * @LastEditTime: 2021-12-15 14:16:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\login\login.vue
-->
<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="auto" class="form">
      <el-form-item prop="userName">
        <el-input
          v-model="form.userName"
          placeholder="请输入用户名"
          style="width: 70%"
        />
        <!-- 浏览器会为input默认填充数据 在input下加一个input隐藏即可 -->
        <input
          type="password"
          autocomplete="new-password"
          style="display: none"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          style="width: 70%"
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="11">
            <el-input
              v-model="form.code"
              placeholder="请输入验证码"
              style="width: 98%"
            />
          </el-col>
          <el-col :span="13">
            <el-button
              type="success"
              @click="getCode"
              :disabled="codeDisabled"
              >{{ codeText }}</el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="9">
        <el-button type="primary" class="login-btn" @click="submit"
          >登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { GetCode } from "../../api/login/login";
import { ElMessage } from "element-plus";
const labelPosition = "right";
const form = reactive({
  userName: "410293095@qq.com",
  password: "",
  code: "",
});
const submit = () => {
  for (let item in form) {
    //登陆前判断用户是否把登陆框信息输入完整
    if (!form[item]) return ElMessage.info("请完善输入框信息～");
  }
};
/**
 * @description: 获取验证码
 * @param {*} code
 * @return {*}
 */
const codeText = ref("获取验证码");
const codeDisabled = ref(false);
const getCode = () => {
  let obj = {};
  obj.module = "login";
  obj.username = form.userName;
  GetCode(obj).then((res) => {
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


<style lang="scss">
.login {
  height: 100%;
  background-color: #344a5f;
}

.form {
  width: 60vh;
  margin: 0 auto;
  margin-top: 100px;
}
.login-btn {
  display: block;
  margin-left: 90%;
  width: 60%;
}
.el-form-item__label {
  color: #fff;
}
</style>