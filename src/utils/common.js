/**
 * 公共工具类
 */
import { v4 as uuidv4 } from 'uuid'

/**
 * 获取 UUID
 * @returns {*}
 */
export const uid = () => {
  return uuidv4()
}
