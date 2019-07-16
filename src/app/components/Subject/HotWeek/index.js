import React, { useEffect } from 'react'

// redux
import { useStore, useSelector } from 'react-redux'
import { hotWeek } from '@/store/actions/list'
import { getList } from '@/store/reducers/list'

import Item from '@/components/Subject/Item'

export default () => {
  const store = useStore()
  const info = useSelector(state => getList(state, 'hotweek'))

  useEffect(() => {
    const getData = () => hotWeek()(store.dispatch, store.getState)
    if (!info || !info.data) {
      getData()
    }
  }, [info, info.data, store.dispatch, store.getState])

  const { data = [] } = info
  return <Item data={data} />
}
