import { request } from '../request'
import { md5 } from '../util'
import { ACCOUNT, PASSWORD } from '../config'

export async function login() {
  return request.get('user-refreshRandom.html').then(res => {
    const rand = res.body

    const data = {
      account: ACCOUNT,
      password: md5(md5(PASSWORD) + rand),
      passwordStrength: 0,
      verifyRand: rand,
      keepLogin: 0,
      captcha: ''
    }
    return request.post('user-login.html', {
      form: data
    }).then(res => {
      try {
        const json = JSON.parse(res.body) as any as { result: string }
        return json.result === 'success'
      } catch (err) {
        return false
      }
    })
  })
}

