<template>
  <div>
    <!-- 暂时不支持多图片展示 需要的话后期修改优化 -->
    <div class="active-new-img" v-if="imageUrl != '' && limit == 1">
      <img :src="imageUrl" class="avatar" />
      <div class="active-upload-set" v-if="!isDisabled">
        <i class="el-icon-delete" @click="activUploadImgDel"></i>
      </div>
    </div>
    <!--<template v-if="imageUrl.length && limit != 1">-->
    <!--<div class="active-new-img" v-for="(item, i) in imageUrl" :key="i">-->
    <!--<img :src="item" class="avatar" />-->
    <!--<div class="active-upload-set">-->
    <!--<i class="el-icon-delete" @click="activUploadImgDel(i)"></i>-->
    <!--</div>-->
    <!--</div>-->
    <!--</template>-->
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="uploadUrl"
      :on-preview="handlePreview"
      :on-success="handleAvatarSuccess"
      list-type="picture-card"
      :before-upload="beforeAvatarUpload"
      multiple
      :show-file-list="false"
      v-if="imageUrl == ''"
      :limit="limit"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="el-upload__tip">{{ tip }}</div>
  </div>
</template>

<script>
import { ImgUpload } from "@/utils/url"

export default {
  name: "ImgUpload",
  data() {
    return {
      uploadUrl: ImgUpload,
      imageUrl: "",
      isDisabled: false
    }
  },
  props: {
    tip: {
      type: String,
      default: "只能上传jpg/png文件，且不超过500kb"
    },
    fileSize: {
      type: Number,
      default: 2
    },
    fileType: {
      type: Array,
      default: function() {
        return ["jpeg", "gif", "png"]
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: Number,
      default: 500
    },
    maxHeight: {
      type: Number,
      default: 500
    },
    limit: {
      type: Number,
      default: 1
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.imageUrl = this.value
    this.isDisabled = this.$parent.disabled || this.$parent.$parent.disabled || this.$parent.$parent.$parent.disabled
  },
  watch: {
    value: function() {
      this.imageUrl = this.value
    },
    disabled: function() {
      this.isDisabled = this.disabled
    },
    "$parent.$parent.disabled": function() {
      this.isDisabled = this.$parent.$parent.disabled
    }
  },
  methods: {
    handlePreview() {},
    activUploadImgDel(i) {
      if (this.limit > 1) {
        this.imageUrl.splice(i, 1)
      } else {
        // this.imageUrl = ""
        this.$emit("input", "")
      }
    },
    handleAvatarSuccess(res) {
      if (this.limit > 1) {
        this.imageUrl = []
        this.imageUrl.push(res.data)
      } else {
        // this.imageUrl = res.data
        this.$emit("input", res.data)
      }
      // this.$emit("sucess", res.data)
    },
    beforeAvatarUpload(file) {
      var isType = true
      var FileType = file.type.replace(/image\//g, "")
      let _this = this
      if (this.fileType.indexOf(FileType) == -1) {
        isType = false
      }
      const isLt2M = file.size / 1024 / 1024 < this.fileSize
      if (!isType) {
        this.$message.error("上传图片必须是" + this.fileType.join("/").replace(/image\//g, "") + "格式!")
      }
      if (!isLt2M) {
        this.$message.error(`上传图片大小不能超过${this.fileSize}MB!`)
      }
      const isSize = new Promise(function(resolve, reject) {
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function() {
          console.log(img.width, _this.maxWidth, _this.maxHeight, img.height)
          let valid = img.width <= _this.maxWidth && img.height <= _this.maxHeight
          console.log(valid)
          valid ? resolve() : reject()
        }
        img.src = _URL.createObjectURL(file)
      }).then(
        () => {
          return file
        },
        () => {
          this.$message.error(`上传的文件必须宽<=${_this.maxWidth},高<=${_this.maxHeight}`)
          return Promise.reject()
        }
      )
      return isType && isLt2M && isSize
    }
  }
}
</script>
<style lang="scss">
.upload-demo {
  position: relative;
  .avaimg {
    position: absolute;
    width: 148px;
    height: 148px;
    left: 0;
    top: 0;
  }
}
.active-new-img {
  position: relative;
  width: 148px;
  height: 148px;
  overflow: hidden;
  border: 1px dashed #d3d3d3;
  img {
    width: 100%;
  }
  .active-upload-set {
    display: none;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
  }
  .active-upload-set i {
    cursor: pointer;
    color: #fff;
    line-height: 148px;
    font-size: 24px;
  }
  &:hover .active-upload-set {
    display: block;
  }
}
</style>
