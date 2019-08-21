<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      ref="multipleTable"
      @selection-change="selectEvent"
      :row-key="getRowKeys"
    >
      <el-table-column v-if="checkList" type="selection" :reserve-selection="true"></el-table-column>
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
    <div class="zpage-box" v-if="total > size">
      <el-pagination
        background
        :layout="showTotal ? 'total, prev, pager, next' : 'prev, pager, next'"
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
      size: this.pageSize || 10,
      selected: this.checkList || []
    }
  },
  props: ["data", "label", "total", "pageSize", "value", "showTotal", "checkList"],
  watch: {
    value() {
      this.currentPage = this.value
    }
  },
  mounted() {
    this.checkList && this.checkList.length && this.toggleSelection(this.checkList)
  },
  methods: {
    handlePage(val) {
      this.$emit("input", val)
      this.$emit("currPage", val)
    },
    getRowKeys(row) {
      return row.id
    },
    selectEvent(select) {
      this.selected = [...select]
      // 选中回调后门 暂留
      this.$emit("select", select)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>
