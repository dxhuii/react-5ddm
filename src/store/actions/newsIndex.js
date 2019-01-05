import Ajax from '@/common/ajax'
import { getNewsIndex } from '../reducers/newsIndex'
import config from '@/utils/config'

export function newsIndex({ name }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getNewsIndex(getState(), name)
      list.loading = true
      if (!list.data) list.data = []

      dispatch({ type: 'GET_NEWS_INDEX_LIST', data: list, name })

      let api = ''
      if (name === 'newsPicList') {
        api = config.api.newsPicList()
      } else if (name === 'newsTextList') {
        api = config.api.newsTextList()
      } else if (name === 'newsAll') {
        api = config.api.newsAll()
      }

      let [err, data] = await Ajax({
        url: api,
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = data.data
        dispatch({ type: 'GET_NEWS_INDEX_LIST', data: list, name })
        resolve([null, list.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
