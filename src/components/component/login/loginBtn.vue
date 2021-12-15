<template>
    <el-row>
        <el-col :span="9">
            <el-button type="primary" class="login-btn" @click="submit"
            >登录
            </el-button
            >
        </el-col>
    </el-row>
</template>

<script setup>
    import {ElMessage} from "element-plus";
    import {loginCode} from "../../../api/login/login";

    const props = defineProps({
        form: Object
    })
    const submit = () => {
        delete props.form.module
        let form = props.form;
        for (let item in form) {
            //登陆前判断用户是否把登陆框信息输入完整
            if (!form[item]) return ElMessage.info("请完善输入框信息～");
        }
        loginCode(form).then((res) => {
            if (res.data.resCode === 0) {
                ElMessage.success('登录成功')
            } else {
                ElMessage.error(res.data.message)
            }
        });
    };
</script>

<style scoped>
    .login-btn {
        display: block;
        margin-left: 90%;
        width: 60%;
    }
</style>