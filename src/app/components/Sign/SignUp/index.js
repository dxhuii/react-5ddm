import React, { useState, useRef, useCallback, useEffect } from 'react'

// redux
import { useStore } from 'react-redux'
import { signUp, getCode } from '@/store/actions/user'
import Toast from '@/components/Toast'

import '../style.scss'

export default visible => {
  const store = useStore()
  const _signUp = args => signUp(args)(store.dispatch, store.getState)
  const [base64img, getBase64] = useState('')
  const [imgkey, getImgKey] = useState('')

  const [username, password, email, rePassword, validate] = [useRef(), useRef(), useRef(), useRef(), useRef()]

  const getVerify = useCallback(async () => {
    const _getCode = () => getCode()(store.dispatch, store.getState)
    const [err, data] = await _getCode()
    if (data.code === 0) {
      const { base64img, imgkey } = data.data
      getBase64(base64img)
      getImgKey(imgkey)
    }
  }, [store.dispatch, store.getState])

  useEffect(() => {
    if (visible) getVerify()
  }, [getVerify, visible])

  const submit = async event => {
    event.preventDefault()
    const u = username.current
    const e = email.current
    const p = password.current
    const r = rePassword.current
    const c = validate.current

    if (!u.value) {
      Toast.error('请输入用户名')
      u.focus()
      return false
    }

    if (!e.value) {
      Toast.error('请输入邮箱')
      e.focus()
      return false
    } else if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(e.value)) {
      Toast.error('邮箱地址不正确')
      e.focus()
      return false
    }

    if (!p.value) {
      Toast.error('请输入密码')
      p.focus()
      return false
    }

    if (p.value !== r.value) {
      Toast.error('两次输入的密码不一至')
      r.focus()
      return false
    }

    if (!c.value) {
      Toast.error('请输入验证码')
      c.focus()
      return false
    }

    const [, success] = await _signUp({
      username: u.value,
      password: p.value,
      email: e.value,
      validate: c.value,
      key: imgkey
    })
    if (success) {
      setTimeout(() => {
        window.location.reload()
        return false
      }, 300)
    }
  }

  return (
    <form onSubmit={submit}>
      <input type='text' name='username' ref={username} placeholder='请输入用户名' />
      <input type='text' name='email' ref={email} placeholder='请输入邮箱' />
      <input type='password' name='password' ref={password} placeholder='请输入密码' />
      <input type='password' name='repassword' ref={rePassword} placeholder='再输入一次密码' />
      <div styleName='validate'>
        <input type='text' name='validate' ref={validate} placeholder='请输入验证' />
        <img src={base64img} onClick={getVerify} />
      </div>
      <button type='submit'>注册</button>
    </form>
  )
}
