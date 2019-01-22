import { TopList } from '@/store/actions/page'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    await TopList({ order: 'addtime' })(store.dispatch, store.getState)
    resolve({ code: 200 })
  })
}
