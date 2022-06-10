import { promisify } from 'node:util'
import { login } from './api/login'
import { getUser } from './api/user'
import { getAllDynamic } from './api/dynamic'
import { db } from './db'

async function bootstrap() {
  if (await login()) {
    const users = await getUser()

    const SQL_INSERT_USER = `INSERT OR REPLACE INTO user (uid, account, name) VALUES (?, ?, ?)`
    const userStmt = db.prepare(SQL_INSERT_USER)

    for (const user of users) {
      await promisify<any[], any>(userStmt.run.bind(userStmt))([user.id, user.account, user.name])
    }

    const mapping = users.reduce((acc, user) => {
      acc[user.name] = user.id
      return acc
    }, {} as Record<string, string>)

    const tasks = await getAllDynamic()
    const SQL_INSERT_TASK = `INSERT INTO task (uid, labelId, title, usedTime, finishTime) VALUES (?, ?, ?, ?, ?)`
    const SQL_COUNT_TASK = `SELECT COUNT(*) as count FROM task WHERE labelId = ?`
    const taskStmt = db.prepare(SQL_INSERT_TASK)
    for (const task of tasks) {
      const result = await promisify<string, string, { count: number }>(db.get.bind(db))(SQL_COUNT_TASK, task.labelId)
      if (result.count === 0) {
        await promisify<any[], any>(taskStmt.run.bind(taskStmt))([mapping[task.finisher], task.labelId, task.title, task.usedTime, task.finishTime])
      }
    }
  } else {
    console.log('login failed')
  }
}

bootstrap()
