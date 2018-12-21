import { newsList } from '@/store/actions/news'

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const id = '211,206,207,208,209,212,213,221'
    await newsList({ id, order: 'addtime', limit: 12 })(store.dispatch, store.getState)

    resolve({ code: 200 })
  })
}
