import { gameList } from '@/store/actions/game'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('gameList')
    if (data) {
      store.dispatch({ type: 'GET_GAME', data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await gameList()(store.dispatch, store.getState)
    addCache('gameList', res)
    resolve({ code: 200 })
  })
}
