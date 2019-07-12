import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { articleVod } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Detail from '@/components/Detail'

export default function ArticleVod({ ids }) {
  const store = useStore()
  const info = useSelector(state => getList(state, `article-${ids}`))

  useEffect(() => {
    const _articleVod = args => articleVod(args)(store.dispatch, store.getState)
    if (!info.data) {
      _articleVod({ ids })
    }
  }, [ids, info.data, store.dispatch, store.getState])

  const { data = [] } = info

  return (
    <>
      {data.map((item, index) => (
        <div className={`box ${index > 0 ? 'mt20' : ''}`} key={item.id}>
          <Detail title={item.title} pic={item.pic} gold={item.glod} vid={item.id} pid={item.pid} status={item.status} year={item.year} mcid={item.mcid} />
        </div>
      ))}
    </>
  )
}

ArticleVod.propTypes = {
  ids: PropTypes.any
}
