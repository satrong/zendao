import { load } from 'cheerio'
import { request } from '../request'
import { getDetail } from './detail'

// company-dynamic-all--0--next--all-all-all-date_asc.html

export async function getDynamic(url: string, cb: (data: string[]) => Promise<any>) {
  const res = await request.get(url)
  const $ = load(res.body)

  const arr: string[] = []
  $('#dynamics').find('ul.timeline').children('.active').each((i, el) => {
    const action = $(el).find('span.label-action').text().trim()
    const type = $(el).find('span.text').text().trim()

    if (action === '完成了' && type === '任务') {
      const labelId = $(el).find('.label-id').text().trim()
      arr.push(labelId)
    }
  })

  await cb(arr)

  const prevEl = $('#prevPage')
  if (prevEl.length > 0) {
    await getDynamic(prevEl.attr('href')!.slice(1), cb)
  }
}

export async function getAllDynamic() {
  const arr: { title: string; usedTime: number }[] = []
  await getDynamic('company-dynamic-all--0--next--all-all-all-date_asc.html', async (labelIds: string[]) => {
    for (const labelId of labelIds) {
      arr.push(await getDetail(labelId))
    }
  })
  return arr
}
