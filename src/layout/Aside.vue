<template>
  <el-row :gutter="4" class>
    <el-col :span="24">
      <el-menu
        router
        :default-active="'/' + $route.name"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu v-for="(item, index) in asideList" :key="index" :index="item.index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="(sitem, sindex) in item.children" :key="sindex" :index="'/' + sitem.pathName">{{
            sitem.name
          }}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters, mapMutations } from "vuex"
export default {
  name: "Aside",
  data() {
    return {}
  },
  computed: {
    ...mapGetters(["asideList"])
  },
  created() {},
  methods: {
    ...mapMutations(["upAsideActive"]),
    handleOpen(key) {
      this.upAsideActive(key)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
