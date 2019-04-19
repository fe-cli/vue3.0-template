<template>
  <div v-if="tdata">
    <el-form :model="list" style="padding-top:12px;">
      <template v-for="(item, index) in list.common">
        <el-form-item :model="'common.' + index">
          <el-form
            label-position="left"
            :model="list['common'][index]"
            size="small"
            :disabled="onlyRead"
            ref="ruleForm"
          >
            <el-form-item
              :label="item.name"
              :prop="'.value'"
              :rules="Validate({ required: item.required, type: attrType[item.attributeType] })"
            >
              <el-input v-if="attrType[item.attributeType] == 'input'" v-model="item.value" />
              <el-input-number v-else-if="attrType[item.attributeType] == 'float'" v-model="item.value" />
              <el-input-number v-else-if="attrType[item.attributeType] == 'number'" v-model="item.value" />
              <el-select v-else-if="attrType[item.attributeType] == 'select'" v-model="item.value" placeholder="请选择">
                <el-option
                  v-for="sitem in item.candidateValues"
                  :key="sitem.value"
                  :label="sitem.name"
                  :value="sitem.value"
                />
              </el-select>
              <el-upload
                v-else-if="attrType[item.attributeType] == 'upload'"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
              >
                <el-button size="small" type="primary">
                  点击上传
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
              <el-switch
                v-else-if="attrType[item.attributeType] == 'switch'"
                v-model="item.value"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
              <el-checkbox-group v-else-if="attrType[item.attributeType] == 'checkbox'" v-model="item.value">
                <el-checkbox v-for="sitem in item.candidateValues" :key="sitem.id" :label="sitem.id">
                  {{ sitem.name }}
                </el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-else-if="attrType[item.attributeType] == 'radio'" v-model="item.value">
                <el-radio v-for="sitem in item.candidateValues" :key="sitem.value" :label="sitem.value">
                  {{ sitem.name }}
                </el-radio>
              </el-radio-group>
              <el-date-picker
                v-else-if="attrType[item.attributeType] == 'DateTimePicker' && item.timeType === 1"
                v-model="item.value"
                type="datetime"
                placeholder="选择日期时间"
                @change="handleDateChange(item)"
                :picker-candidateValues="pickercandidateValues"
              />
              <el-date-picker
                v-else-if="attrType[item.attributeType] == 'DateTimePicker'"
                v-model="item.value"
                type="datetimerange"
                @change="handleDateChange(item)"
                placeholder="选择日期时间"
                :picker-candidateValues="pickercandidateValues"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-date-picker
                v-else-if="attrType[item.attributeType] == 'DatePicker'"
                @change="handleDateChange(item)"
                v-model="item.value"
                type="date"
                placeholder="选择日期"
              />
            </el-form-item>
          </el-form>
        </el-form-item>
      </template>
    </el-form>
    <FormCol :coldata="list.send" v-if="list.send" :edit="isEdit" :max="3" ref="forCol" :only-read="onlyRead"></FormCol>
  </div>
</template>

<script>
import moment from "moment"
moment.locale("zh-cn")
import { outData } from "@/utils/rulesOut"
import FormCol from "@/common/FormCol"
export default {
  name: "RuleModel",
  components: {
    FormCol
  },
  data() {
    return {
      list: [],
      isEdit: true,
      pickercandidateValues: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      isValidate: false
    }
  },
  computed: {
    valiList() {
      return { 0: this.list }
    }
  },
  created() {
    this.list = outData(this.tdata)
  },
  props: ["tdata", "onlyRead"],
  watch: {
    tdata: function() {
      this.list = null
      this.list = outData(this.tdata)
    }
  },
  mounted() {},
  methods: {
    // upload handle
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // datePicker
    handleDateChange(item) {
      if (item.value instanceof Array) {
        item.startTime = moment(item.value[0]).valueOf()
        item.endTime = moment(item.value[2]).valueOf()
      } else {
        item.value = moment(item.value).valueOf()
      }
      console.log(item.value instanceof Array, item)
    },
    // submit
    validate() {
      var validate = []
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.map(item => {
          item.valid = function() {
            return new Promise((resolve, reject) => {
              item.validate(valid => {
                if (valid) {
                  resolve(true)
                } else {
                  reject(false)
                }
              })
            })
          }
          validate.push(item.valid())
        })
      }
      if (this.$refs.forCol) {
        validate.push(this.$refs.forCol.validate())
      }
      return Promise.all(validate)
        .then(res => {
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
      // this.$refs.ruleForm.map(item => {
      //   item.validate()
      // })
      // return new Promise((resolve, reject) => {
      //   this.$refs.ruleForm.validate(valid => {
      //     console.log(valid)
      //     if (valid) {
      //       resolve(true)
      //     } else {
      //       reject(false)
      //     }
      //   })
      // })
      // this.$refs.ruleForm.validate(valid => {
      //   console.log(valid)
      //   if (valid) {
      //     console.log("rules model 验证通过")
      //     return true
      //   } else {
      //     return false
      //   }
      // })
    },
    // reset
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
