import Ajax from '@/common/ajax'
import { getNews } from '../reducers/news'
import config from '@/utils/config'

export function newsList({ id, letter = '', news = '', did = '', day = '', wd = '', name = '', limit, order, more = false }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let list = getNews(getState(), id, news, did, name, wd, letter, day, order, limit)
      list.loading = true
      !list.page || more ? (list.page = 1) : (list.page += 1)
      if (list.more) return
      if (!list.data) list.data = []

      dispatch({ type: 'GET_NEWS_LIST', data: list, id, news, did, name, wd, letter, day, order, limit })

      let [err, data] = await Ajax({
        url: config.api.newsList({ page: list.page, id, news, did, name, wd, letter, day, order, limit }),
        method: 'get'
      })

      if (data && data.status) {
        list.loading = false
        list.data = more ? data.data : list.data.concat(data.data)
        list.more = data.total === list.data.length
        dispatch({ type: 'GET_NEWS_LIST', data: list, id, news, did, name, wd, letter, day, order, limit })
        resolve([null, list.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
