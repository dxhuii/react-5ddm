import { gameList } from '@/store/actions/game'

export default async ({ store, match }) => {
  await gameList()(store.dispatch, store.getState)
  return { code: 200 }
}
