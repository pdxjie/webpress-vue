// 用户模块相关接口前缀
export const userPrefix = '/pdx/user'
const api = {
  /* 基础功能接口 */
  Login: '/basic/login',
  sendCode: '/basic/captcha/',
  Logout: '/basic/logout',
  UserInfo: '/basic/info',

  /* 用户模块相关功能接口 */
  userPage: userPrefix + '/search',
  insertUser: userPrefix + '/insert',
  updateUser: userPrefix + '/update',
  deleteUser: userPrefix + '/delete/',
  userInfo: userPrefix,
  resetPassword: userPrefix + '/password',
  forbidden: userPrefix + '/forbidden/',
  role: userPrefix + '/set/role'
}
export default api
