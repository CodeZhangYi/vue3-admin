<template>
	<el-dialog v-model="dialogFormVisible" title="新增">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
			<el-form-item label="授权" :label-width="formLabelWidth">
        <el-tree
					:data="menuList"
					show-checkbox
					node-key="id"
					:props="defaultProps"
				/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { GetRoleList } from '@/api/role'

export default defineComponent({
	setup(){
		const state = reactive({
			dialogFormVisible:false,
			form:{
				roleId:'',
				roleName: '',
        remark: '',
        menuIdList: [],
			},
			menuList:[],
      formLabelWidth: '120px',
		})

		return {
      ...toRefs(state),
    }
	},
	methods:{
		async getRoleList(){
			const res = await GetRoleList()
			console.log(res)
		},
		// 提交表单
		onSubmit(){
			console.log(this.form)
		},
	},
	mounted(){
		this.getRoleList()
	}
})
</script>