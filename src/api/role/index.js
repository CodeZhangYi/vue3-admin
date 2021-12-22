import service from "../../utils/request"
// 获取登陆验证码
export function GetRoleList(params) {
	return service.request({
			url: '/sys/role/select',
			method: 'get',
			params
	})
}