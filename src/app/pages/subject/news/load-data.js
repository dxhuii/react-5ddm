import { detail, vodNews } from '@/store/actions/detail'

export default async ({ store, match }) => {
  const { id } = match.params
  await detail({ id })(store.dispatch, store.getState)
  await vodNews({ id })(store.dispatch, store.getState)
  return { code: 200 }
}
