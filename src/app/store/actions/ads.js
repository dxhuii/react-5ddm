import loadData from '@/utils/loadData'

export function ads({ id }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: id,
      reducerName: 'ads',
      actionType: 'GET_ADS',
      api: 'ads',
      params: { id }
    })
  }
}
