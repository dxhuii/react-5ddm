import { TopList } from '@/store/actions/list'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('top')
  if (data) {
    store.dispatch({
      type: 'GET_TOP_LIST',
      name: 'pqge-hits_day',
      data: data[0][1]
    })
    store.dispatch({
      type: 'GET_TOP_LIST',
      name: 'pqge-hits_week',
      data: data[1][1]
    })
    store.dispatch({
      type: 'GET_TOP_LIST',
      name: 'pqge-hits_month',
      data: data[2][1]
    })

    store.dispatch({
      type: 'GET_TOP_LIST',
      name: 'pqge-hits',
      data: data[3][1]
    })
    return { code: 200 }
  }
  Promise.all([
    TopList({ order: 'hits_day' })(store.dispatch, store.getState),
    TopList({ order: 'hits_week' })(store.dispatch, store.getState),
    TopList({ order: 'hits_month' })(store.dispatch, store.getState),
    TopList({ order: 'hits' })(store.dispatch, store.getState)
  ]).then(data => {
    addCache('top', data)
    return { code: 200 }
  })
}
