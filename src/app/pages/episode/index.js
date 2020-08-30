import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { episode } from '@/store/actions/episode'
import { getEpisodeList } from '@/store/reducers/episode'

import Loading from '@/components/Ui/Loading'
import Detail from '@/components/Detail'
import SideBar from '@/components/SideBar'
import TagShare from '@/components/TagShare'
import DetailActor from '@/components/Subject/DetailActor'
import HotWeek from '@/components/Subject/HotWeek'
import Ads from '@/components/Ads'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const [more, onMore] = useState(false)
  const {
    location,
    match: {
      params: { id, p }
    }
  } = useReactRouter()

  const store = useStore()
  const info = useSelector(state => getEpisodeList(state, id + (p ? '-' + p : '')))

  useEffect(() => {
    const getData = args => episode(args)(store.dispatch, store.getState)
    onMore(false)
    if (!info.data) {
      getData({ id, p })
    }
  }, [id, info.data, p, store.dispatch, store.getState])

  const showList = (id, num, p) => {
    const list = []
    for (let i = 1; i <= num; i++) {
      const link = <Link to={`/episode/${id}/${i}`}>{`${i}集`}</Link>
      list.push(
        +p === i ? (
          <li key={i} styleName='active'>
            {link}
          </li>
        ) : (
          <li key={i}>{link}</li>
        )
      )
    }
    return list.map(item => item)
  }

  const { data = {}, loading } = info

  const { title, name, content, prev, next, vid, vTitle, gold, pic, storyNum, vContent, actor, year, status, mcid, pid } = data
  const shareConfig = {
    pic,
    title: !p
      ? `#${vTitle}#剧情(共${storyNum}集)_${vTitle}全集剧情`
      : `#${vTitle}#${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情`,
    desc: content,
    url: !p ? `/episode/${id}` : `/episode/${id}/${p}`
  }
  const reName = !p ? '' : name
  if (loading || !data.vTitle) return <Loading />
  return (
    <div className='wp mt20 clearfix'>
      <Meta
        title={`${
          !p ? `${vTitle}剧情(共${storyNum}集)_${vTitle}全集剧情` : `${vTitle}${name}${title ? ` ${title}` : ''}剧情_${vTitle}分集剧情`
        }`}
      >
        <meta name='keywords' content={`${vTitle}剧情,${vTitle}${reName}剧情, ${vTitle}${reName}${title}剧情`} />
        <meta name='description' content={`${vTitle}${reName}${title}剧情介绍：${!p ? vContent : content}`} />
      </Meta>
      <div className='fl left'>
        <article styleName='article-body'>
          <h1>
            <Link to={`/subject/${vid}`}>{vTitle}</Link> {name} {title}
          </h1>
          <div styleName='article-content' className='clearfix'>
            {((!p ? vContent : content) || '').replace('&nbsp; ', '').replace('&nbsp; ', '')}
          </div>
          <div styleName='article-context'>
            {!p && storyNum >= 1 ? (
              <Link to={`/episode/${id}/1`}>分集剧情</Link>
            ) : (
              <>
                {prev && prev > 0 ? <Link to={`/episode/${id}/${prev}`}>上一集</Link> : <Link to={`/episode/${id}`}>剧情简介</Link>}
                {next ? <Link to={`/episode/${id}/${next}`}>下一集</Link> : null}
              </>
            )}
          </div>
          <TagShare tag={[vTitle]} config={shareConfig} location={location} />
        </article>
        <div styleName='article-bottom'>
          <div className='mt10' styleName='ep-like'>
            <div styleName='title'>
              <h2>相关动漫</h2>
            </div>
            {vid ? <DetailActor actor={actor} not={vid} /> : null}
          </div>
          <div className='mt10' styleName='ep-like'>
            <div styleName='title'>
              <h2>小伙伴还在看(=￣ω￣=)（一周热门）</h2>
            </div>
            <HotWeek not={vid} />
          </div>
        </div>
      </div>
      <div className='fr right'>
        <div className='right-box'>
          <Detail title={vTitle} pic={pic} gold={gold} vid={vid} year={year} status={status} mcid={mcid} pid={pid} />
          <ul styleName={`eplist ${more ? 'auto' : ''}`}>
            <li styleName={!p ? 'active' : ''}>
              <Link to={`/episode/${id}`}>全部</Link>
            </li>
            {showList(id, storyNum, p)}
          </ul>
          <ul styleName='eplist'>
            {p > 19 ? (
              <li styleName={!p ? 'active' : ''}>
                <Link to={`/episode/${id}/${p}`}>{p}集</Link>
              </li>
            ) : null}

            {!more && storyNum > 19 ? (
              <li onClick={() => onMore(!more)}>
                <span />
              </li>
            ) : null}
          </ul>
          <Link styleName='go-detail' to={`/subject/${vid}`}>
            去 {vTitle}
          </Link>
        </div>
        <SideBar />
      </div>
    </div>
  )
})
