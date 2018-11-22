import Ajax from '../../common/ajax'
import { getSearchState } from '../reducers/search'
import config from '../../utils/config';

export function search({ wd, limit }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let info = getSearchState(getState(), wd);
      info.loading = true;
      if (!info.data) info.data = [];

      dispatch({ type: 'GET_SEARCH', wd, data: info, limit })

      let [ err, data ] = await Ajax({
        url: config.api.typelist({ wd, limit }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_SEARCH', wd, data: info, limit })
        resolve([ null, info.data ])
      } else {
        resolve(['search failed'])
      }

    })
  }
}
