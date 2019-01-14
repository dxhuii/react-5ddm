import loadData from '@/utils/loadData'

export function search({ wd }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: wd,
      reducerName: 'search',
      actionType: 'GET_SEARCH',
      api: 'list',
      params: { wd, order: 'hits_month', p: 0 }
    })
  }
}
