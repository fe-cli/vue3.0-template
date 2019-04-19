<template>
  <div class="about">
    <ImgUpload v-model="imgUrl" ref="testUpload"></ImgUpload>
    <el-button @click="valivn">dsafs</el-button>
    <Editor ref="editor" v-model="html"></Editor>
    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
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
import { rule } from "api/api-schema"
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
    rule().then(res => {
      _this.triggerData = res.data
    })
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
