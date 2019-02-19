import { TopList } from '@/store/actions/page'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    Promise.all([
      TopList({ order: 'hits_day' })(store.dispatch, store.getState),
      TopList({ order: 'hits_week' })(store.dispatch, store.getState),
      TopList({ order: 'hits_month' })(store.dispatch, store.getState),
      TopList({ order: 'hits' })(store.dispatch, store.getState)
    ]).then(() => {
      resolve({ code: 200 })
    })
  })
}
