<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-aside width="200px"><p>Aside</p></el-aside>
        <el-container>
          <el-main><MainSection /></el-main>
          <el-footer><p>Footer</p></el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import MainSection from "../components/MainSection.vue"
</script>

<style scoped>
.el-footer {
  background-color: var(--app-bg-secondary);
  text-align: center;
}
.el-aside {
  background-color: var(--app-bg-secondary);
  text-align: center;
}

</style>
