import axios from "axios"
import { Message } from "element-ui"

// import { loginUrl } from "@U/url"
//http.js
//设置请求baseURL
// axios.defaults.baseURL = ""
//设置默认请求头
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
  Accept: "application/json"
}
axios.defaults.timeout = 10000
axios.defaults.withCredentials = true
//添加请求拦截器
axios.interceptors.request.use(
  config => {
    //在发送请求之前做某事，比如说 设置loading动画显示
    const { url } = config
    process.env.NODE_ENV == "development" && /^\/api/.test(url) && (config.url = url + ".json")
    return config
  },
  error => {
    //请求错误时做些事
    return Promise.reject(error)
  }
)

//添加响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.status && res.status != 200) {
      console.error("接口错误")
      return Promise.reject(res.data)
    }
    if (res.data && !res.data.success) {
      console.error("接口：" + res.config.url + ">>>error:" + JSON.stringify(res.data))
      Message.error(res.data.resultTips)
      return Promise.reject(res.data)
    }
    return res.data
  },
  error => {
    //请求错误时做些事
    console.error(error)
    if (error.response && (error.response.status == 504 || error.response.status == 404)) {
      console.error("服务器被吃了⊙﹏⊙∥")
    } else {
      console.error(error)
    }
    return Promise.reject(error)
  }
)

//如果不想要这个拦截器也简单，可以删除拦截器
//axios.interceptors.request.eject(myInterceptor)
// POST发送请求前处理入参的数据为：formData 形式
// axios.defaults.transformRequest = [
//   function(data) {
//     let newData = ""
//     for (let k in data) {
//       newData += encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&"
//     }
//     return newData
//   }
// ]
axios.jsonp = (url, params) => {
  // 判断url是否存在以及是否为字符串
  if (!url || typeof url !== "string") throw new Error("必须传入字符串类型的url地址")
  let param = function(data) {
    let url = ""
    for (var k in data) {
      let value = data[k] !== undefined ? data[k] : ""
      url += "&" + k + "=" + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ""
  }
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(params)
  return new Promise(resolve => {
    // 处理返回的结果
    var oDate = new Date().getTime()
    window["jsonCallBack" + oDate] = result => {
      resolve(result)
    }
    // 在页面创建script标签，并将src设置为请求地址，取回数据之后移除script标签
    let JSONP = document.createElement("script")
    JSONP.type = "text/javascript"
    JSONP.src = `${url}&callback=jsonCallBack${oDate}`
    document.getElementsByTagName("head")[0].appendChild(JSONP)
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    }, 500)
  })
}

axios.oGet = (url, params) => {
  // if (process.env.NODE_ENV !== "production") {
  //   return axios.jsonp(url + "?format=jsonp", params)
  // } else {
  return axios.get(url, { params: params })
  // }
}
//导出使用
export default axios
