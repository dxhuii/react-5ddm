import { article } from '@/store/actions/article'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    const data = getCache(`article-${id}`)
    if (data) {
      store.dispatch({ type: 'GET_NEWS_ARTICLE', name: id, data: data })
      resolve({ code: 200 })
      return
    }
    let [err, res] = await article({ id })(store.dispatch, store.getState)
    addCache(`article-${id}`, res)
    resolve({ code: 200 })
  })
}
