import loadData from '@/utils/loadData'

export function slide() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      name: '',
      reducerName: 'slide',
      actionType: 'GET_SLIDE',
      api: 'slide',
      params: {}
    })
  }
}
