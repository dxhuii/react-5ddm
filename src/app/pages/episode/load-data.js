import { episode } from '@/store/actions/episode'

export default async ({ store, match }) => {
  const { id, p = 0 } = match.params
  await episode({ id, p })(store.dispatch, store.getState)
  return { code: 200 }
}
