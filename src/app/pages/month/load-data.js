import { monthLoad } from '@/store/actions/month'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { month } = match.params
    await monthLoad({ month })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
