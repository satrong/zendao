import schedule from 'node-schedule'
import { startCrawler } from '../crawler/index'

startCrawler()

schedule.scheduleJob('*/10 * * * *', async () => {
  startCrawler()
})
