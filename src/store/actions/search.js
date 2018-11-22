import Ajax from '../../common/ajax'
import { getSearchState } from '../reducers/search'
import config from '../../utils/config';

export function search({ q, limit }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let info = getSearchState(getState(), q);
      info.loading = true;
      if (!info.data) info.data = [];

      dispatch({ type: 'GET_SEARCH', q, data: info, limit })

      let [ err, data ] = await Ajax({
        url: config.api.search({ q, limit }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_SEARCH', q, data: info, limit })
        resolve([ null, info.data ])
      } else {
        resolve(['search failed'])
      }

    })
  }
}
