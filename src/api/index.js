// 用户模块相关接口前缀
export const userPrefix = '/pdx/user/'
export const dicPrefix = '/pdx/dic/'
export const articlePrefix = '/pdx/article/'
export const categoryPrefix = '/pdx/category/'
const api = {
  /* 基础功能接口 */
  Login: '/basic/login',
  sendCode: '/basic/captcha/',
  Logout: '/basic/logout',
  UserInfo: '/basic/info',

  /* 用户模块相关功能接口 */
  userPage: userPrefix + 'search',
  insertUser: userPrefix + 'insert',
  updateUser: userPrefix + 'update',
  deleteUser: userPrefix + 'delete/',
  userInfo: userPrefix,
  resetPassword: userPrefix + 'password',
  forbidden: userPrefix + 'forbidden/',
  role: userPrefix + 'set/role',

  /* 字典模块相关接口 */
  dicPage: dicPrefix + 'page',
  insertDic: dicPrefix + 'add',
  updateDic: dicPrefix + 'update',
  deleteDic: dicPrefix,
  dicInfo: dicPrefix,

  /* 内容模块相关接口 */
  articleSearch: articlePrefix + 'pages',
  insertArticle: articlePrefix + 'insert',
  updateArticle: articlePrefix + 'update',
  articleInfo: articlePrefix,
  deleteArticle: articlePrefix,
  restore: articlePrefix + 'restore',
  recommend: articlePrefix + 'recommend/',

  /* 分类模块相关接口 */
  categorySearch: categoryPrefix + 'page',
  twiceCates: categoryPrefix + 'twice',
  insertCategory: categoryPrefix + 'add',
  updateCategory: categoryPrefix + 'update',
  deleteCategory: categoryPrefix,
  categoryInfo: categoryPrefix,
  allParents: categoryPrefix + 'parent'
}
export default api
