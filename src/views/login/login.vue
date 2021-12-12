<template>
    <div class="login">Login
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped lang="scss">
.login {
    height: 100vh;
    background-color: #344a5f;
}
</style>