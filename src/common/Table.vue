<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <el-table-column
        v-for="(item, i) in label"
        :key="i"
        :fixed="item.fixed"
        :width="item.width"
        :prop="item.key"
        :label="item.label"
      >
        <template slot-scope="scope">
          <slot :scope="scope" :name="item.slot" v-if="item.slot"></slot>
          <span v-else>
            {{ scope.row[item.key] }}
          </span>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div class="zpage-box">
      <el-pagination
        v-if="total > size"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :total="total"
        :page-size="size"
        @current-change="handlePage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      currentPage: this.value || 1,
      size: this.pageSize || 10
    }
  },
  props: ["data", "label", "total", "pageSize", "value"],
  watch: {
    value() {
      this.currentPage = this.value
    }
  },
  methods: {
    handlePage(val) {
      this.$emit("input", val)
      this.$emit("currPage", val)
    }
  }
}
</script>
