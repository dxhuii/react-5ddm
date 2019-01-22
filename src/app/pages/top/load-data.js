import { TopList } from '@/store/actions/page'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await TopList({ order: 'hits_day' })(store.dispatch, store.getState)
    await TopList({ order: 'hits_week' })(store.dispatch, store.getState)
    await TopList({ order: 'hits_month' })(store.dispatch, store.getState)
    await TopList({ order: 'hits' })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
