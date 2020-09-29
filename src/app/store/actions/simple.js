import loadData from '@/utils/loadData'

export function simple({ uid = '' }) {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      reducerName: 'simple',
      actionType: 'GET_SIMPLE',
      api: 'simple',
      params: {
        uid,
        type: 'simple',
        limit: 10
      },
      isPage: true
    })
  }
}
