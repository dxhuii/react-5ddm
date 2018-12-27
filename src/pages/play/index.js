import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playerLoad } from '@/store/actions/player'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import PlayList from '@/components/Play/PlayList'
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
      outputHTML: ''
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
        ? isJump(other[0].vid, other[0].playName, 1, danmu)
        : list.length > 0
        ? isJump(list[0].vid, list[0].playName, 1, danmu)
        : ''
    const playHtml = play ? isJump(play, type, 1, danmu) : ''
    return {
      title,
      subTitle,
      defaultPlay,
      playHtml,
      list
    }
  }

  render() {
    const {
      userinfo,
      player: { data = {} },
      match: {
        params: { id }
      }
    } = this.props
    const { title, subTitle, defaultPlay, playHtml, list } = this.getData(data)
    return (
      <Fragment>
        <div styleName="player">
          <div className="wp pt20">
            <Meta title={`${title} ${subTitle}`} />
            {userinfo.userid ? (
              <div styleName="player-box" dangerouslySetInnerHTML={{ __html: playHtml || defaultPlay }} />
            ) : (
              <div styleName="player-box">{playHtml || defaultPlay}</div>
            )}
            <div styleName="player-info">
              <h1>
                <Link to={`/subject/${id}`}>{title}</Link>：
              </h1>
              <h4>{subTitle}</h4>
              <ul styleName="playlist">
                {list.map(item => (
                  <li key={item.playName} onClick={() => this.onPlay(item.vid, item.playName)}>
                    <i styleName={`icon ${item.playName}`} />
                    {item.playTitle}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="wp">
          <PlayList />
        </div>
      </Fragment>
    )
  }
}

export default function(props) {
  const {
    match: {
      params: { pid }
    }
  } = props
  return <Play {...props} key={pid} />
}
