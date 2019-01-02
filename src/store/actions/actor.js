import Ajax from '@/common/ajax'
import { getDetailActor } from '../reducers/actor'
import config from '@/utils/config'

export function detailActor({ actor, no }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getDetailActor(getState(), actor, no)
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_DETAIL_ACTOR', actor, no, data: info })

      let [err, data] = await Ajax({
        url: config.api.actorsList({ actor, no }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_DETAIL_ACTOR', actor, no, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
