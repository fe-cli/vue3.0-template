/**
 * @Author: yangkai93
 * Date: 2019/3/29
 * Time: 11:33
 *
 */
export default {
  data() {
    return {
      attrType: {
        LIST: "select",
        STRING: "input", // 字符串
        INTEGER: "number",
        FLOAT: "float",
        ENUMS: "select", // 枚举
        DATE: "DatePicker",
        DYNAMIC_LIST: "select", // 动态获取options
        DATE_RANGE: "DateTimePicker",
        RADIO: "radio",
        CHECK_BOX: "checkbox"
      },
      systemId: 1, // 会员接口系统表示
      vvip_business_id: window.localStorage.getItem("vvip_business_id"),
      typeArr: [
        // 福利规则类型
        {
          name: "资源规则",
          value: "WFRESOURCE",
          id: 1
        },
        {
          name: "楼层规则",
          value: "WFFLOOR",
          id: 2
        }
      ]
    }
  }
}
