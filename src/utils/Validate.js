/**
 * @Author: kevin
 * Date: 2019/4/12
 * Time: 16:45
 * 规则校验
 *
 */

function mobile(val) {
  if (!/^1(3|4|5|7|8)\d{9}$/.test(val)) {
    return false
  } else {
    return true
  }
}

/**
 * 非0 正整数
 * @param val
 * @returns {boolean}
 */
function integer(val) {
  if (!/^[1-9]\d*$/.test(val)) {
    return false
  } else {
    return true
  }
}
function floatNum(val) {
  if (!/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/.test(val)) {
    return false
  } else {
    return true
  }
}
exports.install = function(Vue) {
  /**
   * 注意: 定义type 规则时 不用做非空验证
   *    只需要传入 required:true 即可
   * */
  /*验证手机号*/
  const isvalidateMobile = (rule, value, callback) => {
    if (value != null && value != "") {
      if (!mobile(value)) {
        callback(new Error("您输入的手机号不正确!"))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }
  /*请输入正整数*/
  const isvalidateInteger = (rule, value, callback) => {
    if (!integer(value)) {
      callback(new Error("请输入正整数!"))
    } else {
      callback()
    }
  }
  /*请输入两位小数*/
  const isvalidateFloat = (rule, value, callback) => {
    if (value != null && value != "") {
      if (!floatNum(value)) {
        callback(new Error("请输入两位小数!"))
      } else {
        callback()
      }
    } else {
      callback()
    }
  }

  /**
   * 参数 item
   * required true 必填项
   * maxLength 字符串的最大长度
   * min 和 max 必须同时给 min < max type=number
   * type 手机号 mobile
   *   邮箱  email
   *   网址  url
   *   各种自定义类型  定义在 src/utils/validate 中  持续添加中.......
   * */

  Vue.prototype.Validate = function(item) {
    let rules = []
    if (item.required) {
      rules.push({ required: true, message: "该输入项为必填项!", trigger: "blur" })
    }
    if (item.maxLength) {
      rules.push({ min: 1, max: item.maxLength, message: "最多输入" + item.maxLength + "个字符!", trigger: "blur" })
    }
    if (item.min && item.max) {
      rules.push({
        min: item.min,
        max: item.max,
        message: "字符长度在" + item.min + "至" + item.max + "之间!",
        trigger: "blur"
      })
    }
    if (item.type) {
      let type = item.type
      switch (type) {
        case "email":
          rules.push({ type: "email", message: "请输入正确的邮箱地址", trigger: "blur" })
          break
        case "mobile":
          rules.push({ validator: isvalidateMobile, trigger: "blur" })
          break
        case "number":
          rules.push({ validator: isvalidateInteger, trigger: "blur" })
          break
        case "float":
          rules.push({ validator: isvalidateFloat, trigger: "blur" })
          break
        default:
          break
      }
    }
    return rules
  }
}
