import { load } from 'cheerio'
import { request } from '../request'

export async function getDetail(labelId: string) {
  const res = await request.get(`task-view-${labelId}.html`)
  const $ = load(res.body)

  const title = $('.page-title .text').text().trim()

  const trs = $('#legendEffort tbody').children()
  let usedTime = 0

  for (const tr of trs) {
    const label = $(tr).children('th').text().trim()
    if (label === '总计消耗') {
      usedTime = Number($(tr).children('td').text().slice(0, -2))
      break
    }
  }

  return { title, usedTime }
}
