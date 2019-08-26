import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// redux
import { useStore, useSelector } from 'react-redux'
import { hotWeek } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

export default function HotWeek({ not }) {
  const store = useStore()
  const info = useSelector(state => getList(state, 'hotweek'))

  useEffect(() => {
    const getData = args => hotWeek(args)(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData({
        not
      })
    }
  }, [info, info.data, not, store.dispatch, store.getState])

  const { data = [] } = info
  return <Item data={data} />
}

HotWeek.propTypes = {
  not: PropTypes.any
}
