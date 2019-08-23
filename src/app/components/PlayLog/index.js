import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { playlog, delplaylog, emptyhistory } from '@/store/actions/history'
import { getplaylog } from '@/store/reducers/history'

import './style.scss'

export default function PlayLog({ userid, isShow }) {
  const [playlogList, localPlaylog] = useState([])
  const store = useStore()
  const info = useSelector(state => getplaylog(state, userid || 0))
  const _delplaylog = args => delplaylog(args)(store.dispatch, store.getState)
  const _emptyhistory = args => emptyhistory(args)(store.dispatch, store.getState)

  // 显示记录
  const showPlayLog = useCallback(() => {
    const _playlog = args => playlog(args)(store.dispatch, store.getState)
    let playlogList = []
    if (userid) {
      _playlog()
    } else {
      playlogList = JSON.parse(localStorage.getItem('historyData') || '[]')
      for (let i = 0; i < playlogList.length; i++) {
        playlogList[i] = JSON.parse(playlogList[i])
      }
    }
    localPlaylog(playlogList)
  }, [localPlaylog, store.dispatch, store.getState, userid])

  // 删除记录
  const onDel = id => {
    if (userid) {
      _delplaylog({ id })
    } else {
      const historyData = JSON.parse(localStorage.getItem('historyData') || '[]')
      historyData.splice(id, 1)
      localStorage.setItem('historyData', JSON.stringify(historyData))
    }
    showPlayLog()
  }

  // 清空记录
  const empty = () => {
    if (userid) {
      _emptyhistory()
    } else {
      localStorage.removeItem('historyData')
    }
    showPlayLog()
  }

  useEffect(() => {
    showPlayLog()
  }, [showPlayLog])
  const { data } = info
  const list = (userid ? data : playlogList) || []
  return (
    <div styleName="history" className="box" style={{ display: isShow ? 'block' : 'none' }}>
      <div styleName="title">
        <h2>观看记录</h2>
        <span onClick={() => empty()}>清空记录</span>
      </div>
      <ul styleName="list">
        {list.map((item, index) => (
          <li key={index}>
            <span>
              <Link to={`/subject/${item.vid}`}>{item.title}</Link>
              <Link to={`/play/${item.vid}/${item.pid}`}>{item.name}</Link>
            </span>
            <Link to={`/play/${item.vid}/${item.pid}`}>续播</Link>
            {item.next ? <Link to={`/play/${item.vid}/${item.next}`}>下一集</Link> : null}
            <a onClick={() => onDel(userid ? item.id : index)}>删除</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

PlayLog.propTypes = {
  userid: PropTypes.number,
  isShow: PropTypes.bool
}
