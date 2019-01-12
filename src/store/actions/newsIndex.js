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

      let api = {}
      if (name === 'newsPicList') {
        api = { id: '211,206,205,207,208,209,212,213,221,222', limit: 12 }
      } else if (name === 'newsTextList') {
        api = { id: '214,215,216,217,218,219,220,223' }
      } else if (name === 'newsAll') {
        api = { id: '44', day: 30, order: 'hits_month' }
      }

      let [err, data] = await Ajax({
        url: config.api.newslist,
        method: 'get',
        data: Object.assign({}, api, { p: 0 })
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
