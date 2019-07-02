import { recommend } from '@/store/actions/list'
import { slide } from '@/store/actions/slide'

import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const data = getCache('home')
    if (data) {
      // 将数据写入到redux
      store.dispatch({ type: 'GET_SLIDE', name: 'slide', data: data[0][1] })
      store.dispatch({ type: 'GET_RECOMMEND', name: 'anime', data: data[1][1] })
      store.dispatch({ type: 'GET_RECOMMEND', name: 'news', data: data[2][1] })
      resolve({ code: 200 })

      return
    }

    Promise.all([
      slide()(store.dispatch, store.getState),
      recommend({ name: 'anime' })(store.dispatch, store.getState),
      recommend({ name: 'news' })(store.dispatch, store.getState)
    ]).then(data => {
      addCache('home', data)
      resolve({ code: 200 })
    })
  })
}
