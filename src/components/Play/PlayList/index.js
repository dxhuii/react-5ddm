import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playlist } from '../../../store/actions/playlist'
import { getPlayList } from '../../../store/reducers/playlist'

import { getOffset, trim } from '../../../utils'

import './style.scss'
@withRouter
@connect(
  (state, props) => ({
    play: getPlayList(state, props.match.params.id)
  }),
  dispatch => ({
    playlist: bindActionCreators(playlist, dispatch)
  })
)
class PlayList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 18,
      start: 0,
      end: 18,
      list: [],
      dataSource: []
    }
    this.current = null
    this.playlist = null
    this.clientWidth = null
  }

  static propTypes = {
    id: PropTypes.number,
    play: PropTypes.object,
    playlist: PropTypes.func,
    match: PropTypes.object
  }

  componentDidMount() {
    const {
      play,
      playlist,
      match: {
        params: { id, pid }
      }
    } = this.props
    if (!play || !play.data) {
      playlist({ id }).then(res => {
        const data = res[1]
        this.setData(data)
      })
    } else {
      const { data } = play
      this.setData(data)
    }

    if (pid) {
      this.current = document.querySelector('.playlist-li__on')
      this.playlist = document.querySelector('#playlist')
      const currentLeft = getOffset(this.current).left
      const width = document.documentElement.clientWidth || document.body.clientWidth
      this.playlist.scrollLeft = currentLeft - width / 3
      console.log(this.current, getOffset(this.current).left, this.playlist, this.props)
    }
  }

  setData(data) {
    const { pageSize } = this.state
    const list = (data.Data || {}).playurls || []
    this.setState({
      list,
      dataSource: list.slice(0, pageSize)
    })
  }

  onPrev() {}

  onNext() {}

  format(data, item, id) {
    let num = ''
    let subName = ''
    if (data === '全集') {
      num = data
    } else {
      const title = data.split(' ')
      const name = data.split(/话|集/)
      num = title[0]
      subName = trim(name[1])
    }

    return (
      <Link to={`/play/${id}/${item}`}>
        <p>{num}</p>
        {subName ? <p>{subName}</p> : null}
      </Link>
    )
  }

  pageJump = (data, start, end) => {
    this.setState({
      start,
      end,
      dataSource: data.slice(start, end)
    })
  }

  page = () => {
    const { list, pageSize, start, end } = this.state
    const len = list.length
    const pageNum = len / pageSize
    const pageSurplus = len % pageSize // 除 pageSize 的余数
    const num = pageSurplus !== 0 ? pageNum + 1 : pageNum // 余数不为 0 分页数 + 1
    let html = []
    if (len <= pageSize) {
      html.push(
        <li key={0} styleName="active">
          第1话 - 第{len}话
        </li>
      )
    } else {
      for (let i = 1; i <= num; i++) {
        const pageStart = i === 1 ? 1 : pageSize * (i - 1) + 1
        const pageStart2 = i === 1 ? 0 : pageSize * (i - 1)
        const pageEnd = i === 1 ? pageSize : pageSurplus !== 0 ? pageSize * i - (pageSize - pageSurplus) : pageSize * i // 余数不为 0 取剩余话数
        html.push(
          <li
            key={i}
            onClick={() => this.pageJump(list, pageStart2, pageEnd)}
            styleName={start === pageStart2 && pageEnd === end ? 'active' : ''}
          >
            第{pageStart}话 - 第{pageEnd}话
          </li>
        )
      }
    }

    // console.log(len / pageSize, html, pageSurplus)
    return html.map(item => item)
  }

  render() {
    const {
      play: { loading },
      match: {
        params: { id, pid }
      }
    } = this.props
    const { list, dataSource, pageSize } = this.state
    const len = parseInt(list.length / pageSize)
    const surplus = list.length % pageSize
    return (
      <Fragment>
        {loading ? <div>loading...</div> : null}
        <div styleName="playlist" className="mt20">
          <ul styleName="playlist-nav" style={{ width: `${(len + (surplus ? 1 : 0)) * 140}px` }}>
            {this.page()}
          </ul>
        </div>
        <div styleName="playlist" id="playlist">
          <ul styleName="playlist-ul" style={{ width: `${dataSource.length * 132}px` }}>
            {dataSource.map(item => (
              <li className={pid === item[1].toString() ? 'playlist-li__on' : ''} key={item[1]}>
                {this.format(item[0], item[1], id)}
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default PlayList
