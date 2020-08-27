import { TopList } from '@/store/actions/list'

export default async ({ store, match }) => {
  await TopList({ order: 'addtime' })(store.dispatch, store.getState)
  return { code: 200 }
}
