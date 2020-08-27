import { article } from '@/store/actions/article'

export default async ({ store, match }) => {
  const { id } = match.params
  await article({ id })(store.dispatch, store.getState)
  return { code: 200 }
}
