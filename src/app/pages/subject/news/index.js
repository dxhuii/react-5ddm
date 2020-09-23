import React, { useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { vodNews, detail } from '@/store/actions/detail'
import { getDetail } from '@/store/reducers/detail'

import SideBar from '@/components/SideBar'
import Item from '@/components/News/Item'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { NAME } from 'Config'
import { propTypes } from 'qrcode.react'

const SubjectNews = ({ match }) => {
  const {
    params: { id }
  } = match
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
        <div className='left right-box fl'>
          <Item data={data} />
        </div>
        <aside className='right fr'>
          <SideBar vodid={+id} />
        </aside>
      </div>
    </>
  )
}

SubjectNews.propTypes = {
  match: PropTypes.object
}

SubjectNews.loadDataOnServer = async ({ store, match, res, req, user }) => {
  if (user) return { code: 200 }
  const { id } = match.params
  await detail({ id })(store.dispatch, store.getState)
  await vodNews({ id })(store.dispatch, store.getState)
  return { code: 200 }
}

export default Shell(SubjectNews)
