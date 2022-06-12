
import { ref } from 'vue'
import request from '../module/request'

export type TTask = {
  uid: string;
  labelId: string;
  title: string;
  usedTime: number;
  finishTime: number;
}

export function useTasks() {
  const loading = ref(true)

  const getTasks = async ({ date, uid }: { date: string; uid: string }) => {
    loading.value = true
    return request.get('/tasks', { params: { date, uid } }).then(res => {
      return res.data as TTask[]
    }).finally(() => {
      loading.value = false
    })
  }

  return { loading, getTasks }
}
