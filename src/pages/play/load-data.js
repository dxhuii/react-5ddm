import { detail } from '../../actions/detail'
import { playlist } from '../../actions/playlist'
import { playerLoad } from '../../actions/player'

export default ({ store, match }) => {
  return new Promise(async function (resolve, reject) {

    const { id, pid } = match.params

    await detail({id})(store.dispatch, store.getState)
    await playlist({id})(store.dispatch, store.getState)
    await playerLoad({id, pid})(store.dispatch, store.getState)

    resolve({ code:200 });

  })
}
