import config from '@/utils/config'
import Ajax from '@/common/ajax'
import Toast from '@/components/Toast'

export default ({ api, params = {}, header = true, callback = () => {} }) => {
  return new Promise(async (resolve, reject) => {
    let [err, data] = await Ajax({
      method: 'post',
      url: config.api[api],
      data: params,
      headers: header ? { authorization: localStorage.getItem('token') } : {}
    })

    if (err) {
      resolve([null, data])
      callback([null, data])
      return
    }
    if (data.code === 1) {
      resolve([null, data])
      callback([null, data])
    } else {
      Toast.info(data.msg)
    }
  })
}
