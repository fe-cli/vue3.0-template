/**
 * @Author: kevin
 * Date: 2019/3/22
 * Time: 11:25
 *
 */
const state = {
  tData: null,
  isValidate: false //校验是否通过
}
const getters = {
  tData: state => state.tData,
  isValidate: state => state.isValidate
}

const mutations = {
  upData(state, data) {
    state.tData = null
    state.tData = data
  },
  upStatus(state, flag) {
    state.isValidate = flag
  }
}

const actions = {
  getModulList({ commit }, { api, params = {} }) {
    api(params).then(res => {
      commit("upData", res.data)
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
