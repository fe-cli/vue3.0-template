import Vue from "vue"
import Router from "vue-router"
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
      component: () => import(/* webpackChunkName: "about" */ "@/views/Test.vue"),
      meta: {
        title: "优惠券资源",
        breadcrumb: [
          {
            name: "优惠券资源列表",
            pathName: "/test"
          }
        ]
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (!isLogin) {
    window.location.href = `${loginUrl}${encodeURIComponent(window.location.href)}`
    return
  }
  next()
})

export default router
