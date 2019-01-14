import loadData from '@/utils/loadData'

export function top({ name }) {
  return (dispatch, getState) => {
    let api = {}
    if (name === 'topListIndexCN') {
      api = { area: '%E5%A4%A7%E9%99%86', limit: 7 }
    } else if (name === 'topListIndexJP') {
      api = { area: '%E6%97%A5%E6%9C%AC', limit: 10 }
    } else if (name === 'topListAll') {
      api = { limit: 10 }
    }
    return loadData({
      dispatch,
      getState,
      name,
      reducerName: 'top',
      actionType: 'GET_TOP',
      api: 'list',
      params: Object.assign({}, api, { day: 30, order: 'hits_month' })
    })
  }
}
