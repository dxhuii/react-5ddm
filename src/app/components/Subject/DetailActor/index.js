import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { detailActor } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

export default function Like({ actor = '', no }) {
  const store = useStore()
  const info = useSelector(state => getList(state, `like-${no}`))

  useEffect(() => {
    const getData = args => detailActor(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData({
        actor,
        no
      })
    }
  }, [actor, info, no, store.dispatch, store.getState])
  const { data = [] } = info
  return <Item data={data} />
}

Like.propTypes = {
  actor: PropTypes.string,
  no: PropTypes.any
}
