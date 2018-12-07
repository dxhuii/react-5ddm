import { weekLoad } from '@/store/actions/week'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await weekLoad({ id: 'weekday' })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
