import { playlist } from '@/store/actions/playlist'
import { playerLoad } from '@/store/actions/player'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, pid } = match.params
    const data = getCache(`play-${id}-${pid}`)
    if (data) {
      store.dispatch({
        type: 'GET_PLAY_LIST',
        name: id,
        data: data[0][1]
      })
      store.dispatch({
        type: 'GET_PLAYER',
        name: `${id}-${pid}`,
        data: data[1][1]
      })
      resolve({ code: 200 })
      return
    }
    Promise.all([playlist({ id })(store.dispatch, store.getState), playerLoad({ id, pid })(store.dispatch, store.getState)]).then(data => {
      addCache(`play-${id}-${pid}`, data)
      resolve({ code: 200 })
    })
  })
}
