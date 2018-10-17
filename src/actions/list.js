import Ajax from '../common/ajax'
import { getList } from '../reducers/list'
import config from '../utils/config'

export function listLoad({ id, limit, order, day }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let list = getList(getState(), id);
      list.loading = true
      !list.page ? list.page = 1 : list.page += 1
      if (list.more) return
      if (!list.data) list.data = []

      dispatch({ type: 'GET_LIST', id, data: list })

      let [ err, data ] = await Ajax({
        url: config.api.typelist({ page: list.page, limit, order, day }),
        method: 'get'
      })

      if (data && data.status === 0) {
        list.loading = false
        list.data = list.data.concat(data.data)
        list.more = data.total === list.data.length
        dispatch({ type: 'GET_LIST', id, data: list })
        resolve([ null, list.data ])
      } else {
        resolve(['detail failed'])
      }

    })
  }
}
