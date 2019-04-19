/**
 * @Author: kevin
 * Date: 2019/4/2
 * Time: 16:52
 *
 */
import moment from "moment"
moment.locale("zh-cn")

export function ValueOf(date) {
  return moment(date).valueOf()
}
export function formatAll(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss")
}

export function ruleGroup(data) {
  let entering = []
  data.map((item, i) => {
    entering.push({ ruleId: item.ruleId, virtualRuleOperateParams: [] })
    item["virtualRuleVos"].map((sitem, j) => {
      entering[i]["virtualRuleOperateParams"].push({
        virtualRuleId: sitem.virtualRuleId,
        ruleAttributeOperateParams: []
      })
      sitem["attributeVos"].map(mitem => {
        entering[i]["virtualRuleOperateParams"][j]["ruleAttributeOperateParams"].push({
          code: mitem.code,
          value: mitem.value
        })
      })
    })
  })
  return entering
}
