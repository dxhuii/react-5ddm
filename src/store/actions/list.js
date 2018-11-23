import Ajax from '../../common/ajax'
import { getList } from '../reducers/list'
import config from '../../utils/config'

export function listLoad({ stateId, id, mcid = '', year = '', area = '', wd = '', letter = '', lz = '', day, order, limit, more = false }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getList(getState(), stateId, id, mcid, year, area, wd, letter, lz, day, order, limit)
      list.loading = true
      !list.page || more ? list.page = 1 : list.page += 1
      if (list.more) return
      if (!list.data) list.data = []

      dispatch({ type: 'GET_LIST', data: list, stateId, id, mcid, year, area, wd, letter, lz, day, order, limit })

      let [ err, data ] = await Ajax({
        url: config.api.typelist({ page: list.page, stateId, id, mcid, year, area, wd, letter, lz, day, order, limit }),
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = more ? data.data : list.data.concat(data.data)
        list.more = data.total === list.data.length
        dispatch({ type: 'GET_LIST', data: list, stateId, id, mcid, year, area, wd, letter, lz, day, order, limit })
        resolve([ null, list.data ])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
