<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="app-breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbItems"
      :key="index"
      :to="item.link ? { path: item.link } : undefined"
    >
      {{ item.text }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import { ArrowRight } from "@element-plus/icons-vue"
import features from "@/config/features"

const route = useRoute()
const { t } = features.i18n ? useI18n() : { t: (key) => key }

const breadcrumbItems = computed(() => {
  const breadcrumb = route.meta?.breadcrumb || []

  if (breadcrumb.length === 0) {
    return []
  }

  return breadcrumb.map((item) => ({
    text: features.i18n ? t(item.label) : item.label,
    link: item.link,
  }))
})
</script>

<style scoped>
.app-breadcrumb {
  font-size: 14px;
  line-height: 1.5;
}

.app-breadcrumb :deep(.el-breadcrumb__item) {
  display: inline-flex;
  align-items: center;
}

.app-breadcrumb :deep(.el-breadcrumb__inner) {
  color: var(--el-text-color-regular);
  font-weight: 400;
}

.app-breadcrumb :deep(.el-breadcrumb__inner.is-link) {
  color: var(--el-color-primary);
  font-weight: 400;
}

.app-breadcrumb :deep(.el-breadcrumb__inner.is-link:hover) {
  color: var(--el-color-primary-light-3);
}

.app-breadcrumb :deep(.el-breadcrumb__item:last-child .el-breadcrumb__inner) {
  color: var(--el-text-color-primary);
  font-weight: 500;
}
</style>
