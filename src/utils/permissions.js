/* 自定义权限 */
export function checkJurisdiction(key) {
	// 权限数组
	let permissionList = JSON.parse(localStorage.getItem('role_list')) // 获取存在本地的权限数组
	if(!!permissionList){
			let index = permissionList.indexOf(key)
	if (index > -1) {
			// 有权限
			return true
	} else {
			// 无权限
			return false
	}
	}
	
}