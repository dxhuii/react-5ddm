import Ajax from '../../common/ajax'
import { getScore } from '../reducers/detail'
import config from '../../utils/config'

export function score({ id, sid, uid }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let info = getScore(getState(), id, sid, uid);
      info.loading = true;
      if (!info.data) info.data = [];

      dispatch({ type: 'GET_SCORE', data: info, id, sid, uid })

      let [ err, data ] = await Ajax({
        url: config.api.score({ id, sid, uid }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_SCORE', data: info, id, sid, uid })
        resolve([ null, info.data ])
      } else {
        resolve(['score failed'])
      }

    })
  }
}
