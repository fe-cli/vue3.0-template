/**
 * @Author: kevin
 * Date: 2019/3/21
 * Time: 21:25
 *
 */
import { router } from "api/api-schema"
const state = {
  headerIndex: "1",
  headerArr: [
    {
      name: "资源管理",
      params: "1"
    },
    {
      name: "页面管理",
      params: "1"
    },
    {
      name: "权限管理",
      params: "6"
    }
  ],
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
  upAsideList(state, { list }) {
    state.asideList = list
  },
  upHeaderIndex(state, index) {
    state.headerIndex = index
  },
  upAsideActive(state, index) {
    state.asideActive = index
  }
}

const actions = {
  getAsidePath({ commit }, params = {}) {
    router(params).then(res => {
      res.data.map((item, i) => (item.index = "" + i))
      commit("upAsideList", { list: res.data })
    })
  },
  getHeaderIndex({ commit }, index) {
    commit("upHeaderIndex", index)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
