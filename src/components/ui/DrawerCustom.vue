<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :direction="direction"
    :size="size"
    :before-close="handleClose"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :modal="modal"
    :append-to-body="appendToBody"
    :destroy-on-close="destroyOnClose"
  >
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>

    <template #default>
      <slot></slot>
    </template>

    <template v-if="$slots.footer || showFooter" #footer>
      <slot name="footer">
        <div class="drawer-footer">
          <el-button @click="handleCancel">{{ cancelText }}</el-button>
          <el-button type="primary" @click="handleConfirm" :loading="confirmLoading">
            {{ confirmText }}
          </el-button>
        </div>
      </slot>
    </template>
  </el-drawer>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  direction: {
    type: String,
    default: "rtl",
    validator: (value) => ["ltr", "rtl", "ttb", "btt"].includes(value),
  },
  size: {
    type: [String, Number],
    default: "30%",
  },
  beforeClose: {
    type: Function,
    default: undefined,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
  cancelText: {
    type: String,
    default: "Cancelar",
  },
  confirmText: {
    type: String,
    default: "Confirmar",
  },
  confirmLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(["update:modelValue", "cancel", "confirm", "close"])

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
})

const handleClose = (done) => {
  if (props.beforeClose) {
    props.beforeClose(done)
  } else {
    done()
    emit("close")
  }
}

const handleCancel = () => {
  visible.value = false
  emit("cancel")
}

const handleConfirm = () => {
  emit("confirm")
}
</script>

<style scoped>
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}
</style>
