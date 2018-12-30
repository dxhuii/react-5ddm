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
        url: name === 'indexRecommendAnime' ? config.api.recommendAnime() : config.api.recommendNews(),
        method: 'get'
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
