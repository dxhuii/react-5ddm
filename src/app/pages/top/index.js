import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { TopList } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const {
    location: { search }
  } = useReactRouter()
  const store = useStore()
  const day = useSelector(state => getList(state, 'page-hits_day'))
  const week = useSelector(state => getList(state, 'page-hits_week'))
  const month = useSelector(state => getList(state, 'page-hits_month'))
  const all = useSelector(state => getList(state, 'page-hits'))

  useEffect(() => {
    const getData = args => TopList(args)(store.dispatch, store.getState)
    if (!day.data) {
      getData({ order: 'hits_day' })
    }
    if (!week.data) {
      getData({ order: 'hits_week' })
    }
    if (!month.data) {
      getData({ order: 'hits_month' })
    }
    if (!all.data) {
      getData({ order: 'hits' })
    }
  }, [all.data, day.data, month.data, store.dispatch, store.getState, week.data])

  const isHits = search.indexOf('hits') !== -1
  const dayData = day.data || []
  const weekData = week.data || []
  const monthData = month.data || []
  const allData = all.data || []
  return (
    <>
      <Meta title='动漫排行榜 动漫热播榜' />
      <div className='wp mt20' styleName='top'>
        <div className='box'>
          <h2>总</h2>
          <ul styleName='toplist'>
            {allData.map((item, index) => (
              <li key={item.id}>
                <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                <Link to={`/subject/${item.id}`}>{item.title}</Link>
                <span>{isHits ? item.hits : item.gold}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='box'>
          <h2>月</h2>
          <ul styleName='toplist'>
            {monthData.map((item, index) => (
              <li key={item.id}>
                <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                <Link to={`/subject/${item.id}`}>{item.title}</Link>
                <span>{isHits ? item.hits : item.gold}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='box'>
          <h2>周</h2>
          <ul styleName='toplist'>
            {weekData.map((item, index) => (
              <li key={item.id}>
                <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                <Link to={`/subject/${item.id}`}>{item.title}</Link>
                <span>{isHits ? item.hits : item.gold}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className='box'>
          <h2>日</h2>
          <ul styleName='toplist'>
            {dayData.map((item, index) => (
              <li key={item.id}>
                <span styleName={`num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
                <Link to={`/subject/${item.id}`}>{item.title}</Link>
                <span>{isHits ? item.hits : item.gold}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
})
