import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS
} from './mutation-types'
import { reqAddress, reqFoodCategories, reqShops } from '../api'

export default {
  // 异步获取地址
  async getAddress({ state, commit }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, { address: result.data })
    }
  },

  // 异步获取食品分类列表
  async getFoodCategories({ commit }) {
    const result = await reqFoodCategories()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORIES, { categories: result.data })
    }
  },

  // 异步获取商家列表
  async getShops({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, { shops: result.data })
    }
  }
}
