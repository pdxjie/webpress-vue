/**
 * 分类相关接口
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * 获取二级分类
 * @param params
 * @returns {AxiosPromise}
 */
export const allTwiceCategoryData = () => {
  return axios({
    url: api.twiceCates,
    method: constant.GET
  })
}

/**
 * 分页搜索分类列表
 * @param params
 * @returns {AxiosPromise}
 */
export const categorySearch = (params) => {
  return axios({
    url: api.categorySearch,
    method: constant.POST,
    data: params
  })
}

/**
 * 新增分类
 * @param params
 * @returns {AxiosPromise}
 */
export const insertCategory = (params) => {
  return axios({
    url: api.insertCategory,
    method: constant.POST,
    data: params
  })
}

/**
 * 更新分类
 * @param params
 * @returns {AxiosPromise}
 */
export const updateCategory = (params) => {
  return axios({
    url: api.updateCategory,
    method: constant.POST,
    data: params
  })
}

/**
 * 删除分类
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteCategory = (id) => {
  return axios({
    url: api.deleteCategory + id,
    method: constant.DELETE
  })
}

/**
 * 获取分类信息
 * @param id
 * @returns {AxiosPromise}
 */
export const categoryInfo = (id) => {
  return axios({
    url: api.categoryInfo + id,
    method: constant.GET
  })
}

/**
 * 获取所有的父级
 * @returns {AxiosPromise}
 */
export const allParents = () => {
  return axios({
    url: api.allParents,
    method: constant.GET
  })
}
