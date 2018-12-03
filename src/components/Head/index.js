import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signOut } from '../../store/actions/user'
import { getUserInfo } from '../../store/reducers/user'

import './style.scss'

import pinyin from 'pinyin'

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
    signOut: PropTypes.func.isRequired
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
    const keywordCn = e.target.value
    const keyword = pinyin(keywordCn, {
      style: pinyin.STYLE_NORMAL
    }).join('')
    this.setState({ keyword, keywordCn: keywordCn })
  }

  render() {
    const { userinfo } = this.props
    const { keyword, keywordCn } = this.state
    return (
      <header>
        <div className="wp">
          <NavLink styleName="header-logo" exact to="/">
            React
          </NavLink>
          <nav>
            <div styleName="header-search">
              <form action={`/search/${keyword}`}>
                <input name="cn" defaultValue={keywordCn} hidden />
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
            <div styleName="header-nav">
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink exact to="/topics">
                Topics
              </NavLink>
              <NavLink exact to="/week">
                week
              </NavLink>
              <NavLink exact to="/list">
                list
              </NavLink>
            </div>
          </nav>
        </div>
      </header>
    )
  }
}

export default Head
