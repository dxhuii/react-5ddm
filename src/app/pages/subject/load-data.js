import { detail, getComment } from '@/store/actions/detail'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match, user = {} }) => {
  return new Promise(async function(resolve, reject) {
    const { id } = match.params
    const { userid } = user
    const data = getCache(`subject-${id}`)
    if (data) {
      store.dispatch({
        type: 'GET_DETAIL',
        name: id,
        data: data[0][1]
      })
      store.dispatch({
        type: 'GET_COMMENT',
        name: `comment_${id}`,
        data: data[1][1]
      })
      resolve({ code: 200 })
      return
    }
    Promise.all([detail({ id })(store.dispatch, store.getState), getComment({ id, sid: 1 })(store.dispatch, store.getState)]).then(data => {
      addCache(`subject-${id}`, data)
      resolve({ code: 200 })
    })
  })
}
