import loadData from '@/utils/loadData'

export function simple() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      reducerName: 'simple',
      actionType: 'GET_SIMPLE',
      api: 'simple',
      params: {
        limit: 20
      },
      isPage: true
    })
  }
}
