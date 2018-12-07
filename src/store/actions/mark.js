import Ajax from '@/common/ajax'
import config from '@/utils/config'

export function mark({ type, id, cid, uid }) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let [err, data] = await Ajax({
        url: config.api.mark({ type, id, cid, uid }),
        method: 'get'
      })

      resolve([err, data])
    })
  }
}
