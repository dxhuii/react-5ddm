import config from '@/utils/config'
import Ajax from '@/common/ajax'

export default async ({
  dispatch,
  getState,
  reducerName,
  actionType,
  api,
  name = '',
  params = {},
  isPage = false,
  header = false,
  method = 'get',
  callback = () => {}
}) => {
  const state = getState()
  const list = (name ? state[reducerName][name] : state[reducerName]) || {}
  if (list.loading) {
    return ['loading...']
  }

  // 已经加载所有，没有更多了
  if (Reflect.has(list, 'more') && list.more) {
    const result = [null, list]
    callback(result)
    return result
  }

  if (!Reflect.has(list, 'data')) list.data = []
  // 添加页面page
  if (isPage) {
    if (!Reflect.has(list, 'page')) {
      list.page = 1
    } else {
      // 如果以及存在筛选条件，那么下次请求，进行翻页
      list.page += 1
    }
  }

  list.loading = true

  if (actionType) dispatch({ type: actionType, name, data: list })

  const url = config.api[api]

  const [err, data] = await Ajax({
    method,
    url,
    data: isPage ? Object.assign({}, params, { s: url.split('=')[1], p: list.page }) : params,
    headers: header ? { Authorization: localStorage.getItem('token') ? localStorage.getItem('token') : 0 } : {}
  })

  if (err) {
    list.loading = false
    const result = [null, list]
    callback(result)
    return result
  }

  list.data = isPage && list.page !== 1 ? list.data.concat(data.data) : data.data || []
  list.params = params
  list.loading = false

  if (isPage) list.more = list.data.length < params.limit

  if (actionType) dispatch({ type: actionType, name, data: list })

  const result = [null, list]

  callback(result)
  return result
}
