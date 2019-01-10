import { episode } from '@/store/actions/episode'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id, p = 0 } = match.params
    await episode({ id, p })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
