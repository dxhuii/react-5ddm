import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playerLoad } from '@/store/actions/player'
import { digg } from '@/store/actions/mark'
import { addplaylog } from '@/store/actions/history'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import PlayList from '@/components/PlayList'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import Toast from '@/components/Toast'
import Ads from '@/components/Ads'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import Cookies from 'js-cookie'

import { ISPLAY, DOMAIN_NAME, NAME } from 'Config'
import { isMobile } from '@/utils'
import { loadScript } from '@/utils/loadScript'
import playing from '@/utils/play'

import '@/utils/base64.min'
import authcode from '@/utils/authcode'

import './style.scss'

@Shell
@connect(
  (state, props) => ({
    userinfo: getUserInfo(state),
    player: getPlayerList(state, props.match.params.id, props.match.params.pid)
  }),
  dispatch => ({
    playerLoad: bindActionCreators(playerLoad, dispatch),
    digg: bindActionCreators(digg, dispatch),
    addplaylog: bindActionCreators(addplaylog, dispatch)
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
      isZ: '',
      mInfo: {},
      list: [],
      isFlvsp: false,
      full: false,
      isfull: false,
      showPlay: false
    }
  }

  static propTypes = {
    playerLoad: PropTypes.func,
    digg: PropTypes.func,
    addplaylog: PropTypes.func,
    player: PropTypes.object,
    match: PropTypes.object,
    userinfo: PropTypes.object,
    location: PropTypes.object
  }

  componentDidMount() {
    this.getData()
    document.onkeyup = event => {
      if (event.which == '27') {
        this.isFull()
      }
    }
  }

  componentDidUpdate(prevProps) {
    // 当 url 参数参数发生改变时，重新进行请求
    const oldId = prevProps.match.params
    const newId = this.props.match.params
    if (JSON.stringify(newId) !== JSON.stringify(oldId)) this.getData()
  }

  componentWillUnmount() {
    this.setState({
      play: ''
    })
  }

  getData = async () => {
    const {
      player,
      playerLoad,
      match: {
        params: { id, pid }
      }
    } = this.props
    if (!player || !player.data) {
      let [, data] = await playerLoad({ id, pid })
      if (data) {
        this.addHistory() // 增加观看记录
        this.getPlay()
      }
    } else {
      this.getPlay()
      this.addHistory() // 增加观看记录
    }
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
      await addplaylog({
        uid: userid,
        vod_id: id,
        vod_pid: pid,
        vod_sid: 0,
        vod_name: title,
        url_name: subTitle,
        vod_maxnum: count
      })
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
    this.setState({ play, type }, () => this.getPlay())
  }

  getOther(data = []) {
    return data.filter(item => item.playName === 'other')
  }

  getQq(data = []) {
    return data.filter(item => item.playName === 'qq')
  }

  getPlay() {
    const that = this
    loadScript({
      src: 'https://pv.sohu.com/cityjson?ie=utf-8',
      end: false,
      callback: function() {
        const {
          match: {
            params: { id, pid },
            url
          },
          userinfo: { userid },
          player: { data = {} }
        } = that.props
        const { play, type } = that.state
        const { list = [], copyright, key } = data
        const other = that.getOther(list)
        const qq = that.getQq(list)
        const isStop = (qq ? /上海|北京|深圳/ : /上海|北京/).test(returnCitySN.cname)
        const danmu = `${id}_${pid}`
        const isZ = isStop && /zb/.test(copyright) && +Cookies.get('plain') !== 7 && !ISPLAY
        const isA = other.length > 0 && !isZ && (copyright !== 'vip' || isMobile() || ISPLAY || userid)
        const { playName, vid, playTitle } = isA ? other[0] : list[0]
        let playHtml = ''
        if (play && !isZ) {
          playHtml = playing({ name: type, vid: authcode(atob(play), 'DECODE', key, 0), danmu, copyright, url })
        } else {
          playHtml = playing({ name: playName, vid: authcode(atob(vid), 'DECODE', key, 0), danmu, copyright, url })
        }
        const mInfo = { playName, vid, playTitle }
        that.setState({
          playHtml: playHtml[0],
          isFlvsp: playHtml[1],
          mInfo,
          isZ
        })
      }
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

  onShowPlayer = () => {
    this.setState({
      showPlay: !this.state.showPlay
    })
  }

  showList = (list = []) => {
    const { isZ } = this.state
    if (isZ !== '') {
      return list.map((item, index) => {
        return isZ ? (
          index < 1 ? (
            <li key={item.playName}>
              <i className={`playicon ${item.playName}`} />
              {item.playTitle}
            </li>
          ) : null
        ) : (
          <li key={item.playName} onClick={() => this.onPlay(item.vid, item.playName)}>
            <i className={`playicon ${item.playName}`} />
            {item.playTitle}
          </li>
        )
      })
    }
  }

  render() {
    const {
      player: { data = {}, loading },
      match: {
        params: { id, pid }
      },
      location
    } = this.props
    const { full, isfull, playHtml, mInfo, showPlay, isFlvsp } = this.state
    const { listName, listId, listNameBig, list = [], pic, title, pan, subTitle, actor = '', up, down, prev, next, mcid = [], copyright } = data
    const shareConfig = {
      pic,
      title: `#${title}# ${subTitle}在线播放 - ${listName}${listNameBig} - #${NAME.split('_').join('##')}# @99496动漫网`,
      url: `/play/${id}/${pid}`
    }
    return (
      <>
        <div styleName="player">
          <div className="wp pt20">
            {!loading && data.title ? (
              <Meta title={`${title} ${subTitle}在线播放 - ${listName}${listNameBig}`}>
                <meta name="keywords" content={`${title}${subTitle},${title}在线观看,动画${title}`} />
                <meta name="description" content={`${NAME}为您提供${listName}${listNameBig}${title}${subTitle}在线观看。喜欢${title}${subTitle}，就推荐给小伙伴们吧！`} />
              </Meta>
            ) : null}
            <div styleName={`player-box ${isFlvsp ? 'is-flvsp' : ''} ${full ? 'play-full' : ''}`} onMouseOver={this.showFull} onMouseLeave={this.hideFull}>
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
              <ul styleName={`playlist ${showPlay ? 'show' : 'hide'}`}>{this.showList(list)}</ul>
              <div styleName="m-play-name" onClick={this.onShowPlayer}>
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
                {mcid.map((item, index) => {
                  return (isMobile() ? (
                    item.title && index < 3
                  ) : (
                    item.title
                  )) ? (
                    <Link className={`mcid-${index}`} key={item.id} to={`/type/${this.getName(listId)}/${item.id}/-/-/-/-/-/`}>
                      {item.title}
                    </Link>
                  ) : null
                })}
                {pan ? (
                  <a href={pan} target="_blank" rel="noopener noreferrer">
                    网盘下载
                  </a>
                ) : null}
              </div>
              <div styleName="player-share">
                <Share data={shareConfig} location={location} />
              </div>
            </div>
          </div>
        </div>
        <div className="mt20">
          <Ads id={3} />
        </div>
        <PlayList />
        {DOMAIN_NAME === 'dddm.tv' && (
          <div className="wp mt20 box" styleName="zhaimoe">
            <iframe src="//www.zhaimoe.com/portal/page/index/id/35.html" width="1200" height="100%" frameBorder="0" scrolling="no" />
          </div>
        )}
        <div className="wp">
          <Ads id={4} />
        </div>
        <div className="mt20" />
        <div className="wp clearfix">
          <div className="fl left box">
            <div className="mt10">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor} no={id} /> : null}
            </div>
            <div className="mt10">
              <div styleName="title">
                <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
              </div>
              <HotWeek />
            </div>
          </div>
          <div className="right fr">
            <SideBar vodid={id} />
          </div>
        </div>
      </>
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
