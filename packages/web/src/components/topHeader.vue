<script setup lang="ts">
import { computed } from 'vue'
import userSelectVue from './userSelect.vue';

type TEmit = {
  (e: 'update:date', val: string): void;
  (e: 'update:uid', val: string): void;
}
const emits = defineEmits<TEmit>()

const props = defineProps({
  date: {
    type: String,
    default: ''
  },
  uid: {
    type: String,
    default: ''
  }
})

const date = computed({
  get() {
    return props.date
  },
  set(val) {
    emits('update:date', val)
  }
})

const uid = computed({
  get() {
    return props.uid
  },
  set(val) {
    emits('update:uid', val)
  }
})
</script>

<template>
  <div class="flex justify-between">
    <div class="w-60px">
      <el-button v-if="uid" @click="uid = ''">
        返回
      </el-button>
    </div>
    <div class="flex justify-center">
      <el-date-picker v-model="date" type="month" value-format="YYYY-MM" clearable></el-date-picker>
      <userSelectVue v-model="uid" />
    </div>
    <div></div>
  </div>
</template>
