import { detail, score } from '@/store/actions/detail'
import { playlist } from '@/store/actions/playlist'

export default ({ store, match, user = {} }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    const { userid } = user
    await detail({ id })(store.dispatch, store.getState)
    await score({ id, sid: 1, uid: userid || 0 })(store.dispatch, store.getState)
    await playlist({ id })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
