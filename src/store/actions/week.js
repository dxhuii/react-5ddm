import Ajax from '@/common/ajax'
import { getWeek } from '../reducers/week'
import config from '@/utils/config'

export function week() {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let week = getWeek(getState())
      week.loading = true
      if (!week.data) week.data = []
      dispatch({ type: 'GET_WEEK', data: week })

      let [err, data] = await Ajax({
        url: config.api.list,
        method: 'get',
        data: {
          react: 1,
          limit: 1000,
          p: 0
        }
      })

      if (data && data.status) {
        week.loading = false
        week.data = data.data
        dispatch({ type: 'GET_WEEK', data: week })
        resolve([null, week.data])
      } else {
        resolve(['week failed'])
      }
    })
  }
}
