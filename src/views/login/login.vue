<!--
 * @Author: your name
 * @Date: 2021-12-12 12:37:59
 * @LastEditTime: 2021-12-12 21:14:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\login\login.vue
-->
<template>
  <div class="login">
    <el-form
      :label-position="labelPosition"
      label-width="auto"
      :model="form"
      :rules="rules"
      class="form"
    >
      <el-form-item label="邮箱:" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item label="验证码:">
        <el-row :gutter="14">
          <el-col :span="15">
            <el-input v-model="form.code" />
          </el-col>
          <el-col :span="7">
            <el-button type="success">获取验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="login-btn">登录</el-button>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const labelPosition = "right";
    const form = {
      userName: "",
      password: "",
      code: "",
    };
    const rules = {
      userName: [
        {
          required: true,
          message: "请输入正确的邮箱地址",
          trigger: "blur",
        },
      ],
    };
    return {
      labelPosition,
      form,
      rules,
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
  width: 24%;
  display: block;
  margin-left: 40%;
}
.el-form-item__label {
  color: #fff;
}
</style>