import config from '@/utils/config'
import Ajax from '@/common/ajax'

export default ({
  dispatch,
  getState,
  reducerName,
  name,
  actionType,
  api,
  params,
  isPage = false,
  method = 'get',
  callback = () => {}
}) => {
  return new Promise(async (resolve, reject) => {
    let state = getState(),
      list = state[reducerName][name] || {}
    if (list.loading) {
      resolve(['loading...'])
      return
    }

    // 已经加载所有，没有更多了
    if (Reflect.has(list, 'more') && list.more) {
      resolve([null, list])
      callback([null, list])
      return
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

    let [err, data] = await Ajax({
      method,
      url: config.api[api],
      data: isPage ? Object.assign({}, params, { p: list.page }) : params
    })

    if (err) {
      list.loading = false
      resolve([null, list])
      callback([null, list])
      return
    }

    list.data = isPage && list.page !== 1 ? list.data.concat(data.data) : data.data
    list.params = params
    list.loading = false

    if (isPage) list.more = data.count === list.data.length || data.count === 0

    if (actionType) dispatch({ type: actionType, name, data: list })

    resolve([null, list])
    callback([null, list])
  })
}
