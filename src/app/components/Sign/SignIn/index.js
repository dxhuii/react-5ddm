import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn } from '@/store/actions/user'

import '../style.scss'

@withRouter
@connect(
  (state, props) => ({}),
  dispatch => ({
    signIn: bindActionCreators(signIn, dispatch)
  })
)
class SignIn extends Component {
  static propTypes = {
    signIn: PropTypes.func,
    history: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()

    const { username, password } = this
    const { signIn } = this.props

    if (!username.value) {
      username.focus()
      return false
    }

    if (!password.value) {
      password.focus()
      return false
    }

    let [err, success] = await signIn({ username: username.value, password: password.value })
    if (success) {
      setTimeout(() => {
        window.location.reload()
        return false
      }, 300)
    }
  }

  render() {
    return (
      <form onSubmit={this.submit}>
        <input
          type="text"
          ref={c => {
            this.username = c
          }}
          placeholder="请输入账号/邮箱"
        />
        <input
          type="password"
          ref={c => {
            this.password = c
          }}
          placeholder="请输入密码"
        />
        <button type="submit">登录</button>
      </form>
    )
  }
}

export default SignIn
