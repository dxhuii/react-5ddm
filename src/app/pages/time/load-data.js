import { detail } from '@/store/actions/detail'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    await detail({ id })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
