import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { TopList } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Shell from '@/components/Shell'
import Meta from '@/components/Meta'

import { isNumber } from '@/utils'

import './style.scss'

const New = () => {
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
  }, [info.data, store.dispatch, store.getState])

  const { data = [] } = info
  return (
    <>
      <Meta title='最新更新的100个动漫' />
      <div className='wp mt20'>
        <div className='right-box'>
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
                  <Link to={`/type/${menu[item.listId] || 'list'}/-/-/-/-/-/addtime`}>{item.listName}</Link>
                </span>
                <span>
                  {(item.mcid || []).map(val => (
                    <Link to={`/type/${menu[item.listId] || 'list'}/${val.id}/-/-/-/-/addtime`} key={val.id}>
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
}

New.loadDataOnServer = async ({ store, match, res, req, user }) => {
  if (user) return { code: 200 }
  await TopList({ order: 'addtime' })(store.dispatch, store.getState)
  return { code: 200 }
}

export default Shell(New)
