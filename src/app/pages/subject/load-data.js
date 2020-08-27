import { detail } from '@/store/actions/detail'
import { comment } from '@/store/actions/comment'

export default async ({ store, match }) => {
  const { id, sid = 1 } = match.params
  await detail({ id })(store.dispatch, store.getState)
  await comment({ id, sid })(store.dispatch, store.getState)
  return { code: 200 }
}
