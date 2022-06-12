<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import dayjs from 'dayjs'
import { useTasks, TTask } from '../api/task'

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

const list = ref<TTask[]>([])
const { loading, getTasks } = useTasks()

watchEffect(() => {
  getTasks({ date: props.date, uid: props.uid }).then(res => {
    list.value = res
  })
})
</script>

<template>
  <el-table :data="list" v-loading="loading" stripe>
    <el-table-column label="任务ID" prop="labelId" />
    <el-table-column label="任务名称" prop="title" />
    <el-table-column label="耗时" prop="usedTime" />
    <el-table-column label="完成时间">
      <template #default="{ row }">
        {{ dayjs(row.finishTime).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
    </el-table-column>
  </el-table>
</template>
