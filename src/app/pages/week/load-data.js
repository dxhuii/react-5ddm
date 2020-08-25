import { week } from '@/store/actions/list'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('week')
  if (data) {
    store.dispatch({ type: 'GET_WEEK', name: 'week', data: data })
    return { code: 200 }
  }
  const [, res] = await week()(store.dispatch, store.getState)
  addCache('week', res)
  return { code: 200 }
}
