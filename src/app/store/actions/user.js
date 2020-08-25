import Ajax from '@/common/ajax'
import config from '@/utils/config'
import Toast from '@/components/Toast'
import Post from '@/utils/post'

export function loadUserInfo({ user }) {
  return async (dispatch, getState) => {
    const [err, data] = await Ajax({
      url: config.api.getuserinfo,
      method: 'get',
      headers: {
        Authorization: user.token
      }
    })

    if (err) {
      return [err]
    } else {
      dispatch({ type: 'SAVE_USER_INFO', data: data })
      return [null, data]
    }
  }
}

export function getCode() {
  return async () => {
    const [err, data] = await Ajax({
      url: config.api.verify,
      method: 'get'
    })

    if (err) {
      return [err]
    } else {
      return [null, data]
    }
  }
}

export function send({ to }) {
  return () => {
    return Post({
      api: 'send',
      params: {
        type: 'reg',
        ac: 'mobile',
        to
      }
    })
  }
}

export async function saveCookie(params, name) {
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
      return [null, true]
    } else {
      return ['sign error']
    }
  } else {
    Toast.error(data.msg)
  }
}

export function signIn({ username, password, validate, key }) {
  return () => {
    return saveCookie({ user_name: username, user_password: password, validate, key }, 'login')
  }
}

export function signUp({ username, password, mobile, validate, key }) {
  return () => {
    return saveCookie({ user_name: username, user_password: password, to: mobile, validate, key }, 'reg')
  }
}

export function signOut() {
  return async () => {
    const [err, data] = await Ajax({
      url: window.location.origin + '/sign/out',
      method: 'post'
    })

    if (data && data.success) {
      return [null, true]
    } else {
      return ['sign error']
    }
  }
}
