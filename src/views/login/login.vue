<!--
 * @Author: your name
 * @Date: 2021-12-12 12:37:59
 * @LastEditTime: 2021-12-15 18:17:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue3-admin\src\views\login\login.vue
-->
<template>
    <div class="login">
        <el-form :label-position="labelPosition" label-width="auto" class="form">
            <el-form-item prop="userName">
                <el-input
                        v-model="form.username"
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
                <!--                获取验证码-->
                <Code :username="form.username" :module="form.module" :code="form.code" @code="code"/>
            </el-form-item>
        </el-form>
        <!--        登录-->
        <LoginBtn :form="form"/>
    </div>
</template>

<script setup>
    import {reactive} from "vue";
    // components
    import Code from "../../components/component/code/code.vue";
    import LoginBtn from '../../components/component/login/loginBtn'

    components: {
        Code;
        LoginBtn
    }
    const labelPosition = "right";
    const form = reactive({
        username: "2876043242@qq.com",
        password: "123123q",
        code: "",
        module: 'login'
    });
    const code = data => {
        //code组件拿到验证码赋值form传给login组件
        form.code = data;
    }
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


    .el-form-item__label {
        color: #fff;
    }
</style>