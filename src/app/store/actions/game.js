import loadData from '@/utils/loadData'

export function gameList() {
  return (dispatch, getState) => {
    return loadData({
      dispatch,
      getState,
      reducerName: 'game',
      actionType: 'GET_GAME',
      api: 'game'
    })
  }
}
