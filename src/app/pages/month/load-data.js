import { monthLoad } from '@/store/actions/month'

export default async ({ store, match }) => {
  const { month } = match.params
  await monthLoad({ month })(store.dispatch, store.getState)
  return { code: 200 }
}
