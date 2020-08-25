import { gameList } from '@/store/actions/game'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('gameList')
  if (data) {
    store.dispatch({ type: 'GET_GAME', data: data })
    return { code: 200 }
  }
  const [err, res] = await gameList()(store.dispatch, store.getState)
  addCache('gameList', res)
  return { code: 200 }
}
