<template>
  <el-row :gutter="24" class>
    <el-col :span="4">login 占位</el-col>
    <el-col :span="16">
      <el-menu
        default-active="1"
        class="el-menu-demo"
        @select="menuSelect"
        text-color="#ccc"
        background-color="#001830"
        active-text-color="#ffd04b"
        mode="horizontal"
      >
        <el-menu-item v-for="(item, i) in headerArr" :key="i" :index="'' + i + ''">{{ item.name }}</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="2" :offset="2" class="user_info">
      <span>王小虎</span>
      <el-dropdown>
        <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
export default {
  label: "Header",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["headerIndex", "headerArr"])
  },
  created() {
    this.getAsidePath()
  },
  methods: {
    ...mapActions(["getHeaderIndex", "getAsidePath"]),
    menuSelect(index) {
      this.getAsidePath(index)
      this.getHeaderIndex(index)
    }
  }
}
</script>
<style lang="scss">
.el-menu {
  background: rgba(0, 0, 0, 0) !important;
  .el-menu--horizontal {
    border: none !important;
    color: #000000;
    padding: 0;
  }
}
.user_info {
  margin-top: 30px;
}
</style>
