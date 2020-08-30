import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

// redux
import { useStore, useSelector } from 'react-redux'
import { monthLoad } from '@/store/actions/month'
import { getMonth } from '@/store/reducers/month'

import Loading from '@/components/Ui/Loading'
import Item from '@/components/List/Item'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import './style.scss'

export default Shell(() => {
  const {
    match: {
      params: { month }
    }
  } = useReactRouter()
  const nowYear = new Date().getFullYear()
  const [year, onYear] = useState(parseInt(month.substring(0, 4)))
  const store = useStore()
  const info = useSelector(state => getMonth(state, month))

  useEffect(() => {
    const getData = args => monthLoad(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData({ month })
    }
  }, [info.data, month, store.dispatch, store.getState])

  const getYear = start => {
    const d = new Date()
    const s = d.getFullYear() - start
    const y = []
    for (let i = 0; i <= s; i++) {
      y.push(start + i)
    }
    return y
  }

  const getMonths = year => {
    const m = []
    for (let i = 1; i <= 12; i++) {
      m.push(i <= 9 ? `${year}0${i}` : `${year}${i}`)
    }
    return m
  }
  const { data = [], loading } = info
  const m = month.substring(4)
  return (
    <>
      <Meta title={`${year}年${m}月播出的新番动漫_${m}月新番_动漫新番表_新番表`}>
        <meta name='keywords' content={`${year}年${m}月播出的新番动漫,${m}月新番,动漫新番表,${m}月最新动漫,${year}年${m}月的动漫,新番表`} />
        <meta
          name='description'
          content={`您想知道${year}年${m}月有哪些新番动漫播出吗，你想了解最新的动漫新番表 ，${m}月份最新动漫观看指南，${m}月播出的动漫资讯信息，请关注本站。`}
        />
      </Meta>
      {loading ? <Loading /> : null}
      <div className='wp mt20' styleName='month-box'>
        <div className='right-box'>
          <ul styleName='year' className='clearfix'>
            {getYear(nowYear - 18).map(item => (
              <li key={item} styleName={year === item ? 'cur' : ''} onClick={() => onYear(item)}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div styleName='month'>
            {getMonths(year).map(item => (
              <Link to={`/month/${item}`} key={item} styleName={month === item ? 'cur' : ''}>
                {item}
              </Link>
            ))}
          </div>
        </div>
        <div className='right-box mt20 pb20'>
          共 <b>{data.length}</b> 条
        </div>
        {data.length > 0 ? <Item data={data} /> : null}
      </div>
    </>
  )
})
