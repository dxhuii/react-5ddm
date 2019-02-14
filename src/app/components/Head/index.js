import React, { Component, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { signOut } from '@/store/actions/user'
import { getUserInfo } from '@/store/reducers/user'

import SearchAuto from '@/components/SearchAuto'
import History from '@/components/History'
import Modal from '@/components/Modal'
import Sign from '@/components/Sign'

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
      isHide: true,
      visible: false,
      showMenu: false,
      showSearch: false,
      isSign: 'signIn'
    }
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

  signOut = async () => {
    let [, success] = await this.props.signOut()
    if (success) {
      // 退出成功
      setTimeout(() => {
        window.location.reload()
      }, 300)
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

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  onType = isSign => {
    this.setState({
      isSign,
      visible: true
    })
  }

  closeModal = () => {
    this.setState({
      visible: false
    })
  }

  onShowMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    })
  }

  onShowSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch
    })
  }

  render() {
    const {
      userinfo: { userid, nickname },
      match: { url, params = {} }
    } = this.props
    const { wd, isHide, isSign, visible, showMenu, showSearch } = this.state
    // console.log(url)
    return (
      <Fragment>
        <header>
          <NavLink styleName="header-logo" exact to="/" title="9站" />
          <nav styleName={showMenu ? 'show' : ''}>
            <div styleName="header-nav">
              <NavLink styleName={url === '/' ? 'active' : ''} exact to="/">
                首页
              </NavLink>
              <NavLink styleName={url === '/dongman' ? 'active' : ''} exact to="/dongman">
                动漫
              </NavLink>
              <NavLink styleName={url === '/news' ? 'active' : ''} exact to="/news">
                新闻
              </NavLink>
              <NavLink styleName={url === '/top' ? 'active' : ''} exact to="/top">
                排行榜
              </NavLink>
              <NavLink styleName={url.indexOf('/month') !== -1 ? 'active' : ''} exact to="/month/201901">
                新番表
              </NavLink>
              <NavLink styleName={url === '/new' ? 'active' : ''} exact to="/new">
                最近更新
              </NavLink>
            </div>
          </nav>
          <div styleName={`header-search ${showSearch ? 'show' : ''}`}>
            <form action={`/search/${wd}`}>
              <input required type="text" placeholder={params.wd || '片名、导演、声优、原作...'} onChange={this.onChange} />
              <button disabled={!wd} type="submit">
                <i className="iconfont">&#xe78d;</i>
              </button>
            </form>
            {isHide ? <SearchAuto wd={wd} /> : null}
          </div>
          <div styleName="header-tool" className="tar">
            <a onClick={this.onShowSearch} styleName="on-search">
              搜索
            </a>
            {nickname ? <span>{nickname}</span> : null}
            {userid ? (
              <a href="javascript:void(0)" onClick={this.signOut}>
                退出
              </a>
            ) : (
              <Fragment>
                <a onClick={() => this.onType('signIn')}>登录</a>
                <a onClick={() => this.onType('signUp')}>注册</a>
              </Fragment>
            )}
            <a onClick={this.onShowMenu} styleName="on-menu">
              菜单
            </a>
            <a onClick={this.onShowMenu} styleName="on-menu">
              记录
            </a>
          </div>
          <History userid={userid} match={this.props.match} />
        </header>
        <Modal visible={visible} showModal={this.showModal} closeModal={this.closeModal}>
          <Sign isSign={isSign} onType={val => this.onType(val)} />
        </Modal>
      </Fragment>
    )
  }
}

export default Head
