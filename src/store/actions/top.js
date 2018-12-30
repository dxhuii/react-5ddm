import Ajax from '@/common/ajax'
import { getTopList } from '../reducers/top'
import config from '@/utils/config'

export function top({ name }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let top = getTopList(getState(), name)
      top.loading = true
      if (!top.data) top.data = []

      dispatch({ type: 'GET_TOP', data: top, name })

      let [err, data] = await Ajax({
        url: name === 'indexTopCN' ? config.api.topListIndexCN() : config.api.topListIndexJP(),
        method: 'get'
      })

      if (data && data.status) {
        top.loading = false
        top.data = data.data
        dispatch({ type: 'GET_TOP', data: top, name })
        resolve([null, top.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
