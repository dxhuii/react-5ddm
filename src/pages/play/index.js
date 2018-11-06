import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playerLoad } from '../../actions/player'
import { getPlayerList } from '../../reducers/player'

import PlayList from '../../components/play/list'
import Detail from '../../components/play/detail'
import Shell from '../../components/shell'
import Meta from '../../components/meta'

import CSSModules from 'react-css-modules'
import styles from './style.scss'

import play from '../../utils/play'

const { isJump } = play

@Shell
@connect(
  (state, props) => ({
    player: getPlayerList(state, props.match.params.id, props.match.params.pid)
  }),
  dispatch => ({
    playerLoad: bindActionCreators(playerLoad, dispatch)
  })
)
@CSSModules(styles, { allowMultiple: true })
export class Play extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

    const { player, playerLoad, match: { params: { id, pid } } } = this.props
    if (!player || !player.data) {
      playerLoad({ id, pid })
    }

  }

  playName(a) {
    var b = []
    return b['tudou'] = '土豆', b['youku'] = '优酷', b['iqiyi'] = '爱奇艺', b['letv'] = '乐视', b['sohu'] = '搜狐', b['pptv'] = '聚力', b['qq'] = '腾讯', b['letvyun'] = '乐视云', b['bilibili'] = '哔哩哔哩', b['acfun'] = 'A站', b['other'] = '其他', b['pv'] = 'PV', b['bgm'] = 'BGM', b['ed'] = 'ED', b['cm'] = 'CM', b['op'] = 'OP', b['mad'] = 'MAD', b['other'] = '其他A', b['otherB'] = '其他B', b['otherC'] = '其他C', b['otherD'] = '其他D', b['nodel'] = '未删减', b[a]
  }

  player(playList){
    let data = []
    for (let e = 0; e < playList.length; e++) {
      const d = (playList[e] || {}).playurls || []
      d.length > 0 && this.playName(playList[e].playname) && data.push({ type: playList[e].playname, vid: d[1], name: this.playName(playList[e].playname), title: d[0], url: d[2] })
    }
    return data
  }

  render() {
    const { player: { data = {}, loading } } = this.props
    const datas = data.Data || []
    const playData = this.player(datas)
    const vod = data.Vod || []
    const title = vod[0]
    const subTitle = ((datas[0] || {}).playurls || [])[0]
    return(
      <div>
        {loading ? <div>loading...</div> : null}
        <Meta title={`${title} ${subTitle}`} keywords={title} description={title} />
        <Detail subTitle={subTitle} />
        <ul styleName='playlist'>
          {playData.map(item => <a key={item.type} href={isJump(item.vid, item.type)} target="_blank"><li><i styleName={`icon ${item.type}`}></i>{item.name}</li></a>)}
        </ul>
        <PlayList />
      </div>
    )
  }
}

export default Play
