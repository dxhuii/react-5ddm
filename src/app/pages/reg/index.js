import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore } from 'react-redux'
import { signUp, getCode } from '@/store/actions/user'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const { location } = useReactRouter()
  const store = useStore()
  const _signUp = args => signUp(args)(store.dispatch, store.getState)
  const [base64img, getBase64] = useState('')
  const [imgkey, getImgKey] = useState('')
  const [username, password, email, rePassword, validate] = [useRef(), useRef(), useRef(), useRef(), useRef()]

  useEffect(() => {
    getVerify()
  }, [getVerify])

  const getVerify = useCallback(async () => {
    const _getCode = () => getCode()(store.dispatch, store.getState)
    let [err, data] = await _getCode()
    if (data.code === 0) {
      const { base64img, imgkey } = data.data
      getBase64(base64img)
      getImgKey(imgkey)
    }
  }, [store.dispatch, store.getState])

  const submit = async event => {
    event.preventDefault()

    if (!username.current.value) {
      username.current.focus()
      return false
    }

    if (!email.current.value) {
      email.current.focus()
      return false
    }

    if (!password.current.value) {
      password.current.focus()
      return false
    }

    if (password.current.value !== rePassword.current.value) {
      password.current.focus()
      return false
    }

    if (validate.current.value) {
      validate.current.focus()
      return false
    }

    let [err, success] = await _signUp({
      username: username.current.value,
      password: password.current.value,
      email: email.current.value,
      validate: validate.current.value,
      key: imgkey
    })
    if (success) {
      setTimeout(() => {
        const {
          params: { from }
        } = location
        window.location.href = from ? from : '/'
        return false
      }, 300)
    }
  }

  return (
    <div styleName="container" className="tec">
      <Meta title="注册" />
      <form onSubmit={submit}>
        <h1>注册</h1>
        <input type="text" ref={username} placeholder="请输入账号" />
        <input type="text" ref={email} placeholder="请输入Email" />
        <input type="password" ref={password} placeholder="请输入密码" />
        <input type="password" ref={rePassword} placeholder="再输入一次密码" />
        <div styleName="validate">
          <input type="text" ref={validate} placeholder="请输入验证" />
          <img src={base64img} onClick={getVerify} />
        </div>
        <button type="submit">注册</button>
        <Link to="/sign">有账号？登录</Link>
        <Link to="/">返回首页</Link>
      </form>
    </div>
  )
})
