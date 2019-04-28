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
import Ads from '@/components/Ads'

import { trim } from '@/utils'
import { DOMAIN_NAME, NAME } from 'Config'

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
      showHis: false,
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

  onShowHis = () => {
    this.setState({
      showHis: !this.state.showHis
    })
  }
  // 判断为几月新番
  getCurMonth = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    let m = '10'
    if (month >= 1 && month < 4) {
      m = '01'
    } else if (month >= 4 && month < 7) {
      m = '04'
    } else if (month >= 7 && month < 10) {
      m = '07'
    }
    return year + m
  }

  render() {
    const {
      userinfo: { userid, nickname },
      match: { url, params = {} }
    } = this.props
    const { wd, isHide, isSign, visible, showMenu, showSearch, showHis } = this.state
    const logo = `header-logo ${DOMAIN_NAME === 'dddm.tv' ? 'dddm' : DOMAIN_NAME === '5ddm.com' ? 'ddm' : ''}`
    const isNot = !(url === '/' || /dongman|subject|play|search|type/.test(url))
    return (
      <Fragment>
        <header>
          <NavLink styleName={logo} exact to="/" title={NAME} />
          <nav styleName={showMenu ? 'show' : ''}>
            <div styleName="header-nav">
              <NavLink styleName={url === '/' ? 'active' : ''} exact to="/">
                首页
              </NavLink>
              <NavLink styleName={/dongman|subject|play|week|type|search/.test(url) ? 'active' : ''} exact to="/dongman">
                动漫
              </NavLink>
              <NavLink styleName={/news|article/.test(url) ? 'active' : ''} exact to="/news">
                新闻
              </NavLink>
              <NavLink styleName={/ep/.test(url) ? 'active' : ''} exact to="/ep">
                剧情
              </NavLink>
              <NavLink styleName={url === '/top' ? 'active' : ''} exact to="/top">
                排行榜
              </NavLink>
              <NavLink styleName={url === '/new' ? 'active' : ''} exact to="/new">
                最近更新
              </NavLink>
              <NavLink styleName={/month/.test(url) ? 'active' : ''} exact to={`/month/${this.getCurMonth()}`}>
                新番表
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
            <NavLink styleName={`on-home ${url === '/' ? 'active' : ''}`} exact to="/">
              首页
            </NavLink>
            <a onClick={this.onShowSearch} styleName="on-search">
              搜索
            </a>
            <a onClick={this.onShowHis}>记录</a>
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
          </div>
          <History userid={userid} pid={params.pid} isShow={showHis} />
        </header>
        <Modal visible={visible} showModal={this.showModal} closeModal={this.closeModal}>
          <Sign isSign={isSign} onType={val => this.onType(val)} />
        </Modal>
        {isNot ? <Ads id={7} /> : null}
      </Fragment>
    )
  }
}

export default Head
