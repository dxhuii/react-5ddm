import React, { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore } from 'react-redux'
import { signIn, getCode } from '@/store/actions/user'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const { location } = useReactRouter()
  const store = useStore()
  const _signIn = args => signIn(args)(store.dispatch, store.getState)
  const [base64img, getBase64] = useState('')
  const [imgkey, getImgKey] = useState('')
  const [username, password, validate] = [useRef(), useRef(), useRef()]

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
    getVerify()
  }, [getVerify])

  const submit = async event => {
    event.preventDefault()

    const name = username.current
    const pass = password.current
    const vali = validate.current

    if (!name.value) {
      name.focus()
      return false
    }

    if (!pass.value) {
      pass.focus()
      return false
    }

    if (!vali.value) {
      vali.focus()
      return false
    }

    const [err, success] = await _signIn({ username: name.value, password: pass.value, validate: vali.value, key: imgkey })
    if (success) {
      setTimeout(() => {
        const {
          params: { from }
        } = location
        window.location.href = from || '/'
        return false
      }, 300)
    }
  }

  return (
    <div styleName='container' className='tec'>
      <Meta title='登录' />
      <form onSubmit={submit}>
        <h1>登录</h1>
        <input type='text' ref={username} placeholder='请输入账号/邮箱' />
        <input type='password' ref={password} placeholder='请输入密码' />
        <div styleName='validate'>
          <input type='text' ref={validate} placeholder='请输入验证' />
          <img src={base64img} onClick={getVerify} />
        </div>
        <button type='submit'>登录</button>
        <Link to='/reg'>没有账号？注册</Link>
        <Link to='/'>返回首页</Link>
      </form>
    </div>
  )
})
