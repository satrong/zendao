<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStatistics, TStatistics } from '../api/statistics'

type TEmit = {
  (e: 'select', uid: string): void;
}
const emits = defineEmits<TEmit>()

const props = defineProps({
  date: {
    type: String,
    required: true
  }
})

const list = ref<TStatistics[]>([])

const { loading, getStatistics } = useStatistics()

watch(() => props.date, (val) => {
  if (!val) return
  getStatistics(props.date).then(res => {
    list.value = res
  })
}, { immediate: true })
</script>

<template>
  <el-table :data="list" v-loading="loading" stripe>
    <el-table-column label="用户名">
      <template #default="{ row }">
        <el-button type="primary" text @click="emits('select', row.uid)">
          {{ row.name }}
        </el-button>
      </template>
    </el-table-column>

    <el-table-column label="总任务" prop="totalTask" />
    <el-table-column label="总耗时" prop="totalUsedTime" />
  </el-table>
</template>
