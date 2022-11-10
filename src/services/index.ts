/* eslint-disable implicit-arrow-linebreak */
// @ts-nocheck
import axios from 'axios'
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

export const fetchToken = async (payload, service) => {
  const { data } = await tryLogin(payload, service)
  console.log('1', data)
  return data
  // 提示已经登陆，刷新token
  // if (res.data.messages) {
  //   await atlasApi.post('/api_logout')
  //   res = await tryLogin(payload, service)
  // }
  // return { token: res.data[COOKIE_KEY], ticket: res.data.ticket }
}

// const login = async (payload) => {
//   const loader = Loading.service({
//     lock: true,
//     text: '登录中',
//     spinner: 'el-icon-loading'
//   })

//   const service = this.targetService

//   try {
//     const { token, ticket } = await fetchToken(payload, service)
//     setCookie(token)
//     if (!service) {
//       message({
//         message: '登录成功',
//         type: 'success',
//         duration: 500,
//         showClose: true,
//         onClose: () => {
//           window.location.replace(
//             `${runtime.protocol}//zhuque.${runtime.domain}`
//           )
//         }
//       })
//     } else {
//       redirect(ticket, service)
//     }
//   } catch (e) {
//     let msg = ''
//     if (e.response && e.response.data) {
//       msg = e.response.data.message || '登录失败，请重试'
//     } else {
//       msg = '登录失败，请重试'
//     }
//     Message({
//       message: msg,
//       type: 'error',
//       duration: 5000,
//       showClose: true
//     })
//   }
//   loader.close()
// }
