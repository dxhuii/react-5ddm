import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Sign extends Component {
  static propTypes = {
    type: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = {
      type: 'signIn'
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.type === prevState.type) {
      return null
    }
    const { type } = nextProps
    return { type }
  }

  onType = type => {
    this.setState({
      type
    })
  }

  render() {
    const { type } = this.state
    console.log(type, 'type')
    return (
      <Fragment>
        {type === 'signIn' ? <SignIn /> : <SignUp />}
        <a onClick={() => this.onType('signIn')}>登录</a>
        <a onClick={() => this.onType('signUp')}>注册</a>
      </Fragment>
    )
  }
}

export default Sign
