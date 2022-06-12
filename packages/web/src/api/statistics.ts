
import { ref } from 'vue'
import request from '../module/request'

export type TStatistics = {
  name: string;
  uid: string;
  totalTask: number;
  totalUsedTime: number;
}

export function useStatistics() {
  const loading = ref(true)

  const getStatistics = async (date: string) => {
    loading.value = true
    return request.get('/statistics', { params: { date } }).then(res => {
      return res.data as TStatistics[]
    }).finally(() => {
      loading.value = false
    })
  }

  return { loading, getStatistics }
}
