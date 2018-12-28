import Ajax from '@/common/ajax'
import { getEpisode } from '../reducers/episode'
import config from '@/utils/config'

export function episode({ id, p }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getEpisode(getState(), id, p)
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_EPISCODE', id, p, data: info })

      let [err, data] = await Ajax({
        url: config.api.storyDetail({ id, p }),
        method: 'get'
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_EPISCODE', id, p, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
