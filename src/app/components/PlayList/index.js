import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { playlist } from '@/store/actions/playlist'
import { getPlayList } from '@/store/reducers/playlist'

import { trim, firstNumber, isMobile } from '@/utils'

import './style.scss'

export default () => {
  const { match } = useReactRouter()
  const { id, pid } = match.params || {}
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(18)
  const [isReverse, onReverse] = useState(false)
  const [isAll, onAll] = useState(false)

  const store = useStore()
  const info = useSelector(state => getPlayList(state, id))

  const pageNav = useRef()
  const pageNavUl = useRef()
  const pageCurrent = useRef()

  const pageSize = 18
  const liWidth = 130

  const onDom = () => {
    const navWidth = pageNav.current.clientWidth
    const ulWidth = pageNavUl.current.clientWidth
    const currentLeft = (pageCurrent.current || {}).offsetLeft
    const isNeq1200 = ulWidth - currentLeft < 1200 - liWidth // 是否小于1200减一页的宽
    const X = isNeq1200 ? ulWidth - navWidth : currentLeft - liWidth * 3
    pageNavUl.current.style.transform = `translateX(-${X}px)`
  }

  const onPrev = () => {
    pageNavUl.current.style.transition = 'transform .3s ease'
    const num = parseInt(pageNavUl.current.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num < liWidth ? 0 : -num + liWidth
    pageNavUl.current.style.transform = `translateX(${X}px)`
  }

  const onNext = () => {
    const navWidth = pageNav.current.clientWidth
    const ulWidth = pageNavUl.current.clientWidth
    pageNavUl.current.style.transition = 'transform .3s ease'
    const num = parseInt(pageNavUl.current.style.transform.replace(/[^0-9]/gi, '')) || 0
    const X = num >= ulWidth - navWidth ? -ulWidth + navWidth : -num - liWidth
    pageNavUl.current.style.transform = `translateX(${X}px)`
  }

  const setData = useCallback((data = [], pid) => {
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
    setStart(start)
    if (end) {
      setEnd(end)
    }

    // 分页面数大于 8 页时调用
    if (pageLen > 8 && pid) {
      onDom()
    }
  }, [])

  const format = (data, item, id) => {
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

  const pageJump = (start, end) => {
    setStart(start)
    setEnd(end)
  }

  const page = () => {
    const { data = {} } = info
    const list = data.list || []
    const len = list.length
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
          <li key={i} onClick={() => pageJump(pageStart, pageEnd)} ref={pageCurrent} styleName={isCurrent ? 'active' : ''}>
            第{pageFirst}话 - 第{pageEnd}话
          </li>
        )
      }
    }

    return html.map(item => item)
  }

  useEffect(() => {
    async function fetchData() {
      const _playlist = args => playlist(args)(store.dispatch, store.getState)
      if (!(info && info.data)) {
        const [, data] = await _playlist({ id })
        if (data) {
          setData(data.list, pid)
        }
      } else {
        const { data = {} } = info
        const list = data.list || []
        setData(list, pid)
      }
    }
    fetchData()
  }, [id, info, pid, setData, store.dispatch, store.getState])

  const { data = {} } = info
  const list = data.list || []
  const len = parseInt(list.length / pageSize)
  const surplus = list.length % pageSize
  console.log(start, end)
  const dataSource = list.slice(start, end)
  return (
    <>
      {list.length ? (
        <div styleName="playlistbox">
          {list.length > pageSize ? (
            <div styleName="play-page">
              {list.length > 144 ? (
                <div styleName="play-prev-next">
                  <div styleName="pn" onClick={() => onPrev()}>
                    <i className="iconfont">&#xe8ff;</i>
                  </div>
                  <div styleName="pn" onClick={() => onNext()}>
                    <i className="iconfont">&#xe65e;</i>
                  </div>
                  <div onClick={() => onAll(!isAll)}>全部集数</div>
                </div>
              ) : null}
              <div styleName="playlist playlist-boreder" ref={pageNav}>
                <ul styleName="playlist-nav" ref={pageNavUl} style={{ width: `${(len + (surplus ? 1 : 0)) * 140}px` }}>
                  {page()}
                </ul>
              </div>
            </div>
          ) : null}
          <div styleName="playlist">
            <ul styleName="playlist-ul">
              {dataSource.map(item => (
                <li styleName={+pid === +item.episode ? 'active' : ''} key={item.episode}>
                  {format(item.title, item.episode, id)}
                </li>
              ))}
            </ul>
          </div>
          <div styleName={`moblie-list ${isAll ? 'showAll' : ''}`}>
            <div styleName="moblie-title">
              <h2>分集</h2>
              {isMobile() ? <span onClick={() => onReverse(!isReverse)}>{isReverse ? '倒序' : '正序'}</span> : null}
              {isAll ? (
                <i className="iconfont" onClick={() => onAll(!isAll)}>
                  &#xe610;
                </i>
              ) : null}
            </div>
            <ul>
              {(isReverse ? list.reverse() : list).map(item => (
                <li styleName={+pid === +item.episode ? 'active' : ''} key={item.episode}>
                  <Link to={`/play/${id}/${item.episode}`}>{firstNumber(item.title)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  )
}
