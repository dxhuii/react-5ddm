import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { top } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'
import Loading from '@/components/Ui/Loading'

import './style.scss'

export default function Top({ name, title, sty }) {
  const info = useSelector(state => getList(state, name))
  const store = useStore()

  useEffect(() => {
    const _top = args => top(args)(store.dispatch, store.getState)
    if (!info.data) {
      _top({ name })
    }
  }, [store.dispatch, store.getState, info.data, name])

  const { data = [], loading } = info

  return (
    <div styleName='top' style={sty}>
      <h2>{title || '排行榜'}</h2>
      <ul styleName={name === 'topListIndexCN' ? 'cn' : ''}>
        {loading ? <Loading /> : null}
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
