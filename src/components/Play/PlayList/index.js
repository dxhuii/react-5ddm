import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { playlist } from '@/store/actions/playlist'
import { getPlayList } from '@/store/reducers/playlist'

import { getOffset, trim } from '@/utils'

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
      end: 18
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
        this.setData(data, pid)
      })
    } else {
      const { data } = play
      this.setData(data, pid)
    }
  }

  onDom() {
    this.current = document.querySelector('#pageCurrent')
    this.pageNav = document.querySelector('#playNav')
    this.pageNavUl = this.pageNav.querySelectorAll('ul')[0]
    this.pageNavLi = this.pageNav.querySelectorAll('li')
    this.liWidth = this.pageNavLi[0].clientWidth
    this.navWidth = this.pageNav.clientWidth
    this.ulWidth = this.pageNavUl.clientWidth
    this.currentLeft = this.current.offsetLeft

    if (this.pageNavLi.length > 8) {
      const liWidth = this.liWidth
      const navWidth = this.navWidth
      const ulWidth = this.ulWidth
      const currentLeft = this.currentLeft

      if (ulWidth - currentLeft < 1200 - liWidth) {
        this.pageNavUl.style.transform = `translateX(-${ulWidth - navWidth}px)`
      } else {
        this.pageNavUl.style.transform = `translateX(-${currentLeft - liWidth * 3}px)`
      }
    }
  }

  setData(data, pid) {
    const { pageSize } = this.state
    let start = 0
    let end = pageSize
    const len = data.length
    if (pid) {
      const num = parseInt(+pid / pageSize)
      const surplus = +pid % pageSize
      const yesSurplus = (num + 1) * pageSize
      const noSurplus = num * pageSize
      start = surplus !== 0 ? (+pid < pageSize ? 0 : noSurplus) : +pid < pageSize ? 0 : (num - 1) * pageSize
      end = surplus !== 0 ? (yesSurplus > len ? len : yesSurplus) : num * pageSize
    }
    console.log(start, end, pageSize)
    this.setState(
      {
        start,
        end
      },
      () => {
        if (len > pageSize) {
          this.onDom()
        }
      }
    )
  }

  onPrev = () => {
    this.pageNavUl.style.transition = 'transform .3s ease'
    const num = parseInt(this.pageNavUl.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num < 130 ? 0 : -num + this.liWidth
    this.pageNavUl.style.transform = `translateX(${X}px)`
  }

  onNext = () => {
    this.pageNavUl.style.transition = 'transform .3s ease'
    const num = parseInt(this.pageNavUl.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num >= this.ulWidth - this.navWidth ? -this.ulWidth + this.navWidth : -num - this.liWidth
    this.pageNavUl.style.transform = `translateX(${X}px)`
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
    const pageNum = len / pageSize
    const pageSurplus = len % pageSize // 除 pageSize 的余数
    const num = parseInt(pageSurplus !== 0 ? pageNum + 1 : pageNum) // 余数不为 0 分页数 + 1
    let html = []
    if (len > pageSize) {
      for (let i = 1; i <= num; i++) {
        const pageStart = i === 1 ? 1 : pageSize * (i - 1) + 1
        const pageStart2 = i === 1 ? 0 : pageSize * (i - 1)
        const pageEnd = i === 1 ? pageSize : i === num && pageSurplus !== 0 ? pageSize * i - (pageSize - pageSurplus) : pageSize * i // 余数不为 0 取剩余话数
        // console.log(start, pageStart2, end, pageEnd, 'page')
        html.push(
          <li
            key={i}
            onClick={() => this.pageJump(pageStart2, pageEnd)}
            id={start === pageStart2 && pageEnd === end ? 'pageCurrent' : ''}
            styleName={start === pageStart2 && pageEnd === end ? 'active' : ''}
          >
            第{pageStart}话 - 第{pageEnd}话
          </li>
        )
      }
    }

    // console.log(num, html, pageSurplus)
    return html.map(item => item)
  }

  render() {
    const {
      play: { loading, data = [] },
      match: {
        params: { id, pid }
      }
    } = this.props
    const { pageSize, start, end } = this.state
    const len = parseInt(data.length / pageSize)
    const surplus = data.length % pageSize
    const dataSource = data.slice(start, end)

    return (
      <div className="wp">
        {loading ? <div>loading...</div> : null}
        {data.length > pageSize ? (
          <Fragment>
            <div onClick={this.onPrev.bind(this)}>prev</div>
            <div styleName="playlist playlist-boreder" id="playNav">
              <ul styleName="playlist-nav" style={{ width: `${(len + (surplus ? 1 : 0)) * 140}px` }}>
                {this.page()}
              </ul>
            </div>
            <div onClick={this.onNext.bind(this)}>next</div>
          </Fragment>
        ) : null}
        <div styleName="playlist" id="playlist">
          <ul styleName="playlist-ul" /* style={{ width: `${dataSource.length * 132}px` }} */>
            {dataSource.map(item => (
              <li className={pid === item.episode.toString() ? 'playlist-li__on' : ''} key={item.episode}>
                {this.format(item.title, item.episode, id)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PlayList
