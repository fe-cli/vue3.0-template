<template>
  <el-row :gutter="24" class>
    <el-col :span="4"><img src="./../assets/logo.png" style="height:40px;margin:14px 0;" alt=""/></el-col>
    <el-col :span="16">
      <el-menu
        :default-active="headerIndex"
        class="el-menu-demo"
        @select="menuSelect"
        text-color="#ccc"
        background-color="#001830"
        active-text-color="#ffd04b"
        mode="horizontal"
      >
        <el-menu-item v-for="(item, i) in headerArr" :key="i" :index="'' + i + ''">{{ item.label }}</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="2" style="margin:12px 0">
      <el-select size="small" v-model="type" @change="routerReload" v-if="type" style="min-width:120px">
        <el-option
          v-for="(item, key) in options"
          :key="key"
          :label="item.name"
          :value="item.vvip_business_id"
        ></el-option>
      </el-select>
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
  inject: ["reload"],
  data() {
    return {
      nickName: "",
      type: "",
      options: []
    }
  },
  computed: {
    ...mapGetters(["headerIndex", "headerArr"])
  },
  created() {},
  methods: {
    ...mapActions(["getHeaderIndex", "getAsidePath"]),
    routerReload(val) {
      window.localStorage.setItem("vvip_business_id", val)
      // location.reload()
      this.reload()
    },
    menuSelect(index) {
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
  margin-top: 20px;
  font-size: 16px;
}
</style>
