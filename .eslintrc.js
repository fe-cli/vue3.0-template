module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    jquery: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],// "plugin:vue/strongly-recommended"

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    semi: [0, "always"],
    "vue/require-prop-types": "off", // prop 取消必须有类型限制
    "vue/require-v-for-key": "off", // v-for 指令的元素必须有 v-bind:key
    "vue/valid-v-for": "off",
    'vue/max-attributes-per-line': 0,
  },

  parserOptions: {
    parser: "babel-eslint"
  },
}
