import Vue from "vue"
import Router from "vue-router"
import store from "@/stores"
import Main from "@/layout/Main.vue"
import { loginUrl } from "@U/url"
Vue.use(Router)
const isLogin = true
const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Main
    },
    {
      path: "/test",
      name: "test",
      component: () => import(/* webpackChunkName: "about" */ "@/views/Test.vue")
    }
  ]
})
router.beforeEach((to, from, next) => {
  !store.getters.headerArr.length &&
    store.dispatch("getAsidePath").then(() => {
      console.log("router: before")
      ;(to.meta.index && store.dispatch("getHeaderIndex", to.meta.index)) || store.dispatch("getHeaderIndex", "0")
      const regStr = JSON.stringify(store.getters.asideList)
      if (to.name !== "home" && regStr.indexOf(to.name) == -1) {
        alert("此页面不存在")
        router.replace({ path: "/" })
        next(false)
      } else {
        store.commit("upAsideActive", to.name)
      }
    })
  if (!isLogin) {
    window.location.href = `${loginUrl}${encodeURIComponent(window.location.href)}`
    return
  }
  next()
})
router.onError(callback => {
  alert("有新的版本更新，请手动刷新页面")
  console.log(callback, "router.onError")
})
export default router
