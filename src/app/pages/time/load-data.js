import { detail } from '@/store/actions/detail'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    const data = getCache(`time_${id}`)
    if (data) {
      store.dispatch({ type: 'GET_DETAIL', name: id, data: data })
      resolve({ code: 200 })
      return
    }
    let [, res] = await detail({ id })(store.dispatch, store.getState)
    addCache(`time_${id}`, res)
    resolve({ code: 200 })
  })
}
