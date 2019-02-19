import { week } from '@/store/actions/week'
import { slide } from '@/store/actions/slide'
import { top } from '@/store/actions/top'
import { newsIndex } from '@/store/actions/newsIndex'
import { recommend } from '@/store/actions/recommend'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    Promise.all([
      slide()(store.dispatch, store.getState),
      recommend({ name: 'indexRecommendAnime' })(store.dispatch, store.getState),
      recommend({ name: 'indexRecommendNews' })(store.dispatch, store.getState),
      week()(store.dispatch, store.getState),
      newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState),
      newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState),
      top({ name: 'topListIndexCN' })(store.dispatch, store.getState),
      top({ name: 'topListIndexJP' })(store.dispatch, store.getState)
    ]).then(() => {
      resolve({ code: 200 })
    })
  })
}
