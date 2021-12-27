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
			<el-input v-model="info.user" style="width:200px;margin:0 20px 0 0" placeholder="请输入用户名"></el-input>
			<el-button @click='checkOut'>查询</el-button>
			<el-button type="primary" @click="openAdd">新增</el-button>
			<el-button type="danger" @click='batchDelete'>批量删除</el-button>
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
    <selfDialog @cancel="cancel" @onSubmit='onSubmit' :dialogFormVisible='info.dialog' :userId='info.itemId' :amend='info.amend'></selfDialog>
    <el-dialog
      v-model="info.dialogVisibleSure"
      title="删除"
      width="30%"
    >
      <span>确定删除该条信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleSure = false">取消</el-button>
          <el-button type="primary" @click="ConfirmDelete"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    
    <div style='display:flex;margin-top:20px;margin-bottom:10px'>
      <el-pagination
        :page-size="10"
        :pager-count="11"
        layout="prev, pager, next"
        :total="info.totalCount"
        v-model:currentPage="info.currentPage"
        >
      </el-pagination>
    </div>
    
	</div>
</template>

<script >
import { reactive,defineComponent,watch } from 'vue'
import {userList,deleteUser,success,warning,userInfo} from '@/api/sys/user/getInfo'
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
      batch:false,//批量删除
      count:0,//第几页
      currentPage:0,
      totalCount:0,//总条目数
      totalPage:0,//总也数
      radio:1,
      tableData:[],
      dialog:false,
      deleteList:[],
      user:'',//用户名
      itemId:0,
      row:null,
      amend:null, //新增
      dialogVisibleSure:false,//确定取消
    })
    //新增
    const openAdd = (() =>{       
      info.amend = false
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
    })
    //页面数据更新
    const getList = (() =>{
      var date = {
        page:1,
        limit:10,
        username:info.user,
      }
      userList(date).then((res) => {
        if(res.data.code == 0){
          res.data.page.list.forEach(item => {
          item.status === 0 ?item.status = '禁用':item.status = '正常'
          })
          info.tableData = res.data.page.list
          info.totalCount = res.data.page.totalCount
          info.totalPage = res.data.page.totalPage
        }
        else{
          ElMessage.error(`${res.data.msg}`)
        }
      })
    })
    getList()

    
    const deleteRow = ((index,tableData) =>{
      console.log(index, tableData)
      info.itemId = tableData.userId
      info.dialogVisibleSure = true
    })

    const handleSelectionChange = ((data)=>{
      info.deleteList = []
      data.forEach(item=>{
        info.deleteList.push(item.userId)
      })
      console.log(info.deleteList)
    })

    //批量删除
    const batchDelete = () => {
      if(info.deleteList.length == 0){
        warning('请先选择要删除项')
      }
      else{
        info.batch = true
        info.dialogVisibleSure = true
      }
    }
    const modify = async (index,tableData) =>{
      info.amend = true
      info.itemId = tableData.userId
      info.dialog = true
    }

    const ConfirmDelete =(() =>{
      if(info.batch){
        deleteUser(info.deleteList)
        .then((res) =>{
          if(res.data.code == 0){
            success('删除成功')
            getList()
          }
        })
        .catch((err) =>{
          ElMessage.error(`${err.msg}`)
        })
      }
      else{
        let params = []
        params.push(info.itemId)
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
      }
      info.dialogVisibleSure = false
      info.batch = false
      
    })
    //查询
    const checkOut = () =>{
      getList()
    }

watch(
  ()=>info.currentPage,
  (count, prevCount) => {
    info.count = count
    let date = {
      limit:10,
      page:count,
      username:info.user,
    }
    userList(date).then((res) => {
      res.data.page.list.forEach(item => {
        item.status === 0 ?item.status = '禁用':item.status = '正常'
      })
      info.tableData = res.data.page.list
    })
  }
)
    return {
      info,
      openAdd,
      cancel,
      onSubmit,
      modify,
      deleteRow,
      deleteUser,
      getList,
      handleSelectionChange,
      batchDelete,
      checkOut,
      userInfo,
      ConfirmDelete,
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
/deep/ .cell{
  display:flex;
  justify-content: center;
}
</style>