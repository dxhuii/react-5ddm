import { TopList } from '@/store/actions/page'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('addtime')
    if (data) {
      store.dispatch({ type: 'GET_TOP_LIST', name: 'addtime', data: data })
      resolve({ code: 200 })
      return
    }
    let [, res] = await TopList({ order: 'addtime' })(store.dispatch, store.getState)
    addCache('addtime', res)
    resolve({ code: 200 })
  })
}
