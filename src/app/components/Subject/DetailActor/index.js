import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { detailActor } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

export default function Like({ actor = '', not }) {
  const store = useStore()
  const info = useSelector(state => getList(state, `like-${not}`))

  useEffect(() => {
    const getData = args => detailActor(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData({
        actor,
        not
      })
    }
  }, [actor, info, not, store.dispatch, store.getState])
  const { data = [] } = info
  return <>{data.length > 0 ? <Item data={data} /> : null}</>
}

Like.propTypes = {
  actor: PropTypes.string,
  not: PropTypes.any
}
