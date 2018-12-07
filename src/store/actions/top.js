import Ajax from '@/common/ajax'
import { getTopList } from '../reducers/top'
import config from '@/utils/config'

export function topLoad({ order, area }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let top = getTopList(getState(), order, area)
      top.loading = true
      if (!top.data) top.data = []

      dispatch({ type: 'GET_TOP', order, data: top, area })

      let [err, data] = await Ajax({
        url: config.api.top({ order, area }),
        method: 'get'
      })

      if (data && data.status) {
        top.loading = false
        top.data = data.data
        dispatch({ type: 'GET_TOP', order, data: top, area })
        resolve([null, top.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
