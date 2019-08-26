import React, { useRef } from 'react'

// redux
import { useStore } from 'react-redux'
import { signIn } from '@/store/actions/user'

import '../style.scss'

export default () => {
  const store = useStore()
  const _signIn = args => signIn(args)(store.dispatch, store.getState)
  const username = useRef()
  const password = useRef()

  const submit = async event => {
    event.preventDefault()

    const name = username.current
    const pass = password.current

    if (!name.value) {
      name.focus()
      return false
    }

    if (!pass.value) {
      pass.focus()
      return false
    }

    let [err, success] = await _signIn({ username: name.value, password: pass.value })
    if (success) {
      setTimeout(() => {
        window.location.reload()
        return false
      }, 300)
    }
  }

  return (
    <form onSubmit={submit}>
      <input type="text" ref={username} placeholder="请输入账号/邮箱" />
      <input type="password" ref={password} placeholder="请输入密码" />
      <button type="submit">登录</button>
    </form>
  )
}
