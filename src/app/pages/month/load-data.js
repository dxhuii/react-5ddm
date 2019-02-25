import { monthLoad } from '@/store/actions/month'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { month } = match.params
    const data = getCache(month)
    if (data) {
      store.dispatch({ type: 'GET_MONTH', name: month, data: data })
      resolve({ code: 200 })
      return
    }
    let [, res] = await monthLoad({ month })(store.dispatch, store.getState)
    addCache(month, res)
    resolve({ code: 200 })
  })
}
