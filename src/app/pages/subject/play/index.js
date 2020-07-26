import React, { useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { playerLoad } from '@/store/actions/player'
import { digg } from '@/store/actions/mark'
import { addplaylog } from '@/store/actions/history'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import Toast from '@/components/Toast'

import playing from '@/utils/play'

import '@/utils/base64.min'
import authcode from '@/utils/authcode'

import './style.scss'

export default function Play({ id, pid }) {
  const upDiv = useRef()
  const downDiv = useRef()

  const store = useStore()
  const me = useSelector((state) => getUserInfo(state))
  const info = useSelector((state) => getPlayerList(state, id, pid))

  useEffect(() => {
    const getData = (args) => playerLoad(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData({ id, pid })
    }
    const exitFull = (e) => {
      if (e.which === 27) {
        isFull(false)
      }
    }
    document.addEventListener('keyup', exitFull)
    return () => {
      document.removeEventListener('keyup', exitFull)
      addHistory() // 增加观看记录
    }
  }, [addHistory, load])

  const { userid } = me
  const { data = {}, loading } = info

  const addHistory = useCallback(async () => {
    const getPlaylogData = (args) => addplaylog(args)(store.dispatch, store.getState)
    const { title, subTitle, count = 0 } = data
    if (userid && title) {
      await getPlaylogData({
        id,
        pid,
        sid: 0,
        uid: userid,
        name: subTitle,
        max: count,
      })
    } else if (title) {
      let dataList = JSON.parse(localStorage.getItem('historyData') || '[]')
      if (dataList.length > 0) {
        for (let i = 0; i < dataList.length; i++) {
          const obj = JSON.parse(dataList[i])
          if (parseInt(obj.vid) === parseInt(id)) {
            dataList.splice(i, 1)
          }
        }
      }
      if (dataList.length > 10) {
        dataList.pop()
      }
      dataList.unshift(
        JSON.stringify({
          vid: id,
          pid,
          title,
          name: subTitle,
          next: +pid < count ? +pid + 1 : 0,
        })
      )
      localStorage.setItem('historyData', JSON.stringify([...new Set([...dataList])]))
    }
  }, [data, id, pid, store.dispatch, store.getState, userid])

  const onHttp = (play, type) => {
    const http = playing({ name: type, vid: authcode(atob(play), 'DECODE', key, 0) })
    console.log(http)
    return http
  }

  const onDigg = async (type, id) => {
    const onDigg = (args) => digg(args)(store.dispatch, store.getState)
    let [, res] = await onDigg({ type, id })
    if (res.code === 1) {
      if (type === 'up') {
        const up = upDiv.current.querySelectorAll('span')[0]
        up.innerText = up.innerText * 1 + 1
      } else {
        const down = downDiv.current.querySelectorAll('span')[0]
        down.innerText = down.innerText * 1 + 1
      }
    }
    Toast.success(res.msg)
  }

  const showList = (list = []) => {
    return list.map((item) => {
      return (
        <li key={item.playName} onClick={() => onHttp(item.vid, item.playName)}>
          <i className={`playicon ${item.playName}`} />
          {item.playTitle}
        </li>
      )
    })
  }

  const { list = [], title, subTitle, up, down, prev, next } = data
  return (
    <>
      <div styleName='player-info'>
        <div styleName='player-title'>
          <h1>
            <Link to={`/subject/${id}`}>{title}</Link>：
          </h1>
          <h4>{subTitle}</h4>
        </div>
        <ul styleName='playlist'>{showList(list)}</ul>
        <div styleName='play-next'>
          {prev ? <Link to={`/play/${id}/${prev}`}>上一集</Link> : null}
          {next ? <Link to={`/play/${id}/${next}`}>下一集</Link> : null}
        </div>
      </div>
      <div styleName='play-tool'>
        <div styleName='digg' onClick={() => onDigg('up', id)} ref={upDiv}>
          <i className='iconfont'>&#xe607;</i>
          <span>{up}</span>
        </div>
        <div styleName='digg' onClick={() => onDigg('down', id)} ref={downDiv}>
          <i className='iconfont'>&#xe606;</i>
          <span>{down}</span>
        </div>
      </div>
    </>
  )
}

Play.propTypes = {
  id: PropTypes.number,
  pid: PropTypes.number,
}
