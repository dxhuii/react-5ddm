import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playlist } from '@/store/actions/playlist'
import { getPlayList } from '@/store/reducers/playlist'

import { trim } from '@/utils'

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
      pageLen: 0,
      start: 0,
      end: 18
    }
    this.liWidth = 130
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
        this.setData(data, pid)
      })
    } else {
      const { data } = play
      this.setData(data, pid)
    }
  }

  onDom() {
    this.navWidth = this.pageNav.clientWidth
    this.ulWidth = this.pageNavUl.clientWidth
    const currentLeft = this.pageCurrent.offsetLeft
    const isNeq1200 = this.ulWidth - currentLeft < 1200 - this.liWidth // 是否小于1200减一页的宽
    const X = isNeq1200 ? this.ulWidth - this.navWidth : currentLeft - this.liWidth * 3
    this.pageNavUl.style.transform = `translateX(-${X}px)`
  }

  onPrev = () => {
    this.pageNavUl.style.transition = 'transform .3s ease'
    const num = parseInt(this.pageNavUl.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num < this.liWidth ? 0 : -num + this.liWidth
    this.pageNavUl.style.transform = `translateX(${X}px)`
  }

  onNext = () => {
    this.pageNavUl.style.transition = 'transform .3s ease'
    const num = parseInt(this.pageNavUl.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num >= this.ulWidth - this.navWidth ? -this.ulWidth + this.navWidth : -num - this.liWidth
    this.pageNavUl.style.transform = `translateX(${X}px)`
  }

  setData(data, pid) {
    const { pageSize } = this.state
    const len = data.length
    const pageLen = parseInt(len / pageSize) + (len % pageSize ? 1 : 0) // 总页数
    let start = 0
    let end = pageSize
    if (pid && +pid > pageSize) {
      const num = parseInt(+pid / pageSize)
      const surplus = +pid % pageSize
      const noSurplus = num * pageSize // 无余数
      const yesSurplus = noSurplus + pageSize // 有余数

      start = surplus ? noSurplus : noSurplus - pageSize
      end = surplus ? (yesSurplus > len ? len : yesSurplus) : noSurplus
    }
    this.setState(
      {
        start,
        end,
        pageLen
      },
      () => {
        // 分页面数大于 8 页时调用
        if (pageLen > 8) {
          this.onDom()
        }
      }
    )
  }

  format(data, item, id) {
    let num = ''
    let subName = ''
    if (data === '全集') {
      num = data
    } else {
      const title = data.split(' ')
      const name = data.split(/话|集/)
      num = title[0]
      subName = name[1] ? trim(name[1]) : ''
    }

    return (
      <Link to={`/play/${id}/${item}`}>
        <p>{num}</p>
        {subName ? <p>{subName}</p> : null}
      </Link>
    )
  }

  pageJump = (start, end) => {
    this.setState({
      start,
      end
    })
  }

  page = () => {
    const {
      play: { data = [] }
    } = this.props
    const { pageSize, start, end } = this.state
    const len = data.length
    const num = parseInt(len / pageSize)
    const surplus = len % pageSize // 除 pageSize 的余数
    const pageNum = surplus ? num + 1 : num // 余数不为 0 分页数 + 1
    let html = []
    if (len > pageSize) {
      for (let i = 1; i <= pageNum; i++) {
        const pageFirst = i === 1 ? 1 : pageSize * (i - 1) + 1
        const pageStart = i === 1 ? 0 : pageSize * (i - 1)
        const pageEnd = i === 1 ? pageSize : i === pageNum && surplus ? pageSize * i - (pageSize - surplus) : pageSize * i // 余数不为 0 取剩余话数
        const isCurrent = start === pageStart && pageEnd === end // 判断是否为当前选中的集数
        html.push(
          <li
            key={i}
            onClick={() => this.pageJump(pageStart, pageEnd)}
            ref={isCurrent ? e => (this.pageCurrent = e) : null}
            styleName={isCurrent ? 'active' : ''}
          >
            第{pageFirst}话 - 第{pageEnd}话
          </li>
        )
      }
    }

    return html.map(item => item)
  }

  render() {
    const {
      play: { loading, data = [] },
      match: {
        params: { id, pid }
      }
    } = this.props
    const { pageSize, start, end, pageLen } = this.state
    const len = parseInt(data.length / pageSize)
    const surplus = data.length % pageSize
    const dataSource = data.slice(start, end)

    return (
      <Fragment>
        {loading && data.length ? <div>loading...</div> : null}
        {data.length > pageSize ? (
          <Fragment>
            {pageLen > 8 ? (
              <Fragment>
                <div onClick={this.onPrev}>prev</div>
                <div onClick={this.onNext}>next</div>
              </Fragment>
            ) : null}
            <div styleName="playlist playlist-boreder" ref={e => (this.pageNav = e)}>
              <ul styleName="playlist-nav" ref={e => (this.pageNavUl = e)} style={{ width: `${(len + (surplus ? 1 : 0)) * 140}px` }}>
                {this.page()}
              </ul>
            </div>
          </Fragment>
        ) : null}
        <div styleName="playlist">
          <ul styleName="playlist-ul">
            {dataSource.map(item => (
              <li styleName={+pid === +item.episode ? 'active' : ''} key={item.episode}>
                {this.format(item.title, item.episode, id)}
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default PlayList
