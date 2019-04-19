/**
 * @Author: kevin
 * Date: 2019/3/28
 * Time: 15:05
 *
 */
export const outData = function(data) {
  let defObj = {
    common: [],
    send: null
  }
  if (data.templateType) {
    if (data.templateType == "COMMON") {
      data.virtualRuleVos.map(item => {
        defObj["common"].push(item.attributeVos[0])
      })
    } else {
      defObj["send"] = data
    }
  }
  if (data.length) {
    data.map(item => {
      if (item.templateType == "COMMON") {
        item.virtualRuleVos.map(item => {
          defObj["common"].push(item.attributeVos[0])
        })
      } else {
        defObj["send"] = item
      }
    })
  }
  return defObj
}
