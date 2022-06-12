<script setup lang="ts">
import { computed } from 'vue'
import { useUsers } from '../api/user'

type TEmit = {
  (e: 'update:modelValue', val: string): void;
}
const emits = defineEmits<TEmit>()

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const { loading, users } = useUsers()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<template>
  <el-select v-model="value" :loading="loading" clearable>
    <el-option v-for="item in users" :key="item.uid" :label="item.name" :value="item.uid"></el-option>
  </el-select>
</template>
