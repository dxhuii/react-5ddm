import React, { useRef, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore } from 'react-redux'
import { signIn, getCode } from '@/store/actions/user'

import '../style.scss'

export default function SignIn({ visible }) {
  const store = useStore()
  const _signIn = args => signIn(args)(store.dispatch, store.getState)
  const [base64img, getBase64] = useState('')
  const [imgkey, getImgKey] = useState('')
  const username = useRef()
  const password = useRef()
  const validate = useRef()

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
        window.location.reload()
        return false
      }, 300)
    }
  }

  return (
    <form onSubmit={submit}>
      <input type='text' name='username' ref={username} placeholder='请输入账号/邮箱' />
      <input type='password' name='password' ref={password} placeholder='请输入密码' />
      <div styleName='validate'>
        <input type='text' name='validate' ref={validate} placeholder='请输入验证' />
        <img src={base64img} onClick={getVerify} />
      </div>
      <button type='submit'>登录</button>
    </form>
  )
}

SignIn.propTypes = {
  visible: PropTypes.bool
}
