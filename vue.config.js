const path = require("path")
const webpack = require("webpack")
const debug = process.env.NODE_ENV !== "production"
var config = require("./config")
function resolve(dir) {
  return path.join(__dirname, dir)
}
console.log("=======================233")
console.log(process.env.NODE_ENV)
console.log("=======================")
module.exports = {
  // 基本路径
  publicPath: "./",

  // 输出文件目录
  outputDir: `./dist/${config.version}`,

  // 静态资源目录 (js, css, img, fonts)
  assetsDir: `./assets`,

  // eslint-loader 是否在保存的时候检查
  lintOnSave: "error",

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,

  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = "cheap-module-eval-source-map"
    } else {
      // 生产环境配置
      config.performance = {
        hints: false
      }
    }
    new webpack.ProvidePlugin({
      $: "zepto",
      Zepto: "zepto",
      "windows.Zepto": "zepto"
    })
    config.resolve.alias = {
      "@": resolve("src"),
      assets: resolve("src/assets"),
      components: resolve("src/components"),
      "@U": resolve("src/utils"),
      api: resolve("src/servers")
    }
  },

  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: undefined,
  chainWebpack: config => {
    config.module
      .rule("zepto")
      .test(require.resolve("zepto"))
      .use("exports")
      .loader("exports-loader?window.Zepto")
      .end()
      .use("script")
      .loader("script-loader")
      .end()
  },
  // css相关配置 配置高于chainWebpack中关于css loader的配置
  css: {
    loaderOptions: {}
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8084,
    https: false,
    hotOnly: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:8084",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/mock"
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },

  // 第三方插件配置
  pluginOptions: {}
}
