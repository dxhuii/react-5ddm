import { detail } from '@/store/actions/detail'
import { comment } from '@/store/actions/comment'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default async ({ store, match }) => {
  const { id, sid = 1 } = match.params
  const data = getCache(`subject-${id}`)
  if (data) {
    store.dispatch({
      type: 'GET_DETAIL',
      name: id,
      data: data[0][1]
    })
    store.dispatch({
      type: 'GET_COMMENT',
      name: `${sid}_${id}`,
      data: data[1][1]
    })
    return { code: 200 }
  }
  const detailData = await detail({ id })(store.dispatch, store.getState)
  const commentData = await comment({ id, sid })(store.dispatch, store.getState)
  addCache(`subject-${id}`, [detailData[1], commentData[1]])
  return { code: 200 }
}
