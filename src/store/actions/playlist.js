import Ajax from '@/common/ajax'
import { getPlayList } from '../reducers/playlist'
import config from '@/utils/config'

export function playlist({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let play = getPlayList(getState(), id)
      play.loading = true
      if (!play.data) play.data = []

      dispatch({ type: 'GET_PLAY_LIST', id, data: play })

      let [err, data] = await Ajax({
        url: config.api.playlist({ id }),
        method: 'get'
      })

      if (data && data.status) {
        play.loading = false
        play.data = data.data
        dispatch({ type: 'GET_PLAY_LIST', id, data: play })
        resolve([null, play.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
