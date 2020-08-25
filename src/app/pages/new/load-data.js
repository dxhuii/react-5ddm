import { TopList } from '@/store/actions/list'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('addtime')
  if (data) {
    store.dispatch({ type: 'GET_TOP_LIST', name: 'page-addtime', data: data })
    return { code: 200 }
  }
  const [, res] = await TopList({ order: 'addtime' })(store.dispatch, store.getState)
  addCache('addtime', res)
  return { code: 200 }
}
