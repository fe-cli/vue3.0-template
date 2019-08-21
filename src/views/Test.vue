<template>
  <div class="about">
    <ImgUpload v-model="imgUrl" ref="testUpload"></ImgUpload>
    <el-button @click="valivn">dsafs</el-button>
    <Editor ref="editor" v-model="html"></Editor>
    <!--<FormCol :coldata="colData" :edit="isEdit" :max="3"></FormCol>-->
    <RuleModel ref="rules" v-for="(item, index) in triggerData.ruleVos" :key="index" :tdata="item"></RuleModel>

    <el-dialog title="下发表单测试" :visible.sync="dialogFormVisible" @close="closeFn">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import RuleModel from "@/common/RuleModel"
// import { rule } from "api/api-schema"
import ImgUpload from "@/common/ImgUpload"
import { mapActions, mapGetters } from "vuex"
import Editor from "@/common/Editor"
export default {
  name: "About",
  components: {
    RuleModel,
    Editor,
    ImgUpload
  },
  data() {
    return {
      isEdit: true,
      html: "<p>22323323</p>",
      imgUrl: "",
      colData: 0,
      trigger: {},
      dialogFormVisible: false,
      rules: {
        test2: [{ required: true, message: "校验测试不能为空", trigger: "blur" }]
      },
      triggerData: 0
    }
  },
  computed: {
    ...mapGetters(["isValidate"])
  },
  created() {
    const _this = this
    _this.triggerData = {
      ruleGroupId: 25,
      ruleVos: [
        {
          ruleId: 5,
          templateType: "SEND",
          virtualRuleVos: [
            {
              attributeVos: [
                {
                  attributeType: "LIST",
                  candidateValues: [
                    {
                      id: 1,
                      name: "-10"
                    },
                    {
                      id: 2,
                      name: "-9"
                    },
                    {
                      id: 3,
                      name: "-8"
                    }
                  ],
                  code: "riskLevel",
                  id: 6,
                  name: "select",
                  required: true,
                  value: ""
                },
                {
                  attributeType: "LIST",
                  candidateValues: [
                    {
                      id: 1,
                      name: "-10"
                    },
                    {
                      id: 2,
                      name: "-9"
                    },
                    {
                      id: 3,
                      name: "-8"
                    }
                  ],
                  code: "riskLevel",
                  id: 6,
                  name: "select",
                  required: true,
                  value: ""
                },
                {
                  attributeType: "STRING",
                  code: "inputVal",
                  id: 2,
                  name: "字符串",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "LIST",
                  candidateValues: [
                    {
                      id: 1,
                      name: "-10"
                    },
                    {
                      id: 2,
                      name: "-9"
                    },
                    {
                      id: 3,
                      name: "-8"
                    }
                  ],
                  code: "riskLevel",
                  id: 6,
                  name: "select",
                  required: true,
                  value: ""
                },
                {
                  attributeType: "STRING",
                  code: "inputVal",
                  id: 2,
                  name: "字符串",
                  required: true,
                  value: ""
                }
              ]
            }
          ]
        },
        {
          ruleId: 5,
          templateType: "COMMON",
          virtualRuleVos: [
            {
              attributeVos: [
                {
                  attributeType: "LIST",
                  candidateValues: [
                    {
                      id: 1,
                      name: "-10"
                    },
                    {
                      id: 2,
                      name: "-9"
                    },
                    {
                      id: 3,
                      name: "-8"
                    }
                  ],
                  code: "riskLevel",
                  id: 6,
                  name: "select",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "STRING",
                  code: "inputVal",
                  id: 2,
                  name: "字符串",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "INTEGER",
                  code: "number",
                  id: 3,
                  name: "整数",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "INTEGER",
                  code: "number",
                  id: 3,
                  name: "整数",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "FLOAT",
                  code: "float",
                  id: 9,
                  name: "浮点",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "ENUMS",
                  candidateValues: [
                    {
                      value: 0,
                      name: "枚举1"
                    },
                    {
                      value: 1,
                      name: "枚举2"
                    },
                    {
                      value: 2,
                      name: "枚举3"
                    }
                  ],
                  code: "selectEnums",
                  id: 0,
                  name: "枚举",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DATE",
                  code: "date",
                  id: 11,
                  name: "日期",
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DYNAMIC_LIST",
                  code: "dynamic_list",
                  id: 12,
                  name: "动态列表",
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "RADIO",
                  candidateValues: [
                    {
                      value: 0,
                      name: "单选1"
                    },
                    {
                      value: 1,
                      name: "单选2"
                    },
                    {
                      value: 2,
                      name: "单选3"
                    }
                  ],
                  code: "radio",
                  id: 0,
                  name: "单选",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DATE_RANGE",
                  code: "dateRange",
                  id: 13,
                  name: "日期区间",
                  value: []
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "CHECK_BOX",
                  candidateValues: [
                    {
                      id: 0,
                      name: "多选1"
                    },
                    {
                      id: 1,
                      name: "多选2"
                    },
                    {
                      id: 2,
                      name: "多选3"
                    }
                  ],
                  code: "checkbox",
                  id: 0,
                  name: "多选",
                  required: true,
                  value: []
                }
              ]
            }
          ]
        },
        {
          ruleId: 5,
          templateType: "COMMON",
          virtualRuleVos: [
            {
              attributeVos: [
                {
                  attributeType: "LIST",
                  candidateValues: [
                    {
                      id: 1,
                      name: "-10"
                    },
                    {
                      id: 2,
                      name: "-9"
                    },
                    {
                      id: 3,
                      name: "-8"
                    }
                  ],
                  code: "riskLevel",
                  id: 6,
                  name: "select",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "STRING",
                  code: "inputVal",
                  id: 2,
                  name: "字符串",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "INTEGER",
                  code: "number",
                  id: 3,
                  name: "整数",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "INTEGER",
                  code: "number",
                  id: 3,
                  name: "整数",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "FLOAT",
                  code: "float",
                  id: 9,
                  name: "浮点",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "ENUMS",
                  candidateValues: [
                    {
                      value: 0,
                      name: "枚举1"
                    },
                    {
                      value: 1,
                      name: "枚举2"
                    },
                    {
                      value: 2,
                      name: "枚举3"
                    }
                  ],
                  code: "selectEnums",
                  id: 0,
                  name: "枚举",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DATE",
                  code: "date",
                  id: 11,
                  name: "日期",
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DYNAMIC_LIST",
                  code: "dynamic_list",
                  id: 12,
                  name: "动态列表",
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "RADIO",
                  candidateValues: [
                    {
                      value: 0,
                      name: "单选1"
                    },
                    {
                      value: 1,
                      name: "单选2"
                    },
                    {
                      value: 2,
                      name: "单选3"
                    }
                  ],
                  code: "radio",
                  id: 0,
                  name: "单选",
                  required: true,
                  value: ""
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "DATE_RANGE",
                  code: "dateRange",
                  id: 13,
                  name: "日期区间",
                  value: []
                }
              ]
            },
            {
              attributeVos: [
                {
                  attributeType: "CHECK_BOX",
                  candidateValues: [
                    {
                      id: 0,
                      name: "多选1"
                    },
                    {
                      id: 1,
                      name: "多选2"
                    },
                    {
                      id: 2,
                      name: "多选3"
                    }
                  ],
                  code: "checkbox",
                  id: 0,
                  name: "多选",
                  required: true,
                  value: []
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {},
  methods: {
    ...mapActions(["getModulList"]),
    getHtml(html) {
      console.log(html)
    },
    valivn() {
      if (this.$refs.rules) {
        const promiseList = []
        this.$refs.rules.forEach(item => {
          promiseList.push(item.validate())
        })
        Promise.all(promiseList)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // callback(true)
      }
    },
    imgCall(val) {
      console.log(this.$refs.testUpload.imageUrl)
      console.log(val)
    },
    getData() {
      this.$refs.rules.map(item => {
        item.resetForm()
      })
    },
    closeFn() {
      this.$refs.tirgger.resetForm()
    }
  },
  destroyed() {
    // 将editor进行销毁
    // this.$refs.editor.destroy()
  }
}
</script>
