import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { playerLoad } from '@/store/actions/player'
import { digg } from '@/store/actions/mark'
import { addplaylog } from '@/store/actions/history'
import { getPlayerList } from '@/store/reducers/player'
import { getUserInfo } from '@/store/reducers/user'

import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import PlayList from '@/components/PlayList'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import Toast from '@/components/Toast'
import Ads from '@/components/Ads'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import Cookies from 'js-cookie'

import { ISPLAY, DOMAIN_NAME, NAME } from 'Config'
import { isMobile } from '@/utils'
import { loadScript } from '@/utils/loadScript'
import playing from '@/utils/play'

import '@/utils/base64.min'
import authcode from '@/utils/authcode'

import './style.scss'

export default Shell(() => {
  const [isFlvsp, setFlvsp] = useState(false)
  const [full, isFull] = useState(false)
  const [isfull, setIsfull] = useState(false)
  const [showPlay, setShowPlay] = useState(false)
  const [mInfo, setmInfo] = useState({})
  const [playHtml, setPlayHtml] = useState('')
  const [isZ, setIsZ] = useState('')
  const upDiv = useRef()
  const downDiv = useRef()

  const menu = {
    201: 'tv',
    202: 'ova',
    203: 'juchang',
    4: 'tebie',
    204: 'zhenren',
    35: 'qita'
  }

  const {
    location,
    match: {
      params: { id, pid },
      url
    }
  } = useReactRouter()

  const store = useStore()
  const me = useSelector(state => getUserInfo(state))
  const info = useSelector(state => getPlayerList(state, id, pid))

  const load = useCallback(async () => {
    const getData = args => playerLoad(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      let [, data] = await getData({ id, pid })
      if (data) {
        getPlay()
      }
    } else {
      getPlay()
    }
  }, [getPlay, id, info, pid, store.dispatch, store.getState])

  useEffect(() => {
    document.onkeyup = event => {
      if (event.which == '27') {
        isFull(false)
      }
    }
    load()
    return () => {
      addHistory() // 增加观看记录
    }
  }, [addHistory, load])

  const { userid } = me
  const { data = {}, loading } = info

  const addHistory = useCallback(async () => {
    const getPlaylogData = args => addplaylog(args)(store.dispatch, store.getState)
    const { title, subTitle, count = 0 } = data
    if (userid && title) {
      await getPlaylogData({
        uid: userid,
        vod_id: id,
        vod_pid: pid,
        vod_sid: 0,
        vod_name: title,
        url_name: subTitle,
        vod_maxnum: count
      })
    } else if (title) {
      let dataList = JSON.parse(localStorage.historyData || '[]')
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
          next: +pid < count ? +pid + 1 : 0
        })
      )
      localStorage.historyData = JSON.stringify([...new Set([...dataList])])
    }
  }, [data, id, pid, store.dispatch, store.getState, userid])

  const onPlay = (play, type) => {
    getPlay(play, type)
  }

  const getOther = (data = []) => {
    return data.filter(item => item.playName === 'other')
  }

  const getQq = (data = []) => {
    return data.filter(item => item.playName === 'qq')
  }

  const getPlay = useCallback(
    (play, type) => {
      loadScript({
        src: 'https://pv.sohu.com/cityjson?ie=utf-8',
        end: false,
        callback: function() {
          const { list = [], copyright, key } = data
          const other = getOther(list)
          const qq = getQq(list)
          const isStop = (qq ? /上海|北京|深圳/ : /上海|北京/).test(returnCitySN.cname)
          const danmu = `${id}_${pid}`
          const isZ = isStop && +Cookies.get('plain') !== 7
          const isA = other.length > 0 && !isZ && (copyright !== 'vip' || isMobile() || ISPLAY || userid)
          const { playName, vid, playTitle } = isA ? other[0] || {} : list[0] || {}
          let playHtml = ''
          if (playName && vid && playTitle) {
            if (play && !isZ) {
              playHtml = playing({ name: type, vid: authcode(atob(play), 'DECODE', key, 0), danmu, copyright, url })
            } else {
              playHtml = playing({ name: playName, vid: authcode(atob(vid), 'DECODE', key, 0), danmu, copyright, url })
            }
            const mInfo = { playName, vid, playTitle }
            setPlayHtml(playHtml[0])
            setFlvsp(playHtml[1])
            setmInfo(mInfo)
            setIsZ(isZ)
          }
        }
      })
    },
    [data, id, pid, url, userid]
  )

  const onDigg = async (type, id) => {
    const onDigg = args => digg(args)(store.dispatch, store.getState)
    let [, res] = await onDigg({ type, id })
    if (res.rcode === 1) {
      const num = res.data.split(':')
      upDiv.current.querySelectorAll('span')[0].innerText = num[0]
      downDiv.current.querySelectorAll('span')[0].innerText = num[1]
      Toast.success(res.msg)
    }
  }

  const showList = (list = []) => {
    if (isZ !== '') {
      return list.map((item, index) => {
        return isZ ? (
          index < 1 ? (
            <li key={item.playName}>
              <i className={`playicon ${item.playName}`} />
              {item.playTitle}
            </li>
          ) : null
        ) : (
          <li key={item.playName} onClick={() => onPlay(item.vid, item.playName)}>
            <i className={`playicon ${item.playName}`} />
            {item.playTitle}
          </li>
        )
      })
    }
  }

  const { listName, listId, listNameBig, list = [], pic, title, pan, subTitle, actor = '', up, down, prev, next, mcid = [], copyright } = data
  const shareConfig = {
    pic,
    title: `#${title}# ${subTitle}在线播放 - ${listName}${listNameBig} - #${NAME.split('_').join('##')}# @99496动漫网`,
    url: `/play/${id}/${pid}`
  }
  return (
    <>
      <div styleName="player">
        <div className="wp pt20">
          {!loading && data.title ? (
            <Meta title={`${title} ${subTitle}在线播放 - ${listName}${listNameBig}`}>
              <meta name="keywords" content={`${title}${subTitle},${title}在线观看,动画${title}`} />
              <meta name="description" content={`${NAME}为您提供${listName}${listNameBig}${title}${subTitle}在线观看。喜欢${title}${subTitle}，就推荐给小伙伴们吧！`} />
            </Meta>
          ) : null}
          <div styleName={`player-box ${isFlvsp ? 'is-flvsp' : ''} ${full ? 'play-full' : ''}`} onMouseOver={() => setIsfull(true)} onMouseLeave={() => setIsfull(false)}>
            <div dangerouslySetInnerHTML={{ __html: playHtml }} />
            {isfull ? (
              <a onMouseOver={() => setIsfull(true)} onClick={() => isFull(!full)}>
                {full ? '退出全屏' : '网页全屏'}
              </a>
            ) : null}
          </div>
          <div styleName="player-info">
            <div styleName="player-title">
              <h1>
                <Link to={`/subject/${id}`}>{title}</Link>：
              </h1>
              <h4>{subTitle}</h4>
            </div>
            <ul styleName={`playlist ${showPlay ? 'show' : 'hide'}`}>{showList(list)}</ul>
            <div styleName="m-play-name" onClick={() => setShowPlay(!showPlay)}>
              <i className={`playicon ${mInfo.playName}`} />
              {mInfo.playTitle}
            </div>
            <div styleName="play-next">
              {prev ? <Link to={`/play/${id}/${prev}`}>上一集</Link> : null}
              {next ? <Link to={`/play/${id}/${next}`}>下一集</Link> : null}
            </div>
          </div>
          <div styleName="play-tool">
            <div styleName="digg" onClick={() => onDigg('up', id)} ref={upDiv}>
              <i className="iconfont">&#xe607;</i>
              <span>{up}</span>
            </div>
            <div styleName="digg" onClick={() => onDigg('down', id)} ref={downDiv}>
              <i className="iconfont">&#xe606;</i>
              <span>{down}</span>
            </div>
            <div styleName="mcid">
              {mcid.map((item, index) => {
                return (isMobile() ? (
                  item.title && index < 3
                ) : (
                  item.title
                )) ? (
                  <Link className={`mcid-${index}`} key={item.id} to={`/type/${menu[listId] || 'list'}/${item.id}/-/-/-/-/-/`}>
                    {item.title}
                  </Link>
                ) : null
              })}
              {pan ? (
                <a href={pan} target="_blank" rel="noopener noreferrer">
                  网盘下载
                </a>
              ) : null}
            </div>
            <div styleName="player-share">
              <Share data={shareConfig} location={location} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt20">
        <Ads id={3} />
      </div>
      <PlayList />
      {DOMAIN_NAME === 'dddm.tv' && (
        <div className="wp mt20 box" styleName="zhaimoe">
          <iframe src="//www.zhaimoe.com/portal/page/index/id/35.html" width="1200" height="100%" frameBorder="0" scrolling="no" />
        </div>
      )}
      <div className="wp">
        <Ads id={4} />
      </div>
      <div className="mt20" />
      <div className="wp clearfix">
        <div className="fl left box">
          <div className="mt10">
            <div styleName="title">
              <h2>相关动漫</h2>
            </div>
            {id ? <DetailActor actor={actor} no={id} /> : null}
          </div>
          <div className="mt10">
            <div styleName="title">
              <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
            </div>
            <HotWeek />
          </div>
        </div>
        <div className="right fr">
          <SideBar vodid={id} />
        </div>
      </div>
    </>
  )
})
