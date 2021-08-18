import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_RATINGS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  UPDATE_FOOD_COUNT
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategories,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api'

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
  },

  // 同步保存用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },

  // 异步根据session获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },

  // 异步退出登录
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商铺信息
  async getShopInfo({ commit }) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_SHOP_INFO, { info })
    }
  },

  // 异步获取评价信息
  async getShopRatings({ commit }) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_SHOP_RATINGS, { ratings })
    }
  },

  // 异步获取商品信息
  async getShopGoods({ commit }, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_SHOP_GOODS, { goods })
      callback && callback()
    }
  },

  // 同步更新购物车里的count值(通过加减号)
  updateFoodCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOOD_COUNT, { food })
    } else {
      commit(DECREMENT_FOOD_COUNT, { food })
    }
  },

  // 同步更新购物车里的count值(通过输入框)
  inputFoodCount({ commit }, { count, food }) {
    commit(UPDATE_FOOD_COUNT, { food, count })
  }
}
