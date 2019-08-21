/**
 * @Author: yangkai93
 * Date: 2019/3/21
 * Time: 21:25
 *
 */
import { router } from "api/api-schema"
const state = {
  headerIndex: "1",
  headerArr: [],
  asideList: [],
  asideActive: "0"
}
const getters = {
  headerIndex: state => state.headerIndex,
  headerArr: state => state.headerArr,
  asideList: state => state.asideList,
  asideActive: state => state.asideActive
}

const mutations = {
  upAsideList(state, active) {
    state.headerArr.length && (state.asideList = state.headerArr[active].children)
  },
  upHeaderArr(state, { list }) {
    state.headerArr = list
  },
  upHeaderIndex(state, index) {
    state.headerIndex = index
  },
  upAsideActive(state, index) {
    state.asideActive = index
  }
}

const actions = {
  async getAsidePath({ commit, state }, params = {}) {
    await router(params).then(res => {
      console.log("vuex: router")
      if (res.success == true) {
        commit("upHeaderArr", { list: res.data })
        state.asideList = res.data[0].children
      }
    })
  },
  getHeaderIndex({ commit }, index) {
    commit("upHeaderIndex", index)
    commit("upAsideList", index)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
