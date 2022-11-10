/* eslint-disable implicit-arrow-linebreak */
// @ts-nocheck
import axios from 'axios'
import cookie from 'js-cookie'
import runtime from './runtims'

export const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded'

const atlasApi = axios.create({
  baseURL: runtime.atlasUrl,
  transformRequest: [
    function (data, headers) {
      if (headers['Content-Type'] === FORM_CONTENT_TYPE) {
        return Object.keys(data)
          .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
          .join('&')
      }
      return data
    }
  ]
})

const tryLogin = (payload, service) =>
  atlasApi.post('/api_login', payload, {
    params: {
      service
    },
    headers: {
      'Content-Type': FORM_CONTENT_TYPE
    }
  })
export const COOKIE_KEY = 'pigeon'

export const fetchToken = async (payload, service) => {
  const { data } = await tryLogin(payload, service)
  console.log('1', data)
  return { token: data[COOKIE_KEY], ticket: data.ticket }
  // 提示已经登陆，刷新token
  // if (res.data.messages) {
  //   await atlasApi.post('/api_logout')
  //   res = await tryLogin(payload, service)
  // }
  // return { token: res.data[COOKIE_KEY], ticket: res.data.ticket }
}

function setCookie(sessionid) {
  const options = {
    path: '/',
    domain: 'zaihuiba.com',
    expires: 7
  }
  cookie.remove(COOKIE_KEY, { path: '/' })
  if (sessionid) {
    cookie.set(COOKIE_KEY, sessionid, options)
  }
}

const login = async (payload) => {
  // const service = this.targetService

  try {
    const { token } = await fetchToken(payload, '')
    setCookie(token)
  } catch (e) {
    let msg = ''
    if (e.response && e.response.data) {
      msg = e.response.data.message || '登录失败，请重试'
    } else {
      msg = '登录失败，请重试'
    }
  }
}
