<template>
	<div>
		<div class="form">
			<el-input style="width:200px;margin:0 20px 0 0" placeholder="角色名称"></el-input>
			<el-button>查询</el-button>
			<el-button type="primary" @click="openAdd">新增</el-button>
			<el-button type="danger">批量删除</el-button>
		</div>
		<div class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column prop="ID" label="ID" width="80" align="center" />
				<el-table-column prop="ID" label="角色名称" align="center" />
				<el-table-column prop="ID" label="备注" align="center" />
				<el-table-column prop="ID" label="创建时间" align="center" />
				<el-table-column prop="ID" label="操作" width="180" align="center" />
			</el-table>
		</div>
		<FormInfo ref="refForm"></FormInfo>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import FormInfo from './components/index.vue'

const tableData = []
const refForm = ref(0)
const openAdd = () => {
	refForm.value.openDialog()
}
</script>

<style lang="scss" scoped>
.form{
	margin: 0 0 20px;
}
/deep/ .el-button+.el-button{margin-left: 20px;}
</style>