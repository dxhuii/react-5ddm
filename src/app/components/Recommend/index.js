import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// redux
import { useStore, useSelector } from 'react-redux'
import { recommend } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import { formatPic } from '@/utils'

import './style.scss'

export default () => {
  const anime = useSelector(state => getList(state, 'anime'))
  const news = useSelector(state => getList(state, 'news'))

  const store = useStore()

  useEffect(() => {
    const getData = args => recommend(args)(store.dispatch, store.getState)
    if (!anime.data) {
      getData({ name: 'anime' })
    }
    if (!news.data) {
      getData({ name: 'news' })
    }
  }, [anime.data, news.data, store.dispatch, store.getState])

  const showData = (data = [], type) => {
    const link = id => (type ? `/subject/${id}` : `/article/${id}`)
    return data.map(item => (
      <li key={item.id}>
        <Link to={link(item.id)}>
          <img src={formatPic(item.pic, 'orj360')} alt={item.title} />
          <div styleName="mark">
            <p>{item.title}</p>
          </div>
        </Link>
      </li>
    ))
  }

  return (
    <ul styleName="recommend">
      {showData(anime.data, 1)}
      {showData(news.data)}
    </ul>
  )
}
