<template>
	<el-dialog v-model="dialogFormVisible" title="新增">
    <el-form :model="form" :rules="rules">
      <el-form-item label="角色名称" :label-width="formLabelWidth" prop='roleName'>
        <el-input v-model="form.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
			<el-form-item label="授权" :label-width="formLabelWidth">
        <el-tree
					ref="tree"
					:data="menuList"
					show-checkbox
    			default-expand-all
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
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { GetMenuList, SaveRole } from '@/api/role'
import { ElMessage } from "element-plus";

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
			rules:{
				roleName:[
					{
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          }
				]
			},
			menuList:[],
      formLabelWidth: '120px',
			defaultProps: {
        children: 'children',
        label: 'name',
      },
		})
		const tree = ref(0)
		const openDialog = async () => {
			state.dialogFormVisible = true
			await getMenuList()
		}
		// 初始化授权菜单
		const getMenuList = async () => {
			const res = await GetMenuList()
			const { data } = res
			data.length && (state.menuList = filterTreeData(data))
			console.log(state.menuList)
		}
		// 扁平数据转树状
		const filterTreeData = arr => {
			const result = [] // 存放结果集
			const itemMap = {} // 存放当前对象
			for(let item of arr){
				let id = item.menuId
				let pid = item.parentId
				if(!itemMap[id]){
					itemMap[id] = {
						children:[]
					}
				}
				itemMap[id] = {
					...item,
					children:itemMap[id].children
				}
				if(pid === 0){
					result.push(itemMap[id])
				}else{
					itemMap[pid].children.push(itemMap[id])
				}
			}
			return result
		}
		// 提交表单
		const onSubmit = async () => {
			let temp = []
			tree.value.getCheckedNodes().forEach(item=>temp.push(item.menuId))
			state.form.menuIdList = temp
			const { roleName,remark,menuIdList } = state.form
			// return console.log(menuIdList)
			const res = await SaveRole({
				roleName,
				remark,
				menuIdList
			})
			res.data.code === 200 ? 
			(
				ElMessage.success(res.data.message),
				state.dialogFormVisible = false
			):
			(
				console.log(res.data),
				ElMessage.error(res.data.message)
			)
		}
		return {
			tree,
      ...toRefs(state),
			openDialog,
			onSubmit
    }
	},
})
</script>