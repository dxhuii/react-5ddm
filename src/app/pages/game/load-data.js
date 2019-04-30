import { gameList } from '@/store/actions/game'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { wd } = match.params
    const reWd = decodeURIComponent(wd)
    const data = getCache('gameList-' + reWd)
    if (data) {
      store.dispatch({ type: 'GET_GAME', name: '', data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await gameList(wd !== 'totalList' ? { wd: reWd } : { order: 'update', wd: 'totalList', limit: 100 })(store.dispatch, store.getState)
    console.log(reWd, err, res, 'server')
    addCache('gameList-' + reWd, res)
    resolve({ code: 200 })
  })
}
