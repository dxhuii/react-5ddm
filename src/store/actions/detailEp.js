import Ajax from '@/common/ajax'
import { getDetailEp } from '../reducers/detailEp'
import config from '@/utils/config'

export function detailEp({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getDetailEp(getState(), id)
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_DETAIL_EP', id, data: info })

      let [err, data] = await Ajax({
        url: config.api.detailEpList({ id }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_DETAIL_EP', id, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
