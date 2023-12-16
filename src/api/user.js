/**
 * 用户相关请求模块
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * 分页搜索用户列表
 * @param params 搜索参数
 * @returns {AxiosPromise}
 */
export const searchPage = (params) => {
  return axios({
    url: api.userPage,
    method: constant.POST,
    data: params
  })
}

/**
 * 新增用户信息
 * @param params 用户信息
 * @returns {AxiosPromise}
 */
export const insertUser = (params) => {
  return axios({
    url: api.insertUser,
    method: constant.POST,
    data: params
  })
}

/**
 * 更新用户信息
 * @param params 用户信息
 * @returns {AxiosPromise}
 */
export const updateUser = (params) => {
  return axios({
    url: api.updateUser,
    method: constant.PUT,
    data: params
  })
}

/**
 * 删除用户信息
 * @param id 用户 id
 * @returns {AxiosPromise}
 */
export const deleteInfo = (id) => {
  return axios({
    url: api.deleteUser + id,
    method: constant.DELETE
  })
}

/**
 * 获取用户信息
 * @param id 用户 id
 * @returns {AxiosPromise}
 */
export const userInfo = (id) => {
  return axios({
    url: api.userInfo + id,
    method: constant.GET
  })
}

/**
 * 重置用户密码
 * @param id 用户 id
 * @returns {AxiosPromise}
 */
export const resetPassword = (params) => {
  return axios({
    url: api.resetPassword,
    method: constant.POST,
    data: params
  })
}

/**
 * 封禁用户
 * @param id 用户 id
 * @returns {AxiosPromise}
 */
export const forbiddenInfo = (id) => {
  return axios({
    url: api.forbidden + id,
    method: constant.GET
  })
}

/**
 * 设置角色
 * @param userId 用户 id
 * @param roleId 角色 id
 * @returns {AxiosPromise}
 */
export const setRole = (userId, roleId) => {
  return axios({
    url: api.forbidden + '?userId=' + userId + '&roleId=' + roleId,
    method: constant.PUT
  })
}
