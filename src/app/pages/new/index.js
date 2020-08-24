import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { TopList } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { isNumber } from '@/utils'

// import Hashids from 'hashids'

import './style.scss'

export default Shell(() => {
  const store = useStore()
  const info = useSelector(state => getList(state, 'page-addtime'))
  const menu = {
    201: 'tv',
    202: 'ova',
    203: 'juchang',
    4: 'tebie',
    204: 'zhenren',
    35: 'qita'
  }

  useEffect(() => {
    const getData = args => TopList(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData({ order: 'addtime' })
    }

    // const hashids = new Hashids('plain', 7)
    // const s1 = hashids.encode(33320)
    // const s2 = hashids.encode(33321)
    // const s3 = hashids.encode(33322)
    // const s4 = hashids.encode(33323)
    // const s5 = hashids.encode(33324)
    // console.log(hashids.decode('nyOwnDp'), s1, s2, s3, s4, s5)
  }, [info.data, store.dispatch, store.getState])

  const { data = [] } = info
  return (
    <>
      <Meta title='最新更新的100个动漫' />
      <div className='wp mt20'>
        <div className='box'>
          <ul styleName='newlist'>
            <li>
              <span>动漫标题</span>
              <span>动漫分类</span>
              <span>动漫类型</span>
              <span>更新时间</span>
            </li>
            {data.map(item => (
              <li key={item.id}>
                <span>
                  <Link to={`/subject/${item.id}`}>
                    {item.title}
                    <em styleName='line'>/</em>
                    {isNumber(item.status) ? `更新至${item.status}话` : item.status}
                    {item.isDate ? <em styleName='red'>new</em> : null}
                  </Link>
                </span>
                <span>
                  <Link to={`/type/${menu[item.listId] || 'list'}/-/-/-/-/-/addtime/`}>{item.listName}</Link>
                </span>
                <span>
                  {(item.mcid || []).map(val => (
                    <Link to={`/type/${menu[item.listId] || 'list'}/${val.id}/-/-/-/-/addtime/`} key={val.id}>
                      {val.title}
                    </Link>
                  ))}
                </span>
                <span styleName={item.isDate ? 'red' : ''}>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
})
