import { load } from 'cheerio'
import { request } from '../request'

export async function getUser() {
  return request.get('company-dynamic.html').then(res => {
    const $ = load(res.body)

    const arr: { account: string; id: string; }[] = []
    $('#account').children().each((i, el) => {
      if (i === 0) return

      const id = $(el).attr('value')!
      const account = $(el).attr('title')!

      arr.push({ id, account })
    })

    return arr
  })
}