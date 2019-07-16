import { playerLoad } from '@/store/actions/player'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, pid } = match.params
    const data = getCache(`play-${id}-${pid}`)
    if (data) {
      store.dispatch({ type: 'GET_PLAYER', name: `${id}-${pid}`, data: data })
      resolve({ code: 200 })
      return
    }
    let [, res] = await playerLoad({ id, pid })(store.dispatch, store.getState)
    addCache(`play-${id}-${pid}`, res)
    resolve({ code: 200 })
  })
}
