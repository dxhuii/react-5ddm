import { episode } from '@/store/actions/episode'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { id, p = 0 } = match.params
  const name = `${id}${p ? `-${p}` : ''}`
  const data = getCache(`episode-${name}`)
  if (data) {
    store.dispatch({ type: 'GET_EPISCODE', name, data: data })
    return { code: 200 }
  }
  const [err, res] = await episode({ id, p })(store.dispatch, store.getState)
  addCache(`episode-${name}`, res)
  return { code: 200 }
}
