import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Sign extends Component {
  static propTypes = {
    isSign: PropTypes.string,
    onType: PropTypes.func
  }

  onType = (e, isSign) => {
    e.stopPropagation()
    this.props.onType(isSign)
  }

  render() {
    const { isSign } = this.props
    return (
      <Fragment>
        {isSign === 'signIn' ? <SignIn /> : <SignUp />}
        <a onClick={e => this.onType(e, 'signIn')}>登录</a>
        <a onClick={e => this.onType(e, 'signUp')}>注册</a>
      </Fragment>
    )
  }
}

export default Sign
