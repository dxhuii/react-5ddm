import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { configLoad } from '@/store/actions/config'
import { getConfig } from '@/store/reducers/config'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import SideBar from '@/components/SideBar'
import Item from '@/components/News/Item'

// 壳组件
import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const {
    match: {
      params: { name }
    }
  } = useReactRouter()
  const menu = {
    zixun: 211,
    donghua: 206,
    manhua: 205,
    cast: 207,
    bagua: 208,
    jianping: 221,
    pic: 212,
    video: 222,
    yugao: 214,
    op: 215,
    bgm: 216,
    ed: 217,
    cm: 223,
    cosplay: 213,
    mad: 220,
    shengrou: 218,
    tedian: 219,
    chanye: 209
  }
  const store = useStore()
  const config = useSelector(state => getConfig(state, 'menu'))
  const info = useSelector(state => getNewsIndex(state, 'newslist', menu[name] || 44))

  const load = useCallback(async () => {
    const getData = args => newsIndex(args)(store.dispatch, store.getState)
    await getData({ name: 'newslist', id: menu[name] || 44 })
  }, [menu, name, store.dispatch, store.getState])

  useEffect(() => {
    const getData = args => configLoad(args)(store.dispatch, store.getState)
    if (!config.data) {
      getData({ tag: 'menu' })
    }
    if (!info.data) load()
    ArriveFooter.add('newslist', load)
    return () => {
      ArriveFooter.remove('newslist')
    }
  }, [config, config.data, info, info.data, load, store.dispatch, store.getState])

  const { data = [] } = info
  const newsMenu = (config.data || {}).son || []
  return (
    <div className='wp mt20 clearfix'>
      <Meta title='动漫新闻_动漫资讯_新番情报_动漫先行图_漫画情报' />
      <div styleName='news-nav' className='box fl'>
        <h2>
          <Link to='/news'>专栏</Link>
        </h2>
        <ul>
          {newsMenu.map(item => (
            <li key={item.id} styleName={`${name === item.name ? 'active' : ''}`}>
              <Link to={`/news/${item.name}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div styleName='news-left' className='box fl'>
        <Item data={data} />
      </div>
      <div className='right fr'>
        <SideBar />
      </div>
    </div>
  )
})
