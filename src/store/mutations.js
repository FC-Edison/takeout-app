import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORIES,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_SHOP_GOODS,
  RECEIVE_SHOP_INFO,
  RECEIVE_SHOP_RATINGS
} from './mutation-types'

export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },

  [RECEIVE_CATEGORIES](state, { categories }) {
    state.categories = categories
  },

  [RECEIVE_SHOPS](state, { shops }) {
    state.shops = shops
  },

  [RECEIVE_USER_INFO](state, { userInfo }) {
    state.userInfo = userInfo
  },

  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },

  [RECEIVE_SHOP_GOODS](state, { goods }) {
    state.goods = goods
  },

  [RECEIVE_SHOP_INFO](state, { info }) {
    state.info = info
  },

  [RECEIVE_SHOP_RATINGS](state, { ratings }) {
    state.ratings = ratings
  }
}
