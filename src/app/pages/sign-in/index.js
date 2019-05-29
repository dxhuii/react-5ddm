import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Link, withRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signIn } from '@/store/actions/user'

import './style.scss'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

@withRouter
@connect(
  (state, props) => ({}),
  dispatch => ({
    signIn: bindActionCreators(signIn, dispatch)
  })
)
@Shell
class SignIn extends Component {
  static propTypes = {
    signIn: PropTypes.func,
    history: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this)
    this.jump = null
  }

  componentWillUnmount() {
    clearTimeout(this.jump)
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
    this.jump = setTimeout(() => {
      if (success) {
        this.props.history.push('/')
      }
    }, 300)

    return false
  }

  render() {
    return (
      <div styleName="container" className="tec">
        <Meta title="登录" />
        <form onSubmit={this.submit}>
          <h1>登录</h1>
          <input
            type="text"
            ref={c => {
              this.username = c
            }}
            placeholder="请输入昵称"
          />
          <input
            type="password"
            ref={c => {
              this.password = c
            }}
            placeholder="请输入昵称"
          />
          <button type="submit">登录</button>
          <Link to="/">返回首页</Link>
        </form>
      </div>
    )
  }
}

export default SignIn
