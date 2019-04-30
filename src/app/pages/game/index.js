import React, { PureComponent, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { gameList } from '@/store/actions/game'
import { getGame } from '@/store/reducers/game'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import Loading from '@/components/Ui/Loading'

import { isMobile, formatPic } from '@/utils'

import './style.scss'

@Shell
@withRouter
@connect(
  (state, props) => ({
    info: getGame(state, props.match.params.wd ? props.match.params.wd : 'totalList')
  }),
  dispatch => ({
    gameList: bindActionCreators(gameList, dispatch)
  })
)
class Game extends PureComponent {
  static propTypes = {
    info: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    gameList: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      dataIndex: -1,
      display: false,
      GP: true
    }
  }

  componentDidMount() {
    const {
      info,
      gameList,
      match: {
        params: { wd }
      }
    } = this.props
    if (!info.data) {
      if (wd) {
        gameList({
          wd
        })
      } else {
        gameList({
          order: 'update',
          wd: 'totalList',
          limit: 100
        })
      }
    } else {
      if (wd) {
        this.setState({
          display: true
        })
      }
    }
  }

  getPic = data => {
    console.log(data)
    const piclist = data ? (
      data.map((item, i) => {
        if (item.indexOf('banner') === -1) {
          return (
            <li key={`game-img-${i}`}>
              <img src={formatPic(item)} />
            </li>
          )
        }
      })
    ) : (
      <Loading />
    )
    return piclist
  }

  switch = name => {
    const {
      gameList,
      match: {
        params: { wd }
      }
    } = this.props
    if (wd) {
      this.props.history.push('/game')
      gameList({
        order: 'update',
        wd: 'totalList',
        limit: 10
      })
    } else {
      // this.setState({
      //   display: value,
      //   dataIndex: index
      // })
      this.props.history.push(`/game/${name}`)
    }
  }

  gameList(data = []) {
    const renderList = data ? (
      data.map((item, i) => {
        if (item.downloadUrl.android.indexOf('http') != -1 || item.downloadUrl.ios.indexOf('http') != -1) {
          return (
            <li key={`game-list-${i}`} onClick={() => this.switch(item.name)}>
              <img src={formatPic(item.icon)} />
              <p>{item.name}</p>
              <div>
                {item.downloadUrl.android.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="an" href={item.downloadUrl.android}>
                      安卓
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="an" href={item.downloadUrl.android}>
                        安卓
                      </a>
                      <span className="an">
                        <i />
                        <QRCode value={item.downloadUrl.android} />
                        <p>安卓用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
                {item.downloadUrl.ios.indexOf('http') != -1 ? (
                  isMobile() ? (
                    <a className="ios" href={item.downloadUrl.android}>
                      苹果
                    </a>
                  ) : (
                    <span className="qrcode">
                      <a className="ios" href={item.downloadUrl.ios}>
                        苹果
                      </a>
                      <span className="ios">
                        <i />
                        <QRCode value={item.downloadUrl.ios} />
                        <p>苹果用户扫描下载</p>
                      </span>
                    </span>
                  )
                ) : null}
              </div>
            </li>
          )
        }
      })
    ) : (
      <Loading />
    )
    return renderList
  }

  closeGP = () => {
    this.setState({
      GP: !this.state.GP
    })
  }

  render() {
    const {
      info: { data = [], loading },
      match: {
        params: { wd }
      }
    } = this.props
    const { display, dataIndex } = this.state
    const dataInfo = data[wd ? 0 : dataIndex]
    const { Description, name } = dataInfo || {}
    return (
      <Fragment>
        {wd ? (
          <Meta title={`${name}_${name}安卓IOS下载`}>
            <meta name="keywords" content={`${name},${name}安卓下载,${name}IOS下载`} />
            <meta name="description" content={Description} />
          </Meta>
        ) : (
          <Meta title="游戏列表_安卓IOS游戏下载">
            <meta name="keywords" content="游戏列表" />
            <meta name="description" content="游戏列表" />
          </Meta>
        )}
        {loading ? <Loading /> : null}
        <div className="wp">
          {wd ? null : <ul className="gamelist clearfix">{this.gameList(data)}</ul>}
          {dataInfo && (
            <div className="gameinfo" style={{ display: display ? 'block' : 'none' }}>
              <span className="safari-close closeA" onClick={() => this.switch()} />
              <div className="info clearfix">
                <img src={formatPic(dataInfo.icon)} />
                <div className="type">
                  <h1>{dataInfo.name}</h1>
                  {dataInfo.shortDesc ? <p>{dataInfo.shortDesc}</p> : ''}
                  {dataInfo.Type ? <p>类型：{dataInfo.Type}</p> : ''}
                </div>
                <div className="down">
                  {dataInfo.downloadUrl.android.indexOf('http') != -1 ? (
                    isMobile() ? (
                      <a className="an" href={dataInfo.downloadUrl.android}>
                        安卓 <em className="version">{dataInfo.Version.android}</em>
                        <em>{dataInfo.size.android}MB</em>
                      </a>
                    ) : (
                      <span className="qrcode">
                        <a className="an" href={dataInfo.downloadUrl.android}>
                          安卓 <em className="version">{dataInfo.Version.android}</em>
                          <em>{dataInfo.size.android}MB</em>
                        </a>
                        <span className="an">
                          <i />
                          <QRCode value={dataInfo.downloadUrl.android} />
                          <p>安卓用户扫描下载</p>
                        </span>
                      </span>
                    )
                  ) : null}
                  {dataInfo.downloadUrl.ios.indexOf('http') != -1 ? (
                    isMobile() ? (
                      <a className="ios" href={dataInfo.downloadUrl.ios}>
                        苹果 <em className="version">{dataInfo.Version.ios}</em>
                        <em>{dataInfo.size.ios}MB</em>
                      </a>
                    ) : (
                      <span className="qrcode">
                        <a className="ios" href={dataInfo.downloadUrl.ios}>
                          苹果 <em className="version">{dataInfo.Version.ios}</em>
                          <em>{dataInfo.size.ios}MB</em>
                        </a>
                        <span className="ios">
                          <i />
                          <QRCode value={dataInfo.downloadUrl.ios} />
                          <p>苹果用户扫描下载</p>
                        </span>
                      </span>
                    )
                  ) : null}
                </div>
              </div>
              <div className="summary">{dataInfo.Description}</div>
              <div className="piclist">
                <ul>{this.getPic(dataInfo.imgList)}</ul>
              </div>
            </div>
          )}
          <div className="mask" style={{ display: display ? 'block' : 'none' }} onClick={() => this.switch()} />
          <div className="safariDown" style={{ display: this.state.GP ? 'block' : 'none' }}>
            <div className="join row">
              <span className="join-left">
                <a href="http://app.guopan.cn/?channelid=12633">
                  <img src="//cdn2.guopan.cn/frontend/m/static/img/join_e476d12.png" width="50" height="50" />
                </a>
              </span>
              <div className="join-middel col">
                <p className="j-head">果盘游戏</p>
                <p className="j-desc">玩手游更轻松</p>
              </div>
              <div className="join-right">
                <a href="http://app.guopan.cn/?channelid=12633" className="j-link">
                  立即下载
                </a>
              </div>
            </div>
            <i className="safari-close" onClick={this.closeGP} />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Game
