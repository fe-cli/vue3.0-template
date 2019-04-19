const path = require("path")
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  resolve: {
    //webstorm 查源用
    alias: {
      "@": resolve("src"),
      assets: resolve("src/assets"),
      components: resolve("src/components"),
      "@U": resolve("src/utils"),
      api: resolve("src/servers")
    }
  },
  version: "0.0.2" // 打包版本号
}
