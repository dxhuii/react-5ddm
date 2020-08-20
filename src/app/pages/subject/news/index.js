import React, { useEffect, useCallback } from 'react'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { vodNews, detail } from '@/store/actions/detail'
import { getDetail } from '@/store/reducers/detail'

import SideBar from '@/components/SideBar'
import Item from '@/components/News/Item'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { NAME } from 'Config'

export default Shell(() => {
  const {
    match: {
      params: { id }
    }
  } = useReactRouter()
  const store = useStore()
  const info = useSelector(state => getDetail(state, `vod_news_${id}`))
  const vodInfo = useSelector(state => getDetail(state, id))

  const load = useCallback(() => {
    const getData = args => vodNews(args)(store.dispatch, store.getState)
    getData({ id })
  }, [id, store.dispatch, store.getState])

  useEffect(() => {
    const getVod = args => detail(args)(store.dispatch, store.getState)
    if (!vodInfo.data) {
      getVod({ id })
    }
    if (!info.data) load()
    ArriveFooter.add(id, load)
    return () => {
      ArriveFooter.remove(id)
    }
  }, [id, info.data, load, store.dispatch, store.getState, vodInfo.data])

  const { data = [] } = info
  const vod = vodInfo.data || {}
  return (
    <>
      <Meta title={`${vod.title}预告_${vod.title}花絮_${vod.title}新闻_${vod.title}新闻列表`}>
        <meta name='keywords' content={`${vod.title}预告,${vod.title}花絮,${vod.title}新闻`} />
        <meta name='description' content={`${NAME}为您提供${vod.title}相关花絮,预告片以及，${vod.title}资讯新闻等更多信息请关注${NAME}`} />
      </Meta>
      <div className='wp clearfix mt20'>
        <div className='left box fl'>
          <Item data={data} />
        </div>
        <div className='right fr'>
          <SideBar vodid={+id} />
        </div>
      </div>
    </>
  )
})
