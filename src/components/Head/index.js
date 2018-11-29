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
        <nav className="navbar fixed-top navbar-expand-md navbar-expand-lg navbar-dark bg-dark bd-navbar" styleName="test">
          <NavLink className="navbar-brand" exact to="/">
            React
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/topics">
                  Topics
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/week">
                  week
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/list">
                  list
                </NavLink>
              </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0" action={`/search/${keyword}`}>
              <input name="cn" defaultValue={keywordCn} hidden />
              <input
                required
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                onChange={this.onChange}
              />
              <button disabled={!keyword} className="btn btn-outline-success my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
            <span className="mt-2 mt-md-0">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <span className="nav-link">{userinfo.nickname}</span>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="javascript:void(0)" onClick={this.signOut}>
                    退出
                  </a>
                </li>
              </ul>
            </span>
          </div>
        </nav>
      </header>
    )
  }
}

export default Head
