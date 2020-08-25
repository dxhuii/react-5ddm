import { detail } from '@/store/actions/detail'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { id } = match.params
  const data = getCache(`time_${id}`)
  if (data) {
    store.dispatch({ type: 'GET_DETAIL', name: id, data: data })
    return { code: 200 }
  }
  const [, res] = await detail({ id })(store.dispatch, store.getState)
  addCache(`time_${id}`, res)
  return { code: 200 }
}
