import { episodeList } from '@/store/actions/episode'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('episodelist')
    if (data) {
      store.dispatch({ type: 'GET_EPISCODE_LIST', name: 'episodelist', data: data })
      resolve({ code: 200 })
      return
    }

    let [err, res] = await episodeList({ name: 'episodelist' })(store.dispatch, store.getState)
    addCache('episodelist', res)
    resolve({ code: 200 })
  })
}
