import { login } from './api/login'
import { getUser } from './api/user'
import { getAllDynamic } from './api/dynamic'

async function bootstrap() {
  if (await login()) {
    const users = await getUser()
    const tasks = await getAllDynamic()
    console.log(tasks)
  } else {
    console.log('login failed')
  }
}

bootstrap()
