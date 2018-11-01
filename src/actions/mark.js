import Ajax from '../common/ajax'
import { getMark } from '../reducers/detail'
import config from '../utils/config'

export function mark({ type, id, cid, uid }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let info = getMark(getState(), type, id, cid, uid);
      info.loading = true;
      if (!info.data) info.data = [];

      dispatch({ type: 'GET_MARK', data: info, type, id, cid, uid })

      let [ err, data ] = await Ajax({
        url: config.api.mark({ type, id, cid, uid }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_MARK', data: info, type, id, cid, uid })
        resolve([ null, info.data ])
      } else {
        resolve(['mark failed'])
      }

    })
  }
}
