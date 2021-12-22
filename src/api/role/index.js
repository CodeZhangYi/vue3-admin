import service from "../../utils/request"
// 获取登陆验证码
export function GetMenuList(params) {
	return service.request({
			url: '/sys/menu/list',
			method: 'get',
			params
	})
}