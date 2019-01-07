import Ajax from '@/common/ajax'
import { getSearch } from '../reducers/search'
import config from '@/utils/config'

export function search({ wd }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getSearch(getState(), wd)
      list.loading = true
      if (!list.data) list.data = []
      dispatch({ type: 'GET_SEARCH', data: list, wd })

      let [err, data] = await Ajax({
        url: config.api.search({ wd }),
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = data.data
        dispatch({ type: 'GET_SEARCH', data: list, wd })
        resolve([null, list.data])
      } else {
        resolve(['failed'])
      }
    })
  }
}
