import { episodeList } from '@/store/actions/episode'

export default async ({ store, match }) => {
  await episodeList({ name: 'episodelist' })(store.dispatch, store.getState)
  return { code: 200 }
}
