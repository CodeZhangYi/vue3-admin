import service from "../../utils/request"

export function userList(params) {
	return service.request({
			url: '/sys/user/list',
			method: 'get',
			params
	})
}