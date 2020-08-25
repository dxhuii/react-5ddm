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
  Promise.all([detail({ id })(store.dispatch, store.getState), vodNews({ id })(store.dispatch, store.getState)]).then(data => {
    addCache(`vod_news_${id}`, data)
    return { code: 200 }
  })
}
