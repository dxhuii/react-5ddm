import { week, top, recommend } from '@/store/actions/list'
import { slide } from '@/store/actions/slide'
import { newsIndex } from '@/store/actions/newsIndex'

export default async ({ store, match }) => {
  await slide()(store.dispatch, store.getState)
  await recommend({ name: 'anime' })(store.dispatch, store.getState)
  await recommend({ name: 'news' })(store.dispatch, store.getState)
  await week()(store.dispatch, store.getState)
  await newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState)
  await newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState)
  await top({ name: 'topListIndexCN' })(store.dispatch, store.getState)
  await top({ name: 'topListIndexJP' })(store.dispatch, store.getState)
  return { code: 200 }
}
