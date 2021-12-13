<!--
 * @Author: your name
 * @Date: 2021-12-12 12:37:59
 * @LastEditTime: 2021-12-13 17:24:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\login\login.vue
-->
<template>
  <div class="login">
    <el-form :label-position="labelPosition" label-width="auto" class="form">
      <el-form-item label="邮箱:" prop="userName">
        <el-input v-model="form.userName" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="验证码:">
        <el-row :gutter="14">
          <el-col :span="17">
            <el-input v-model="form.code" placeholder="请输入验证码" />
          </el-col>
          <el-col :span="7">
            <el-button type="success" @click="getCode">获取验证码</el-button>
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

<script>
import { defineComponent, reactive } from "vue";
import { GetCode } from "../../api/login/login";
export default defineComponent({
  setup() {
    const labelPosition = "right";
    const form = reactive({
      userName: "",
      password: "",
      code: "",
    });
    const submit = () => {
      if (form.code || form.userName || form.password === "") {
      }
      console.log(form);
    };
    /**
     * @description: 获取验证码
     * @param {*} code
     * @return {*}
     */
    const getCode = () => {
      let obj = {};
      obj.module = "login";
      obj.userName = form.userName;
      console.log(obj);
      GetCode(obj).then((res) => {
        console.log(res);
      });
    };
    return {
      labelPosition,
      form,
      submit,
      getCode,
    };
  },
});
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
  margin-left: 100%;
  width: 77%;
}
.el-form-item__label {
  color: #fff;
}
</style>