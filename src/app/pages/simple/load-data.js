import { simple } from '@/store/actions/simple'

export default async ({ store, match }) => {
  await simple()(store.dispatch, store.getState)
  return { code: 200 }
}
