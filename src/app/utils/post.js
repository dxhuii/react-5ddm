import config from '@/utils/config'
import Ajax from '@/common/ajax'
import Toast from '@/components/Toast'

export default async ({ api, params = {}, header = true, callback = () => {} }) => {
  const [err, data] = await Ajax({
    method: 'post',
    url: config.api[api],
    data: params,
    headers: header ? { Authorization: localStorage.getItem('token') ? localStorage.getItem('token') : 0 } : {}
  })

  if (err) {
    const result = [null, data]
    callback(result)
    return result
  }
  if (data.code === 1) {
    const result = [null, data]
    callback(result)
    return result
  } else if (header && (data.status === 1002 || data.status === 1003)) {
    window.location.href = `/sign?from=${window.location.href}`
  } else {
    Toast.info(data.msg)
  }
}
