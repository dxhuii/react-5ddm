import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { article } from '@/store/actions/article'
import { getArticle } from '@/store/reducers/article'
import { newsIndex } from '@/store/actions/newsIndex'
import { getUserInfo } from '@/store/reducers/user'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import Swiper from '@/components/Swiper'
import Loading from '@/components/Ui/Loading'
import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'
import Item from '@/components/News/Item'
import convertHTML from '@/components/HtmlText'
import Ads from '@/components/Ads'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import playing from '@/utils/play'
import { NAME } from 'Config'

import './style.scss'

export default Shell(() => {
  const [full, isFull] = useState(false)
  const [isfull, setIsfull] = useState(false)
  const [showPic, setPic] = useState(false)
  const [imgObj, setImgObj] = useState({})
  const articleContent = useRef()
  const {
    location,
    match: {
      params: { id },
      url
    }
  } = useReactRouter()

  const store = useStore()
  const me = useSelector(state => getUserInfo(state))
  const articleData = useSelector(state => getArticle(state, id))
  const newsData = useSelector(state => getNewsIndex(state, 'newslist', 44))

  useEffect(() => {
    const getArticleData = args => article(args)(store.dispatch, store.getState)
    const getNewsData = args => newsIndex(args)(store.dispatch, store.getState)
    document.onkeyup = event => {
      if (event.which == '27') {
        isFull(false)
      }
    }
    if (!articleData.data) {
      getArticleData({ id })
    }
    if (!newsData.data) {
      getNewsData({ name: 'newslist', id: 44, order: 'hits_week' })
    }
    getImg()
  }, [articleData.data, id, newsData.data, store.dispatch, store.getState])

  const getImg = () => {
    const content = articleContent.current
    document.body.addEventListener('click', function(e) {
      // 火狐没有 e.path 属性
      const isFF = /Firefox/.test(navigator.userAgent)
      // 可点击区域
      const elem = isFF ? e.rangeParent.id || e.rangeParent.parentNode.id : (e.path.filter(item => item.id === 'content')[0] || []).id
      // 判断是否点击的图片
      if (e.target.nodeName === 'IMG' && content && elem === 'content') {
        e.preventDefault()
        e.stopPropagation()
        let params = {}
        params.param = {}
        // 获取imglist
        const oPics = content.getElementsByTagName('img')
        params.param.imageArray = []
        for (let i = 0; i < oPics.length; i++) {
          params.param.imageArray.push({ url: oPics[i].src })
        }
        for (let i = 0; i < oPics.length; i++) {
          // 判断点击图片的index
          if (e.target.src === params.param.imageArray[i].url) {
            params.param.index = i
          }
        }

        setPic(true)
        setImgObj(params.param)
      }
    })
  }

  const closePic = val => {
    setPic(val)
    if (!val) {
      imgObj.index = undefined
      setImgObj(imgObj)
    }
  }

  const { data = {}, loading } = articleData
  const newsListData = newsData.data || []
  const { userid } = me

  const { title, name, cid, pic = '', remark, keywords, addtime, inputer, tag = [], prev, next, jump, content = '', playname = '', playurl = '', vodlist = [] } = data
  const playHtml = playing({ name: playname, vid: playurl, danmu: `article_${id}`, uid: userid, url }) || []
  const shareConfig = {
    pic,
    title: `${title} - ${name} - #${NAME}# @99496动漫网`,
    desc: remark,
    url: `/article/${id}`
  }
  const { imageArray = [], index } = imgObj
  if (loading || !data.title) return <Loading />
  if (jump && !(typeof window === 'undefined')) {
    window.location.href = jump
  }
  return (
    <div className="wp mt20 clearfix">
      <Meta title={title}>
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={remark} />
        <meta property="og:image" content={pic} />
        <meta property="og:url" content={`/article/${id}`} />
        <meta property="og:site_name" content={NAME} />
        <meta name="description" content={remark} />
        <meta name="keywords" content={keywords} />
      </Meta>
      <div className={`fl left ${cid === 205 ? 'manhua' : ''}`}>
        <article styleName="article-body">
          <div styleName="article-head">
            <h1>{title}</h1>
            <div styleName="article-label">
              <span>来源：{inputer ? inputer : '网络'}</span>
              <span>更新时间：{addtime}</span>
            </div>
          </div>
          {playname ? (
            <div styleName={`article-video ${playHtml[1] ? 'is-flvsp' : ''} ${full ? 'play-full' : ''}`} onMouseOver={() => setIsfull(true)} onMouseLeave={() => setIsfull(false)}>
              <div dangerouslySetInnerHTML={{ __html: playHtml[0] }} />
              {isfull ? (
                <a onMouseOver={() => setIsfull(true)} onClick={() => isFull(!full)}>
                  {full ? '退出全屏' : '网页全屏'}
                </a>
              ) : null}
            </div>
          ) : null}
          <div ref={articleContent} id="content" styleName="article-content" dangerouslySetInnerHTML={{ __html: convertHTML(content) }} />
          {showPic ? (
            <div styleName="article-slide" onClick={() => closePic(false)}>
              <span />
              {index !== undefined ? (
                <Swiper Pagination={true} Controller={true} Start={index} Continuous={false}>
                  {imageArray.map((item, i) => (
                    <div className="swipe-item" key={item.url + i}>
                      <img src={item.url} />
                    </div>
                  ))}
                </Swiper>
              ) : null}
            </div>
          ) : null}
          <div styleName="article-share">
            <TagShare tag={tag} config={shareConfig} location={location} />
          </div>
          <div styleName="article-context" className="mt20">
            {prev ? (
              <p>
                上一篇：<Link to={`/article/${prev.id}`}>{prev.title}</Link>
              </p>
            ) : null}
            {next ? (
              <p>
                下一篇：<Link to={`/article/${next.id}`}>{next.title}</Link>
              </p>
            ) : null}
          </div>
          <div className="mt20">
            <Ads id={11} />
          </div>
          <div className="mt20" styleName="newslist">
            <div className="title">
              <h2>推荐新闻(一周热门)</h2>
              <Link to="/news">
                更多<i className="iconfont">&#xe65e;</i>
              </Link>
            </div>
            <Item data={newsListData} />
            <div styleName="newslist-more">
              <Link to="/news">查看更多最新资讯</Link>
            </div>
          </div>
        </article>
      </div>
      {cid === 205 ? null : (
        <div className="fr right">
          <SideBar data={vodlist} />
        </div>
      )}
    </div>
  )
})
