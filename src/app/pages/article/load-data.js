import { article } from '@/store/actions/article'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { id } = match.params
  const data = getCache(`article-${id}`)
  if (data) {
    store.dispatch({ type: 'GET_NEWS_ARTICLE', name: id, data: data })
    return { code: 200 }
  }
  const [err, res] = await article({ id })(store.dispatch, store.getState)
  addCache(`article-${id}`, res)
  return { code: 200 }
}
