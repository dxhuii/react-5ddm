import { week } from '@/store/actions/week'
import { slide } from '@/store/actions/slide'
import { top } from '@/store/actions/top'
import { newsIndex } from '@/store/actions/newsIndex'
import { recommend } from '@/store/actions/recommend'

import cache from '@/utils/cache'
const { getCache, addCache } = cache

// let cacheData,
//   lastCacheAt = 0

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('home')
    // cacheData && lastCacheAt && new Date().getTime() - lastCacheAt < 60 * 60 * 5
    // console.log(data)
    if (data) {
      // 将数据写入到redux
      store.dispatch({ type: 'GET_SLIDE', name: 'slide', data: data[0][1] })
      store.dispatch({ type: 'GET_RECOMMEND', name: 'indexRecommendAnime', data: data[1][1] })
      store.dispatch({ type: 'GET_RECOMMEND', name: 'indexRecommendNews', data: data[2][1] })
      store.dispatch({ type: 'GET_WEEK', name: 'week', data: data[3][1] })
      store.dispatch({ type: 'GET_NEWS_INDEX_LIST', name: 'newsPicList', data: data[4][1] })
      store.dispatch({ type: 'GET_NEWS_INDEX_LIST', name: 'newsTextList', data: data[5][1] })
      store.dispatch({ type: 'GET_TOP', name: 'topListIndexCN', data: data[6][1] })
      store.dispatch({ type: 'GET_TOP', name: 'topListIndexJP', data: data[7][1] })

      resolve({ code: 200 })

      return
    }

    Promise.all([
      slide()(store.dispatch, store.getState),
      recommend({ name: 'indexRecommendAnime' })(store.dispatch, store.getState),
      recommend({ name: 'indexRecommendNews' })(store.dispatch, store.getState),
      week()(store.dispatch, store.getState),
      newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState),
      newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState),
      top({ name: 'topListIndexCN' })(store.dispatch, store.getState),
      top({ name: 'topListIndexJP' })(store.dispatch, store.getState)
    ]).then(data => {
      // cacheData = data
      addCache('home', data)
      // lastCacheAt = new Date().getTime()
      resolve({ code: 200 })
    })
  })
}
