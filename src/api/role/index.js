import service from "../../utils/request"
// 获取登陆验证码
export function GetMenuList(params) {
	return service.request({
			url: '/sys/menu/list',
			method: 'get',
			params
	})
}
// 添加角色
export function SaveRole(params) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: '/sys/role/save',
			method: 'post',
			data:JSON.stringify(params)
	})
}
// 删除角色
export function DeleteRole(params) {
	return service.request({
			headers: {
				'Content-Type': 'application/json'
			},
			url: '/sys/role/delete',
			method: 'post',
			data:JSON.stringify(params)
	})
}
// 获取角色列表
export function GetRole(params) {
	return service.request({
		url: '/sys/role/list',
		method: 'get',
		params
})
}