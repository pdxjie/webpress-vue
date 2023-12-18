/**
 * 轮播图相关接口
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * 分页搜索轮播图列表
 * @param params
 * @returns {AxiosPromise}
 */
export const bannerPage = (params) => {
  return axios({
    url: api.bannerSearch,
    method: constant.POST,
    data: params
  })
}

/**
 * 新增轮播图
 * @param params
 * @returns {AxiosPromise}
 */
export const insertBanner = (params) => {
  return axios({
    url: api.insertBanner,
    method: constant.POST,
    data: params
  })
}

/**
 * 更新轮播图
 * @param params
 * @returns {AxiosPromise}
 */
export const updateBanner = (params) => {
  return axios({
    url: api.updateBanner,
    method: constant.POST,
    data: params
  })
}

/**
 * 删除轮播图
 * @param id
 * @returns {AxiosPromise}
 */
export const deleteBanner = (id) => {
  return axios({
    url: api.deleteBanner + id,
    method: constant.DELETE
  })
}

/**
 * 获取轮播图信息
 * @param id
 * @returns {AxiosPromise}
 */
export const bannerInfo = (id) => {
  return axios({
    url: api.bannerInfo + id,
    method: constant.GET
  })
}
