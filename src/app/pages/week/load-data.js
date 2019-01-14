import { week } from '@/store/actions/week'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await week()(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
