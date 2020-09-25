import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { top } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'
import BaseLoading from '@/components/BaseLoading'

import './style.scss'

const Top = ({ name, title, sty }) => {
  const info = useSelector(state => getList(state, name))
  const store = useStore()

  useEffect(() => {
    const getData = args => top(args)(store.dispatch, store.getState)
    if (!info.data) {
      getData({ name })
    }
  }, [store.dispatch, store.getState, info.data, name])

  const { data = [], loading } = info

  return (
    <div className='right-box' styleName='top'>
      <div className='right-title'>
        <h2>
          <em></em>
          {title || '排行榜'}
        </h2>
      </div>
      <ul>
        {loading ? <BaseLoading /> : null}
        {data.map((item, index) => (
          <li key={item.id}>
            <span styleName={`top-li__num ${index <= 2 ? 'on' : ''}`}>{index + 1}</span>
            <Link to={`/subject/${item.id}`}>{item.title}</Link>
            <span styleName='top-li__score'>{item.gold}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

Top.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  sty: PropTypes.object
}

Top.loadDataOnServer = async ({ store, match, res, req, user }) => {
  await top({ name: 'topListIndexCN' })(store.dispatch, store.getState)
  await top({ name: 'topListIndexJP' })(store.dispatch, store.getState)
}

export default Top
