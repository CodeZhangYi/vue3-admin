import service from "../../../utils/request"
import { ElMessage } from "element-plus";
//chengong
export function success(params) {
	ElMessage({
    showClose: true,
    message: params,
    type: 'success',
  })
}
//waring
export function warning(params) {
	ElMessage({
    showClose: true,
    message: params,
    type: 'warning',
  })
}

//获取管理员列表
export function userList(params) {
	return service.request({
			url: '/sys/user/list',
			method: 'get',
			params
	})
}
//新增
export function saveUser(params) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: '/sys/user/save',
			method: 'post',
			data:JSON.stringify(params)
	})
}

export function updateUser(params) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: '/sys/user/update',
			method: 'post',
			data:JSON.stringify(params)
	})
}


//查询具体用户信息
export function userInfo(userId) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: `/sys/user/info/${userId}`,
			method: 'get',
			// data:JSON.stringify(userId)
	})
}
//删除
export function deleteUser(params) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: '/sys/user/delete',
			method: 'post',
			data:JSON.stringify(params)
	})
}