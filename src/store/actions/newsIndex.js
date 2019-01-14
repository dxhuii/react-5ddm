import loadData from '@/utils/loadData'

export function newsIndex({ name }) {
  return (dispatch, getState) => {
    let api = {}
    if (name === 'newsPicList') {
      api = { id: '211,206,205,207,208,209,212,213,221,222', limit: 12 }
    } else if (name === 'newsTextList') {
      api = { id: '214,215,216,217,218,219,220,223' }
    } else if (name === 'newsAll') {
      api = { id: '44', day: 30, order: 'hits_month' }
    }
    return loadData({
      dispatch,
      getState,
      name,
      reducerName: 'newsIndex',
      actionType: 'GET_NEWS_INDEX_LIST',
      api: 'newslist',
      params: Object.assign({}, api, { p: 0 })
    })
  }
}
