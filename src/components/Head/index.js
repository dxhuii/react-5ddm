import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signOut } from '@/store/actions/user'
import { getUserInfo } from '@/store/reducers/user'
import SearchAuto from '@/components/SearchAuto'

import { trim } from '@/utils'

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
      wd: '',
      isHide: true
    }
    this.signOut = this.signOut.bind(this)
  }

  static propTypes = {
    userinfo: PropTypes.object.isRequired,
    signOut: PropTypes.func.isRequired,
    match: PropTypes.object,
    history: PropTypes.object
  }

  componentDidMount() {
    document.onclick = this.hide
  }

  async signOut() {
    let [, success] = await this.props.signOut()
    if (success) {
      // 退出成功跳转到首页
      window.location.href = '/'
      // setTimeout(() => {
      //   this.props.history.push('/')
      // }, 300)
    } else {
      alert('退出失败')
    }
  }

  hide = () => {
    this.setState({
      isHide: false
    })
  }

  onChange = e => {
    const wd = trim(e.target.value)
    this.setState({ wd, isHide: true })
  }

  render() {
    const {
      userinfo,
      match: { url }
    } = this.props
    const { wd, isHide } = this.state
    return (
      <header>
        {/* <NavLink styleName="header-logo" exact to="/" title="9站" /> */}
        <nav>
          <div styleName="header-nav">
            <NavLink styleName={url === '/' ? 'active' : ''} exact to="/">
              首页
            </NavLink>
            {/* <NavLink styleName={url === '/topics' ? 'active' : ''} exact to="/topics">
              话题
            </NavLink> */}
            {/* <NavLink styleName={url === '/week' ? 'active' : ''} exact to="/week">
              星期
            </NavLink> */}
            <NavLink styleName={url === '/dongman' ? 'active' : ''} exact to="/dongman">
              列表
            </NavLink>
            <NavLink styleName={url === '/news' ? 'active' : ''} exact to="/news">
              新闻
            </NavLink>
            {/* <NavLink styleName={url === '/upload' ? 'active' : ''} exact to="/upload">
              上传
            </NavLink> */}
          </div>
          <div styleName="header-search">
            <form action={`/search/${wd}`}>
              <input required type="text" placeholder="片名、导演、声优、原作..." onChange={this.onChange} />
              <button disabled={!wd} type="submit">
                <i className="iconfont">&#xe78d;</i>
              </button>
            </form>
            {isHide ? <SearchAuto wd={wd} /> : null}
          </div>
          <div styleName="header-tool" className="tar">
            {userinfo.nickname ? <span>{userinfo.nickname}</span> : null}
            {userinfo.userid ? (
              <a href="javascript:void(0)" onClick={this.signOut}>
                退出
              </a>
            ) : (
              <Link to="/sign-in">登录</Link>
            )}
          </div>
        </nav>
      </header>
    )
  }
}

export default Head
