import Ajax from '@/common/ajax'
import config from '@/utils/config'
import Toast from '@/components/Toast'

export function loadUserInfo({ user }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: config.api.getuserinfo,
        method: 'get',
        data: {
          uid: user.userid
        },
        headers: {
          authorization: user.token
        }
      })

      if (err) {
        resolve([err])
      } else {
        dispatch({ type: 'SAVE_USER_INFO', data: data })
        resolve([null, data])
      }
    })
  }
}

export function getCode() {
  return () => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: config.api.verify,
        method: 'get'
      })

      if (err) {
        resolve([err])
      } else {
        resolve([null, data])
      }
    })
  }
}

export function saveCookie(params, name) {
  return new Promise(async (resolve, reject) => {
    // 这里写你的登录请求，登录成功以后，将token储存到cookie，使用httpOnly(比较安全)
    // your code ...
    let [err, data] = await Ajax({
      url: config.api[name],
      method: 'post',
      data: params
    })

    if (data.code === 1) {
      localStorage.setItem('userid', data.data.userid)
      localStorage.setItem('token', data.data.token)
      // 储存 cookie
      ;[err, data] = await Ajax({
        url: window.location.origin + '/sign/in',
        method: 'post',
        data: { user: data.data }
      })

      if (data && data.success) {
        resolve([null, true])
      } else {
        resolve(['sign error'])
      }
    } else {
      Toast.error(data.msg)
    }
  })
}

export function signIn({ username, password, validate, key }) {
  return dispatch => {
    return saveCookie({ user_name: username, user_password: password, validate, key }, 'login')
  }
}

export function signUp({ username, password, email, validate, key }) {
  return dispatch => {
    return saveCookie({ user_name: username, user_password: password, email, validate, key }, 'reg')
  }
}

export function signOut() {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: window.location.origin + '/sign/out',
        method: 'post'
      })

      if (data && data.success) {
        resolve([null, true])
      } else {
        resolve(['sign error'])
      }
    })
  }
}
