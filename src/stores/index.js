import Vue from "vue"
import Vuex from "vuex"
import router from "./modules/router"
import tirgger from "./modules/tirgger"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    router,
    tirgger
  }
})
