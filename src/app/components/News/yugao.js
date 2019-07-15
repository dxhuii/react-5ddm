import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { newsIndex } from '@/store/actions/newsIndex'
import { getNewsIndex } from '@/store/reducers/newsIndex'

import Loading from '@/components/Ui/Loading'
import './style.scss'

export default function NewsYG({ name, sty, isType, isCate, title }) {
  const info = useSelector(state => getNewsIndex(state, name))
  const store = useStore()

  useEffect(() => {
    const _newsIndex = args => newsIndex(args)(store.dispatch, store.getState)
    if (!info.data) {
      _newsIndex({ name })
    }
  })

  const { data = [], loading } = info || {}

  const getClass = cid => {
    let type = 6
    switch (cid) {
      case 214:
        type = 1
        break
      case 223:
        type = 2
        break
      case 217:
        type = 3
        break
      case 211:
        type = 4
        break
      case 205:
        type = 7
        break
    }
    return type
  }

  const showData = () => {
    return data.map(item => (
      <li key={item.id}>
        {isType ? (
          <Link styleName={`type type-${getClass(item.cid)}`} to={`/news/${item.cid}`} title={item.name}>
            {item.name}
          </Link>
        ) : null}
        <Link to={`/article/${item.id}`}>{item.title}</Link>
      </li>
    ))
  }

  return (
    <div style={sty}>
      <div className="title">
        <h2 styleName="h2">{title || '预告'}</h2>
        {isCate ? (
          <ul styleName="news-tab tab">
            <li>
              <Link to="/news/op">OP</Link>
            </li>
            <li>
              <Link to="/news/ed">ED</Link>
            </li>
            <li>
              <Link to="/news/cm">CM</Link>
            </li>
            <li>
              <Link to="/news/bgm">BGM</Link>
            </li>
          </ul>
        ) : null}
      </div>
      <ul styleName="newstxt">
        {loading ? <Loading /> : null}
        {showData()}
      </ul>
    </div>
  )
}

NewsYG.propTypes = {
  name: PropTypes.string,
  isType: PropTypes.bool,
  isCate: PropTypes.bool,
  title: PropTypes.string,
  sty: PropTypes.object
}
