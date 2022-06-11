import hapi from '@hapi/hapi'

import { getUsers } from './controllers/user'
import { getTasks } from './controllers/task'
import { getStatistics } from './controllers/statistics'
import './sync'

const server = hapi.server({
  port: 3000,
  host: 'localhost'
})

server.route([
  {
    path: '/api/statistics',
    method: 'GET',
    async handler(request) {
      const { date } = request.query
      return await getStatistics(date)
    }
  },
  {
    path: '/api/users',
    method: 'GET',
    handler: getUsers
  },
  {
    path: '/api/tasks',
    method: 'GET',
    async handler(request, h) {
      const { uid, date } = request.query
      return await getTasks(uid, date)
    }
  }
])

server.start().then(() => {
  console.log('Server running at:', server.info.uri)
})
