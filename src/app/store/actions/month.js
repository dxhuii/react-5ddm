import loadData from '@/utils/loadData'

export function monthLoad({ month }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: month,
      reducerName: 'month',
      actionType: 'GET_MONTH',
      api: 'month',
      params: {
        month
      }
    })
  }
}
