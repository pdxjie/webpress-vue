/**
 * 基础前置操作
 */
import api from '@/api/index'
import { requestType as constant } from '@/constants'
import { axios } from '@/utils/request'

/**
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return axios({
    url: api.Login,
    method: constant.POST,
    data: parameter
  })
}

export function getSmsCaptcha (email) {
  return axios({
    url: api.sendCode + email,
    method: constant.GET
  })
}

export function getInfo () {
  return axios({
    url: api.UserInfo,
    method: constant.GET,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: constant.POST,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
