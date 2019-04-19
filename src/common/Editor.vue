<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor"
import { ImgUpload } from "@/utils/url"
export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: "",
      uploadUrl: ImgUpload
    }
  },
  props: ["value"],
  mounted() {
    // this.editorContent = this.value
    this.editor = new E(this.$refs.editor)
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ]
    this.editor.customConfig.pasteIgnoreImg = true
    // 配置服务器端地址
    this.editor.customConfig.uploadImgServer = this.uploadUrl
    this.editor.customConfig.uploadFileName = "file"
    this.editor.customConfig.uploadImgHooks = {
      customInsert: function(insertImg, result) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        var url = result.data
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }
    this.editor.customConfig.onchange = html => {
      this.$emit("input", html)
      this.editorContent = html
    }
    this.editor.create()
    if (this.value) {
      this.editorContent = this.value
      this.editor.txt.html(this.value)
    }
  },
  methods: {
    getContent() {
      this.$emit("getHtml", this.editor)
    },
    setHtml(val) {
      this.editorContent = val
      this.editor.txt.html(val)
    }
  }
}
</script>
<style lang="scss">
.w-e-text-container {
  .w-e-text {
    background-color: #fff !important;
  }
}
</style>
