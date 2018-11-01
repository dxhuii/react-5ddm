import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link, withRouter } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signIn } from '../../actions/user';

import CSSModules from 'react-css-modules';
import styles from './style.scss';

import Shell from '../../components/shell';
import Meta from '../../components/meta';

@withRouter
@connect(
  (state, props) => ({

  }),
  dispatch => ({
    signIn: bindActionCreators(signIn, dispatch)
  })
)
@Shell
@CSSModules(styles)
export class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.submit = this.submit.bind(this);
  }

  async submit(event) {
    event.preventDefault();

    const { username, password } = this.refs;
    const { signIn } = this.props;

    if (!username.value) {
      username.focus();
      return false;
    }

    if (!password.value) {
      password.focus();
      return false;
    }

    let [err, success] = await signIn({ username: username.value, password: password.value });
    setTimeout(() => {
      if (success) {
        window.location.href = '/topics'
      }
    }, 300)

    return false;
  }

  render() {
    return(<div styleName="container" className="text-center">
      <Meta title="React" />
      <form className="form-signin" onSubmit={this.submit}>
        <div styleName="icon"></div>
        <h1 className="h3 mb-3 font-weight-normal">React</h1>
        <input type="text" ref="username" className="form-control mb-3" placeholder="请输入昵称" />
        <input type="password" ref="password" className="form-control mb-3" placeholder="请输入昵称" />
        <button className="btn btn-lg btn-primary btn-block" type="submit">登录</button>
      </form>
    </div>)
  }

}

export default SignIn;
