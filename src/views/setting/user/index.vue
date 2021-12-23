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
			<el-table :data="info.tableData" border style="width: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column prop="userId" label="ID" width="80" align="center" />
				<el-table-column prop="username" label="用户名" align="center" />
        <el-table-column prop="email" label="邮箱" align="center" />
				<el-table-column prop="status" label="状态" align="center" />
				<el-table-column prop="createTime" label="创建时间" width="180" align="center" />
				<el-table-column label="Operations" width="120">
          <template #default>
            <el-button type="text" size="small" @click="handleClick"
              >修改</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script >
import { reactive,defineComponent } from 'vue'
import {userList} from '@/api/user/getInfo'
import { getToken } from "../../../utils/cookies";


export default {
  setup() {
    // mounted
    const info = reactive({
      tableData:[]
    })
    const openAdd = (() =>{
      console.log(info.tableData[0])
    })
    userList().then((res) => {info.tableData = res.data.page.list})
    return {
      info,
      openAdd,
      // userGet
    }
  },
  
}
</script>


<style lang="scss" scoped>
.form{
	margin:0 0 20px;
}
/deep/ .el-button+.el-button{margin-left: 20px;}
</style>