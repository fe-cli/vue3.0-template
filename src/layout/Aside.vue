<template>
  <el-row :gutter="4" class>
    <el-col :span="24" v-if="active">
      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-active="'/' + active">
        <el-submenu v-for="(item, index) in asideList" :key="index" :index="'' + index + 1 + ''">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ item.label }}</span>
          </template>
          <router-link v-for="(sitem, sindex) in item.children" :key="sindex" :to="{ name: sitem.path }">
            <el-menu-item :index="'/' + sitem.path">
              {{ sitem.label }}
            </el-menu-item>
          </router-link>
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
    return {
      active: null
    }
  },
  computed: {
    ...mapGetters(["asideList", "asideActive"])
  },
  watch: {
    asideActive() {
      this.active = this.asideActive
    }
  },
  created() {},
  methods: {
    ...mapMutations(["upAsideActive"]),
    handleOpen(key) {
      this.upAsideActive(key)
    },
    handleClose() {}
  }
}
</script>
