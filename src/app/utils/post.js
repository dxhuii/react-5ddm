import config from '@/utils/config'
import Ajax from '@/common/ajax'
import Toast from '@/components/Toast'

export default ({ api, params, method = 'get', callback = () => {} }) => {
  return new Promise(async (resolve, reject) => {
    let [err, data] = await Ajax({
      method,
      url: config.api[api],
      data: params
    })

    if (err) {
      resolve([null, data])
      callback([null, data])
      return
    }
    if (data.rcode === 1) {
      resolve([null, data])
      callback([null, data])
    } else {
      Toast.info(data.msg)
    }
  })
}
