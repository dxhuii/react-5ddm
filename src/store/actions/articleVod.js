import Ajax from '@/common/ajax'
import { getArticleVod } from '../reducers/articleVod'
import config from '@/utils/config'

export function articleVod({ ids }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getArticleVod(getState(), ids)
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_ARTICLE_VOD', ids, data: info })

      let [err, data] = await Ajax({
        url: config.api.list,
        method: 'get',
        data: {
          ids,
          p: 0
        }
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_ARTICLE_VOD', ids, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
