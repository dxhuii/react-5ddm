import { episodeList } from '@/store/actions/episode'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('episodelist')
  if (data) {
    store.dispatch({ type: 'GET_EPISCODE_LIST', name: 'episodelist', data: data })
    return { code: 200 }
  }

  const [err, res] = await episodeList({ name: 'episodelist' })(store.dispatch, store.getState)
  addCache('episodelist', res)
  return { code: 200 }
}
