import loadData from '@/utils/loadData'

export function week() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: '',
      reducerName: 'week',
      actionType: 'GET_WEEK',
      api: 'list',
      params: {
        react: 1,
        limit: 1000,
        p: 0
      }
    })
  }
}
