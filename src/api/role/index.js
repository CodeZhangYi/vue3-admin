import qs from 'qs'
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
			url: '/sys/role/save',
			method: 'post',
			transformRequest: [function(params) {
				params = JSON.stringify(params)
				return params
			}],
			data:{
				"roleName": params.roleName,
				"remark": params.remark,
				"menuIdList": params.menuIdList
			}
	})
}