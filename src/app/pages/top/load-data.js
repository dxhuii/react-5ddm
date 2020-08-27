import { TopList } from '@/store/actions/list'

export default async ({ store, match }) => {
  await TopList({ order: 'hits_day' })(store.dispatch, store.getState)
  await TopList({ order: 'hits_week' })(store.dispatch, store.getState)
  await TopList({ order: 'hits_month' })(store.dispatch, store.getState)
  await TopList({ order: 'hits' })(store.dispatch, store.getState)
  return { code: 200 }
}
