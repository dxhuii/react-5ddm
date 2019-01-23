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
import Share from '@/components/Share'
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
        ? isJump(other[0].playName, other[0].vid, danmu)
        : list.length > 0
        ? isJump(list[0].playName, list[0].vid, danmu)
        : ''
    const playHtml = play ? isJump(type, play, danmu) : ''
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

  render() {
    const {
      // userinfo,
      player: { data = {} },
      match: {
        params: { id, pid }
      }
    } = this.props
    const { full, isfull } = this.state
    const { title, subTitle, defaultPlay, playHtml, list } = this.getData(data)
    const { listName, listId, listNameBig, actor = '', up, down, prev, next, mcid = [] } = data
    const shareConfig = {
      title: `${title} ${subTitle}在线播放 - ${listName}${listNameBig}`,
      url: `/play/${id}/${pid}`
    }
    return (
      <Fragment>
        <div styleName="player">
          <div styleName="wp" className="pt20">
            <Meta title={`${title} ${subTitle}在线播放 - ${listName}${listNameBig}`}>
              <meta name="keywords" content={`${title}${subTitle},${title}在线观看,动画${title}`} />
              <meta
                name="description"
                content={`9站为您提供${listName}${listNameBig}${title}${subTitle}在线观看。喜欢${title}${subTitle}，就推荐给小伙伴们吧！`}
              />
            </Meta>
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
              <div styleName="mcid">
                {mcid.map(item => (
                  <Link key={item.id} to={`/type/${this.getName(listId)}/${item.id}/-/-/-/-/-/`}>
                    {item.title}
                  </Link>
                ))}
              </div>
              <ul styleName="playlist">
                {list.map(item => (
                  <li key={item.playName} onClick={() => this.onPlay(item.vid, item.playName)}>
                    <i className={`playicon ${item.playName}`} />
                    {item.playTitle}
                  </li>
                ))}
              </ul>
              <Share data={shareConfig} />
            </div>
            <div>
              <div>
                <i className="iconfont">&#xe607;</i>
                {up}
              </div>
              <div>
                <i className="iconfont">&#xe606;</i>
                {down}
              </div>
              {prev ? <Link to={`/play/${id}/${prev}`}>上一集</Link> : null}
              {next ? <Link to={`/play/${id}/${next}`}>下一集</Link> : null}
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
