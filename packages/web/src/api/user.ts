
import { ref } from 'vue'
import request from '../module/request'

export type TUser = {
  uid: string;
  name: string;
  account: string;
}

export function useUsers() {
  const loading = ref(true)
  const users = ref<TUser[]>([])

  request.get('/users').then(res => {
    users.value = res.data as TUser[]
  }).finally(() => {
    loading.value = false
  })

  return { loading, users }
}
