<template>
  <div id="app">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-row :gutter="24" class>
        <el-col :span="4">
          <Aside />
        </el-col>
        <el-col :span="20">
          <Breadcrumb></Breadcrumb>
          <router-view></router-view>
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
  components: {
    Aside,
    Header,
    Breadcrumb
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
  .el-header {
    padding: 0;
    background: #001830;
    color: #fff;
  }
}
</style>
