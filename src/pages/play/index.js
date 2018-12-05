import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { playerLoad } from '../../store/actions/player'
import { getPlayerList } from '../../store/reducers/player'

import PlayList from '../../components/Play/PlayList'
import Shell from '../../components/Shell'
import Meta from '../../components/Meta'

import play from '../../utils/play'

import './style.scss'

const { isJump, is9 } = play

@Shell
@connect(
  (state, props) => ({
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
    match: PropTypes.object
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

  player(playList) {
    let data = []
    for (let e = 0; e < playList.length; e++) {
      const d = (playList[e] || {}).playurls || []
      d.length > 0 &&
        this.playName(playList[e].playname) &&
        data.push({ type: playList[e].playname, vid: d[1], name: this.playName(playList[e].playname), title: d[0], url: d[2] })
    }
    return data
  }

  onPlay(play, type) {
    console.log(play, type)
    this.setState({ play, type })
  }

  getOther(data = []) {
    return data.filter(item => item.type === 'other')
  }

  getData(data = {}) {
    const { play, type } = this.state
    const datas = data.Data || []
    const playData = this.player(datas)
    const title = (data.Vod || [])[0]
    const subTitle = ((datas[0] || {}).playurls || [])[0]
    const other = this.getOther(playData)
    const defaultPlay =
      other.length > 0 && !is9
        ? isJump(other[0].vid, other[0].type, 1)
        : playData.length > 0
        ? isJump(playData[0].vid, playData[0].type, 1)
        : ''
    const playHtml = play ? isJump(play, type, 1) : ''
    // console.log(playHtml, this.getOther(playData), defaultPlay)
    return {
      title,
      subTitle,
      defaultPlay,
      playHtml,
      playData
    }
  }

  render() {
    const {
      player: { data = {}, loading }
    } = this.props
    const { title, subTitle, defaultPlay, playHtml, playData } = this.getData(data)
    return (
      <div className="wp mt20">
        {loading ? <div>loading...</div> : null}
        <Meta title={`${title} ${subTitle}`} />
        <div styleName="player">
          <div styleName="player-left">
            <div styleName="player-box">{playHtml || defaultPlay}</div>
            {/* <div styleName='player-box' dangerouslySetInnerHTML={{__html: playHtml || defaultPlay}} /> */}
          </div>
          <div styleName="player-right">
            <ul styleName="playlist">
              {playData.map(item => (
                <li key={item.type} onClick={() => this.onPlay(item.vid, item.type)}>
                  <i styleName={`icon ${item.type}`} />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PlayList />
      </div>
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
