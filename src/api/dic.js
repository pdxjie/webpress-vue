/**
 * 字典相关接口
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * 分页搜索字典列表
 * @param params
 * @returns {AxiosPromise}
 */
export const dicPage = (params) => {
  return axios({
    url: api.dicPage,
    method: constant.POST,
    data: params
  })
}

/**
 * 新增字典
 * @param params
 * @returns {AxiosPromise}
 */
export const insertDic = (params) => {
  return axios({
    url: api.insertDic,
    method: constant.POST,
    data: params
  })
}

/**
 * 更新字典
 * @param params
 * @returns {AxiosPromise}
 */
export const updateDic = (params) => {
  return axios({
    url: api.updateDic,
    method: constant.POST,
    data: params
  })
}

/**
 * 删除字典
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteDic = (id) => {
  return axios({
    url: api.deleteDic + id,
    method: constant.DELETE
  })
}

/**
 * 获取字典信息
 * @param id
 * @returns {AxiosPromise}
 */
export const dicInfo = (id) => {
  return axios({
    url: api.dicInfo + id,
    method: constant.GET
  })
}
