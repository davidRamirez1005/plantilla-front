<template>
  <div>
    <Skeleton variant="card" :animated="true" :loading="isLoading" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Skeleton from "@/components/ui/Skeleton.vue"

const isLoading = ref(true);
</script>

<style scoped></style>
