import Ajax from '../common/ajax'
import { getDetail } from '../reducers/detail'
import config from '../utils/config';

export function detail({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let info = getDetail(getState(), id);
      info.loading = true;
      if (!info.data) info.data = [];

      dispatch({ type: 'GET_DETAIL', id, data: info })

      let [ err, data ] = await Ajax({
        url: config.api.detail({id}),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_DETAIL', id, data: info })
        resolve([ null, info.data ])
      } else {
        resolve(['detail failed'])
      }

    })
  }
}
