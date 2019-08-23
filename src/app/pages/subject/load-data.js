import { detail } from '@/store/actions/detail'
import { comment } from '@/store/actions/comment'
import cache from '@/utils/cache'
const { getCache, addCache } = cache

export default ({ store, match }) => {
  return new Promise(async function(resolve, reject) {
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
      resolve({ code: 200 })
      return
    }
    Promise.all([detail({ id })(store.dispatch, store.getState), comment({ id, sid })(store.dispatch, store.getState)]).then(data => {
      addCache(`subject-${id}`, data)
      resolve({ code: 200 })
    })
  })
}
