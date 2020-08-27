import { week } from '@/store/actions/list'

export default async ({ store, match }) => {
  await week()(store.dispatch, store.getState)
  return { code: 200 }
}
