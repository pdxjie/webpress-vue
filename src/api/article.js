/**
 * 内容相关接口
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * 分页搜索内容列表
 * @param params
 * @returns {AxiosPromise}
 */
export const articleSearch = (params) => {
  return axios({
    url: api.articleSearch,
    method: constant.POST,
    data: params
  })
}

/**
 * 新增内容
 * @param params
 * @returns {AxiosPromise}
 */
export const insertArticle = (params) => {
  return axios({
    url: api.insertArticle,
    method: constant.POST,
    data: params
  })
}

/**
 * 更新内容
 * @param params
 * @returns {AxiosPromise}
 */
export const updateArticle = (params) => {
  return axios({
    url: api.updateArticle,
    method: constant.POST,
    data: params
  })
}

/**
 * 删除内容
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteArticle = (id) => {
  return axios({
    url: api.deleteArticle + id,
    method: constant.DELETE
  })
}

/**
 * 获取字典信息
 * @param id
 * @returns {AxiosPromise}
 */
export const articleInfo = (id) => {
  return axios({
    url: api.articleInfo + id,
    method: constant.GET
  })
}

/**
 * 推荐
 * @param id
 * @returns {AxiosPromise}
 */
export const recommendArticle = (id) => {
  return axios({
    url: api.recommend + id,
    method: constant.GET
  })
}
