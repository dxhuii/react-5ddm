import { episode } from '@/store/actions/episode'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, p = 0 } = match.params
    const name = `${id}${p ? `-${p}` : ''}`
    const data = getCache(`episode-${name}`)
    if (data) {
      store.dispatch({ type: 'GET_EPISCODE', name, data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await episode({ id, p })(store.dispatch, store.getState)
    addCache(`episode-${name}`, res)
    resolve({ code: 200 })
  })
}
