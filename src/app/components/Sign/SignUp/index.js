import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signUp } from '@/store/actions/user'

import '../SignIn/style.scss'

@withRouter
@connect(
  (state, props) => ({}),
  dispatch => ({
    signUp: bindActionCreators(signUp, dispatch)
  })
)
class SignIn extends Component {
  static propTypes = {
    signUp: PropTypes.func,
    history: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()

    const { username, password, email, rePassword } = this
    const { signUp } = this.props

    if (!username.value) {
      username.focus()
      return false
    }

    if (!email.value) {
      email.focus()
      return false
    }

    if (!password.value) {
      password.focus()
      return false
    }

    if (password.value !== rePassword.value) {
      password.focus()
      return false
    }

    let [err, success] = await signUp({ username: username.value, password: password.value, email: email.value })
    if (success) {
      setTimeout(() => {
        window.location.reload()
        return false
      }, 300)
    }
  }

  render() {
    return (
      <div styleName="container">
        <form onSubmit={this.submit}>
          <h1>注册</h1>
          <input
            type="text"
            ref={c => {
              this.username = c
            }}
            placeholder="请输入昵称"
          />
          <input
            type="text"
            ref={c => {
              this.email = c
            }}
            placeholder="请输入Email"
          />
          <input
            type="password"
            ref={c => {
              this.password = c
            }}
            placeholder="请输入密码"
          />
          <input
            type="password"
            ref={c => {
              this.rePassword = c
            }}
            placeholder="再输入一次密码"
          />
          <button type="submit">注册</button>
        </form>
      </div>
    )
  }
}

export default SignIn
