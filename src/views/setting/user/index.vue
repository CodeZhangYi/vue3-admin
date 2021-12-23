<!--
 * @Author: your name
 * @Date: 2021-12-16 15:33:09
 * @LastEditTime: 2021-12-16 15:33:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /vue3-admin/src/views/info/info.vue
-->
<template>
	<div>
		<div class="form">
			<el-input style="width:200px;margin:0 20px 0 0" placeholder="用户名"></el-input>
			<el-button>查询</el-button>
			<el-button type="primary" @click="openAdd">新增</el-button>
			<el-button type="danger">批量删除</el-button>
		</div>
		<div class="table">
			<el-table  @selection-change="handleSelectionChange" :data="info.tableData" border style="width: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column prop="userId" label="ID" width="80" align="center" />
				<el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
				<el-table-column prop="status" label="状态" align="center" />
				<el-table-column prop="createTime" label="创建时间" width="180" align="center" />
				<el-table-column label="Operations" width="120">
          <template #default="scope">
            <el-button type="text" size="small" @click.prevent="modify(scope.$index, scope.row)" >修改</el-button>
            <el-button type="text" size="small" @click.prevent="deleteRow(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
			</el-table>
		</div>
    <selfDialog @cancel="cancel" @onSubmit='onSubmit' :dialogFormVisible='info.dialog'></selfDialog>
	</div>
</template>

<script >
import { reactive,defineComponent } from 'vue'
import {userList,deleteUser,success,warning} from '@/api/user/getInfo'
import { getToken } from "../../../utils/cookies";
import selfDialog from './components/selfDialog.vue'
import {ElMessage} from "element-plus";

export default defineComponent({
  components:{
      selfDialog
  },
  setup() {
    // mounted
    console.log(getToken())
    const info = reactive({
      tableData:[],
      dialog:false
    })
    //新增
    const openAdd = (() =>{       
      console.log(info.tableData[0])
      info.dialog = true
    })
    //提交
    const onSubmit = ((data) =>{
      info.dialog = data.dialogFormVisible
      info.tableData = data.tableData
    })
    //取消
    const cancel = ((data) =>{
      info.dialog = data
      console.log(info.dialog)
    })
    //页面数据更新
    const getList = (() =>{
      userList().then((res) => {
        console.log(res.data.page.list)
        res.data.page.list.forEach(item => {
          item.status === 0 ?item.status = '禁用':item.status = '正常'
        })
        info.tableData = res.data.page.list
      })
    })
    getList()

    
    const deleteRow = ((index,tableData) =>{
      console.log(index, tableData)
      let params = []
      params.push(tableData.userId)
      deleteUser(params)
      .then((res) =>{
        console.log(res)
        if(res.data.code == 0){
          success('删除成功')
          getList()
        }
      })
      .catch((err) =>{
        console.log(err)
        ElMessage.error(`${err.msg}`)
      })
    })

    const handleSelectionChange = ((data)=>{
      console.log(data)
    })

    const modify = ((index,tableData) =>{
      console.log(index, tableData)
      
    })
      
  
    return {
      info,
      openAdd,
      cancel,
      onSubmit,
      deleteRow,
      modify,
      deleteUser,
      getList,
      handleSelectionChange,
      // userGet
    }
  },
  
})
</script>


<style lang="scss" scoped>
.form{
	margin:0 0 20px;
}
/deep/ .el-button+.el-button{margin-left: 20px;}
</style>