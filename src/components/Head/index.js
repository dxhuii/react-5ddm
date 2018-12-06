import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signOut } from '../../store/actions/user'
import { getUserInfo } from '../../store/reducers/user'

import './style.scss'

@connect(
  (state, props) => ({
    userinfo: getUserInfo(state)
  }),
  dispatch => ({
    signOut: bindActionCreators(signOut, dispatch)
  })
)
class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keyword: '',
      keywordCn: ''
    }
    this.signOut = this.signOut.bind(this)
  }

  static propTypes = {
    userinfo: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    match: PropTypes.object
  }

  async signOut() {
    let [, success] = await this.props.signOut()
    if (success) {
      // 退出成功跳转到首页
      window.location.href = '/topics'
    } else {
      alert('退出失败')
    }
  }

  onChange = e => {
    const keyword = e.target.value
    this.setState({ keyword })
  }

  render() {
    const {
      userinfo,
      match: { url }
    } = this.props
    const { keyword } = this.state
    return (
      <header>
        <NavLink styleName="header-logo" exact to="/">
          React
        </NavLink>
        <nav>
          <div styleName="header-nav">
            <NavLink styleName={url === '/' ? 'active' : ''} exact to="/">
              首页
            </NavLink>
            <NavLink styleName={url === '/topics' ? 'active' : ''} exact to="/topics">
              话题
            </NavLink>
            <NavLink styleName={url === '/week' ? 'active' : ''} exact to="/week">
              星期
            </NavLink>
            <NavLink styleName={url === '/list' ? 'active' : ''} exact to="/list">
              列表
            </NavLink>
          </div>
          <div styleName="header-search">
            <form action={`/search/${keyword}`}>
              <input required type="text" placeholder="Search" onChange={this.onChange} />
              <button disabled={!keyword} type="submit">
                Search
              </button>
            </form>
          </div>
          <div styleName="header-tool">
            <span>{userinfo.nickname}</span>
            <a href="javascript:void(0)" onClick={this.signOut}>
              退出
            </a>
          </div>
        </nav>
      </header>
    )
  }
}

export default Head
