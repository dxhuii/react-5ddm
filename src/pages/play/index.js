import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playerLoad } from '@/store/actions/player'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import PlayList from '@/components/PlayList'
import DetailActor from '@/components/DetailActor'
import NewsYG from '@/components/News/yugao'
import Top from '@/components/Top'
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import play from '@/utils/play'

import './style.scss'

const { isJump, is9 } = play

@Shell
@connect(
  (state, props) => ({
    userinfo: getUserInfo(state),
    player: getPlayerList(state, props.match.params.id, props.match.params.pid)
  }),
  dispatch => ({
    playerLoad: bindActionCreators(playerLoad, dispatch)
  })
)
class Play extends Component {
  constructor(props) {
    super(props)
    this.state = {
      play: '',
      type: '',
      outputHTML: '',
      full: false,
      isfull: false
    }
  }

  static propTypes = {
    player: PropTypes.object,
    playerLoad: PropTypes.func,
    match: PropTypes.object,
    userinfo: PropTypes.object
  }

  componentDidMount() {
    const {
      player,
      playerLoad,
      match: {
        params: { id, pid }
      }
    } = this.props
    if (!player || !player.data) {
      playerLoad({ id, pid })
    }
  }

  componentWillUnmount() {
    this.setState({
      play: ''
    })
  }

  playName(a) {
    var b = []
    return (
      (b['tudou'] = '土豆'),
      (b['youku'] = '优酷'),
      (b['iqiyi'] = '爱奇艺'),
      (b['letv'] = '乐视'),
      (b['sohu'] = '搜狐'),
      (b['pptv'] = '聚力'),
      (b['qq'] = '腾讯'),
      (b['letvyun'] = '乐视云'),
      (b['bilibili'] = '哔哩哔哩'),
      (b['acfun'] = 'A站'),
      (b['mgtv'] = '芒果TV'),
      (b['other'] = '其他'),
      (b['pv'] = 'PV'),
      (b['bgm'] = 'BGM'),
      (b['ed'] = 'ED'),
      (b['cm'] = 'CM'),
      (b['op'] = 'OP'),
      (b['mad'] = 'MAD'),
      (b['other'] = '其他A'),
      (b['otherB'] = '其他B'),
      (b['otherC'] = '其他C'),
      (b['otherD'] = '其他D'),
      (b['nodel'] = '未删减'),
      b[a]
    )
  }

  onPlay(play, type) {
    console.log(play, type)
    this.setState({ play, type })
  }

  getOther(data = []) {
    return data.filter(item => item.playName === 'other')
  }

  getData(data = {}) {
    const { play, type } = this.state
    const {
      match: {
        params: { id, pid }
      }
    } = this.props
    const { title, subTitle, list = [] } = data
    const other = this.getOther(list)
    const danmu = `${id}_${pid}`
    const defaultPlay =
      other.length > 0 && !is9
        ? isJump(other[0].vid, other[0].playName, danmu)
        : list.length > 0
        ? isJump(list[0].vid, list[0].playName, danmu)
        : ''
    const playHtml = play ? isJump(play, type, danmu) : ''
    return {
      title,
      subTitle,
      defaultPlay,
      playHtml,
      list
    }
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

  render() {
    const {
      // userinfo,
      player: { data = {} },
      match: {
        params: { id }
      }
    } = this.props
    const { full, isfull } = this.state
    const { title, subTitle, defaultPlay, playHtml, list } = this.getData(data)
    const { listName, listNameBig, actor = '' } = data
    return (
      <Fragment>
        <div styleName="player">
          <div styleName="wp" className="pt20">
            <Meta title={`${title} ${subTitle}在线播放 - ${listName}${listNameBig}`} />
            <div styleName={`player-box ${full ? 'play-full' : ''}`} onMouseOver={this.showFull} onMouseLeave={this.hideFull}>
              <div dangerouslySetInnerHTML={{ __html: playHtml || defaultPlay }} />
              {isfull ? (
                <a onMouseOver={this.showFull} onClick={this.isFull}>
                  {full ? '退出全屏' : '网页全屏'}
                </a>
              ) : null}
            </div>
            {/* {userinfo.userid ? (
              <div styleName={`player-box ${full ? 'play-full' : ''}`} onMouseOver={this.showFull} onMouseLeave={this.hideFull}>
                <div dangerouslySetInnerHTML={{ __html: playHtml || defaultPlay }} />
                {isfull ? (
                  <a onMouseOver={this.showFull} onClick={this.isFull}>
                    {full ? '退出全屏' : '网页全屏'}
                  </a>
                ) : null}
              </div>
            ) : (
              <div styleName="player-box">{playHtml || defaultPlay}</div>
            )} */}
            <div styleName="player-info">
              <h1>
                <Link to={`/subject/${id}`}>{title}</Link>：
              </h1>
              <h4>{subTitle}</h4>
              <ul styleName="playlist">
                {list.map(item => (
                  <li key={item.playName} onClick={() => this.onPlay(item.vid, item.playName)}>
                    <i className={`playicon ${item.playName}`} />
                    {item.playTitle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <PlayList />
        <div className="mt20" />
        <div className="clearfix" styleName="wp">
          <div styleName="left" className="fl">
            <div className="mt20">
              <div styleName="title">
                <h2>相关动漫</h2>
              </div>
              {id ? <DetailActor actor={actor} no={id} /> : null}
            </div>
          </div>
          <div styleName="right" className="fr">
            <div styleName="box">
              <Top name="topListAll" title="30天热门动漫" sty={{ padding: '10px 0' }} />
            </div>
            <div styleName="box" className="mt20">
              <NewsYG name="newsAll" isCate={false} title="30天热门资讯" isType={true} sty={{ padding: '10px 0' }} />
            </div>
          </div>
        </div>
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
