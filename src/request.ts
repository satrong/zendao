import got from 'got';
import {CookieJar} from 'tough-cookie';

const cookieJar = new CookieJar();
const domain = 'http://192.168.0.108:8800'

export const request = got.extend({
  prefixUrl: domain,
  cookieJar,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36',
    'Referer': `${domain}/user-login.html`
  }
})
