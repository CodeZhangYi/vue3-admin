<!--  -->
<template>
  <div>
    <el-dialog :before-close="handleClose" v-model="dialogFormVisible" title="新增">
      <el-form ref='form' :rules="state.rules" :model="state.form">
        <el-form-item prop='roleName' label="用户名" align="center" :label-width="state.form.formLabelWidth">
          <el-input v-model="state.form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='password' label="密码" align="center" :label-width="state.form.formLabelWidth">
          <el-input v-model="state.form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='passwordAgain' label="确认密码" align="center" :label-width="state.form.formLabelWidth">
          <el-input v-model="state.form.passwordAgain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='email'  label="邮箱" align="center" :label-width="state.form.formLabelWidth">
          <el-input v-model="state.form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号" align="center" :label-width="state.form.formLabelWidth">
          <el-input v-model="state.form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="radio" label="状态" align="center" :label-width="state.form.formLabelWidth">
          <div style='text-align:left'>
            <el-radio v-model="state.form.radio" label=1 size="medium">正常</el-radio>
            <el-radio v-model="state.form.radio" label=0 size="medium">禁用</el-radio>
          </div>
        </el-form-item>
        <el-form-item  label="角色" align="center" :label-width="state.form.formLabelWidth">
          
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <el-button type="primary" @click="reset('state.form')">重置</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {  reactive,defineProps, } from 'vue'
import { ElMessage } from "element-plus";
import {saveUser,userList} from '@/api/user/getInfo'

const state = reactive({
  dialogFormVisible:null,
  form:{
    radio:null,
    roleName:'',
    password:'',
    passwordAgain:'',
    email:'',
    phone:'',
    formLabelWidth: '100px',
  },
  rules:
    {
      roleName: [
          {
            required: true,
            message: 'Please input roleName',
            trigger: 'blur',
          }
        ],
      password: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        }
      ],
      passwordAgain: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        }
      ],
      email: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        },
        // {
        //   type: 'email',
        //   message: 'Please input correct email address',
        //   trigger: ['blur', 'change'],
        // },
      ],
      phone: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        }
      ],
      radio: [
         {
          required: true,
          trigger: 'change',
        }
      ]
      
    }
  
})

const props = defineProps({
  dialogFormVisible:Boolean,
})
const emit = defineEmits(['cancel','onSubmit','handleClose'])


state.dialogFormVisible = props.dialogFormVisible
const onSubmit = (() =>{
  
  if(state.form.roleName == ''){
    ElMessage.error('用户名称不能为空')
    return
  }
   if(state.form.password == ''){
    ElMessage.error('密码不能为空')
    return
  }
  if(state.form.passwordAgain == ''){
    ElMessage.error('确认密码不能为空')
    return
  }
  if(state.form.passwordAgain !== state.form.passwordAgain){
    ElMessage.error('与密码不一致')
    return
  }
   if(state.form.email == ''){
    ElMessage.error('邮箱不能为空')
    return
  }
   if(state.form.phone == ''){
    ElMessage.error('手机号不能为空')
    return
  }
  if(!state.form.radio){
    ElMessage.error('请选择状态')
    return
  }
  let params = {
    userId:'',
    username:state.form.roleName,
    password:state.form.password,
    email:state.form.email,
    mobile:state.form.phone,
    status:state.form.radio,
    roleIdList:[]
  }

  console.log(params)
  saveUser(params)
  .then((res) =>{
    console.log(res)
    if(res.data.code == 0){
      userList().then((res) => {
        console.log(res.data.page.list)
        res.data.page.list.forEach(item => {
          item.status === 0 ?item.status = '禁用':item.status = '正常'
        })
        state.dialogFormVisible = false
        var obj = {
          tableData:res.data.page.list,
          dialogFormVisible:false
        }
        console.log(obj)
        emit('onSubmit',obj)
        ElMessage({
          message: '添加成功',
          type: 'success',
        })
      })
    }
  })
  .catch((err) =>{
    console.log(err)
    ElMessage.error(`${err.msg}`)
  })
  state.dialogFormVisible = false
  emit('onSubmit',state.dialogFormVisible)
})


const reset = ((name) =>{
  this.$refs[name].resetFields()
})

const cancel = (() =>{
  state.dialogFormVisible = false
  emit('cancel',state.dialogFormVisible)
})

const handleClose = (() =>{
  state.dialogFormVisible = false
  emit('cancel',state.dialogFormVisible)
})
console.log(state)
</script>
<style lang='scss' scoped>
</style>