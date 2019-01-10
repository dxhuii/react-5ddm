import { playlist } from '@/store/actions/playlist'
import { playerLoad } from '@/store/actions/player'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, pid } = match.params

    await playlist({ id })(store.dispatch, store.getState)
    await playerLoad({ id, pid })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
