import { week } from '@/store/actions/week'
import { slide } from '@/store/actions/slide'
import { top } from '@/store/actions/top'
import { newsIndex } from '@/store/actions/newsIndex'
import { recommend } from '@/store/actions/recommend'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await slide()(store.dispatch, store.getState)
    await recommend({ name: 'indexRecommendAnime' })(store.dispatch, store.getState)
    await recommend({ name: 'indexRecommendNews' })(store.dispatch, store.getState)
    await week()(store.dispatch, store.getState)
    await newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState)
    await newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState)
    await top({ name: 'indexTopCN' })(store.dispatch, store.getState)
    await top({ name: 'indexTopJP' })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
