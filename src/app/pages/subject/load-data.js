import { detail, score } from '@/store/actions/detail'
import { playlist } from '@/store/actions/playlist'

export default ({ store, match, user = {} }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    const { userid } = user
    Promise.all([
      detail({ id })(store.dispatch, store.getState),
      score({ id, sid: 1, uid: userid || 0 })(store.dispatch, store.getState),
      playlist({ id })(store.dispatch, store.getState)
    ]).then(() => {
      resolve({ code: 200 })
    })
  })
}
