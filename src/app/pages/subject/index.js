import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { detail, love } from '@/store/actions/detail'
import { comment, addComment } from '@/store/actions/comment'
import { mark } from '@/store/actions/mark'
import { getDetail } from '@/store/reducers/detail'
import { getComment } from '@/store/reducers/comment'
import { getUserInfo } from '@/store/reducers/user'

import Loading from '@/components/Ui/Loading'
import SideBar from '@/components/SideBar'
import Share from '@/components/Share'
import PlayList from '@/components/PlayList'
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

import { isNumber, formatPic } from '@/utils'
import { DOMAIN_NAME, NAME, DOMAIN } from 'Config'

import './style.scss'

export default Shell(() => {
  const [visible, onModal] = useState(false)
  const [isSign, onSign] = useState('signIn')
  const [loveData, setLove] = useState({})
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
      params: { id, sid = 1 }
    }
  } = useReactRouter()

  const store = useStore()
  const me = useSelector(state => getUserInfo(state))
  const info = useSelector(state => getDetail(state, id))
  const commentData = useSelector(state => getComment(state, `${sid}_${id}`))
  const loveD = useSelector(state => getDetail(state, `love_${id}`))
  const _comment = useCallback(args => comment(args)(store.dispatch, store.getState), [store.dispatch, store.getState])
  const _love = useCallback(args => love(args)(store.dispatch, store.getState), [store.dispatch, store.getState])

  const { userid, nickname } = me

  useEffect(() => {
    const getData = args => detail(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData({ id })
    }
    if (!commentData || !commentData.data) {
      _comment({ id, sid })
    }
    async function feachLove() {
      let [, data] = await _love({ id, sid })
      setLove(data.data || {})
    }
    if (!(loveD && loveD.data) && userid) feachLove()
  }, [commentData, loveD, id, info, store.dispatch, store.getState, userid, sid, _love, _comment])

  const addMark = async (type, id, cid) => {
    const onLike = args => mark(args)(store.dispatch, store.getState)
    if (userid) {
      let [, data] = await onLike({ type, id, cid })
      if (data.code === 1) {
        let [, res] = await _love({ id, sid })
        setLove(res.data || {})
        Toast.success(data.msg)
      }
    } else {
      onModal(true)
    }
  }

  const onType = isSign => {
    onSign(isSign)
    onModal(true)
  }

  const submit = async (e, content) => {
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
    const _addComment = args => addComment(args)(store.dispatch, store.getState)
    let [, data] = await _addComment({ id, sid, content: content.value, nickname, pid: 0 })
    if (data.code === 1) {
      content.value = ''
      _comment({ id, sid })
    }
  }

  const { data = {}, loading } = info
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
    jump,
    tvcont,
    status,
    year,
    storyId,
    actorId,
    repairtitle,
    pan,
    vod_pantitle,
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
  const reContent = `${content.substring(0, 120)}${content.length > 120 ? '...' : ''}`
  const shareConfig = {
    pic,
    title: `#${title}#${language ? `(${language})` : ''} - ${listName}${listNameBig} - #${NAME}# @99496动漫网`,
    desc: reContent,
    url: `/subject/${id}`
  }
  if (jump && !(typeof window === 'undefined')) {
    window.location.href = jump
  }
  if (loading || !data.title) return <Loading />
  console.log(loveData, 'loveData')
  return (
    <>
      <div className="warp-bg">
        <Meta
          title={`${title}全集在线观看${repairtitle && repairtitle !== '讨论帖' ? `_${repairtitle}` : ''}${
            vod_pantitle || DOMAIN_NAME === 'dddm.tv' ? '_百度云盘下载' : ''
          } - ${listName}${listNameBig}`}
        >
          <meta name="description" content={`${title}动画全集由${reContent}`} />
          <meta
            name="keywords"
            content={`${title},${title}动漫,${title}下载${vod_pantitle ? `,${title}百度云盘下载` : ''},${title}全集,${title}动画片,${title}在线观看${
              keywords ? `,${keywords}` : ''
            }`}
          />
          <meta property="og:locale" content="zh_CN" />
          <meta property="og:type" content="videolist" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={reContent} />
          <meta property="og:image" content={rePic} />
          <meta property="og:url" content={`/subject/${id}`} />
          <meta property="og:video" content={`/play/${id}/1`} />
          <meta property="og:site_name" content={NAME} />
          <meta property="og:video:score" content={gold} />
          <meta property="og:video:actor" content={reActor} />
          <meta property="og:video:area" content={area} />
          <meta property="og:video:class" content={`${listName}${mcid.length > 0 ? mcid.map(item => item.title).join(',') : ''}`} />
          <meta property="og:video:language" content={language} />
          <meta property="og:video:update_date" content={updateDate} />
          <meta property="og:video:content_type" content="6" />
        </Meta>
        <div styleName="detail">
          <div styleName="detail-blur" style={{ backgroundImage: `url(${rePic})` }} />
          <div styleName="detail-con" className="wp clearfix">
            <div styleName="detail-pic">{pic ? <img src={rePic} /> : null}</div>
            <div styleName="detail-info">
              <div styleName="detial-title">
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
              <ul styleName="detail-info__count"></ul>
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
              <p styleName="detail-update">更新时间：{updateDate}</p>
              <div styleName="detail-tool">
                <div styleName={`detail-tool__on ${remindid ? 'active' : ''}`} onClick={() => addMark('remind', id, cid, userid)}>
                  <i className="iconfont">&#xe6bd;</i>
                  {remindid ? '已追番' : '追番'}
                </div>
                <div styleName={`detail-tool__on ${loveid ? 'active' : ''}`} onClick={() => addMark('love', id, cid, userid)}>
                  <i className="iconfont">&#xe66a;</i>
                  {loveid ? '已收藏' : '收藏'}
                </div>
                <div styleName="detail-tool__on share">
                  <i className="iconfont">&#xe655;</i>分享
                </div>
                <div styleName="detail-tool__share">
                  <Share data={shareConfig} location={location} />
                </div>
              </div>
            </div>
            {star ? (
              <div styleName="detail-score">
                <Tating data={star} id={+id} sid={sid} />
              </div>
            ) : null}
          </div>
        </div>
        <div styleName="detail-nav">
          <div className="wp">
            <ul>
              <li styleName="active">
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
                  <Link to={`/episode/${storyId}`}>分集剧情</Link>
                </li>
              ) : null}
              <li>
                <Link to={`/time/${id}`}>播出时间</Link>
              </li>
              {pan ? (
                <li>
                  <a href={pan} target="_blank" rel="noopener noreferrer">
                    网盘下载
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt20">
        <Ads id={3} />
      </div>
      <PlayList />
      <div className="wp">
        <Ads id={4} />
      </div>
      <div className="mt20 clearfix wp" styleName="detail-bottom">
        <div className="fl box pb20 left">
          {newsTextlist.length > 0 ? (
            <div className="mt10">
              <div styleName="title">
                <h2>预告片·OP·ED·BGM·MAD·CM·特典 · · · · · ·</h2>
              </div>
              <NewsText data={newsTextlist} />
            </div>
          ) : null}
          {content ? (
            <div className="mt10">
              <div styleName="title">
                <h2>简介</h2>
              </div>
              <div styleName="detail-content" className="mt10">
                {content}
                <p>
                  《{title}》动漫的网址：{DOMAIN}/subject/{id}
                </p>
              </div>
            </div>
          ) : null}
          {storyId && storylist.length > 0 ? (
            <div styleName="ep">
              <div styleName="title">
                <h2>分集剧情</h2>
              </div>
              <EpList id={storyId} data={storylist} />
            </div>
          ) : null}
          <div className="mt10">
            <div styleName="title">
              <h2>相关动漫</h2>
            </div>
            {id ? <DetailActor actor={reActor} not={id} /> : null}
          </div>
          {newsPiclist.length > 0 ? (
            <div className="mt10">
              <div styleName="title">
                <h2>新闻花絮</h2>
              </div>
              <NewsPic data={newsPiclist} />
            </div>
          ) : null}
          <div className={`${newsPiclist.length > 0 ? 'mt20' : 'mt10'}`}>
            <div styleName="title">
              <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
            </div>
            <HotWeek not={id} />
          </div>
          <div className="mt20">
            <div styleName="title">
              <h2>评论</h2>
            </div>
            <Comment data={commentList} submit={(e, content) => submit(e, content)} />
          </div>
        </div>
        <div className="fr right">
          <div className="box pb20">
            <div styleName="title">
              <h2>角色声优</h2>
            </div>
            <div>{actor ? actor.map((item, index) => <p key={index}>{item.title}</p>) : <p>暂无</p>}</div>
          </div>
          <div className="box pb20 mt20">
            <div styleName="title">
              <h2>STAFF</h2>
            </div>
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
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {website}
                </a>
              </p>
            ) : null}
          </div>
          <div className="mt20">
            <SideBar />
          </div>
        </div>
      </div>
      <Modal visible={visible} showModal={() => onModal(true)} closeModal={() => onModal(false)}>
        <Sign isSign={isSign} onType={val => onType(val)} visible={visible} />
      </Modal>
    </>
  )
})
