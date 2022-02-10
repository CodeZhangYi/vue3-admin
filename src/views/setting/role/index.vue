<template>
	<div>
		<div class="form">
			<el-input style="width:200px;margin:0 20px 0 0" placeholder="角色名称"></el-input>
			<el-button>查询</el-button>
			<el-button type="primary" @click="openAdd">新增</el-button>
			<el-button type="danger">批量删除</el-button>
		</div>
		<div class="table">
			<el-table :data="tableData.data" border style="width: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column prop="roleId" label="ID" width="80" align="center" />
				<el-table-column prop="roleName" label="角色名称" align="center" />
				<el-table-column prop="remark" label="备注" align="center" />
				<el-table-colum  n prop="createTime" label="创建时间" align="center" />
				<el-table-column label="操作" width="180" align="center">
					<template #default="scope">
						<el-button type="text" size="small">修改</el-button>
						<el-button type="text" size="small" @click="deleteRow(scope.row.roleId)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<FormInfo ref="refForm"></FormInfo>
	</div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import FormInfo from './components/index.vue'
import { GetRole,DeleteRole } from '@/api/role'
import { ElMessage } from "element-plus";

const tableData = reactive({
	data:[]
})
const refForm = ref(0)
const openAdd = () => {
	refForm.value.openDialog()
}
// 获取表格数据
const getRole = async () => {
	const res = await GetRole({
		page:1,
		limit:10
	})
	const {code,msg,page:data} = res.data
	code === 0 ?
	(
		tableData.data = data.list
	):
	(
		ElMessage.error(msg)
	)
}
// 删除单行角色
const deleteRow = async (id) => {
	let body = []
	body.push(id)
	const res = await DeleteRole(body)
	const {code,msg} = res.data
	code === 0 ?
	(
		ElMessage.success(msg),
		getRole()
	):
	(
		ElMessage.error(msg)
	)
}

onMounted(()=>{
	getRole()
})
</script>

<style lang="scss" scoped>
.form{
	margin: 0 0 20px;
}
/deep/ .el-button+.el-button{margin-left: 20px;}
</style>