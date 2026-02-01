<template>
  <div class="skeleton-wrapper">
    <el-skeleton
      v-if="variant === 'avatar' || variant === 'circle'"
      :style="{ '--el-skeleton-circle-size': avatarSize }"
    >
      <template #template>
        <el-skeleton-item variant="circle" />
      </template>
    </el-skeleton>

    <!-- Header Skeleton (para headers/navbar) -->
    <el-skeleton v-if="variant === 'header'" :animated="animated" :loading="loading">
      <template #template>
        <div class="header-skeleton">
          <div class="flex items-center gap-3">
            <el-skeleton-item variant="circle" style="width: 40px; height: 40px" />
            <el-skeleton-item variant="text" style="width: 120px" />
          </div>
          <div class="flex items-center gap-4">
            <el-skeleton-item variant="text" style="width: 60px" />
            <el-skeleton-item variant="text" style="width: 80px" />
            <el-skeleton-item variant="text" style="width: 70px" />
            <el-skeleton-item variant="button" style="width: 100px" />
          </div>
        </div>
      </template>
    </el-skeleton>

    <!-- Card Skeleton -->
    <el-skeleton v-if="variant === 'card'" :animated="animated" :loading="loading">
      <template #template>
        <div class="card-skeleton">
          <el-skeleton-item variant="image" :style="{ height: imageHeight }" />
          <div style="padding: 14px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div style="display: flex; align-items: center; margin-top: 16px">
              <el-skeleton-item variant="text" style="margin-right: 16px" />
              <el-skeleton-item variant="text" style="width: 30%" />
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>

    <!-- List Skeleton -->
    <el-skeleton v-if="variant === 'list'" :rows="rows" :animated="animated" :loading="loading" />

    <!-- Text Skeleton -->
    <el-skeleton v-if="variant === 'text'" :rows="rows" :animated="animated" :loading="loading">
      <template #default>
        <slot />
      </template>
    </el-skeleton>

    <!-- Image Skeleton -->
    <el-skeleton v-if="variant === 'image'" :animated="animated" :loading="loading">
      <template #template>
        <el-skeleton-item variant="image" :style="{ width: '100%', height: imageHeight }" />
      </template>
    </el-skeleton>

    <!-- Custom Skeleton -->
    <el-skeleton v-if="variant === 'custom'" :animated="animated" :loading="loading">
      <template #template>
        <slot name="template" />
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "text",
    validator: (value) =>
      ["avatar", "circle", "header", "card", "list", "text", "image", "custom"].includes(value),
  },
  rows: {
    type: Number,
    default: 3,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
  avatarSize: {
    type: String,
    default: "100px",
  },
  imageHeight: {
    type: String,
    default: "200px",
  },
})
</script>

<style scoped>
.skeleton-wrapper {
  width: 100%;
}

.header-skeleton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  width: 100%;
}

.card-skeleton {
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--el-fill-color-blank);
}
</style>
