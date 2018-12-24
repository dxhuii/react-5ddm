import Ajax from '@/common/ajax'
import { getConfig } from '../reducers/config'
import config from '@/utils/config'

export function configLoad({ name = '' }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getConfig(getState(), name)
      list.loading = true
      if (!list.data) list.data = []

      dispatch({ type: 'GET_CONFIG', data: list, name })

      let [err, data] = await Ajax({
        url: config.api.config({ name }),
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = data.data
        dispatch({ type: 'GET_CONFIG', data: list, name })
        resolve([null, list.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
