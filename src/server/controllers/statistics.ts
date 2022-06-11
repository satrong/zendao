import { promisify } from 'node:util'
import dayjs from 'dayjs'
import { db } from '../../db';

const SQL_STATISTICS = `
  SELECT a.name, a.uid, count(task.uid) as totalTask, sum(usedTime) as totalUsedTime FROM task
    INNER JOIN
      (SELECT * FROM user) as a ON task.uid = a.uid
    WHERE task.finishTime >= ? AND task.finishTime < ?
    GROUP BY task.uid
    ORDER BY totalUsedTime DESC
`

export async function getStatistics(dateStr: string) {
  const date = dayjs(dateStr)
  const startTime = date.date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()
  const endTime = date.month(date.month() + 1).valueOf()
  console.log(startTime, endTime)

  return await promisify<string, any[], any[]>(db.all.bind(db))(
    SQL_STATISTICS,
    [startTime, endTime]
  )
}
