<!--
 * @Author: your name
 * @Date: 2021-12-12 12:37:59
 * @LastEditTime: 2021-12-21 16:14:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\login\login.vue
-->
<template>
  <div class="login">
    <el-form label-width="auto" class="form">
      <el-form-item prop="userName">
        <el-input v-model="form.username" placeholder="请输入用户名" />
        <!-- 浏览器会为input默认填充数据 在input下加一个input隐藏即可 -->
        <input
          type="password"
          autocomplete="new-password"
          style="display: none"
        />
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item>
        <!--                获取验证码-->
        <Code
          :username="form.username"
          :module="form.module"
          :code="form.captcha"
          @code="code"
          @uuid="uuid"
        />
      </el-form-item>
      <el-form-item>
        <!--        登录-->
        <LoginBtn :form="form" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
// components
import Code from "../../components/component/code/code.vue";
import LoginBtn from "../../components/component/login/loginBtn";

components: {
  Code;
  LoginBtn;
}
const form = reactive({
  username: "admin",
  password: "admin",
  captcha: "",
  uuid: "",
});
const code = (data) => {
  //code组件拿到验证码赋值form传给login组件
  form.captcha = data;
  //   form.uuid = data
};
const uuid = (uuid) => {
  form.uuid = uuid;
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #344a5f;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 60vh;
  }
}
</style>
