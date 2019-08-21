<template>
  <el-popover
    :placement="placement"
    :width="width"
    :trigger="trigger"
    :title="title"
    :ref="'popover-' + index"
    @hide="closePopover(index)"
  >
    <slot></slot>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="closePopover(index)">取消</el-button>
      <el-button type="primary" size="mini" @click="submitPop">确定</el-button>
    </div>
    <slot name="reference" slot="reference"></slot>
  </el-popover>
</template>

<script>
/**
 * 功能描述: 二次封装elemenUI，完善table里取消关闭时间
 * @Author:yangkai9
 * @Date: 2019/7/29 17:25
 */
export default {
  name: "PopOver",
  props: {
    placement: {
      type: String,
      default: "top"
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "200"
    },
    trigger: {
      type: String,
      default: "click"
    },
    index: {
      type: Number
    },
    data: {
      type: Object
    }
  },
  methods: {
    closePopover(index) {
      this.$refs[`popover-` + index].doClose()
      this.$emit("close", this.data, this.index)
    },
    submitPop() {
      this.$refs[`popover-` + this.index].doClose()
      this.$emit("popSub", this.data, this.index)
    }
  }
}
</script>
