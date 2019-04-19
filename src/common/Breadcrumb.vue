<template>
  <div class="zvip-path">
    <el-breadcrumb v-if="$route.meta.title" separator=">">
      <el-breadcrumb-item>当前位置：{{ $route.meta.title }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '' + routerData.pathName }">{{ routerData.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: "Breadcrumb",
  data() {
    return {
      routerData: {}
    }
  },
  computed: {
    ...mapGetters(["headerArr", "headerIndex"])
  },
  methods: {
    fetchDate(data) {
      const _this = this
      data.meta.breadcrumb &&
        data.meta.breadcrumb.map(item => item.pathName == `${data.path}` && (_this.routerData = item))
      // this.routerData = data.meta ? data.meta : ""
    }
  },
  watch: {
    $route: "fetchDate"
  },
  mounted() {
    // this.routerData = this.$route.meta.breadcrumb ? this.$route.meta.breadcrumb : ""
  }
}
</script>
