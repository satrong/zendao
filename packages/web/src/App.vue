<script setup lang="ts">
import dayjs from 'dayjs'
import { useStorage } from '@vueuse/core'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import topHeaderVue from './components/topHeader.vue';
import statisticsVue from './components/statistics.vue';
import taskVue from './components/task.vue';

const date = useStorage('date', dayjs().format('YYYY-MM'))
const uid = useStorage('uid', '')
</script>

<template>
  <el-config-provider :locale="zhCn">
    <el-container>
      <el-header height="40" class="mt-10px">
        <topHeaderVue v-model:date="date" v-model:uid="uid" />
      </el-header>
      <el-main>
        <taskVue v-if="uid" :date="date" :uid="uid" />
        <statisticsVue v-else :date="date" @select="(val: string) => uid = val" />
      </el-main>
    </el-container>
  </el-config-provider>
</template>
