<template>
  <el-form :model="coldata" size="small">
    <el-row :gutter="24" type="flex" justify="center">
      <el-col v-for="(col, j) in coldata['virtualRuleVos'][0].attributeVos" :key="j">
        <el-form-item label-width="80px">
          <el-form :span="8">
            <p class="form-flex-title">{{ col.name }}</p>
          </el-form>
        </el-form-item>
      </el-col>
      <el-col :span="1" class="form-del-span"> </el-col>
    </el-row>
    <el-row
      :gutter="24"
      type="flex"
      justify="center"
      v-for="(row, i) in coldata['virtualRuleVos']"
      :key="i"
      style="margin-top:10px;"
    >
      <el-col v-for="(col, j) in coldata['virtualRuleVos'][i].attributeVos" :key="j">
        <el-form-item :model="'virtualRuleVos.' + i" label-width="0px">
          <el-form :model="coldata['virtualRuleVos'][i]" ref="formCol" :disabled="onlyRead" size="small">
            <el-row type="flex" justify="center">
              <el-form-item
                :prop="'attributeVos.' + j + '.value'"
                label-width="0px"
                :rules="Validate({ required: col.required, type: attrType[col.attributeType] })"
              >
                <el-input v-if="attrType[col.attributeType] == 'input'" v-model="col.value" />
                <el-input-number v-else-if="attrType[col.attributeType] == 'float'" v-model="col.value" />
                <el-input-number v-else-if="attrType[col.attributeType] == 'number'" v-model="col.value" />
                <el-select v-else-if="attrType[col.attributeType] == 'select'" v-model="col.value" placeholder="请选择">
                  <el-option
                    v-for="sitem in col.candidateValues"
                    :key="sitem.value"
                    :label="sitem.name"
                    :value="sitem.value"
                  />
                </el-select>
              </el-form-item>
            </el-row>
          </el-form>
        </el-form-item>
      </el-col>
      <span class="form-del-span" v-if="edit && !onlyRead">
        <i class="el-icon-delete" @click="delRow(i)"></i>
      </span>
    </el-row>
    <el-row :gutter="22" v-if="edit && !onlyRead">
      <el-col :span="18" :offset="4">
        <el-button style="width:100%;margin-top:12px;" @click="addRow">添加</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "FormCol",
  data() {
    return {
      isValidate: 0,
      defaultArr: JSON.stringify(this.coldata["virtualRuleVos"][0])
    }
  },
  props: ["coldata", "edit", "max", "onlyRead"],
  watch: {
    coldata: {
      handler() {
        this.defaultArr = JSON.stringify(this.coldata["virtualRuleVos"][0])
      },
      deep: true
    }
  },
  created() {},
  methods: {
    delRow(i) {
      this.coldata["virtualRuleVos"].splice(i, 1)
    },
    addRow() {
      if (this.max && this.coldata["virtualRuleVos"].length >= this.max) {
        this.$message.error("最多可添加" + this.max + "条")
        return
      }
      this.coldata["virtualRuleVos"].push(JSON.parse(this.defaultArr))
    },
    // submit
    validate() {
      var validate = []
      if (this.coldata["virtualRuleVos"]) {
        console.log(this.$refs.formCol)
        this.$refs.formCol.map(item => {
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
      return Promise.all(validate)
        .then(res => {
          return Promise.resolve(res)
        })
        .catch(err => {
          return Promise.reject(err)
        })
    },
    // reset
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss">
.form-flex-title {
  text-align: center;
  transform: translate(-30px, 0);
}
.form-del-span {
  padding: 10px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
