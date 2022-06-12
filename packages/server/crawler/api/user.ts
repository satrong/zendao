import { load } from 'cheerio'
import { request } from '../request'

export async function getUser() {
  return request.get('company-dynamic.html').then(res => {
    const $ = load(res.body)

    const arr: { account: string; id: string; name: string }[] = []
    $('#account').children().each((i, el) => {
      if (i === 0) return

      const id = $(el).attr('value')!
      const name = $(el).attr('title')!
      const account = $(el).attr('data-keys')!.trim().split(' ')[0]

      arr.push({ id, account, name })
    })

    return arr
  })
}