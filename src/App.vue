<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-row :gutter="20" class="zvip-cont">
        <el-col :span="4" class="zvip-left">
          <Aside />
        </el-col>
        <el-col :span="20" class="zvip-right">
          <Breadcrumb></Breadcrumb>
          <router-view v-if="isReload"></router-view>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import Aside from "@/layout/Aside.vue"
import Header from "@/layout/Header"
import Breadcrumb from "@/common/Breadcrumb"
export default {
  name: "App",
  mixins: ["vvip_business_id"],
  components: {
    Aside,
    Header,
    Breadcrumb
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isReload: true
    }
  },
  methods: {
    reload() {
      this.isReload = false
      this.$nextTick(function() {
        this.isReload = true
        this.vvip_business_id = window.localStorage.getItem("vvip_business_id")
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  min-width: 1366px;
  .el-header {
    padding: 0;
    background: #001830;
    color: #fff;
  }
}
</style>
