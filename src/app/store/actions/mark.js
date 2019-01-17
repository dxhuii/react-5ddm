import Ajax from '@/common/ajax'
import config from '@/utils/config'

export function like({ type, id, cid, uid }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: type === 'love' ? config.api.love : config.api.remind,
        method: 'get',
        data: {
          id,
          cid,
          uid
        }
      })

      resolve([err, data])
    })
  }
}

export function mark({ id, val }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: config.api.mark,
        method: 'get',
        data: {
          id,
          val
        }
      })

      resolve([err, data])
    })
  }
}
