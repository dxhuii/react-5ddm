import Ajax from '../../common/ajax'
import { getPlayerList } from '../reducers/player'
import config from '../../utils/config';

export function playerLoad({ id, pid }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {

      let player = getPlayerList(getState(), id, pid);
      player.loading = true;
      if (!player.data) player.data = [];

      dispatch({ type: 'GET_PLAYER', id, data: player, pid })

      let [ err, data ] = await Ajax({
        url: config.api.player({id, pid}),
        method: 'get'
      })

      if (data && data.status) {
        player.loading = false
        player.data = data.data
        dispatch({ type: 'GET_PLAYER', id, data: player, pid })
        resolve([ null, player.data ])
      } else {
        resolve(['detail failed'])
      }

    })
  }
}
