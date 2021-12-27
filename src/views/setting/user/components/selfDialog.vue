<!--  -->
<template>
  <div>
    
    <el-dialog :before-close="handleClose" v-model="dialogFormVisible" title="新增">
      <el-form ref='form' :rules="state.rules" :model="state.form">
        <el-form-item prop='roleName' label="用户名" align="center" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='password' label="密码" align="center" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='passwordAgain' label="确认密码" align="center" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.passwordAgain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop='email'  label="邮箱" align="center" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号" align="center" :label-width="state.formLabelWidth">
          <el-input v-model="state.form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="radio" label="状态" align="center" :label-width="state.formLabelWidth">
          <div style='text-align:left'>
            <el-radio v-model="state.form.radio" label='1' size="medium">正常</el-radio>
            <el-radio v-model="state.form.radio" label='0' size="medium">禁用</el-radio>
          </div>
        </el-form-item>
        <el-form-item  label="角色" align="center" :label-width="state.formLabelWidth">
          <el-select
            v-model="state.form.roleIdList"
            multiple
            collapse-tags
            style="margin-left: 20px"
            placeholder="Select"
          >
            <el-option
              v-for="item in state.role"
              :key="item.name"
              :label="item.age"
              :value="item.age"
            >
            </el-option>
          </el-select>
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
import {  reactive,defineProps, watch, ref} from 'vue'
import { ElMessage } from "element-plus";
import {saveUser,userList,success,warning,userInfo,updateUser} from '@/api/sys/user/getInfo'

const state = reactive({
  role:[{name:'mhj',age:'30'},{name:'mj',age:'32'}],
  roleValue:'',
  dialogFormVisible:null,
  formLabelWidth: '100px',
  userId:null,
  amend:false,//修改
  form:{
    userId:'',
    radio:null,//状态
    roleName:'',
    password:'',
    passwordAgain:'',
    email:'',
    phone:'',
    roleIdList:[]
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
  userId:Number,
  amend:Boolean
})
state.dialogFormVisible = props.dialogFormVisible
state.userId = props.userId
console.log(state.userId)
const emit = defineEmits(['cancel','onSubmit','handleClose'])

var date = {
    page:1,
    limit:10,
}
//刷新页面信息
let updateList = async () =>{
  let getList = await userList(date)
  console.log(getList)
  if(getList.data.code == 0){
    getList.data.page.list.forEach(item => {
    item.status === 0 ?item.status = '禁用':item.status = '正常'
    })
    state.dialogFormVisible = false
    var obj = {
      tableData:getList.data.page.list,
      dialogFormVisible:false
    }
    emit('onSubmit',obj)
  }
  else{
    ElMessage.error(`${getList.data.msg}`)
  }
}


// 获取具体行
var getItemInfo = async () =>{
    let infoItem =  await userInfo(state.userId)
    const {code,msg,user} = infoItem.data
    if(code === 0){
      state.form.userId = user.userId
      state.form.roleName = user.username
      state.form.email = user.email
      state.form.phone = user.mobile
      state.form.radio =''+ user.status
      state.form.roleIdList = user.roleIdList
    }
    else{
      ElMessage.error(`${msg}`)
    }
    console.log(infoItem)
    console.log(state.form.radio) 
    }
watch(
  () => props.userId,
  (count, prevCount) => {
    state.userId = count
    console.log(count,prevCount)
    if(count != 0){
      getItemInfo()
    }
    
  }
);


  

watch(   //判断密码是否需要验证
  () =>props.amend,
  (count, prevCount)=>{
    state.amend = count
    console.log(state.amend)
    if(state.amend){
      state.rules.password[0].required = false
      state.rules.passwordAgain[0].required = false
      
    }
    else{
      state.rules.password[0].required = true
      state.rules.passwordAgain[0].required = true
      state.form.userId = ''
      state.form.roleName = ''
      state.form.email = ''
      state.form.phone = ''
      state.form.radio =''
      state.form.roleIdList = []
    }
  }
)

const onSubmit = (async () =>{
  console.log(state.form.roleIdList)
  if(state.form.roleName == ''){
    ElMessage.error('用户名称不能为空')
    return
  }
  if(!state.amend){
    if(state.form.password == ''){
    ElMessage.error('密码不能为空')
    return
    }
    if(state.form.passwordAgain == ''){
      ElMessage.error('确认密码不能为空')
      return
    }
    
  }
  if(state.form.password != state.form.passwordAgain){
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
    userId:state.form.userId,
    username:state.form.roleName,
    password:state.form.password,
    email:state.form.email,
    mobile:state.form.phone,
    status:parseInt(state.form.radio),
    roleIdList:state.form.roleIdList
  }
  
  console.log(params) 
  const Res = await (state.amend?updateUser(params):saveUser(params))
  let {code,msg} = Res.data
  if(code === 0){
    success('保存成功')
  }
  else{
    ElMessage.error(`${msg}`)
  }
  updateList()//更新列表
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
/deep/ .el-select{
  width: 100%;
  margin-left: 0 !important;
}
</style>