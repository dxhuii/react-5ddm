import Ajax from '@/common/ajax'
import { getWeekByListId } from '../reducers/week'
import config from '@/utils/config'

export function weekLoad({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let week = getWeekByListId(getState(), id)
      week.loading = true
      if (!week.data) week.data = []
      dispatch({ type: 'GET_WEEK', id, data: week })

      let [err, data] = await Ajax({
        url: config.api.week({ limit: 1000 }),
        method: 'get'
      })

      if (data && data.status) {
        week.loading = false
        week.data = data.data
        dispatch({ type: 'GET_WEEK', id, data: week })
        resolve([null, week.data])
      } else {
        resolve(['weekLoad failed'])
      }
    })
  }
}
