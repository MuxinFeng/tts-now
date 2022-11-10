const root = typeof self === 'object' && self.self === self && self

const TOP_REG = /[-\w]+\.(?:[-\w]+\.xn--[-\w]+|[-\w]{3,}|[-\w]+\.[-\w]{2})$/i

export function getDomain(url) {
  const matches = url.match(TOP_REG)
  return matches ? matches[0] : 'wozaihui.com'
}

let serverUrl = 'http://www.zaihuiba.com'
let samaritanUrl = 'http://127.0.0.1:4096'
let domain = '127.0.0.1'
let kylinUrl = 'https://qilin.zaihuiba.com'
let atlasUrl = 'https://atlas-inter.zaihuiba.com'
const { protocol } = root.location

if (process.env.NODE_ENV !== 'development') {
  domain = getDomain(root.location.hostname)
  serverUrl = `${protocol}//www.${domain}`
  samaritanUrl = `${protocol}//lx.${domain}`
  kylinUrl = `${protocol}//qilin.${domain}`
  atlasUrl = `${protocol}//atlas-inter.${domain}`
}

export default {
  protocol,
  domain,
  samaritanUrl,
  serverUrl,
  kylinUrl,
  atlasUrl
}
