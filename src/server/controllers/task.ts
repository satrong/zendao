import { promisify } from 'node:util'
import dayjs from 'dayjs'
import { db } from '../../db';

const SQL_GET_TASK = `
  SELECT * FROM task
    WHERE task.uid = ? AND task.finishTime >= ? AND task.finishTime < ?
`

export async function getTasks(uid: string, dateStr: string) {
  const date = dayjs(dateStr)
  const startTime = date.date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()
  const endTime = date.month(date.month() + 1).valueOf()
  return await promisify<string, any[], any[]>(db.all.bind(db))(
    SQL_GET_TASK,
    [uid, startTime, endTime]
  )
}
