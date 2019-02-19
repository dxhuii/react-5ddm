import { playlist } from '@/store/actions/playlist'
import { playerLoad } from '@/store/actions/player'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, pid } = match.params
    Promise.all([playlist({ id })(store.dispatch, store.getState), playerLoad({ id, pid })(store.dispatch, store.getState)]).then(() => {
      resolve({ code: 200 })
    })
  })
}
