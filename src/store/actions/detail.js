import Ajax from '@/common/ajax'
import { getDetail, getVodNews } from '../reducers/detail'
import config from '@/utils/config'

export function detail({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getDetail(getState(), id)
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_DETAIL', id, data: info })

      let [err, data] = await Ajax({
        url: config.api.detail,
        method: 'get',
        data: {
          id
        }
      })

      if (data && data.status) {
        info.loading = false
        info.data = data.data
        dispatch({ type: 'GET_DETAIL', id, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}

export function vodNews({ id }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let info = getVodNews(getState(), id)
      !info.page ? (info.page = 1) : (info.page += 1)
      if (info.noData) return
      info.loading = true
      if (!info.data) info.data = []

      dispatch({ type: 'GET_VOD_NEWS', id, data: info })

      let [err, data] = await Ajax({
        url: config.api.newslist,
        method: 'get',
        data: {
          did: id,
          id: 44,
          page: info.page
        }
      })

      if (data && data.status) {
        info.loading = false
        info.data = info.page === 1 ? data.data : info.data.concat(data.data)
        info.noData = data.count === info.data.length
        dispatch({ type: 'GET_VOD_NEWS', id, data: info })
        resolve([null, info.data])
      } else {
        resolve(['detail failed'])
      }
    })
  }
}
