import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { search } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import './style.scss'

export default function SearchAuto({ wd }) {
  const info = useSelector(state => getList(state, wd))
  const store = useStore()

  useEffect(() => {
    const _search = args => search(args)(store.dispatch, store.getState)
    if (!info.data && wd) {
      _search({ wd })
    }
  }, [wd, store.dispatch, store.getState, info.data])

  const highLightKeywords = (data = []) => {
    // 正则匹配所有的文本
    const re = new RegExp(wd, 'g')
    for (let i = 0; i < data.length; i++) {
      const title = data[i].title || ''
      if (re.test(data[i].title)) {
        data[i].title = title.replace(re, '<span class="highlight">$&</span>')
      }
    }
    return data
  }

  const { data = [] } = info

  return (
    <>
      {data.length > 0 ? (
        <ul styleName='search-auto'>
          {highLightKeywords(data).map(item => (
            <li key={item.id}>
              <Link to={`/subject/${item.id}`}>
                <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  )
}

SearchAuto.propTypes = {
  wd: PropTypes.string
}
