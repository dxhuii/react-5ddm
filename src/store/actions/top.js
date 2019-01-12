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

      let api = {}
      if (name === 'topListIndexCN') {
        api = { area: '%E5%A4%A7%E9%99%86', limit: 7 }
      } else if (name === 'topListIndexJP') {
        api = { area: '%E6%97%A5%E6%9C%AC', limit: 10 }
      } else if (name === 'topListAll') {
        api = { limit: 10 }
      }

      let [err, data] = await Ajax({
        url: config.api.list,
        method: 'get',
        data: Object.assign({}, api, { day: 30, order: 'hits_month' })
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
