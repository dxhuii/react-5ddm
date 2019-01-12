import Ajax from '@/common/ajax'
import { getRecommend } from '../reducers/recommend'
import config from '@/utils/config'

export function recommend({ name }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getRecommend(getState(), name)
      list.loading = true
      if (!list.data) list.data = []

      dispatch({ type: 'GET_RECOMMEND', data: list, name })

      let [err, data] = await Ajax({
        url: name === 'indexRecommendAnime' ? config.api.list : config.api.newslist,
        method: 'get',
        data: Object.assign(
          {},
          { limit: 4, order: 'hits_week', p: 0 },
          name === 'indexRecommendAnime' ? { day: 7 } : { day: 30, id: '211,206,205,207,208,209,212,213,221,222' }
        )
      })

      if (data && data.status) {
        list.loading = false
        list.data = data.data
        dispatch({ type: 'GET_RECOMMEND', data: list, name })
        resolve([null, list.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
