<!--
 * @Author: your name
 * @Date: 2021-12-16 09:14:33
 * @LastEditTime: 2021-12-16 10:46:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/components/component/login/loginBtn.vue
-->
<template>
  <el-button style="width:100%" type="primary" @click="submit"
    >登录
  </el-button>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { loginCode } from "../../../api/login/login";

const props = defineProps({
  form: Object,
});
const router = useRouter(); //引入路由
const submit = () => {
  delete props.form.module;
  let form = props.form;
  for (let item in form) {
    //登陆前判断用户是否把登陆框信息输入完整
    if (!form[item]) return ElMessage.info("请完善输入框信息～");
  }
  loginCode(form).then((res) => {
    if (res.data.resCode === 0) {
      ElMessage.success("登录成功");
      router.push({ name: "console" });
    } else {
      ElMessage.error(res.data.message);
    }
  });
};
</script>