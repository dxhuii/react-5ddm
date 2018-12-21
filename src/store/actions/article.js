import Ajax from '@/common/ajax'
import { getArticle } from '../reducers/article'
import config from '@/utils/config'

export function article({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getArticle(getState(), id)
      list.loading = true
      if (!list.data) list.data = []

      dispatch({ type: 'GET_NEWS_ARTICLE', data: list, id })

      let [err, data] = await Ajax({
        url: config.api.newsDetail({ id }),
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = data.data
        dispatch({ type: 'GET_NEWS_ARTICLE', data: list, id })
        resolve([null, list.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
