/**
 * @Author: yangkai93
 * Date: 2019/8/13
 * Time: 21:51
 *
 */
const path = require("path")
const webpack = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// dll文件存放的目录
const dllPath = "./public/vendor"
module.exports = {
  mode: "production",
  entry: {
    vendor: ["vue/dist/vue.runtime.esm.js", "vuex", "vue-router", "element-ui", "axios", "moment"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.resolve(__dirname, dllPath),
    library: "[name]_[hash]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "[name]_[hash]",
      path: path.join(__dirname, dllPath, "[name].manifest.json"),
      context: process.cwd()
    })
  ]
}
