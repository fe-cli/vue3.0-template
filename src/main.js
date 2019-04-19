import Vue from "vue"
import App from "./App.vue"
import router from "@/routes"
import store from "@/stores/index"
import ElementUI from "element-ui"
import Validate from "@U/Validate"
import "element-ui/lib/theme-chalk/index.css"
import "@/assets/reset.scss"
import "assets/project.scss"
import axios from "@/servers/http"
import mixins from "./mixins"
import $ from "zepto"
import moment from "moment"
// import elCascaderMulti from "el-cascader-multi"
// Vue.use(elCascaderMulti)
moment.locale("zh-cn")
//===================
console.log($)
//====================
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.mixin(mixins)
// 规则统一封装中文提示
Vue.use(Validate)

Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
