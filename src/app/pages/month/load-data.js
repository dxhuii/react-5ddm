import { monthLoad } from '@/store/actions/month'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { month } = match.params
  const data = getCache(month)
  if (data) {
    store.dispatch({ type: 'GET_MONTH', name: month, data: data })
    return { code: 200 }
  }
  const [, res] = await monthLoad({ month })(store.dispatch, store.getState)
  addCache(month, res)
  return { code: 200 }
}
