import { newsIndex } from '@/store/actions/newsIndex'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await newsIndex({ name: 'newsPicList' })(store.dispatch, store.getState)
    await newsIndex({ name: 'newsTextList' })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
