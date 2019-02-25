import { episode } from '@/store/actions/episode'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, p = 0 } = match.params
    const data = getCache(`episode-${id}${p ? `-${p}` : ''}`)
    if (data) {
      store.dispatch({ type: 'GET_EPISCODE', name: `${id}${p ? `-${p}` : ''}`, data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await episode({ id, p })(store.dispatch, store.getState)
    addCache(`episode-${id}${p ? `-${p}` : ''}`, res)
    resolve({ code: 200 })
  })
}
