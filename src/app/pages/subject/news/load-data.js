import { detail, vodNews } from '@/store/actions/detail'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { id } = match.params
  const data = getCache(`vod_news_${id}`)
  if (data) {
    store.dispatch({
      type: 'GET_DETAIL',
      name: id,
      data: data[0][1]
    })
    store.dispatch({
      type: 'GET_VOD_NEWS',
      name: `vod_news_${id}`,
      data: data[1][1]
    })
    return { code: 200 }
  }
  const d1 = await detail({ id })(store.dispatch, store.getState)
  const d2 = await vodNews({ id })(store.dispatch, store.getState)
  addCache(`vod_news_${id}`, [d1[1], d2[1]])
  return { code: 200 }
}
