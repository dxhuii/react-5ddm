import { detail } from '@/store/actions/detail'
import { episode } from '@/store/actions/episode'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, p } = match.params
    await detail({ id })(store.dispatch, store.getState)
    await episode({ id, p })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
