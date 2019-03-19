import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playerLoad } from '@/store/actions/player'
import { digg } from '@/store/actions/mark'
import { hits } from '@/store/actions/hits'
import { addplaylog } from '@/store/actions/history'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import PlayList from '@/components/PlayList'
import DetailActor from '@/components/DetailActor'
import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import Ads from '@/components/Ads'
import Toast from '@/components/Toast'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { ISPLAY, IS9, DOMAIN_NAME, NAME } from 'Config'
import { isMobile } from '@/utils'
import playing from '@/utils/play'

import './style.scss'

const isP = IS9 && !isMobile()

@Shell
@connect(
  (state, props) => ({
    userinfo: getUserInfo(state),
    player: getPlayerList(state, props.match.params.id, props.match.params.pid)
  }),
  dispatch => ({
    playerLoad: bindActionCreators(playerLoad, dispatch),
    digg: bindActionCreators(digg, dispatch),
    addplaylog: bindActionCreators(addplaylog, dispatch),
    hits: bindActionCreators(hits, dispatch)
  })
)
class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      play: '',
      type: '',
      title: '',
      subTitle: '',
      playHtml: '',
      mInfo: {},
      list: [],
      full: false,
      isfull: false
    }
  }

  static propTypes = {
    playerLoad: PropTypes.func,
    digg: PropTypes.func,
    addplaylog: PropTypes.func,
    hits: PropTypes.func,
    player: PropTypes.object,
    match: PropTypes.object,
    userinfo: PropTypes.object
  }

  async componentDidMount() {
    const {
      player,
      playerLoad,
      hits,
      match: {
        params: { id, pid }
      }
    } = this.props
    hits({ id, sid: 1 })
    if (!player || !player.data) {
      let [, data] = await playerLoad({ id, pid })
      if (data) {
        this.addHistory() // 增加观看记录
        this.getData()
      }
    } else {
      this.getData()
      this.addHistory() // 增加观看记录
    }

    document.onkeyup = event => {
      if (event.which == '27') {
        this.isFull()
      }
    }
  }

  componentWillUnmount() {
    this.setState({
      play: ''
    })
  }

  async addHistory() {
    const {
      userinfo: { userid },
      match: {
        params: { id, pid }
      },
      player: { data = {} },
      addplaylog
    } = this.props
    const { title, subTitle, count = 0 } = data
    if (userid && title) {
      let [, data] = await addplaylog({
        uid: userid,
        vod_id: id,
        vod_pid: pid,
        vod_sid: 0,
        vod_name: title,
        url_name: subTitle,
        vod_maxnum: count
      })
      console.log(data)
    } else if (title) {
      let dataList = JSON.parse(localStorage.historyData || '[]')
      if (dataList.length > 0) {
        for (let i = 0; i < dataList.length; i++) {
          const obj = JSON.parse(dataList[i])
          if (parseInt(obj.vid) === parseInt(id)) {
            dataList.splice(i, 1)
          }
        }
      }
      if (dataList.length > 10) {
        dataList.pop()
      }
      dataList.unshift(
        JSON.stringify({
          vid: id,
          pid,
          title,
          name: subTitle,
          next: +pid < count ? +pid + 1 : 0
        })
      )
      localStorage.historyData = JSON.stringify([...new Set([...dataList])])
    }
  }

  onPlay(play, type) {
    this.setState({ play, type }, () => this.getData())
  }

  getOther(data = []) {
    return data.filter(item => item.playName === 'other')
  }

  getData() {
    const {
      match: {
        params: { id, pid }
      },
      userinfo: { userid },
      player: { data = {} }
    } = this.props
    const { play, type } = this.state
    const { list = [], copyright } = data
    const other = this.getOther(list)
    const danmu = `${id}_${pid}`
    const isA = other.length > 0 && !isP && (copyright !== 'vip' || isMobile() || ISPLAY)
    const { playName, vid, playTitle } = isA ? other[0] : list[0]
    let playHtml = ''
    if (play) {
      playHtml = playing(type, play, danmu, userid, copyright)
    } else {
      playHtml = playing(playName, vid, danmu, userid, copyright)
    }
    const mInfo = { playName, vid, playTitle }
    console.log(play, playHtml, isA, 'getdata')
    this.setState({
      playHtml,
      mInfo
    })
  }

  isFull = () => {
    this.setState({
      full: !this.state.full
    })
  }

  showFull = () => {
    this.setState({
      isfull: true
    })
  }

  hideFull = () => {
    this.setState({
      isfull: false
    })
  }

  getName(id) {
    let name = ''
    switch (id) {
      case 201:
        name = 'tv'
        break
      case 202:
        name = 'ova'
        break
      case 203:
        name = 'juchang'
        break
      case 4:
        name = 'tebie'
        break
      case 204:
        name = 'zhenren'
        break
      case 35:
        name = 'qita'
        break
      default:
        name = 'list'
        break
    }
    return name
  }

  async onDigg(type, id) {
    const { digg } = this.props
    let [, res] = await digg({ type, id })
    if (res.rcode === 1) {
      const num = res.data.split(':')
      this.up.querySelectorAll('span')[0].innerText = num[0]
      this.down.querySelectorAll('span')[0].innerText = num[1]
      Toast.success(res.msg)
    }
  }

  render() {
    const {
      userinfo: { userid },
      player: { data = {} },
      match: {
        params: { id, pid },
        url
      }
    } = this.props
    const { full, isfull, playHtml, mInfo } = this.state
    const { listName, listId, listNameBig, list = [], pic, title, pan, subTitle, actor = '', up, down, prev, next, mcid = [], copyright } = data
    const shareConfig = {
      pic,
      title: `#${title}# ${subTitle}在线播放 - ${listName}${listNameBig} - #${NAME.split('_').join('##')}# @99496动漫网`,
      url: `/play/${id}/${pid}`
    }
    if (copyright === 'stop' && !userid && !ISPLAY && !isMobile()) {
      if (typeof window === 'undefined') {
        return
      }
      window.location.href = '/404'
    }
    return (
      <Fragment>
        <div styleName="player">
          <div className="wp pt20">
            <Meta title={`${title} ${subTitle}在线播放 - ${listName}${listNameBig}`}>
              <meta name="keywords" content={`${title}${subTitle},${title}在线观看,动画${title}`} />
              <meta name="description" content={`${NAME}为您提供${listName}${listNameBig}${title}${subTitle}在线观看。喜欢${title}${subTitle}，就推荐给小伙伴们吧！`} />
            </Meta>
            <div styleName={`player-box ${full ? 'play-full' : ''}`} onMouseOver={this.showFull} onMouseLeave={this.hideFull}>
              <div dangerouslySetInnerHTML={{ __html: playHtml }} />
              {isfull ? (
                <a onMouseOver={this.showFull} onClick={this.isFull}>
                  {full ? '退出全屏' : '网页全屏'}
                </a>
              ) : null}
            </div>
            <div styleName="player-info">
              <div styleName="player-title">
                <h1>
                  <Link to={`/subject/${id}`}>{title}</Link>：
                </h1>
                <h4>{subTitle}</h4>
              </div>
              <ul styleName="playlist">
                {list.map(item => (
                  <li key={item.playName} onClick={() => this.onPlay(item.vid, item.playName)}>
                    <i className={`playicon ${item.playName}`} />
                    {item.playTitle}
                  </li>
                ))}
              </ul>
              <div styleName="m-play-name">
                <i className={`playicon ${mInfo.playName}`} />
                {mInfo.playTitle}
              </div>
              <div styleName="play-next">
                {prev ? <Link to={`/play/${id}/${prev}`}>上一集</Link> : null}
                {next ? <Link to={`/play/${id}/${next}`}>下一集</Link> : null}
              </div>
            </div>
            <div styleName="play-tool">
              <div styleName="digg" onClick={() => this.onDigg('up', id)} ref={e => (this.up = e)}>
                <i className="iconfont">&#xe607;</i>
                <span>{up}</span>
              </div>
              <div styleName="digg" onClick={() => this.onDigg('down', id)} ref={e => (this.down = e)}>
                <i className="iconfont">&#xe606;</i>
                <span>{down}</span>
              </div>
              <div styleName="mcid">
                {mcid.map(item => {
                  return item.title ? (
                    <Link key={item.id} to={`/type/${this.getName(listId)}/${item.id}/-/-/-/-/-/`}>
                      {item.title}
                    </Link>
                  ) : null
                })}
                {(pan && !isP) || userid ? (
                  <a href={pan} target="_blank" rel="noopener noreferrer">
                    网盘下载
                  </a>
                ) : null}
              </div>
              <div styleName="player-share">
                <Share data={shareConfig} />
              </div>
            </div>
          </div>
        </div>
        <PlayList />
        {DOMAIN_NAME === 'dddm.tv' && (
          <div className="wp mt20 box" styleName="zhaimoe">
            <iframe src="//www.zhaimoe.com/portal/page/index/id/35.html" width="1200" height="100%" frameBorder="0" scrolling="no" />
          </div>
        )}
        <div className="wp">
          {isMobile() ? (
            <div className="mt20">
              <Ads id={26} url={url} />
            </div>
          ) : (
            <Ads id={21} />
          )}
        </div>
        <div className="mt20" />
        <div className="wp clearfix">
          <div className="fl left box">
            <div className="mt20">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor} no={id} /> : null}
            </div>
          </div>
          <div className="right fr">
            <SideBar />
          </div>
        </div>
        {!isMobile() && (
          <div className="wp">
            <Ads id={22} />
          </div>
        )}
      </Fragment>
    )
  }
}

const Plays = props => {
  const {
    match: {
      params: { pid }
    }
  } = props
  return <Play {...props} key={pid} />
}

Plays.propTypes = {
  match: PropTypes.object
}

export default Plays
