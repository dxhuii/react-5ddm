import { week } from '@/store/actions/list'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('week')
    if (data) {
      store.dispatch({ type: 'GET_WEEK', name: 'week', data: data })
      resolve({ code: 200 })
      return
    }
    let [, res] = await week()(store.dispatch, store.getState)
    addCache('week', res)
    resolve({ code: 200 })
  })
}
