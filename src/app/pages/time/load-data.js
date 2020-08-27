import { detail } from '@/store/actions/detail'

export default async ({ store, match }) => {
  const { id } = match.params
  await detail({ id })(store.dispatch, store.getState)
  return { code: 200 }
}
