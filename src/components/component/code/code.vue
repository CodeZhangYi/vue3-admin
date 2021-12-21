<!--
 * @Author: your name
 * @Date: 2021-12-15 14:22:30
 * @LastEditTime: 2021-12-21 16:13:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/components/code/code.vue
-->
<template>
  <el-row :gutter="20">
    <el-col :span="15">
      <el-input placeholder="请输入验证码" v-model="form.captcha" />
    </el-col>
    <el-col :span="9">
      <div class="login-code">
        <img :src="codeUrl" @click="getCodeImage" class="login-code-img" />
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import { reactive, ref, watch, getCurrentInstance } from "vue";
import { onMounted } from "vue"; //生命周期
const props = defineProps({
  username: String,
  module: String,
  captcha: String,
});
const app = getCurrentInstance(); //获取vue组件实例
const form = reactive({ captcha: "" });
watch(
  () => form.captcha,
  (newVal) => {
    app.emit("code", newVal); //拿到实例对象 通过实例对象的emit传给父组件code值
  }
);
onMounted(() => {
  getCodeImage();
});
const codeUrl = ref("captcha.jpg");
const getCodeImage = () => {
  /**
   * @description: 显示验证码逻辑：生成uuid 拿到baseurl拼接上接口和uuid就可以展示验证码
   * 点击刷新验证码 给img点击事件 调用函数
   */
  let uuid = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
  codeUrl.value = `${BASEURL}/captcha.jpg?uuid=${uuid}`;
  app.emit("uuid", uuid); 
};
</script>
<style scoped lang="scss">
.login-code {
  width: 100%;
  height: 38px;
  img {
    cursor: pointer;
    width: 100%;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 38px;
}
</style>