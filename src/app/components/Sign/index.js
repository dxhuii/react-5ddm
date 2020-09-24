import React from 'react'
import PropTypes from 'prop-types'

import SignIn from './SignIn'
import SignUp from './SignUp'

import './style.scss'

export default function Sign({ isSign, onType, visible }) {
  const setType = (e, isSign) => {
    e.stopPropagation()
    onType(isSign)
  }
  return (
    <div styleName='user'>
      <div styleName='logo' />
      <h1>{isSign === 'signIn' ? '登录' : '注册'}，可以发现更多</h1>
      {isSign === 'signIn' ? <SignIn visible={visible} /> : <SignUp visible={visible} />}
      <div styleName='user-reg' className='mt20'>
        {isSign === 'signIn' ? (
          <span>
            还没有账号？<a onClick={e => setType(e, 'signUp')}>去注册</a>
          </span>
        ) : (
          <span>
            已有账号？<a onClick={e => setType(e, 'signIn')}>去登录</a>
          </span>
        )}
      </div>
    </div>
  )
}

Sign.propTypes = {
  isSign: PropTypes.string,
  onType: PropTypes.func,
  visible: PropTypes.bool
}
