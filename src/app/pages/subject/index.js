import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { detail, love } from '@/store/actions/detail'
import { comment, addComment } from '@/store/actions/comment'
import { mark, digg } from '@/store/actions/mark'
import { playlist } from '@/store/actions/playlist'
import { getPlayList } from '@/store/reducers/playlist'
import { getDetail } from '@/store/reducers/detail'
import { getComment } from '@/store/reducers/comment'
import { getUserInfo } from '@/store/reducers/user'

import Loading from '@/components/Ui/Loading'
import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import EpList from '@/components/Subject/EpList'
import NewsPic from '@/components/Subject/NewsPic'
import NewsText from '@/components/Subject/NewsText'
import Comment from '@/components/Comment'
import Tating from '@/components/Tating'
import Modal from '@/components/Modal'
import Sign from '@/components/Sign'
import Toast from '@/components/Toast'
import Ads from '@/components/Ads'

import Meta from '@/components/Meta'
import Shell from '@/components/Shell'

import { trim, isNumber, formatPic } from '@/utils'
import { DOMAIN_NAME, NAME, DOMAIN } from 'Config'

import playing from '@/utils/play'

import '@/utils/base64.min'
import authcode from '@/utils/authcode'

import './style.scss'

const Subject = () => {
  const [visible, onModal] = useState(false)
  const [isSign, onSign] = useState('signIn')
  const [loveData, setLove] = useState({})
  const [playShow, playSetShow] = useState({})
  const [playName, playSetName] = useState('')
  const menu = {
    201: 'tv',
    202: 'ova',
    203: 'juchang',
    4: 'tebie',
    204: 'zhenren',
    35: 'qita'
  }
  const location = useLocation()
  const {
    params: { id, sid = 1 }
  } = useRouteMatch()

  const store = useStore()
  const me = useSelector(state => getUserInfo(state))
  const info = useSelector(state => getDetail(state, id))
  const commentData = useSelector(state => getComment(state, `${sid}_${id}`))
  const loveD = useSelector(state => getDetail(state, `love_${id}`))
  const _comment = useCallback(args => comment(args)(store.dispatch, store.getState), [store.dispatch, store.getState])
  const _love = useCallback(args => love(args)(store.dispatch, store.getState), [store.dispatch, store.getState])
  const playData = useSelector(state => getPlayList(state, id))

  const { userid, nickname } = me
  const { data = {}, loading } = info
  const { key, list = [] } = playData.data || {}

  const closePlayBox = useCallback(() => {
    if (playName) {
      playSetShow({
        [playName]: false
      })
    }
  }, [playName])

  useEffect(() => {
    const getData = args => detail(args)(store.dispatch, store.getState)
    const getPlayData = args => playlist(args)(store.dispatch, store.getState)
    document.addEventListener('click', closePlayBox)
    if (!(playData && playData.data)) {
      getPlayData({ id })
    }
    if (!info || !info.data) {
      getData({ id })
    }
    if (!commentData || !commentData.data) {
      _comment({ id, sid })
    }
    async function feachLove() {
      const [, data] = await _love({ id, sid })
      setLove(data.data || {})
    }
    if (!(loveD && loveD.data) && userid) feachLove()
  }, [commentData, loveD, id, info, store.dispatch, store.getState, userid, sid, _love, _comment, playData, closePlayBox])

  const playBox = e => {
    e.nativeEvent.stopImmediatePropagation()
  }

  const addMark = async (type, id, cid) => {
    const onLike = args => mark(args)(store.dispatch, store.getState)
    if (userid) {
      const [, data] = await onLike({ type, id, cid })
      if (data.code === 1) {
        const [, res] = await _love({ id, sid })
        setLove(res.data || {})
        Toast.success(data.msg)
      }
    } else {
      onModal(true)
    }
  }

  const onDigg = async (type, id) => {
    const onDigg = args => digg(args)(store.dispatch, store.getState)
    const [, res] = await onDigg({ type, id, sid, info: 'subject' })
    if (res.code === 1) {
      Toast.success(res.msg)
    }
  }

  const onType = isSign => {
    onSign(isSign)
    onModal(true)
  }

  const submit = async (e, content, code, imgkey) => {
    e.preventDefault()
    if (!userid) {
      onModal(true)
      return
    }
    if (!content.value) {
      content.focus()
      Toast.error('评论内容不能为空')
      return
    }
    if (!code.value) {
      code.focus()
      Toast.error('验证码不能为空')
      return
    }
    const _addComment = args => addComment(args)(store.dispatch, store.getState)
    const [, data] = await _addComment({ id, sid, content: content.value, nickname, pid: 0, validate: code.value, key: imgkey })
    if (data.code === 1) {
      content.value = ''
      code.value = ''
      _comment({ id, sid })
    }
  }

  const format = data => {
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
      <>
        <p>{num}</p>
        {subName ? <p>{subName}</p> : null}
      </>
    )
  }

  const playerList = (data = [], key, name) => {
    return data.map(({ title, vid }) => (
      <a key={`${vid}`} href={`${playing(name, authcode(atob(vid), 'DECODE', key, 0))}`} target='_blank' rel='noreferrer' title={title}>
        {format(title)}
      </a>
    ))
  }

  const showPlay = (e, name) => {
    e.nativeEvent.stopImmediatePropagation()
    playSetShow({
      [name]: true
    })
    playSetName(name)
  }

  const showPlayClose = (e, name) => {
    e.nativeEvent.stopImmediatePropagation()
    playSetShow({
      [name]: false
    })
    playSetName('')
  }

  const player = () => {
    return list.map(({ playName, playTitle, copyright, list }) => (
      <div styleName='player' key={`${playName}`}>
        <div styleName='title' onClick={e => showPlay(e, playName)}>
          <h4>
            <i className={`playicon ${playName}`}></i>
            {playTitle}
          </h4>
          <span>{copyright}</span>
        </div>
        <div styleName={`player-list ${playShow[playName] ? 'show' : ''}`}>
          <span onClick={e => showPlayClose(e, playName)}>✕</span>
          <div styleName='player-box' onClick={e => playBox(e)}>
            {playerList(list, key, playName)}
          </div>
        </div>
      </div>
    ))
  }

  const {
    cid,
    title,
    listName,
    listNameBig,
    actor,
    area,
    aliases,
    gold,
    filmtime,
    total,
    company,
    keywords,
    website,
    updateDate,
    up,
    down,
    jump,
    tvcont,
    status,
    year,
    storyId,
    actorId,
    pic = '',
    language = '',
    content = '',
    mcid = [],
    original = [],
    director = [],
    storylist = [],
    newsTextlist = [],
    newsPiclist = []
  } = data
  const reActor = actor ? actor.map(item => item.title).join(',') : ''
  const rePic = formatPic(pic, 'orj360')
  const commitD = commentData.data || {}
  const commentList = commitD.list || []
  const star = commitD.gold || {}
  const { loveid, remindid } = loveData
  const reContent = `${content.substring(0, 120)}${content.length > 120 ? '...' : ''}`.replace('剧情简介:', '').replace('故事讲述', '')
  const shareConfig = {
    pic,
    title: `#${title}#${language ? `(${language})` : ''} - ${listName}${listNameBig}`,
    desc: reContent,
    url: `/subject/${id}`
  }
  if (jump && !(typeof window === 'undefined')) {
    window.location.href = jump
  }
  if (loading || !data.title) return <Loading />
  // console.log(loveData, 'loveData')
  return (
    <>
      <div className='warp-bg'>
        <Meta title={`${title} - ${listName}${listNameBig}`}>
          <meta name='description' content={`${title}${listNameBig}简介和剧情介绍,${reContent}`} />
          <meta
            name='keywords'
            content={`${title},${title}${listNameBig},${title}全集,${title}动画片,${title}在线观看${keywords ? `,${keywords}` : ''}`}
          />
          <meta property='og:locale' content='zh_CN' />
          <meta property='og:type' content='videolist' />
          <meta property='og:title' content={title} />
          <meta property='og:description' content={reContent} />
          <meta property='og:image' content={rePic} />
          <meta property='og:url' content={`/subject/${id}`} />
          <meta property='og:video' content={`/play/${id}/1`} />
          <meta property='og:site_name' content={NAME} />
          <meta property='og:video:score' content={gold} />
          <meta property='og:video:actor' content={reActor} />
          <meta property='og:video:area' content={area} />
          <meta property='og:video:class' content={`${listName}${mcid.length > 0 ? mcid.map(item => item.title).join(',') : ''}`} />
          <meta property='og:video:language' content={language} />
          <meta property='og:video:update_date' content={updateDate} />
          <meta property='og:video:content_type' content='6' />
        </Meta>
        <div styleName='detail'>
          <div styleName='detail-blur' style={{ backgroundImage: `url(${rePic})` }} />
          <div styleName='detail-con' className='wp clearfix'>
            <div styleName='detail-pic'>{pic ? <img src={rePic} /> : null}</div>
            <div styleName='detail-info'>
              <div styleName='detial-title'>
                <h1>{title}</h1>
                <span>
                  <Link to={`/type/${menu[cid] || 'list'}/-/-/-/-/-/addtime/`}>{listName}</Link>
                  {mcid.length > 0
                    ? mcid.map(item =>
                        item.title ? (
                          <Link key={item.id} to={`/type/${menu[cid] || 'list'}/${item.id}/-/-/-/-/addtime/`}>
                            {item.title}
                          </Link>
                        ) : null
                      )
                    : null}
                </span>
              </div>
              {aliases ? <p>别名：{aliases}</p> : null}
              <ul styleName='detail-info__count'></ul>
              {filmtime || status || total ? (
                <p>
                  {filmtime ? <span>{filmtime} 播出</span> : <span>{year}年</span>}
                  {isNumber(status) ? <span> 更新至{status}话</span> : <span> {status}</span>}
                  {tvcont ? <span>，{tvcont}</span> : null}
                  {total ? <span>，共{total}话</span> : null}
                </p>
              ) : null}
              <p>
                {language ? <span style={{ marginRight: 30 }}>语言：{language}</span> : null}
                {area ? <span>地区：{area}</span> : null}
              </p>
              <p styleName='detail-update'>更新时间：{updateDate}</p>
              <div styleName='detail-tool'>
                <div styleName={`detail-tool__on ${remindid ? 'active' : ''}`} onClick={() => addMark('remind', id, cid, userid)}>
                  <i className='iconfont'>&#xe6bd;</i>
                  {remindid ? '已追番' : '追番'}
                </div>
                <div styleName={`detail-tool__on ${loveid ? 'active' : ''}`} onClick={() => addMark('love', id, cid, userid)}>
                  <i className='iconfont'>&#xe66a;</i>
                  {loveid ? '已收藏' : '收藏'}
                </div>
                <div styleName='detail-tool__on digg active' onClick={() => onDigg('up', id)}>
                  <i className='iconfont'>&#xe607;</i>
                  <span>{up}</span>
                </div>
                <div styleName='detail-tool__on digg active' onClick={() => onDigg('down', id)}>
                  <i className='iconfont'>&#xe606;</i>
                  <span>{down}</span>
                </div>
                <div styleName='detail-tool__on share'>
                  <i className='iconfont'>&#xe655;</i>分享
                </div>
                <div styleName='detail-tool__share'>
                  <Share data={shareConfig} location={location} />
                </div>
              </div>
            </div>
            {star ? (
              <div styleName='detail-score'>
                <Tating data={star} id={+id} sid={sid} />
              </div>
            ) : null}
          </div>
        </div>
        <div styleName='detail-nav'>
          <div className='wp'>
            <ul>
              <li styleName='active'>
                <a>作品详情</a>
              </li>
              {newsTextlist.length || newsPiclist.length ? (
                <li>
                  <Link to={`/subject/${id}/news`}>新闻花絮</Link>
                </li>
              ) : null}
              {actorId ? (
                <li>
                  <a>演员角色</a>
                </li>
              ) : null}
              {storyId ? (
                <li>
                  <Link to={`/episode/${id}`}>分集剧情</Link>
                </li>
              ) : null}
              <li>
                <Link to={`/time/${id}`}>播出时间</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <section className='mt20 clearfix wp' styleName='detail-bottom'>
        <div className='left'>
          {newsTextlist.length > 0 ? (
            <div className='right-box'>
              <div className='right-title'>
                <h2>预告片·OP·ED·BGM·MAD·CM·特典 · · · · · ·</h2>
              </div>
              <NewsText data={newsTextlist} />
            </div>
          ) : null}

          {content ? (
            <div className='right-box'>
              <div className='right-title'>
                <h2>简介</h2>
              </div>
              <div styleName='detail-content' className='mt10'>
                {content}
                <p>
                  《{title}》动漫的网址：{DOMAIN}/subject/{id}
                </p>
              </div>
            </div>
          ) : null}
          {storyId && storylist.length > 0 ? (
            <div className='right-box' styleName='ep'>
              <div className='right-title'>
                <h2>分集剧情</h2>
              </div>
              <EpList id={id} data={storylist} />
            </div>
          ) : null}
          <div className='right-box'>
            <div className='right-title'>
              <h2>相关动漫</h2>
            </div>
            {id ? <DetailActor actor={reActor} not={id} /> : null}
          </div>
          {newsPiclist.length > 0 ? (
            <div className='right-box'>
              <div className='right-title'>
                <h2>新闻花絮</h2>
              </div>
              <NewsPic data={newsPiclist} />
            </div>
          ) : null}
          <div className='right-box'>
            <div className='right-title'>
              <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
            </div>
            <HotWeek not={id} />
          </div>
          <div className='right-box'>
            <div className='right-title'>
              <h2>{title}的评论</h2>
            </div>
            <Comment
              me={me}
              data={commentList}
              login={a => onType(a)}
              submit={(e, content, code, imgkey) => submit(e, content, code, imgkey)}
            />
          </div>
        </div>
        <aside className='right'>
          {list.length > 0 ? (
            <div className='right-box'>
              <div className='right-title'>
                <h2>
                  <em></em>在哪儿看这部动漫
                </h2>
              </div>
              {player()}
            </div>
          ) : null}
          <div className='right-box'>
            <div className='right-title'>
              <h2>
                <em></em>角色声优
              </h2>
            </div>
            <div styleName='right-actor'>{actor ? actor.map((item, index) => <p key={index}>{item.title}</p>) : <p>暂无</p>}</div>
          </div>
          <div className='right-box'>
            <div className='right-title'>
              <h2>
                <em></em>STAFF
              </h2>
            </div>
            <div styleName='right-actor'>
              {original.length > 0 ? <p>原作：{original.map(item => item.title)}</p> : null}
              {director.length > 0 ? (
                <p>
                  导演：
                  {director.map((item, index) => (
                    <span key={`${item.title}_${index}`}>{item.title}</span>
                  ))}
                </p>
              ) : null}
              {company ? <p>制作：{company}</p> : null}
              {website ? (
                <p>
                  官网：
                  <a href={website} target='_blank' rel='noopener noreferrer' title={website}>
                    {website}
                  </a>
                </p>
              ) : null}
            </div>
          </div>
          <SideBar />
        </aside>
      </section>
      <Modal visible={visible} showModal={() => onModal(true)} closeModal={() => onModal(false)}>
        <Sign isSign={isSign} onType={val => onType(val)} visible={visible} />
      </Modal>
    </>
  )
}

Subject.loadDataOnServer = async ({ store, match, res, req, user }) => {
  if (user) return { code: 200 }
  const { id, sid = 1 } = match.params
  await detail({ id })(store.dispatch, store.getState)
  await comment({ id, sid })(store.dispatch, store.getState)
  return { code: 200 }
}

export default Shell(Subject)
