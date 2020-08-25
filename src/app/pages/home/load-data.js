import { week, top, recommend } from '@/store/actions/list'
import { slide } from '@/store/actions/slide'
import { newsIndex } from '@/store/actions/newsIndex'

import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const data = getCache('home')
  if (data) {
    // 将数据写入到redux
    store.dispatch({ type: 'GET_SLIDE', name: 'slide', data: data[0][1] })
    store.dispatch({ type: 'GET_RECOMMEND', name: 'anime', data: data[1][1] })
    store.dispatch({ type: 'GET_RECOMMEND', name: 'news', data: data[2][1] })
    store.dispatch({ type: 'GET_WEEK', name: 'week', data: data[3][1] })
    store.dispatch({ type: 'GET_NEWS_INDEX_LIST', name: 'newsPicList', data: data[4][1] })
    store.dispatch({ type: 'GET_NEWS_INDEX_LIST', name: 'newsTextList', data: data[5][1] })
    store.dispatch({ type: 'GET_TOP', name: 'topListIndexCN', data: data[6][1] })
    store.dispatch({ type: 'GET_TOP', name: 'topListIndexJP', data: data[7][1] })

    return { code: 200 }
  }

  Promise.all([
    slide()(store.dispatch, store.getState),
    recommend({ name: 'anime' })(store.dispatch, store.getState),
    recommend({ name: 'news' })(store.dispatch, store.getState),
    week()(store.dispatch, store.getState),
    newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState),
    newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState),
    top({ name: 'topListIndexCN' })(store.dispatch, store.getState),
    top({ name: 'topListIndexJP' })(store.dispatch, store.getState)
  ]).then(data => {
    // cacheData = data
    addCache('home', data)
    // lastCacheAt = new Date().getTime()
    return { code: 200 }
  })
}
